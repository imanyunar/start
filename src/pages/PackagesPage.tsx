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
    accent: 'from-slate-100 to-blue-50',
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
    accent: 'from-blue-100 to-indigo-50',
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
    accent: 'from-amber-100 to-orange-50',
    button: 'Ambil Paket Platinum',
    featured: true,
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="badge-light mx-auto mb-4 w-fit">Paket Layanan</div>
            <h1 className="text-4xl font-black tracking-tight text-[var(--app-text)] md:text-5xl">
              Pilih Paket Sesuai Kebutuhan Bisnis Anda
            </h1>
            <p className="mt-4 text-base font-bold leading-relaxed text-[var(--app-muted)]">
              Fokus kami sederhana: mempermudah dan mempercepat kegiatan bisnis harian Anda.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-3xl border p-6 shadow-sm ${
                  pkg.featured
                    ? 'border-blue-primary bg-[var(--app-surface)] shadow-lg shadow-blue-primary/10'
                    : 'border-[var(--app-border)] bg-[var(--app-surface)]'
                }`}
              >
                <div className={`mb-5 rounded-2xl bg-gradient-to-br p-4 ${pkg.accent}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black tracking-wider text-[var(--app-text)]">{pkg.name}</p>
                    {pkg.featured && (
                      <span className="rounded-full bg-blue-primary px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                        Rekomendasi
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-bold text-[var(--app-muted)]">Biaya setup</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-black text-[var(--app-muted)] line-through">{pkg.setupOldPrice}</span>
                      <span className="text-2xl font-black text-[var(--app-text)]">{pkg.setupNewPrice}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-black text-[var(--app-text)]">{pkg.hosting}</p>
                    <p className="mt-1 text-xs font-bold text-[var(--app-muted)]">Biaya hosting</p>
                  </div>
                </div>

                <h3 className="text-lg font-black text-[var(--app-text)]">{pkg.headline}</h3>
                <p className="mt-2 text-sm font-bold text-blue-primary">{pkg.highlight}</p>

                <ul className="mt-5 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm font-bold text-[var(--app-muted)]">
                      <Check size={16} className="mt-0.5 text-blue-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black transition ${
                    pkg.featured
                      ? 'bg-blue-primary text-white hover:bg-blue-dark'
                      : 'bg-[var(--app-bg)] text-[var(--app-text)] hover:bg-blue-light hover:text-blue-primary'
                  }`}
                >
                  <Sparkles size={14} /> {pkg.button}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
