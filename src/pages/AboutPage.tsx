import { motion } from 'framer-motion';
import { Target, Eye, Rocket, Shield } from 'lucide-react';


const AboutPage = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6">Our Narrative</div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-tight">
              Crafting Excellent <br />
              Innovations Through <br />
              <span className="text-gradient">Artificial Intelligence</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              Vermont Automated Digital was born out of a singular obsession: to push the boundaries of what autonomous systems can achieve. We are an early-stage AI laboratory dedicated to building the infrastructure of the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-navy-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group">
              <img 
                src="/about.png" 
                alt="Innovation Laboratory" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brandBlue/10 mix-blend-overlay"></div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-8 tracking-tight">The Founder Mindset</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-brandBlue/10 rounded-xl flex items-center justify-center text-brandBlue">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Ambitious Beginnings</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      We don't build features; we architect ecosystems. Our approach is rooted in first-principles thinking and extreme technological curiosity.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-brandBlue/10 rounded-xl flex items-center justify-center text-brandBlue">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Integrity-First AI</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Ethics isn't an afterthought. We build secure, transparent, and reliable systems that empower rather than exploit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Board Section */}
      {false && (
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6">Leadership</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">Founding Board</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Driven by a shared vision of autonomous excellence, our founding team combines deep technical expertise with strategic innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              { 
                name: "Amanda Nur Azizah", 
                role: "Founder and CEO", 
                image: "/amanda.jpg",
                bio: "Visionary leader driving the strategic expansion of Vermont Automated Digital. Focused on bridging the gap between advanced AI research and enterprise-scale implementation." 
              },
              { 
                name: "Iman Yunar Noviadhi", 
                role: "Founder and CTO", 
                image: "/iman.jpg",
                bio: "Architect of the Vermont Neural Logic Core. Dedicated to engineering autonomous systems that redefine digital efficiency through high-performance cognitive computing." 
              }
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-premium group text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border border-brandBlue/30 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-brandBlue/5 mix-blend-overlay"></div>
                </div>
                <h4 className="text-2xl font-black text-white mb-2 group-hover:text-brandBlue transition-colors">{member.name}</h4>
                <div className="text-brandBlue font-bold text-xs uppercase tracking-[0.2em] mb-6">{member.role}</div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Vision & Mission */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="card-premium">
            <div className="p-3 bg-brandBlue/10 rounded-lg text-brandBlue w-fit mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To democratize advanced automation through accessible, high-performance AI infrastructure that allows businesses to focus on creative innovation while we handle the complexity of operations.
            </p>
          </div>
          <div className="card-premium border-brandBlue/20">
            <div className="p-3 bg-brandBlue/10 rounded-lg text-brandBlue w-fit mb-6">
              <Eye size={24} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              A future where digital systems are not just tools, but intelligent partners in human progress—autonomous, adaptive, and invisible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
