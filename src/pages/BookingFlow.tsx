import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  User,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import {
  BOOKING_DRAFT_KEY,
  INITIAL_BOOKING_FORM,
  SERVICE_GUIDANCE,
  type BookingFormData,
  canUseServerDelivery,
  formatBookingSummary,
  generateInquiryId,
  getBookingMailtoUrl,
  getBookingWhatsAppUrl,
} from '../lib/inquiry';

type Step = 'service' | 'details' | 'client' | 'confirm';
type SubmissionState = 'idle' | 'sent' | 'manual';

const SERVICES = [
  {
    id: 'design',
    name: 'Graphic Design',
    icon: '🎨',
    desc: 'Visual identity, branding, and high-end marketing collateral.',
  },
  {
    id: 'video',
    name: 'Videography',
    icon: '🎥',
    desc: 'Cinematic storytelling and premium video production.',
  },
  {
    id: 'photo',
    name: 'Photography',
    icon: '📸',
    desc: 'Professional photography for brands, events, and products.',
  },
  {
    id: 'event',
    name: 'Event Management',
    icon: '✨',
    desc: 'Refined planning and smooth execution for important events.',
  },
];

const TIMELINE_OPTIONS = [
  'Flexible',
  'Within 2 weeks',
  'This month',
  'Next month',
  'Specific deadline',
];

