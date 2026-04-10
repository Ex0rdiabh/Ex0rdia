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

type SubmissionState = 'idle' | 'sent' | 'manual';

export default function Contact() {
  const [formData, setFormData] = React.useState<ContactFormData>(INITIAL_CONTACT_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionState, setSubmissionState] =
    React.useState<SubmissionState>('idle');
  const [submitMessage, setSubmitMessage] = React.useState('');

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
      setSubmitMessage(
        'This GitHub Pages version is ready for direct delivery. Send your message instantly using WhatsApp or email below.',
      );
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
        let errorMessage = 'This host could not send your message automatically.';

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = 'This host could not send your message automatically.';
        }

        throw new Error(errorMessage);
      }

      window.localStorage.removeItem(CONTACT_DRAFT_KEY);
      setSubmissionState('sent');
      setSubmitMessage("Thanks for reaching out. Exordia will get back to you shortly.");
      setFormData(INITIAL_CONTACT_FORM);
    } catch (error) {
      window.clearTimeout(timeoutId);
      console.error('Error sending contact message:', error);
      setSubmissionState('manual');
      setSubmitMessage(
        error instanceof Error && error.name === 'AbortError'
          ? 'The message could not be sent in time. You can still contact Exordia instantly by WhatsApp or email below.'
          : 'Automatic delivery is unavailable on this host right now. Your message is ready to send by WhatsApp or email below.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-paper min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">
            Get in Touch
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-12">
            Contact Us <br />
            <span className="italic text-gold">Exordia</span>
          </h1>
          <p className="text-xl text-ink/60 leading-relaxed font-serif mb-12">
            Reach out if you want to ask a question, discuss a project, or start with a simpler conversation before submitting a full brief.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-24">
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink mb-2">
                  Email Us
                </h3>
                <a
                  href="mailto:Ex0rdia@outlook.com"
                  className="text-xl font-serif text-ink/60 hover:text-gold transition-colors"
                >
                  Ex0rdia@outlook.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink mb-2">
                  Call Us
                </h3>
                <a
                  href="tel:+97336222349"
                  className="text-xl font-serif text-ink/60 hover:text-gold transition-colors"
                >
                  +973 36222349
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink mb-2">
                  WhatsApp
                </h3>
                <a
                  href="https://wa.me/97336222349"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl font-serif text-ink/60 hover:text-gold transition-colors"
                >
                  Message Exordia Directly
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-ink/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-ink mb-2">
                  Based In
                </h3>
                <p className="text-xl font-serif text-ink/60">Manama, Kingdom of Bahrain</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-paper p-10 rounded-3xl"
          >
            {submissionState === 'idle' ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-ink/40 ml-1">
                      Name
                    </label>
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
                      className="w-full bg-ink/5 border-none rounded-2xl px-6 py-4 text-ink focus:ring-2 focus:ring-gold transition-all outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-ink/40 ml-1">
                      Email
                    </label>
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
                      className="w-full bg-ink/5 border-none rounded-2xl px-6 py-4 text-ink focus:ring-2 focus:ring-gold transition-all outline-none"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-ink/40 ml-1">
                    Message
                  </label>
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
                    className="w-full bg-ink/5 border-none rounded-2xl px-6 py-4 text-ink focus:ring-2 focus:ring-gold transition-all outline-none resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink/25">
                    Draft saved automatically
                  </p>
                  <button
                    disabled={isSubmitting}
                    className="bg-ink text-paper font-bold uppercase tracking-widest text-[11px] px-8 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-gold hover:text-ink transition-all group disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && (
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                  {submissionState === 'sent' ? 'Message Sent' : 'Message Ready To Send'}
                </h3>
                <p className="text-ink/60 font-sans mb-8 leading-relaxed">
                  {submitMessage}
                </p>

                {submissionState === 'manual' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <a
                      href={getContactWhatsAppUrl(formData)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 bg-ink text-paper py-5 rounded-full font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-ink transition-all duration-500"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Send on WhatsApp
                    </a>
                    <a
                      href={getContactMailtoUrl(formData)}
                      className="flex items-center justify-center gap-3 border border-ink/10 py-5 rounded-full font-sans font-bold uppercase tracking-[0.2em] text-xs text-ink hover:bg-ink hover:text-paper transition-all duration-500"
                    >
                      <Mail className="w-5 h-5" />
                      Send by Email
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={resetForm}
                  className="text-gold font-bold uppercase tracking-widest text-[10px] hover:text-ink transition-colors"
                >
                  {submissionState === 'sent' ? 'Send Another Message' : 'Edit Message'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
