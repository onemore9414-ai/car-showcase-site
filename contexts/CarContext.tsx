import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Car } from '../types';
import { carService } from '../services/carService';

interface CarContextType {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
  addCar: (car: Car) => Promise<void>;
  updateCar: (car: Car) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  resetInventory: () => Promise<void>;
  refreshCars: () => Promise<void>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await carService.getAll();
      setCars(data);
    } catch (error) {
      console.error('Failed to fetch cars:', error);
      setError('Unable to load vehicle inventory. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const addCar = async (car: Car) => {
    try {
      const newCar = await carService.create(car);
      setCars(prev => [newCar, ...prev]);
    } catch (error) {
      console.error('Failed to add car', error);
      throw error;
    }
  };

  const updateCar = async (updatedCar: Car) => {
    try {
      const result = await carService.update(updatedCar);
      setCars(prev => prev.map(c => c.id === result.id ? result : c));
    } catch (error) {
      console.error('Failed to update car', error);
      throw error;
    }
  };

  const deleteCar = async (id: string) => {
    try {
      // API call to delete from backend/store
      await carService.delete(id);
      
      // Update local state to remove item from UI without reload
      setCars(prev => prev.filter(c => c.id !== id));
      
      console.log(`[CarContext] Successfully removed car ${id} from local state`);
    } catch (error: any) {
      // Graceful handling: If backend says 404, it's already gone, so remove from UI anyway
      if (error.message && (error.message.includes('not found') || error.message.includes('404'))) {
        console.warn(`[CarContext] Car ${id} not found on server, syncing UI by removing it.`);
        setCars(prev => prev.filter(c => c.id !== id));
        return;
      }

      console.error('Failed to delete car', error);
      throw error;
    }
  };

  const resetInventory = async () => {
    if (window.confirm('Are you sure you want to reset the inventory? This will clear custom changes.')) {
      localStorage.removeItem('brand_db_cars');
      window.location.reload(); // Hard reload to trigger seed logic in db config
    }
  };

  return (
    <CarContext.Provider value={{ 
      cars, 
      isLoading,
      error,
      addCar, 
      updateCar, 
      deleteCar, 
      resetInventory,
      refreshCars: fetchCars
    }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};