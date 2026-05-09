import { motion } from 'framer-motion';
import { Target, Eye, Rocket, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 min-h-screen bg-[var(--app-bg)]">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="badge-light mb-6 w-fit">{t('about.badge')}</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--app-text)] mb-10 tracking-tighter leading-tight">
              {t('about.title')} <br />
              <span className="text-gradient">{t('about.subtitle')}</span>
            </h1>
            <p className="text-[var(--app-muted)] font-bold text-lg leading-relaxed mb-12">
              {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-[var(--app-surface)] border-y border-[var(--app-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-[var(--app-border)] group">
              <img 
                src="/about.png" 
                alt="Innovation Laboratory" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-primary/10 mix-blend-overlay"></div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[var(--app-text)] mb-8 tracking-tight">{t('about.philosophy.title')}</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-light rounded-xl flex items-center justify-center text-blue-primary">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <h4 className="text-[var(--app-text)] font-black mb-2">{t('about.philosophy.p1_title')}</h4>
                    <p className="text-[var(--app-muted)] font-bold text-sm leading-relaxed">
                      {t('about.philosophy.p1_desc')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-light rounded-xl flex items-center justify-center text-blue-primary">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="text-[var(--app-text)] font-black mb-2">{t('about.philosophy.p2_title')}</h4>
                    <p className="text-[var(--app-muted)] font-bold text-sm leading-relaxed">
                      {t('about.philosophy.p2_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card-premium">
            <div className="p-3 bg-blue-light rounded-xl text-blue-primary w-fit mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-black text-[var(--app-text)] mb-4">{t('about.mission.title')}</h3>
            <p className="text-[var(--app-muted)] font-bold leading-relaxed">
              {t('about.mission.desc')}
            </p>
          </div>
          <div className="card-premium hover:border-blue-primary/20">
            <div className="p-3 bg-blue-light rounded-xl text-blue-primary w-fit mb-6">
              <Eye size={24} />
            </div>
            <h3 className="text-2xl font-black text-[var(--app-text)] mb-4">{t('about.vision.title')}</h3>
            <p className="text-[var(--app-muted)] font-bold leading-relaxed">
              {t('about.vision.desc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
