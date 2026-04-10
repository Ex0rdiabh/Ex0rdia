import {
  Clock3,
  FileText,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  PencilRuler,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

const DASHBOARD_COPY = {
  en: {
    eyebrow: 'Client Journey',
    title: 'What Happens',
    accent: 'After You Book',
    bookingCta: 'Start Booking',
    highlightCards: [
      { label: 'Response Style', value: 'Simple & Direct' },
      { label: 'Primary Follow-Up', value: 'Email / WhatsApp' },
      { label: 'Best For', value: 'Startup-Friendly Projects' },
    ],
    flowTitle: 'Status Flow',
    flowPrefix: 'Exordia',
    flowNote: 'A simple status structure that keeps the process practical and clear',
    statuses: [
      {
        title: 'Inquiry Received',
        description:
          'Your booking brief is received and reviewed to understand the service, timing, and desired investment.',
      },
      {
        title: 'Brief Review',
        description:
          'Exordia checks the scope, asks any necessary follow-up questions, and decides the best creative direction.',
      },
      {
        title: 'Discovery Call',
        description:
          'If needed, we reach out by your preferred contact method to align on goals, deliverables, and expectations.',
      },
      {
        title: 'Proposal & Confirmation',
        description:
          'You receive the proposed direction, timeline, and next-step confirmation before production begins.',
      },
      {
        title: 'Production',
        description:
          'The work is created, refined, and shared for review with practical updates along the way.',
      },
      {
        title: 'Delivery & Revisions',
        description:
          'Final files, agreed revisions, and project close-out are handled cleanly so the experience stays simple.',
      },
    ],
    finalEyebrow: 'Keep It Light',
    finalTitle: 'Clear process, no unnecessary complexity',
    finalDescription:
      'This portal is designed to help Exordia launch cleanly as a startup. It focuses on a strong brief, simple follow-up, and a workflow that is easy to manage without heavy systems.',
    briefCta: 'Submit A Brief',
    whatsappCta: 'WhatsApp Exordia',
  },
  ar: {
    eyebrow: 'رحلة العميل',
    title: 'ماذا يحدث',
    accent: 'بعد الحجز',
    bookingCta: 'ابدأ الحجز',
    highlightCards: [
      { label: 'أسلوب التواصل', value: 'واضح ومباشر' },
      { label: 'وسيلة المتابعة', value: 'البريد / واتساب' },
      { label: 'الأنسب لـ', value: 'مشاريع الشركات الناشئة' },
    ],
    flowTitle: 'تسلسل الحالة',
    flowPrefix: 'Exordia',
    flowNote: 'هيكل واضح وبسيط للحالات يحافظ على العملية عملية وسهلة المتابعة',
    statuses: [
      {
        title: 'استلام الطلب',
        description:
          'نستلم ملخص الحجز ونراجعه لفهم الخدمة المطلوبة والتوقيت ومستوى الاستثمار المتوقع.',
      },
      {
        title: 'مراجعة الملخص',
        description:
          'تراجع Exordia نطاق العمل وتطلب أي تفاصيل إضافية لازمة ثم تحدد الاتجاه الإبداعي الأنسب.',
      },
      {
        title: 'مكالمة استكشافية',
        description:
          'عند الحاجة نتواصل معك عبر وسيلتك المفضلة لتأكيد الأهداف والمخرجات والتوقعات.',
      },
      {
        title: 'المقترح والتأكيد',
        description:
          'نشاركك الاتجاه المقترح والمدة الزمنية والخطوة التالية قبل بدء التنفيذ.',
      },
      {
        title: 'التنفيذ',
        description:
          'يتم إنتاج العمل وتطويره ومشاركته للمراجعة مع تحديثات عملية خلال التنفيذ.',
      },
      {
        title: 'التسليم والتعديلات',
        description:
          'تتم إدارة الملفات النهائية والتعديلات المتفق عليها وإغلاق المشروع بصورة واضحة ومنظمة.',
      },
    ],
    finalEyebrow: 'بدون تعقيد',
    finalTitle: 'مسار واضح بلا أنظمة ثقيلة',
    finalDescription:
      'صُممت هذه البوابة لتساعد Exordia على الانطلاق كبداية قوية ومرنة، مع طلب واضح ومتابعة بسيطة وسير عمل سهل الإدارة.',
    briefCta: 'أرسل الطلب',
    whatsappCta: 'واتساب Exordia',
  },
} as const;

const STATUS_ICONS = [FileText, Sparkles, MessageCircle, PencilRuler, Clock3, CheckCircle2];

export default function BusinessDashboard() {
  const { language, isArabic } = useLanguage();
  const content = DASHBOARD_COPY[language];

  return (
    <div className="bg-paper min-h-screen py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn('flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8', isArabic && 'md:flex-row-reverse')}>
          <div className={cn(isArabic && 'text-right')}>
            <div className={cn('flex items-center gap-4 mb-4', isArabic && 'flex-row-reverse')}>
              <div className="h-px w-12 bg-gold" />
              <span
                className={cn(
                  'text-[11px] font-bold text-gold',
                  isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
                )}
              >
                {content.eyebrow}
              </span>
            </div>
            <h1 className="text-5xl font-serif text-ink tracking-tight">
              {content.title} <span className="italic">{content.accent}</span>
            </h1>
          </div>
          <Link
            to="/book"
            className="bg-ink text-paper px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest-xl hover:bg-gold hover:text-ink transition-all shadow-2xl shadow-ink/10"
          >
            {content.bookingCta}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {content.highlightCards.map((item) => (
            <div
              key={item.label}
              className={cn('bg-white p-10 rounded-[2.5rem] shadow-sm border border-ink/5 relative overflow-hidden', isArabic && 'text-right')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-paper rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2" />
              <p
                className={cn(
                  'text-ink/30 text-[10px] font-bold mb-3 relative z-10',
                  isArabic ? 'tracking-[0.15em]' : 'uppercase tracking-[0.3em]',
                )}
              >
                {item.label}
              </p>
              <p className="text-4xl font-serif text-ink relative z-10">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-ink/5 overflow-hidden">
          <div className={cn('p-10 md:p-12 border-b border-ink/5', isArabic && 'text-right')}>
            <h2 className="text-3xl font-serif text-ink tracking-tight mb-2">
              {content.flowPrefix} <span className="italic">{content.flowTitle}</span>
            </h2>
            <p
              className={cn(
                'text-xs text-ink/40 font-bold',
                isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-widest',
              )}
            >
              {content.flowNote}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-ink/5">
            {content.statuses.map((status, index) => {
              const Icon = STATUS_ICONS[index];

              return (
                <div key={status.title} className={cn('p-10 md:p-12 hover:bg-paper/30 transition-all', isArabic && 'text-right')}>
                  <div className={cn('w-16 h-16 bg-ink rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-ink/10', isArabic && 'mr-auto')}>
                    <Icon className="text-gold w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-ink tracking-tight mb-4">{status.title}</h3>
                  <p className="text-ink/55 leading-relaxed text-base">{status.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 bg-ink rounded-[3rem] p-10 md:p-12 text-paper relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full filter blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className={cn('relative z-10 flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center', isArabic && 'lg:flex-row-reverse')}>
            <div className={cn('max-w-2xl', isArabic && 'text-right')}>
              <p
                className={cn(
                  'text-[11px] font-bold text-gold mb-4',
                  isArabic ? 'tracking-[0.18em]' : 'uppercase tracking-[0.4em]',
                )}
              >
                {content.finalEyebrow}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">{content.finalTitle}</h2>
              <p className="text-paper/65 leading-relaxed">{content.finalDescription}</p>
            </div>
            <div className={cn('flex flex-col sm:flex-row gap-4', isArabic && 'sm:flex-row-reverse')}>
              <Link
                to="/book"
                className="bg-gold text-ink px-8 py-5 rounded-full font-bold text-xs uppercase tracking-widest-xl hover:bg-paper transition-all text-center"
              >
                {content.briefCta}
              </Link>
              <a
                href="https://wa.me/97336222349"
                target="_blank"
                rel="noreferrer"
                className="border border-paper/15 px-8 py-5 rounded-full font-bold text-xs uppercase tracking-widest-xl hover:bg-paper hover:text-ink transition-all text-center"
              >
                {content.whatsappCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
