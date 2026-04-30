import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarRange,
  Camera,
  Clapperboard,
  PenTool,
  Shield,
  Clock,
  Star,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import heroImage from '../assets/hero-new.jpg';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import Reveal from '../components/landing/Reveal';
import MaskedReveal from '../components/landing/MaskedReveal';

const MotionLink = motion(Link);
const PHILOSOPHY_ICONS = [Shield, Clock, Star] as const;
const SERVICE_ICONS = [Clapperboard, PenTool, Camera, CalendarRange] as const;

const SERVICE_PREVIEW = {
  en: [
    {
      title: 'Videography',
      description: 'Cinematic storytelling and premium video production.',
      accent: 'from-[#d4af37]/55 via-[#d4af37]/14 to-transparent',
      border: 'border-gold/20',
      glow: 'shadow-[0_24px_80px_rgba(212,175,55,0.12)]',
    },
    {
      title: 'Graphic Design',
      description: 'Visual identity, branding, and high-end marketing collateral.',
      accent: 'from-white/30 via-white/8 to-transparent',
      border: 'border-paper/12',
      glow: 'shadow-[0_24px_70px_rgba(255,255,255,0.06)]',
    },
    {
      title: 'Photography',
      description: 'Professional photography for brands, events, and products.',
      accent: 'from-[#918b84]/55 via-[#918b84]/12 to-transparent',
      border: 'border-[#918b84]/25',
      glow: 'shadow-[0_24px_70px_rgba(145,139,132,0.12)]',
    },
    {
      title: 'Event Management',
      description: 'Refined planning and smooth execution for important events.',
      accent: 'from-[#e5c76b]/55 via-[#e5c76b]/12 to-transparent',
      border: 'border-[#e5c76b]/20',
      glow: 'shadow-[0_24px_70px_rgba(229,199,107,0.12)]',
    },
  ],
  ar: [
    {
      title: 'تصوير الفيديو',
      description: 'سرد بصري سينمائي وإنتاج فيديو مصقول وعالي الجودة.',
      accent: 'from-[#d4af37]/55 via-[#d4af37]/14 to-transparent',
      border: 'border-gold/20',
      glow: 'shadow-[0_24px_80px_rgba(212,175,55,0.12)]',
    },
    {
      title: 'التصميم الجرافيكي',
      description: 'هوية بصرية، بناء علامة، ومواد تسويقية مصممة بذوق راقٍ.',
      accent: 'from-white/30 via-white/8 to-transparent',
      border: 'border-paper/12',
      glow: 'shadow-[0_24px_70px_rgba(255,255,255,0.06)]',
    },
    {
      title: 'التصوير الفوتوغرافي',
      description: 'تصوير احترافي للعلامات التجارية والفعاليات والمنتجات.',
      accent: 'from-[#918b84]/55 via-[#918b84]/12 to-transparent',
      border: 'border-[#918b84]/25',
      glow: 'shadow-[0_24px_70px_rgba(145,139,132,0.12)]',
    },
    {
      title: 'إدارة الفعاليات',
      description: 'تخطيط مصقول وتنفيذ سلس للفعاليات المهمة.',
      accent: 'from-[#e5c76b]/55 via-[#e5c76b]/12 to-transparent',
      border: 'border-[#e5c76b]/20',
      glow: 'shadow-[0_24px_70px_rgba(229,199,107,0.12)]',
    },
  ],
} as const;

const HERO_PILLS = {
  en: ['Videography', 'Graphic Design', 'Photography', 'Event Management'],
  ar: ['تصوير الفيديو', 'التصميم الجرافيكي', 'التصوير الفوتوغرافي', 'إدارة الفعاليات'],
} as const;

