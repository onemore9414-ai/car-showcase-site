
import { Database } from '../database/storage';
import { Car } from '../types';

export const carsController = {
  // GET /api/cars
  getAll: () => {
    const cars = Database.read<Car[]>('cars');
    return { status: 200, body: cars };
  },

  // GET /api/cars/:id
  getOne: (id: string) => {
    const cars = Database.read<Car[]>('cars');
    const car = cars.find(c => c.id === id);
    if (!car) return { status: 404, body: { message: 'Car not found' } };
    return { status: 200, body: car };
  },

  // POST /api/cars
  create: (data: any) => {
    const cars = Database.read<Car[]>('cars');
    
    const newCar: Car = {
      ...data,
      id: data.id || `car-${Date.now()}`,
      priceValue: typeof data.priceValue === 'number' ? data.priceValue : 0,
      horsepowerValue: typeof data.horsepowerValue === 'number' ? data.horsepowerValue : 0,
    };
    
    cars.unshift(newCar);
    Database.write('cars', cars);
    
    return { status: 201, body: newCar };
  },

  // PUT /api/cars/:id
  update: (id: string, data: any) => {
    const cars = Database.read<Car[]>('cars');
    const index = cars.findIndex(c => c.id === id);
    
    if (index === -1) return { status: 404, body: { message: 'Car not found' } };
    
    const updatedCar = { ...cars[index], ...data };
    cars[index] = updatedCar;
    
    Database.write('cars', cars);
    
    return { status: 200, body: updatedCar };
  },

  // DELETE /api/cars/:id
  delete: (id: string) => {
    console.log(`[API Controller] Request to delete car: ${id}`);
    const cars = Database.read<Car[]>('cars');
    const initialLength = cars.length;
    
    const newCars = cars.filter(c => c.id !== id);
    
    if (newCars.length === initialLength) {
      console.warn(`[API Controller] Car ${id} not found in DB`);
      return { status: 404, body: { message: 'Car not found' } };
    }
    
    Database.write('cars', newCars);
    
    console.log(`[API Controller] Successfully deleted car: ${id}. Remaining: ${newCars.length}`);
    return { status: 200, body: { success: true, message: 'Car deleted successfully', id } };
  }
};
