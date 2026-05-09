import { useState, useMemo, useEffect } from 'react';
import {
  Wallet, Plus, Send, TrendingUp, TrendingDown, ArrowUpRight,
  ArrowDownRight, ChevronRight, Brain, Check, Package, Sliders, 
  Home, Moon, Sun, Search, Bell, ArrowLeft, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, ResponsiveContainer,
  Tooltip, PieChart, Pie, Cell
} from 'recharts';

/* ─── Helpers ────────────────────────────────────────────────── */
const fmt = (n: number) => n >= 1000000
  ? `Rp ${(n/1000000).toFixed(1)}jt`
  : n >= 1000 ? `Rp ${(n/1000).toFixed(0)}rb` : `Rp ${n}`;

const fmtFull = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const COLORS_PIE = ['#1D6FE8', '#12A860', '#F59E0B', '#E8403A', '#8B5CF6'];

const INITIAL_TX = [
  { id: '1', type: 'income',  amount: 75000,  description: 'Mie Ayam Special',    category: 'Makanan',   timestamp: new Date() },
  { id: '2', type: 'expense', amount: 200000, description: 'Gas LPG 3kg x 10',    category: 'Operasional', timestamp: new Date(Date.now() - 3600000) },
  { id: '3', type: 'debt',    amount: 100000, description: 'Hutang Budi',          category: 'Piutang',   timestamp: new Date(Date.now() - 7200000) },
  { id: '4', type: 'income',  amount: 45000,  description: 'Es Teh Manis x 10',   category: 'Minuman',   timestamp: new Date(Date.now() - 10800000) },
  { id: '5', type: 'expense', amount: 150000, description: 'Bahan Baku Tepung',   category: 'Bahan Baku', timestamp: new Date(Date.now() - 86400000) },
];

const WEEK = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

/* ─── parseInput ─────────────────────────────────────────────── */
function parseInput(text: string) {
  const lo = text.toLowerCase();
  let type: 'income' | 'expense' | 'debt' = lo.includes('beli') || lo.includes('bayar') || lo.includes('keluar') ? 'expense'
    : lo.includes('utang') || lo.includes('bon') || lo.includes('pinjam') ? 'debt'
    : 'income';
  let amount = 0;
  const m = lo.match(/(\d+)\s*(rb|k|jt|juta)?/);
  if (m) {
    let v = parseInt(m[1]);
    if (m[2] === 'rb' || m[2] === 'k') v *= 1000;
    if (m[2] === 'jt' || m[2] === 'juta') v *= 1000000;
    amount = v;
  }
  const desc = text.replace(/\d+\s*(rb|k|jt|juta)?/gi, '')
    .replace(/(jual|laku|beli|bayar|utang|bon|pinjam|terima|keluar)/gi, '')
    .trim() || 'Transaksi';
  return { type, amount, description: desc };
}

/* ─── Components ─────────────────────────────────────────────── */

