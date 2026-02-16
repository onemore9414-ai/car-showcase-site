import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { siteService } from '../services/siteService';

export interface SiteConfig {
  siteName: string;
  logoUrl: string;
  hero: {
    tagline: string;
    headlinePrefix: string;
    headlineGradient: string;
    description: string;
    heroImage: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
  termsAndConditions: string;
}

const DEFAULT_TERMS = `1. Agreement to Terms
These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Brand Automotive Group ("Company," "we," "us," or "our"), concerning your access to and use of the Brand website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").

You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms and Conditions. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.

2. Intellectual Property Rights
Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.

3. User Representations
By using the Site, you represent and warrant that:
- All registration information you submit will be true, accurate, current, and complete.
- You will maintain the accuracy of such information and promptly update such registration information as necessary.
- You have the legal capacity and you agree to comply with these Terms and Conditions.
- You are not a minor in the jurisdiction in which you reside.
- You will not use the Site for any illegal or unauthorized purpose.

4. Products and Purchases
We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors. All products are subject to availability.

5. Limitation of Liability
In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.

6. Governing Law
These Terms shall be governed by and defined following the laws of Italy. Brand Automotive Group and yourself irrevocably consent that the courts of Modena, Italy shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.

7. Contact Us
In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: legal@brand.com`;

const DEFAULT_CONFIG: SiteConfig = {
  siteName: 'Brand',
  logoUrl: '',
  hero: {
    tagline: 'The Architects of Speed',
    headlinePrefix: 'ABSOLUTE',
    headlineGradient: 'VELOCITY',
    description: "Redefining the physics of driving. Zero emissions. Infinite adrenaline. The future isn't coming; it's already in the rearview mirror.",
    heroImage: 'https://luimoto.com/cdn/shop/products/campisi-luimoto-s1000rr_1100x.jpg?v=1676496280'
  },
  contact: {
    address: '123 Velocity Avenue, Modena, Italy 41121',
    phone: '+39 059 123 4567',
    email: 'concierge@brand.com'
  },
  footer: {
    description: 'Making the world a better place through constructing elegant hierarchies.',
    copyright: `© ${new Date().getFullYear()} Brand Automotive, Inc. All rights reserved.`
  },
  termsAndConditions: DEFAULT_TERMS
};

interface SiteContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => Promise<void>;
  resetConfig: () => Promise<void>;
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // Load Config from API
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const remoteConfig = await siteService.getConfig();
        // Merge remote config with defaults to ensure all keys exist
        if (remoteConfig && Object.keys(remoteConfig).length > 0) {
            setConfig(prev => ({ ...prev, ...remoteConfig }));
        }
      } catch (error) {
        console.error('Failed to load site config:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadConfig();
  }, []);

  const updateConfig = async (newConfig: SiteConfig) => {
    // Optimistic UI update
    setConfig(newConfig);
    try {
      await siteService.updateConfig(newConfig);
    } catch (error) {
      console.error('Failed to save config:', error);
      // Revert or show error could be handled here
    }
  };

  const resetConfig = async () => {
    if (window.confirm('Are you sure you want to reset all site settings to default?')) {
      setConfig(DEFAULT_CONFIG);
      try {
        await siteService.resetConfig();
      } catch (error) {
        console.error('Failed to reset config:', error);
      }
    }
  };

  return (
    <SiteContext.Provider value={{ config, updateConfig, resetConfig, isLoading }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
