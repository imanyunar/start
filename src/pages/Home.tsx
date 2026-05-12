import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-app-bg">
      <div className="absolute top-[-10%] right-[-10%] h-[360px] w-[360px] rounded-full bg-blue-primary/8 blur-[100px] pointer-events-none" />

      <section className="relative flex min-h-[88vh] items-center pt-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="badge-light mb-6 w-fit flex items-center gap-2">
              <Sparkles size={12} />
              {t('hero.badge')}
            </div>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-app-text md:text-6xl">
              {t('hero.title')} <span className="text-gradient">{t('hero.subtitle')}</span>
            </h1>
            <p className="mb-8 max-w-xl text-base font-bold leading-relaxed text-app-muted md:text-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary group">
                {t('hero.cta_primary')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/services" className="btn-secondary">
                {t('hero.cta_secondary')}
              </Link>
            </div>

            <div className="mt-10 space-y-3">
              {[t('home_simple.p1'), t('home_simple.p2'), t('home_simple.p3')].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-bold text-app-muted">
                  <CheckCircle2 size={18} className="mt-0.5 text-blue-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border-8 border-[var(--app-surface)] bg-[var(--app-surface)] shadow-2xl shadow-blue-primary/10">
              <img src="/hero.png" alt="Dashboard Sistem Kasir Vermont untuk UMKM Indonesia" className="aspect-[4/5] w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-blue-primary px-6 py-10 text-center text-white md:px-12 md:py-16">
            <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">{t('cta.title')}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-sm font-bold opacity-90 md:text-base">{t('cta.desc')}</p>
            <Link to="/contact" className="inline-flex rounded-2xl bg-white px-8 py-4 text-sm font-black text-blue-primary hover:scale-[1.02] transition-transform">
              {t('cta.btn_secondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
