import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import { SEO } from '../components/SEO';
import { ArrowRight, Loader2, AlertCircle, User, Mail, Lock, Check } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const { navigateTo } = useNavigation();
  const { config } = useSite();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !confirmEmail || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      setError('Email addresses do not match');
      return;
    }
    
    if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
    }

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    if (!agreeTerms) {
        setError('You must accept the Terms and Conditions to continue');
        return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await signup(name, email, password);
      navigateTo('UserArea');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-950 py-12">
      <SEO title="Create Account" description="Join Brand Automotive." />
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1887&auto=format&fit=crop"
          alt="Luxury Car Interior"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      <div className="relative z-10 w-full max-w-xl px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Glass Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl ring-1 ring-black/5">
          
          {/* Header */}
          <div className="mb-8 text-center">
             <h2 className="text-3xl font-light tracking-tight text-white font-serif">
               Join the Elite
             </h2>
             <p className="mt-2 text-sm text-gray-400">
               Create your account to configure vehicles and access exclusive events.
             </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-200 animate-pulse">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div className="group relative">
                <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-indigo-400">Full Name</label>
                <div className="relative">
                   <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white">
                      <User className="h-5 w-5" />
                   </div>
                   <input
                     id="name"
                     type="text"
                     required
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                     placeholder="John Doe"
                   />
                </div>
              </div>

              {/* Emails Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div className="group relative">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-indigo-400">Email</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white">
                          <Mail className="h-5 w-5" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                 </div>
                 <div className="group relative">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-indigo-400">Confirm Email</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white">
                          <Check className="h-5 w-5" />
                      </div>
                      <input
                        id="confirmEmail"
                        type="email"
                        autoComplete="email"
                        required
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                 </div>
              </div>

              {/* Passwords Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <div className="group relative">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-indigo-400">Password</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white">
                          <Lock className="h-5 w-5" />
                      </div>
                      <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                 </div>
                 <div className="group relative">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-indigo-400">Confirm Password</label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white">
                          <Check className="h-5 w-5" />
                      </div>
                      <input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                 </div>
              </div>

              {/* Terms */}
              <div className="flex items-start pt-2">
                <div className="flex h-6 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-600 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900 cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="terms" className="text-gray-400 select-none">
                    I agree to the <button type="button" onClick={() => navigateTo('TermsAndConditions')} className="font-semibold text-white hover:text-indigo-400 hover:underline">Terms and Conditions</button>.
                  </label>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black shadow-lg transition-all hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                {isSubmitting ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                    </>
                ) : (
                    <>
                    Create Account <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
             <p className="text-sm text-gray-500">
               Already have an account? <button onClick={() => navigateTo('Login')} className="font-semibold text-white hover:text-indigo-400 hover:underline">Sign In</button>
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};