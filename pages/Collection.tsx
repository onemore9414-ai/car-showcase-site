import React, { useReducer, useMemo } from 'react';
import { Filter, ChevronDown, X, RotateCcw, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { useCars } from '../contexts/CarContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { CarCard } from '../components/CarCard';

const TYPES = ['All Models', 'Coupe', 'Convertible', 'Hypercar', 'Electric', 'SUV'];

// Reducer for filtering state
type FilterState = {
  isFiltersOpen: boolean;
  type: string;
  brand: string;
  minPrice: number | '';
  maxPrice: number | '';
  minHp: number;
};

type FilterAction =
  | { type: 'TOGGLE_PANEL' }
  | { type: 'SET_TYPE'; payload: string }
  | { type: 'SET_BRAND'; payload: string }
  | { type: 'SET_MIN_PRICE'; payload: number | '' }
  | { type: 'SET_MAX_PRICE'; payload: number | '' }
  | { type: 'SET_MIN_HP'; payload: number }
  | { type: 'RESET' };

const initialFilterState: FilterState = {
  isFiltersOpen: false,
  type: 'All Models',
  brand: 'All Brands',
  minPrice: '',
  maxPrice: '',
  minHp: 0,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'TOGGLE_PANEL': return { ...state, isFiltersOpen: !state.isFiltersOpen };
    case 'SET_TYPE': return { ...state, type: action.payload };
    case 'SET_BRAND': return { ...state, brand: action.payload };
    case 'SET_MIN_PRICE': return { ...state, minPrice: action.payload };
    case 'SET_MAX_PRICE': return { ...state, maxPrice: action.payload };
    case 'SET_MIN_HP': return { ...state, minHp: action.payload };
    case 'RESET': return { ...initialFilterState, isFiltersOpen: state.isFiltersOpen };
    default: return state;
  }
}

export const Collection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { cars, isLoading, error, refreshCars } = useCars();
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  const brands = useMemo(() => {
    if (isLoading) return ['All Brands'];
    return ['All Brands', ...Array.from(new Set(cars.map(c => c.brand)))];
  }, [cars, isLoading]);

  // Filter Logic
  const filteredCars = useMemo(() => {
    if (isLoading) return [];
    
    return cars.filter(car => {
      // Type Filter
      if (state.type !== 'All Models' && car.type !== state.type) return false;
      
      // Brand Filter
      if (state.brand !== 'All Brands' && car.brand !== state.brand) return false;
      
      // Price Filter
      if (state.minPrice !== '' && car.priceValue < Number(state.minPrice)) return false;
      if (state.maxPrice !== '' && car.priceValue > Number(state.maxPrice)) return false;
      
      // Horsepower Filter
      if (car.horsepowerValue < state.minHp) return false;

      return true;
    });
  }, [state, cars, isLoading]);

  const activeFiltersCount = [
    state.type !== 'All Models',
    state.brand !== 'All Brands',
    state.minPrice !== '',
    state.maxPrice !== '',
    state.minHp > 0
  ].filter(Boolean).length;

  // Render Loading Skeleton
  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        <SEO title="Our Collection" description="Loading vehicle inventory..." />
        
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-8 animate-pulse">
           <div className="h-10 w-64 bg-gray-200 rounded-lg" />
           <div className="h-6 w-full max-w-2xl bg-gray-100 rounded-lg" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex gap-4 animate-pulse">
           {[1,2,3,4].map(i => <div key={i} className="h-10 w-24 bg-gray-100 rounded-full" />)}
        </div>

        {/* Grid Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3,4,5,6].map(i => (
             <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white h-[420px]">
                <div className="h-[260px] bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                   <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                   <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="h-10 bg-gray-50 rounded animate-pulse" />
                      <div className="h-10 bg-gray-50 rounded animate-pulse" />
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 animate-in fade-in zoom-in duration-300">
        <SEO title="Error" description="Failed to load collection" />
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Collection</h2>
        <p className="text-gray-500 mb-8 max-w-md">{error}</p>
        <button 
          onClick={refreshCars}
          className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl active:scale-95"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <SEO 
        title="Our Exclusive Collection" 
        description="Explore our exclusive inventory of precision-engineered machines. From flagship coupes to electric performance vehicles, find your perfect drive." 
      />

      {/* Header Section */}
      <header className="flex flex-col gap-4 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">The Collection</h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Explore our exclusive inventory of precision-engineered machines. 
          Each model represents the pinnacle of automotive craftsmanship.
        </p>
      </header>

      {/* Filter Bar */}
      <section aria-label="Filters">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => dispatch({ type: 'SET_TYPE', payload: type })}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    state.type === type
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                  onClick={() => dispatch({ type: 'TOGGLE_PANEL' })}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    state.isFiltersOpen || activeFiltersCount > 0
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
               >
                 {state.isFiltersOpen ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                 <span>Filters</span>
                 {activeFiltersCount > 0 && (
                   <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                     {activeFiltersCount}
                   </span>
                 )}
               </button>
               <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                 <span>Sort by: Featured</span>
                 <ChevronDown className="h-4 w-4" />
               </button>
            </div>
          </div>

          {/* Collapsible Filter Panel */}
          {state.isFiltersOpen && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                
                {/* Brand Filter */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Brand</label>
                  <div className="relative">
                    <select 
                      value={state.brand}
                      onChange={(e) => dispatch({ type: 'SET_BRAND', payload: e.target.value })}
                      className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={state.minPrice}
                      onChange={(e) => dispatch({ type: 'SET_MIN_PRICE', payload: e.target.value ? Number(e.target.value) : '' })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={state.maxPrice}
                      onChange={(e) => dispatch({ type: 'SET_MAX_PRICE', payload: e.target.value ? Number(e.target.value) : '' })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-shadow"
                    />
                  </div>
                </div>

                {/* Horsepower Filter */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Min Horsepower</label>
                    <span className="text-xs font-medium text-indigo-600">{state.minHp} HP+</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1600"
                    step="50"
                    value={state.minHp}
                    onChange={(e) => dispatch({ type: 'SET_MIN_HP', payload: Number(e.target.value) })}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-black transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>0 HP</span>
                    <span>1600 HP</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-end">
                  <button
                    onClick={() => dispatch({ type: 'RESET' })}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Car Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car, index) => (
            <ScrollReveal key={car.id} delay={index * 100}>
              <CarCard 
                image={car.image}
                name={car.name}
                price={car.price}
                acceleration={car.acceleration}
                horsepower={car.horsepower}
                onViewDetails={() => navigateTo('ProductDetail', { id: car.id })}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in duration-300 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <div className="mb-4 rounded-full bg-white p-4 shadow-sm ring-1 ring-gray-100">
             <Filter className="h-8 w-8 text-gray-400" />
           </div>
           <h2 className="text-lg font-semibold text-gray-900">No vehicles found</h2>
           <p className="mt-2 text-gray-500 max-w-sm">We couldn't find any vehicles matching your current filters. Try adjusting your criteria.</p>
           <button 
             onClick={() => dispatch({ type: 'RESET' })}
             className="mt-6 font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
           >
             Clear all filters
           </button>
        </div>
      )}

      {/* Pagination (Visual Only) */}
      {filteredCars.length > 0 && (
        <div className="mt-8 flex items-center justify-center border-t border-gray-200 pt-8">
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white shadow-lg">1</button>
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">Next</button>
          </nav>
        </div>
      )}
    </div>
  );
};
