import { motion } from 'framer-motion';
import { Mail, Phone, X, ExternalLink, GitBranch, Send, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-[10px] mb-6">Initialize Connection</div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              {t('contact.title')} <br />
              <span className="text-gradient">{t('contact.subtitle')}</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
              {t('contact.description')}
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue border border-brandBlue/20 group-hover:bg-brandBlue group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Email Terminal</div>
                  <div className="text-white font-bold">imanyunar@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue border border-brandBlue/20 group-hover:bg-brandBlue group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Direct Line</div>
                  <div className="text-white font-bold">085172247452</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue border border-brandBlue/20 group-hover:bg-brandBlue group-hover:text-white transition-all">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Headquarters</div>
                  <div className="text-white font-bold">Semarang, Indonesia</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><X size={24} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><ExternalLink size={24} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><GitBranch size={24} /></a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-dark p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brandBlue/10 blur-[80px] rounded-full"></div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.form.name')}</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-brandBlue/50 focus:outline-none transition-all"
                      placeholder="Alan Turing"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.form.email')}</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-brandBlue/50 focus:outline-none transition-all"
                      placeholder="alan@turing.io"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.form.subject')}</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-brandBlue/50 focus:outline-none transition-all appearance-none">
                    <option className="bg-navy-950">AI Automation Consulting</option>
                    <option className="bg-navy-950">System Architecture</option>
                    <option className="bg-navy-950">Partnership Inquiry</option>
                    <option className="bg-navy-950">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{t('contact.form.message')}</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-600 focus:border-brandBlue/50 focus:outline-none transition-all resize-none"
                    placeholder="Describe your vision..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-5 group shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                  {t('contact.form.button')}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
