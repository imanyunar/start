import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-[var(--app-bg)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 max-w-4xl z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[var(--app-text)]">
            {t('hero.title')} <br />
            <span className="opacity-60">{t('hero.subtitle')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--app-muted)] font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="btn-primary">
              {t('hero.cta_primary')}
            </Link>
            <Link to="/services" className="btn-secondary group">
              {t('hero.cta_secondary')}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-16 w-full max-w-6xl px-6 mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/assets/hero-home-real.jpg" 
              alt="Business team reviewing analytics dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Feature Section (Cards) */}
      <section className="py-32 bg-[var(--app-surface)]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-premium flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('home_simple.p1')}</h3>
                <p className="text-[var(--app-muted)] text-lg">{t('home_simple.f1_desc')}</p>
              </div>
              <Link to="/services" className="mt-12 text-blue-primary font-semibold flex items-center gap-2 hover:underline">
                {t('home_simple.f1_link')} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="card-premium flex flex-col justify-between bg-[var(--app-bg)]">
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('home_simple.p2')}</h3>
                <p className="text-[var(--app-muted)] text-lg">{t('home_simple.f2_desc')}</p>
              </div>
              <Link to="/contact" className="mt-12 text-blue-primary font-semibold flex items-center gap-2 hover:underline">
                {t('home_simple.f2_link')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">{t('cta.title')}</h2>
          <Link to="/contact" className="btn-primary mx-auto w-fit px-12 py-4 text-lg">
            {t('cta.btn_secondary')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
