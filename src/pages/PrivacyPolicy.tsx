import { motion } from 'motion/react';

const sections = [
  {
    title: 'What We Collect',
    body:
      'When you submit a booking or contact form, Exordia may collect your name, company name, email address, phone number, project details, desired investment, and any links or references you choose to share.',
  },
  {
    title: 'Why We Collect It',
    body:
      'We use this information only to review your request, respond to you, prepare project discussions, and manage communication around the services you asked about.',
  },
  {
    title: 'How We Store It',
    body:
      'Messages submitted through the website may be sent to Exordia by email and may also be stored temporarily in your browser while you complete the form. We do not sell your information or share it for advertising purposes.',
  },
  {
    title: 'Third-Party Services',
    body:
      'Exordia may use trusted third-party services for website hosting, form delivery, email notifications, and analytics. These services only receive the information needed to support the website.',
  },
  {
    title: 'Your Choices',
    body:
      'You may contact Exordia at Ex0rdia@outlook.com to request that your information be updated or deleted, subject to reasonable record-keeping needs for active projects and legal obligations.',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-paper min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">
            Privacy
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-10">
            Privacy <span className="italic text-gold">Policy</span>
          </h1>
          <p className="text-xl text-ink/60 leading-relaxed font-serif mb-16 max-w-3xl">
            Exordia is a startup creative service platform. We keep our privacy practices simple: collect only what helps us review your request and communicate with you professionally.
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