export default function LandingPage() {
  const { copy, isArabic, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const services = SERVICE_PREVIEW[language];
  const heroPills = HERO_PILLS[language];

  return (
    <div className="overflow-hidden bg-ink text-paper">
      <section className="relative min-h-screen flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),linear-gradient(180deg,_rgba(245,242,237,0.03)_0%,_rgba(10,10,10,0)_26%,_rgba(10,10,10,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,242,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,242,237,0.04)_1px,transparent_1px)] bg-[size:112px_112px] opacity-[0.04] pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none opacity-50">
          <motion.div
<<<<<<< HEAD
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: step <= 1 ? 1 : 0, scale: step <= 1 ? 1 : 0.9 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute right-16 top-12 z-20 h-44 w-72 overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_12px_25px_rgba(0,0,0,0.08)]"
          >
            <img src={heroImage} alt="Exordia hero boys" className="h-full w-full scale-[1.48] object-cover object-[10%_22%]" />
          </motion.div>
=======
            className="absolute top-[10%] left-[8%] h-48 w-48 rounded-full bg-gold/14 blur-[100px]"
            animate={reduceMotion ? undefined : { x: [0, 16, 0], y: [0, -12, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[8%] top-[18%] h-24 w-24 rounded-[2rem] border border-paper/12"
            animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[12%] bottom-[12%] h-64 w-64 rounded-full bg-paper/10 blur-[120px]"
            animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [10, -8, 10] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
>>>>>>> parent of 2ed1f1b (Compact services grid cards and mirror hero card for Arabic)

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] items-center gap-16 lg:gap-24">
            <div className={cn('relative', isArabic && 'lg:order-2 text-right')}>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={cn('mb-8 flex items-center gap-4', isArabic && 'flex-row-reverse')}
              >
                <div className="h-px w-12 bg-gold" />
                <span
                  className={cn(
                    'text-[11px] font-bold text-gold',
                    isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
                  )}
                >
                  {copy.landing.eyebrow}
                </span>
              </motion.div>

              <div className="relative mb-8 md:mb-10">
                <div className="pointer-events-none absolute inset-x-0 -top-6 text-[18vw] md:text-[9rem] font-serif italic text-paper/[0.05] leading-none select-none">
                  Exordia
                </div>
                <div className="relative space-y-1 md:space-y-3">
                  <MaskedReveal>
                    <span className="block text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[7.8rem] font-serif leading-[0.86] tracking-[-0.035em]">
                      Exordia
                    </span>
                  </MaskedReveal>
                  <MaskedReveal delay={0.12}>
                    <span className="block text-4xl sm:text-5xl md:text-6xl font-serif leading-[0.92] text-paper/94">
                      {copy.landing.titleLineOne}
                    </span>
                  </MaskedReveal>
                  <MaskedReveal delay={0.24}>
                    <span className="block text-4xl sm:text-5xl md:text-6xl font-serif italic leading-[0.92] text-gold">
                      {copy.landing.titleAccent}
                    </span>
                  </MaskedReveal>
                </div>
              </div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-lg md:text-[1.32rem] leading-relaxed text-paper/66 font-light"
              >
                {copy.landing.description}
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className={cn('mt-10 flex flex-col sm:flex-row gap-5 sm:items-center', isArabic && 'sm:flex-row-reverse')}
              >
                <MotionLink
                  to="/book"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-10 py-5 text-[11px] font-bold uppercase tracking-[0.28em] text-ink shadow-[0_24px_80px_rgba(212,175,55,0.16)]"
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          boxShadow: [
                            '0 24px 80px rgba(212,175,55,0.16)',
                            '0 32px 100px rgba(212,175,55,0.28)',
                            '0 24px 80px rgba(212,175,55,0.16)',
                          ],
                        }
                  }
                  transition={reduceMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {copy.landing.primaryCta}
                  <ArrowRight
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isArabic ? 'rotate-180 group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5',
                    )}
                  />
                </MotionLink>

                <Link
                  to="/dashboard"
                  className={cn(
                    'inline-flex items-center gap-3 text-[11px] font-bold text-paper/72 hover:text-gold transition-colors',
                    isArabic ? 'tracking-[0.15em]' : 'uppercase tracking-[0.3em]',
                  )}
                >
                  <Star className="h-4 w-4 text-gold" />
                  {copy.landing.secondaryCta}
                </Link>
              </motion.div>
            </div>

            <div className={cn('relative lg:h-[760px]', isArabic && 'lg:order-1')}>
              {heroPills.map((pill, index) => (
                <motion.div
                  key={pill}
                  className={cn(
                    'hidden md:flex absolute z-30 rounded-full border border-paper/10 bg-paper/6 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-paper/72 backdrop-blur-md',
                    index === 0 && 'left-0 top-[8%]',
                    index === 1 && 'right-[2%] top-[13%]',
                    index === 2 && 'left-[6%] bottom-[21%]',
                    index === 3 && 'right-0 bottom-[11%]',
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {pill}
                </motion.div>
              ))}

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: 4 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.05, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto max-w-[560px]"
              >
                <div className="absolute -inset-7 rounded-[3.5rem] bg-gradient-to-br from-gold/25 via-gold/0 to-paper/10 blur-3xl opacity-90" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-paper/10 bg-paper/6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                  <img
                    src={heroImage}
                    alt="Exordia creative team"
                    className="absolute inset-0 h-full w-full object-cover object-[24%_center] scale-[1.62]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.06)_0%,rgba(10,10,10,0.58)_100%)]" />

                  <motion.div
                    initial={reduceMotion ? false : { x: '110%', opacity: 0 }}
                    animate={reduceMotion ? undefined : { x: 0, opacity: 1 }}
                    transition={{ duration: 1.05, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-[12%] w-[60%] rounded-l-[2rem] border-y border-l border-paper/12 bg-ink/72 px-5 py-5 backdrop-blur-xl"
                  >
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">Exordia</p>
                    <p className="text-xl md:text-2xl font-serif leading-[1.05] text-paper/92">
                      {copy.landing.primaryCta}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={reduceMotion ? false : { y: 48, opacity: 0 }}
                    animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                  >
                    <div className="rounded-[2rem] border border-paper/10 bg-ink/58 p-5 backdrop-blur-xl">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">{copy.landing.explore}</p>
                      <p className="text-base md:text-lg font-serif text-paper/90">
                        {copy.landing.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-ink py-24 md:py-32 text-paper overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.14),_transparent_30%)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {copy.landing.philosophy.map((item, index) => {
              const Icon = PHILOSOPHY_ICONS[index];

              return (
                <Reveal key={item.title} delay={index * 0.08} className={cn(isArabic && 'text-right')}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -8 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="group h-full rounded-[2.2rem] border border-paper/10 bg-white/[0.04] p-8 backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                  >
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/12 text-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-4 text-3xl font-serif text-paper">{item.title}</h3>
                    <p className="text-paper/60 leading-relaxed text-sm md:text-base">{item.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-paper py-24 md:py-32 text-ink overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(212,175,55,0.05),transparent_22%,transparent_100%)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('mb-16 md:mb-20', isArabic && 'text-right')}>
            <Reveal>
              <span className={cn('mb-6 block text-[11px] font-bold text-gold', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
                {copy.landing.explore}
              </span>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = SERVICE_ICONS[index];

              return (
                <Reveal key={service.title} delay={index * 0.08} className={cn(isArabic && 'text-right')}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -10, scale: 1.012 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={cn(
                      'group relative h-full overflow-hidden rounded-[2.25rem] border bg-ink p-7 text-paper',
                      service.border,
                      service.glow,
                    )}
                  >
                    <div className={cn('absolute inset-x-0 top-0 h-32 bg-gradient-to-b opacity-90', service.accent)} />
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-paper/8 opacity-40" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-paper/10 bg-paper/8 text-gold">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-4 text-3xl font-serif text-paper">{service.title}</h3>
                      <p className="flex-grow text-paper/62 leading-relaxed text-sm md:text-[15px]">
                        {service.description}
                      </p>
                    </div>
<<<<<<< HEAD

                    {activeChapter === 3 && (
                      <div className="grid grid-cols-4 gap-3 pt-6">
                        {copy.landing.process.map((item) => (
                          <div key={item.step} className="rounded-2xl border border-ink/10 bg-paper p-4">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{item.step}</p>
                            <h3 className="mt-2 text-lg font-serif">{item.title}</h3>
                            <p className="mt-2 text-xs text-ink/66">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeChapter === 4 && (
                      <div className={cn('pt-8', isArabic && 'flex justify-end')} onClick={(e) => e.stopPropagation()}>
                        <MotionLink
                          to="/book"
                          className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-10 py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-ink shadow-[0_24px_80px_rgba(212,175,55,0.24)]"
                          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                        >
                          {copy.nav.booking}
                          <ArrowRight className={cn('h-4 w-4 transition-transform', isArabic ? 'rotate-180 group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5')} />
                        </MotionLink>
                      </div>
                    )}
                  </div>
                )}

                {activeChapter === 2 && (
                  <div className={cn('flex h-full flex-col', isArabic && 'text-right')}>
                    <p className={cn('mb-3 text-[10px] font-bold text-gold', isArabic ? 'tracking-[0.14em]' : 'tracking-[0.3em] uppercase')}>
                      03 / SERVICES
                    </p>
                    <h2 className="text-4xl font-serif">{chapters[2].subtitle}</h2>
                    <p className="mt-2 max-w-2xl text-sm text-ink/66">{chapters[2].description}</p>

                    <div className="relative mt-6 flex-1 overflow-hidden rounded-[1.9rem] border border-ink/10 bg-paper p-6">
                      <AnimatePresence mode="wait">
                        {showServiceFocus && (
                          <motion.div
                            key={services[serviceFocusIndex].title}
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
                            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                          >
                            {(() => {
                              const featured = services[serviceFocusIndex];
                              const Icon = featured.icon;
                              return (
                                <div className={cn('relative flex h-full flex-col justify-end overflow-hidden rounded-[1.5rem] border p-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)]', featured.border)}>
                                  <div className={cn('absolute inset-x-0 top-0 h-44 bg-gradient-to-b', featured.accent)} />
                                  <div className="relative z-10">
                                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-paper/70 text-gold">
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-4xl font-serif">{featured.title}</h3>
                                    <p className="mt-3 max-w-xl text-base text-ink/66">{featured.description}</p>
                                  </div>
                                </div>
                              );
                            })()}
                          </motion.div>
                        )}

                        {showServiceGrid && (
                          <motion.div
                            key="services-grid"
                            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid h-full grid-cols-2 gap-3"
                          >
                            {services.map((service, index) => {
                              const Icon = service.icon;
                              return (
                                <motion.div
                                  key={service.title}
                                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05, duration: 0.3 }}
                                  className={cn('relative overflow-hidden rounded-2xl border p-4 min-h-[180px]', service.border)}
                                >
                                  <div className={cn('absolute inset-x-0 top-0 h-16 bg-gradient-to-b', service.accent)} />
                                  <div className="relative z-10 flex h-full flex-col">
                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-paper/70 text-gold">
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-xl font-serif leading-tight">{service.title}</h3>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 0}
              className="rounded-full border border-ink/15 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink/65 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isArabic ? 'السابق' : 'Back'}
            </button>
            <p className="text-[10px] uppercase tracking-[0.26em] text-ink/45">{isArabic ? 'اضغط على الإطار للمتابعة' : 'Click frame to continue'}</p>
            <button
              type="button"
              onClick={nextStep}
              disabled={step === TOTAL_STEPS - 1}
              className="rounded-full border border-ink/15 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ink/65 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isArabic ? 'التالي' : 'Next'}
            </button>
          </div>

          <div className="mt-4 h-1 rounded-full bg-ink/10">
            <motion.div className="h-full rounded-full bg-gold" style={{ width: `${Math.round((step / (TOTAL_STEPS - 1)) * 100)}%` }} />
=======
                  </motion.div>
                </Reveal>
              );
            })}
>>>>>>> parent of 2ed1f1b (Compact services grid cards and mirror hero card for Arabic)
          </div>
        </div>
      </section>

      <section className="relative bg-paper py-24 md:py-32 text-ink overflow-hidden">
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:block" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-end gap-8', isArabic && 'md:flex-row-reverse md:items-start')}>
            <div className={cn('max-w-2xl', isArabic && 'text-right')}>
              <Reveal>
                <span className={cn('mb-6 block text-[11px] font-bold text-gold', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
                  {copy.landing.methodology}
                </span>
              </Reveal>
              <MaskedReveal>
                <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] text-ink">
                  {copy.landing.methodologyTitle} <br />
                  <span className="italic text-gold">{copy.landing.methodologyAccent}</span>
                </h2>
              </MaskedReveal>
            </div>

            <Reveal delay={0.08}>
              <Link
                to="/dashboard"
                className={cn(
                  'inline-flex items-center gap-3 border-b border-gold/50 pb-2 text-[11px] font-bold text-ink hover:text-gold transition-colors',
                  isArabic ? 'tracking-[0.15em]' : 'uppercase tracking-[0.3em]',
                )}
              >
                {copy.landing.secondaryCta}
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {copy.landing.process.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.08} className={cn(isArabic && 'text-right')}>
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="relative h-full rounded-[2rem] border border-ink/7 bg-white px-7 py-8 shadow-[0_18px_45px_rgba(10,10,10,0.06)]"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-ink/25">{item.step}</span>
                    <span className="h-3 w-3 rounded-full bg-gold" />
                  </div>
                  <h3 className="mb-4 text-3xl font-serif text-ink">{item.title}</h3>
                  <p className="text-sm md:text-base text-ink/58 leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink py-24 md:py-32 text-paper overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.14),_transparent_42%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[3rem] border border-paper/10 bg-paper/[0.04] px-8 py-14 md:px-14 md:py-18 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.28)] text-center">
            <MaskedReveal>
              <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] mb-8">
                {copy.landing.finalTitle} <br />
                <span className="italic text-gold">{copy.landing.finalAccent}</span>
              </h2>
            </MaskedReveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-paper/64 leading-relaxed">
                {copy.landing.finalDescription}
              </p>
              <MotionLink
                to="/book"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-12 py-6 text-[11px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_30px_90px_rgba(212,175,55,0.2)]"
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -3, 0],
                        boxShadow: [
                          '0 30px 90px rgba(212,175,55,0.18)',
                          '0 36px 110px rgba(212,175,55,0.28)',
                          '0 30px 90px rgba(212,175,55,0.18)',
                        ],
                      }
                }
                transition={reduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                {copy.nav.booking}
                <ArrowRight className={cn('h-4 w-4 transition-transform', isArabic ? 'rotate-180 group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5')} />
              </MotionLink>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
