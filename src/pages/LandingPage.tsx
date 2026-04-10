import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';
import heroImage from '../assets/hero-new.jpg';

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-paper">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gold/10 rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-glow"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full filter blur-[100px] translate-x-1/2 translate-y-1/2 animate-glow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gold"></div>
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">
                  Bahrain's Creative Future
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-10 text-balance">
                Fresh minds. <br />
                <span className="italic text-gold">Big impact</span>
              </h1>
              
              <p className="text-xl text-ink/60 mb-12 max-w-lg leading-relaxed font-serif italic">
                Exordia helps businesses book thoughtful creative support in a simpler way. From design to media and event work, we keep the first step clear, practical, and easy to start.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 items-center">
                <Link to="/book" className="group relative bg-ink text-paper px-12 py-6 rounded-full font-bold text-sm uppercase tracking-widest-xl hover:bg-gold hover:text-ink transition-all duration-500 shadow-2xl shadow-ink/10 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Start My Booking <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
                <Link to="/dashboard" className="text-[11px] font-bold uppercase tracking-widest-xl text-ink border-b-2 border-gold pb-2 hover:text-gold transition-colors">
                  See The Client Journey
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden shadow-2xl rotate-2 group hover:rotate-0 transition-transform duration-700 animate-float">
                <img 
                  src={heroImage} 
                  alt="Exordia Team" 
                  className="absolute inset-0 w-full h-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-ink text-paper relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { icon: Shield, title: "Local Talent, Global Standard", desc: "We empower Bahrain's brightest young creatives to deliver work that competes on a global stage." },
              { icon: Clock, title: "Agile & Efficient", desc: "We focus on a clean first step, practical follow-up, and startup-friendly communication that avoids unnecessary complexity." },
              { icon: Star, title: "Impactful Collaborations", desc: "Every project begins with a strong brief so the work can move from inquiry to action with confidence." }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="w-16 h-16 bg-paper/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                  <item.icon className="text-gold group-hover:text-ink w-8 h-8 transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-paper/60 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative background text */}
        <div className="absolute bottom-0 left-0 text-[20vw] font-serif text-paper/5 leading-none -translate-x-10 translate-y-1/2 pointer-events-none select-none italic">
          Prestige
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">The Methodology</span>
              <h2 className="text-5xl md:text-7xl font-serif text-ink leading-tight">A Refined Path to <br /><span className="italic">Creative Mastery</span></h2>
            </div>
            <Link to="/book" className="text-[11px] font-bold uppercase tracking-widest-xl text-ink border-b-2 border-gold pb-2 hover:text-gold transition-colors">
              Explore Services
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", title: "Vision", desc: "Share your goals and let our fresh minds brainstorm the perfect approach." },
              { step: "02", title: "Match", desc: "We pair your project with the ideal Bahraini creative for the job." },
              { step: "03", title: "Creation", desc: "Watch as your ideas are transformed into high-impact creative assets." },
              { step: "04", title: "Impact", desc: "Launch your project and see the difference that fresh talent makes." }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="text-8xl font-serif text-ink/5 absolute -top-12 -left-4 z-0 transition-colors group-hover:text-gold/10">{item.step}</span>
                <div className="relative z-10 pt-8 border-t border-ink/10">
                  <h3 className="text-xl font-serif text-ink mb-4">{item.title}</h3>
                  <p className="text-ink/50 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-paper relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-ink rounded-[4rem] py-24 px-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full filter blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full filter blur-[80px] -translate-x-1/2 translate-y-1/2"></div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-paper mb-10 leading-tight relative z-10">
              Make an <br /><span className="italic text-gold">Impact</span>
            </h2>
            <p className="text-lg text-paper/60 mb-12 max-w-xl mx-auto font-light leading-relaxed relative z-10">
              Partner with Bahrain's next generation of talent and see the difference that fresh minds can make for your brand.
            </p>
            <Link to="/book" className="inline-block bg-gold text-ink px-16 py-6 rounded-full font-bold text-sm uppercase tracking-widest-xl hover:bg-paper transition-all duration-500 relative z-10 shadow-xl shadow-gold/20">
              Initiate Booking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
