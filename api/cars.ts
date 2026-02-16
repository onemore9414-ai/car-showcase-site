
import { CarModel } from '../database/models';
import { Car } from '../types';

export const carsController = {
  // GET /api/cars
  getAll: async () => {
    try {
      const cars = await CarModel.find().sort({ createdAt: -1 }).lean();
      // Ensure _id is mapped to id or id is preserved from schema
      const mappedCars = cars.map(c => ({ ...c, _id: undefined })); 
      return { status: 200, body: mappedCars };
    } catch (error) {
      console.error('Fetch Cars Error:', error);
      return { status: 500, body: { message: 'Failed to fetch inventory' } };
    }
  },

  // GET /api/cars/:id
  getOne: async (id: string) => {
    try {
      // Searching by custom 'id' string field, not _id
      const car = await CarModel.findOne({ id }).lean();
      if (!car) return { status: 404, body: { message: 'Car not found' } };
      return { status: 200, body: { ...car, _id: undefined } };
    } catch (error) {
      return { status: 500, body: { message: 'Server error' } };
    }
  },

  // POST /api/cars
  create: async (data: any) => {
    try {
      const newCarData = {
        ...data,
        id: data.id || `car-${Date.now()}`,
        priceValue: typeof data.priceValue === 'number' ? data.priceValue : 0,
        horsepowerValue: typeof data.horsepowerValue === 'number' ? data.horsepowerValue : 0,
      };
      
      const newCar = await CarModel.create(newCarData);
      return { status: 201, body: newCar };
    } catch (error: any) {
      console.error('Create Car Error:', error);
      if (error.code === 11000) {
        return { status: 409, body: { message: 'Car ID already exists' } };
      }
      return { status: 500, body: { message: 'Failed to create vehicle' } };
    }
  },

  // PUT /api/cars/:id
  update: async (id: string, data: any) => {
    try {
      const updatedCar = await CarModel.findOneAndUpdate(
        { id }, 
        data, 
        { new: true }
      ).lean();
      
      if (!updatedCar) return { status: 404, body: { message: 'Car not found' } };
      
      return { status: 200, body: { ...updatedCar, _id: undefined } };
    } catch (error) {
      return { status: 500, body: { message: 'Update failed' } };
    }
  },

  // DELETE /api/cars/:id
  delete: async (id: string) => {
    console.log(`[API Controller] Request to delete car: ${id}`);
    try {
      const result = await CarModel.findOneAndDelete({ id });
      
      if (!result) {
        return { status: 404, body: { message: 'Car not found' } };
      }
      
      return { status: 200, body: { success: true, message: 'Car deleted successfully', id } };
    } catch (error) {
      console.error('Delete Car Error:', error);
      return { status: 500, body: { message: 'Delete failed' } };
    }
  }
};
