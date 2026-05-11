import { motion } from 'framer-motion';
import { CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  const points = [
    { icon: <HeartHandshake size={20} />, title: t('about.philosophy.p1_title'), desc: t('about.philosophy.p1_desc') },
    { icon: <ShieldCheck size={20} />, title: t('about.philosophy.p2_title'), desc: t('about.philosophy.p2_desc') },
    { icon: <CheckCircle2 size={20} />, title: t('about.mission.title'), desc: t('about.mission.desc') },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <div className="badge-light mb-5 w-fit">{t('about.badge')}</div>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-[var(--app-text)] md:text-5xl">
              {t('about.title')} <span className="text-gradient">{t('about.subtitle')}</span>
            </h1>
            <p className="max-w-3xl text-base font-bold leading-relaxed text-[var(--app-muted)] md:text-lg">{t('about.description')}</p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {points.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5">
                <div className="mb-3 w-fit rounded-xl bg-blue-light p-2 text-blue-primary">{item.icon}</div>
                <h3 className="mb-2 text-base font-black text-[var(--app-text)]">{item.title}</h3>
                <p className="text-sm font-bold leading-relaxed text-[var(--app-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
            <h2 className="mb-2 text-xl font-black text-[var(--app-text)]">{t('about.vision.title')}</h2>
            <p className="text-sm font-bold leading-relaxed text-[var(--app-muted)]">{t('about.vision.desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
