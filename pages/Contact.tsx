
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Linkedin, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useSite } from '../contexts/SiteContext';
import { useLocation } from 'react-router-dom';

export const Contact: React.FC = () => {
  const { config } = useSite();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-fill from navigation state
  useEffect(() => {
    if (location.state) {
      const { interest, message, carName } = location.state as any;
      setFormData(prev => ({
        ...prev,
        interest: interest || prev.interest,
        message: message || (carName ? `I am interested in the ${carName}.` : prev.message)
      }));
    }
  }, [location.state]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Contact Concierge" 
        description={`Contact ${config.siteName} concierge for inquiries, test drives, and support.`} 
      />

      {/* Header */}
      <div className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Contact Concierge</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our dedicated team is available to assist you with inquiries, 
              test drive scheduling, and customization consultations.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2">
          
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 h-fit">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center animate-in fade-in duration-500">
                <div className="rounded-full bg-green-100 p-3 mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Message Sent</h2>
                <p className="mt-4 text-gray-600 max-w-sm">
                  Thank you for contacting us. A concierge member will review your inquiry and respond shortly.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Send an Inquiry</h2>
                <p className="mt-2 text-sm text-gray-500">We typically respond within 24 hours.</p>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                  <fieldset disabled={isSubmitting} className="contents">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
                          First name
                        </label>
                        <div className="relative mt-2.5">
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white transition-all ${
                              errors.firstName 
                                ? 'ring-red-300 focus:ring-red-500' 
                                : 'ring-gray-300 focus:ring-indigo-600'
                            }`}
                          />
                          {errors.firstName && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.firstName && (
                          <p className="mt-2 text-xs text-red-600" id="firstName-error">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">
                          Last name
                        </label>
                        <div className="relative mt-2.5">
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white transition-all ${
                              errors.lastName
                                ? 'ring-red-300 focus:ring-red-500' 
                                : 'ring-gray-300 focus:ring-indigo-600'
                            }`}
                          />
                           {errors.lastName && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
                            </div>
                          )}
                        </div>
                        {errors.lastName && (
                          <p className="mt-2 text-xs text-red-600" id="lastName-error">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="relative mt-2.5">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white transition-all ${
                              errors.email
                                ? 'ring-red-300 focus:ring-red-500' 
                                : 'ring-gray-300 focus:ring-indigo-600'
                            }`}
                        />
                        {errors.email && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-600" id="email-error">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                        Phone number
                      </label>
                      <div className="relative mt-2.5">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white transition-all ${
                              errors.phone
                                ? 'ring-red-300 focus:ring-red-500' 
                                : 'ring-gray-300 focus:ring-indigo-600'
                            }`}
                        />
                         {errors.phone && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-xs text-red-600" id="phone-error">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-semibold leading-6 text-gray-900">
                        Area of Interest
                      </label>
                      <div className="mt-2.5">
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                        >
                          <option>General Inquiry</option>
                          <option>Schedule Test Drive</option>
                          <option>Custom Configuration</option>
                          <option>Press & Media</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                        Message
                      </label>
                      <div className="relative mt-2.5">
                        <textarea
                          name="message"
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white transition-all ${
                              errors.message
                                ? 'ring-red-300 focus:ring-red-500' 
                                : 'ring-gray-300 focus:ring-indigo-600'
                            }`}
                        />
                         {errors.message && (
                          <div className="pointer-events-none absolute top-3 right-0 flex items-center pr-3">
                            <AlertCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      {errors.message && (
                        <p className="mt-2 text-xs text-red-600" id="message-error">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          Send Message <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </fieldset>
                </form>
              </>
            )}
          </div>

          {/* Info Block */}
          <aside className="flex flex-col justify-between">
            <div className="space-y-12">
              <div>
                <h2 className="border-l-4 border-indigo-600 pl-4 text-lg font-semibold text-gray-900">Global Headquarters</h2>
                <div className="mt-4 flex gap-x-4 text-base text-gray-600 pl-5">
                  <MapPin className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                  <p className="whitespace-pre-line">
                    {config.contact.address}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="border-l-4 border-indigo-600 pl-4 text-lg font-semibold text-gray-900">Contact Details</h2>
                <div className="mt-4 space-y-4 pl-5">
                  <div className="flex gap-x-4 text-base text-gray-600">
                    <Phone className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                    <p>{config.contact.phone}</p>
                  </div>
                  <div className="flex gap-x-4 text-base text-gray-600">
                    <Mail className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                    <p>{config.contact.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="border-l-4 border-indigo-600 pl-4 text-lg font-semibold text-gray-900">Showroom Hours</h2>
                <div className="mt-4 flex gap-x-4 text-base text-gray-600 pl-5">
                  <Clock className="h-6 w-6 flex-none text-gray-400" aria-hidden="true" />
                  <div>
                    <p>Mon - Fri: 9am - 8pm</p>
                    <p>Sat: 10am - 6pm</p>
                    <p>Sun: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 lg:mt-0">
               <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Follow Us</h3>
               <nav className="flex gap-6" aria-label="Social Media">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-100 p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" aria-label="Instagram">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-100 p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" aria-label="Twitter">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gray-100 p-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6" />
                  </a>
               </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* Map Placeholder */}
      <section className="h-96 w-full bg-gray-200 grayscale relative" aria-label="Showroom Location Map">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
          alt="Map showing showroom location" 
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="bg-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-indigo-600 animate-pulse" />
              <span className="font-semibold text-gray-900">Showroom Location</span>
           </div>
        </div>
      </section>
    </div>
  );
};
