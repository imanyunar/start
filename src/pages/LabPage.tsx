import { motion } from 'framer-motion';
import { BrainCircuit, FlaskConical, ArrowRight, Zap, Shield, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LabPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 min-h-screen bg-navy-950">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6 flex items-center justify-center gap-2">
              <FlaskConical size={14} /> {t('nav.laboratory')}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Vermont <span className="text-gradient">Neural Lab</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-brandBlue/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
              
              <div className="p-4 bg-brandBlue/10 rounded-2xl text-brandBlue w-fit mb-8">
                <BrainCircuit size={32} />
              </div>
              
              <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">Vermont SmartFlow</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Asisten keuangan cerdas yang didukung oleh pemrosesan bahasa alami (NLP). 
                Catat transaksi bisnis Anda semudah mengirim pesan teks.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/5">
                  <Zap size={12} className="text-yellow-500" /> NLP Powered
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/5">
                  <Shield size={12} className="text-blue-500" /> Secure
                </div>
              </div>
              
              <Link to="/smartflow" className="btn-primary group/btn">
                Masuki SmartFlow <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Placeholder for Next Prototype */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card-premium border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center text-center p-12"
            >
              <div className="p-4 bg-white/5 rounded-full text-gray-600 mb-6">
                <Microscope size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-500 mb-2">Proyek Selanjutnya</h3>
              <p className="text-gray-600 text-sm italic">Sedang dalam pengembangan neural...</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabPage;
