import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';
import { SEO } from '../components/SEO';
import { ArrowRight, Loader2, AlertCircle, Mail, Lock, Globe, KeyRound, CheckCircle } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

type ViewState = 'login' | 'forgot' | 'reset';

export const Login: React.FC = () => {
  const { login, forgotPassword, resetPassword } = useAuth();
  const { navigateTo } = useNavigation();
  const { config } = useSite();
  
  const [view, setView] = useState<ViewState>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // LOGIN FLOW
    if (view === 'login') {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      setIsSubmitting(true);
      try {
        await login(email, password);
        navigateTo('UserArea');
      } catch (err: any) {
        setError(err.message || 'Failed to login');
      } finally {
        setIsSubmitting(false);
      }
    } 
    // FORGOT PASSWORD FLOW
    else if (view === 'forgot') {
      if (!email) {
        setError('Please enter your email');
        return;
      }
      setIsSubmitting(true);
      try {
        await forgotPassword(email);
        setSuccessMsg('Reset code sent to your email (Check Console)');
        setView('reset');
      } catch (err: any) {
        setError(err.message || 'Failed to send code');
      } finally {
        setIsSubmitting(false);
      }
    } 
    // RESET PASSWORD FLOW
    else if (view === 'reset') {
      if (!resetCode || !newPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      setIsSubmitting(true);
      try {
        await resetPassword(email, resetCode, newPassword);
        setSuccessMsg('Password reset successfully. Please log in.');
        // Reset local form state for clean login
        setPassword(''); 
        setView('login');
      } catch (err: any) {
        setError(err.message || 'Failed to reset password');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-950">
      <SEO title="Sign In" description="Access your Brand Automotive account." />
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Car Background"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-in fade-in zoom-in duration-700">
        {/* Glass Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl ring-1 ring-black/5">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner ring-1 ring-white/20">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt="Logo" className="h-8 w-8 object-contain" />
              ) : (
                <Globe className="h-8 w-8" />
              )}
            </div>
            <h2 className="text-3xl font-light tracking-tight text-white font-serif">
              {view === 'login' ? 'Welcome Back' : view === 'forgot' ? 'Reset Password' : 'New Password'}
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              {view === 'login' ? 'Sign in to access your garage and configuration.' : 
               view === 'forgot' ? 'Enter your email to receive a verification code.' :
               'Enter the code and your new password.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-200 animate-pulse">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            
            {successMsg && (
              <div className="flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-green-200 animate-in fade-in slide-in-from-top-2">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{successMsg}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Field - Always visible except potentially in reset view if we wanted to hide it, but keeping it is better UX */}
              <div className="group relative">
                <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors group-focus-within:text-indigo-400">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={view === 'reset'}
                    className={`block w-full rounded-xl border bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 sm:text-sm transition-all ${
                      view === 'reset' 
                        ? 'border-transparent text-gray-400 cursor-not-allowed' 
                        : 'border-white/10 focus:border-indigo-500 focus:bg-white/10 focus:ring-indigo-500'
                    }`}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Login View: Password */}
              {view === 'login' && (
                <div className="group relative animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="mb-1 flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors group-focus-within:text-indigo-400">
                      Password
                    </label>
                    <button 
                      type="button" 
                      onClick={() => { setError(null); setView('forgot'); }}
                      className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white transition-colors">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {/* Reset View: Code & New Password */}
              {view === 'reset' && (
                <>
                  <div className="group relative animate-in fade-in slide-in-from-right-4 duration-300">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors group-focus-within:text-indigo-400">
                      Verification Code
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white transition-colors">
                        <KeyRound className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        required
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all font-mono tracking-widest"
                        placeholder="000000"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="group relative animate-in fade-in slide-in-from-right-4 duration-300 delay-100">
                    <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors group-focus-within:text-indigo-400">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-white transition-colors">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

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
                  {view === 'login' ? 'Sign In' : view === 'forgot' ? 'Send Code' : 'Reset Password'} 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-transparent px-4 text-gray-500">
                  {view === 'login' ? 'New to Brand?' : 'Remember it?'}
                </span>
              </div>
            </div>

            {view === 'login' ? (
              <button
                onClick={() => navigateTo('Signup')}
                className="mt-6 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/20"
              >
                Create Account
              </button>
            ) : (
              <button
                onClick={() => { setError(null); setSuccessMsg(null); setView('login'); }}
                className="mt-6 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/20"
              >
                Back to Sign In
              </button>
            )}
          </div>
          
          {/* Demo Hint */}
          <div className="mt-8 rounded-lg bg-indigo-900/20 p-4 border border-indigo-500/20 text-center">
            <p className="text-[10px] text-indigo-300 uppercase tracking-wide">Demo Mode Active</p>
            <p className="mt-1 text-xs text-gray-400">Use <span className="font-mono text-white">admin@brand.com</span> for admin features.</p>
          </div>

        </div>
      </div>
    </div>
  );
};