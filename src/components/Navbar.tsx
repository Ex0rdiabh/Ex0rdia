import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import Logo from './Logo';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const { copy, toggleLanguage, isArabic } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const middleLinks = [
    { name: copy.nav.home, href: '/' },
    { name: copy.nav.about, href: '/about' },
    { name: copy.nav.vision, href: '/vision' },
    { name: copy.nav.contact, href: '/contact' },
  ];

  const rightLink = { name: copy.nav.booking, href: '/book' };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'glass-paper py-4 shadow-sm' : 'bg-transparent py-8',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to="/" dir="ltr" className="flex-shrink-0 flex items-center gap-4 group">
              <Logo className="w-24 h-12 text-ink" />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-between ml-20">
            <div className={cn('flex items-center gap-12', isArabic && 'text-right')}>
              {middleLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'text-[11px] font-bold uppercase transition-all hover:text-gold relative group py-2',
                    isArabic ? 'tracking-[0.15em]' : 'tracking-widest-xl',
                    location.pathname === link.href ? 'text-gold' : 'text-ink/60',
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-px bg-gold transition-transform duration-300',
                      isArabic ? 'origin-right' : 'origin-left',
                      location.pathname === link.href
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={toggleLanguage}
                className={cn(
                  'text-[11px] font-bold uppercase py-2 text-ink/45 hover:text-gold transition-colors border-b border-transparent hover:border-gold',
                  isArabic ? 'tracking-[0.15em]' : 'tracking-widest-xl',
                )}
                aria-label="Toggle language"
              >
                {copy.nav.language}
              </button>

              <Link
                to={rightLink.href}
                className={cn(
                  'text-[11px] font-bold uppercase transition-all hover:text-gold relative group py-2',
                  isArabic ? 'tracking-[0.15em]' : 'tracking-widest-xl',
                  location.pathname === rightLink.href ? 'text-gold' : 'text-ink/60',
                )}
              >
                {rightLink.name}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-full h-px bg-gold transition-transform duration-300',
                    isArabic ? 'origin-right' : 'origin-left',
                    location.pathname === rightLink.href
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className={cn(
                'px-3 py-2 text-[11px] font-bold text-ink/60 hover:text-gold transition-all',
                isArabic ? 'tracking-[0.15em]' : 'uppercase tracking-widest-xl',
              )}
              aria-label="Toggle language"
            >
              {copy.nav.language}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-ink/60 hover:text-ink transition-all"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-paper border-t border-ink/5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={cn('px-4 pt-4 pb-12 space-y-4', isArabic && 'text-right')}>
            {[...middleLinks, rightLink].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-4 text-sm font-bold',
                  isArabic ? 'tracking-[0.15em]' : 'uppercase tracking-widest-xl',
                  location.pathname === link.href
                    ? 'text-gold bg-ink/5 rounded-2xl'
                    : 'text-ink/60',
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
