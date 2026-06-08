'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Stat {
  value: string;
  numericEnd: number;
  suffix: string;
  label: string;
  prefix?: string;
  colorStyle: string;
  glowColor: string;
}

const STATS: Stat[] = [
  { value: '50+',  numericEnd: 50, suffix: '+', prefix: '',  label: 'Systems Deployed',      colorStyle: 'var(--gradient-primary)',  glowColor: 'rgba(139,92,246,0.4)' },
  { value: '$2M+', numericEnd: 2,  suffix: 'M+',prefix: '$', label: 'Revenue Generated',     colorStyle: 'var(--gradient-dreamy)',   glowColor: 'rgba(167,139,250,0.4)' },
  { value: '98%',  numericEnd: 98, suffix: '%', prefix: '',  label: 'Client Retention Rate', colorStyle: 'var(--gradient-primary)',  glowColor: 'rgba(236,72,153,0.3)' },
  { value: '45s',  numericEnd: 45, suffix: 's', prefix: '',  label: 'Avg Lead Response',      colorStyle: 'var(--gradient-dreamy)',   glowColor: 'rgba(139,92,246,0.35)' },
  { value: '3',    numericEnd: 3,  suffix: '',  prefix: '',  label: 'Countries Served',       colorStyle: 'var(--gradient-aurora)',   glowColor: 'rgba(110,231,183,0.4)' },
];

const AnimatedCounter: React.FC<{ stat: Stat; animate: boolean; i: number }> = ({ stat, animate, i }) => {
  const [current, setCurrent] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!animate || started.current) return;
    started.current = true;
    const delay = i * 120;
    const timer = setTimeout(() => {
      const dur = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCurrent(Math.round(Math.min(eased, 1) * stat.numericEnd));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [animate, stat.numericEnd, i]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center relative"
    >
      {/* Glowing dot */}
      <motion.div
        className="w-1 h-1 rounded-full mx-auto mb-4"
        style={{
          background: stat.colorStyle,
          boxShadow: `0 0 10px ${stat.glowColor}`,
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
      />

      {/* Number */}
      <p
        className="font-display font-bold text-5xl md:text-6xl mb-2 tabular-nums"
        style={{
          background: stat.colorStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.05em',
        }}
      >
        {stat.prefix}{current}{stat.suffix}
      </p>

      {/* Label */}
      <p
        className="font-sans text-xs font-medium uppercase tracking-wider"
        style={{ color: 'var(--text-muted)', letterSpacing: '0.10em' }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
};

const StatsBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Soft atmospheric gradient */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Top/bottom fade borders */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--glass-border-1), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--glass-border-1), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center gap-4 mb-6 overflow-hidden">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--glass-border-2))' }} />
            <span
              className="font-sans text-[10px] uppercase tracking-[0.25em] font-semibold whitespace-nowrap"
              style={{ color: 'var(--text-muted)' }}
            >
              The Impact
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--glass-border-2), transparent)' }} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-sm max-w-sm mx-auto"
            style={{ color: 'var(--text-muted)', fontStyle: 'italic', letterSpacing: '-0.005em' }}
          >
            Every number is a real outcome, from a real partnership.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 items-start">
          {STATS.map((stat, i) => (
            <AnimatedCounter key={stat.label} stat={stat} animate={started} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
