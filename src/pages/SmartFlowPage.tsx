import { useMemo, useState } from 'react';
import {
  Bell,
  Bot,
  Boxes,
  ChartLine,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  LineChart,
  MessageSquare,
  Moon,
  Package,
  Search,
  Send,
  Sparkles,
  Sun,
  TrendingDown,
  TrendingUp,
  UserRound,
  Wallet,
  AlertTriangle,
  ReceiptText,
  Upload,
  ArrowLeft,
  CircleDollarSign,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import Logo from '../components/Logo';
import { generateInsights, parseBusinessInput } from '../features/smartflow/ai';
import { initialCustomers, initialInventory, initialTransactions, packagePlans } from '../features/smartflow/mockData';
import type { PaymentMethod, Transaction, TransactionType } from '../features/smartflow/types';
import { formatMoney, formatMoneyFull, isToday, monthKey, shortDate } from '../features/smartflow/utils';

type ViewKey = 'dashboard' | 'cashflow' | 'transactions' | 'analytics' | 'inventory' | 'customers' | 'debts' | 'payments' | 'packages';

const paymentLabel: Record<PaymentMethod, string> = {
  cash: 'Cash',
  qris: 'QRIS',
  transfer: 'Transfer',
  'e-wallet': 'E-Wallet',
};

const typeLabel: Record<TransactionType, string> = {
  income: 'Pemasukan',
  expense: 'Pengeluaran',
  debt: 'Utang/Piutang',
};

const typeClass: Record<TransactionType, string> = {
  income: 'text-emerald-600 bg-emerald-500/10',
  expense: 'text-rose-600 bg-rose-500/10',
  debt: 'text-amber-600 bg-amber-500/10',
};

const navItems: { key: ViewKey; label: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'cashflow', label: 'Cash Flow', icon: Wallet },
  { key: 'transactions', label: 'Transaction Logs', icon: ReceiptText },
  { key: 'analytics', label: 'Analytics', icon: LineChart },
  { key: 'inventory', label: 'Inventory Details', icon: Package },
  { key: 'customers', label: 'Customer History', icon: UserRound },
  { key: 'debts', label: 'Debt Tracking', icon: FileText },
  { key: 'payments', label: 'Payment System', icon: CreditCard },
  { key: 'packages', label: 'Package System', icon: Boxes },
];

