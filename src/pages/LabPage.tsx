import { motion } from 'framer-motion';
import { BrainCircuit, FlaskConical, ArrowRight, Zap, Shield, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
              className="card-premium group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-primary/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
              
              <div className="p-4 bg-blue-light rounded-2xl text-blue-primary w-fit mb-8 group-hover:scale-110 transition-transform">
                <BrainCircuit size={32} />
              </div>
              
              <h2 className="text-3xl font-black text-app-text mb-4 tracking-tighter">Vermont SmartFlow</h2>
              <p className="text-app-muted font-bold mb-8 leading-relaxed">
                Asisten keuangan cerdas yang didukung oleh pemrosesan bahasa alami (NLP). 
                Catat transaksi bisnis Anda semudah mengirim pesan teks.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-light text-[10px] font-black text-blue-primary uppercase tracking-widest">
                  <Zap size={12} className="text-amber-primary" /> NLP Powered
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-light text-[10px] font-black text-blue-primary uppercase tracking-widest">
                  <Shield size={12} className="text-blue-primary" /> Secure
                </div>
              </div>
              
              <Link to="/smartflow" className="btn-primary group/btn w-fit">
                Masuki SmartFlow <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Placeholder for Next Prototype */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card-premium border-dashed bg-transparent flex flex-col items-center justify-center text-center p-12 hover:border-blue-primary/30"
            >
              <div className="p-4 bg-app-bg border border-app-border rounded-full text-app-muted mb-6">
                <Microscope size={32} />
              </div>
              <h3 className="text-xl font-black text-app-text mb-2">Proyek Selanjutnya</h3>
              <p className="text-app-faint text-sm font-bold italic">Sedang dalam pengembangan neural...</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabPage;
