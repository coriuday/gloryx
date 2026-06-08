'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;   // 0–1, how strongly it pulls (default 0.35)
  radius?: number;     // px around element for magnet to activate (default 90)
  as?: 'button' | 'div' | 'a';
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  style?: React.CSSProperties;
}

/**
 * Magnetic element — subtly moves toward the cursor when nearby.
 * Uses RAF-free spring motion values for GPU-safe animation.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  radius = 90,
  onClick,
  style,
  type = 'button',
  disabled = false,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { damping: 20, stiffness: 160, mass: 0.6 };
  const xSpring = useSpring(x, springCfg);
  const ySpring = useSpring(y, springCfg);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const pull = (1 - dist / radius) * strength;
      x.set(dx * pull);
      y.set(dy * pull);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [radius, strength, x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const onMouseEnter = useCallback(() => {
    window.addEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  const handleMouseLeave = useCallback(() => {
    window.removeEventListener('mousemove', onMouseMove);
    onMouseLeave();
  }, [onMouseMove, onMouseLeave]);

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      className={className}
      style={{ ...style, x: xSpring, y: ySpring }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
