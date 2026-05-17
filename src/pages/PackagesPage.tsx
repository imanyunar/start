import { motion } from 'framer-motion';
import { Check, Crown, Rocket, Sparkles, Tag, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'Basic',
    icon: Rocket,
    setupOldPrice: 1500000,
    setupNewPrice: 999000,
    hostingPrice: 79000,
    headline: 'Start Digital',
    highlight: 'Company Profile + Cashflow Dashboard',
    features: [
      'Company profile website',
      'Custom Domain',
      'Simple cashflow dashboard',
      'Income & expense tracking',
      'Transaction history',
      'Daily revenue summary',
      'Payment receipt upload',
      '1 admin account',
      'Maintenance & hosting',
      'Basic support',
    ],
    headerGradient: 'from-[#1D6FE8] via-[#0EA5E9] to-[#38BDF8]',
    glowColor: 'shadow-blue-500/30',
    checkColor: 'text-sky-500',
    checkBg: 'bg-sky-500/10 dark:bg-sky-400/20',
    cardBorder: 'border-sky-200/80 dark:border-sky-800/60',
    button: 'Mulai Paket Basic',
    btnClass: 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg shadow-sky-500/30',
    featured: false,
  },
  {
    name: 'Pro',
    icon: Zap,
    setupOldPrice: 2500000,
    setupNewPrice: 1499000,
    hostingPrice: 139000,
    headline: 'Best Value 🔥',
    highlight: 'Basic + Complete Operations & Supply Chain',
    features: [
      'All Basic features',
      'Premium Domain',
      'Inventory & Supply Chain Management',
      'Low stock notifications',
      'Customer database',
      'Customer purchase history',
      'PDF & Excel Export',
      'Automated best sellers tracking',
      'Monthly sales reports',
      'Transaction & stock reminders',
      'Filter & search transactions',
      '3 user/admin accounts',
      'Advanced dashboard',
      'Priority support',
    ],
    headerGradient: 'from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]',
    glowColor: 'shadow-violet-500/30',
    checkColor: 'text-violet-400',
    checkBg: 'bg-violet-500/10 dark:bg-violet-400/20',
    cardBorder: 'border-violet-200/80 dark:border-violet-800/60',
    button: 'Pilih Paket Pro',
    btnClass: 'bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white shadow-lg shadow-violet-500/30',
    featured: true,
  },
  {
    name: 'Platinum',
    icon: Crown,
    setupOldPrice: 3500000,
    setupNewPrice: 1999999,
    hostingPrice: 189000,
    headline: 'Business Insight',
    highlight: 'Pro + Analytics & Ecosystem Integrations',
    features: [
      'All Pro features',
      'Debt & receivables tracking',
      'Payment due reminders',
      'Business performance analytics',
      'Expense analysis',
      'Peak hours analysis',
      'Loyal customer tracking',
      'Unlimited user accounts',
      'Premium business insight dashboard',
      'Payment gateway integrations',
      'Marketplace integrations',
      'Logistics & shipping integrations',
      'Priority maintenance',
      'Light feature customization requests',
      'System development consultation',
    ],
    headerGradient: 'from-[#B45309] via-[#D97706] to-[#FBBF24]',
    glowColor: 'shadow-amber-500/30',
    checkColor: 'text-amber-400',
    checkBg: 'bg-amber-500/10 dark:bg-amber-400/20',
    cardBorder: 'border-amber-300/80 dark:border-amber-700/60',
    button: 'Ambil Paket Platinum',
    btnClass: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30',
    featured: false,
  },
] as const;

const formatRp = (n: number) =>
  'Rp ' + n.toLocaleString('id-ID');

