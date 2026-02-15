import React, { useEffect, useState } from 'react';
import { User as UserIcon, Settings, CreditCard, LogOut, Shield, LayoutDashboard, Save, Loader2, CheckCircle, Clock, FileText, Download } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';

type Tab = 'overview' | 'settings' | 'billing';

export const UserArea: React.FC = () => {
  const { user, logout, updateProfile, isAuthenticated, isLoading } = useAuth();
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Form State for Settings
  const [formData, setFormData] = useState({ name: '', email: '', avatar: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('Login');
    }
  }, [isLoading, isAuthenticated, navigateTo]);

  // Sync form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({ 
        name: user.name, 
        email: user.email, 
        avatar: user.avatar || '' 
      });
    }
  }, [user]);

  if (isLoading || !user) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="text-sm text-gray-500">Loading account data...</span>
        </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigateTo('Home');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);
    try {
        await updateProfile(formData);
        setSaveMessage('Profile updated successfully.');
        setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
        console.error(error);
        setSaveMessage('Failed to update profile. Email might be taken.');
    } finally {
        setIsSaving(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
        case 'settings':
            return (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
                        <p className="text-sm text-gray-500 mt-1">Update your personal information and contact details.</p>
                    </div>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
                        {saveMessage && (
                            <div className={`p-4 rounded-md text-sm flex items-center gap-2 ${saveMessage.includes('Failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                {saveMessage.includes('Failed') ? null : <CheckCircle className="h-4 w-4" />}
                                {saveMessage}
                            </div>
                        )}

                        <div className="grid gap-6">
                            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="h-16 w-16 rounded-full overflow-hidden bg-white border border-gray-200 shadow-sm flex-shrink-0">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-gray-300">
                                            <UserIcon className="h-8 w-8" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                                    <input 
                                        type="text" 
                                        value={formData.avatar}
                                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2 bg-white"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Enter a URL for your profile picture.</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 disabled:opacity-70 transition-colors shadow-sm"
                            >
                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            );
        case 'billing':
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Subscription & Billing</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your membership plan and payment methods.</p>
                            </div>
                            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                Active
                            </span>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Current Plan</div>
                                <div className="text-2xl font-bold text-gray-900">Performance+</div>
                                <div className="text-sm text-gray-600 mt-1">$49.00 / month</div>
                                <button className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-500">Change Plan</button>
                            </div>
                            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Payment Method</div>
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                                        <span className="font-serif font-bold italic text-blue-600">Visa</span>
                                    </div>
                                    <span className="font-mono text-gray-900">•••• 4242</span>
                                </div>
                                <div className="text-sm text-gray-600 mt-2">Expires 12/28</div>
                                <button className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500">Update Card</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-sm font-bold text-gray-900">Invoice History</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {[
                                { id: 'INV-2025-001', date: 'Feb 01, 2025', amount: '$49.00', status: 'Paid' },
                                { id: 'INV-2025-002', date: 'Jan 01, 2025', amount: '$49.00', status: 'Paid' },
                                { id: 'INV-2024-012', date: 'Dec 01, 2024', amount: '$49.00', status: 'Paid' },
                            ].map((invoice) => (
                                <div key={invoice.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{invoice.date}</div>
                                            <div className="text-xs text-gray-500">{invoice.id}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-sm font-medium text-gray-900">{invoice.amount}</div>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {invoice.status}
                                            </span>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        case 'overview':
        default:
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Account Age</h3>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{Math.floor((Date.now() - new Date(user.joinedDate).getTime()) / (1000 * 60 * 60 * 24))} Days</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 capitalize">{user.role}</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                    <Save className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Saved Configs</h3>
                            </div>
                            <div className="text-2xl font-bold text-gray-900">0</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
                        <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <LayoutDashboard className="h-8 w-8 text-gray-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2">
                            You haven't configured any vehicles or scheduled any test drives yet. 
                            Explore our collection to get started.
                        </p>
                        <button 
                            onClick={() => navigateTo('Collection')}
                            className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Browse Collection
                        </button>
                    </div>
                </div>
            );
    }
  };

  return (
    <div className="bg-white min-h-[60vh]">
      <SEO title="User Area" description="Manage your account settings and preferences." />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                        <UserIcon className="h-8 w-8" />
                    </div>
                )}
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back, {user.name.split(' ')[0]}</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your personal information and preferences.</p>
            </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Sidebar Navigation */}
             <div className="lg:col-span-3 space-y-6">
                <nav className="flex flex-col gap-1">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'overview' 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'settings' 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </button>
                    <button 
                        onClick={() => setActiveTab('billing')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                            activeTab === 'billing' 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <CreditCard className="h-4 w-4" />
                        Billing
                    </button>
                    
                    {user.email === 'onemore9414@gmail.com' && (
                        <button 
                            onClick={() => navigateTo('Admin')}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors mt-2"
                        >
                            <Shield className="h-4 w-4" />
                            Admin Panel
                        </button>
                    )}

                    <div className="h-px bg-gray-200 my-2" />

                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </nav>
             </div>

             {/* Main Content Area */}
             <div className="lg:col-span-9">
                {renderContent()}
             </div>
        </div>
      </div>
    </div>
  );
};