import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Globe, Database, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Background Glows */}
      <div className="glow-blue top-[-10%] left-[-10%] w-[500px] h-[500px]"></div>
      <div className="glow-blue bottom-[20%] right-[-10%] w-[600px] h-[600px] opacity-10"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandBlue/10 border border-brandBlue/20 text-brandBlue text-[10px] font-black uppercase tracking-widest mb-8">
              <Sparkles size={12} />
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] md:leading-[0.9] tracking-tighter">
              {t('hero.title')} <br />
              <span className="text-gradient">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed max-w-lg">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/contact" className="btn-primary group">
                {t('hero.cta_primary')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/solutions" className="px-8 py-3 rounded-xl font-bold text-sm border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                {t('hero.cta_secondary')}
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-10">
              <div>
                <div className="text-2xl font-black text-white mb-1">99.9%</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white mb-1">250ms</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Latency</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white mb-1">10X</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Efficiency</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative perspective-1000 hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brandBlue/10 group">
              <img 
                src="/hero.png" 
                alt="Futuristic Skyscraper" 
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-all duration-1000 scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60"></div>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concept Grid */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Built for the Intelligence Age</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our core infrastructure leverages advanced neural architectures to process complex business workflows in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Cpu />, title: "Autonomous Core", desc: "Self-optimizing AI agents that handle decision-making cycles." },
              { icon: <Database />, title: "Data Intelligence", desc: "Predictive analytics engine that transforms raw noise into signal." },
              { icon: <Globe />, title: "Global Mesh", desc: "Distributed infrastructure ensuring ultra-low latency worldwide." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="card-premium group"
              >
                <div className="p-4 bg-brandBlue/10 rounded-2xl text-brandBlue w-fit mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-navy-900/30 overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-8 tracking-tighter leading-tight">
                Control the <br />Future of Work
              </h2>
              <ul className="space-y-6">
                {[
                  "Real-time resource allocation monitoring",
                  "Automated workflow synchronization",
                  "Predictive bottleneck detection",
                  "Secure enterprise-grade encryption"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-300 font-medium">
                    <div className="w-5 h-5 rounded-full bg-brandBlue/20 flex items-center justify-center text-brandBlue">
                      <Sparkles size={12} />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="glass-dark rounded-2xl border border-white/10 p-4 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <div className="ml-4 px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-gray-400">VERMONT OS v2.0</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 bg-white/5 rounded-xl animate-pulse"></div>
                  <div className="h-40 bg-brandBlue/10 rounded-xl border border-brandBlue/20"></div>
                  <div className="h-32 col-span-2 bg-white/5 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
