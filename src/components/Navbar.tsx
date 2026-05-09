import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

const navLinks = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.laboratory', path: '/laboratory' },
  { key: 'nav.capabilities', path: '/services' },
  { key: 'nav.ai_systems', path: '/solutions' },
  { key: 'nav.roadmap', path: '/innovation' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isID = i18n.language.startsWith('id');

  const toggleLanguage = () => {
    const nextLang = isID ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('i18nextLng', nextLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex-shrink-0" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                  location.pathname === link.path ? 'text-brandBlue' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 hover:text-brandBlue transition-all"
            >
              <Languages size={14} />
              {isID ? 'EN' : 'ID'}
            </button>

            <Link to="/contact" className="btn-primary">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleLanguage}
              className="text-gray-400 p-2 hover:text-brandBlue transition-colors"
            >
              <Languages size={20} />
            </button>
            <button 
              className="text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
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
            className="md:hidden bg-navy-950 border-b border-white/5"
          >
            <div className="px-6 pt-4 pb-10 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-xs font-black uppercase tracking-widest ${
                    location.pathname === link.path ? 'text-brandBlue' : 'text-gray-400'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full mt-4"
              >
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
