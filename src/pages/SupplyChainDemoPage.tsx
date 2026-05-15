import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Package, Truck, AlertTriangle, 
  BarChart3, LayoutDashboard, Map, Layers, 
  Search, Bell, Filter, Download
} from 'lucide-react';

const shipments = [
  { id: 'PO-2301', route: 'Semarang -> Jakarta', status: 'In Transit', eta: '6 jam', stock: 'Aman', priority: 'High' },
  { id: 'PO-2302', route: 'Bandung -> Surabaya', status: 'Delayed', eta: '14 jam', stock: 'Restock Soon', priority: 'Urgent' },
  { id: 'PO-2303', route: 'Medan -> Semarang', status: 'Delivered', eta: 'Selesai', stock: 'Aman', priority: 'Medium' },
  { id: 'PO-2304', route: 'Jakarta -> Palembang', status: 'Processing', eta: '2 hari', stock: 'Aman', priority: 'Low' },
  { id: 'PO-2305', route: 'Surabaya -> Bali', status: 'In Transit', eta: '12 jam', stock: 'Aman', priority: 'Medium' },
];

const inventory = [
  { name: 'Arabica Beans Gayo', sku: 'COF-GAY-001', stock: 1450, unit: 'kg', health: 92 },
  { name: 'Robusta Sidikalang', sku: 'COF-SID-002', stock: 840, unit: 'kg', health: 45 },
  { name: 'Palm Sugar Liquid', sku: 'SWT-PLM-010', stock: 210, unit: 'L', health: 88 },
  { name: 'Oat Milk Premium', sku: 'MLK-OAT-005', stock: 56, unit: 'ctn', health: 12 },
];

const SupplyChainDemoPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex">
      {/* Mini Sidebar */}
      <aside className="w-20 md:w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black">V</div>
          <span className="hidden md:block font-black tracking-tighter text-xl">Vermont<span className="text-amber-600">SCM</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'inventory', icon: Package, label: 'Inventory' },
            { id: 'logistics', icon: Truck, label: 'Logistics' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'map', icon: Map, label: 'Network Map' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-amber-50 text-amber-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              <span className="hidden md:block font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link to="/laboratory" className="flex items-center gap-3 px-3 py-3 text-slate-500 hover:text-amber-600 transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden md:block font-bold text-sm">Exit Lab</span>
          </Link>
          <div className="mt-4 flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50">
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500" />
            </div>
            <div className="hidden md:block">
              <p className="text-[10px] font-black uppercase text-slate-400">Operator</p>
              <p className="text-xs font-bold">Admin Demo</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Supply Chain Control Center</h1>
            <p className="text-slate-500 text-sm font-medium">Real-time optimization & risk management</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search SKU or Order..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 w-full md:w-64"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl relative hover:bg-slate-50 transition-colors">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Shipments', value: '38', change: '+12%', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Inventory Health', value: '84%', change: '-2%', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Supply Risk Index', value: 'Low', change: 'Stable', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Total SKU', value: '1,248', change: 'Active', icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-slate-400'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Logistical Overview */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <Truck size={20} className="text-amber-600" /> Live Shipments
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><Filter size={16} /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><Download size={16} /></button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Route</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">ETA</th>
                      <th className="px-6 py-4">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {shipments.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                        <td className="px-6 py-4 text-xs font-black text-amber-600">{item.id}</td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-600">{item.route}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            item.status === 'Delayed' ? 'bg-red-50 text-red-600' : 
                            item.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-500">{item.eta}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              item.priority === 'Urgent' ? 'bg-red-500' :
                              item.priority === 'High' ? 'bg-amber-500' : 'bg-slate-300'
                            }`} />
                            <span className="text-[10px] font-black uppercase text-slate-400">{item.priority}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Inventory Overview */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <Package size={20} className="text-amber-600" /> Inventory Health
                </h2>
                <button className="text-xs font-bold text-amber-600 hover:underline">View All SKU</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {inventory.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                      <Package size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black text-slate-800">{item.name}</h3>
                        <span className="text-[10px] font-bold text-slate-400">{item.sku}</span>
                      </div>
                      <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.health < 20 ? 'bg-red-500' : item.health < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${item.health}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500">{item.stock} {item.unit} in stock</span>
                        <span className={`text-[10px] font-black uppercase ${item.health < 50 ? 'text-red-500' : 'text-emerald-600'}`}>
                          {item.health}% Health
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Operational Risks */}
            <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
              <h2 className="font-black flex items-center gap-2 mb-6 text-amber-400">
                <AlertTriangle size={20} /> AI Risk Alerts
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black uppercase text-amber-400 mb-1">Weather Anomaly</p>
                  <p className="text-xs font-bold leading-relaxed">
                    Potensi badai di rute Semarang-Jakarta dapat menghambat PO-2301 sebesar 4 jam.
                  </p>
                  <button className="mt-3 text-[10px] font-black uppercase bg-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors">
                    Reroute Suggested
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 opacity-60">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Stock Critical</p>
                  <p className="text-xs font-bold leading-relaxed">
                    Oat Milk Premium (SKU: MLK-OAT-005) akan habis dalam 48 jam.
                  </p>
                </div>
              </div>
            </section>

            {/* Network Visualization Mockup */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <Map size={20} className="text-amber-600" /> Regional Map
                </h2>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              <div className="relative aspect-square">
                <img 
                  src="/assets/scm/hero.jpg" 
                  alt="Supply chain network" 
                  className="w-full h-full object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                    <div className="h-2 w-2 bg-amber-600 rounded-full animate-ping mb-2" />
                    <p className="text-xs font-bold text-slate-400 italic">Network Visualization Prototype</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-3">
              <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm">
                Generate Weekly Report
              </button>
              <button className="w-full py-4 bg-white border border-slate-200 rounded-2xl font-black text-sm text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm">
                Optimize Inventory Routes
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplyChainDemoPage;
