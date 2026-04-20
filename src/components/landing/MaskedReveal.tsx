import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

type MaskedRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
};

export default function MaskedReveal({
  children,
  className,
  delay = 0,
  amount = 0.5,
  once = true,
}: MaskedRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { y: '115%', opacity: 0.35 }}
        whileInView={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
        viewport={{ once, amount }}
        transition={{
          duration: reduceMotion ? 0 : 0.95,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
