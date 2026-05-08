import { motion } from 'framer-motion';
import { Network, BrainCircuit, LineChart, ShieldCheck, ChevronRight } from 'lucide-react';

const solutions = [
  { 
    title: 'Autonomous Ecosystems', 
    description: 'Self-governing digital environments that adapt to market dynamics.' 
  },
  { 
    title: 'Neural Network Architectures', 
    description: 'Custom-built cognitive systems for high-stakes decision making.' 
  },
  { 
    title: 'Predictive Resource Scaling', 
    description: 'Anticipate infrastructure needs before they impact performance.' 
  },
  { 
    title: 'Distributed Core Intelligence', 
    description: 'Synchronized AI agents operating across global jurisdictions.' 
  },
];

const SolutionsPage = () => {
  return (
    <div className="pt-24 min-h-screen relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brandBlue/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6">Autonomous Ecosystem</div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter max-w-4xl leading-tight">
              AI Solutions for the <br />
              <span className="text-gradient">Exponential Era</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
            <div className="card-premium flex flex-col justify-center border-brandBlue/20">
              <div className="p-3 bg-brandBlue/10 rounded-lg text-brandBlue w-fit mb-8">
                <BrainCircuit size={32} />
              </div>
              <h2 className="text-3xl font-black text-white mb-6">Neural Logic Core</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Our proprietary neural architecture enables real-time decision making across distributed networks. It's not just automation; it's digital cognition.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 glass rounded-xl">
                  <div className="text-brandBlue font-black text-xl mb-1">98%</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Accuracy</div>
                </div>
                <div className="p-4 glass rounded-xl">
                  <div className="text-brandBlue font-black text-xl mb-1">0.5ms</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Response</div>
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
                  className="bg-navy-900/50 border border-white/5 p-6 md:p-8 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all"
                >
                  <div>
                    <h3 className="text-sm md:text-base font-black text-white mb-1 uppercase tracking-widest group-hover:text-brandBlue transition-colors">{s.title}</h3>
                    <p className="text-xs text-gray-500 font-bold leading-tight">{s.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-brandBlue/50 group-hover:text-brandBlue group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Network />, 
                title: "Distributed Intelligence", 
                desc: "Coordinate thousands of AI agents across your entire digital stack seamlessly." 
              },
              { 
                icon: <LineChart />, 
                title: "Predictive Engines", 
                desc: "Anticipate market shifts and internal bottlenecks before they manifest." 
              },
              { 
                icon: <ShieldCheck />, 
                title: "Quantum Security", 
                desc: "Protect your data assets with encryption layers designed for the next decade." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-white/5 hover:bg-white/5 transition-all"
              >
                <div className="text-brandBlue mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