const CONTACT_OPTIONS = [
  { id: 'email', label: 'Email' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'call', label: 'Call' },
];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = React.useState<Step>('service');
  const [formData, setFormData] = React.useState<BookingFormData>({
    ...INITIAL_BOOKING_FORM,
    inquiryId: generateInquiryId(),
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submissionState, setSubmissionState] =
    React.useState<SubmissionState>('idle');
  const [submitMessage, setSubmitMessage] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(BOOKING_DRAFT_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as Partial<BookingFormData>;
      setFormData((current) => ({
        ...current,
        ...parsed,
        inquiryId: parsed.inquiryId || current.inquiryId || generateInquiryId(),
      }));
    } catch (error) {
      console.error('Failed to restore booking draft', error);
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to persist booking draft', error);
    }
  }, [formData]);

  const steps: { id: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'service', label: 'Service', icon: Briefcase },
    { id: 'details', label: 'Project', icon: FileText },
    { id: 'client', label: 'Identity', icon: User },
    { id: 'confirm', label: 'Review', icon: Check },
  ];

  const selectedService = SERVICES.find((service) => service.id === formData.serviceId);
  const selectedGuidance = formData.serviceId
    ? SERVICE_GUIDANCE[formData.serviceId]
    : null;

  const updateField = <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K],
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const clearDraft = () => {
    window.localStorage.removeItem(BOOKING_DRAFT_KEY);
  };

  const resetFlow = () => {
    clearDraft();
    setCurrentStep('service');
    setSubmissionState('idle');
    setSubmitMessage('');
    setCopied(false);
    setFormData({
      ...INITIAL_BOOKING_FORM,
      inquiryId: generateInquiryId(),
    });
  };

  const handleNext = () => {
    if (currentStep === 'service') setCurrentStep('details');
    else if (currentStep === 'details') setCurrentStep('client');
    else if (currentStep === 'client') setCurrentStep('confirm');
    else handleSubmit();
  };

  const handleBack = () => {
    if (currentStep === 'details') setCurrentStep('service');
    else if (currentStep === 'client') setCurrentStep('details');
    else if (currentStep === 'confirm') setCurrentStep('client');
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(formatBookingSummary(formData));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy inquiry summary', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload = {
      ...formData,
      inquiryId: formData.inquiryId || generateInquiryId(),
    };

    setFormData(payload);

    if (!canUseServerDelivery()) {
      setSubmissionState('manual');
      setSubmitMessage(
        'This GitHub Pages version is ready for direct delivery. Send your brief instantly using WhatsApp or email below.',
      );
      setIsSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      window.clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = 'We could not send your inquiry from this website.';

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = 'We could not send your inquiry from this website.';
        }

        throw new Error(errorMessage);
      }

      clearDraft();
      setSubmissionState('sent');
      setSubmitMessage(
        'Your brief has been delivered successfully. Exordia will follow up using your preferred contact method.',
      );
    } catch (error) {
      window.clearTimeout(timeoutId);
      console.error('Error submitting booking:', error);
      setSubmissionState('manual');
      setSubmitMessage(
        error instanceof Error && error.name === 'AbortError'
          ? 'The site could not send the brief automatically in time. You can still send it instantly using WhatsApp or email below.'
          : 'This host is not sending briefs automatically right now. Your full inquiry is ready, and you can send it instantly using WhatsApp or email below.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDetailsValid =
    Boolean(formData.projectTitle.trim()) &&
    Boolean(formData.projectDescription.trim()) &&
    Boolean(formData.budget.trim()) &&
    Boolean(formData.timeline.trim());

  const isClientValid =
    Boolean(formData.clientName.trim()) &&
    Boolean(formData.clientEmail.trim()) &&
    Boolean(formData.clientPhone.trim()) &&
    Boolean(formData.preferredContact.trim());

  const isNextDisabled =
    isSubmitting ||
    (currentStep === 'service' && !formData.serviceId) ||
    (currentStep === 'details' && !isDetailsValid) ||
    (currentStep === 'client' && !isClientValid);

  if (submissionState !== 'idle') {
    const manualMode = submissionState === 'manual';

    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full border border-ink/5"
        >
          <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Sparkles className="text-gold w-12 h-12" />
          </div>

          <div className="text-center max-w-xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-4">
              {manualMode ? 'Manual Delivery Ready' : 'Inquiry Received'}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-ink mb-4">
              {manualMode ? 'Your brief is ready to send' : 'Your inquiry is now with Exordia'}
            </h2>
            <p className="text-ink/60 leading-relaxed font-sans mb-8">
              {submitMessage}
            </p>
          </div>

          <div className="bg-paper/40 rounded-3xl border border-ink/5 p-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                  Inquiry Reference
                </p>
                <p className="font-serif text-2xl text-ink">{formData.inquiryId}</p>
              </div>
              <button
                type="button"
                onClick={copySummary}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full border border-ink/10 text-[11px] font-bold uppercase tracking-[0.2em] text-ink hover:bg-ink hover:text-paper transition-all"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied' : 'Copy Brief'}
              </button>
            </div>
            <p className="text-sm text-ink/55 leading-relaxed">
              {manualMode
                ? 'Use one of the options below to send the exact brief without rewriting anything.'
                : 'Keep this reference handy in case you want to continue the conversation by WhatsApp or email.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <a
              href={getBookingWhatsAppUrl(formData)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-ink text-paper py-5 rounded-full font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-ink transition-all duration-500 shadow-xl shadow-ink/10"
            >
              <MessageCircle className="w-5 h-5" />
              Send on WhatsApp
            </a>
            <a
              href={getBookingMailtoUrl(formData)}
              className="flex items-center justify-center gap-3 border border-ink/10 py-5 rounded-full font-sans font-bold uppercase tracking-[0.2em] text-xs text-ink hover:bg-ink hover:text-paper transition-all duration-500"
            >
              <Mail className="w-5 h-5" />
              Send by Email
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={resetFlow}
              className="flex-1 border border-ink/10 py-5 rounded-full font-sans font-bold uppercase tracking-[0.2em] text-xs text-ink hover:bg-paper transition-all duration-500"
            >
              Start Another Brief
            </button>
            <Link
              to="/"
              className="flex-1 bg-gold text-ink py-5 rounded-full font-sans font-bold uppercase tracking-[0.2em] text-xs text-center hover:bg-ink hover:text-paper transition-all duration-500"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen py-12 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="flex items-center justify-between relative max-w-3xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-ink/10 -translate-y-1/2 z-0" />
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = steps.findIndex((entry) => entry.id === currentStep) > idx;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 border',
                      isActive
                        ? 'bg-ink text-paper border-ink scale-110 shadow-2xl shadow-ink/20'
                        : isCompleted
                          ? 'bg-gold text-ink border-gold'
                          : 'bg-white text-ink/30 border-ink/10',
                    )}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span
                    className={cn(
                      'mt-4 text-[10px] font-sans font-bold uppercase tracking-[0.3em] hidden sm:block',
                      isActive ? 'text-ink' : 'text-ink/30',
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-ink/5 min-h-[760px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl translate-x-1/3 -translate-y-1/3" />

          <AnimatePresence mode="wait">
            {currentStep === 'service' && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <div className="max-w-2xl">
                  <h2 className="text-5xl font-serif text-ink mb-6 leading-tight">
                    Select Your Creative Path
                  </h2>
                  <p className="text-ink/60 text-xl font-sans">
                    Choose the service you need most. We will keep the process simple and shape the rest together.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => updateField('serviceId', service.id)}
                      className={cn(
                        'p-8 rounded-2xl border transition-all duration-500 text-left group relative overflow-hidden',
                        formData.serviceId === service.id
                          ? 'border-gold bg-gold/5 shadow-xl shadow-gold/5'
                          : 'border-ink/5 hover:border-gold/30 bg-paper/30',
                      )}
                    >
                      <div className="flex items-start gap-6 relative z-10">
                        <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">
                          {service.icon}
                        </span>
                        <div>
                          <h3 className="text-2xl font-serif text-ink mb-2">{service.name}</h3>
                          <p className="text-ink/50 text-sm leading-relaxed font-sans">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                      {formData.serviceId === service.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-6 right-6"
                        >
                          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-ink" />
                          </div>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="bg-paper/40 border border-ink/5 rounded-3xl p-8 flex flex-col md:flex-row gap-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-ink mb-2">
                      Built for a startup-friendly first booking
                    </h3>
                    <p className="text-ink/60 leading-relaxed">
                      You do not need to know every detail today. Share enough for us to understand the scope, and Exordia will help refine the brief with you.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <div className="max-w-2xl">
                  <h2 className="text-5xl font-serif text-ink mb-6 leading-tight">
                    Define Your Vision
                  </h2>
                  <p className="text-ink/60 text-xl font-sans">
                    Give us the context we need to understand your goals, timing, and desired investment.
                  </p>
                </div>

                {selectedGuidance && (
                  <div className="bg-paper/40 rounded-3xl border border-ink/5 p-8">
                    <p className="text-[10px] text-gold uppercase font-bold tracking-[0.3em] mb-4">
                      Service Guidance
                    </p>
                    <h3 className="text-2xl font-serif text-ink mb-4">{selectedGuidance.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedGuidance.checklist.map((item) => (
                        <div key={item} className="p-5 rounded-2xl bg-white border border-ink/5">
                          <p className="text-sm text-ink/65 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  <div className="group">
                    <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={formData.projectTitle}
                      onChange={(event) => updateField('projectTitle', event.target.value)}
                      placeholder="e.g. Brand Launch Campaign"
                      className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-serif text-2xl placeholder:text-ink/20"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                      Project Brief
                    </label>
                    <textarea
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(event) => updateField('projectDescription', event.target.value)}
                      placeholder="Describe the goal, audience, deliverables, and any context that would help us understand the project."
                      className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                        Desired Investment (BHD)
                      </label>
                      <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-ink/30 font-sans font-bold">
                          BHD
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={formData.budget}
                          onChange={(event) => updateField('budget', event.target.value)}
                          placeholder="e.g. 600"
                          className="w-full p-6 pl-20 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                        Timeline
                      </label>
                      <div className="relative">
                        <Clock3 className="w-5 h-5 text-ink/30 absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={formData.timeline}
                          onChange={(event) => updateField('timeline', event.target.value)}
                          className="w-full appearance-none p-6 pl-16 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg text-ink"
                        >
                          <option value="">Choose a timeline</option>
                          {TIMELINE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={formData.projectDate}
                        onChange={(event) => updateField('projectDate', event.target.value)}
                        className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg cursor-pointer"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                        Project Location
                      </label>
                      <div className="relative">
                        <MapPin className="w-5 h-5 text-ink/30 absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.projectLocation}
                          onChange={(event) => updateField('projectLocation', event.target.value)}
                          placeholder="e.g. Manama, Bahrain"
                          className="w-full p-6 pl-16 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                      Reference Link
                    </label>
                    <input
                      type="url"
                      value={formData.referenceLink}
                      onChange={(event) => updateField('referenceLink', event.target.value)}
                      placeholder="Paste a Pinterest, Instagram, Drive, or website link if you have one"
                      className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'client' && (
              <motion.div
                key="client"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <div className="max-w-2xl">
                  <h2 className="text-5xl font-serif text-ink mb-6 leading-tight">
                    Client Identity
                  </h2>
                  <p className="text-ink/60 text-xl font-sans">
                    Share the best way for us to respond and keep the project moving.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(event) => updateField('clientName', event.target.value)}
                      placeholder="Your name"
                      className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(event) => updateField('companyName', event.target.value)}
                      placeholder="Optional"
                      className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(event) => updateField('clientEmail', event.target.value)}
                      placeholder="name@company.com"
                      className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4 group-focus-within:text-gold transition-colors">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(event) => updateField('clientPhone', event.target.value)}
                      placeholder="+973 ..."
                      className="w-full p-6 bg-paper/50 border border-ink/5 rounded-2xl focus:outline-none focus:border-gold focus:bg-white transition-all font-sans text-lg placeholder:text-ink/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-ink/40 uppercase tracking-[0.2em] mb-4">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CONTACT_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => updateField('preferredContact', option.id)}
                        className={cn(
                          'p-5 rounded-2xl border font-sans font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500',
                          formData.preferredContact === option.id
                            ? 'border-gold bg-gold/5 text-ink'
                            : 'border-ink/5 bg-paper/30 text-ink/50 hover:border-gold/30',
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <div className="max-w-2xl">
                  <h2 className="text-5xl font-serif text-ink mb-6 leading-tight">
                    Final Review
                  </h2>
                  <p className="text-ink/60 text-xl font-sans">
                    Review your details before submitting the brief to Exordia.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="bg-paper/30 p-8 rounded-3xl border border-ink/5">
                      <h3 className="text-xs font-sans font-bold text-gold uppercase tracking-[0.3em] mb-6">
                        Project Overview
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Service
                          </p>
                          <p className="font-serif text-2xl text-ink">{selectedService?.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Title
                          </p>
                          <p className="font-serif text-xl text-ink">{formData.projectTitle}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Investment & Timing
                          </p>
                          <p className="font-sans text-ink/70">
                            {formData.budget} BHD • {formData.timeline}
                            {formData.projectDate ? ` • ${formData.projectDate}` : ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Location
                          </p>
                          <p className="font-sans text-ink/70">
                            {formData.projectLocation || 'To be confirmed'}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Brief
                          </p>
                          <p className="font-sans text-ink/70 leading-relaxed">
                            {formData.projectDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-paper/30 p-8 rounded-3xl border border-ink/5">
                      <h3 className="text-xs font-sans font-bold text-gold uppercase tracking-[0.3em] mb-6">
                        Client Details
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Contact
                          </p>
                          <p className="font-serif text-2xl text-ink">{formData.clientName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Organization
                          </p>
                          <p className="font-serif text-xl text-ink">
                            {formData.companyName || 'Independent / Not provided'}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Correspondence
                          </p>
                          <p className="font-sans text-ink/70">{formData.clientEmail}</p>
                          <p className="font-sans text-ink/70">{formData.clientPhone}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                            Preferred Contact
                          </p>
                          <p className="font-sans text-ink/70 capitalize">{formData.preferredContact}</p>
                        </div>
                        {formData.referenceLink && (
                          <div>
                            <p className="text-[10px] text-ink/30 uppercase font-bold tracking-widest mb-1">
                              Reference Link
                            </p>
                            <a
                              href={formData.referenceLink}
                              target="_blank"
                              rel="noreferrer"
                              className="font-sans text-gold hover:text-ink transition-colors break-all"
                            >
                              {formData.referenceLink}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gold/5 rounded-3xl flex items-center gap-6 border border-gold/10">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20">
                    <Sparkles className="text-ink w-7 h-7" />
                  </div>
                  <p className="text-sm text-ink/70 font-sans leading-relaxed italic">
                    Your draft is saved automatically while you fill it in. If direct website delivery is unavailable on your host, Exordia still gives you instant WhatsApp and email delivery options after submission.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-16 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink/25">
              Draft saved automatically
            </div>

            <div className="flex justify-between items-center gap-4">
              {currentStep !== 'service' ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-4 text-ink/40 font-sans font-bold uppercase tracking-[0.2em] text-xs hover:text-ink transition-all group"
                >
                  <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center group-hover:border-ink transition-all duration-500">
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                  Previous
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled}
                className={cn(
                  'bg-ink text-paper px-10 md:px-16 py-6 rounded-full font-sans font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-4 hover:bg-gold hover:text-ink transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed shadow-2xl shadow-ink/10',
                  currentStep === 'confirm' && 'bg-gold text-ink hover:bg-ink hover:text-paper shadow-gold/20',
                )}
              >
                {isSubmitting
                  ? 'Processing...'
                  : currentStep === 'confirm'
                    ? 'Submit Inquiry'
                    : 'Next Step'}
                {!isSubmitting && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
