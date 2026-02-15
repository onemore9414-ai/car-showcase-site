import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Loader2, User } from 'lucide-react';
import { NavigationItem } from '../types';
import { useNavigation } from '../contexts/NavigationContext';
import { useSite } from '../contexts/SiteContext';
import { useAuth } from '../contexts/AuthContext';

const NAV_ITEMS: NavigationItem[] = [
  { label: 'Home', page: 'Home' },
  { label: 'Collection', page: 'Collection' },
  { label: 'About', page: 'About' },
  { label: 'Contact', page: 'Contact' },
  { label: 'Admin', page: 'Admin' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentPage, navigateTo, isNavigating } = useNavigation();
  const { config } = useSite();
  const { isAuthenticated, user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (page: typeof NAV_ITEMS[0]['page']) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  // Handle Resize: Close mobile menu if window becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Handle Body Scroll Lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      {/* Navigation Loading Indicator */}
      {isNavigating && (
        <div className="absolute top-0 left-0 h-0.5 w-full bg-gray-100 overflow-hidden">
          <div className="h-full bg-brand-600 animate-[loading_1s_ease-in-out_infinite] w-1/3" />
        </div>
      )}
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Area */}
        <div 
          className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md p-1" 
          onClick={() => navigateTo('Home')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigateTo('Home');
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`${config.siteName} Home`}
        >
          {config.logoUrl ? (
            <img 
              src={config.logoUrl} 
              alt={config.siteName} 
              className="h-8 w-auto object-contain"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white transition-transform hover:scale-105">
              {isNavigating ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Globe className="h-5 w-5" aria-hidden="true" />
              )}
            </div>
          )}
          <span className="text-lg font-semibold text-gray-900">{config.siteName}</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-x-8" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.page)}
              className={`text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md px-2 py-1 ${
                currentPage === item.page 
                  ? 'text-brand-600' 
                  : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
              }`}
              aria-current={currentPage === item.page ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <div className="h-8 w-px bg-gray-200" aria-hidden="true" />
          
          {isAuthenticated ? (
            <button 
              onClick={() => navigateTo('UserArea')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-full pl-1 pr-3 py-1 ${
                  currentPage === 'UserArea' 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                 {user?.name.charAt(0)}
              </div>
              Account
            </button>
          ) : (
            <button 
              onClick={() => navigateTo('Login')}
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-md px-3 py-1.5 ${
                  currentPage === 'Login' 
                    ? 'bg-black text-white' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle main menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white absolute w-full shadow-lg h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="space-y-1 px-4 pb-3 pt-2" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`block w-full text-left rounded-md px-3 py-4 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                  currentPage === item.page
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand-600'
                }`}
                aria-current={currentPage === item.page ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="border-t border-gray-200 px-4 py-4 space-y-3">
             {isAuthenticated ? (
               <button 
                  onClick={() => {
                    navigateTo('UserArea');
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                >
                 <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {user?.name.charAt(0)}
                 </div>
                 My Account
               </button>
             ) : (
               <>
                 <button 
                    onClick={() => {
                      navigateTo('Login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full rounded-md bg-gray-50 px-3 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100"
                  >
                   Log In
                 </button>
                 <button 
                    onClick={() => {
                      navigateTo('Signup');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full rounded-md bg-black px-3 py-3 text-center text-base font-medium text-white hover:bg-gray-800"
                  >
                   Sign Up
                 </button>
               </>
             )}
          </div>
        </div>
      )}
    </header>
  );
};