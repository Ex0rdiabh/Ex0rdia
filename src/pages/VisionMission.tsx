import { motion } from 'motion/react';

export default function VisionMission() {
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
            Our Future
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-ink leading-[0.9] mb-12">
            Vision & <br />
            <span className="italic text-gold">Mission</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mt-24">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-tight">
              Our Vision
            </h2>
            <p className="text-2xl md:text-[2rem] text-ink/72 leading-[1.8] font-serif italic max-w-[22ch]">
              To become Bahrain’s leading creative marketplace, empowering a new generation of talent while transforming how businesses access creative services.
            </p>
          </div>

          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-tight">
              Our Mission
            </h2>
            <p className="text-xl md:text-[1.9rem] text-ink/72 leading-[1.8] font-serif italic max-w-[22ch]">
              To bridge the gap between businesses and local creatives by providing a trusted, efficient platform for high-quality, on-demand creative services — while supporting and elevating Bahraini youth in the creative industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
