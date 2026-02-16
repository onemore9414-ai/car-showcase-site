
import { Database } from './storage';

// --- Mock Mongoose Engine ---
// This mocks the Mongoose API (find, findOne, create, etc.) so existing controllers work
// without requiring actual MongoDB drivers that crash in the browser.

class MockQuery<T> {
  private data: Promise<T>;

  constructor(data: T | Promise<T>) {
    this.data = Promise.resolve(data);
  }

  // Mock chainable methods
  sort(arg?: any) { return this; }
  select(arg?: any) { return this; }
  lean() { return this.data; }
  async exec() { return this.data; }
  
  // Make the query awaitable
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    return this.data.then(onfulfilled, onrejected);
  }
}

class MockModel<T extends { id: string }> {
  private collectionKey: 'users' | 'cars' | 'config';

  constructor(key: 'users' | 'cars' | 'config') {
    this.collectionKey = key;
  }

  private get items(): T[] {
    const data = Database.read(this.collectionKey);
    // Handle case where config is an object, not an array
    if (this.collectionKey === 'config' && !Array.isArray(data)) {
        return [data] as any;
    }
    return Array.isArray(data) ? data : [];
  }

  private saveItems(items: T[] | T) {
    Database.write(this.collectionKey, items);
  }

  // Simple query matcher
  private match(item: any, query: any): boolean {
    if (!query) return true;
    return Object.keys(query).every(key => {
      // Handle Mongoose-specific query operators if needed for basic compat
      if (key === '_id' && query[key]?.$ne) return item.id !== query[key].$ne; 
      if (key === '_id') return item.id === query[key];
      if (query[key] && typeof query[key] === 'object' && query[key].$ne) {
         return item[key] !== query[key].$ne;
      }
      // Direct match (case-insensitive for emails if string)
      if (typeof item[key] === 'string' && typeof query[key] === 'string') {
          return item[key] === query[key];
      }
      return item[key] === query[key];
    });
  }

  find(query: any = {}) {
    const filtered = this.items.filter(item => this.match(item, query));
    // Map _id to id compatibility
    const mapped = filtered.map(i => ({ ...i, _id: i.id }));
    return new MockQuery(mapped);
  }

  findOne(query: any = {}) {
    const item = this.items.find(i => this.match(i, query));
    if (!item) return new MockQuery(null);

    // Return a "Document" with save() method
    const doc = {
      ...item,
      _id: item.id,
      toObject: () => ({ ...item, _id: item.id }),
      save: async () => {
        let all = this.items;
        
        if (this.collectionKey === 'config') {
           this.saveItems(doc as any);
           return;
        }

        const idx = all.findIndex(i => i.id === item.id);
        if (idx !== -1) {
          // Clean up helper methods before saving to storage
          const cleanDoc = { ...doc };
          delete (cleanDoc as any).toObject;
          delete (cleanDoc as any).save;
          delete (cleanDoc as any)._id;
          
          all[idx] = cleanDoc as T;
          this.saveItems(all);
        }
      }
    };
    return new MockQuery(doc);
  }

  async create(data: any) {
    const newItem = { 
      ...data, 
      id: data.id || `id-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (this.collectionKey === 'config') {
        this.saveItems(newItem);
        return newItem;
    }

    const all = this.items;
    all.push(newItem);
    this.saveItems(all);
    return { ...newItem, _id: newItem.id, toObject: () => newItem };
  }

  findOneAndUpdate(query: any, update: any, options: any = {}) {
    let item = this.items.find(i => this.match(i, query));
    
    // Handle Upsert
    if (!item && options.upsert && this.collectionKey === 'config') {
        const newItem = { ...update };
        this.saveItems(newItem);
        return new MockQuery(newItem);
    }

    if (!item) return new MockQuery(null);

    const updatedItem = { ...item, ...update, updatedAt: new Date().toISOString() };
    
    if (this.collectionKey === 'config') {
        this.saveItems(updatedItem);
        return new MockQuery(updatedItem);
    }

    const all = this.items;
    const idx = all.findIndex(i => i.id === item!.id);
    all[idx] = updatedItem;
    this.saveItems(all);

    return new MockQuery({ ...updatedItem, _id: updatedItem.id });
  }

  findByIdAndUpdate(id: string, update: any, options: any = {}) {
    return this.findOneAndUpdate({ id }, update, options);
  }

  findOneAndDelete(query: any) {
    const item = this.items.find(i => this.match(i, query));
    if (!item) return new MockQuery(null);

    const all = this.items.filter(i => i.id !== item.id);
    this.saveItems(all);
    return new MockQuery(item);
  }

  async deleteMany(query: any = {}) {
    if (!query || Object.keys(query).length === 0) {
        if (this.collectionKey === 'config') {
            this.saveItems({} as any);
        } else {
            this.saveItems([]);
        }
    }
    return { deletedCount: 1 };
  }

  async countDocuments(query: any = {}) {
    if (query && Object.keys(query).length > 0) {
       return this.items.filter(i => this.match(i, query)).length;
    }
    return this.items.length;
  }
}

// Export Instances matching existing controller usage
export const UserModel = new MockModel<any>('users');
export const CarModel = new MockModel<any>('cars');
export const ConfigModel = new MockModel<any>('config');
