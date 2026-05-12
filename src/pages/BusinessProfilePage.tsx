import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Laptop, MessageSquare, Rocket, ShieldCheck, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white">N</div>
            <span className="text-xl font-black tracking-tighter text-white">NEURAL<span className="text-blue-500">BIZ</span></span>
          </div>
          <div className="hidden gap-8 text-sm font-bold md:flex">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-blue-400 transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <Link to="/laboratory" className="rounded-full bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-widest text-white border border-white/10 hover:bg-white/10 transition-all">
            Exit Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
        <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 bg-blue-600/10 blur-[120px] rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400"
        >
          Premium Business Identity
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-4xl text-5xl font-black leading-[1.1] tracking-tight text-white md:text-8xl"
        >
          Elevate Your Brand with <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI-Driven</span> Identity
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 max-w-2xl text-lg font-medium leading-relaxed text-slate-400 md:text-xl"
        >
          We architect digital ecosystems for modern enterprises. From automated workflows to stunning visual profiles, we ensure your business stays ahead of the neural curve.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black text-white shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all">
            Start Your Transformation <ArrowRight size={18} />
          </button>
          <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-black text-white hover:bg-white/10 transition-all">
            View Case Studies
          </button>
        </motion.div>

        {/* Floating Stats */}
        <div className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: 'Active Clients', value: '250+', icon: Users },
            { label: 'Success Rate', value: '99.9%', icon: ShieldCheck },
            { label: 'Neural Load', value: '0.02ms', icon: Rocket },
            { label: 'Global Hubs', value: '12', icon: Globe },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm"
            >
              <stat.icon size={20} className="mb-4 text-blue-500" />
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl">Our Core Capabilities</h2>
            <p className="mx-auto max-w-2xl font-medium text-slate-400">Integrated solutions designed to scale with your business intelligence.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Identity Architecture',
                desc: 'Strategic brand positioning and visual identity systems that resonate with digital-first audiences.',
                icon: Laptop,
                color: 'blue'
              },
              {
                title: 'Neural Automation',
                desc: 'Workflow optimization using proprietary AI models to reduce operational friction by up to 80%.',
                icon: Rocket,
                color: 'cyan'
              },
              {
                title: 'Data Intelligence',
                desc: 'Advanced analytics dashboards that transform raw business noise into actionable growth signals.',
                icon: Star,
                color: 'violet'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-10 hover:border-blue-500/30 transition-all"
              >
                <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500`}>
                  <service.icon size={28} />
                </div>
                <h3 className="mb-4 text-2xl font-black text-white">{service.title}</h3>
                <p className="mb-8 text-sm font-medium leading-relaxed text-slate-400">{service.desc}</p>
                <ul className="space-y-3">
                  {['Scalable Infrastructure', '24/7 Monitoring', 'Security First'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs font-bold text-slate-300">
                      <CheckCircle2 size={14} className="text-blue-500" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-center shadow-2xl shadow-blue-900/40 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
          <div className="relative z-10">
            <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">Ready to Evolve?</h2>
            <p className="mx-auto mb-12 max-w-xl text-lg font-medium text-blue-100">
              Join the elite circle of businesses leveraging neural architecture for global dominance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-blue-700 hover:scale-[1.02] transition-all">
                Initialize Consultation <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="h-6 w-6 rounded bg-slate-700 flex items-center justify-center font-black text-white text-[10px]">N</div>
          <span className="text-sm font-black tracking-tighter text-white">NEURALBIZ</span>
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">© 2026 NeuralBiz Identity. Built with Vermont AI.</p>
      </footer>
    </div>
  );
};

export default BusinessProfilePage;
