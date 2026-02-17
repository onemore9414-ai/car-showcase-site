import React from 'react';

export type Page = 'Home' | 'Collection' | 'About' | 'Contact' | 'ProductDetail' | 'PrivacyPolicy' | 'TermsAndConditions' | 'NotFound' | 'ServerError' | 'MaintenanceMode' | 'UserArea' | 'Features' | 'Integrations' | 'Pricing' | 'Blog' | 'Careers' | 'Customers' | 'Community' | 'DPA' | 'Admin' | 'Login' | 'Signup';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  joinedDate: string;
  isVerified?: boolean;
}

export interface AuthResponse {
  user: User | null;
  token: string | null;
  requiresVerification?: boolean;
  message?: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  price: string;
  priceValue: number;
  image: string;
  acceleration: string;
  horsepower: string;
  horsepowerValue: number;
  topSpeed: string;
  description: string;
  featured: boolean;
  type: 'Coupe' | 'Electric' | 'Hypercar' | 'Convertible' | 'SUV';
  specs: {
    fuel: string;
    engine?: string;
    transmission?: string;
    weight?: string;
    range?: string;
  };
}

export interface NavigationItem {
  label: string;
  page: Page;
}

export interface FooterLink {
  label: string;
  href: string;
  page?: Page;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}