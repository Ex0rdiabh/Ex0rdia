import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarRange,
  Camera,
  Clapperboard,
  PenTool,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import heroImage from '../assets/hero-new.jpg';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import Reveal from '../components/landing/Reveal';

const MotionLink = motion(Link);

const SERVICE_ICONS = [Clapperboard, PenTool, Camera, CalendarRange] as const;

const LANDING_STORY = {
  en: {
    storyEyebrow: 'The Story',
    storyTitle: 'A calmer way to start creative work',
    storyDescription:
      'Exordia is designed to make the first impression feel intentional. A strong brief, a clear match, and a smoother creative start for businesses that want quality without heavy agency friction.',
    serviceEyebrow: 'Services Preview',
    serviceTitle: 'Four disciplines, one polished experience',
    serviceDescription:
      'Each service line enters with its own visual rhythm, while still feeling part of one premium Exordia system.',
    services: [
      {
        title: 'Videography',
        cue: 'Cinematic motion',
        description:
          'Brand films, campaign edits, launch reels, and polished visual storytelling built to move quickly from concept to delivery.',
        accent: 'from-[#d4af37]/55 via-[#d4af37]/16 to-transparent',
        iconSurface: 'bg-[#d4af37]/14 text-gold',
      },
      {
        title: 'Graphic Design',
        cue: 'Brand language',
        description:
          'Identity systems, launch decks, menus, social kits, and refined visual collateral with a sharper strategic feel.',
        accent: 'from-white/35 via-white/10 to-transparent',
        iconSurface: 'bg-white/10 text-paper',
      },
      {
        title: 'Photography',
        cue: 'Frame and texture',
        description:
          'Product shoots, portraits, event coverage, and editorial imagery created to give your brand a stronger visual archive.',
        accent: 'from-[#8e8a83]/45 via-[#8e8a83]/10 to-transparent',
        iconSurface: 'bg-paper/10 text-paper',
      },
      {
        title: 'Event Management',
        cue: 'Experience flow',
        description:
          'Run-of-show planning, supplier coordination, creative supervision, and practical support for events that need polish.',
        accent: 'from-[#e5c76b]/48 via-[#e5c76b]/12 to-transparent',
        iconSurface: 'bg-[#e5c76b]/12 text-gold-light',
      },
    ],
    finaleEyebrow: 'Ready To Begin',
    finaleTitle: 'The right first step should feel effortless',
    finaleDescription:
      'Move from idea to action with a concise brief, a premium first impression, and a booking path that feels clear from the very first click.',
    finaleCaption: 'Designed for fast-moving brands and startup teams that still want polish.',
  },
  ar: {
    storyEyebrow: 'الحكاية',
    storyTitle: 'طريقة أكثر هدوءًا لبدء العمل الإبداعي',
    storyDescription:
      'صُممت Exordia لتجعل الانطباع الأول أكثر قصدًا ووضوحًا. طلب قوي، اختيار واضح، وبداية إبداعية أكثر سلاسة للشركات التي تريد الجودة دون تعقيد الوكالات الثقيلة.',
    serviceEyebrow: 'لمحة عن الخدمات',
    serviceTitle: 'أربع خدمات ضمن تجربة واحدة مصقولة',
    serviceDescription:
      'لكل خدمة شخصيتها البصرية الخاصة، مع بقاء الصفحة كلها ضمن إيقاع Exordia الأنيق والمتماسك.',
    services: [
      {
        title: 'تصوير الفيديو',
        cue: 'حركة سينمائية',
        description:
          'أفلام تعريفية، حملات بصرية، مقاطع إطلاق، وسرد مرئي مصقول ينتقل بسرعة من الفكرة إلى التسليم.',
        accent: 'from-[#d4af37]/55 via-[#d4af37]/16 to-transparent',
        iconSurface: 'bg-[#d4af37]/14 text-gold',
      },
      {
        title: 'التصميم الجرافيكي',
        cue: 'لغة العلامة',
        description:
          'هويات بصرية، عروض إطلاق، قوائم، مواد اجتماعية، ومخرجات تصميمية أنيقة بنبرة أكثر استراتيجية.',
        accent: 'from-white/35 via-white/10 to-transparent',
        iconSurface: 'bg-white/10 text-paper',
      },
      {
        title: 'التصوير الفوتوغرافي',
        cue: 'اللقطة والملمس',
        description:
          'تصوير منتجات، بورتريه، تغطية فعاليات، وصور تحريرية تمنح علامتك أرشيفًا بصريًا أقوى.',
        accent: 'from-[#8e8a83]/45 via-[#8e8a83]/10 to-transparent',
        iconSurface: 'bg-paper/10 text-paper',
      },
      {
        title: 'إدارة الفعاليات',
        cue: 'تدفق التجربة',
        description:
          'تنظيم سير الفعالية، تنسيق الموردين، إشراف إبداعي، ودعم عملي لفعاليات تحتاج إلى حضور مصقول.',
        accent: 'from-[#e5c76b]/48 via-[#e5c76b]/12 to-transparent',
        iconSurface: 'bg-[#e5c76b]/12 text-gold-light',
      },
    ],
    finaleEyebrow: 'جاهز للبداية',
    finaleTitle: 'الخطوة الأولى الصحيحة يجب أن تبدو سهلة',
    finaleDescription:
      'انتقل من الفكرة إلى التنفيذ عبر طلب مختصر، وانطباع أول راقٍ، ومسار حجز واضح منذ أول نقرة.',
    finaleCaption: 'موجّه للعلامات السريعة والفرق الناشئة التي تريد السرعة دون فقدان الرقي.',
  },
} as const;

