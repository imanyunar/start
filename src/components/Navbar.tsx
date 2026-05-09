import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
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
    { name: t('nav.capabilities'), path: '/services' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <nav className={`fixed w-full z-[1000] transition-all duration-500 ${
      scrolled ? 'py-4 bg-[var(--app-surface)]/80 backdrop-blur-xl border-b border-[var(--app-border)] shadow-sm' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo className="scale-90 md:scale-100 origin-left" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${
                  location.pathname === link.path 
                    ? 'bg-blue-light text-blue-primary' 
                    : 'text-[var(--app-muted)] hover:text-[var(--app-text)] hover:bg-[var(--app-bg)]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="w-px h-4 bg-app-border mx-2"></div>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[var(--app-muted)] hover:text-blue-primary hover:bg-blue-light transition-all flex items-center justify-center"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-xl text-[var(--app-muted)] hover:text-blue-primary hover:bg-blue-light transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
            >
              <Globe size={16} />
              {i18n.language === 'en' ? 'ID' : 'EN'}
            </button>

            <Link to="/contact" className="ml-4 px-6 py-2.5 bg-blue-primary text-white rounded-xl text-sm font-black hover:bg-blue-dark transition-all shadow-lg shadow-blue-primary/10">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <button onClick={toggleTheme} className="p-2 text-[var(--app-muted)]">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleLanguage} className="p-2 text-[var(--app-muted)] font-black text-xs">
              {i18n.language.toUpperCase()}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[var(--app-text)]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[var(--app-surface)] border-b border-[var(--app-border)] p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`p-4 rounded-2xl text-base font-black transition-all ${
                    location.pathname === link.path 
                      ? 'bg-blue-light text-blue-primary' 
                      : 'text-[var(--app-muted)] hover:bg-[var(--app-bg)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="w-full p-4 bg-blue-primary text-white rounded-2xl text-center font-black">
                {t('nav.contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
