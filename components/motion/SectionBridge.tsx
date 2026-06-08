'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionBridgeProps {
  /** Narrative hint text — sets up what comes next emotionally */
  hint?: string;
  /** 'light-to-dark' = bg-primary → bg-secondary, reverse for other direction */
  direction?: 'light-to-dark' | 'dark-to-light' | 'same';
  /** Show animated scroll indicator line */
  showLine?: boolean;
}

/**
 * Visual + narrative bridge between sections.
 * Creates an emotionally connected flow between otherwise separate sections.
 * The hint text gently prepares the user's mindset for what follows.
 */
const SectionBridge: React.FC<SectionBridgeProps> = ({
  hint,
  direction = 'same',
  showLine = true,
}) => {
  const gradientFrom =
    direction === 'light-to-dark'
      ? 'var(--bg-primary)'
      : direction === 'dark-to-light'
      ? 'var(--bg-secondary)'
      : 'transparent';

  const gradientTo =
    direction === 'light-to-dark'
      ? 'var(--bg-secondary)'
      : direction === 'dark-to-light'
      ? 'var(--bg-primary)'
      : 'transparent';

  return (
    <div
      className="relative flex flex-col items-center pointer-events-none select-none"
      style={{
        height: hint ? '5rem' : '2.5rem',
        background:
          direction !== 'same'
            ? `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
            : 'transparent',
        zIndex: 5,
        marginTop: direction !== 'same' ? '-2rem' : 0,
      }}
      aria-hidden="true"
    >
      {/* Narrative hint text */}
      {hint && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.22em] font-medium text-center px-4"
          style={{ color: 'var(--text-muted)', marginTop: '1rem' }}
        >
          {hint}
        </motion.p>
      )}

      {/* Animated scroll line */}
      {showLine && (
        <div className="relative mt-auto mb-0 flex flex-col items-center" style={{ gap: '3px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: 1.5,
                height: 6,
                background: 'var(--glass-border-2)',
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.22,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionBridge;
