import { motion } from 'motion/react';

const sections = [
  {
    title: 'Project Inquiries',
    body:
      'Submitting a booking request through Exordia does not automatically create a binding contract. It starts a conversation so Exordia can review the scope and confirm whether the request is a fit.',
  },
  {
    title: 'Quotes And Scope',
    body:
      'Any timelines, deliverables, pricing, and production details will be discussed and agreed separately after the initial inquiry. Desired investment fields on the website are for guidance only.',
  },
  {
    title: 'Client Responsibilities',
    body:
      'Clients are expected to provide accurate information, timely feedback, and any materials required for the work. Delays in approvals or missing materials may affect timelines.',
  },
  {
    title: 'Creative Delivery',
    body:
      'Exordia will make reasonable efforts to deliver agreed work professionally and on time, but final delivery schedules depend on project complexity, revisions, third-party dependencies, and communication turnaround.',
  },
  {
    title: 'Communication',
    body:
      'Exordia may communicate by email, phone, or WhatsApp depending on the preferred contact method you submit. Please make sure your provided details are correct and reachable.',
  },
];

export default function TermsOfService() {
  return (
    <div className="bg-paper min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">
            Terms
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-10">
            Terms of <span className="italic text-gold">Service</span>
          </h1>
          <p className="text-xl text-ink/60 leading-relaxed font-serif mb-16 max-w-3xl">
            These website terms are meant to keep the first interaction clear, simple, and fair for both Exordia and prospective clients.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-white rounded-3xl border border-ink/5 p-8 md:p-10"
            >
              <h2 className="text-3xl font-serif text-ink mb-4">{section.title}</h2>
              <p className="text-ink/65 leading-relaxed text-lg">{section.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
