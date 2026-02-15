
import { Database } from '../database/storage';
import { SiteConfig } from '../contexts/SiteContext';
import { Car, User } from '../types';

export const adminController = {
  // Config Operations
  getConfig: () => {
    const config = Database.read<SiteConfig>('config');
    return { status: 200, body: config };
  },

  updateConfig: (data: any) => {
    const currentConfig = Database.read<SiteConfig>('config');
    const newConfig = { ...currentConfig, ...data };
    Database.write('config', newConfig);
    return { status: 200, body: newConfig };
  },

  resetConfig: () => {
    Database.reset('config');
    return { status: 204, body: null };
  },

  // Admin Stats
  getStats: () => {
    const cars = Database.read<Car[]>('cars');
    const users = Database.read<User[]>('users');
    
    const totalValue = cars.reduce((acc, car) => acc + (car.priceValue || 0), 0);
    
    return {
      status: 200,
      body: {
        totalInventory: cars.length,
        totalUsers: users.length,
        portfolioValue: totalValue,
        activeOrders: 3 // Mocked
      }
    };
  }
};
