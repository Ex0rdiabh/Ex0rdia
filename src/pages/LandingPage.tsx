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
  Shield,
  Clock,
  Star,
} from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import heroImage from '../assets/hero-new.jpg';
import Reveal from '../components/landing/Reveal';

const MotionLink = motion(Link);

// We define the total number of sub-steps in the interaction
// 0: Hero
// 1: Why Exordia
// 2-5: Services (4 items)
// 6: Services Summary
// 7: Methodology
// 8: Final CTA
const TOTAL_STEPS = 9;

type ServiceItem = {
  title: string;
  description: string;
  icon: typeof Clapperboard;
  accent: string;
  border: string;
};

const SERVICE_ITEMS: Record<'en' | 'ar', ServiceItem[]> = {
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
      title: 'Event Management',
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
      title: 'إدارة الفعاليات',
      description: 'تنسيق ميداني وتنفيذ إبداعي راقٍ من البداية للنهاية.',
      icon: CalendarRange,
      accent: 'from-[#e5c76b]/40 via-[#e5c76b]/12 to-transparent',
      border: 'border-[#e5c76b]/28',
    },
  ],
};

const PHILOSOPHY_ICONS = [Shield, Clock, Star] as const;

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

  // Mapping steps to active "chapter" index (0-4)
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

  const goToStep = (next: number) => setStep(Math.max(0, Math.min(TOTAL_STEPS - 1, next)));
  const nextStep = () => goToStep(step + 1);
  const prevStep = () => goToStep(step - 1);

  // Swipe gesture for mobile
  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      isArabic ? prevStep() : nextStep();
    } else if (info.offset.x > swipeThreshold) {
      isArabic ? nextStep() : prevStep();
    }
  };

  const chapters = useMemo(
    () => [
      {
        key: 'hero',
        title: 'Exordia',
        subtitle: isArabic ? 'عقول جديدة... أثر أكبر' : 'fresh minds… bigger impact',
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
          ? 'تصفح خدماتنا المتنوعة المصممة لتلبية احتياجاتك الإبداعية.'
          : 'Browse our diverse services tailored to meet your creative needs.',
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
        subtitle: isArabic ? 'عقول جديدة... أثر أكبر' : 'fresh minds… bigger impact',
        description: copy.landing.finalDescription,
        icon: Sparkles,
      },
    ],
    [copy.landing.description, copy.landing.explore, copy.landing.finalDescription, copy.landing.methodology, isArabic],
  );

  const serviceFocusIndex = Math.min(services.length - 1, Math.max(0, step - 2));
  const showServiceFocus = step >= 2 && step <= 5;
  const showServiceGrid = step === 6;

  return (
    <div className="min-h-screen bg-ink text-paper selection:bg-gold/30">
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-40 pb-20 lg:py-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_45%),linear-gradient(180deg,_rgba(245,242,237,0.02)_0%,_rgba(10,10,10,0)_30%,_rgba(10,10,10,0.95)_100%)]" />

        <div className="relative z-10 w-full max-w-6xl">
          {/* Header Progress Indicator */}
          <div className={cn("mb-6 flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-[0.4em] text-paper/40", isArabic && "flex-row-reverse")}>
            <div className={cn("flex items-center gap-3", isArabic && "flex-row-reverse")}>
              <div className="h-px w-8 bg-gold/50" />
              <span>{isArabic ? 'إيكسورديا' : 'Exordia'}</span>
            </div>
            <span className="hidden md:block">{Math.round((step / (TOTAL_STEPS - 1)) * 100)}%</span>
          </div>

          <motion.div
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-paper/10 bg-ink/40 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:aspect-square lg:aspect-video lg:h-[70vh] touch-none"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onClick={() => { if (isDesktop) nextStep(); }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter + (activeChapter === 2 ? `-${step}` : '')}
                initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {activeChapter === 0 && (
                  <div className="absolute inset-0">
                    <motion.img
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.4 }}
                      transition={{ duration: 1.5 }}
                      src={heroImage}
                      alt="Exordia"
                      className="h-full w-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  </div>
                )}

                <div className="relative h-full w-full p-8 lg:p-16">
                  <div className="flex h-full flex-col justify-end lg:justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className={cn("max-w-2xl", isArabic && "text-right ml-auto")}
                    >
                      <div className={cn("mb-6 flex items-center gap-3", isArabic && "flex-row-reverse")}>
                        <div className="h-px w-10 bg-gold" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                          0{activeChapter + 1} / 05
                        </span>
                      </div>

                      <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl leading-[0.9] text-paper">
                        {chapters[activeChapter].title}
                        {chapters[activeChapter].key === 'hero' && (
                          <span className="block mt-2 text-2xl sm:text-4xl lg:text-5xl italic text-gold">
                            {chapters[activeChapter].subtitle}
                          </span>
                        )}
                      </h1>

                      {chapters[activeChapter].key !== 'hero' && (
                        <h2 className="mt-4 font-serif text-xl sm:text-3xl lg:text-4xl italic text-gold">
                          {chapters[activeChapter].subtitle}
                        </h2>
                      )}

                      <p className="mt-4 sm:mt-8 text-base sm:text-xl font-light leading-relaxed text-paper/70 lg:max-w-xl">
                        {chapters[activeChapter].description}
                      </p>

                      {/* Service Content inside the box */}
                      {activeChapter === 2 && (
                        <div className="mt-6 sm:mt-10">
                          {showServiceFocus && (
                            <motion.div
                              key={services[serviceFocusIndex].title}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={cn("max-w-md rounded-3xl border border-paper/10 bg-paper/5 p-6 backdrop-blur-md", services[serviceFocusIndex].border, isArabic && "ml-auto")}
                            >
                              {(() => {
                                const s = services[serviceFocusIndex];
                                const Icon = s.icon;
                                return (
                                  <>
                                    <Icon className={cn("h-6 w-6 text-gold mb-4", isArabic && "ml-auto")} />
                                    <h3 className="text-xl font-serif mb-2">{s.title}</h3>
                                    <p className="text-sm text-paper/60">{s.description}</p>
                                  </>
                                );
                              })()}
                            </motion.div>
                          )}

                          {showServiceGrid && (
                            <motion.div
                              key="grid"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                            >
                              {services.map(s => (
                                <div key={s.title} className={cn("rounded-2xl border border-paper/10 bg-paper/5 p-4", s.border)}>
                                  <s.icon className={cn("h-5 w-5 text-gold mb-3", isArabic && "ml-auto")} />
                                  <h4 className="text-sm font-serif">{s.title}</h4>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* Methodology content inside the box */}
                      {activeChapter === 3 && (
                        <div className="mt-6 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {copy.landing.process.map((item) => (
                            <div key={item.step} className="rounded-2xl border border-paper/10 bg-paper/5 p-4">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">{item.step}</span>
                              <h4 className="text-sm font-serif mt-1">{item.title}</h4>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeChapter === 4 && (
                        <div className="mt-10">
                          <MotionLink
                            to="/book"
                            className="group inline-flex items-center gap-4 rounded-full bg-gold px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {copy.nav.booking}
                            <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-2", isArabic && "rotate-180 group-hover:-translate-x-2")} />
                          </MotionLink>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Overlay for Desktop (Invisible clickable areas) */}
            {isDesktop && (
              <div className="absolute inset-0 flex pointer-events-none">
                <div className="h-full w-1/3 cursor-w-resize pointer-events-auto" onClick={(e) => { e.stopPropagation(); prevStep(); }} />
                <div className="h-full w-2/3 cursor-e-resize pointer-events-auto" />
              </div>
            )}
          </motion.div>

          {/* Mobile & Tablet Navigation Controls */}
          <div className={cn("mt-8 flex items-center justify-between gap-6 lg:hidden", isArabic && "flex-row-reverse")}>
            <button
              onClick={(e) => { e.stopPropagation(); isArabic ? nextStep() : prevStep(); }}
              disabled={isArabic ? step === TOTAL_STEPS - 1 : step === 0}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/10 bg-paper/5 text-paper/60 backdrop-blur-xl transition-all active:scale-95 disabled:opacity-20"
            >
              <ArrowRight className={cn("h-6 w-6", isArabic ? "" : "rotate-180")} />
            </button>

            <div className="flex-1 h-px bg-paper/10">
              <motion.div
                className="h-full bg-gold"
                initial={false}
                animate={{ width: `${(step / (TOTAL_STEPS - 1)) * 100}%` }}
              />
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); isArabic ? prevStep() : nextStep(); }}
              disabled={isArabic ? step === 0 : step === TOTAL_STEPS - 1}
              aria-label="Next step"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink transition-all active:scale-95 disabled:opacity-20"
            >
              <ArrowRight className={cn("h-6 w-6", isArabic ? "rotate-180" : "")} />
            </button>
          </div>

          {/* Desktop Pagination Tabs */}
          <div className={cn("mt-8 hidden lg:flex items-center justify-center gap-12", isArabic && "flex-row-reverse")}>
            {chapters.map((ch, idx) => (
              <button
                key={ch.key}
                onClick={(e) => { e.stopPropagation(); goToStep(idx === 0 ? 0 : idx === 1 ? 1 : idx === 2 ? 2 : idx === 3 ? 7 : 8); }}
                className={cn(
                  "relative text-[10px] font-bold uppercase tracking-[0.3em] transition-colors",
                  activeChapter === idx ? "text-gold" : "text-paper/30 hover:text-paper/60"
                )}
              >
                {ch.title}
                {activeChapter === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-ink py-32 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.landing.philosophy.map((item, i) => {
              const Icon = PHILOSOPHY_ICONS[i];
              return (
                <div key={item.title}>
                  <Reveal delay={i * 0.1}>
                    <div className={cn("group rounded-[2.5rem] border border-paper/10 bg-white/[0.03] p-10 backdrop-blur-sm transition-all hover:border-gold/30", isArabic && "text-right")}>
                      <div className={cn("mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold group-hover:scale-110 transition-transform", isArabic && "ml-auto")}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-serif mb-4 text-paper">{item.title}</h3>
                      <p className="text-paper/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Detailed Section */}
      <section className="bg-paper py-32 px-4">
        <div className="mx-auto max-w-7xl">
          <div className={cn("mb-16", isArabic && "text-right")}>
            <Reveal>
              <span className="text-gold font-bold uppercase tracking-widest text-sm">{copy.landing.methodology}</span>
              <h2 className="text-ink text-4xl sm:text-6xl font-serif mt-4">{copy.landing.methodologyTitle} <span className="italic text-gold">{copy.landing.methodologyAccent}</span></h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {copy.landing.process.map((item, i) => (
              <div key={item.step}>
                <Reveal delay={i * 0.1}>
                  <div className={cn("p-8 rounded-3xl border border-ink/5 bg-ink/[0.02]", isArabic && "text-right")}>
                    <span className="text-gold font-bold text-lg">{item.step}</span>
                    <h3 className="text-ink text-2xl font-serif mt-4 mb-2">{item.title}</h3>
                    <p className="text-ink/60">{item.desc}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
