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
    accent: 'from-slate-100 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20',
    button: 'Mulai Paket Basic',
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
    accent: 'from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20',
    button: 'Pilih Paket Pro',
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
    accent: 'from-amber-100 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/20',
    button: 'Ambil Paket Platinum',
    featured: true,
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

          <div className="grid gap-8 md:grid-cols-3">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col rounded-[2.5rem] border p-8 shadow-sm transition-all duration-500 hover:shadow-2xl ${
                  pkg.featured
                    ? 'border-blue-primary bg-[var(--app-surface)] shadow-blue-primary/10 relative scale-105 z-10'
                    : 'border-[var(--app-border)] bg-[var(--app-surface)]'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-primary px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                    Rekomendasi Utama
                  </div>
                )}

                <div className={`mb-8 rounded-3xl bg-gradient-to-br p-6 ${pkg.accent}`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-black tracking-[0.2em] text-slate-900 dark:text-white uppercase">{pkg.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Biaya Setup</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{pkg.setupNewPrice}</span>
                      <span className="text-xs font-bold text-slate-400 line-through">{pkg.setupOldPrice}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-900/5 dark:border-white/5">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{pkg.hosting}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Biaya Maintenance & Hosting</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-black text-[var(--app-text)] mb-3">{pkg.headline}</h3>
                  <p className="text-sm font-bold text-blue-primary bg-blue-primary/5 dark:bg-blue-primary/10 w-fit px-3 py-1 rounded-lg">{pkg.highlight}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-bold text-[var(--app-muted)] leading-relaxed">
                      <div className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-blue-primary/10 flex items-center justify-center">
                        <Check size={12} className="text-blue-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black transition-all active:scale-95 ${
                    pkg.featured
                      ? 'bg-blue-primary text-white hover:bg-blue-dark shadow-xl shadow-blue-primary/20'
                      : 'bg-[var(--app-bg)] text-[var(--app-text)] hover:bg-blue-primary hover:text-white'
                  }`}
                >
                  <Sparkles size={16} /> {pkg.button}
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
