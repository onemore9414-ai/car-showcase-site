
import React from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Zap, Wind, Gauge, Check, Star, RefreshCw, AlertCircle } from 'lucide-react';
import { useCars } from '../contexts/CarContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { FadeInImage } from '../components/FadeInImage';
import { SEO } from '../components/SEO';
import { NotFound } from './NotFound';
import { Button } from '../components/Button';
import { useNavigation } from '../contexts/NavigationContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, isLoading, error, refreshCars } = useCars();
  const { navigateTo } = useNavigation();
  
  // 1. Load correct car based on URL parameter ID
  const car = cars.find(c => c.id === id);

  const handleOrder = () => {
    navigateTo('Contact', { 
      interest: 'Custom Configuration', 
      carName: car?.name 
    });
  };

  const handleTestDrive = () => {
    navigateTo('Contact', { 
      interest: 'Schedule Test Drive', 
      carName: car?.name 
    });
  };

  // 2. Handle Loading State
  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="h-[60vh] w-full bg-gray-200 animate-pulse relative">
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
           </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
           <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                 <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                 <div className="space-y-4">
                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse"></div>
                 </div>
                 <div className="h-64 bg-gray-50 rounded-xl animate-pulse mt-8"></div>
              </div>
              <div className="mt-12 lg:col-span-5 lg:mt-0 xl:col-span-4">
                 <div className="h-96 bg-gray-50 rounded-2xl animate-pulse"></div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // 3. Handle Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-6 text-center">
        <div className="mb-6 rounded-full bg-red-50 p-6">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Failed to load vehicle</h2>
        <p className="mt-2 text-gray-500 max-w-md mb-8">{error}</p>
        <Button onClick={refreshCars} leftIcon={<RefreshCw className="h-4 w-4" />}>
          Try Again
        </Button>
      </div>
    );
  }

  // 4. Handle Not Found (only after loading is complete)
  if (!car) {
    return <NotFound />;
  }

  return (
    <div className="bg-white">
      <SEO 
        title={car.name} 
        description={car.description || `Discover the ${car.name}, a masterpiece of engineering starting at ${car.price}.`} 
      />

      {/* Product Header / Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-gray-900 lg:h-[70vh]">
        <FadeInImage
          src={car.image}
          alt={`${car.name} Hero View`}
          className="h-full w-full object-cover opacity-90"
          containerClassName="h-full w-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 lg:p-16">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <span className="inline-block rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {car.tagline || car.type || 'Exclusive'}
              </span>
              <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl">
                {car.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-gray-300">
                The culmination of a decade of racing dominance. Sculpted for speed, 
                designed for envy.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-7 xl:col-span-8">
            
            {/* Description */}
            <ScrollReveal>
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900">Engineering Masterpiece</h2>
                <div className="mt-6 space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    {car.description}
                  </p>
                  <p>
                    Inside, the cockpit is a blend of analog precision and digital innovation. 
                    Hand-stitched Alcantara meets aerospace-grade aluminum. The active 
                    suspension reads the road 500 times per second, ensuring that you remain 
                    connected to the tarmac without being punished by it.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* Specs Table */}
            <ScrollReveal delay={100}>
              <section className="mb-16 border-t border-gray-200 pt-10">
                <h2 className="mb-8 text-xl font-bold text-gray-900">Technical Specifications</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">Engine Layout</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                          {car.specs.engine || 'N/A'}
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">Fuel Type</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                          {car.specs.fuel}
                        </td>
                      </tr>
                      {car.specs.range && (
                        <tr className="bg-white transition-colors hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">Range</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                            {car.specs.range}
                          </td>
                        </tr>
                      )}
                      <tr className="bg-white transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">Horsepower</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">{car.horsepower}</td>
                      </tr>
                      <tr className="bg-white transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">Acceleration (0-60)</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                          {car.acceleration}
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">Transmission</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                          {car.specs.transmission || 'Direct Drive'}
                        </td>
                      </tr>
                      <tr className="bg-white transition-colors hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">Dry Weight</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-900">
                           {car.specs.weight || 'N/A'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </ScrollReveal>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="mt-12 lg:col-span-5 lg:mt-0 xl:col-span-4">
            <aside className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
              <ScrollReveal>
                <p className="text-3xl font-bold tracking-tight text-gray-900">{car.price.includes('$') ? car.price.split('at ')[1] || car.price : car.price}</p>
                <p className="mt-2 text-sm text-gray-500">Base price excluding taxes & delivery.</p>

                {/* Key Stats Row */}
                <div className="mt-8 grid grid-cols-3 gap-2 border-y border-gray-100 py-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-gray-400">
                      <Gauge className="h-5 w-5" />
                    </div>
                    <div className="mt-2 text-lg font-bold text-gray-900">{car.acceleration}</div>
                    <div className="text-xs text-gray-500">0-60 mph</div>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <div className="flex items-center justify-center text-gray-400">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="mt-2 text-lg font-bold text-gray-900">{car.horsepower.replace(' HP', '')}</div>
                    <div className="text-xs text-gray-500">Horsepower</div>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <div className="flex items-center justify-center text-gray-400">
                      <Wind className="h-5 w-5" />
                    </div>
                    <div className="mt-2 text-lg font-bold text-gray-900">{car.topSpeed?.replace(' mph', '') || '200+'}</div>
                    <div className="text-xs text-gray-500">Top Speed</div>
                  </div>
                </div>

                {/* Feature List */}
                <ul className="mt-8 space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-indigo-600" />
                    <span className="text-sm text-gray-600">5-Year / 60,000 Mile Warranty</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-indigo-600" />
                    <span className="text-sm text-gray-600">Complimentary Track Day Session</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-indigo-600" />
                    <span className="text-sm text-gray-600">24/7 Concierge Service</span>
                  </li>
                </ul>

                {/* CTA Actions */}
                <div className="mt-10 space-y-4">
                  <button 
                    onClick={handleOrder}
                    className="flex w-full items-center justify-center rounded-lg bg-black px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl hover:scale-[1.02]"
                  >
                    Order Now
                  </button>
                  <button 
                    onClick={handleTestDrive}
                    className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-4 text-base font-bold text-gray-900 transition-colors hover:bg-gray-50 hover:scale-[1.02]"
                  >
                    Schedule Test Drive
                  </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Secure reservation with $1,000 deposit</span>
                </div>
              </ScrollReveal>
            </aside>

            {/* Reviews Mini-Section */}
            <ScrollReveal delay={200}>
              <figure className="mt-8 rounded-2xl bg-gray-50 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <blockquote className="mt-3 text-sm italic text-gray-600">
                  "The most visceral driving experience I've had in years. It begs to be driven hard."
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold text-gray-900">— Top Gear Magazine</figcaption>
              </figure>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
};