const HERO_CHIPS = {
  en: ['Creative Direction', 'Premium Delivery', 'Bahrain Talent', 'Clear Briefs'],
  ar: ['توجيه إبداعي', 'تسليم مصقول', 'مواهب بحرينية', 'طلب واضح'],
} as const;

const HERO_METRICS = {
  en: [
    { label: 'Approach', value: 'Refined' },
    { label: 'Flow', value: 'Simple' },
    { label: 'Market', value: 'Bahrain' },
    { label: 'Promise', value: 'Impact' },
  ],
  ar: [
    { label: 'النهج', value: 'مصقول' },
    { label: 'التجربة', value: 'سلسة' },
    { label: 'السوق', value: 'البحرين' },
    { label: 'النتيجة', value: 'أثر' },
  ],
} as const;

export default function LandingPage() {
  const { copy, isArabic, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const story = LANDING_STORY[language];
  const heroChips = HERO_CHIPS[language];
  const heroMetrics = HERO_METRICS[language];

  return (
    <div className="bg-ink text-paper overflow-hidden">
      <section className="relative min-h-screen flex items-center pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_35%),linear-gradient(180deg,_rgba(245,242,237,0.03)_0%,_rgba(10,10,10,0)_30%,_rgba(10,10,10,0.96)_100%)]" />
        <div className="absolute inset-0 opacity-35 pointer-events-none">
          <motion.div
            className="absolute top-[14%] left-[8%] h-52 w-52 rounded-full bg-gold/12 blur-[110px]"
            animate={reduceMotion ? undefined : { y: [-8, 10, -8], x: [0, 12, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[10%] h-64 w-64 rounded-full bg-paper/8 blur-[120px]"
            animate={reduceMotion ? undefined : { y: [10, -12, 10], x: [0, -10, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[28%] top-[18%] h-28 w-28 rounded-full border border-paper/10"
            animate={reduceMotion ? undefined : { y: [0, -20, 0], rotate: [0, 18, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,242,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,242,237,0.04)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.04] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-24 items-center">
            <div className={cn('relative', isArabic && 'text-right lg:order-2')}>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={cn('flex items-center gap-4 mb-8', isArabic && 'flex-row-reverse')}
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
                <div className="absolute inset-x-0 -top-6 text-[20vw] md:text-[10rem] font-serif italic text-paper/[0.05] leading-none pointer-events-none select-none">
                  Exordia
                </div>
                <div className="relative space-y-2 md:space-y-4">
                  <div className="overflow-hidden">
                    <motion.span
                      initial={reduceMotion ? false : { y: '120%' }}
                      animate={reduceMotion ? undefined : { y: 0 }}
                      transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[7.75rem] font-serif leading-[0.88] tracking-[-0.03em]"
                    >
                      Exordia
                    </motion.span>
                  </div>
                  <div className="overflow-hidden">
                    <motion.span
                      initial={reduceMotion ? false : { y: '120%' }}
                      animate={reduceMotion ? undefined : { y: 0 }}
                      transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-4xl sm:text-5xl md:text-6xl font-serif leading-[0.94] text-paper/92"
                    >
                      {copy.landing.titleLineOne}
                    </motion.span>
                  </div>
                  <div className="overflow-hidden">
                    <motion.span
                      initial={reduceMotion ? false : { y: '120%' }}
                      animate={reduceMotion ? undefined : { y: 0 }}
                      transition={{ duration: 0.95, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="block text-4xl sm:text-5xl md:text-6xl font-serif italic leading-[0.94] text-gold"
                    >
                      {copy.landing.titleAccent}
                    </motion.span>
                  </div>
                </div>
              </div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-lg md:text-xl text-paper/64 leading-relaxed font-light"
              >
                {copy.landing.description}
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                className={cn('flex flex-col sm:flex-row gap-5 sm:items-center mt-10', isArabic && 'sm:flex-row-reverse')}
              >
                <MotionLink
                  to="/book"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-10 py-5 text-[11px] font-bold uppercase tracking-[0.28em] text-ink shadow-[0_24px_80px_rgba(212,175,55,0.16)]"
                  whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  animate={reduceMotion ? undefined : { boxShadow: ['0 24px 80px rgba(212,175,55,0.16)', '0 30px 90px rgba(212,175,55,0.26)', '0 24px 80px rgba(212,175,55,0.16)'] }}
                  transition={reduceMotion ? undefined : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {copy.landing.primaryCta}
                  <ArrowRight className={cn('h-4 w-4 transition-transform', isArabic ? 'rotate-180 group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5')} />
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
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl"
              >
                {heroMetrics.map((item) => (
                  <div key={item.label} className="rounded-[1.75rem] border border-paper/10 bg-paper/5 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-paper/35 mb-2">{item.label}</p>
                    <p className="text-2xl font-serif text-paper">{item.value}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className={cn('relative lg:h-[720px]', isArabic && 'lg:order-1')}>
              {heroChips.map((chip, index) => (
                <motion.div
                  key={chip}
                  className={cn(
                    'hidden md:flex absolute z-20 rounded-full border border-paper/10 bg-paper/6 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-paper/70 backdrop-blur-md',
                    index === 0 && 'left-0 top-[10%]',
                    index === 1 && 'right-[4%] top-[16%]',
                    index === 2 && 'left-[8%] bottom-[18%]',
                    index === 3 && 'right-0 bottom-[12%]',
                  )}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.52 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileInView={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  viewport={{ once: true }}
                >
                  {chip}
                </motion.div>
              ))}

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: 4 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto max-w-[540px]"
              >
                <div className="absolute -inset-6 rounded-[3.5rem] bg-gradient-to-br from-gold/25 via-gold/0 to-paper/10 blur-3xl opacity-80" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-paper/10 bg-paper/6 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                  <img
                    src={heroImage}
                    alt="Exordia creative team"
                    className="absolute inset-0 h-full w-full object-cover object-[24%_center] scale-[1.62]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.1)_0%,rgba(10,10,10,0.55)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="rounded-[2rem] border border-paper/10 bg-ink/55 p-5 backdrop-blur-xl">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Exordia</p>
                      <p className="text-base md:text-lg font-serif text-paper/90">
                        {story.serviceTitle}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-paper py-24 md:py-32 text-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-16 xl:gap-24 items-start">
            <Reveal className={cn('max-w-2xl', isArabic && 'xl:order-2 text-right')}>
              <span className={cn('text-[11px] font-bold text-gold mb-6 block', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
                {story.storyEyebrow}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] text-ink mb-8">
                {story.storyTitle}
              </h2>
              <p className="text-xl md:text-2xl text-ink/60 leading-[1.7] font-light">
                {story.storyDescription}
              </p>
            </Reveal>

            <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', isArabic && 'xl:order-1')}>
              {copy.landing.philosophy.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08} className={cn('h-full', isArabic && 'text-right')}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="group h-full rounded-[2rem] border border-ink/7 bg-white px-7 py-8 shadow-[0_18px_50px_rgba(10,10,10,0.06)]"
                  >
                    <div className="mb-6 h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-serif text-ink mb-4">{item.title}</h3>
                    <p className="text-sm md:text-base text-ink/58 leading-relaxed">{item.desc}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-ink text-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.14),_transparent_32%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className={cn('max-w-3xl mb-16 md:mb-20', isArabic && 'mr-auto text-right')}>
            <span className={cn('text-[11px] font-bold text-gold mb-6 block', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
              {story.serviceEyebrow}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] mb-6">{story.serviceTitle}</h2>
            <p className="text-lg md:text-xl text-paper/60 leading-relaxed max-w-2xl">
              {story.serviceDescription}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {story.services.map((service, index) => {
              const Icon = SERVICE_ICONS[index];

              return (
                <Reveal key={service.title} delay={index * 0.08} className={cn(isArabic && 'text-right')}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -10, rotateX: 2, rotateY: isArabic ? -2 : 2 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="group relative h-full overflow-hidden rounded-[2.25rem] border border-paper/10 bg-white/[0.03] p-7 shadow-[0_22px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm"
                  >
                    <div className={cn('absolute inset-x-0 top-0 h-28 bg-gradient-to-b opacity-90', service.accent)} />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className={cn('mb-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-paper/10', service.iconSurface)}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="mb-5">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-gold/70 mb-3">{service.cue}</p>
                        <h3 className="text-3xl font-serif text-paper">{service.title}</h3>
                      </div>
                      <p className="text-paper/60 leading-relaxed text-sm md:text-[15px] flex-grow">
                        {service.description}
                      </p>
                      <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-paper/40 group-hover:text-gold transition-colors">
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
        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={cn('flex flex-col md:flex-row justify-between items-end gap-8 mb-16 md:mb-20', isArabic && 'md:flex-row-reverse md:items-start')}>
            <Reveal className={cn('max-w-2xl', isArabic && 'text-right')}>
              <span className={cn('text-[11px] font-bold text-gold mb-6 block', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
                {copy.landing.methodology}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] text-ink">
                {copy.landing.methodologyTitle} <br />
                <span className="italic text-gold">{copy.landing.methodologyAccent}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <Link
                to="/dashboard"
                className={cn(
                  'inline-flex items-center gap-3 text-[11px] font-bold text-ink hover:text-gold transition-colors border-b border-gold/50 pb-2',
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
                  <h3 className="text-3xl font-serif text-ink mb-4">{item.title}</h3>
                  <p className="text-ink/58 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-ink py-24 md:py-32 text-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12),_transparent_40%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center">
            <span className={cn('text-[11px] font-bold text-gold mb-6 block', isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]')}>
              {story.finaleEyebrow}
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] mb-8">
              {story.finaleTitle}
            </h2>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-paper/64 leading-relaxed mb-10">
              {story.finaleDescription}
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-paper/34 mb-10">
              {story.finaleCaption}
            </p>
            <MotionLink
              to="/book"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-12 py-6 text-[11px] font-bold uppercase tracking-[0.3em] text-ink shadow-[0_30px_90px_rgba(212,175,55,0.2)]"
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              animate={reduceMotion ? undefined : { y: [0, -3, 0], boxShadow: ['0 30px 90px rgba(212,175,55,0.18)', '0 36px 110px rgba(212,175,55,0.28)', '0 30px 90px rgba(212,175,55,0.18)'] }}
              transition={reduceMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {copy.nav.booking}
              <ArrowRight className={cn('h-4 w-4 transition-transform', isArabic ? 'rotate-180 group-hover:-translate-x-1.5' : 'group-hover:translate-x-1.5')} />
            </MotionLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
