'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { spring as springCfg } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Max tilt degrees — default 8 (reduced from 10 for subtlety) */
  intensity?: number;
  /** Show cursor-tracking spotlight — default true */
  glare?: boolean;
  /** Hover scale — default 1.015 */
  scale?: number;
}

/**
 * 3D tilt card with GPU-accelerated mouse-tracking.
 * All motion disabled when prefers-reduced-motion is set.
 *
 * Performance: uses transform3d only — no layout properties touched.
 */
const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  style,
  intensity = 8,
  glare = true,
  scale = 1.015,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotX     = useMotionValue(0);
  const rotY     = useMotionValue(0);
  const scaleVal = useMotionValue(1);

  const rotXSp  = useSpring(rotX,     springCfg.tilt);
  const rotYSp  = useSpring(rotY,     springCfg.tilt);
  const scaleSp = useSpring(scaleVal, springCfg.tilt);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

    rotX.set(-dy * intensity);
    rotY.set( dx * intensity);
    scaleVal.set(scale);

    // Spotlight via CSS custom props (no re-render)
    if (glare) {
      const px = ((e.clientX - rect.left) / rect.width)  * 100;
      const py = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--spotlight-x', `${px}%`);
      card.style.setProperty('--spotlight-y', `${py}%`);
    }
  }, [reduced, intensity, scale, rotX, rotY, scaleVal, glare]);

  const onLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    scaleVal.set(1);
  }, [rotX, rotY, scaleVal]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        rotateX: reduced ? 0 : rotXSp,
        rotateY: reduced ? 0 : rotYSp,
        scale:   reduced ? 1 : scaleSp,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      {glare && !reduced && <div className="card-spotlight" aria-hidden="true" />}
    </motion.div>
  );
};

export default TiltCard;
