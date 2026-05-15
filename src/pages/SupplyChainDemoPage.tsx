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

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <Package size={20} className="text-amber-600" /> Inventory Management
                </h2>
                <div className="flex gap-3">
                  <button className="btn-primary py-2 px-4 text-xs bg-amber-600 border-amber-600">Add Stock</button>
                  <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 border border-slate-200"><Download size={16} /></button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...inventory, ...inventory].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/30 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-amber-600 transition-colors">
                        <Package size={20} />
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full ${item.health > 80 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {item.health > 80 ? 'Healthy' : 'Check Stock'}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 mb-4">{item.sku}</p>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-500">Stock Level</span>
                      <span className="text-slate-900">{item.stock} {item.unit}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${item.health < 30 ? 'bg-red-500' : item.health < 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${item.health}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        );
      case 'logistics':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-black text-slate-900 flex items-center gap-2">
                  <Truck size={20} className="text-amber-600" /> Fleet & Logistics Tracking
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 border border-slate-200"><Filter size={16} /></button>
                  <button className="btn-primary py-2 px-4 text-xs bg-slate-900">Track New PO</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      <th className="px-6 py-4">Ref ID</th>
                      <th className="px-6 py-4">Current Route</th>
                      <th className="px-6 py-4">Condition</th>
                      <th className="px-6 py-4">Progress</th>
                      <th className="px-6 py-4">Arrival</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {shipments.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="px-6 py-4 text-xs font-black text-amber-600">{item.id}</td>
                        <td className="px-6 py-4">
                          <p className="text-xs font-bold text-slate-700">{item.route}</p>
                          <p className="text-[10px] text-slate-400">Standard Freight</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Delayed' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                            <span className="text-[10px] font-black uppercase text-slate-500">{item.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: item.status === 'Delivered' ? '100%' : '45%' }} />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-black text-slate-900">{item.eta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </motion.div>
        );
      case 'analytics':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-black text-slate-900 mb-6">Efficiency Trends</h3>
                <div className="h-64 w-full flex items-end gap-2 px-2">
                  {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div 
                        initial={{ height: 0 }} 
                        animate={{ height: `${h}%` }} 
                        className={`w-full rounded-t-lg ${i === 6 ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : 'bg-slate-200'}`} 
                      />
                      <span className="text-[10px] font-bold text-slate-400">Day {i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-black text-slate-900 mb-6">Distribution by Category</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Raw Materials', val: 65, color: 'bg-amber-500' },
                    { label: 'Finished Goods', val: 25, color: 'bg-blue-500' },
                    { label: 'Packaging', val: 10, color: 'bg-slate-400' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span>{item.label}</span>
                        <span>{item.val}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'map':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[600px] bg-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center border border-slate-800">
            <div className="absolute inset-0 opacity-30">
               <img src="/assets/scm/hero.jpg" className="w-full h-full object-cover grayscale brightness-50" alt="Map background" />
            </div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/50">
                <Map size={40} className="text-amber-500 animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Network Topology Active</h3>
              <p className="text-slate-400 text-sm font-medium">Monitoring 12 hubs across Indonesia</p>
              <div className="mt-8 flex gap-4 justify-center">
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Semarang Hub
                </span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" /> Jakarta DC
                </span>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  <button onClick={() => setActiveTab('inventory')} className="text-xs font-bold text-amber-600 hover:underline">View All SKU</button>
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
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex">
      {/* Mini Sidebar */}
      <aside className="w-20 md:w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black">V</div>
          <span className="hidden md:block font-black tracking-tighter text-xl text-slate-900">Vermont<span className="text-amber-600">SCM</span></span>
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
              <p className="text-xs font-bold text-slate-900">Admin Demo</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              {activeTab} <span className="text-amber-600">Control Center</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">Vermont SCM Cloud v1.2</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 w-full md:w-64"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl relative hover:bg-slate-50 transition-colors">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid (Only on Dashboard) */}
        {activeTab === 'dashboard' && (
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
        )}

        {renderContent()}
      </main>
    </div>
  );
};

export default SupplyChainDemoPage;
