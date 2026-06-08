'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ease, dur, stagger as staggerCfg } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Initial delay before first word */
  delay?: number;
  /** Per-word stagger delay */
  stagger?: number;
  /** 'words' (default) | 'chars' — chars used for very short hero text */
  mode?: 'words' | 'chars';
  /** Trigger in viewport (default) vs on mount */
  triggerOnView?: boolean;
}

/**
 * L3 Cinematic text reveal.
 * Words clip upward from overflow:hidden containers.
 * Respects prefers-reduced-motion — falls back to simple fade.
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style,
  delay = 0,
  stagger = staggerCfg.words,
  mode = 'words',
  triggerOnView = true,
}) => {
  const reduced = useReducedMotion();

  // Reduced motion: simple fade-in for the whole block
  if (reduced) {
    return (
      <motion.span
        className={className}
        style={{ ...style, display: 'block' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: dur.base, delay }}
      >
        {text}
      </motion.span>
    );
  }

  const tokens = mode === 'words' ? text.split(' ') : text.split('');
  const gap = mode === 'words' ? '0.28em' : '0';

  const hidden  = mode === 'words'
    ? { y: '108%', opacity: 0, filter: 'blur(4px)' }
    : { y: '115%', opacity: 0 };

  const visible = (i: number) => ({
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: dur.medium,
      ease: ease.out,
      delay: delay + i * stagger,
    },
  });

  const anim = triggerOnView ? 'whileInView' : 'animate';

  return (
    <span className={className} style={{ ...style, display: 'block' }}>
      {tokens.map((token, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: mode === 'words' ? gap : '0',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            initial="hidden"
            variants={{ hidden, visible: visible(i) }}
            {...(triggerOnView
              ? { whileInView: 'visible', viewport: { once: true } }
              : { animate: 'visible' })}
          >
            {token}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
