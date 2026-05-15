import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Package, Truck, AlertTriangle, 
  BarChart3, LayoutDashboard, Map, Layers, 
  Search, Bell, Filter, Download, Activity,
  Globe, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';

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

const efficiencyData = [
  { day: 'Mon', efficiency: 65, risk: 20 },
  { day: 'Tue', efficiency: 78, risk: 15 },
  { day: 'Wed', efficiency: 72, risk: 25 },
  { day: 'Thu', efficiency: 85, risk: 10 },
  { day: 'Fri', efficiency: 82, risk: 12 },
  { day: 'Sat', efficiency: 90, risk: 8 },
  { day: 'Sun', efficiency: 94, risk: 5 },
];

const categoryData = [
  { name: 'Raw Materials', value: 400, color: '#f59e0b' },
  { name: 'Finished Goods', value: 300, color: '#fbbf24' },
  { name: 'Packaging', value: 200, color: '#fcd34d' },
  { name: 'Equipment', value: 100, color: '#fef3c7' },
];

const SupplyChainDemoPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Debug log to verify state changes in production console
  console.log('SCM Active Tab:', activeTab);

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-black text-slate-900 text-lg">Supply Chain Efficiency</h3>
                    <p className="text-slate-500 text-xs font-bold">Performance index over the last 7 days</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black">
                    <Activity size={12} /> +14.2% Growth
                  </div>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={efficiencyData}>
                      <defs>
                        <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 800 }}
                      />
                      <Area type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={4} fillOpacity={1} fill="url(#colorEff)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-black text-slate-900 text-lg mb-2">Category Split</h3>
                <p className="text-slate-500 text-xs font-bold mb-8">Inventory distribution by type</p>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                  {categoryData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold text-slate-500">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-900">{Math.round(item.value / 10)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Lead Time', value: '2.4 Days', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Error Rate', value: '0.08%', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: 'Coverage', value: '99.2%', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-xl font-black text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'map':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden min-h-[500px]">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#f59e0b22_0%,transparent_70%)]" />
              <svg className="w-full h-full" viewBox="0 0 800 400">
                <path d="M150 200 L300 150 L450 220 L600 180 L700 250" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                {[
                  {x: 150, y: 200, label: 'Medan'},
                  {x: 300, y: 150, label: 'Jakarta'},
                  {x: 450, y: 220, label: 'Semarang'},
                  {x: 600, y: 180, label: 'Surabaya'},
                  {x: 700, y: 250, label: 'Makassar'},
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.x} cy={pt.y} r="4" fill="#f59e0b" />
                    <circle cx={pt.x} cy={pt.y} r="12" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.5">
                      <animate attributeName="r" from="4" to="20" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x={pt.x} y={pt.y + 25} fill="white" fontSize="10" fontWeight="900" textAnchor="middle" className="uppercase tracking-widest">{pt.label}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="relative z-10 max-w-lg">
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                <Globe size={24} />
              </div>
              <h2 className="text-4xl font-black mb-4 tracking-tighter">Live Network Topology</h2>
              <p className="text-slate-400 font-bold mb-8 leading-relaxed">
                Visualizing real-time data flows across our distributed hub network. Every node represents an autonomous processing unit monitoring local supply chains.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-amber-500 mb-1">Active Nodes</p>
                  <p className="text-2xl font-black">128</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-emerald-500 mb-1">Network Health</p>
                  <p className="text-2xl font-black">99.9%</p>
                </div>
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
              {activeTab === 'dashboard' ? 'Overview' : activeTab} <span className="text-amber-600">Control Center</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium italic">Vermont SCM Cloud v1.4.0 - Live State: {activeTab}</p>
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

        {/* Dynamic Content Area with key to force remount on tab change */}
        <div key={activeTab} className="mt-4">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default SupplyChainDemoPage;
