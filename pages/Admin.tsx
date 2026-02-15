
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Car as CarIcon, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  RotateCcw, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  DollarSign,
  TrendingUp,
  Activity,
  ChevronRight,
  Shield,
  Mail
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Car, User } from '../types';
import { AddCarForm } from '../components/AddCarForm';
import { useCars } from '../contexts/CarContext';
import { useSite, SiteConfig } from '../contexts/SiteContext';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../contexts/NavigationContext';

type AdminView = 'dashboard' | 'inventory' | 'customers' | 'orders' | 'settings';
type ToastType = { id: number; message: string; type: 'success' | 'error' | 'info' };

export const Admin: React.FC = () => {
  const { cars: inventory, deleteCar, addCar, updateCar, resetInventory } = useCars();
  const { config, updateConfig, resetConfig } = useSite();
  const { logout } = useAuth();
  const { navigateTo } = useNavigation();
  
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Inventory State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Users State
  const [users, setUsers] = useState<User[]>([]);
  
  // Global Toast State
  const [toasts, setToasts] = useState<ToastType[]>([]);

  // Fetch Users on Load/View Change
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.get<User[]>('/users');
        setUsers(data);
      } catch (e) {
        console.error("Failed to fetch users");
      }
    };
    if (currentView === 'customers' || currentView === 'dashboard') {
      fetchUsers();
    }
  }, [currentView]);

  // Toast System
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // --- Handlers ---
  const handleLogout = async () => {
    await logout();
    navigateTo('Home');
  };

  const handleExport = () => {
    // Mock export functionality
    showToast('Exporting data to CSV...', 'info');
    setTimeout(() => showToast('Export completed', 'success'), 1500);
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting:", id);
    
    if (!id) {
        console.error("Error: No ID provided for delete operation");
        showToast('Error: Invalid vehicle ID', 'error');
        return;
    }

    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        console.log(`[Admin] Initiating delete for ${id}`);
        await deleteCar(id);
        
        console.log(`[Admin] Delete confirmed for ${id}`);
        showToast('Vehicle deleted successfully', 'success');
      } catch (error) {
        console.error(`[Admin] Delete failed for ${id}`, error);
        showToast('Failed to delete vehicle', 'error');
      }
    }
  };

  const handleEditClick = (e: React.MouseEvent, car: Car) => {
    e.stopPropagation();
    setEditingCar(car);
    setIsAddModalOpen(true);
  };

  const handleToggleFeatured = async (car: Car) => {
    try {
      await updateCar({ ...car, featured: !car.featured });
      showToast(`Vehicle ${!car.featured ? 'featured' : 'un-featured'}`, 'success');
    } catch (error) {
      showToast('Update failed', 'error');
    }
  };

  const handleSaveCar = async (car: Car) => {
    setIsProcessing(true);
    try {
      if (editingCar) {
        await updateCar(car);
        showToast('Vehicle updated', 'success');
      } else {
        await addCar(car);
        showToast('Vehicle created', 'success');
      }
      setIsAddModalOpen(false);
      setEditingCar(null);
    } catch (error) {
      showToast('Failed to save', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfigChange = (section: keyof SiteConfig, key: string, value: string) => {
    const newConfig = { ...config };
    if (section === 'siteName' || section === 'logoUrl' || section === 'termsAndConditions') {
      (newConfig as any)[section] = value;
    } else {
      (newConfig as any)[section] = {
        ...(newConfig as any)[section],
        [key]: value
      };
    }
    updateConfig(newConfig);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateConfig({ ...config, logoUrl: event.target.result as string });
          showToast('Logo updated', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Views ---

  const DashboardStats = () => {
    const totalValue = inventory.reduce((acc, car) => acc + (car.priceValue || 0), 0);
    const avgPrice = inventory.length > 0 ? totalValue / inventory.length : 0;
    
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
             <div className="flex items-center justify-between mb-4">
               <span className="text-gray-500 text-sm font-medium">Total Inventory</span>
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CarIcon size={20} /></div>
             </div>
             <span className="text-3xl font-bold text-gray-900">{inventory.length}</span>
             <span className="text-xs text-green-600 mt-2 flex items-center gap-1"><TrendingUp size={12} /> +2 this week</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
             <div className="flex items-center justify-between mb-4">
               <span className="text-gray-500 text-sm font-medium">Portfolio Value</span>
               <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={20} /></div>
             </div>
             <span className="text-3xl font-bold text-gray-900">${(totalValue / 1000000).toFixed(1)}M</span>
             <span className="text-xs text-gray-400 mt-2">Avg. ${(avgPrice / 1000).toFixed(0)}k / unit</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
             <div className="flex items-center justify-between mb-4">
               <span className="text-gray-500 text-sm font-medium">Registered Users</span>
               <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Users size={20} /></div>
             </div>
             <span className="text-3xl font-bold text-gray-900">{users.length}</span>
             <span className="text-xs text-green-600 mt-2 flex items-center gap-1"><TrendingUp size={12} /> +12% growth</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
             <div className="flex items-center justify-between mb-4">
               <span className="text-gray-500 text-sm font-medium">Active Orders</span>
               <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><ShoppingCart size={20} /></div>
             </div>
             <span className="text-3xl font-bold text-gray-900">3</span>
             <span className="text-xs text-gray-400 mt-2">Requires attention</span>
          </div>
        </div>

        {/* Recent Activity Table Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Recent Activity</h3>
              <button 
                onClick={() => setCurrentView('orders')}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
           </div>
           <div className="divide-y divide-gray-100">
              {[1, 2, 3].map(i => (
                <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                   <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <Activity size={18} />
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New vehicle listed: <span className="text-gray-600">Phantom GT</span></p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                   </div>
                   <ChevronRight size={16} className="text-gray-400" />
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  };

  const InventoryView = () => {
    const filteredInventory = inventory.filter(car => 
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>
          <div className="flex gap-2">
             <button onClick={() => { setSearchQuery(''); resetInventory(); }} className="btn-secondary flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm">
                <RotateCcw size={16} /> Reset
             </button>
             <button onClick={() => { setEditingCar(null); setIsAddModalOpen(true); }} className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 text-sm font-medium shadow-sm">
                <Plus size={16} /> Add Vehicle
             </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => showToast('Filters are currently simulated', 'info')}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 flex items-center gap-2"
              >
                 <Filter size={16} /> Filter
              </button>
              <button 
                onClick={handleExport}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 flex items-center gap-2"
              >
                 <Download size={16} /> Export
              </button>
           </div>
        </div>

        {/* Cars List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                        <img className="h-full w-full object-cover" src={car.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{car.name}</div>
                        <div className="text-xs text-gray-500">{car.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{car.horsepower}</div>
                    <div className="text-xs text-gray-500">{car.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 font-medium">{car.price}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleToggleFeatured(car)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${car.featured ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                    >
                      {car.featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={(e) => handleEditClick(e, car)} className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-50 transition-colors"><Edit2 size={16} /></button>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           handleDelete(car.id);
                         }} 
                         className="p-2 text-gray-400 hover:text-white hover:bg-red-600 rounded-lg transition-colors"
                         title="Delete Vehicle"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredInventory.length === 0 && (
            <div className="p-12 text-center text-gray-500">
               No vehicles found matching your search.
            </div>
          )}
        </div>
      </div>
    );
  };

  const CustomersView = () => {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-bold text-gray-900">Registered Users</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                         {user.avatar ? <img className="h-full w-full object-cover" src={user.avatar} alt="" /> : <Users size={20} className="m-2 text-gray-400"/>}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => showToast('Edit user functionality not available', 'info')}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const OrdersView = () => {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-12 text-center text-gray-500">
           <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
           <p>No active orders found in the system.</p>
           <p className="text-sm mt-2">Orders functionality is currently in simulation mode.</p>
        </div>
      </div>
    );
  };

  const SettingsView = () => {
     return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold text-gray-900">Site Configuration</h2>
           <div className="flex gap-2">
             <button onClick={resetConfig} className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium flex items-center gap-2">
               <RotateCcw size={14} /> Reset Defaults
             </button>
           </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
             <Settings size={20} className="text-indigo-600" /> General Information
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                 <input 
                   type="text" 
                   value={config.siteName}
                   onChange={(e) => handleConfigChange('siteName', '', e.target.value)}
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                 <div 
                   className="flex gap-2 items-center"
                   onDrop={handleImageDrop}
                   onDragOver={(e) => e.preventDefault()}
                 >
                    <div className="h-10 w-10 rounded border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                       {config.logoUrl ? <img src={config.logoUrl} alt="Logo" className="h-full w-full object-contain" /> : <ImageIcon size={16} className="text-gray-400" />}
                    </div>
                    <input 
                      type="text" 
                      value={config.logoUrl}
                      onChange={(e) => handleConfigChange('logoUrl', '', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
             <ImageIcon size={20} className="text-indigo-600" /> Hero Section
           </h3>
           <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Headline Prefix</label>
                    <input 
                      type="text" 
                      value={config.hero.headlinePrefix}
                      onChange={(e) => handleConfigChange('hero', 'headlinePrefix', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Headline Gradient Text</label>
                    <input 
                      type="text" 
                      value={config.hero.headlineGradient}
                      onChange={(e) => handleConfigChange('hero', 'headlineGradient', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                 <input 
                   type="text" 
                   value={config.hero.tagline}
                   onChange={(e) => handleConfigChange('hero', 'tagline', e.target.value)}
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                 <textarea 
                   rows={3}
                   value={config.hero.description}
                   onChange={(e) => handleConfigChange('hero', 'description', e.target.value)}
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                 <input 
                   type="text" 
                   value={config.hero.heroImage}
                   onChange={(e) => handleConfigChange('hero', 'heroImage', e.target.value)}
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
              </div>
           </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
             <Mail size={20} className="text-indigo-600" /> Contact Details
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                 <input 
                   type="text" 
                   value={config.contact.email}
                   onChange={(e) => handleConfigChange('contact', 'email', e.target.value)}
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                 <input 
                   type="text" 
                   value={config.contact.phone}
                   onChange={(e) => handleConfigChange('contact', 'phone', e.target.value)}
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
                 <input 
                   type="text" 
                   value={config.contact.address}
                   onChange={(e) => handleConfigChange('contact', 'address', e.target.value)}
                   className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
              </div>
           </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <SEO title="Admin Dashboard" description="System Management" />

      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-in slide-in-from-right-10 fade-in duration-300 flex items-center gap-2 pointer-events-auto ${
              t.type === 'success' ? 'bg-green-600' : t.type === 'error' ? 'bg-red-600' : 'bg-gray-800'
            }`}
          >
             {t.message}
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between">
         <div className="flex items-center gap-2 font-bold text-gray-900">
             <Shield className="text-indigo-600" size={20} /> Admin
         </div>
         <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600">
             {isSidebarOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         <div className="h-full flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
               <Shield className="text-indigo-600 mr-2" size={24} />
               <span className="font-bold text-xl tracking-tight text-gray-900">AdminPanel</span>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
               <button onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <LayoutDashboard size={18} /> Dashboard
               </button>
               <button onClick={() => { setCurrentView('inventory'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'inventory' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <CarIcon size={18} /> Cars
               </button>
               <button onClick={() => { setCurrentView('customers'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'customers' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <Users size={18} /> Users
               </button>
               <button onClick={() => { setCurrentView('orders'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <ShoppingCart size={18} /> Orders
               </button>
               <button onClick={() => { setCurrentView('settings'); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentView === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                   <Settings size={18} /> Site Settings
               </button>
            </nav>

            <div className="p-4 border-t border-gray-100">
               <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                   <LogOut size={18} /> Sign Out
               </button>
            </div>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentView === 'dashboard' && <DashboardStats />}
            {currentView === 'inventory' && <InventoryView />}
            {currentView === 'customers' && <CustomersView />}
            {currentView === 'orders' && <OrdersView />}
            {currentView === 'settings' && <SettingsView />}
         </div>
      </main>

      {/* Modals */}
      {isAddModalOpen && (
        <AddCarForm 
          onClose={() => { setIsAddModalOpen(false); setEditingCar(null); }} 
          onSubmit={handleSaveCar}
          initialData={editingCar || undefined}
          isLoading={isProcessing}
        />
      )}
    </div>
  );
};
