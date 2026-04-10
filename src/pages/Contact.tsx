import React from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import {
  CONTACT_DRAFT_KEY,
  INITIAL_CONTACT_FORM,
  type ContactFormData,
  canUseServerDelivery,
  getContactMailtoUrl,
  getContactWhatsAppUrl,
} from '../lib/inquiry';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

type SubmissionState = 'idle' | 'sent' | 'manual';

export default function Contact() {
  const [formData, setFormData] = React.useState<ContactFormData>(INITIAL_CONTACT_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionState, setSubmissionState] = React.useState<SubmissionState>('idle');
  const [submitMessage, setSubmitMessage] = React.useState('');
  const { copy, isArabic } = useLanguage();
  const contactCopy = copy.contact;
  const formCopy = contactCopy.form;

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONTACT_DRAFT_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as Partial<ContactFormData>;
      setFormData((current) => ({ ...current, ...parsed }));
    } catch (error) {
      console.error('Failed to restore contact draft', error);
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to save contact draft', error);
    }
  }, [formData]);

  const resetForm = () => {
    window.localStorage.removeItem(CONTACT_DRAFT_KEY);
    setFormData(INITIAL_CONTACT_FORM);
    setSubmissionState('idle');
    setSubmitMessage('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!canUseServerDelivery()) {
      setSubmissionState('manual');
      setSubmitMessage(formCopy.manualMessage);
      setIsSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      window.clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Automatic delivery unavailable');
      }

      window.localStorage.removeItem(CONTACT_DRAFT_KEY);
      setSubmissionState('sent');
      setSubmitMessage(formCopy.sentMessage);
      setFormData(INITIAL_CONTACT_FORM);
    } catch (error) {
      window.clearTimeout(timeoutId);
      console.error('Error sending contact message:', error);
      setSubmissionState('manual');
      setSubmitMessage(formCopy.manualMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const microLabelClass = cn(
    'text-[11px] font-bold text-ink/40 block',
    isArabic ? 'tracking-[0.08em] text-right mr-1' : 'uppercase tracking-widest ml-1',
  );

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
            {contactCopy.eyebrow}
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-12">
            {contactCopy.titleLineOne} <br />
            <span className="italic text-gold">{contactCopy.titleAccent}</span>
          </h1>
          <p className="text-xl text-ink/60 leading-relaxed font-serif mb-12">
            {contactCopy.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-24">
          <div className="space-y-12">
            <div className={cn('flex items-start gap-6', isArabic && 'flex-row-reverse text-right')}>
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className={cn('text-sm font-bold text-ink mb-2', isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-widest')}>
                  {contactCopy.emailTitle}
                </h3>
                <a
                  href="mailto:Ex0rdia@outlook.com"
                  className="text-xl font-serif text-ink/60 hover:text-gold transition-colors"
                  dir="ltr"
                >
                  Ex0rdia@outlook.com
                </a>
              </div>
            </div>

            <div className={cn('flex items-start gap-6', isArabic && 'flex-row-reverse text-right')}>
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className={cn('text-sm font-bold text-ink mb-2', isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-widest')}>
                  {contactCopy.callTitle}
                </h3>
                <a
                  href="tel:+97336222349"
                  className="text-xl font-serif text-ink/60 hover:text-gold transition-colors"
                  dir="ltr"
                >
                  +973 36222349
                </a>
              </div>
            </div>

            <div className={cn('flex items-start gap-6', isArabic && 'flex-row-reverse text-right')}>
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className={cn('text-sm font-bold text-ink mb-2', isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-widest')}>
                  {contactCopy.whatsappTitle}
                </h3>
                <a
                  href="https://wa.me/97336222349"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl font-serif text-ink/60 hover:text-gold transition-colors"
                >
                  {contactCopy.whatsappCta}
                </a>
              </div>
            </div>

            <div className={cn('flex items-start gap-6', isArabic && 'flex-row-reverse text-right')}>
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className={cn('text-sm font-bold text-ink mb-2', isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-widest')}>
                  {contactCopy.locationTitle}
                </h3>
                <p className="text-xl font-serif text-ink/60">{contactCopy.locationValue}</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn('glass-paper p-10 rounded-3xl', isArabic && 'text-right')}
          >
            {submissionState === 'idle' ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={microLabelClass}>{formCopy.name}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      className={cn(
                        'w-full bg-ink/5 border-none rounded-2xl px-6 py-4 text-ink focus:ring-2 focus:ring-gold transition-all outline-none',
                        isArabic && 'text-right',
                      )}
                      placeholder={formCopy.placeholderName}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={microLabelClass}>{formCopy.email}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      className={cn(
                        'w-full bg-ink/5 border-none rounded-2xl px-6 py-4 text-ink focus:ring-2 focus:ring-gold transition-all outline-none',
                        isArabic && 'text-right',
                      )}
                      placeholder={formCopy.placeholderEmail}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={microLabelClass}>{formCopy.message}</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    className={cn(
                      'w-full bg-ink/5 border-none rounded-2xl px-6 py-4 text-ink focus:ring-2 focus:ring-gold transition-all outline-none resize-none',
                      isArabic && 'text-right',
                    )}
                    placeholder={formCopy.placeholderMessage}
                  />
                </div>
                <div className={cn('flex items-center justify-between gap-4', isArabic && 'flex-row-reverse')}>
                  <p
                    className={cn(
                      'text-[11px] font-bold text-ink/25',
                      isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-[0.25em]',
                    )}
                  >
                    {formCopy.draftSaved}
                  </p>
                  <button
                    disabled={isSubmitting}
                    className={cn(
                      'bg-ink text-paper font-bold text-[11px] px-8 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gold hover:text-ink transition-all group disabled:opacity-50',
                      isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-widest',
                    )}
                  >
                    {isSubmitting ? formCopy.sending : formCopy.send}
                    {!isSubmitting && (
                      <Send
                        className={cn(
                          'w-4 h-4 transition-transform',
                          isArabic ? 'rotate-180 group-hover:-translate-x-1 group-hover:-translate-y-1' : 'group-hover:translate-x-1 group-hover:-translate-y-1',
                        )}
                      />
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-2xl font-serif text-ink mb-4">
                  {submissionState === 'sent' ? formCopy.sentTitle : formCopy.manualTitle}
                </h3>
                <p className="text-ink/60 font-sans mb-8 leading-relaxed">{submitMessage}</p>

                {submissionState === 'manual' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <a
                      href={getContactWhatsAppUrl(formData)}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        'flex items-center justify-center gap-3 bg-ink text-paper py-5 rounded-full font-sans font-bold text-xs hover:bg-gold hover:text-ink transition-all duration-500',
                        isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-[0.2em]',
                      )}
                    >
                      <MessageCircle className="w-5 h-5" />
                      {formCopy.sendWhatsapp}
                    </a>
                    <a
                      href={getContactMailtoUrl(formData)}
                      className={cn(
                        'flex items-center justify-center gap-3 border border-ink/10 py-5 rounded-full font-sans font-bold text-xs text-ink hover:bg-ink hover:text-paper transition-all duration-500',
                        isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-[0.2em]',
                      )}
                    >
                      <Mail className="w-5 h-5" />
                      {formCopy.sendEmail}
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={resetForm}
                  className={cn(
                    'text-gold font-bold text-[10px] hover:text-ink transition-colors',
                    isArabic ? 'tracking-[0.12em]' : 'uppercase tracking-widest',
                  )}
                >
                  {submissionState === 'sent' ? formCopy.sendAnother : formCopy.edit}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