function SummaryCard({
  label,
  value,
  hint,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ElementType;
  tone: 'blue' | 'green' | 'rose' | 'amber' | 'violet';
}) {
  const toneMap = {
    blue: 'from-blue-500/20 to-cyan-500/10 text-blue-700 dark:text-blue-300',
    green: 'from-emerald-500/20 to-lime-500/10 text-emerald-700 dark:text-emerald-300',
    rose: 'from-rose-500/20 to-orange-500/10 text-rose-700 dark:text-rose-300',
    amber: 'from-amber-500/20 to-yellow-500/10 text-amber-700 dark:text-amber-300',
    violet: 'from-violet-500/20 to-fuchsia-500/10 text-violet-700 dark:text-violet-300',
  };

  return (
    <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 shadow-[0_10px_30px_rgba(18,30,62,0.06)]">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[var(--app-muted)]">{label}</p>
        <div className={`rounded-2xl bg-gradient-to-br p-3 ${toneMap[tone]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-3xl font-black tracking-tight text-[var(--app-text)]">{value}</p>
      <p className="mt-2 text-xs font-bold text-[var(--app-muted)]">{hint}</p>
    </div>
  );
}

function SmartFlowPage() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [activeView, setActiveView] = useState<ViewKey>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [inventory] = useState(initialInventory);
  const [customers] = useState(initialCustomers);
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | TransactionType>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const todayTransactions = useMemo(() => transactions.filter((tx) => isToday(tx.timestamp)), [transactions]);

  const todayRevenue = useMemo(
    () => todayTransactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0),
    [todayTransactions],
  );

  const monthProfit = useMemo(() => {
    const currentMonth = monthKey(new Date());
    const monthTx = transactions.filter((tx) => monthKey(tx.timestamp) === currentMonth);
    const income = monthTx.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const expense = monthTx.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    return income - expense;
  }, [transactions]);

  const bestSelling = useMemo(() => {
    const counter = new Map<string, number>();
    transactions.filter((tx) => tx.type === 'income' && tx.productName).forEach((tx) => {
      const key = tx.productName || 'Umum';
      counter.set(key, (counter.get(key) || 0) + tx.amount);
    });
    return [...counter.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || 'Belum ada data';
  }, [transactions]);

  const lowStock = useMemo(() => inventory.filter((item) => item.stock <= item.minStock), [inventory]);
  const unpaidDebts = useMemo(() => transactions.filter((tx) => tx.type === 'debt' && !tx.paid), [transactions]);

  const trendData = useMemo(
    () => [
      { label: 'Sen', income: 420000, expense: 190000 },
      { label: 'Sel', income: 550000, expense: 210000 },
      { label: 'Rab', income: 490000, expense: 280000 },
      { label: 'Kam', income: 610000, expense: 250000 },
      { label: 'Jum', income: 730000, expense: 340000 },
      { label: 'Sab', income: 820000, expense: 360000 },
      { label: 'Min', income: 690000, expense: 300000 },
    ],
    [],
  );

  const analyticsPie = useMemo(
    () => [
      { name: 'QRIS', value: transactions.filter((t) => t.paymentMethod === 'qris').length },
      { name: 'Transfer', value: transactions.filter((t) => t.paymentMethod === 'transfer').length },
      { name: 'Cash', value: transactions.filter((t) => t.paymentMethod === 'cash').length },
      { name: 'E-Wallet', value: transactions.filter((t) => t.paymentMethod === 'e-wallet').length },
    ],
    [transactions],
  );

  const insights = useMemo(
    () =>
      generateInsights({
        weekGrowth: 18,
        topProduct: bestSelling,
        expenseGrowth: 9,
        lowStock: lowStock[0]?.name || 'produk utama',
        unpaidDebts: unpaidDebts.length,
      }),
    [bestSelling, lowStock, unpaidDebts.length],
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((tx) => {
        const query = `${tx.description} ${tx.category} ${tx.customerName || ''}`.toLowerCase();
        const matchedQuery = query.includes(search.toLowerCase());
        const matchedType = filterType === 'all' ? true : tx.type === filterType;
        return matchedQuery && matchedType;
      }),
    [transactions, search, filterType],
  );

  const handleSmartInput = () => {
    if (!inputText.trim()) return;
    const parsed = parseBusinessInput(inputText);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: parsed.type,
      amount: parsed.amount,
      category: parsed.category,
      description: parsed.description,
      productName: parsed.productName,
      customerName: parsed.customerName,
      paymentMethod: parsed.paymentMethod,
      paid: parsed.paid,
      timestamp: new Date(),
    };
    setTransactions((prev) => [newTx, ...prev]);
    setInputText('');
  };

  if (isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(29,111,232,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(25,190,126,0.12),transparent_35%)]" />

      <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-[var(--app-border)] bg-[var(--app-surface)] p-7 lg:flex">
        <div className="mb-10">
          <Logo />
          <p className="mt-4 text-xs font-bold text-[var(--app-muted)]">Sistem Operasional Bisnis untuk UMKM Indonesia</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition ${
                activeView === item.key
                  ? 'bg-blue-primary text-white shadow-xl shadow-blue-primary/25'
                  : 'text-[var(--app-muted)] hover:bg-[var(--app-bg)]'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-2 border-t border-[var(--app-border)] pt-5">
          <Link to="/" className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-blue-primary hover:bg-blue-light">
            <ArrowLeft size={16} /> Kembali ke Website
          </Link>
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-[var(--app-muted)] hover:bg-[var(--app-bg)]"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />} {isDark ? 'Mode Terang' : 'Mode Gelap'}
          </button>
        </div>
      </aside>

      <main className="pb-20 lg:ml-72">
        <header className="sticky top-0 z-40 border-b border-[var(--app-border)] bg-[var(--app-surface)]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-primary">Vermont SmartFlow</p>
              <h1 className="text-xl font-black tracking-tight">{navItems.find((x) => x.key === activeView)?.label}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl p-2 text-[var(--app-muted)] hover:bg-[var(--app-bg)]">
                <Bell size={17} />
              </button>
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-2">
                <div className="h-8 w-8 rounded-xl bg-blue-primary text-center text-xs font-black leading-8 text-white">VT</div>
                <div className="text-[11px] font-black">
                  <div>Owner Mode</div>
                  <div className="text-[var(--app-muted)]">Startup Grade</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-10">
          <section className="rounded-3xl border border-blue-primary/15 bg-gradient-to-br from-blue-primary to-blue-dark p-6 text-white shadow-[0_20px_60px_rgba(29,111,232,0.35)] md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-75">Input Bahasa Sehari-hari</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Catat Bisnis Pakai Bahasa Sehari-hari</h2>
              </div>
              <div className="rounded-2xl bg-white/15 px-4 py-2 text-xs font-black">UMKM | TikTok Shop | Shopee | Cafe | Retail</div>
            </div>
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Contoh: jual kopi 25rb via qris, utang pak budi 100rb, beli stok gula 200rb transfer"
                className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-bold text-white placeholder:text-white/70 outline-none"
              />
              <button
                onClick={handleSmartInput}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-blue-primary hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  <Send size={16} /> Proses Catatan
                </span>
              </button>
            </div>
            <p className="mt-3 text-xs font-bold text-blue-100">Sistem otomatis membaca catatan, mengelompokkan transaksi, dan memperbarui laporan bisnis Anda.</p>
          </section>

          {activeView === 'dashboard' && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <SummaryCard label="Today Revenue" value={formatMoney(todayRevenue)} hint="Omset hari ini dari semua channel" icon={TrendingUp} tone="green" />
                <SummaryCard label="Today Transactions" value={`${todayTransactions.length} order`} hint="Total transaksi tercatat hari ini" icon={ReceiptText} tone="blue" />
                <SummaryCard label="Monthly Profit" value={formatMoney(monthProfit)} hint="Profit bersih berjalan bulan ini" icon={CircleDollarSign} tone="violet" />
                <SummaryCard label="Best Selling Product" value={bestSelling} hint="Produk dengan nilai jual tertinggi" icon={Sparkles} tone="amber" />
                <SummaryCard label="Low Stock Alert" value={lowStock[0]?.name || 'Aman'} hint={lowStock[0] ? `Sisa ${lowStock[0].stock} unit` : 'Semua stok aman'} icon={AlertTriangle} tone="rose" />
                <SummaryCard label="Unpaid Debts" value={`${unpaidDebts.length} tagihan`} hint="Perlu follow-up agar cash flow stabil" icon={FileText} tone="blue" />
              </section>

              <section className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-black">Revenue vs Expense Trend</h3>
                    <span className="text-xs font-black text-[var(--app-muted)]">7 hari terakhir</span>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                        <XAxis dataKey="label" tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="income" fill="#1D6FE8" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="expense" fill="#F97316" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                  <div className="mb-5 flex items-center gap-2">
                    <Bot size={18} className="text-blue-primary" />
                    <h3 className="text-lg font-black">Ringkasan Bisnis</h3>
                  </div>
                  <div className="space-y-3">
                    {insights.map((insight) => (
                      <div key={insight} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] p-3 text-sm font-bold text-[var(--app-muted)]">
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}

          {activeView === 'cashflow' && (
            <section className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                <SummaryCard label="Money In" value={formatMoney(transactions.filter((t) => t.type === 'income').reduce((a, c) => a + c.amount, 0))} hint="Total pemasukan" icon={TrendingUp} tone="green" />
                <SummaryCard label="Money Out" value={formatMoney(transactions.filter((t) => t.type === 'expense').reduce((a, c) => a + c.amount, 0))} hint="Total pengeluaran" icon={TrendingDown} tone="rose" />
                <SummaryCard label="Operational Cost" value={formatMoney(transactions.filter((t) => t.category.toLowerCase().includes('operasional')).reduce((a, c) => a + c.amount, 0))} hint="Biaya operasional aktif" icon={Wallet} tone="amber" />
                <SummaryCard label="Business Profit" value={formatMoney(monthProfit)} hint="Profit berjalan" icon={ChartLine} tone="blue" />
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                  <h3 className="mb-4 text-lg font-black">Monthly Comparison</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[{ month: 'Apr', income: 6800000, expense: 4100000 }, { month: 'Mei', income: 8200000, expense: 4700000 }] }>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="income" fill="#1D6FE8" radius={[10, 10, 0, 0]} />
                        <Bar dataKey="expense" fill="#EF4444" radius={[10, 10, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                  <h3 className="mb-4 text-lg font-black">Analisis Bisnis</h3>
                  <div className="space-y-3 text-sm font-bold text-[var(--app-muted)]">
                    <p className="rounded-2xl bg-[var(--app-bg)] p-3">Margin profit bulan ini naik karena biaya logistik lebih efisien.</p>
                    <p className="rounded-2xl bg-[var(--app-bg)] p-3">Pengeluaran tertinggi ada pada bahan baku. Pertimbangkan pembelian grosir mingguan.</p>
                    <p className="rounded-2xl bg-[var(--app-bg)] p-3">Cash-in dari channel online naik signifikan, dorong promo bundling akhir pekan.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeView === 'transactions' && (
            <section className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
              <div className="mb-5 flex flex-wrap gap-3">
                <div className="relative min-w-[220px] flex-1">
                  <Search size={16} className="absolute left-3 top-3 text-[var(--app-muted)]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari transaksi, kategori, customer"
                    className="w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)] py-2 pl-9 pr-3 text-sm font-bold outline-none"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | TransactionType)}
                  className="rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)] px-3 text-sm font-bold"
                >
                  <option value="all">Semua Jenis</option>
                  <option value="income">Pemasukan</option>
                  <option value="expense">Pengeluaran</option>
                  <option value="debt">Utang/Piutang</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-[0.15em] text-[var(--app-muted)]">
                      <th className="py-3">Detail</th>
                      <th className="py-3">Kategori</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Payment</th>
                      <th className="py-3">Timestamp</th>
                      <th className="py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="cursor-pointer border-t border-[var(--app-border)] text-sm hover:bg-[var(--app-bg)]" onClick={() => setSelectedTx(tx)}>
                        <td className="py-3 font-black">{tx.description}</td>
                        <td className="py-3 font-bold text-[var(--app-muted)]">{tx.category}</td>
                        <td className="py-3">
                          <span className={`rounded-lg px-2 py-1 text-xs font-black ${typeClass[tx.type]}`}>{typeLabel[tx.type]}</span>
                        </td>
                        <td className="py-3 font-bold">{paymentLabel[tx.paymentMethod]}</td>
                        <td className="py-3 font-bold text-[var(--app-muted)]">{shortDate(tx.timestamp)}</td>
                        <td className="py-3 text-right font-black">{formatMoneyFull(tx.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeView === 'analytics' && (
            <section className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                <h3 className="mb-4 text-lg font-black">Revenue Growth Analytics</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="income" fill="#0EA5E9" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                <h3 className="mb-4 text-lg font-black">Payment Mix</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={analyticsPie} innerRadius={60} outerRadius={90} dataKey="value" fill="#1D6FE8" />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          )}

          {activeView === 'inventory' && (
            <section className="space-y-4">
              <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                <h3 className="mb-4 text-lg font-black">Stock Monitoring & Movement</h3>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {inventory.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-black">{item.name}</p>
                          <p className="text-xs font-bold text-[var(--app-muted)]">{item.category}</p>
                        </div>
                        <span className={`rounded-lg px-2 py-1 text-[10px] font-black ${item.stock <= item.minStock ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                          {item.stock <= item.minStock ? 'Low Stock' : 'Normal'}
                        </span>
                      </div>
                      <p className="text-sm font-bold">Stok: {item.stock} unit</p>
                      <p className="text-xs font-bold text-[var(--app-muted)]">Perkiraan: stok diperkirakan habis dalam {Math.max(1, Math.ceil(item.stock / item.dailyUsage))} hari.</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeView === 'customers' && (
            <section className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
              <h3 className="mb-4 text-lg font-black">Customer Management</h3>
              <div className="space-y-3">
                {customers.map((c) => (
                  <div key={c.id} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-bg)] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-black">{c.name}</p>
                        <p className="text-xs font-bold text-[var(--app-muted)]">{c.segment} • Repeat Order: {c.repeatOrders}x</p>
                      </div>
                      <p className="text-sm font-black text-blue-primary">{formatMoneyFull(c.totalSpending)}</p>
                    </div>
                    <p className="mt-2 text-xs font-bold text-[var(--app-muted)]">{c.notes}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeView === 'debts' && (
            <section className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
              <h3 className="mb-4 text-lg font-black">Debt Tracking</h3>
              <div className="space-y-3">
                {unpaidDebts.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <div>
                      <p className="font-black">{tx.customerName || tx.description}</p>
                      <p className="text-xs font-bold text-[var(--app-muted)]">{shortDate(tx.timestamp)} • Belum dibayar</p>
                    </div>
                    <p className="font-black text-amber-700">{formatMoneyFull(tx.amount)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeView === 'payments' && (
            <section className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                <h3 className="mb-4 text-lg font-black">Upload Bukti Pembayaran</h3>
                <div className="space-y-3">
                  <label className="block rounded-2xl border border-dashed border-[var(--app-border)] bg-[var(--app-bg)] p-4 text-sm font-bold text-[var(--app-muted)]">
                    <span className="mb-2 flex items-center gap-2 text-[var(--app-text)]"><Upload size={15} /> Bukti QRIS</span>
                    <input type="file" className="w-full text-xs" />
                  </label>
                  <label className="block rounded-2xl border border-dashed border-[var(--app-border)] bg-[var(--app-bg)] p-4 text-sm font-bold text-[var(--app-muted)]">
                    <span className="mb-2 flex items-center gap-2 text-[var(--app-text)]"><Upload size={15} /> Bukti Transfer</span>
                    <input type="file" className="w-full text-xs" />
                  </label>
                  <label className="block rounded-2xl border border-dashed border-[var(--app-border)] bg-[var(--app-bg)] p-4 text-sm font-bold text-[var(--app-muted)]">
                    <span className="mb-2 flex items-center gap-2 text-[var(--app-text)]"><Upload size={15} /> Lampiran Invoice</span>
                    <input type="file" className="w-full text-xs" />
                  </label>
                </div>
              </div>
              <div className="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                <h3 className="mb-4 text-lg font-black">Premium Payment Features</h3>
                <div className="space-y-3 text-sm font-bold text-[var(--app-muted)]">
                  <p className="rounded-2xl bg-[var(--app-bg)] p-3">Payment gateway integration untuk verifikasi otomatis.</p>
                  <p className="rounded-2xl bg-[var(--app-bg)] p-3">Automatic QRIS generator untuk setiap invoice.</p>
                  <p className="rounded-2xl bg-[var(--app-bg)] p-3">Verifikasi transaksi otomatis untuk deteksi mismatch pembayaran.</p>
                </div>
              </div>
            </section>
          )}

          {activeView === 'packages' && (
            <section className="grid gap-4 md:grid-cols-3">
              {packagePlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-3xl border p-6 ${plan.id === 'platinum' ? 'border-blue-primary bg-gradient-to-b from-blue-light to-[var(--app-surface)]' : 'border-[var(--app-border)] bg-[var(--app-surface)]'}`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--app-muted)]">{plan.name}</p>
                  <p className="mt-4 text-sm font-bold text-[var(--app-muted)]">Setup</p>
                  <p className="text-2xl font-black">{formatMoneyFull(plan.setupPrice)}</p>
                  <p className="mt-3 text-sm font-bold text-[var(--app-muted)]">Langganan</p>
                  <p className="text-xl font-black">{formatMoneyFull(plan.monthlyPrice)}<span className="text-sm">/bulan</span></p>
                  <div className="mt-4 space-y-2 text-xs font-bold text-[var(--app-muted)]">
                    {plan.features.map((feature) => (
                      <p key={feature} className="flex items-center gap-2"><ChevronRight size={14} className="text-blue-primary" /> {feature}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>

      {selectedTx && (
        <div className="fixed inset-0 z-[999] grid place-items-center bg-black/40 p-4" onClick={() => setSelectedTx(null)}>
          <div className="w-full max-w-lg rounded-3xl bg-[var(--app-surface)] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-lg font-black">Transaction Detail</h4>
              <button className="rounded-xl bg-[var(--app-bg)] p-2" onClick={() => setSelectedTx(null)}>
                <MessageSquare size={15} />
              </button>
            </div>
            <div className="space-y-2 text-sm font-bold">
              <p>Deskripsi: {selectedTx.description}</p>
              <p>Jenis: {typeLabel[selectedTx.type]}</p>
              <p>Kategori: {selectedTx.category}</p>
              <p>Nominal: {formatMoneyFull(selectedTx.amount)}</p>
              <p>Payment: {paymentLabel[selectedTx.paymentMethod]}</p>
              <p>Status: {selectedTx.paid ? 'Lunas' : 'Belum Lunas'}</p>
              <p>Waktu: {shortDate(selectedTx.timestamp)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartFlowPage;