const discountPct = (old: number, now: number) =>
  Math.round(((old - now) / old) * 100);

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 transition-colors duration-300">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-light mx-auto mb-4 w-fit"
            >
              Service Packages
            </motion.div>
            <h1 className="mb-5 text-4xl font-black tracking-tight text-[var(--app-text)] md:text-6xl">
              Choose a Package For Your{' '}
              <span className="text-gradient">Business Needs</span>
            </h1>
            <p className="text-lg font-bold leading-relaxed text-[var(--app-muted)]">
              Our focus is simple: making your daily business operations and supply chain management easier and faster.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:items-start">
            {packages.map((pkg, idx) => {
              const Icon = pkg.icon;
              const pct = discountPct(pkg.setupOldPrice, pkg.setupNewPrice);

              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
                  className={`relative flex flex-col overflow-hidden rounded-[2rem] border bg-[var(--app-surface)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:${pkg.glowColor} ${pkg.cardBorder} ${
                    pkg.featured
                      ? `shadow-2xl ${pkg.glowColor} md:scale-[1.04] md:z-10`
                      : 'shadow-md'
                  }`}
                >
                  {/* ── Vivid coloured header ── */}
                  <div className={`relative overflow-hidden bg-gradient-to-br p-7 pb-14 ${pkg.headerGradient}`}>
                    {/* decorative circles */}
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
                    <div className="absolute right-10 -bottom-8 h-20 w-20 rounded-full bg-black/10" />

                    {pkg.featured && (
                      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-sm">
                        ⭐ Best Value
                      </div>
                    )}

                    <div className="relative z-10 flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Package</p>
                        <h2 className="mt-0.5 text-3xl font-black tracking-tight text-white">{pkg.name}</h2>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/25 text-white shadow-inner">
                        <Icon size={22} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="relative z-10 mt-5">
                      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                        Setup Fee
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-3xl font-black text-white">{formatRp(pkg.setupNewPrice)}</p>
                        <span className="text-sm font-bold text-white/70 line-through">
                          {formatRp(pkg.setupOldPrice)}
                        </span>
                      </div>
                      <div className="mt-5 flex flex-col gap-1.5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-black leading-none text-white">
                            {formatRp(pkg.hostingPrice).replace('Rp ', '')}
                          </span>
                          <span className="text-sm font-bold text-white/70">/bln</span>
                        </div>
                        <p className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-white">
                          <span className="rounded bg-white px-1.5 py-0.5 text-[9px] text-blue-600">FREE</span>
                          First Month FREE
                        </p>
                      </div>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/50">
                        Maintenance & Hosting Fee
                      </p>
                    </div>
                  </div>

                  {/* ── Discount badge strip ── floats over the seam */}
                  <div className="relative -mt-6 flex flex-wrap items-center gap-2 px-6">
                    {/* Red DISKON pill */}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3.5 py-2 text-xs font-black text-white shadow-xl shadow-rose-500/40">
                      <Tag size={12} strokeWidth={3} />
                      {pct}% OFF
                    </span>
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-1 flex-col p-7 pt-5">
                    <div className="mb-5 border-b border-[var(--app-border)] pb-4">
                      <h3 className="text-base font-black leading-snug text-[var(--app-text)]">
                        {pkg.headline}
                      </h3>
                      <p className={`mt-1 text-xs font-bold ${pkg.checkColor}`}>{pkg.highlight}</p>
                    </div>

                    <ul className="mb-7 flex-1 space-y-3.5">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-[var(--app-muted)]"
                        >
                          <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${pkg.checkBg}`}>
                            <Check size={11} className={pkg.checkColor} strokeWidth={3} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black transition-all active:scale-95 hover:-translate-y-0.5 ${pkg.btnClass}`}
                    >
                      <Sparkles size={16} /> {pkg.button}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="relative mt-20 overflow-hidden rounded-[3rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-8 text-center md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-primary/5 blur-3xl" />
            <h2 className="mb-4 text-3xl font-black text-[var(--app-text)]">Need a Custom Solution?</h2>
            <p className="mx-auto mb-8 max-w-2xl font-bold text-[var(--app-muted)]">
              If your business requires specific features, advanced supply chain capabilities, or custom integrations, our laboratory team is ready to build a system tailored to your exact specifications.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex">
              Free Consultation Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
