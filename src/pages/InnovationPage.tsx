import { motion } from 'framer-motion';
import { Rocket, Globe } from 'lucide-react';

const roadmap = [
  {
    phase: "Phase 01",
    title: "Autonomous Orchestration",
    date: "Q3 2026",
    desc: "Deployment of self-optimizing business agents capable of managing cross-platform logic without human intervention.",
    status: "Active"
  },
  {
    phase: "Phase 02",
    title: "Neural Mesh Infrastructure",
    date: "Q1 2027",
    desc: "Global distribution of low-latency neural processing nodes for real-time edge intelligence.",
    status: "Pending"
  },
  {
    phase: "Phase 03",
    title: "Quantum Cognitive Systems",
    date: "Q4 2027",
    desc: "Integration of quantum-ready encryption and large-scale cognitive modeling for enterprise strategy.",
    status: "Vision"
  }
];

const InnovationPage = () => {
  return (
    <div className="pt-24 min-h-screen pb-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-32"
          >
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6">The Horizon</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter px-4">
              Vision & <span className="text-gradient pb-2">Innovation</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We are not just following the roadmap of AI; we are drawing it. Explore our trajectory toward absolute digital autonomy.
            </p>
          </motion.div>

          {/* Timeline Section */}
          <div className="relative">
            {/* Vertical Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-20 md:space-y-32">
              {roadmap.map((item, i) => (
                <div key={i} className="relative">
                  {/* Timeline Dot (Desktop) */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-brandBlue rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)] z-10 hidden md:block"></div>
                  
                  <div className={`flex flex-col md:flex-row items-center justify-between ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content Card */}
                    <motion.div 
                      initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full md:w-[45%] z-20"
                    >
                      <div className="card-premium border-white/5 hover:border-brandBlue/30">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-brandBlue font-black text-[10px] uppercase tracking-[0.2em]">{item.phase}</span>
                          <span className="text-gray-500 text-[10px] font-bold">{item.date}</span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">{item.desc}</p>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest w-fit border ${
                          item.status === 'Active' ? 'bg-green-500/5 text-green-500 border-green-500/20' : 
                          item.status === 'Pending' ? 'bg-yellow-500/5 text-yellow-500 border-yellow-500/20' : 
                          'bg-gray-500/5 text-gray-500 border-gray-500/20'
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
      <section className="section-padding px-4 bg-navy-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 glass rounded-3xl border-brandBlue/10">
            <Rocket className="text-brandBlue mb-6" size={32} />
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Scalable Automation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our systems are built to grow with your ambition. From simple task handling to complex neural orchestration, Vermont scales vertically and horizontally.
            </p>
          </div>
          <div className="p-10 glass rounded-3xl border-brandBlue/10">
            <Globe className="text-brandBlue mb-6" size={32} />
            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Intelligence Without Borders</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are building a borderless digital workforce. Our AI nodes operate across jurisdictions, ensuring compliance and performance globally.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnovationPage;
