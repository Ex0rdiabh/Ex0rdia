import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarRange,
  Camera,
  Clapperboard,
  Layers3,
  MessageSquareText,
  PenTool,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import heroImage from '../assets/hero-new.jpg';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import Reveal from '../components/landing/Reveal';
import MaskedReveal from '../components/landing/MaskedReveal';

const MotionLink = motion(Link);
const SERVICE_ICONS = [Clapperboard, PenTool, Camera, CalendarRange] as const;
const JOURNEY_ICONS = [MessageSquareText, Layers3, Sparkles] as const;

const LANDING_ENHANCEMENTS = {
  en: {
    stageLabel: 'Presentation Flow',
    stageTitle: 'A premium first impression, revealed scene by scene',
    stageDescription:
      'The landing page now moves like a curated presentation: strong framing, soft transitions, and a story that guides the visitor naturally toward booking.',
    stagePanels: [
      {
        title: 'Brief Alignment',
        body: 'The first interaction should reduce uncertainty, not create more of it.',
      },
      {
        title: 'Creative Match',
        body: 'Exordia connects the project to the right discipline with calm, visual confidence.',
      },
      {
        title: 'Booking Momentum',
        body: 'Each section should build desire and clarity before the final call to action appears.',
      },
    ],
    servicesLabel: 'Services Preview',
    servicesTitle: 'Each discipline enters like its own scene',
    servicesDescription:
      'Rather than feeling like identical cards, the service previews now read like distinct creative directions inside one premium system.',
    services: [
      {
        title: 'Videography',
        cue: 'Cinematic motion',
        description:
          'Launch edits, campaign pieces, and story-led production framed with movement and pace.',
        accent: 'from-[#d4af37]/55 via-[#d4af37]/14 to-transparent',
        border: 'border-gold/20',
        glow: 'shadow-[0_24px_80px_rgba(212,175,55,0.12)]',
      },
      {
        title: 'Graphic Design',
        cue: 'Structured identity',
        description:
          'Visual systems, social kits, decks, and brand assets shaped with sharper hierarchy.',
        accent: 'from-white/30 via-white/8 to-transparent',
        border: 'border-paper/12',
        glow: 'shadow-[0_24px_70px_rgba(255,255,255,0.06)]',
      },
      {
        title: 'Photography',
        cue: 'Frame and texture',
        description:
          'Editorial imagery, product coverage, and portrait work designed to elevate perception.',
        accent: 'from-[#918b84]/55 via-[#918b84]/12 to-transparent',
        border: 'border-[#918b84]/25',
        glow: 'shadow-[0_24px_70px_rgba(145,139,132,0.12)]',
      },
      {
        title: 'Event Management',
        cue: 'Spatial rhythm',
        description:
          'Planning, coordination, and production support with a more polished guest-facing flow.',
        accent: 'from-[#e5c76b]/55 via-[#e5c76b]/12 to-transparent',
        border: 'border-[#e5c76b]/20',
        glow: 'shadow-[0_24px_70px_rgba(229,199,107,0.12)]',
      },
    ],
    finaleLabel: 'Start The Story',
    finaleTitle: 'Make the booking moment feel like the natural next scene',
    finaleBody:
      'By the time the visitor reaches the final section, the page should feel resolved, clear, and ready for action. That is where the booking button performs best.',
    finaleNote: 'Calm, premium, and conversion-focused from top to bottom.',
  },
  ar: {
    stageLabel: 'تدفق العرض',
    stageTitle: 'انطباع أول راقٍ ينكشف مشهدًا بعد مشهد',
    stageDescription:
      'أصبحت الصفحة الرئيسية تتحرك كعرض مصقول: تأطير قوي، انتقالات ناعمة، وحكاية تقود الزائر طبيعيًا نحو الحجز.',
    stagePanels: [
      {
        title: 'وضوح الطلب',
        body: 'يجب أن تقلل أول تفاعلات الصفحة من التردد بدل أن تضيف تعقيدًا جديدًا.',
      },
      {
        title: 'اختيار التخصص',
        body: 'تربط Exordia المشروع بالخدمة الأنسب بثقة بصرية هادئة وواضحة.',
      },
      {
        title: 'دفع القرار',
        body: 'كل قسم يبني الرغبة والوضوح قبل ظهور دعوة الحجز النهائية.',
      },
    ],
    servicesLabel: 'استعراض الخدمات',
    servicesTitle: 'كل خدمة تدخل الصفحة كأنها مشهد مستقل',
    servicesDescription:
      'بدل أن تبدو البطاقات متشابهة، أصبحت معاينات الخدمات أقرب إلى اتجاهات إبداعية مختلفة داخل نظام Exordia الواحد.',
    services: [
      {
        title: 'تصوير الفيديو',
        cue: 'حركة سينمائية',
        description:
          'أعمال إطلاق، حملات مرئية، ومقاطع سردية مدفوعة بالإيقاع والحركة.',
        accent: 'from-[#d4af37]/55 via-[#d4af37]/14 to-transparent',
        border: 'border-gold/20',
        glow: 'shadow-[0_24px_80px_rgba(212,175,55,0.12)]',
      },
      {
        title: 'التصميم الجرافيكي',
        cue: 'هوية منظمة',
        description:
          'أنظمة بصرية، مواد اجتماعية، عروض، وأصول علامة بهيكل أوضح وتسلسل أقوى.',
        accent: 'from-white/30 via-white/8 to-transparent',
        border: 'border-paper/12',
        glow: 'shadow-[0_24px_70px_rgba(255,255,255,0.06)]',
      },
      {
        title: 'التصوير الفوتوغرافي',
        cue: 'الإطار والملمس',
        description:
          'صور تحريرية، تصوير منتجات، وبورتريه مصمم لرفع قيمة الانطباع البصري.',
        accent: 'from-[#918b84]/55 via-[#918b84]/12 to-transparent',
        border: 'border-[#918b84]/25',
        glow: 'shadow-[0_24px_70px_rgba(145,139,132,0.12)]',
      },
      {
        title: 'إدارة الفعاليات',
        cue: 'إيقاع التجربة',
        description:
          'تخطيط، تنسيق، ودعم تنفيذي يمنح الفعالية تجربة أكثر سلاسة وحضورًا.',
        accent: 'from-[#e5c76b]/55 via-[#e5c76b]/12 to-transparent',
        border: 'border-[#e5c76b]/20',
        glow: 'shadow-[0_24px_70px_rgba(229,199,107,0.12)]',
      },
    ],
    finaleLabel: 'ابدأ الحكاية',
    finaleTitle: 'اجعل لحظة الحجز تبدو وكأنها المشهد الطبيعي التالي',
    finaleBody:
      'عندما يصل الزائر إلى القسم الأخير يجب أن تبدو الصفحة محسومة وواضحة وجاهزة لاتخاذ القرار. هنا تعمل دعوة الحجز بأفضل صورة.',
    finaleNote: 'هادئة، راقية، وموجهة للتحويل من البداية إلى النهاية.',
  },
} as const;