function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-app-text text-app-bg px-6 py-3 rounded-full text-xs font-black shadow-2xl z-[1000] flex items-center gap-2">
      <Check size={14} className="text-green-primary" /> {msg}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color, trend, trendUp }: any) {
  const colorMap: any = {
    blue: { bg: 'bg-blue-light', text: 'text-blue-primary' },
    green: { bg: 'bg-green-500/10', text: 'text-green-primary' },
    red: { bg: 'bg-red-500/10', text: 'text-red-primary' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-primary' },
  };
  const c = colorMap[color];
  return (
    <div className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className={`p-2 rounded-xl ${c.bg}`}>
          <Icon size={18} className={c.text} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black ${
            trendUp ? 'bg-green-500/10 text-green-primary' : 'bg-red-500/10 text-red-primary'
          }`}>
            {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] mb-1">{label}</p>
        <p className="text-xl font-black text-[var(--app-text)]">{value}</p>
      </div>
    </div>
  );
}

function TxRow({ tx, onDelete }: { tx: any, onDelete?: (id: string) => void }) {
  const typeMap: any = {
    income: { color: 'text-green-primary', bg: 'bg-green-500/10', label: 'Masuk', prefix: '+' },
    expense: { color: 'text-red-primary', bg: 'bg-red-500/10', label: 'Keluar', prefix: '-' },
    debt: { color: 'text-amber-primary', bg: 'bg-amber-500/10', label: 'Hutang', prefix: '~' },
  };
  const t = typeMap[tx.type];
  const initials = tx.description.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();
  return (
    <div className="flex items-center gap-4 py-4 border-b border-[var(--app-border)] last:border-none group">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xs ${t.bg} ${t.color}`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-[var(--app-text)] truncate">{tx.description}</p>
        <p className="text-[10px] font-bold text-[var(--app-muted)] uppercase tracking-tighter mt-0.5">
          {tx.timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} • {t.label}
        </p>
      </div>
      <p className={`text-sm font-black ${t.color}`}>{t.prefix}{fmt(tx.amount)}</p>
      {onDelete && (
        <button onClick={() => onDelete(tx.id)} className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2 rounded-xl hover:bg-red-500/10">
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}

/* ─── Dashboard ─────────────────────────────────────────────── */
function DashboardPage({ transactions, onGoTransactions }: any) {
  const revenue = useMemo(() => transactions.filter((t: any) => t.type === 'income').reduce((a: any, c: any) => a + c.amount, 0), [transactions]);
  const expenses = useMemo(() => transactions.filter((t: any) => t.type === 'expense').reduce((a: any, c: any) => a + c.amount, 0), [transactions]);
  const profit = revenue - expenses;
  
  const chartData = useMemo(() => WEEK.map((day, idx) => ({
    name: day,
    pemasukan: transactions.filter((t: any) => t.type === 'income' && new Date(t.timestamp).getDay() === (idx + 1) % 7)
      .reduce((a: any, c: any) => a + c.amount, 0) || Math.floor(Math.random() * 80000 + 20000),
    pengeluaran: transactions.filter((t: any) => t.type === 'expense' && new Date(t.timestamp).getDay() === (idx + 1) % 7)
      .reduce((a: any, c: any) => a + c.amount, 0) || Math.floor(Math.random() * 40000 + 10000),
  })), [transactions]);

  const pieData = useMemo(() => {
    const cats = [...new Set(transactions.map((t: any) => t.category))] as string[];
    return cats.map(cat => ({
      name: cat,
      value: transactions.filter((t: any) => t.category === cat).reduce((a: any, c: any) => a + c.amount, 0)
    })).sort((a, b) => b.value - a.value).slice(0, 4);
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-blue-primary to-blue-dark rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-primary/20">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-2">Keuntungan Bersih</p>
        <h2 className="text-4xl font-black mb-8 tracking-tighter">{fmtFull(profit)}</h2>
        <div className="flex gap-10">
          <div>
            <p className="text-[10px] font-black uppercase opacity-60 mb-1">⬆ Pemasukan</p>
            <p className="text-lg font-black">{fmt(revenue)}</p>
          </div>
          <div className="w-px h-10 bg-white/20 self-center"></div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-60 mb-1">⬇ Pengeluaran</p>
            <p className="text-lg font-black">{fmt(expenses)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Masuk" value={fmt(revenue)} icon={TrendingUp} color="green" trend="12.5%" trendUp />
        <StatCard label="Total Keluar" value={fmt(expenses)} icon={TrendingDown} color="red" trend="2.4%" trendUp={false} />
        <StatCard label="Efisiensi" value="94%" icon={Brain} color="blue" trend="Optimal" trendUp />
        <StatCard label="Transaksi" value={transactions.length} icon={Wallet} color="amber" trend="Stabil" trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-[var(--app-text)]">Tren Kas 7 Hari</h3>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D6FE8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1D6FE8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94A3B8' }} dy={10} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: 'var(--app-surface)',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '12px',
                    fontWeight: '900'
                  }} 
                />
                <Area type="monotone" dataKey="pemasukan" stroke="#1D6FE8" strokeWidth={3} fillOpacity={1} fill="url(#colorMasuk)" />
                <Area type="monotone" dataKey="pengeluaran" stroke="#E2E8F0" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl p-6">
          <h3 className="text-base font-black text-[var(--app-text)] mb-6">Kategori Biaya</h3>
          <div className="flex items-center gap-8">
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value" paddingAngle={4} stroke="none">
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS_PIE[i % COLORS_PIE.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {pieData.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS_PIE[i] }}></div>
                    <span className="font-bold text-[var(--app-muted)]">{item.name}</span>
                  </div>
                  <span className="font-black text-[var(--app-text)]">{fmt(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-black text-[var(--app-text)]">Transaksi Terakhir</h3>
          <button onClick={onGoTransactions} className="text-xs font-black text-blue-primary flex items-center gap-1">
            Lihat Semua <ChevronRight size={14} />
          </button>
        </div>
        <div className="divide-y divide-[var(--app-border)]">
          {transactions.slice(0, 5).map((tx: any) => <TxRow key={tx.id} tx={tx} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [transactions, setTransactions] = useState(INITIAL_TX);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [inputText, setInputText] = useState('');
  const [toast, setToast] = useState('');

  const [manualForm, setManualForm] = useState({
    type: 'income',
    amount: '',
    description: '',
    category: ''
  });

  const [products, setProducts] = useState([
    { id: '1', name: 'Mie Ayam Special', stock: 45, price: 15000, category: 'Makanan' },
    { id: '2', name: 'Es Teh Manis', stock: 120, price: 5000, category: 'Minuman' },
    { id: '3', name: 'Bakso Urat', stock: 30, price: 20000, category: 'Makanan' },
  ]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '', category: '' });

  const handleAddProduct = (e: any) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.stock || !newProduct.price) return;
    setProducts(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      stock: parseInt(newProduct.stock),
      price: parseInt(newProduct.price),
      category: newProduct.category || 'Lainnya'
    }]);
    setNewProduct({ name: '', stock: '', price: '', category: '' });
    setShowAddProduct(false);
    setToast('Produk ditambahkan!');
    setTimeout(() => setToast(''), 2000);
  };

  const handleManualSubmit = (e: any) => {
    e.preventDefault();
    if (!manualForm.amount || !manualForm.description) return;
    setTransactions(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      type: manualForm.type as any,
      amount: parseInt(manualForm.amount),
      description: manualForm.description,
      category: manualForm.category || (manualForm.type === 'income' ? 'Penjualan' : 'Belanja'),
      timestamp: new Date(),
    }, ...prev]);
    setManualForm({ type: 'income', amount: '', description: '', category: '' });
    setToast('Berhasil dicatat manual!');
    setTimeout(() => setToast(''), 2000);
  };

  const handleDelete = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    setToast('Transaksi dihapus');
    setTimeout(() => setToast(''), 2000);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark]);

  const handleRecord = () => {
    if (!inputText.trim()) return;
    const parsed = parseInput(inputText);
    setTransactions(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      ...parsed,
      category: parsed.type === 'income' ? 'Penjualan' : parsed.type === 'expense' ? 'Belanja' : 'Hutang',
      timestamp: new Date(),
    }, ...prev]);
    setInputText('');
    setToast('Berhasil dicatat!');
    setTimeout(() => setToast(''), 2000);
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Beranda' },
    { id: 'transactions', icon: Plus, label: 'Catat', special: true },
    { id: 'inventory', icon: Package, label: 'Stok' },
    { id: 'settings', icon: Sliders, label: 'Atur' },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg)] transition-colors duration-300">
      <Toast msg={toast} />
      
      {/* Desktop Sidebar (Responsive) */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-[var(--app-surface)] border-r border-[var(--app-border)] flex-col p-8 z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-2.5 bg-blue-primary rounded-xl text-white shadow-xl shadow-blue-primary/20">
            <Brain size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter">SmartFlow</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-black transition-all ${
                tab === item.id 
                  ? 'bg-blue-primary text-white shadow-xl shadow-blue-primary/10' 
                  : 'text-[var(--app-muted)] hover:bg-[var(--app-bg)]'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-2 pt-8 border-t border-[var(--app-border)]">
          <Link 
            to="/"
            className="flex items-center gap-4 p-4 rounded-2xl text-sm font-black text-blue-primary hover:bg-blue-light transition-all"
          >
            <ArrowLeft size={20} />
            Kembali ke Web
          </Link>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-black text-[var(--app-muted)] hover:bg-[var(--app-bg)] transition-all"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            {isDark ? 'Mode Terang' : 'Mode Gelap'}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-72 pb-32">
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-72 z-[1000] bg-[var(--app-surface)]/80 backdrop-blur-xl border-b border-[var(--app-border)] px-4 lg:px-12 py-4 flex justify-between items-center transition-all duration-300">
          <div className="flex items-center gap-3">
            <Link to="/" className="lg:hidden p-2 hover:bg-[var(--app-bg)] rounded-xl text-blue-primary transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-sm lg:text-xl font-black text-[var(--app-text)] uppercase tracking-tight">
                {tab === 'dashboard' ? 'Ringkasan' : tab === 'transactions' ? 'Transaksi' : tab === 'inventory' ? 'Gudang' : 'Setelan'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
             <button onClick={() => setIsDark(!isDark)} className="p-2 text-[var(--app-muted)] hover:text-blue-primary transition-colors">
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <div className="w-px h-4 bg-[var(--app-border)]"></div>
             <div className="flex items-center gap-2 p-1 lg:p-1.5 bg-[var(--app-bg)] rounded-xl lg:rounded-2xl cursor-pointer">
               <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-blue-primary text-white flex items-center justify-center text-[10px] font-black">AV</div>
               <span className="text-[10px] font-black pr-1 hidden sm:block">Andi Vermont</span>
             </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6 lg:p-12">
          {tab === 'dashboard' && <DashboardPage transactions={transactions} onGoTransactions={() => setTab('transactions')} />}
          
          {tab === 'transactions' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2 space-y-6">
                
                {/* Manual Input Form */}
                <div className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl p-6">
                  <h2 className="text-base font-black mb-6 text-[var(--app-text)]">Catat Transaksi Manual</h2>
                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-1 mb-1 block">Jenis</label>
                        <select 
                          value={manualForm.type}
                          onChange={(e) => setManualForm({...manualForm, type: e.target.value})}
                          className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--app-text)] focus:border-blue-primary/50 outline-none"
                        >
                          <option value="income">Pemasukan (+)</option>
                          <option value="expense">Pengeluaran (-)</option>
                          <option value="debt">Hutang/Piutang (~)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-1 mb-1 block">Nominal (Rp)</label>
                        <input 
                          type="number" 
                          value={manualForm.amount}
                          onChange={(e) => setManualForm({...manualForm, amount: e.target.value})}
                          placeholder="0"
                          className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--app-text)] focus:border-blue-primary/50 outline-none"
                        />
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-1 mb-1 block">Keterangan</label>
                           <input 
                             type="text" 
                             value={manualForm.description}
                             onChange={(e) => setManualForm({...manualForm, description: e.target.value})}
                             placeholder="Contoh: Jual Mie Ayam 2 Porsi"
                             className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--app-text)] focus:border-blue-primary/50 outline-none"
                           />
                        </div>
                        <div>
                           <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-1 mb-1 block">Kategori (Opsional)</label>
                           <input 
                             type="text" 
                             value={manualForm.category}
                             onChange={(e) => setManualForm({...manualForm, category: e.target.value})}
                             placeholder="Contoh: Operasional"
                             className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-3 text-sm font-bold text-[var(--app-text)] focus:border-blue-primary/50 outline-none"
                           />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn-primary w-full py-3 mt-2 text-sm shadow-xl hover:shadow-2xl">
                      Simpan Transaksi
                    </button>
                  </form>
                </div>

                <div className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl overflow-hidden">
                  <div className="p-6 border-b border-[var(--app-border)] flex justify-between items-center">
                    <h2 className="text-base font-black text-[var(--app-text)]">Riwayat Transaksi</h2>
                    <div className="flex gap-2">
                      <button className="p-2 bg-[var(--app-bg)] rounded-lg text-[var(--app-muted)] hover:bg-[var(--app-border)] transition-all"><Search size={16} /></button>
                      <button className="p-2 bg-[var(--app-bg)] rounded-lg text-[var(--app-muted)] hover:bg-[var(--app-border)] transition-all"><Bell size={16} /></button>
                    </div>
                  </div>
                  <div className="p-6 divide-y divide-[var(--app-border)] max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {transactions.map(tx => <TxRow key={tx.id} tx={tx} onDelete={handleDelete} />)}
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="bg-blue-primary rounded-3xl p-6 text-white shadow-2xl shadow-blue-primary/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain size={24} />
                    <h3 className="text-lg font-black tracking-tight">AI Assistant</h3>
                  </div>
                  <div className="relative mb-6">
                    <textarea 
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleRecord())}
                      placeholder="Jual mie ayam 2 porsi 30rb..."
                      className="w-full bg-white/10 border-2 border-white/10 rounded-2xl p-5 text-sm font-bold text-white placeholder:text-white/40 focus:bg-white/20 outline-none resize-none transition-all"
                      rows={4}
                    />
                    <button 
                      onClick={handleRecord}
                      className="absolute right-3 bottom-3 p-3 bg-white text-blue-primary rounded-xl shadow-xl hover:scale-105 transition-all"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Tips Cepat</p>
                  <div className="space-y-2">
                    {['Jual bakso 25rb', 'Beli gas 20rb'].map((tip, i) => (
                      <button key={i} onClick={() => setInputText(tip)} className="w-full p-3 bg-white/5 border border-white/5 rounded-xl text-left text-xs font-bold hover:bg-white/10 transition-all">
                        "{tip}"
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}

          {tab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-[var(--app-text)]">Stok Produk</h2>
                  <p className="text-xs font-bold text-[var(--app-muted)]">Kelola ketersediaan bahan dan menu</p>
                </div>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className="px-4 py-2 bg-blue-primary text-white rounded-xl text-xs font-black flex items-center gap-2"
                >
                  <Plus size={16} /> Tambah
                </button>
              </div>

              {showAddProduct && (
                <div className="bg-[var(--app-surface)] border-2 border-blue-primary/20 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-sm font-black mb-4">Tambah Produk Baru</h3>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      placeholder="Nama Produk" 
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-2.5 text-sm font-bold outline-none" 
                    />
                    <input 
                      placeholder="Kategori" 
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                      className="bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-2.5 text-sm font-bold outline-none" 
                    />
                    <input 
                      type="number" 
                      placeholder="Stok" 
                      value={newProduct.stock}
                      onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                      className="bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-2.5 text-sm font-bold outline-none" 
                    />
                    <input 
                      type="number" 
                      placeholder="Harga Jual" 
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      className="bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-4 py-2.5 text-sm font-bold outline-none" 
                    />
                    <div className="md:col-span-2 flex gap-3">
                      <button type="submit" className="btn-primary flex-1 py-2.5 text-xs">Simpan Produk</button>
                      <button type="button" onClick={() => setShowAddProduct(false)} className="px-6 py-2.5 bg-[var(--app-bg)] text-[var(--app-muted)] rounded-xl text-xs font-bold">Batal</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <div key={product.id} className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl p-5 hover:border-blue-primary/20 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-blue-light rounded-xl text-blue-primary">
                        <Package size={20} />
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${product.stock < 10 ? 'bg-red-500/10 text-red-primary' : 'bg-green-500/10 text-green-primary'}`}>
                        {product.stock < 10 ? 'Stok Tipis' : 'Tersedia'}
                      </div>
                    </div>
                    <h3 className="font-black text-[var(--app-text)] mb-1">{product.name}</h3>
                    <p className="text-[10px] font-bold text-[var(--app-muted)] uppercase mb-4">{product.category}</p>
                    <div className="flex justify-between items-end border-t border-[var(--app-border)] pt-4">
                      <div>
                        <p className="text-[10px] font-black text-[var(--app-muted)] uppercase">Stok</p>
                        <p className="text-sm font-black text-[var(--app-text)]">{product.stock} Unit</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-[var(--app-muted)] uppercase">Harga</p>
                        <p className="text-sm font-black text-blue-primary">{fmt(product.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-[var(--app-surface)] border-2 border-[var(--app-border)] rounded-3xl p-8">
                 <h2 className="text-xl font-black mb-8">Pengaturan Bisnis</h2>
                 <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="text-[10px] font-black uppercase text-[var(--app-muted)] mb-2 block px-1">Nama Bisnis</label>
                       <input type="text" defaultValue="Vermont Coffee" className="input-premium" />
                     </div>
                     <div>
                       <label className="text-[10px] font-black uppercase text-[var(--app-muted)] mb-2 block px-1">Mata Uang</label>
                       <select className="input-premium">
                         <option>IDR (Rupiah)</option>
                         <option>USD (Dollar)</option>
                       </select>
                     </div>
                   </div>
                   <div>
                     <label className="text-[10px] font-black uppercase text-[var(--app-muted)] mb-2 block px-1">Email Notifikasi</label>
                     <input type="email" defaultValue="owner@vermont.com" className="input-premium" />
                   </div>
                   <div className="p-4 bg-blue-light rounded-2xl border border-blue-primary/10">
                     <p className="text-xs font-bold text-blue-primary leading-relaxed">
                       Sistem SmartFlow Anda saat ini terhubung dengan AI Laboratory Vermont untuk analisis tren otomatis.
                     </p>
                   </div>
                   <button className="btn-primary w-full py-4 text-base mt-4">Simpan Perubahan</button>
                 </div>
              </div>

              <div className="bg-red-500/5 border-2 border-red-500/10 rounded-3xl p-8">
                <h3 className="text-sm font-black text-red-primary mb-2 uppercase">Zona Berbahaya</h3>
                <p className="text-xs font-bold text-[var(--app-muted)] mb-6">Menghapus semua data transaksi dan stok secara permanen.</p>
                <button className="px-6 py-3 bg-red-500 text-white rounded-2xl text-xs font-black hover:bg-red-600 transition-all">
                  Reset Data Bisnis
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--app-surface)]/90 backdrop-blur-xl border-t border-[var(--app-border)] flex justify-around items-center px-2 py-2 z-[1000] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pb-safe">
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] h-12 transition-all duration-300 ${
              item.special 
                ? 'bg-blue-primary text-white rounded-2xl shadow-lg shadow-blue-primary/40' 
                : tab === item.id ? 'text-blue-primary' : 'text-[var(--app-muted)]'
            }`}
          >
            <item.icon size={20} />
            {!item.special && <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>}
            {item.special && <span className="text-[8px] font-bold uppercase tracking-tighter">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}