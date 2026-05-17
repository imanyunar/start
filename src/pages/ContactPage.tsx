import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, X, ExternalLink, GitBranch, Send, Globe, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch("https://formsubmit.co/ajax/imanyunar15@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success === "true") {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--app-bg)]">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-light mb-6 w-fit">{t('contact.badge')}</div>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--app-text)] mb-8 tracking-tighter leading-tight">
              {t('contact.title')} <br />
              <span className="text-gradient">{t('contact.subtitle')}</span>
            </h1>
            <p className="text-[var(--app-muted)] font-bold text-lg leading-relaxed mb-12 max-w-md">
              {t('contact.description')}
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-blue-light flex items-center justify-center text-blue-primary border border-blue-primary/20 group-hover:bg-blue-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] mb-1">{t('contact.info.email_label')}</div>
                  <div className="text-[var(--app-text)] font-black">imanyunar15@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-blue-light flex items-center justify-center text-blue-primary border border-blue-primary/20 group-hover:bg-blue-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] mb-1">{t('contact.info.phone_label')}</div>
                  <div className="text-[var(--app-text)] font-black">085172247452</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-blue-light flex items-center justify-center text-blue-primary border border-blue-primary/20 group-hover:bg-blue-primary group-hover:text-white transition-all">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] mb-1">{t('contact.info.hq_label')}</div>
                  <div className="text-[var(--app-text)] font-black">Global Headquarters</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="text-[var(--app-muted)] hover:text-blue-primary transition-colors" aria-label="X / Twitter"><X size={24} /></a>
              <a href="https://vermontdigital.biz.id/" target="_blank" rel="noreferrer" className="text-[var(--app-muted)] hover:text-blue-primary transition-colors" aria-label="Website"><ExternalLink size={24} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[var(--app-muted)] hover:text-blue-primary transition-colors" aria-label="GitHub"><GitBranch size={24} /></a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[var(--app-surface)] p-8 md:p-12 rounded-[2rem] border border-[var(--app-border)] shadow-xl relative min-h-[400px] flex flex-col justify-center">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-primary/5 blur-[80px] rounded-full"></div>
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-6 py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center text-blue-primary mx-auto shadow-inner">
                      <CheckCircle2 size={36} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-[var(--app-text)]">{t('contact.form.success_title')}</h3>
                      <p className="text-[var(--app-muted)] text-base font-semibold leading-relaxed max-w-sm mx-auto">{t('contact.form.success_desc')}</p>
                    </div>
                    <button 
                      onClick={() => setStatus('idle')} 
                      className="btn-secondary px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider mx-auto"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-2">{t('contact.form.name')}</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          disabled={status === 'submitting'}
                          className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-5 py-4 text-[var(--app-text)] font-bold placeholder:text-[var(--app-faint)] focus:border-blue-primary/50 focus:bg-[var(--app-surface)] focus:outline-none transition-all disabled:opacity-55"
                          placeholder={t('contact.form.placeholder_name')}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-2">{t('contact.form.email')}</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          disabled={status === 'submitting'}
                          className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-5 py-4 text-[var(--app-text)] font-bold placeholder:text-[var(--app-faint)] focus:border-blue-primary/50 focus:bg-[var(--app-surface)] focus:outline-none transition-all disabled:opacity-55"
                          placeholder="alan@turing.io"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-2">{t('contact.form.subject')}</label>
                      <select 
                        name="subject"
                        disabled={status === 'submitting'}
                        className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-5 py-4 text-[var(--app-text)] font-bold focus:border-blue-primary/50 focus:bg-[var(--app-surface)] focus:outline-none transition-all appearance-none disabled:opacity-55"
                      >
                        <option value={t('contact.form.options.ai')} className="bg-[var(--app-surface)]">{t('contact.form.options.ai')}</option>
                        <option value={t('contact.form.options.arch')} className="bg-[var(--app-surface)]">{t('contact.form.options.arch')}</option>
                        <option value={t('contact.form.options.partnership')} className="bg-[var(--app-surface)]">{t('contact.form.options.partnership')}</option>
                        <option value={t('contact.form.options.other')} className="bg-[var(--app-surface)]">{t('contact.form.options.other')}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--app-muted)] ml-2">{t('contact.form.message')}</label>
                      <textarea 
                        name="message"
                        required
                        disabled={status === 'submitting'}
                        rows={4}
                        className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-xl px-5 py-4 text-[var(--app-text)] font-bold placeholder:text-[var(--app-faint)] focus:border-blue-primary/50 focus:bg-[var(--app-surface)] focus:outline-none transition-all resize-none disabled:opacity-55"
                        placeholder={t('contact.form.placeholder_message')}
                      ></textarea>
                    </div>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex gap-4 text-left"
                        >
                          <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                          <div>
                            <h4 className="font-bold text-red-500">{t('contact.form.error_title')}</h4>
                            <p className="text-[var(--app-muted)] text-xs font-semibold mt-1 leading-relaxed">{t('contact.form.error_desc')}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      type="submit" 
                      disabled={status === 'submitting'}
                      className="btn-primary w-full py-5 group shadow-xl hover:shadow-2xl disabled:opacity-75 disabled:pointer-events-none"
                    >
                      {status === 'submitting' ? 'Transmitting...' : t('contact.form.button')}
                      {status !== 'submitting' && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
