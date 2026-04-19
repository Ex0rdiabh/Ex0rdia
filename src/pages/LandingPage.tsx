import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarRange,
  Camera,
  Clapperboard,
  PenTool,
  Sparkles,
  Target,
  Layers3,
  CheckCircle2,
} from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import heroImage from '../assets/hero-new.jpg';

const MotionLink = motion(Link);
const TOTAL_STEPS = 9;

type ServiceTone = {
  title: string;
  description: string;
  icon: typeof Clapperboard;
  accent: string;
  border: string;
};

const SERVICE_ITEMS: Record<'en' | 'ar', ServiceTone[]> = {
  en: [
    {
      title: 'Videography',
      description: 'Cinematic captures crafted for modern brands and campaigns.',
      icon: Clapperboard,
      accent: 'from-[#d4af37]/45 via-[#d4af37]/10 to-transparent',
      border: 'border-gold/25',
    },
    {
      title: 'Photography',
      description: 'Editorial-grade photos for products, teams, and experiences.',
      icon: Camera,
      accent: 'from-white/35 via-white/10 to-transparent',
      border: 'border-paper/20',
    },
    {
      title: 'Graphic Design',
      description: 'Distinct visual systems that elevate every touchpoint.',
      icon: PenTool,
      accent: 'from-[#8f887f]/45 via-[#8f887f]/12 to-transparent',
      border: 'border-[#8f887f]/30',
    },
    {
      title: 'Event Support / Creative Production',
      description: 'On-ground coordination and premium creative delivery.',
      icon: CalendarRange,
      accent: 'from-[#e5c76b]/40 via-[#e5c76b]/12 to-transparent',
      border: 'border-[#e5c76b]/28',
    },
  ],
  ar: [
    {
      title: 'تصوير الفيديو',
      description: 'لقطات سينمائية مصممة للعلامات الحديثة والحملات النوعية.',
      icon: Clapperboard,
      accent: 'from-[#d4af37]/45 via-[#d4af37]/10 to-transparent',
      border: 'border-gold/25',
    },
    {
      title: 'التصوير الفوتوغرافي',
      description: 'صور احترافية للمنتجات والفرق والتجارب.',
      icon: Camera,
      accent: 'from-white/35 via-white/10 to-transparent',
      border: 'border-paper/20',
    },
    {
      title: 'التصميم الجرافيكي',
      description: 'هوية بصرية متكاملة ترفع جودة كل نقطة تواصل.',
      icon: PenTool,
      accent: 'from-[#8f887f]/45 via-[#8f887f]/12 to-transparent',
      border: 'border-[#8f887f]/30',
    },
    {
      title: 'دعم الفعاليات / الإنتاج الإبداعي',
      description: 'تنسيق ميداني وتنفيذ إبداعي راقٍ من البداية للنهاية.',
      icon: CalendarRange,
      accent: 'from-[#e5c76b]/40 via-[#e5c76b]/12 to-transparent',
      border: 'border-[#e5c76b]/28',
    },
  ],
};

