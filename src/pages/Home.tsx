import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Globe, Database, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-app-bg">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-primary/3 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="badge-light mb-8 w-fit flex items-center gap-2">
              <Sparkles size={12} />
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-app-text mb-8 leading-[1.1] md:leading-[1.0] tracking-tighter">
              {t('hero.title')} <br />
              <span className="text-gradient">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-app-muted text-lg md:text-xl mb-10 leading-relaxed max-w-lg font-bold">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/smartflow" className="btn-primary group">
                {t('hero.cta_primary')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/solutions" className="btn-secondary">
                {t('hero.cta_secondary')}
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-app-border pt-10">
              <div>
                <div className="text-2xl font-black text-app-text mb-1">99.9%</div>
                <div className="text-[10px] font-black text-app-muted uppercase tracking-widest">{t('stats.uptime')}</div>
              </div>
              <div>
                <div className="text-2xl font-black text-app-text mb-1">250ms</div>
                <div className="text-[10px] font-black text-app-muted uppercase tracking-widest">{t('stats.latency')}</div>
              </div>
              <div>
                <div className="text-2xl font-black text-app-text mb-1">10X</div>
                <div className="text-[10px] font-black text-app-muted uppercase tracking-widest">{t('stats.efficiency')}</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden border-[12px] border-[var(--app-surface)] shadow-2xl shadow-blue-primary/10 group bg-[var(--app-surface)]">
              <img 
                src="/hero.png" 
                alt="Futuristic Tech" 
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-primary/10 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 left-4 right-4 md:right-auto md:-left-12 p-4 md:p-6 bg-[var(--app-surface)] rounded-3xl shadow-2xl border border-[var(--app-border)] flex items-center justify-center md:justify-start gap-4"
            >
              <div className="p-3 bg-blue-light rounded-2xl text-blue-primary">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-app-muted uppercase tracking-widest">{t('hero.floating_status')}</p>
                <p className="text-sm font-black text-app-text">{t('hero.floating_desc')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Concept Grid */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-app-text mb-6 tracking-tighter">{t('features.section_title')}</h2>
            <p className="text-app-muted max-w-2xl mx-auto text-lg font-bold">
              {t('features.section_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Cpu />, title: t('features.f1_title'), desc: t('features.f1_desc'), color: 'blue' },
              { icon: <Database />, title: t('features.f2_title'), desc: t('features.f2_desc'), color: 'emerald' },
              { icon: <Globe />, title: t('features.f3_title'), desc: t('features.f3_desc'), color: 'amber' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="card-premium group"
              >
                <div className="p-4 bg-app-bg rounded-2xl text-blue-primary w-fit mb-8 group-hover:bg-blue-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-app-text mb-4 tracking-tight">{item.title}</h3>
                <p className="text-app-muted text-base leading-relaxed font-bold">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2rem] md:rounded-[3rem] bg-blue-primary p-8 md:p-24 overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
             
             <div className="relative text-center max-w-3xl mx-auto">
               <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                 {t('cta.title')}
               </h2>
               <p className="text-blue-50 text-lg md:text-xl mb-12 font-bold opacity-80">
                 {t('cta.desc')}
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <Link to="/smartflow" className="px-10 py-5 bg-white text-blue-primary rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl">
                   {t('cta.btn_primary')}
                 </Link>
                 <Link to="/contact" className="px-10 py-5 bg-blue-dark text-white rounded-2xl font-black text-lg hover:bg-blue-900 transition-all">
                   {t('cta.btn_secondary')}
                 </Link>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
