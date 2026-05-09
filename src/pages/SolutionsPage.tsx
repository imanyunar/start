import { motion } from 'framer-motion';
import { Network, BrainCircuit, LineChart, ShieldCheck, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SolutionsPage = () => {
  const { t } = useTranslation();

  const solutions = [
    { 
      title: t('solutions.list.s1_title'), 
      description: t('solutions.list.s1_desc')
    },
    { 
      title: t('solutions.list.s2_title'), 
      description: t('solutions.list.s2_desc')
    },
    { 
      title: t('solutions.list.s3_title'), 
      description: t('solutions.list.s3_desc')
    },
    { 
      title: t('solutions.list.s4_title'), 
      description: t('solutions.list.s4_desc')
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-[var(--app-bg)] relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-primary/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="badge-light mb-6 w-fit">{t('solutions.badge')}</div>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--app-text)] mb-8 tracking-tighter max-w-4xl leading-tight">
              {t('solutions.title')} <br />
              <span className="text-gradient">{t('solutions.subtitle')}</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            <div className="card-premium flex flex-col justify-center hover:border-blue-primary/20">
              <div className="p-3 bg-blue-light rounded-xl text-blue-primary w-fit mb-8">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl font-black text-[var(--app-text)] mb-6">{t('solutions.core_title')}</h2>
              <p className="text-[var(--app-muted)] font-bold text-lg leading-relaxed mb-8">
                {t('solutions.core_desc')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl">
                  <div className="text-blue-primary font-black text-xl mb-1">98%</div>
                  <div className="text-[10px] font-black text-[var(--app-muted)] uppercase tracking-widest">{t('solutions.accuracy')}</div>
                </div>
                <div className="p-4 bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl">
                  <div className="text-blue-primary font-black text-xl mb-1">0.5ms</div>
                  <div className="text-[10px] font-black text-[var(--app-muted)] uppercase tracking-widest">{t('solutions.response')}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {solutions.map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[var(--app-surface)] border border-[var(--app-border)] p-6 md:p-8 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-blue-primary/30 transition-all shadow-sm hover:shadow-md"
                >
                  <div>
                    <h3 className="text-sm md:text-base font-black text-[var(--app-text)] mb-1 uppercase tracking-widest group-hover:text-blue-primary transition-colors">{s.title}</h3>
                    <p className="text-xs text-[var(--app-muted)] font-bold leading-tight">{s.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-primary/50 group-hover:text-blue-primary group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Network />, 
                title: t('solutions.extra.e1_title'), 
                desc: t('solutions.extra.e1_desc') 
              },
              { 
                icon: <LineChart />, 
                title: t('solutions.extra.e2_title'), 
                desc: t('solutions.extra.e2_desc') 
              },
              { 
                icon: <ShieldCheck />, 
                title: t('solutions.extra.e3_title'), 
                desc: t('solutions.extra.e3_desc') 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[var(--app-surface)] rounded-3xl border border-[var(--app-border)] hover:border-blue-primary/20 transition-all shadow-sm hover:shadow-lg"
              >
                <div className="text-blue-primary mb-6">{item.icon}</div>
                <h3 className="text-xl font-black text-[var(--app-text)] mb-4">{item.title}</h3>
                <p className="text-[var(--app-muted)] font-bold text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
