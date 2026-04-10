import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { copy, isArabic } = useLanguage();

  return (
    <footer className="bg-ink text-paper pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-24">
          <div className={cn('col-span-1', isArabic && 'text-right')}>
            <Link to="/" dir="ltr" className={cn('flex items-center gap-4 mb-10 group', isArabic && 'justify-end')}>
              <Logo className="w-24 h-12 text-paper" />
            </Link>
            <p className="text-paper/40 text-sm leading-relaxed max-w-xs font-light italic font-serif">
              {copy.footer.summary}
            </p>
          </div>

          <div className={cn(isArabic && 'text-right')}>
            <h3
              className={cn(
                'text-gold font-bold mb-10 text-[10px]',
                isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
              )}
            >
              {copy.footer.connect}
            </h3>
            <div className={cn('flex mb-10 gap-6', isArabic && 'justify-start')}>
              <a
                href="https://www.instagram.com/exordiabh/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-paper/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-ink transition-all group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:Ex0rdia@outlook.com"
                className="w-14 h-14 bg-paper/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-ink transition-all group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/97336222349"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-paper/5 rounded-2xl flex items-center justify-center hover:bg-gold hover:text-ink transition-all group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:Ex0rdia@outlook.com"
                className={cn(
                  'text-[11px] text-paper/40 font-bold hover:text-gold transition-colors flex items-center gap-4',
                  isArabic ? 'tracking-[0.12em] justify-end' : 'uppercase tracking-widest-xl',
                )}
              >
                <Mail className="w-4 h-4 text-gold" />
                <span dir="ltr">Ex0rdia@outlook.com</span>
              </a>
              <a
                href="https://www.instagram.com/exordiabh/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-[11px] text-paper/40 font-bold hover:text-gold transition-colors flex items-center gap-4',
                  isArabic ? 'tracking-[0.12em] justify-end' : 'uppercase tracking-widest-xl',
                )}
              >
                <Instagram className="w-4 h-4 text-gold" />
                <span dir="ltr">{copy.footer.instagram}</span>
              </a>
              <a
                href="https://wa.me/97336222349"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-[11px] text-paper/40 font-bold hover:text-gold transition-colors flex items-center gap-4',
                  isArabic ? 'tracking-[0.12em] justify-end' : 'uppercase tracking-widest-xl',
                )}
              >
                <MessageCircle className="w-4 h-4 text-gold" />
                <span dir="ltr">{copy.footer.whatsappLabel}</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'border-t border-paper/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-8',
            isArabic && 'md:flex-row-reverse',
          )}
        >
          <p
            className={cn(
              'text-paper/20 text-[10px] font-bold',
              isArabic ? 'tracking-[0.18em] text-center' : 'uppercase tracking-[0.4em]',
            )}
          >
            {copy.footer.rights}
          </p>
          <div
            className={cn(
              'flex gap-12 text-[10px] text-paper/20 font-bold',
              isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
            )}
          >
            <Link to="/privacy" className="hover:text-paper transition-colors">
              {copy.footer.privacy}
            </Link>
            <Link to="/terms" className="hover:text-paper transition-colors">
              {copy.footer.terms}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
    </footer>
  );
}
