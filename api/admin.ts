
import { ConfigModel, CarModel, UserModel } from '../database/models';
import { SiteConfig } from '../contexts/SiteContext';
import { SITE_CONFIG as DEFAULT_CONFIG } from '../data/siteConfig';

export const adminController = {
  // Config Operations
  getConfig: async () => {
    try {
      let config = await ConfigModel.findOne();
      if (!config) {
        // Seed default config if none exists
        config = await ConfigModel.create(DEFAULT_CONFIG);
      }
      return { status: 200, body: config };
    } catch (error) {
      return { status: 500, body: { message: 'Failed to load config' } };
    }
  },

  updateConfig: async (data: any) => {
    try {
      // Upsert: gggg, insert if not
      const updated = await ConfigModel.findOneAndUpdate(
        {}, 
        data, 
        { new: true, upsert: true }
      );
      return { status: 200, body: updated };
    } catch (error) {
      return { status: 500, body: { message: 'Failed to update config' } };
    }
  },

  resetConfig: async () => {
    try {
      await ConfigModel.deleteMany({});
      const newConfig = await ConfigModel.create(DEFAULT_CONFIG);
      return { status: 200, body: newConfig };
    } catch (error) {
      return { status: 500, body: { message: 'Reset failed' } };
    }
  },

  // Admin Stats
  getStats: async () => {
    try {
      const [carCount, userCount, cars] = await Promise.all([
        CarModel.countDocuments(),
        UserModel.countDocuments(),
        CarModel.find().select('priceValue')
      ]);
      
      const totalValue = cars.reduce((acc, car) => acc + (car.priceValue || 0), 0);
      
      return {
        status: 200,
        body: {
          totalInventory: carCount,
          totalUsers: userCount,
          portfolioValue: totalValue,
          activeOrders: 3 // Mocked for now
        }
      };
    } catch (error) {
      return { status: 500, body: { message: 'Stats error' } };
    }
  }
};
