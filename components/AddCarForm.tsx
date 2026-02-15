import React, { useState, useEffect, useRef } from 'react';
import { X, Save, AlertCircle, Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { Car } from '../types';

interface AddCarFormProps {
  onClose: () => void;
  onSubmit: (car: Car) => void;
  initialData?: Car;
  isLoading?: boolean;
}

export const AddCarForm: React.FC<AddCarFormProps> = ({ onClose, onSubmit, initialData, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    tagline: initialData?.tagline || '',
    price: initialData?.price || '',
    horsepower: initialData?.horsepower || '',
    topSpeed: initialData?.topSpeed || '',
    acceleration: initialData?.acceleration || '',
    imageUrl: initialData?.image || '',
    description: initialData?.description || '',
    featured: initialData?.featured || false,
    type: (initialData?.type || 'Coupe') as Car['type'],
    // Extended Specs
    engine: initialData?.specs?.engine || '',
    transmission: initialData?.specs?.transmission || '',
    weight: initialData?.specs?.weight || '',
    range: initialData?.specs?.range || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        brand: initialData.brand,
        tagline: initialData.tagline || '',
        price: initialData.price,
        horsepower: initialData.horsepower,
        topSpeed: initialData.topSpeed,
        acceleration: initialData.acceleration,
        imageUrl: initialData.image,
        description: initialData.description,
        featured: initialData.featured,
        type: initialData.type,
        engine: initialData.specs.engine || '',
        transmission: initialData.specs.transmission || '',
        weight: initialData.specs.weight || '',
        range: initialData.specs.range || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Vehicle name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    // Performance validation
    if (!formData.horsepower.trim()) newErrors.horsepower = 'Horsepower is required';
    if (!formData.acceleration.trim()) newErrors.acceleration = 'Acceleration is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Image Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, imageUrl: event.target?.result as string }));
          // Clear error if exists
          if (errors.imageUrl) {
            setErrors(prev => {
              const next = { ...prev };
              delete next.imageUrl;
              return next;
            });
          }
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to top of form if errors exist
      const formContainer = document.getElementById('add-car-form-container');
      if (formContainer) formContainer.scrollTop = 0;
      return;
    }

    const priceValue = parseInt(formData.price.replace(/[^0-9]/g, '')) || 0;
    const horsepowerValue = parseInt(formData.horsepower.replace(/[^0-9]/g, '')) || 0;

    const newCar: Car = {
      id: initialData?.id || `custom-${Date.now()}`,
      name: formData.name,
      brand: formData.brand,
      tagline: formData.tagline || (formData.type === 'Electric' ? 'Electric Performance' : 'Engineered for Speed'),
      price: formData.price,
      priceValue,
      image: formData.imageUrl,
      acceleration: formData.acceleration,
      horsepower: formData.horsepower,
      horsepowerValue,
      topSpeed: formData.topSpeed || 'TBD',
      description: formData.description,
      featured: formData.featured,
      type: formData.type,
      specs: {
        fuel: formData.type === 'Electric' ? 'Electric' : 'Petrol',
        engine: formData.engine || (formData.type === 'Electric' ? 'Dual Motor' : 'V8 Bi-Turbo'),
        transmission: formData.transmission || (formData.type === 'Electric' ? 'Direct Drive' : '8-Speed Automatic'),
        weight: formData.weight || 'TBD',
        range: formData.range
      }
    };

    onSubmit(newCar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div id="add-car-form-container" className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-md px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {initialData ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Updates will be reflected immediately in the global store.</p>
          </div>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          <fieldset disabled={isLoading} className="contents">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Image Upload */}
              <div className="lg:col-span-1 space-y-4">
                 <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-2">Vehicle Imagery</h3>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Main Photo <span className="text-red-500">*</span></label>
                    
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`
                        relative w-full aspect-[4/3] rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center overflow-hidden bg-gray-50 cursor-pointer group
                        ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
                        ${errors.imageUrl ? 'border-red-300 bg-red-50' : ''}
                      `}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {formData.imageUrl ? (
                        <>
                          <img src={formData.imageUrl} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                            Click to change
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6 pointer-events-none">
                          <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                             {isDragging ? <Upload className="h-full w-full animate-bounce" /> : <ImageIcon className="h-full w-full" />}
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {isDragging ? 'Drop image here' : 'Click or drop image'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileSelect}
                      />
                    </div>

                    <div className="text-center">
                       <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">OR</span>
                    </div>

                    <input
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      className={`w-full rounded-lg border px-4 py-2 text-xs outline-none focus:ring-2 transition-all ${errors.imageUrl ? 'border-red-300 ring-red-100 focus:border-red-500' : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'}`}
                      placeholder="Paste image URL directly"
                    />
                    {errors.imageUrl && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.imageUrl}</p>}
                 </div>

                 {/* Featured Toggle */}
                 <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 mt-6">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-indigo-300 transition-all checked:border-indigo-600 checked:bg-indigo-600"
                          />
                          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                      </div>
                      <div>
                          <span className="block text-sm font-bold text-gray-900">Featured Vehicle</span>
                          <span className="block text-xs text-gray-500">Display in Hero carousel.</span>
                      </div>
                    </label>
                 </div>
              </div>

              {/* Middle & Right: details */}
              <div className="lg:col-span-2 space-y-6">
                 {/* Section 1: Core Identity */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-2">Core Identity</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Model Name <span className="text-red-500">*</span></label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-300 ring-red-100 focus:border-red-500' : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'}`}
                        placeholder="e.g. Phantom GT"
                      />
                      {errors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Brand <span className="text-red-500">*</span></label>
                      <input
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all ${errors.brand ? 'border-red-300 ring-red-100 focus:border-red-500' : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'}`}
                        placeholder="e.g. Brand Automotive"
                      />
                      {errors.brand && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.brand}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Body Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 bg-white"
                      >
                        <option value="Coupe">Coupe</option>
                        <option value="Electric">Electric</option>
                        <option value="Hypercar">Hypercar</option>
                        <option value="Convertible">Convertible</option>
                        <option value="SUV">SUV</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Marketing Tagline</label>
                      <input
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        placeholder="e.g. The Future of Speed"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Performance & Specs */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 border-b border-indigo-100 pb-2">Performance & Specs</h3>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Price <span className="text-red-500">*</span></label>
                      <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all ${errors.price ? 'border-red-300 ring-red-100 focus:border-red-500' : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'}`}
                        placeholder="e.g. $145,000"
                      />
                      {errors.price && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.price}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Horsepower <span className="text-red-500">*</span></label>
                      <input
                        name="horsepower"
                        value={formData.horsepower}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all ${errors.horsepower ? 'border-red-300 ring-red-100 focus:border-red-500' : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'}`}
                        placeholder="e.g. 750 HP"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-gray-500">Acceleration</label>
                      <input
                        name="acceleration"
                        value={formData.acceleration}
                        onChange={handleChange}
                        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all ${errors.acceleration ? 'border-red-300 ring-red-100 focus:border-red-500' : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'}`}
                        placeholder="e.g. 2.8s"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Top Speed</label>
                        <input
                        name="topSpeed"
                        value={formData.topSpeed}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        placeholder="e.g. 210 mph"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Engine / Motor</label>
                        <input
                        name="engine"
                        value={formData.engine}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        placeholder="e.g. V8 Twin-Turbo or Dual Motor"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Transmission</label>
                        <input
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                        placeholder="e.g. 8-Speed Dual Clutch"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Weight / Range</label>
                        <div className="flex gap-2">
                          <input
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="w-1/2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                          placeholder="Weight (kg)"
                          />
                          <input
                          name="range"
                          value={formData.range}
                          onChange={handleChange}
                          className="w-1/2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                          placeholder="Range (mi)"
                          />
                        </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Description <span className="text-red-500">*</span></label>
                  <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:ring-2 transition-all resize-none ${errors.description ? 'border-red-300 ring-red-100 focus:border-red-500' : 'border-gray-200 focus:border-indigo-600 focus:ring-indigo-100'}`}
                    placeholder="Describe the vehicle's key features, history, and driving experience..."
                  />
                  {errors.description && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.description}</p>}
                </div>

              </div>
            </div>
          </fieldset>

          {/* Footer Actions */}
          <div className="sticky bottom-0 -mx-6 -mb-6 border-t border-gray-200 bg-white px-6 py-4 flex justify-end gap-3 z-10">
             <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-8 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {initialData ? 'Update Vehicle' : 'Save Vehicle'}
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};