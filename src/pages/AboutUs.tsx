import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <div className="bg-paper min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold mb-6 block">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-12">
            The Philosophy of <br />
            <span className="italic text-gold">Exordia</span>
          </h1>
          <p className="text-xl text-ink/60 leading-relaxed font-serif mb-12">
            Exordia is a Bahrain-based creative services marketplace built to connect businesses with talented local creatives — quickly, affordably, and without the complexity of traditional agencies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-ink">Empowering Bahraini Youth</h2>
            <p className="text-[20px] text-ink/60 leading-relaxed font-[Georgia]">
              We empower Bahraini youth by giving them a platform to showcase their skills, gain real opportunities, and grow professionally. At the same time, we help businesses access high-quality creative work on demand — from design and photography to content creation and event coverage.
            </p>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-ink">Simplicity & Quality</h2>
            <p className="text-[20px] text-ink/60 leading-relaxed font-[Georgia]">
              With a focus on simplicity, speed, and quality, Exordia makes it easy to browse, book, and pay for creative services — all in one place. We are transforming how the creative industry operates in Bahrain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
