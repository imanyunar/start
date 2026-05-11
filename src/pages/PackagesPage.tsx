import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'BASIC',
    setupOldPrice: 'Rp 1.500.000',
    setupNewPrice: 'Rp 999.000',
    hosting: '49rb/bulan',
    headline: 'Cocok untuk mulai digitalisasi bisnis',
    highlight: 'Website Cashflow + bonus Website Profile',
    features: [
      'Website cashflow sederhana untuk catat pemasukan & pengeluaran',
      'Bonus website profile bisnis agar pelanggan mudah kenal usaha Anda',
      'Dashboard ringkas yang mudah dipahami orang awam',
      'Dukungan update konten ringan',
    ],
    accent: 'from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20',
    button: 'Mulai Paket Basic',
    color: 'text-blue-600',
  },
  {
    name: 'PRO',
    setupOldPrice: 'Rp 2.000.000',
    setupNewPrice: 'Rp 1.499.000',
    hosting: '99rb/bulan',
    headline: 'Untuk bisnis yang sudah rutin jualan online',
    highlight: 'Semua fitur Basic + operasional lebih lengkap',
    features: [
      'Semua yang ada di paket Basic',
      'Laporan cashflow bulanan yang lebih detail',
      'Riwayat transaksi dengan pencarian & filter',
      'Manajemen stok produk dasar (stok masuk, stok keluar, stok menipis)',
      'Form order/kontak yang terhubung ke WhatsApp bisnis',
    ],
    accent: 'from-indigo-50 to-indigo-100/50 dark:from-indigo-950/40 dark:to-indigo-900/20',
    button: 'Pilih Paket Pro',
    color: 'text-indigo-600',
  },
  {
    name: 'PLATINUM',
    setupOldPrice: 'Rp 2.500.000',
    setupNewPrice: 'Rp 1.999.000',
    hosting: '149rb/bulan',
    headline: 'Untuk bisnis yang ingin sistem operasional lebih matang',
    highlight: 'Semua fitur Pro + automasi dan kontrol lebih kuat',
    features: [
      'Semua yang ada di paket Pro',
      'Laporan performa bisnis mingguan otomatis',
      'Pelacakan pelanggan & riwayat order berulang',
      'Pencatatan hutang/piutang dan status pembayaran',
      'Prioritas support dan pendampingan pengembangan fitur',
    ],
    accent: 'from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20',
    button: 'Ambil Paket Platinum',
    featured: true,
    color: 'text-amber-600',
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 transition-colors duration-300">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-light mx-auto mb-4 w-fit"
            >
              Paket Layanan
            </motion.div>
            <h1 className="text-4xl font-black tracking-tight text-[var(--app-text)] md:text-6xl mb-6">
              Pilih Paket Sesuai <span className="text-gradient">Kebutuhan Bisnis</span> Anda
            </h1>
            <p className="mt-4 text-lg font-bold leading-relaxed text-[var(--app-muted)]">
              Fokus kami sederhana: mempermudah dan mempercepat kegiatan bisnis harian Anda.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:items-stretch">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className={`flex flex-col rounded-[3rem] border p-8 transition-all duration-500 hover:shadow-2xl ${
                  pkg.featured
                    ? 'border-blue-primary/30 bg-[var(--app-surface)] shadow-2xl shadow-blue-primary/10 relative scale-105 z-10'
                    : 'border-[var(--app-border)] bg-[var(--app-surface)] shadow-xl shadow-slate-200/20 dark:shadow-none'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-blue-primary px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl">
                    ⭐ Spotlight Choice
                  </div>
                )}

                <div className={`mb-10 rounded-[2rem] bg-gradient-to-br p-7 shadow-inner ${pkg.accent}`}>
                  <div className="flex items-center justify-between mb-6">
                    <p className={`text-[11px] font-black tracking-[0.25em] uppercase ${pkg.color} dark:text-white`}>{pkg.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2">Investment</p>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">{pkg.setupNewPrice}</span>
                        <span className="text-xs font-bold text-slate-400 line-through decoration-rose-500/30">{pkg.setupOldPrice}</span>
                      </div>
                      <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="text-4xl font-black text-slate-900 dark:text-white">{pkg.hosting.split('/')[0]}</span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">/{pkg.hosting.split('/')[1]}</span>
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">Cloud Hosting & Maintenance</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8 px-2">
                  <h3 className="text-xl font-black text-[var(--app-text)] mb-3 leading-tight">{pkg.headline}</h3>
                  <div className="h-1 w-12 bg-blue-primary/20 rounded-full mb-4"></div>
                  <p className={`text-xs font-black uppercase tracking-wider ${pkg.color} bg-current/5 w-fit px-3 py-1.5 rounded-full`}>
                    {pkg.highlight}
                  </p>
                </div>

                <ul className="space-y-5 mb-12 flex-grow px-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-4 text-sm font-bold text-[var(--app-muted)] leading-relaxed group">
                      <div className={`mt-0.5 flex-shrink-0 h-6 w-6 rounded-xl bg-blue-primary/10 flex items-center justify-center transition-colors group-hover:bg-blue-primary/20`}>
                        <Check size={14} className="text-blue-primary" />
                      </div>
                      <span className="transition-colors group-hover:text-[var(--app-text)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`flex w-full items-center justify-center gap-3 rounded-[1.5rem] px-8 py-5 text-sm font-black transition-all active:scale-95 ${
                    pkg.featured
                      ? 'bg-blue-primary text-white hover:bg-blue-dark shadow-xl shadow-blue-primary/25 hover:-translate-y-1'
                      : 'bg-[var(--app-bg)] text-[var(--app-text)] hover:bg-blue-primary hover:text-white border border-[var(--app-border)]'
                  }`}
                >
                  <Sparkles size={18} /> {pkg.button}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 rounded-[3rem] bg-[var(--app-surface)] border border-[var(--app-border)] p-8 md:p-12 text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <h2 className="text-3xl font-black text-[var(--app-text)] mb-4">Butuh Solusi Kustom?</h2>
            <p className="text-[var(--app-muted)] font-bold max-w-2xl mx-auto mb-8">Jika bisnis Anda membutuhkan fitur khusus yang tidak ada di paket atas, tim lab kami siap membangun sistem yang sesuai dengan spesifikasi Anda.</p>
            <Link to="/contact" className="btn-secondary inline-flex">Konsultasi Gratis Sekarang</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
