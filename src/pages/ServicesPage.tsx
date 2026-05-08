import { motion } from 'framer-motion';
import { Cpu, Globe, BarChart3, Code2, Workflow, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "AI Automation",
    desc: "Autonomous agents that orchestrate complex business logic with zero human intervention.",
    icon: <Cpu size={24} />,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Business Intelligence",
    desc: "Deep neural analytics that uncover hidden patterns and predictive growth vectors.",
    icon: <BarChart3 size={24} />,
    color: "from-purple-500/20 to-blue-500/20"
  },
  {
    title: "Digital Transformation",
    desc: "Legacy system modernization through intelligent cloud-native architectures.",
    icon: <Globe size={24} />,
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    title: "Custom AI Systems",
    desc: "Bespoke LLM fine-tuning and specialized neural networks for unique operational needs.",
    icon: <Code2 size={24} />,
    color: "from-blue-600/20 to-indigo-600/20"
  },
  {
    title: "Workflow Automation",
    desc: "End-to-end synchronization of distributed digital assets and process chains.",
    icon: <Workflow size={24} />,
    color: "from-indigo-500/20 to-purple-500/20"
  }
];

const ServicesPage = () => {
  return (
    <div className="pt-24 min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6">Capabilities</div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Advanced Digital <br />
              <span className="text-gradient">Infrastructure</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We provide the building blocks for the next generation of intelligent enterprises. Scalable, autonomous, and future-ready.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500`}></div>
                <div className="card-premium h-full relative z-10 flex flex-col">
                  <div className="p-4 bg-white/5 rounded-2xl text-brandBlue w-fit mb-8 group-hover:scale-110 transition-all duration-500 border border-white/5">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-grow">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-2 text-brandBlue text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Explore Tech <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech CTA */}
      <section className="section-padding px-4">
        <div className="max-w-5xl mx-auto glass-dark rounded-[2.5rem] p-12 md:p-20 text-center border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandBlue/10 blur-[100px] rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to Automate?</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            Join the elite circle of businesses leveraging autonomous intelligence to dominate their markets.
          </p>
          <button className="btn-primary mx-auto">
            Start Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
