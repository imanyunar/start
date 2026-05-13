import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Utensils, Cake, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] selection:bg-amber-500/30 font-poppins">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-[#F5F5F4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center font-black text-white shadow-md">A</div>
            <span className="text-xl font-bold tracking-tight text-[#292524]">Aura <span className="text-amber-600 font-black">Cafe</span></span>
          </div>
          <div className="hidden gap-8 text-sm font-semibold text-[#44403C] md:flex">
            <a href="#menu" className="hover:text-amber-600 transition-colors">Menu Spesial</a>
            <a href="#location" className="hover:text-amber-600 transition-colors">Lokasi</a>
          </div>
          <Link to="/" className="rounded-full bg-[#F5F5F4] px-5 py-2.5 text-xs font-bold text-[#44403C] border border-[#E7E5E4] hover:bg-[#E7E5E4] transition-all">
            Kembali ke Beranda
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center pt-24 pb-12 px-6 md:flex-row md:justify-between md:px-12 xl:px-24 max-w-[1400px] mx-auto overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700"
          >
            Artisanal Coffee & Pastry
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-[#1C1917] md:text-7xl lg:text-8xl"
          >
            Rasa Hangat di Setiap <span className="text-amber-600">Seduhan.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 max-w-lg text-lg font-medium leading-relaxed text-[#57534E] md:text-xl"
          >
            Nikmati kopi pilihan terbaik dan pastry buatan tangan kami dalam suasana cafe yang nyaman dan estetik. Tempat yang sempurna untuk bersantai.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4"
          >
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-10 py-4 text-base font-bold text-white shadow-lg shadow-amber-600/30 hover:opacity-90 active:scale-[0.98] transition-all">
              Lihat Menu Kami <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E7E5E4] bg-white px-10 py-4 text-base font-bold text-[#44403C] hover:border-amber-300 hover:bg-amber-50 transition-all">
              Reservasi Meja
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full md:w-[50%] mt-16 md:mt-0 flex justify-center relative"
        >
          <img 
            src="/fnb_mockup.png" 
            alt="Aura Cafe Website Mockup" 
            className="w-full h-auto max-w-[800px] object-contain drop-shadow-2xl"
          />
        </motion.div>
      </section>

      {/* Menu / Services Section */}
      <section id="menu" className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#1C1917] md:text-5xl">Menu Favorit Kami</h2>
            <p className="mx-auto max-w-2xl font-medium text-[#57534E] text-lg">Dibuat dengan bahan premium dan penuh cinta setiap harinya.</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Artisanal Coffee',
                desc: 'Biji kopi pilihan dari petani lokal, di-roast dengan sempurna untuk menghasilkan rasa yang kaya.',
                icon: Coffee,
                color: 'bg-amber-100 text-amber-700'
              },
              {
                title: 'Fresh Pastries',
                desc: 'Croissant, muffin, dan cake yang dipanggang segar setiap pagi oleh baker ahli kami.',
                icon: Cake,
                color: 'bg-orange-100 text-orange-700'
              },
              {
                title: 'Main Course',
                desc: 'Pilihan makanan berat yang lezat untuk melengkapi waktu santai atau makan siang Anda.',
                icon: Utensils,
                color: 'bg-red-100 text-red-700'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="rounded-[2rem] border border-[#F5F5F4] bg-[#FAFAF9] p-8 hover:shadow-xl hover:shadow-amber-900/5 transition-all cursor-default"
              >
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${service.color}`}>
                  <service.icon size={32} />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#1C1917]">{service.title}</h3>
                <p className="text-base font-medium leading-relaxed text-[#57534E]">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Location Section */}
      <section id="location" className="py-24 px-6">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-amber-600 p-10 text-center shadow-2xl shadow-amber-900/20 md:p-16 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="mb-6 text-3xl font-black tracking-tight text-white md:text-5xl">Kunjungi Aura Cafe</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg font-medium text-amber-100">
              Buka setiap hari mulai pukul 07.00 - 22.00. Kami siap menyambut Anda dengan senyuman dan aroma kopi terbaik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-amber-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md">
                <MapPin size={20} /> Lihat di Maps
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-amber-400 bg-amber-700 px-8 py-4 text-base font-bold text-white hover:bg-amber-800 active:scale-[0.98] transition-all">
                <Phone size={20} /> Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E7E5E4] py-12 px-6 bg-white text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#F5F5F4] flex items-center justify-center text-[#57534E] hover:bg-amber-100 hover:text-amber-600 transition-colors font-bold text-sm">
            IG
          </a>
        </div>
        <p className="text-sm font-semibold text-[#78716C]">© 2026 Aura Cafe. Template F&B Business Profile.</p>
      </footer>
    </div>
  );
};

export default BusinessProfilePage;
