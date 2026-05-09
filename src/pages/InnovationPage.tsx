import { motion } from 'framer-motion';
import { Rocket, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const InnovationPage = () => {
  const { t } = useTranslation();

  const roadmap = [
    {
      phase: t('innovation.roadmap.p1_phase'),
      title: t('innovation.roadmap.p1_title'),
      date: "Q3 2026",
      desc: t('innovation.roadmap.p1_desc'),
      status: t('innovation.roadmap.status_active')
    },
    {
      phase: t('innovation.roadmap.p2_phase'),
      title: t('innovation.roadmap.p2_title'),
      date: "Q1 2027",
      desc: t('innovation.roadmap.p2_desc'),
      status: t('innovation.roadmap.status_pending')
    },
    {
      phase: t('innovation.roadmap.p3_phase'),
      title: t('innovation.roadmap.p3_title'),
      date: "Q4 2027",
      desc: t('innovation.roadmap.p3_desc'),
      status: t('innovation.roadmap.status_vision')
    }
  ];

  return (
    <div className="pt-24 min-h-screen pb-20 bg-[var(--app-bg)]">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-32"
          >
            <div className="badge-light mb-6 mx-auto w-fit">{t('innovation.badge')}</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--app-text)] mb-8 tracking-tighter px-4">
              {t('innovation.title')} <span className="text-gradient pb-2">{t('innovation.subtitle')}</span>
            </h1>
            <p className="text-[var(--app-muted)] font-bold text-lg max-w-2xl mx-auto leading-relaxed">
              {t('innovation.description')}
            </p>
          </motion.div>

          {/* Timeline Section */}
          <div className="relative">
            {/* Vertical Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--app-border)] -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-20 md:space-y-32">
              {roadmap.map((item, i) => (
                <div key={i} className="relative">
                  {/* Timeline Dot (Desktop) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-primary rounded-full shadow-[0_0_15px_rgba(29,111,232,0.5)] z-10 hidden md:block"></div>
                  
                  <div className={`flex flex-col md:flex-row items-center justify-between ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content Card */}
                    <motion.div 
                      initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full md:w-[45%] z-20"
                    >
                      <div className="card-premium hover:border-blue-primary/30">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-blue-primary font-black text-[10px] uppercase tracking-[0.2em]">{item.phase}</span>
                          <span className="text-[var(--app-muted)] text-[10px] font-bold">{item.date}</span>
                        </div>
                        <h3 className="text-2xl font-black text-[var(--app-text)] mb-4 tracking-tight">{item.title}</h3>
                        <p className="text-[var(--app-muted)] text-sm font-bold leading-relaxed mb-8">{item.desc}</p>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit border ${
                          i === 0 ? 'bg-green-primary/10 text-green-primary border-green-primary/20' : 
                          i === 1 ? 'bg-amber-primary/10 text-amber-primary border-amber-primary/20' : 
                          'bg-[var(--app-muted)]/10 text-[var(--app-muted)] border-[var(--app-border)]'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    </motion.div>

                    {/* Spacer for Desktop */}
                    <div className="hidden md:block md:w-[45%]"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Cards */}
      <section className="section-padding px-4 bg-[var(--app-surface)] border-t border-[var(--app-border)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-premium hover:border-blue-primary/20">
            <Rocket className="text-blue-primary mb-6" size={32} />
            <h3 className="text-2xl font-black text-[var(--app-text)] mb-4 tracking-tight">{t('innovation.cards.c1_title')}</h3>
            <p className="text-[var(--app-muted)] font-bold text-sm leading-relaxed">
              {t('innovation.cards.c1_desc')}
            </p>
          </div>
          <div className="card-premium hover:border-blue-primary/20">
            <Globe className="text-blue-primary mb-6" size={32} />
            <h3 className="text-2xl font-black text-[var(--app-text)] mb-4 tracking-tight">{t('innovation.cards.c2_title')}</h3>
            <p className="text-[var(--app-muted)] font-bold text-sm leading-relaxed">
              {t('innovation.cards.c2_desc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovationPage;
