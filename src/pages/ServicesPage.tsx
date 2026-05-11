import { motion } from 'framer-motion';
import { Bot, ChartBar, Lock, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    { icon: <Workflow size={20} />, title: t('services.s1_title'), desc: t('services.s1_desc') },
    { icon: <Bot size={20} />, title: t('services.s4_title'), desc: t('services.s4_desc') },
    { icon: <Lock size={20} />, title: t('services.s3_title'), desc: t('services.s3_desc') },
    { icon: <ChartBar size={20} />, title: t('services.s2_title'), desc: t('services.s2_desc') },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="badge-light mb-5 w-fit">{t('services.badge')}</div>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-[var(--app-text)] md:text-5xl">
              {t('services.title')} <span className="text-gradient">{t('services.subtitle')}</span>
            </h1>
            <p className="text-base font-bold leading-relaxed text-[var(--app-muted)] md:text-lg">{t('services.description')}</p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                <div className="mb-3 w-fit rounded-xl bg-blue-light p-2 text-blue-primary">{service.icon}</div>
                <h3 className="mb-2 text-lg font-black text-[var(--app-text)]">{service.title}</h3>
                <p className="text-sm font-bold leading-relaxed text-[var(--app-muted)]">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.5rem] bg-blue-primary p-8 text-center text-white">
            <h2 className="mb-3 text-2xl font-black">{t('services.footer_title')}</h2>
            <p className="mx-auto mb-6 max-w-2xl text-sm font-bold opacity-90">{t('services.footer_desc')}</p>
            <Link to="/contact" className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-black text-blue-primary">
              {t('services.footer_button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
