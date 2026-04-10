import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

export default function VisionMission() {
  const { copy, isArabic } = useLanguage();

  return (
    <div className="bg-paper min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={cn('max-w-3xl', isArabic && 'ml-auto text-right')}
        >
          <span
            className={cn(
              'text-[11px] font-bold text-gold mb-6 block',
              isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
            )}
          >
            {copy.vision.eyebrow}
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-12">
            {copy.vision.titleLineOne} <br />
            <span className="italic text-gold">{copy.vision.titleAccent}</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mt-24">
          {copy.vision.cards.map((card, index) => (
            <div key={card.title} className={cn('space-y-10', isArabic && 'text-right')}>
              <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-tight">{card.title}</h2>
              <p
                className={cn(
                  'text-2xl md:text-[2rem] text-ink/72 leading-[1.8] max-w-[22ch]',
                  index === 0 ? 'font-serif italic' : 'font-light',
                )}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
