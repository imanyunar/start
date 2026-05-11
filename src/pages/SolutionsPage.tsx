import { motion } from 'framer-motion';
import { CircleCheckBig } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SolutionsPage = () => {
  const { t } = useTranslation();

  const items = [
    { title: t('solutions.list.s1_title'), desc: t('solutions.list.s1_desc') },
    { title: t('solutions.list.s2_title'), desc: t('solutions.list.s2_desc') },
    { title: t('solutions.list.s3_title'), desc: t('solutions.list.s3_desc') },
    { title: t('solutions.list.s4_title'), desc: t('solutions.list.s4_desc') },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="badge-light mb-5 w-fit">{t('solutions.badge')}</div>
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-[var(--app-text)] md:text-5xl">
              {t('solutions.title')} <span className="text-gradient">{t('solutions.subtitle')}</span>
            </h1>
            <p className="text-base font-bold leading-relaxed text-[var(--app-muted)] md:text-lg">{t('solutions.core_desc')}</p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6">
                <div className="mb-3 w-fit rounded-xl bg-blue-light p-2 text-blue-primary">
                  <CircleCheckBig size={18} />
                </div>
                <h3 className="mb-2 text-lg font-black text-[var(--app-text)]">{item.title}</h3>
                <p className="text-sm font-bold leading-relaxed text-[var(--app-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface)] p-8 text-center">
            <h2 className="mb-3 text-2xl font-black text-[var(--app-text)]">Ingin solusi yang paling pas untuk bisnis Anda?</h2>
            <p className="mx-auto mb-6 max-w-2xl text-sm font-bold text-[var(--app-muted)]">
              Tim kami akan bantu pilihkan solusi paling sederhana dan efektif sesuai kebutuhan harian bisnis Anda.
            </p>
            <Link to="/contact" className="inline-flex rounded-xl bg-blue-primary px-6 py-3 text-sm font-black text-white">
              Hubungi Tim Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
