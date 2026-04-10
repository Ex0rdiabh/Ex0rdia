import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';
import heroImage from '../assets/hero-new.jpg';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

const PHILOSOPHY_ICONS = [Shield, Clock, Star];

export default function LandingPage() {
  const { copy, isArabic } = useLanguage();

  return (
    <div className="flex flex-col bg-paper">
      <section className="relative min-h-[90vh] flex items-center py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold/10 rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-glow" />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full filter blur-[100px] translate-x-1/2 translate-y-1/2 animate-glow"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(isArabic && 'text-right')}
            >
              <div className={cn('flex items-center gap-4 mb-8', isArabic && 'flex-row-reverse')}>
                <div className="h-px w-12 bg-gold" />
                <span
                  className={cn(
                    'text-[11px] font-bold text-gold',
                    isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
                  )}
                >
                  {copy.landing.eyebrow}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-10 text-balance">
                {copy.landing.titleLineOne} <br />
                <span className="italic text-gold">{copy.landing.titleAccent}</span>
              </h1>

              <p className="text-xl text-ink/60 mb-12 max-w-lg leading-relaxed font-serif italic">
                {copy.landing.description}
              </p>

              <div className={cn('flex flex-col sm:flex-row gap-8 items-center', isArabic && 'sm:flex-row-reverse')}>
                <Link
                  to="/book"
                  className="group relative bg-ink text-paper px-12 py-6 rounded-full font-bold text-sm uppercase tracking-widest-xl hover:bg-gold hover:text-ink transition-all duration-500 shadow-2xl shadow-ink/10 overflow-hidden"
                >
                  <span className={cn('relative z-10 flex items-center gap-3', isArabic && 'flex-row-reverse')}>
                    {copy.landing.primaryCta}
                    <ArrowRight className={cn('w-5 h-5 transition-transform', isArabic ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2')} />
                  </span>
                </Link>
                <Link
                  to="/dashboard"
                  className={cn(
                    'text-[11px] font-bold text-ink border-b-2 border-gold pb-2 hover:text-gold transition-colors',
                    isArabic ? 'tracking-[0.15em]' : 'uppercase tracking-widest-xl',
                  )}
                >
                  {copy.landing.secondaryCta}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden shadow-2xl rotate-2 group hover:rotate-0 transition-transform duration-700 animate-float">
                <img
                  src={heroImage}
                  alt="Exordia Team"
                  className="absolute inset-0 w-full h-full object-cover object-[24%_center] scale-[1.62] group-hover:scale-[1.52] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-ink text-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {copy.landing.philosophy.map((item, idx) => {
              const Icon = PHILOSOPHY_ICONS[idx];

              return (
                <div key={item.title} className={cn('group', isArabic && 'text-right')}>
                  <div className={cn('w-16 h-16 bg-paper/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500', isArabic && 'mr-auto')}>
                    <Icon className="text-gold group-hover:text-ink w-8 h-8 transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-paper/60 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 text-[20vw] font-serif text-paper/5 leading-none -translate-x-10 translate-y-1/2 pointer-events-none select-none italic">
          {isArabic ? 'أثر' : 'Prestige'}
        </div>
      </section>

      <section className="py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('flex flex-col md:flex-row justify-between items-end mb-24 gap-8', isArabic && 'md:flex-row-reverse md:items-start')}>
            <div className={cn('max-w-2xl', isArabic && 'text-right')}>
              <span
                className={cn(
                  'text-[11px] font-bold text-gold mb-6 block',
                  isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
                )}
              >
                {copy.landing.methodology}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-ink leading-tight">
                {copy.landing.methodologyTitle} <br />
                <span className="italic">{copy.landing.methodologyAccent}</span>
              </h2>
            </div>
            <Link
              to="/book"
              className={cn(
                'text-[11px] font-bold text-ink border-b-2 border-gold pb-2 hover:text-gold transition-colors',
                isArabic ? 'tracking-[0.15em]' : 'uppercase tracking-widest-xl',
              )}
            >
              {copy.landing.explore}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {copy.landing.process.map((item) => (
              <div key={item.step} className={cn('relative group', isArabic && 'text-right')}>
                <span
                  className={cn(
                    'text-8xl font-serif text-ink/5 absolute -top-12 -left-4 z-0 transition-colors group-hover:text-gold/10',
                    isArabic && '-left-auto -right-4',
                  )}
                >
                  {item.step}
                </span>
                <div className="relative z-10 pt-8 border-t border-ink/10">
                  <h3 className="text-xl font-serif text-ink mb-4">{item.title}</h3>
                  <p className="text-ink/50 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-paper relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-ink rounded-[4rem] py-24 px-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full filter blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full filter blur-[80px] -translate-x-1/2 translate-y-1/2" />

            <h2 className="text-5xl md:text-7xl font-serif text-paper mb-10 leading-tight relative z-10">
              {copy.landing.finalTitle} <br />
              <span className="italic text-gold">{copy.landing.finalAccent}</span>
            </h2>
            <p className="text-lg text-paper/60 mb-12 max-w-xl mx-auto font-light leading-relaxed relative z-10">
              {copy.landing.finalDescription}
            </p>
            <Link
              to="/book"
              className="inline-block bg-gold text-ink px-16 py-6 rounded-full font-bold text-sm uppercase tracking-widest-xl hover:bg-paper transition-all duration-500 relative z-10 shadow-xl shadow-gold/20"
            >
              {copy.landing.finalCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
