import { motion } from 'framer-motion';
import { BrainCircuit, FlaskConical, ArrowRight, Zap, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import businessMockup from '../assets/business_profile_mockup.png';
import smartflowMockup from '../assets/smartflow_mockup.png';

const LabPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 min-h-screen bg-app-bg">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="badge-light mb-6 mx-auto w-fit flex items-center gap-2">
              <FlaskConical size={14} /> {t('nav.laboratory')}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-app-text mb-8 tracking-tighter">
              Vermont <span className="text-gradient">Neural Lab</span>
            </h1>
            <p className="text-app-muted text-lg font-bold max-w-2xl mx-auto leading-relaxed">
              Tempat kami menguji coba teknologi AI masa depan sebelum dirilis ke publik. 
              Jelajahi berbagai prototipe dan sistem otonom kami di sini.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SmartFlow Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card-premium group relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
              
              <div className="relative aspect-video mb-8 overflow-hidden rounded-2xl bg-app-bg border border-app-border group-hover:border-blue-primary/30 transition-colors">
                <img 
                  src={smartflowMockup} 
                  alt="SmartFlow Mockup" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-primary bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    Live System v1.2
                  </span>
                </div>
              </div>

              <div className="p-3 bg-blue-light rounded-2xl text-blue-primary w-fit mb-6">
                <BrainCircuit size={28} />
              </div>
              
              <h2 className="text-3xl font-black text-app-text mb-4 tracking-tighter">Vermont SmartFlow</h2>
              <p className="text-app-muted font-bold mb-8 leading-relaxed">
                Asisten keuangan cerdas yang didukung oleh pemrosesan bahasa alami (NLP). 
                Catat transaksi bisnis Anda semudah mengirim pesan teks.
              </p>
              
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-app-border">
                <Link to="/smartflow" className="btn-primary group/btn py-3 px-6 text-xs">
                  Masuki SmartFlow <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-light text-[9px] font-black text-blue-primary uppercase tracking-widest">
                  <Zap size={10} className="text-amber-primary" /> Active
                </div>
              </div>
            </motion.div>

            {/* Business Profile Mockup Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card-premium group relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
              
              <div className="relative aspect-video mb-8 overflow-hidden rounded-2xl bg-app-bg border border-app-border group-hover:border-blue-primary/30 transition-colors">
                <img 
                  src={businessMockup} 
                  alt="Business Profile Mockup" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-primary bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    Prototype Active
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600 w-fit mb-6">
                <Microscope size={28} />
              </div>
              
              <h2 className="text-3xl font-black text-app-text mb-4 tracking-tighter">Business Profile AI</h2>
              <p className="text-app-muted font-bold mb-8 leading-relaxed">
                Sistem pembuatan profil bisnis otomatis. Bangun identitas digital profesional 
                yang memikat pelanggan hanya dalam hitungan detik.
              </p>
              
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-app-border">
                <Link to="/business-profile" className="btn-primary group/btn py-3 px-6 text-xs">
                  Lihat Demo <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                  <Zap size={10} className="text-emerald-500" /> Active
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabPage;
