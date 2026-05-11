import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Crown, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'Basic',
    tier: '01',
    icon: Rocket,
    setupOldPrice: 'Rp 1.500.000',
    setupNewPrice: 'Rp 999.000',
    hosting: '49rb',
    headline: 'Cocok untuk mulai digitalisasi bisnis',
    highlight: 'Website Cashflow + bonus Website Profile',
    features: [
      'Website cashflow sederhana untuk catat pemasukan & pengeluaran',
      'Bonus website profile bisnis agar pelanggan mudah kenal usaha Anda',
      'Dashboard ringkas yang mudah dipahami orang awam',
      'Dukungan update konten ringan',
    ],
    // Sky Blue header
    headerBg: 'bg-sky-500 dark:bg-sky-600',
    headerAccent: 'from-sky-500 to-blue-600 dark:from-sky-600 dark:to-blue-700',
    checkColor: 'text-sky-500',
    checkBg: 'bg-sky-500/10 dark:bg-sky-500/15',
    borderColor: 'border-sky-200 dark:border-sky-900',
    button: 'Mulai Paket Basic',
    btnClass: 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25',
    featured: false,
  },
  {
    name: 'Pro',
    tier: '02',
    icon: Zap,
    setupOldPrice: 'Rp 2.000.000',
    setupNewPrice: 'Rp 1.499.000',
    hosting: '99rb',
    headline: 'Untuk bisnis yang sudah rutin jualan online',
    highlight: 'Semua fitur Basic + operasional lebih lengkap',
    features: [
      'Semua yang ada di paket Basic',
      'Laporan cashflow bulanan yang lebih detail',
      'Riwayat transaksi dengan pencarian & filter',
      'Manajemen stok produk dasar (stok masuk, stok keluar, stok menipis)',
      'Form order/kontak yang terhubung ke WhatsApp bisnis',
    ],
    // Violet header
    headerBg: 'bg-violet-600 dark:bg-violet-700',
    headerAccent: 'from-violet-500 to-purple-700 dark:from-violet-600 dark:to-purple-800',
    checkColor: 'text-violet-500',
    checkBg: 'bg-violet-500/10 dark:bg-violet-500/15',
    borderColor: 'border-violet-200 dark:border-violet-900',
    button: 'Pilih Paket Pro',
    btnClass: 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/25',
    featured: false,
  },
  {
    name: 'Platinum',
    tier: '03',
    icon: Crown,
    setupOldPrice: 'Rp 2.500.000',
    setupNewPrice: 'Rp 1.999.000',
    hosting: '149rb',
    headline: 'Untuk bisnis yang ingin sistem operasional lebih matang',
    highlight: 'Semua fitur Pro + automasi dan kontrol lebih kuat',
    features: [
      'Semua yang ada di paket Pro',
      'Laporan performa bisnis mingguan otomatis',
      'Pelacakan pelanggan & riwayat order berulang',
      'Pencatatan hutang/piutang dan status pembayaran',
      'Prioritas support dan pendampingan pengembangan fitur',
    ],
    // Amber/Gold header
    headerBg: 'bg-amber-500 dark:bg-amber-600',
    headerAccent: 'from-amber-400 to-orange-600 dark:from-amber-500 dark:to-orange-700',
    checkColor: 'text-amber-500',
    checkBg: 'bg-amber-500/10 dark:bg-amber-500/15',
    borderColor: 'border-amber-200 dark:border-amber-900',
    button: 'Ambil Paket Platinum',
    btnClass: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30',
    featured: true,
  },
] as const;

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
            <h1 className="mb-6 text-4xl font-black tracking-tight text-[var(--app-text)] md:text-6xl">
              Pilih Paket Sesuai <span className="text-gradient">Kebutuhan Bisnis</span> Anda
            </h1>
            <p className="mt-4 text-lg font-bold leading-relaxed text-[var(--app-muted)]">
              Fokus kami sederhana: mempermudah dan mempercepat kegiatan bisnis harian Anda.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:items-start">
            {packages.map((pkg, idx) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.5, ease: 'easeOut' }}
                  className={`relative flex flex-col overflow-hidden rounded-[2.5rem] border bg-[var(--app-surface)] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    pkg.featured
                      ? `${pkg.borderColor} shadow-2xl scale-[1.04] z-10`
                      : `${pkg.borderColor} shadow-md`
                  }`}
                >
                  {/* Colored Header Block */}
                  <div className={`relative bg-gradient-to-br p-8 pb-10 ${pkg.headerAccent}`}>
                    {/* Decorative circle */}
                    <div className="absolute right-0 top-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-white/10" />
                    <div className="absolute right-8 bottom-0 h-20 w-20 translate-y-8 rounded-full bg-white/[0.07]" />

                    {pkg.featured && (
                      <div className="mb-4 flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                        <span>⭐</span> Best Value
                      </div>
                    )}

                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Paket</p>
                        <h2 className="mt-1 text-3xl font-black tracking-tight text-white">{pkg.name}</h2>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                        <Icon size={22} />
                      </div>
                    </div>

                    <div className="relative z-10 mt-6 flex items-end gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Setup</p>
                        <p className="text-2xl font-black text-white">{pkg.setupNewPrice}</p>
                        <p className="text-xs font-bold text-white/50 line-through">{pkg.setupOldPrice}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-4xl font-black leading-none text-white">{pkg.hosting}</p>
                        <p className="text-xs font-bold text-white/60">/bulan</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-8">
                    <div className="mb-6">
                      <h3 className="mb-2 text-base font-black leading-snug text-[var(--app-text)]">{pkg.headline}</h3>
                      <p className={`text-xs font-bold ${pkg.checkColor} leading-relaxed`}>{pkg.highlight}</p>
                    </div>

                    <ul className="mb-8 flex-1 space-y-4">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-[var(--app-muted)]">
                          <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${pkg.checkBg}`}>
                            <Check size={11} className={pkg.checkColor} strokeWidth={3} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black transition-all active:scale-95 ${pkg.btnClass}`}
                    >
                      <Sparkles size={16} /> {pkg.button}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative mt-20 overflow-hidden rounded-[3rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-8 text-center md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-primary/5 blur-3xl" />
            <h2 className="mb-4 text-3xl font-black text-[var(--app-text)]">Butuh Solusi Kustom?</h2>
            <p className="mx-auto mb-8 max-w-2xl font-bold text-[var(--app-muted)]">
              Jika bisnis Anda membutuhkan fitur khusus yang tidak ada di paket atas, tim lab kami siap membangun sistem yang sesuai dengan spesifikasi Anda.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex">Konsultasi Gratis Sekarang</Link>
          </div>
        </div>
      </section>
    </div>
  );
}


