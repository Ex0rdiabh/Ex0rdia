import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutUs() {
  const { copy, isArabic } = useLanguage();

  return (
    <div className="bg-paper min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={cn('max-w-4xl', isArabic && 'ml-auto text-right')}
        >
          <span
            className={cn(
              'text-[11px] font-bold text-gold mb-6 block',
              isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
            )}
          >
            {copy.about.eyebrow}
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-12">
            {copy.about.titleLineOne} <br />
            <span className="italic text-gold">{copy.about.titleAccent}</span>
          </h1>
          <p className="text-2xl md:text-[1.95rem] text-ink/70 leading-[1.75] font-serif italic mb-12 max-w-[28ch]">
            {copy.about.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mt-24">
          {copy.about.cards.map((card) => (
            <div key={card.title} className={cn('space-y-10', isArabic && 'text-right')}>
              <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-tight">{card.title}</h2>
              <p className="text-xl md:text-[1.8rem] text-ink/70 leading-[1.85] font-serif max-w-[23ch]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
