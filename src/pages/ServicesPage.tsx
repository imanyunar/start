import { motion } from 'framer-motion';
import { Cpu, Cloud, Shield, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicesPage = () => {
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
            <div className="badge-light mb-6 w-fit">{t('services.badge')}</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--app-text)] mb-10 tracking-tighter leading-tight">
              {t('services.title')} <br />
              <span className="text-gradient">{t('services.subtitle')}</span>
            </h1>
            <p className="text-[var(--app-muted)] font-bold text-lg leading-relaxed mb-12">
              {t('services.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <Cpu />, title: t('services.s1_title'), desc: t('services.s1_desc') },
              { icon: <Cloud />, title: t('services.s2_title'), desc: t('services.s2_desc') },
              { icon: <Shield />, title: t('services.s3_title'), desc: t('services.s3_desc') },
              { icon: <BarChart />, title: t('services.s4_title'), desc: t('services.s4_desc') }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium group"
              >
                <div className="p-4 bg-blue-light rounded-2xl text-blue-primary w-fit mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-[var(--app-text)] mb-4 tracking-tight">{service.title}</h3>
                <p className="text-[var(--app-muted)] font-bold leading-relaxed mb-8">{service.desc}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-blue-primary font-bold text-sm group/btn">
                  {t('services.cta')}
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding relative z-10">
        <div className="max-w-5xl mx-auto card-premium rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-3xl md:text-5xl font-black text-[var(--app-text)] mb-8 tracking-tighter">{t('services.footer_title')}</h2>
          <p className="text-[var(--app-muted)] font-bold text-lg mb-12 max-w-xl mx-auto">
            {t('services.footer_desc')}
          </p>
          <Link to="/contact" className="btn-primary mx-auto w-fit">
            {t('services.footer_button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
