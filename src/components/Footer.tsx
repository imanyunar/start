import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[var(--app-border)] bg-[var(--app-surface)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm font-bold leading-relaxed text-[var(--app-muted)]">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-[var(--app-text)]">Menu</h4>
            <div className="space-y-2 text-sm font-bold">
              <Link to="/about" className="block text-[var(--app-muted)] hover:text-blue-primary">{t('nav.about')}</Link>
              <Link to="/services" className="block text-[var(--app-muted)] hover:text-blue-primary">{t('nav.capabilities')}</Link>
              <Link to="/packages" className="block text-[var(--app-muted)] hover:text-blue-primary">{t('nav.packages')}</Link>
              <Link to="/contact" className="block text-[var(--app-muted)] hover:text-blue-primary">{t('nav.contact')}</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-[var(--app-text)]">{t('footer.contact_heading')}</h4>
            <div className="flex items-center gap-3 text-sm font-bold text-[var(--app-muted)]">
              <Mail size={16} className="text-blue-primary" />
              <span>imanyunar@gmail.com</span>
            </div>
            <p className="mt-3 text-xs font-bold text-[var(--app-muted)]">Global Headquarters</p>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--app-border)] pt-6 text-center text-xs font-black tracking-wide text-[var(--app-faint)]">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

