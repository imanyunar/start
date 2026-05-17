import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.laboratory'), path: '/laboratory' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.capabilities'), path: '/services' },
    { name: t('nav.packages'), path: '/packages' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className={`fixed w-full z-[1000] transition-all duration-300 ${
      scrolled ? 'py-3 bg-[var(--app-bg)]/70 backdrop-blur-md border-b border-[var(--app-border)]' : 'py-5 bg-[var(--app-bg)]/50 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[14px] font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-blue-primary' 
                    : 'text-[var(--app-text)] opacity-60 hover:opacity-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4">
              <button 
                onClick={toggleTheme}
                className="text-[var(--app-text)] opacity-60 hover:opacity-100 transition-opacity"
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button 
                onClick={toggleLanguage}
                className="text-[12px] font-bold uppercase tracking-wider text-[var(--app-text)] opacity-60 hover:opacity-100 transition-opacity"
              >
                {i18n.language === 'en' ? 'ID' : 'EN'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-[var(--app-text)] opacity-60">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-[var(--app-text)]">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1999] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-[280px] bg-[var(--app-bg)] z-[2000] md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-[var(--app-border)] flex justify-between items-center">
                <Logo />
                <button onClick={() => setIsOpen(false)} className="text-[var(--app-text)] p-2">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col p-8 gap-6 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold tracking-tight transition-colors ${
                      location.pathname === link.path 
                        ? 'text-blue-primary' 
                        : 'text-[var(--app-text)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto p-8 border-t border-[var(--app-border)] space-y-4">
                 <button onClick={toggleLanguage} className="w-full py-3 bg-blue-primary text-white rounded-xl text-[12px] font-black uppercase tracking-widest">
                   {i18n.language === 'en' ? 'Bahasa Indonesia' : 'English'}
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

