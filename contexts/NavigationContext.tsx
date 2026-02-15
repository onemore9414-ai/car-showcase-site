import React, { createContext, useContext, useState, ReactNode, useTransition } from 'react';
import { Page } from '../types';

interface NavigationContextType {
  currentPage: Page;
  navigationData: any;
  navigateTo: (page: Page, data?: any) => void;
  isNavigating: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [navigationData, setNavigationData] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const navigateTo = (page: Page, data?: any) => {
    // Determine if we should scroll to top immediately or wait
    const shouldScroll = page !== currentPage;

    startTransition(() => {
      setNavigationData(data || null);
      setCurrentPage(page);
    });

    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      navigationData, 
      navigateTo,
      isNavigating: isPending 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};