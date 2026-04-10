import { Clock3, FileText, MessageCircle, Sparkles, CheckCircle2, PencilRuler } from 'lucide-react';
import { Link } from 'react-router-dom';

const statuses = [
  {
    title: 'Inquiry Received',
    description:
      'Your booking brief is received and reviewed to understand the service, timing, and desired investment.',
    icon: FileText,
  },
  {
    title: 'Brief Review',
    description:
      'Exordia checks the scope, asks any necessary follow-up questions, and decides the best creative direction.',
    icon: Sparkles,
  },
  {
    title: 'Discovery Call',
    description:
      'If needed, we reach out by your preferred contact method to align on goals, deliverables, and expectations.',
    icon: MessageCircle,
  },
  {
    title: 'Proposal & Confirmation',
    description:
      'You receive the proposed direction, timeline, and next-step confirmation before production begins.',
    icon: PencilRuler,
  },
  {
    title: 'Production',
    description:
      'The work is created, refined, and shared for review with practical updates along the way.',
    icon: Clock3,
  },
  {
    title: 'Delivery & Revisions',
    description:
      'Final files, agreed revisions, and project close-out are handled cleanly so the experience stays simple.',
    icon: CheckCircle2,
  },
];

export default function BusinessDashboard() {
  return (
    <div className="bg-paper min-h-screen py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">
                Client Journey
              </span>
            </div>
            <h1 className="text-5xl font-serif text-ink tracking-tight">
              What Happens <span className="italic">After You Book</span>
            </h1>
          </div>
          <Link
            to="/book"
            className="bg-ink text-paper px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest-xl hover:bg-gold hover:text-ink transition-all shadow-2xl shadow-ink/10"
          >
            Start Booking
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              label: 'Response Style',
              value: 'Simple & Direct',
            },
            {
              label: 'Primary Follow-Up',
              value: 'Email / WhatsApp',
            },
            {
              label: 'Best For',
              value: 'Startup-Friendly Projects',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-ink/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-paper rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2" />
              <p className="text-ink/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 relative z-10">
                {item.label}
              </p>
              <p className="text-4xl font-serif text-ink relative z-10">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-ink/5 overflow-hidden">
          <div className="p-10 md:p-12 border-b border-ink/5">
            <h2 className="text-3xl font-serif text-ink tracking-tight mb-2">
              Exordia <span className="italic">Status Flow</span>
            </h2>
            <p className="text-xs text-ink/40 font-bold uppercase tracking-widest">
              A simple status structure that keeps the process practical and clear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-ink/5">
            {statuses.map((status) => (
              <div key={status.title} className="p-10 md:p-12 hover:bg-paper/30 transition-all">
                <div className="w-16 h-16 bg-ink rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-ink/10">
                  <status.icon className="text-gold w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-ink tracking-tight mb-4">
                  {status.title}
                </h3>
                <p className="text-ink/55 leading-relaxed text-base">
                  {status.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-ink rounded-[3rem] p-10 md:p-12 text-paper relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full filter blur-[100px] translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-4">
                Keep It Light
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Clear process, no unnecessary complexity
              </h2>
              <p className="text-paper/65 leading-relaxed">
                This portal is designed to help Exordia launch cleanly as a startup. It focuses on a strong brief, simple follow-up, and a workflow that is easy to manage without heavy systems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/book"
                className="bg-gold text-ink px-8 py-5 rounded-full font-bold text-xs uppercase tracking-widest-xl hover:bg-paper transition-all text-center"
              >
                Submit A Brief
              </Link>
              <a
                href="https://wa.me/97336222349"
                target="_blank"
                rel="noreferrer"
                className="border border-paper/15 px-8 py-5 rounded-full font-bold text-xs uppercase tracking-widest-xl hover:bg-paper hover:text-ink transition-all text-center"
              >
                WhatsApp Exordia
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
