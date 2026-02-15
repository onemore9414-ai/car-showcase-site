
import { CARS as carsData } from '../data/cars';
import { USERS as usersData } from '../data/users';
import { SITE_CONFIG as configData } from '../data/siteConfig';

const STORAGE_PREFIX = 'brand_db_';

const FILES = {
  'cars': { default: carsData, key: `${STORAGE_PREFIX}cars` },
  'users': { default: usersData, key: `${STORAGE_PREFIX}users` },
  'config': { default: configData, key: `${STORAGE_PREFIX}config` }
};

export const Database = {
  /**
   * Reads data from the simulated filesystem.
   * Checks LocalStorage first; if empty, seeds from the TS data files.
   */
  read: <T>(file: keyof typeof FILES): T => {
    const { key, default: def } = FILES[file];
    
    if (typeof window === 'undefined') return def as unknown as T;

    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        // Seed the database if it doesn't exist
        console.log(`[Database] Seeding ${file} from initial data...`);
        localStorage.setItem(key, JSON.stringify(def));
        return def as unknown as T;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error(`[Database] Error reading ${file}`, e);
      return def as unknown as T;
    }
  },

  /**
   * Writes data to the simulated filesystem.
   */
  write: <T>(file: keyof typeof FILES, data: T): void => {
    const { key } = FILES[file];
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`[Database] Wrote update to ${file}`);
    } catch (e) {
      console.error(`[Database] Error writing to ${file}`, e);
    }
  },

  /**
   * Resets a specific file to its original state
   */
  reset: (file: keyof typeof FILES): void => {
    const { key, default: def } = FILES[file];
    localStorage.setItem(key, JSON.stringify(def));
    console.log(`[Database] Reset ${file} to default`);
  }
};
