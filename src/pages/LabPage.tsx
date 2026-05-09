import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Send, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  BrainCircuit, 
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  LayoutDashboard,
  Wallet,
  ShoppingBag,
  MoreVertical,
  ChevronRight,
  MessageSquare,
  Activity,
  BarChart3,
  Flame,
  Search,
  Bell,
  Home,
  Briefcase,
  PieChart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Image Assets (Generated)
const BG_UMKM = "file:///C:/Users/yunar/.gemini/antigravity/brain/b631225e-ba2c-4d47-83f4-b860bd2eb8c8/indonesian_umkm_dashboard_bg_1778293037487.png";
const BG_AI = "file:///C:/Users/yunar/.gemini/antigravity/brain/b631225e-ba2c-4d47-83f4-b860bd2eb8c8/ai_business_analytics_hero_1778293053662.png";
const BG_WARUNG = "file:///C:/Users/yunar/.gemini/antigravity/brain/b631225e-ba2c-4d47-83f4-b860bd2eb8c8/indonesian_food_stall_modern_1778293070495.png";

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'debt';
  amount: number;
  description: string;
  category: string;
  timestamp: Date;
}

const LabPage = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income', amount: 75000, description: 'Mie Ayam Special', category: 'Makanan', timestamp: new Date() },
    { id: '2', type: 'expense', amount: 200000, description: 'Gas LPG 3kg x 10', category: 'Operasional', timestamp: new Date(Date.now() - 3600000) },
    { id: '3', type: 'debt', amount: 100000, description: 'Hutang Budi', category: 'Piutang', timestamp: new Date(Date.now() - 7200000) },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Stats calculation
  const revenue = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const debt = transactions.filter(t => t.type === 'debt').reduce((acc, curr) => acc + curr.amount, 0);
  const profit = revenue - expenses;

  // Simple Natural Language Parser
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

  return (
    <div className="pt-20 min-h-screen light-app-bg pb-24 lg:pb-8">
      {/* Top Banner (Premium Aesthetic) */}
      <div className="h-64 w-full relative overflow-hidden hidden lg:block">
        <img src={BG_UMKM} alt="UMKM Context" className="w-full h-full object-cover opacity-10 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC]"></div>
        <div className="absolute inset-0 flex items-center px-12 max-w-[1600px] mx-auto">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black text-slate-primary mb-2 tracking-tighter">Vermont SmartFlow</h1>
            <p className="text-slate-500 font-medium">Asisten Bisnis Cerdas untuk Indonesia Masa Depan.</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 lg:-mt-32 relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: Smart AI Input Panel */}
        <aside className="w-full lg:w-[420px] flex flex-col gap-6 lg:sticky lg:top-28 lg:h-[calc(100vh-120px)] self-start">
          <div className="light-card p-0 shadow-2xl shadow-blue-100 border-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandBlue/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="p-8 pb-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brandBlue rounded-2xl text-white shadow-lg shadow-blue-200">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-primary tracking-tight">Smart Input</h2>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Bertenaga AI</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-brandBlue transition-colors"><Bell size={20} /></button>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">AI</div>
                  <p className="text-sm text-slate-600 italic">"Gunakan bahasa sehari-hari. Saya akan merapikan catatannya."</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleRecord} className="px-8 pb-8">
              <div className="relative">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleRecord()}
                  placeholder={t('smartflow.input_placeholder')}
                  className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-brandBlue/20 focus:bg-white transition-all rounded-[2rem] text-slate-primary placeholder:text-slate-400 resize-none h-40 text-lg font-medium outline-none"
                />
                <motion.div 
                  className="absolute bottom-6 right-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    type="submit"
                    disabled={!inputText.trim() || isProcessing}
                    className="p-4 bg-brandBlue text-white rounded-2xl shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Activity size={20} />
                      </motion.div>
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </motion.div>
              </div>
            </form>
          </div>

          {/* Quick AI Insights (Left Column) */}
          <div className="light-card bg-slate-900 border-none relative overflow-hidden">
            <img src={BG_AI} alt="AI Background" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-white font-black mb-6 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-400" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Peak Hour</div>
                  <div className="text-white font-black">18:00 - 20:00</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Best Day</div>
                  <div className="text-white font-black">Saturday</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT: Realtime Analytics Dashboard */}
        <main className="flex-grow flex flex-col gap-8">
          
          {/* Dashboard Header (Mobile only) */}
          <div className="lg:hidden mb-4">
            <h1 className="text-3xl font-black text-slate-primary tracking-tighter">Vermont SmartFlow</h1>
            <p className="text-slate-500 text-sm">Dashboard Bisnis Cerdas</p>
          </div>

          {/* Core Stats Bento Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { label: t('smartflow.stats.revenue'), value: revenue, icon: <TrendingUp />, color: 'blue', trend: '+18.4%', sub: 'vs minggu lalu' },
              { label: t('smartflow.stats.expenses'), value: expenses, icon: <TrendingDown />, color: 'rose', trend: '-2.1%', sub: 'Sesuai target' },
              { label: t('smartflow.stats.profit'), value: profit, icon: <Activity />, color: 'emerald', trend: '+24.0%', sub: 'Marjin Sehat' },
              { label: t('smartflow.analytics.health_score'), value: '94', icon: <Flame />, color: 'orange', trend: 'Optimal', sub: 'Kondisi Prima' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="light-card group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-full translate-x-12 -translate-y-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`p-3 rounded-2xl bg-slate-50 text-${stat.color}-600 group-hover:bg-${stat.color}-500 group-hover:text-white transition-all duration-300`}>
                    {stat.icon}
                  </div>
                  <div className={`text-[10px] font-black px-2 py-1 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>{stat.trend}</div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1 relative z-10">{stat.label}</div>
                <div className="text-2xl font-black text-slate-primary mb-1 relative z-10">
                  {typeof stat.value === 'number' ? `Rp ${stat.value.toLocaleString()}` : `${stat.value}/100`}
                </div>
                <div className="text-[10px] font-bold text-slate-400 relative z-10">{stat.sub}</div>
              </motion.div>
            ))}
          </section>

          {/* Trends & Performance Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Weekly Revenue Analysis (Chart) */}
            <div className="xl:col-span-2 space-y-6">
              <div className="light-card h-full min-h-[400px] flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-xl font-black text-slate-primary tracking-tight">Revenue Analysis</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pertumbuhan 7 Hari Terakhir</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">7 Hari</button>
                    <button className="px-4 py-2 rounded-xl text-slate-400 text-xs font-bold">30 Hari</button>
                  </div>
                </div>
                
                <div className="flex-grow flex items-end justify-between gap-4 h-full relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
                    {[1, 2, 3, 4].map(l => <div key={l} className="w-full h-px bg-slate-100"></div>)}
                  </div>
                  
                  {/* Bars */}
                  {[45, 62, 38, 85, 58, 72, 94].map((height, i) => (
                    <div key={i} className="flex-grow flex flex-col items-center gap-4 group cursor-pointer relative z-10">
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg transition-opacity font-bold">
                        Rp {((height * 1000) + 10000).toLocaleString()}
                      </div>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`w-full max-w-[40px] rounded-2xl transition-all duration-300 relative ${
                          i === 6 ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-xl shadow-blue-200' : 'bg-slate-100 group-hover:bg-slate-200'
                        }`}
                      >
                        {i === 6 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center text-brandBlue"><ArrowUpRight size={12} /></div>}
                      </motion.div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products Performance */}
            <div className="space-y-6">
              <div className="light-card flex-grow h-full">
                <div className="flex items-center gap-2 mb-8">
                  <ShoppingBag size={20} className="text-brandBlue" />
                  <h3 className="text-lg font-black text-slate-primary">Top Products</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { name: 'Mie Ayam Special', sales: 124, growth: '+12%', color: 'blue' },
                    { name: 'Es Teh Manis', sales: 98, growth: '+5%', color: 'cyan' },
                    { name: 'Bakso Urat', sales: 86, growth: '-2%', color: 'indigo' },
                    { name: 'Nasi Goreng', sales: 64, growth: '+8%', color: 'emerald' },
                  ].map((p, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-primary transition-colors">{p.name}</span>
                        <span className={`text-[10px] font-black ${p.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{p.growth}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(p.sales/150)*100}%` }}
                          className={`h-full bg-${p.color}-500 rounded-full`}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{p.sales} Terjual</span>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Target: 150</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-brandBlue">
                    <PieChart size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest">AI Insight</p>
                    <p className="text-xs text-blue-600 font-medium leading-tight">Marjin Mie Ayam meningkat 12% bulan ini.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: AI Insights & Detailed Trends */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* AI Insights Board */}
            <div className="xl:col-span-2 light-card border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full translate-x-32 translate-y-32"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-12">
                <div className="max-w-xs">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                    <Activity size={12} /> Live Insights
                  </div>
                  <h3 className="text-2xl font-black mb-4 leading-tight">Analisis Kinerja Bisnis Hari Ini</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    SmartFlow memantau pola transaksi Anda secara real-time untuk memberikan rekomendasi strategis.
                  </p>
                  <button className="flex items-center gap-2 text-blue-400 font-black text-sm group/btn">
                    Lihat Laporan Lengkap <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Optimasi Stok', desc: 'Disarankan menambah stok Mie Ayam sebesar 20% sebelum akhir pekan.', icon: <Package size={20} /> },
                    { title: 'Analisis Margin', desc: 'Kopi Susu memiliki marjin keuntungan tertinggi (45%) di antara minuman lain.', icon: <TrendingUp size={20} /> },
                    { title: 'Pola Belanja', desc: 'Pengeluaran bahan baku meningkat 12% namun sebanding dengan pertumbuhan penjualan.', icon: <BarChart3 size={20} /> },
                    { title: 'Status Piutang', desc: 'Ada 3 tagihan yang akan jatuh tempo dalam 48 jam ke depan.', icon: <Clock size={20} /> },
                  ].map((insight, i) => (
                    <div key={i} className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="text-blue-400 mb-3">{insight.icon}</div>
                      <h4 className="text-sm font-bold mb-2">{insight.title}</h4>
                      <p className="text-xs text-slate-400 leading-normal">{insight.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Declining Products / Warnings */}
            <div className="light-card border-rose-100 bg-rose-50/20">
              <div className="flex items-center gap-3 text-rose-600 mb-8">
                <AlertCircle size={24} />
                <h3 className="text-lg font-black">Perlu Perhatian</h3>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'Soto Ayam', issue: 'Penjualan turun 15% sejak minggu lalu.', action: 'Cek ulasan pelanggan' },
                  { name: 'Es Jeruk', issue: 'Stok jeruk menipis di pasar.', action: 'Cari supplier cadangan' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white rounded-2xl border border-rose-100 shadow-sm">
                    <div className="font-bold text-slate-primary mb-1">{item.name}</div>
                    <div className="text-xs text-rose-600 mb-3 font-medium">{item.issue}</div>
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors">
                      {item.action} <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Activity Table (Full Width) */}
          <section className="light-card p-0 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-primary tracking-tight">Recent Transactions</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none focus:border-brandBlue/30 transition-all w-48" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Time</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-8 py-5 text-xs text-slate-500 font-medium">{tx.timestamp.toLocaleTimeString()}</td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-slate-primary">{tx.description}</div>
                        <div className="text-[9px] text-slate-400 font-mono uppercase tracking-tighter">REF: {tx.id}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                          {tx.category}
                        </span>
                      </td>
                      <td className={`px-8 py-5 text-right font-black text-sm ${
                        tx.type === 'income' ? 'text-emerald-600' : tx.type === 'expense' ? 'text-rose-600' : 'text-amber-600'
                      }`}>
                        {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''} Rp {tx.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center lg:hidden z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {[
          { icon: <Home size={20} />, label: 'Home', active: true },
          { icon: <PieChart size={20} />, label: 'Analytics', active: false },
          { icon: <Plus size={24} className="bg-brandBlue text-white rounded-xl p-1" />, label: '', active: false },
          { icon: <Briefcase size={20} />, label: 'Inventory', active: false },
          { icon: <Users size={20} />, label: 'Customers', active: false },
        ].map((item, i) => (
          <button key={i} className={`flex flex-col items-center gap-1 ${item.active ? 'text-brandBlue' : 'text-slate-400'}`}>
            {item.icon}
            {item.label && <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LabPage;
