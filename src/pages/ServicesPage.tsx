import { motion } from 'framer-motion';
import { Cpu, Cloud, Shield, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6">{t('services.badge')}</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-tight">
              {t('services.title')} <br />
              <span className="text-gradient">{t('services.subtitle')}</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
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
                <div className="p-4 bg-brandBlue/10 rounded-2xl text-brandBlue w-fit mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{service.desc}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-brandBlue font-bold text-sm group/btn">
                  {t('services.cta')}
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding px-4">
        <div className="max-w-5xl mx-auto glass-dark rounded-[2.5rem] p-12 md:p-20 text-center border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandBlue/10 blur-[100px] rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">{t('services.footer_title')}</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            {t('services.footer_desc')}
          </p>
          <Link to="/contact" className="btn-primary mx-auto">
            {t('services.footer_button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
