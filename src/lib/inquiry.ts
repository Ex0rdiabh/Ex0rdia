export const EXORDIA_EMAIL = "Ex0rdia@outlook.com";
export const EXORDIA_WHATSAPP = "97336222349";

export const BOOKING_DRAFT_KEY = "exordia-booking-draft";
export const CONTACT_DRAFT_KEY = "exordia-contact-draft";

export type BookingFormData = {
  inquiryId: string;
  serviceId: string;
  projectTitle: string;
  projectDescription: string;
  budget: string;
  projectDate: string;
  clientName: string;
  companyName: string;
  clientEmail: string;
  clientPhone: string;
  projectLocation: string;
  timeline: string;
  preferredContact: string;
  referenceLink: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const INITIAL_BOOKING_FORM: BookingFormData = {
  inquiryId: "",
  serviceId: "",
  projectTitle: "",
  projectDescription: "",
  budget: "",
  projectDate: "",
  clientName: "",
  companyName: "",
  clientEmail: "",
  clientPhone: "",
  projectLocation: "",
  timeline: "",
  preferredContact: "email",
  referenceLink: "",
};

export const INITIAL_CONTACT_FORM: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

export function canUseServerDelivery() {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  return !(
    hostname.endsWith("github.io") ||
    hostname === "localhost" && window.location.port === "" ||
    window.location.protocol === "file:"
  );
}

export const SERVICE_GUIDANCE: Record<
  string,
  { title: string; checklist: string[] }
> = {
  design: {
    title: "Graphic Design",
    checklist: [
      "Share what you need designed and where it will be used.",
      "Mention any brand colors, references, or current materials.",
      "Tell us if this is a one-off asset or part of a wider rollout.",
    ],
  },
  video: {
    title: "Videography",
    checklist: [
      "Outline the story, target audience, and desired length.",
      "Let us know if you need filming, editing, subtitles, or all three.",
      "Mention location, dates, and whether talent or voiceover is needed.",
    ],
  },
  photo: {
    title: "Photography",
    checklist: [
      "Tell us what is being photographed and where the shoot happens.",
      "Mention whether you need product, portrait, event, or lifestyle imagery.",
      "Add timing expectations and any must-have shot list items.",
    ],
  },
  event: {
    title: "Event Management",
    checklist: [
      "Share the event type, expected guest count, and target date.",
      "Tell us what support you need, from planning to on-site coordination.",
      "Mention venue status, vendors involved, and any brand priorities.",
    ],
  },
};

export function generateInquiryId() {
  return `EX-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()
    .toString()
    .slice(-4)}`;
}

export function getServiceName(serviceId: string) {
  return SERVICE_GUIDANCE[serviceId]?.title ?? serviceId ?? "General Inquiry";
}

export function formatBookingSummary(formData: BookingFormData) {
  return [
    `Inquiry ID: ${formData.inquiryId || "Pending"}`,
    `Service: ${getServiceName(formData.serviceId)}`,
    `Project Title: ${formData.projectTitle}`,
    `Project Description: ${formData.projectDescription}`,
    `Desired Investment: ${formData.budget ? `${formData.budget} BHD` : "Not provided"}`,
    `Target Date: ${formData.projectDate || "Flexible"}`,
    `Timeline: ${formData.timeline || "Flexible"}`,
    `Project Location: ${formData.projectLocation || "Not specified"}`,
    `Preferred Contact: ${formData.preferredContact || "Email"}`,
    `Reference Link: ${formData.referenceLink || "None"}`,
    "",
    "Client Details",
    `Name: ${formData.clientName}`,
    `Company: ${formData.companyName || "Not provided"}`,
    `Email: ${formData.clientEmail}`,
    `Phone: ${formData.clientPhone || "Not provided"}`,
  ].join("\n");
}

export function getBookingMailtoUrl(formData: BookingFormData) {
  return `mailto:${EXORDIA_EMAIL}?subject=${encodeURIComponent(
    `Booking Inquiry: ${formData.projectTitle || getServiceName(formData.serviceId)}`
  )}&body=${encodeURIComponent(formatBookingSummary(formData))}`;
}

export function getBookingWhatsAppUrl(formData: BookingFormData) {
  return `https://wa.me/${EXORDIA_WHATSAPP}?text=${encodeURIComponent(
    formatBookingSummary(formData)
  )}`;
}

export function formatContactSummary(formData: ContactFormData) {
  return [
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    "",
    formData.message,
  ].join("\n");
}

export function getContactMailtoUrl(formData: ContactFormData) {
  return `mailto:${EXORDIA_EMAIL}?subject=${encodeURIComponent(
    `Contact Message from ${formData.name || "Website Visitor"}`
  )}&body=${encodeURIComponent(formatContactSummary(formData))}`;
}

export function getContactWhatsAppUrl(formData: ContactFormData) {
  return `https://wa.me/${EXORDIA_WHATSAPP}?text=${encodeURIComponent(
    formatContactSummary(formData)
  )}`;
}
