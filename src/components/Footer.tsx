import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, GitBranch, X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-6 text-gray-400 text-sm max-w-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-8 text-xs font-bold text-gray-600 mt-8">
              <a href="#" className="hover:text-brandBlue transition-colors">{t('nav.privacy') || 'Privacy'}</a>
              <a href="#" className="hover:text-brandBlue transition-colors">{t('nav.terms') || 'Terms'}</a>
            </div>
            <div className="flex items-center gap-5 mt-8">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><X size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><ExternalLink size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><GitBranch size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">{t('footer.exploration')}</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-brandBlue text-sm transition-colors">{t('nav.laboratory')}</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brandBlue text-sm transition-colors">{t('nav.capabilities')}</Link></li>
              <li><Link to="/solutions" className="text-gray-400 hover:text-brandBlue text-sm transition-colors">{t('nav.ai_systems')}</Link></li>
              <li><Link to="/innovation" className="text-gray-400 hover:text-brandBlue text-sm transition-colors">{t('nav.roadmap')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">{t('footer.contact_heading')}</h4>
            <div className="flex items-center gap-3 text-gray-400 mb-4">
              <Mail size={16} className="text-brandBlue" />
              <span className="text-sm">imanyunar@gmail.com</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Semarang, Indonesia<br />
              {t('footer.innovation_hub')}
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            {t('footer.rights')}
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