export default function LandingPage() {
  const { copy, isArabic, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const services = SERVICE_ITEMS[language];
  const serviceFocusIndex = Math.min(services.length - 1, Math.max(0, step - 2));
  const showServiceFocus = step >= 2 && step <= 5;
  const showServiceGrid = step === 6;

  const activeChapter =
    step <= 0
      ? 0
      : step === 1
        ? 1
        : step <= 6
          ? 2
          : step === 7
            ? 3
            : 4;

  const chapterNav = [
    { key: 'hero', label: isArabic ? 'المقدمة' : 'Intro', at: 0, path: '/' },
    { key: 'why', label: isArabic ? 'لماذا' : 'Why', at: 1, path: '/about' },
    { key: 'services', label: isArabic ? 'الخدمات' : 'Services', at: 2, path: '/vision' },
    { key: 'methodology', label: isArabic ? 'المنهجية' : 'Method', at: 7, path: '/dashboard' },
    { key: 'cta', label: isArabic ? 'الحجز' : 'Book', at: 8, path: '/book' },
  ] as const;

  const titleBase = 'text-[clamp(2.4rem,7vw,5.5rem)] font-serif leading-[0.9] tracking-[-0.03em]';

  const goToStep = (next: number) => setStep(Math.max(0, Math.min(TOTAL_STEPS - 1, next)));
  const nextStep = () => goToStep(step + 1);
  const prevStep = () => goToStep(step - 1);

  const chapters = useMemo(
    () => [
      {
        key: 'hero',
        title: 'Exordia',
        subtitle: 'fresh minds… bigger impact',
        description: copy.landing.description,
        icon: Sparkles,
      },
      {
        key: 'why',
        title: isArabic ? 'لماذا Exordia' : 'Why Exordia',
        subtitle: isArabic ? 'حل إبداعي أوضح. تنفيذ أسرع. أثر أقوى.' : 'Clearer creative starts. Faster execution. Stronger outcomes.',
        description:
          isArabic
            ? 'نجمع المواهب الشابة مع احتياجك التجاري في تجربة احترافية سهلة، لتبدأ بثقة وتصل لنتيجة ملموسة.'
            : 'We pair fresh creative minds with business-ready execution so you can move from brief to impact with confidence.',
        icon: Target,
      },
      {
        key: 'services',
        title: copy.landing.explore,
        subtitle: isArabic ? 'خدمات مصممة للتأثير' : 'Services designed for impact',
        description: isArabic
          ? 'اضغط داخل الإطار للتنقّل بين الخدمات واحدة تلو الأخرى.'
          : 'Click inside the frame to move through each service one-by-one.',
        icon: Layers3,
      },
      {
        key: 'methodology',
        title: copy.landing.methodology,
        subtitle: isArabic ? 'منهج واضح من الفكرة إلى التنفيذ' : 'A structured flow from brief to delivery',
        description: isArabic
          ? 'نبدأ برؤية واضحة، نطابقك مع الفريق المناسب، ننفّذ بدقة، ونقيس الأثر.'
          : 'We align on your goal, match the right creative team, execute with precision, then optimize for measurable impact.',
        icon: CheckCircle2,
      },
      {
        key: 'cta',
        title: 'Exordia',
        subtitle: 'fresh minds… bigger impact',
        description: copy.landing.finalDescription,
        icon: Sparkles,
      },
    ],
    [copy.landing.description, copy.landing.explore, copy.landing.finalDescription, copy.landing.methodology, isArabic],
  );

  if (!isDesktop) {
    return (
      <div className="bg-paper text-ink px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;
            return (
              <section
                key={chapter.key}
                className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-[0_18px_45px_rgba(10,10,10,0.08)]"
              >
                <div className={cn('mb-5 flex items-center gap-3 text-gold', isArabic && 'flex-row-reverse')}>
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] uppercase tracking-[0.32em]">0{index + 1}</span>
                </div>
                <h2 className={cn('text-4xl font-serif leading-tight', isArabic && 'text-right')}>{chapter.title}</h2>
                <p className={cn('mt-3 text-base text-ink/75', isArabic && 'text-right')}>{chapter.subtitle}</p>
                <p className={cn('mt-4 text-sm leading-relaxed text-ink/62', isArabic && 'text-right')}>{chapter.description}</p>

                {chapter.key === 'services' && (
                  <div className="mt-6 grid gap-3">
                    {services.map((service) => {
                      const ServiceIcon = service.icon;
                      return (
                        <div key={service.title} className={cn('rounded-2xl border bg-paper p-4', service.border)}>
                          <div className={cn('mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink/[0.04] text-gold')}>
                            <ServiceIcon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-serif">{service.title}</h3>
                          <p className="mt-2 text-sm text-ink/70">{service.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {chapter.key === 'cta' && (
                  <MotionLink
                    to="/book"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-ink"
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    {copy.nav.booking}
                    <ArrowRight className={cn('h-4 w-4', isArabic && 'rotate-180')} />
                  </MotionLink>
                )}
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-paper px-4 pb-10 pt-28 text-ink sm:px-8" onClick={nextStep}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative z-10 flex h-[82vh] w-full flex-col overflow-hidden rounded-[2.7rem] border border-ink/10 bg-white/95 p-8 shadow-[0_30px_90px_rgba(10,10,10,0.12)] lg:p-12">
          <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-ink/58">
            <span>Exordia</span>
            <span>{Math.round((step / (TOTAL_STEPS - 1)) * 100)}%</span>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: step <= 1 ? 1 : 0, scale: step <= 1 ? 1 : 0.9 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute right-16 top-12 z-20 h-44 w-72 overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_12px_25px_rgba(0,0,0,0.08)]"
          >
            <img src={heroImage} alt="Exordia hero boys" className="h-full w-full scale-[1.48] object-cover object-[10%_22%]" />
          </motion.div>

          <div className={cn('mb-4 flex flex-wrap items-center gap-2', isArabic && 'justify-end')} onClick={(e) => e.stopPropagation()}>
            {chapterNav.map((chapter, index) => {
              const isActive = activeChapter === index;
              return (
                <Link
                  key={chapter.key}
                  to={chapter.path}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToStep(chapter.at);
                  }}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors',
                    isActive ? 'border-gold bg-gold/12 text-ink' : 'border-ink/15 bg-white text-ink/65 hover:border-gold/40 hover:text-ink',
                  )}
                >
                  {chapter.label}
                </Link>
              );
            })}
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.article
                key={`step-${step}`}
                initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.97 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {activeChapter !== 2 && (
                  <div className={cn('flex h-full flex-col justify-between', isArabic && 'text-right')}>
                    <div>
                      <p className={cn('mb-3 text-[10px] font-bold text-gold', isArabic ? 'tracking-[0.14em]' : 'tracking-[0.28em] uppercase')}>
                        {activeChapter === 1
                          ? '02 / WHY EXORDIA'
                          : activeChapter === 3
                            ? '04 / THE METHODOLOGY'
                            : activeChapter === 4
                              ? '05 / START BOOKING'
                              : '01 / EXORDIA'}
                      </p>
                      <h1 className={titleBase}>{chapters[activeChapter].title}</h1>
                      <p className="mt-3 text-2xl font-serif italic text-gold">{chapters[activeChapter].subtitle}</p>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/64">{chapters[activeChapter].description}</p>
                    </div>

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
                                    <p className="mt-2 text-xs leading-relaxed text-ink/65">{service.description}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
