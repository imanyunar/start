import { motion } from 'framer-motion';
import { CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import founderPhoto from '../assets/Iman Yunar Noviadhi.jpeg';

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

          <div className="mt-8 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 md:p-8">
            <h2 className="mb-5 text-xl font-black text-[var(--app-text)]">Siapa yang di belakang ini</h2>
            <div className="grid gap-5 md:grid-cols-[180px_1fr] md:items-center">
              <img src={founderPhoto} alt="Founder Iman Yunar Noviadhi" className="h-44 w-44 rounded-2xl object-cover" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-blue-primary">Founder</p>
                <h3 className="mt-1 text-2xl font-black text-[var(--app-text)]">Iman Yunar Noviadhi</h3>
                <p className="mt-2 text-sm font-bold text-[var(--app-muted)]">
                  Informatics Engineering, Universitas Negeri Semarang
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
