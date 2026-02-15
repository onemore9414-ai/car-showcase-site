import { Car } from '../types';

export const CARS: Car[] = [
  {
    id: 'phantom-gt',
    name: 'Phantom GT',
    brand: 'Phantom',
    tagline: 'Flagship Coupe',
    price: 'Starting at $145,000',
    priceValue: 145000,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2072&auto=format&fit=crop',
    acceleration: '3.2s',
    horsepower: '650 HP',
    horsepowerValue: 650,
    topSpeed: '205 mph',
    description: "The Phantom GT isn't just a car; it's a statement. Constructed with a monocoque carbon-fiber chassis, it achieves a power-to-weight ratio that defies physics. Every curve serves an aerodynamic purpose.",
    type: 'Coupe',
    featured: true,
    specs: {
      fuel: 'Petrol',
      engine: 'Mid-Engine V8 Twin-Turbo',
      transmission: '7-Speed Dual Clutch',
      weight: '1,280 kg'
    }
  },
  {
    id: 'vortex-s',
    name: 'Vortex S',
    brand: 'Vortex',
    tagline: 'Electric Performance',
    price: 'Starting at $189,000',
    priceValue: 189000,
    image: 'https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=1964&auto=format&fit=crop',
    acceleration: '2.1s',
    horsepower: '1020 HP',
    horsepowerValue: 1020,
    topSpeed: '200 mph',
    description: "Silence has never been this loud. The Vortex S redefines electric mobility with instant torque vectoring and a range that lets you cross continents on a single charge.",
    type: 'Electric',
    featured: true,
    specs: {
      fuel: 'Electric',
      engine: 'Dual Motor AWD',
      transmission: 'Single Speed Direct Drive',
      weight: '1,950 kg',
      range: '450 miles'
    }
  },
  {
    id: 'apex-one',
    name: 'Apex One',
    brand: 'Apex',
    tagline: 'Hypercar Series',
    price: 'Starting at $2,500,000',
    priceValue: 2500000,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2000&auto=format&fit=crop',
    acceleration: '1.9s',
    horsepower: '1600 HP',
    horsepowerValue: 1600,
    topSpeed: '250+ mph',
    description: "A road-legal missile. The Apex One is the ultimate expression of automotive capability, featuring active aerodynamics and a hybrid powertrain derived directly from Le Mans winners.",
    type: 'Hypercar',
    featured: true,
    specs: {
      fuel: 'Hybrid',
      engine: 'V12 Hybrid Assist',
      transmission: '9-Speed Sequential',
      weight: '1,400 kg'
    }
  },
  {
    id: 'wraith-black',
    name: 'Wraith Black',
    brand: 'Wraith',
    tagline: 'Midnight Edition',
    price: '$320,000',
    priceValue: 320000,
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop',
    acceleration: '3.4s',
    horsepower: '620 HP',
    horsepowerValue: 620,
    topSpeed: '190 mph',
    description: "Darkness reimagined. The Wraith Black edition combines stealth aesthetics with brutal performance.",
    type: 'Coupe',
    featured: true,
    specs: {
      fuel: 'Petrol',
      engine: 'V10 Naturally Aspirated',
      weight: '1,550 kg'
    }
  },
  {
    id: 'celestial-open',
    name: 'Celestial Open',
    brand: 'Celestial',
    tagline: 'Skyward Bound',
    price: '$410,000',
    priceValue: 410000,
    image: 'https://images.unsplash.com/photo-1553260177-f27a6f296365?q=80&w=2000&auto=format&fit=crop',
    acceleration: '2.9s',
    horsepower: '710 HP',
    horsepowerValue: 710,
    topSpeed: '210 mph',
    description: "Drop the top and raise your pulse. The Celestial Open offers an uncompromised open-air experience.",
    type: 'Convertible',
    featured: true,
    specs: {
      fuel: 'Petrol',
      engine: 'V8 Twin-Turbo',
      weight: '1,450 kg'
    }
  },
  {
    id: 'nebula-x',
    name: 'Nebula X',
    brand: 'Nebula',
    tagline: 'Future SUV',
    price: '$165,000',
    priceValue: 165000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1bcfb0?q=80&w=2070&auto=format&fit=crop',
    acceleration: '2.4s',
    horsepower: '850 HP',
    horsepowerValue: 850,
    topSpeed: '180 mph',
    description: "Utility without compromise. The Nebula X brings hypercar performance to the family hauler segment.",
    type: 'SUV',
    featured: false,
    specs: {
      fuel: 'Electric',
      engine: 'Tri-Motor AWD',
      weight: '2,200 kg',
      range: '400 miles'
    }
  }
];