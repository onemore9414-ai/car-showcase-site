import React, { Suspense, lazy, useEffect } from 'react';
import { Layout } from './components/Layout';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { CarProvider } from './contexts/CarContext';
import { SiteProvider } from './contexts/SiteContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';
import { Page } from './types';

// Lazy load pages to reduce initial bundle size (Code Splitting)
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Collection = lazy(() => import('./pages/Collection').then(module => ({ default: module.Collection })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Features = lazy(() => import('./pages/Features').then(module => ({ default: module.Features })));
const Integrations = lazy(() => import('./pages/Integrations').then(module => ({ default: module.Integrations })));
const Pricing = lazy(() => import('./pages/Pricing').then(module => ({ default: module.Pricing })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const Careers = lazy(() => import('./pages/Careers').then(module => ({ default: module.Careers })));
const Customers = lazy(() => import('./pages/Customers').then(module => ({ default: module.Customers })));
const Community = lazy(() => import('./pages/Community').then(module => ({ default: module.Community })));
const DPA = lazy(() => import('./pages/DPA').then(module => ({ default: module.DPA })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(module => ({ default: module.TermsAndConditions })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const ServerError = lazy(() => import('./pages/ServerError').then(module => ({ default: module.ServerError })));
const MaintenanceMode = lazy(() => import('./pages/MaintenanceMode').then(module => ({ default: module.MaintenanceMode })));
const UserArea = lazy(() => import('./pages/UserArea').then(module => ({ default: module.UserArea })));
const Admin = lazy(() => import('./pages/Admin').then(module => ({ default: module.Admin })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Signup = lazy(() => import('./pages/Signup').then(module => ({ default: module.Signup })));

const LoadingFallback = () => (
  <div className="flex h-[60vh] w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">Loading</span>
    </div>
  </div>
);

// Helper component to handle redirection
const Redirect: React.FC<{ to: Page }> = ({ to }) => {
  const { navigateTo } = useNavigation();
  
  useEffect(() => {
    console.log(`[Redirect] Performing redirect to: ${to}`);
    navigateTo(to);
  }, [to, navigateTo]);

  return <LoadingFallback />;
};

// Protected Route Wrapper for Admin
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TEMP ADMIN ACCESS — REMOVE BEFORE PRODUCTION
  return <>{children}</>;
};

const MainContent: React.FC = () => {
  const { currentPage } = useNavigation();

  useEffect(() => {
    console.log('[MainContent] Current Page:', currentPage);
  }, [currentPage]);

  // Helper to render the correct lazy component
  const renderPage = () => {
    switch (currentPage) {
      case 'Home': return <Home />;
      case 'Collection': return <Collection />;
      case 'ProductDetail': return <ProductDetail />;
      case 'About': return <About />;
      case 'Contact': return <Contact />;
      case 'Features': return <Features />;
      case 'Integrations': return <Integrations />;
      case 'Pricing': return <Pricing />;
      case 'Blog': return <Blog />;
      case 'Careers': return <Careers />;
      case 'Customers': return <Customers />;
      case 'Community': return <Community />;
      case 'DPA': return <DPA />;
      case 'PrivacyPolicy': return <PrivacyPolicy />;
      case 'TermsAndConditions': return <TermsAndConditions />;
      case 'ServerError': return <ServerError />;
      case 'MaintenanceMode': return <MaintenanceMode />;
      case 'UserArea': return <UserArea />;
      case 'Admin': return (
        <AdminRoute>
          <Admin />
        </AdminRoute>
      );
      case 'Login': return <Login />;
      case 'Signup': return <Signup />;
      default: return <NotFound />;
    }
  };

  return (
    <ErrorBoundary key={currentPage}>
      <div className="page-enter">
        <Suspense fallback={<LoadingFallback />}>
          {renderPage()}
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationProvider>
        <SiteProvider>
          <CarProvider>
            <Layout>
              <MainContent />
            </Layout>
          </CarProvider>
        </SiteProvider>
      </NavigationProvider>
    </AuthProvider>
  );
};

export default App;