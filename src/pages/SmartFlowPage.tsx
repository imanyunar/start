import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Send, 
  DollarSign, 
  Users, 
  BrainCircuit, 
  Clock, 
  ChevronRight,
  MessageSquare,
  Activity,
  Search,
  Bell,
  Home,
  Briefcase,
  LayoutDashboard,
  Wallet,
  ShoppingBag,
  Settings,
  PieChart,
  ArrowRight,
  Menu,
  X,
  TrendingUp,
  BarChart,
  Filter,
  Download,
  Trash2,
  Edit2,
  Calendar,
  Sparkles,
  ChevronLeft,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'debt';
  amount: number;
  description: string;
  category: string;
  timestamp: Date;
}

const SmartFlowPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income', amount: 75000, description: 'Mie Ayam Special', category: 'Makanan', timestamp: new Date() },
    { id: '2', type: 'expense', amount: 200000, description: 'Gas LPG 3kg x 10', category: 'Operasional', timestamp: new Date(Date.now() - 3600000) },
    { id: '3', type: 'debt', amount: 100000, description: 'Hutang Budi', category: 'Piutang', timestamp: new Date(Date.now() - 7200000) },
    { id: '4', type: 'income', amount: 45000, description: 'Es Teh Manis x 10', category: 'Minuman', timestamp: new Date(Date.now() - 10800000) },
    { id: '5', type: 'expense', amount: 150000, description: 'Bahan Baku Tepung', category: 'Bahan Baku', timestamp: new Date(Date.now() - 86400000) },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const revenue = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const debt = transactions.filter(t => t.type === 'debt').reduce((acc, curr) => acc + curr.amount, 0);
  const profit = revenue - expenses;

  const parseInput = (text: string) => {
    const lowerText = text.toLowerCase();
    let type: 'income' | 'expense' | 'debt' = 'income';
    let amount = 0;
    let description = '';

    if (lowerText.includes('jual') || lowerText.includes('laku') || lowerText.includes('terima')) {
      type = 'income';
    } else if (lowerText.includes('beli') || lowerText.includes('bayar') || lowerText.includes('keluar')) {
      type = 'expense';
    } else if (lowerText.includes('utang') || lowerText.includes('bon') || lowerText.includes('pinjam')) {
      type = 'debt';
    }

    const amountMatch = lowerText.match(/(\d+)(?:\s*)(rb|k|jt|juta)?/);
    if (amountMatch) {
      let val = parseInt(amountMatch[1]);
      const unit = amountMatch[2];
      if (unit === 'rb' || unit === 'k') val *= 1000;
      if (unit === 'jt' || unit === 'juta') val *= 1000000;
      amount = val;
    }

    description = text.replace(/(\d+)(?:\s*)(rb|k|jt|juta)?/i, '')
                     .replace(/(jual|laku|beli|bayar|utang|bon|pinjam|terima|keluar)/i, '')
                     .trim();

    return { type, amount, description: description || 'Transaksi Baru' };
  };

  const handleRecord = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    const parsed = parseInput(inputText);

    setTimeout(() => {
      const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        ...parsed,
        category: parsed.type === 'income' ? 'Penjualan' : parsed.type === 'expense' ? 'Belanja' : 'Lainnya',
        timestamp: new Date()
      };
      setTransactions([newTx, ...transactions]);
      setInputText('');
      setIsProcessing(false);
    }, 800);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Ringkasan', icon: <LayoutDashboard size={22} /> },
    { id: 'transactions', label: 'Catat Transaksi', icon: <Wallet size={22} /> },
    { id: 'inventory', label: 'Stok Barang', icon: <ShoppingBag size={22} /> },
    { id: 'settings', label: 'Pengaturan', icon: <Settings size={22} /> },
  ];

  return (
    <div className="min-h-screen light-app-bg flex overflow-hidden font-sans antialiased text-slate-primary">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-80' : 'w-24'
        } bg-white border-r border-slate-100 transition-all duration-500 hidden lg:flex flex-col z-20 shadow-sm`}
      >
        <div className="p-8 flex items-center gap-4">
          <div className="p-3 bg-brandBlue rounded-2xl text-white shadow-xl shadow-blue-100">
            <BrainCircuit size={28} />
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-2xl font-black tracking-tight text-slate-900">SmartFlow</span>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">AI Assistant</p>
            </motion.div>
          )}
        </div>

        <nav className="flex-grow px-4 mt-12 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative group ${
                activeTab === item.id 
                  ? 'bg-brandBlue text-white shadow-2xl shadow-blue-200' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-bold text-base">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-slate-50">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 p-3 text-slate-400 hover:text-slate-900 transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Sembunyikan</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 glass-light border-b border-slate-100 p-8 flex justify-between items-center z-10">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                <Calendar size={12} /> {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden xl:block">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                className="bg-slate-50 border-2 border-transparent focus:border-brandBlue/10 focus:bg-white rounded-2xl pl-12 pr-6 py-3 text-sm w-80 outline-none transition-all"
              />
            </div>
            <button className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-brandBlue transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 p-1.5 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-50 overflow-hidden shrink-0 text-white flex items-center justify-center font-black text-xs">AV</div>
              <div className="hidden md:block pr-2">
                <p className="text-xs font-black text-slate-900 leading-none mb-0.5">Andi Vermont</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Owner</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 lg:p-12 max-w-[1400px]">
          {activeTab === 'dashboard' && (
            <div className="space-y-10">
              {/* Stats Overview */}
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                {[
                  { label: 'Pendapatan', value: revenue, icon: <TrendingUp />, color: 'blue', trend: '+12.5%' },
                  { label: 'Pengeluaran', value: expenses, icon: <Activity />, color: 'rose', trend: '-2.4%' },
                  { label: 'Keuntungan Bersih', value: profit, icon: <DollarSign />, color: 'emerald', trend: '+15.2%' },
                  { label: 'Total Transaksi', value: transactions.length, icon: <Wallet />, color: 'orange', trend: 'Stabil' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="light-card p-8 group"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 rounded-2xl bg-slate-50 text-${stat.color}-600 group-hover:bg-${stat.color}-500 group-hover:text-white transition-all duration-300`}>
                        {stat.icon}
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                        stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                      }`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</div>
                    <div className="text-3xl font-black text-slate-900 mb-1">
                      {typeof stat.value === 'number' && i < 3 ? `Rp ${stat.value.toLocaleString('id-ID')}` : stat.value}
                    </div>
                  </motion.div>
                ))}
              </section>

              {/* Advanced Analytics Mockup */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Sales Trend (Line Chart Simulation) */}
                <div className="xl:col-span-2 light-card p-10 flex flex-col min-h-[450px]">
                  <div className="flex justify-between items-center mb-12">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tren Penjualan</h3>
                      <p className="text-sm font-bold text-slate-400">Analisis pergerakan kas selama 30 hari terakhir.</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Pemasukan</div>
                        <div className="flex items-center gap-2 text-slate-300"><div className="w-2 h-2 rounded-full bg-slate-300"></div> Pengeluaran</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow relative min-h-[300px] flex items-end mt-4">
                    {/* SVG Line Chart Mockup */}
                    <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1000 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="1000" y2="20" stroke="#F8FAFC" strokeWidth="1" />
                      <line x1="0" y1="50" x2="1000" y2="50" stroke="#F8FAFC" strokeWidth="1" />
                      <line x1="0" y1="80" x2="1000" y2="80" stroke="#F8FAFC" strokeWidth="1" />
                      
                      {/* Area */}
                      <path 
                        d="M0,90 C100,80 150,20 250,40 C350,60 450,10 550,30 C650,50 750,5 850,20 C950,35 1000,10 1000,10 V100 H0 Z" 
                        fill="url(#chartGradient)" 
                      />
                      {/* Line */}
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M0,90 C100,80 150,20 250,40 C350,60 450,10 550,30 C650,50 750,5 850,20 C950,35 1000,10 1000,10" 
                        fill="none" 
                        stroke="#2563EB" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* X-Axis Labels */}
                    <div className="w-full flex justify-between pt-8 border-t border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-8 relative z-10 bg-white/50 backdrop-blur-md">
                      <span>Minggu 1</span>
                      <span>Minggu 2</span>
                      <span>Minggu 3</span>
                      <span>Minggu 4</span>
                    </div>
                  </div>
                </div>

                {/* Expense Breakdown (Donut Chart Mockup) */}
                <div className="light-card p-10 flex flex-col">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Kategori Pengeluaran</h3>
                  <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="relative w-48 h-48 mb-10">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 100" }}
                          animate={{ strokeDasharray: "65 100" }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          cx="50%" cy="50%" r="40%" fill="none" stroke="#2563EB" strokeWidth="12" strokeDasharray="65 100" strokeLinecap="round" 
                        />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 100", strokeDashoffset: -65 }}
                          animate={{ strokeDasharray: "20 100", strokeDashoffset: -65 }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          cx="50%" cy="50%" r="40%" fill="none" stroke="#0EA5E9" strokeWidth="12" strokeDasharray="20 100" strokeDashoffset="-65" strokeLinecap="round" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-slate-900">Rp 1.2jt</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">Total Bulan Ini</span>
                      </div>
                    </div>
                    
                    <div className="w-full space-y-4">
                      {[
                        { label: 'Operasional', val: '65%', color: 'bg-blue-600' },
                        { label: 'Bahan Baku', val: '20%', color: 'bg-cyan-500' },
                        { label: 'Lainnya', val: '15%', color: 'bg-slate-200' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm font-bold text-slate-600">{item.label}</span>
                          </div>
                          <span className="text-xs font-black text-slate-900">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Dashboard Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Best Selling Products */}
                <div className="light-card p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ShoppingBag size={20} /></div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">Produk Terlaris</h4>
                  </div>
                  <div className="space-y-6">
                    {[
                      { name: 'Mie Ayam Special', price: '25rb', growth: '+12%', color: 'blue' },
                      { name: 'Es Teh Manis', price: '5rb', growth: '+8%', color: 'cyan' },
                      { name: 'Bakso Urat', price: '20rb', growth: '+5%', color: 'emerald' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 group hover:bg-white hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-${p.color}-100 flex items-center justify-center font-black text-xs text-${p.color}-600`}>{p.name[0]}</div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{p.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Harga: {p.price}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-black text-emerald-600">{p.growth}</p>
                          <ChevronRight size={14} className="text-slate-300 ml-auto" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Activity Pulse */}
                <div className="light-card p-8 border-none bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brandBlue/20 blur-[80px] rounded-full"></div>
                   <div>
                     <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">AI Assistant Pulse</h4>
                     <div className="flex items-center gap-4 mb-6">
                       <div className="relative">
                         <div className="w-12 h-12 rounded-2xl bg-brandBlue flex items-center justify-center shadow-2xl shadow-blue-500/50">
                           <BrainCircuit size={24} />
                         </div>
                         <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900"></div>
                       </div>
                       <div>
                         <p className="text-lg font-black leading-none mb-1">Status Optimal</p>
                         <p className="text-xs text-slate-400">SmartFlow AI Aktif</p>
                       </div>
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed italic mb-8">
                       "Berdasarkan tren mingguan, penjualan Anda akan meningkat 15% besok karena pola hari libur."
                     </p>
                   </div>
                   <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest border border-white/5 transition-all">
                     Buka Asisten Lanjutan
                   </button>
                </div>

                {/* Business Health Meter */}
                <div className="light-card p-8 bg-white border-2 border-slate-50">
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 flex items-center gap-2">
                     <Sparkles size={16} className="text-amber-500" /> Kesehatan Bisnis
                   </h4>
                   <div className="flex flex-col items-center text-center">
                     <div className="text-6xl font-black text-slate-900 mb-2">94</div>
                     <div className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-10">Optimal / Sangat Sehat</div>
                     <div className="w-full space-y-4">
                       <div className="space-y-2">
                         <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                           <span>Arus Kas</span>
                           <span className="text-slate-900">Baik</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full w-[95%] bg-blue-600 rounded-full"></div>
                         </div>
                       </div>
                       <div className="space-y-2">
                         <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                           <span>Efisiensi Biaya</span>
                           <span className="text-slate-900">Stabil</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full w-[80%] bg-blue-600 rounded-full"></div>
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="flex flex-col xl:flex-row gap-12">
              {/* Transaction List View */}
              <div className="flex-grow space-y-8">
                <div className="light-card p-0 overflow-hidden shadow-xl shadow-slate-100 border-none">
                  <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Data Transaksi</h2>
                      <p className="text-sm font-bold text-slate-400">Kelola operasional harian Anda di sini.</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="btn-premium flex items-center gap-3 px-8" onClick={() => setInputText('jual ')}>
                        <Plus size={20} /> Tambah Baru
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                        <tr>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Tanggal</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Keterangan</th>
                          <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Nominal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50/30 transition-all group">
                            <td className="px-10 py-6">
                              <div className="text-sm font-black text-slate-700">{tx.timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase">{tx.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                            </td>
                            <td className="px-10 py-6 font-bold text-slate-900 text-base">{tx.description}</td>
                            <td className={`px-10 py-6 text-right font-black text-base ${
                              tx.type === 'income' ? 'text-emerald-600' : tx.type === 'expense' ? 'text-rose-600' : 'text-amber-600'
                            }`}>
                              Rp {tx.amount.toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* AI Workspace (Right) */}
              <aside className="w-full xl:w-[450px] flex flex-col gap-8 sticky top-32 self-start">
                <div className="light-card p-0 shadow-2xl shadow-blue-100/50 border-none overflow-hidden relative bg-white">
                  <div className="p-10 bg-brandBlue text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white/20 rounded-2xl"><BrainCircuit size={24} /></div>
                      <h3 className="text-xl font-black tracking-tight">AI Assistant</h3>
                    </div>
                    <p className="text-sm text-blue-50 font-medium italic">
                      "Gunakan bahasa sehari-hari, data akan langsung diproses."
                    </p>
                  </div>
                  
                  <div className="p-10 bg-white">
                    <form onSubmit={handleRecord} className="relative">
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleRecord()}
                        placeholder="Contoh: jual nasi goreng 25rb"
                        className="w-full p-8 bg-slate-50 border-2 border-transparent focus:border-brandBlue/10 focus:bg-white rounded-3xl text-lg font-bold text-slate-900 placeholder:text-slate-300 resize-none h-48 outline-none transition-all shadow-inner"
                      />
                      <button 
                        type="submit"
                        disabled={!inputText.trim() || isProcessing}
                        className="absolute bottom-8 right-8 p-4 bg-brandBlue text-white rounded-2xl shadow-2xl shadow-blue-300 transition-all hover:scale-105 active:scale-95"
                      >
                        <Send size={24} />
                      </button>
                    </form>
                    
                    <div className="mt-8 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 text-center">Cepat & Otomatis</p>
                      {['jual kopi 15rb', 'beli gas 20rb'].map((cmd, i) => (
                        <button key={i} onClick={() => setInputText(cmd)} className="w-full p-4 rounded-2xl border border-slate-100 text-sm font-bold text-slate-500 hover:text-brandBlue hover:border-brandBlue/20 transition-all">
                          "{cmd}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="p-10 bg-white rounded-full mb-8 shadow-2xl shadow-slate-100 border border-slate-50">
                <ShoppingBag size={80} className="text-slate-200" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Manajemen Stok</h2>
              <p className="text-slate-400 max-w-md text-lg font-medium">Fitur inventaris otomatis sedang dikalibrasi oleh AI.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-3xl">
              <div className="light-card p-12">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-10">Profil Bisnis</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Nama Toko</label>
                      <input type="text" defaultValue="Vermont Coffee" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-base font-bold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-1">Tipe Bisnis</label>
                      <input type="text" defaultValue="UMKM Cafe" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-base font-bold outline-none" />
                    </div>
                  </div>
                  <button className="btn-premium w-full py-5 text-lg shadow-2xl">Simpan Perubahan</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <nav className="fixed bottom-0 left-0 right-0 glass-light border-t border-slate-100 px-6 py-5 flex justify-between items-center lg:hidden z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {[
          { id: 'dashboard', icon: <LayoutDashboard size={24} /> },
          { id: 'transactions', icon: <Wallet size={24} /> },
          { id: 'add', icon: <Plus size={32} />, special: true },
          { id: 'inventory', icon: <ShoppingBag size={24} /> },
          { id: 'settings', icon: <Settings size={24} /> },
        ].map((item, i) => (
          <button 
            key={i}
            onClick={() => {
              if (item.id === 'add') { setActiveTab('transactions'); setInputText('jual '); }
              else setActiveTab(item.id);
            }} 
            className={`transition-all ${
              item.special 
                ? 'bg-brandBlue text-white rounded-2xl p-1.5 shadow-xl shadow-blue-200' 
                : activeTab === item.id ? 'text-brandBlue scale-110' : 'text-slate-400'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SmartFlowPage;