const HERO_CHIPS = {
  en: ['Layered Motion', 'Story-Led Layout', 'Premium Rhythm', 'Focused Booking'],
  ar: ['حركة متعددة الطبقات', 'سرد بصري', 'إيقاع راقٍ', 'تركيز على الحجز'],
} as const;

const HERO_METRICS = {
  en: [
    { label: 'Tone', value: 'Cinematic' },
    { label: 'Pacing', value: 'Measured' },
    { label: 'Experience', value: 'Premium' },
    { label: 'CTA', value: 'Focused' },
  ],
  ar: [
    { label: 'الطابع', value: 'سينمائي' },
    { label: 'الإيقاع', value: 'مدروس' },
    { label: 'التجربة', value: 'راقية' },
    { label: 'الدعوة', value: 'مركزة' },
  ],
} as const;

export default function LandingPage() {
  const { copy, isArabic, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const story = LANDING_ENHANCEMENTS[language];
  const heroChips = HERO_CHIPS[language];
  const heroMetrics = HERO_METRICS[language];

  return (
    <div className="overflow-hidden bg-ink text-paper">
      <section className="relative min-h-screen flex items-center pt-28 pb-18 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_32%),linear-gradient(180deg,_rgba(245,242,237,0.03)_0%,_rgba(10,10,10,0)_24%,_rgba(10,10,10,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,242,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,242,237,0.04)_1px,transparent_1px)] bg-[size:112px_112px] opacity-[0.04] pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none opacity-50">
          <motion.div
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
                  {copy.nav.booking}
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
                  <Sparkles className="h-4 w-4 text-gold" />
                  {copy.landing.secondaryCta}
                </Link>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
              >
                {heroMetrics.map((item) => (
                  <div key={item.label} className="rounded-[1.75rem] border border-paper/10 bg-paper/5 px-5 py-4 backdrop-blur-sm">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-paper/35">{item.label}</p>
                    <p className="text-2xl font-serif text-paper">{item.value}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className={cn('relative lg:h-[760px]', isArabic && 'lg:order-1')}>
              {heroChips.map((chip, index) => (
                <motion.div
                  key={chip}
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
                  {chip}
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
                    transition={{ duration: 1.1, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-[12%] w-[62%] rounded-l-[2rem] border-y border-l border-paper/12 bg-ink/72 px-6 py-6 backdrop-blur-xl"
                  >
                    <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-gold">{story.stageLabel}</p>
                    <p className="text-2xl font-serif leading-[1.05] text-paper/92">{story.stageTitle}</p>
                  </motion.div>

                  <motion.div
                    initial={reduceMotion ? false : { y: 48, opacity: 0 }}
                    animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
                  >
                    <div className="rounded-[2rem] border border-paper/10 bg-ink/58 p-5 backdrop-blur-xl">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-gold">Exordia</p>
                      <p className="text-base md:text-lg font-serif text-paper/90">{story.stageDescription}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-paper py-24 md:py-32 text-ink overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(212,175,55,0.05),transparent_22%,transparent_100%)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-16 xl:gap-24 items-start">
            <div className={cn(isArabic && 'xl:order-2 text-right')}>
              <Reveal>
                <span className={cn('mb-6 block text-[11px] font-bold text-gold', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
                  {story.stageLabel}
                </span>
              </Reveal>
              <MaskedReveal>
                <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] text-ink">{story.stageTitle}</h2>
              </MaskedReveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-2xl text-xl md:text-2xl text-ink/60 leading-[1.7] font-light">
                  {story.stageDescription}
                </p>
              </Reveal>
            </div>

            <div className={cn('grid gap-6', isArabic && 'xl:order-1')}>
              {story.stagePanels.map((panel, index) => {
                const Icon = JOURNEY_ICONS[index];

                return (
                  <Reveal key={panel.title} delay={index * 0.08} className={cn(isArabic && 'text-right')}>
                    <motion.div
                      whileHover={reduceMotion ? undefined : { x: isArabic ? -8 : 8, y: -4 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="group relative overflow-hidden rounded-[2.2rem] border border-ink/8 bg-white px-7 py-8 shadow-[0_18px_45px_rgba(10,10,10,0.06)]"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gold/80" />
                      <div className="relative flex items-start gap-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-gold shadow-[0_16px_40px_rgba(10,10,10,0.14)]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-serif text-ink mb-3">{panel.title}</h3>
                          <p className="text-ink/58 leading-relaxed text-base">{panel.body}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-ink py-24 md:py-32 text-paper overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.16),_transparent_34%)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn('mb-16 md:mb-20 max-w-3xl', isArabic && 'mr-auto text-right')}>
            <Reveal>
              <span className={cn('mb-6 block text-[11px] font-bold text-gold', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
                {story.servicesLabel}
              </span>
            </Reveal>
            <MaskedReveal>
              <h2 className="text-5xl md:text-7xl font-serif leading-[0.95]">{story.servicesTitle}</h2>
            </MaskedReveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg md:text-xl text-paper/62 leading-relaxed max-w-2xl">
                {story.servicesDescription}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {story.services.map((service, index) => {
              const Icon = SERVICE_ICONS[index];

              return (
                <Reveal key={service.title} delay={index * 0.08} className={cn(isArabic && 'text-right')}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -10, scale: 1.012 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={cn(
                      'group relative h-full overflow-hidden rounded-[2.25rem] border bg-white/[0.03] p-7 backdrop-blur-sm',
                      service.border,
                      service.glow,
                    )}
                  >
                    <div className={cn('absolute inset-x-0 top-0 h-32 bg-gradient-to-b opacity-90', service.accent)} />
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-paper/8 opacity-40" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-paper/10 bg-ink/40 text-gold">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-gold/70">{service.cue}</p>
                      <h3 className="mb-4 text-3xl font-serif text-paper">{service.title}</h3>
                      <p className="flex-grow text-paper/60 leading-relaxed text-sm md:text-[15px]">{service.description}</p>
                      <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-paper/40 transition-colors group-hover:text-gold">
                        <span>{copy.landing.explore}</span>
                        <ArrowRight className={cn('h-4 w-4 transition-transform', isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1')} />
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
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
          <div className="rounded-[3rem] border border-paper/10 bg-paper/[0.04] px-8 py-14 md:px-14 md:py-18 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
            <Reveal className="text-center">
              <span className={cn('mb-6 block text-[11px] font-bold text-gold', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
                {story.finaleLabel}
              </span>
            </Reveal>
            <MaskedReveal>
              <h2 className="text-center text-5xl md:text-7xl font-serif leading-[0.95] mb-8">
                {story.finaleTitle}
              </h2>
            </MaskedReveal>
            <Reveal delay={0.08} className="text-center">
              <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl text-paper/64 leading-relaxed">
                {story.finaleBody}
              </p>
              <p className="mb-10 text-[11px] uppercase tracking-[0.3em] text-paper/34">
                {story.finaleNote}
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
