import { api } from './api';
import { SiteConfig } from '../contexts/SiteContext';

export const siteService = {
  getConfig: async (): Promise<Partial<SiteConfig>> => {
    return await api.get<Partial<SiteConfig>>('/config');
  },

  updateConfig: async (config: SiteConfig): Promise<SiteConfig> => {
    return await api.put<SiteConfig>('/config', config);
  },

  resetConfig: async (): Promise<void> => {
    return await api.delete<void>('/config');
  }
};
