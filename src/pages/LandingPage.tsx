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
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import heroImage from '../assets/hero-new.jpg';

const MotionLink = motion(Link);

const CHAPTER_RANGES = {
  hero: [0, 0.12],
  why: [0.12, 0.3],
  services: [0.3, 0.66],
  methodology: [0.66, 0.84],
  cta: [0.84, 1],
} as const;

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

function chapterProgress(progress: number, start: number, end: number) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

export default function LandingPage() {
  const { copy, isArabic, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.22,
  });

  useMotionValueEvent(easedProgress, 'change', (latest) => {
    setProgress(Math.min(1, Math.max(0, latest)));
  });

  const services = SERVICE_ITEMS[language];
  const servicesLocalProgress = chapterProgress(progress, CHAPTER_RANGES.services[0], CHAPTER_RANGES.services[1]);
  const revealedCount = Math.min(services.length, Math.floor(servicesLocalProgress * (services.length + 0.25)) + 1);
  const showServicesGrid = servicesLocalProgress > 0.82;

  const chapters = useMemo(
    () => [
      {
        key: 'hero',
        title: 'Exordia',
        subtitle: isArabic ? 'fresh minds… bigger impact' : 'fresh minds… bigger impact',
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
          ? 'تتقدّم كل خدمة بشكل مستقل، ثم تجتمع في مشهد موحّد يعكس القوة الكاملة لـ Exordia.'
          : 'Each service takes the stage, then resolves into one complete offering inside a single premium frame.',
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
        subtitle: isArabic ? 'fresh minds… bigger impact' : 'fresh minds… bigger impact',
        description: copy.landing.finalDescription,
        icon: Sparkles,
      },
    ],
    [copy.landing.description, copy.landing.explore, copy.landing.finalDescription, copy.landing.methodology, isArabic],
  );

  const activeChapter =
    progress < CHAPTER_RANGES.why[0]
      ? 0
      : progress < CHAPTER_RANGES.services[0]
        ? 1
        : progress < CHAPTER_RANGES.methodology[0]
          ? 2
          : progress < CHAPTER_RANGES.cta[0]
            ? 3
            : 4;

  const titleBase = 'text-[clamp(3rem,10vw,8rem)] font-serif leading-[0.86] tracking-[-0.03em]';
  const chapterNav = [
    { key: 'hero', label: isArabic ? 'المقدمة' : 'Intro', at: CHAPTER_RANGES.hero[0] },
    { key: 'why', label: isArabic ? 'لماذا' : 'Why', at: CHAPTER_RANGES.why[0] },
    { key: 'services', label: isArabic ? 'الخدمات' : 'Services', at: CHAPTER_RANGES.services[0] },
    { key: 'methodology', label: isArabic ? 'المنهجية' : 'Method', at: CHAPTER_RANGES.methodology[0] },
    { key: 'cta', label: isArabic ? 'الحجز' : 'Book', at: CHAPTER_RANGES.cta[0] },
  ] as const;

  const jumpToChapter = (chapterStart: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollDistance = Math.max(0, sectionRef.current.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: sectionTop + scrollDistance * chapterStart,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

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
    <section ref={sectionRef} className="relative h-[430vh] bg-paper text-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(245,242,237,0.98)_84%)]" />

        <div className="relative z-10 flex h-[78vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2.7rem] border border-ink/10 bg-white/95 p-8 shadow-[0_30px_90px_rgba(10,10,10,0.12)] lg:p-12">
          <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-ink/58">
            <span>Exordia</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className={cn('mb-6 flex flex-wrap items-center gap-2', isArabic && 'justify-end')}>
            {chapterNav.map((chapter, index) => {
              const isActive = activeChapter === index;
              return (
                <button
                  key={chapter.key}
                  type="button"
                  onClick={() => jumpToChapter(chapter.at)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors',
                    isActive ? 'border-gold bg-gold/12 text-ink' : 'border-ink/15 bg-white text-ink/65 hover:border-gold/40 hover:text-ink',
                  )}
                >
                  {chapter.label}
                </button>
              );
            })}
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.article
                key={chapters[activeChapter].key}
                initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, scale: 0.985 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {activeChapter !== 2 && (
                  <div className={cn('flex h-full flex-col justify-between', isArabic && 'text-right')}>
                    <div>
                      <p className={cn('mb-4 text-[10px] font-bold text-gold', isArabic ? 'tracking-[0.14em]' : 'tracking-[0.32em] uppercase')}>
                        {chapters[activeChapter].key === 'why'
                          ? '02 / WHY EXORDIA'
                          : chapters[activeChapter].key === 'methodology'
                            ? '04 / THE METHODOLOGY'
                            : chapters[activeChapter].key === 'cta'
                              ? '05 / START BOOKING'
                              : '01 / EXORDIA'}
                      </p>
                      <h1 className={titleBase}>{chapters[activeChapter].title}</h1>
                      <p className="mt-4 text-3xl font-serif italic text-gold">{chapters[activeChapter].subtitle}</p>
                      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/64">{chapters[activeChapter].description}</p>
                    </div>

                    {activeChapter === 0 && (
                      <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-ink/10 bg-paper shadow-[0_22px_50px_rgba(10,10,10,0.08)]">
                        <div className="grid grid-cols-[1.1fr_0.9fr] items-stretch">
                          <img
                            src={heroImage}
                            alt="Exordia creative hero"
                            className="h-[250px] w-full scale-[1.18] object-cover object-[28%_24%]"
                          />
                          <div className="flex flex-col justify-center p-6">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{copy.landing.eyebrow}</p>
                            <p className="mt-3 text-xl font-serif">{copy.landing.primaryCta}</p>
                            <p className="mt-2 text-sm leading-relaxed text-ink/62">{copy.landing.description}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeChapter === 3 && (
                      <div className="grid grid-cols-4 gap-4 pt-10">
                        {copy.landing.process.map((item) => (
                          <div key={item.step} className="rounded-2xl border border-ink/10 bg-paper p-4">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{item.step}</p>
                            <h3 className="mt-2 text-xl font-serif">{item.title}</h3>
                            <p className="mt-2 text-sm text-ink/66">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeChapter === 4 && (
                      <div className={cn('pt-10', isArabic && 'flex justify-end')}>
                        <MotionLink
                          to="/book"
                          className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-12 py-5 text-[11px] font-bold uppercase tracking-[0.28em] text-ink shadow-[0_24px_80px_rgba(212,175,55,0.24)]"
                          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                        >
                          {copy.nav.booking}
                          <ArrowRight
                            className={cn(
                              'h-4 w-4 transition-transform',
                              isArabic ? 'rotate-180 group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5',
                            )}
                          />
                        </MotionLink>
                      </div>
                    )}
                  </div>
                )}

                {activeChapter === 2 && (
                  <div className={cn('flex h-full flex-col', isArabic && 'text-right')}>
                    <p className={cn('mb-4 text-[10px] font-bold text-gold', isArabic ? 'tracking-[0.14em]' : 'tracking-[0.32em] uppercase')}>
                      03 / SERVICES
                    </p>
                    <h2 className="text-5xl font-serif">{chapters[2].subtitle}</h2>
                    <p className="mt-3 max-w-3xl text-ink/68">{chapters[2].description}</p>

                    <div className="relative mt-8 flex-1 overflow-hidden rounded-[1.9rem] border border-ink/10 bg-paper p-6">
                      <AnimatePresence mode="wait">
                        {!showServicesGrid ? (
                          <motion.div
                            key={services[Math.max(0, revealedCount - 1)].title}
                            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                          >
                            {(() => {
                              const featured = services[Math.max(0, revealedCount - 1)];
                              const Icon = featured.icon;
                              return (
                                <div
                                  className={cn(
                                    'relative flex h-full flex-col justify-end overflow-hidden rounded-[1.5rem] border p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)]',
                                    featured.border,
                                  )}
                                >
                                  <div className={cn('absolute inset-x-0 top-0 h-44 bg-gradient-to-b', featured.accent)} />
                                  <div className="relative z-10">
                                    <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-paper/14 bg-paper/8 text-gold">
                                      <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-5xl font-serif">{featured.title}</h3>
                                    <p className="mt-4 max-w-2xl text-lg text-ink/66">{featured.description}</p>
                                  </div>
                                </div>
                              );
                            })()}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="services-grid"
                            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.46 }}
                            className="grid h-full grid-cols-2 gap-4"
                          >
                            {services.map((service, index) => {
                              const Icon = service.icon;
                              return (
                                <motion.div
                                  key={service.title}
                                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.06, duration: 0.35 }}
                                  className={cn('relative overflow-hidden rounded-2xl border p-5', service.border)}
                                >
                                  <div className={cn('absolute inset-x-0 top-0 h-20 bg-gradient-to-b', service.accent)} />
                                  <div className="relative z-10">
                                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-paper/12 bg-paper/8 text-gold">
                                      <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-2xl font-serif leading-tight">{service.title}</h3>
                                    <p className="mt-2 text-sm text-ink/65">{service.description}</p>
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

          <div className="mt-8 h-1 rounded-full bg-ink/10">
            <motion.div className="h-full rounded-full bg-gold" style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
