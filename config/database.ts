import { CARS as INITIAL_CARS } from '../data/cars';
import { User, Car } from '../types';

export const DB_KEYS = {
  USERS: 'brand_db_users',
  CARS: 'brand_db_cars',
  SESSION: 'brand_db_session',
  SITE_CONFIG: 'brand_db_site_config'
};

// Initialize/Seed the database if empty
export const initDatabase = () => {
  if (typeof window === 'undefined') return;

  // Seed Cars
  if (!localStorage.getItem(DB_KEYS.CARS)) {
    console.log('Seeding Database: Cars');
    localStorage.setItem(DB_KEYS.CARS, JSON.stringify(INITIAL_CARS));
  }

  // Seed Users (Ensure at least one admin exists if empty)
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    console.log('Seeding Database: Users');
    const defaultAdmin: User = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@brand.com',
      role: 'admin',
      joinedDate: new Date().toISOString(),
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=000&color=fff'
    };
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify([defaultAdmin]));
  }
};
