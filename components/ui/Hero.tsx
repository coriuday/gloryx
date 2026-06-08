'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap, Users } from 'lucide-react';
import { ease, dur, spring as springCfg } from '@/lib/motion';

/* ── Staggered word-reveal animation ─────────────────── */
const WordReveal: React.FC<{ text: string; delay?: number; className?: string }> = ({
  text, delay = 0, className = '',
}) => {
  const words = text.split(' ');
  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block', marginRight: '0.28em' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ── Animated metric counter ─────────────────────────── */
const AnimatedMetric: React.FC<{ end: number; prefix?: string; suffix?: string; delay: number }> = ({
  end, prefix = '', suffix = '', delay,
}) => {
  const [val, setVal] = useState(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const timeout = setTimeout(() => {
      if (!mountedRef.current) return;
      const duration = 1400;
      const start = performance.now();
      let raf: number;
      const tick = (now: number) => {
        if (!mountedRef.current) return;
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(eased * end));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delay * 1000);

    return () => {
      mountedRef.current = false;
      clearTimeout(timeout);
    };
  }, [end, delay]);

  return (
    <span className="font-display font-bold text-xl tabular-nums" style={{ color: 'var(--accent)' }}>
      {prefix}{val}{suffix}
    </span>
  );
};

/* ── Floating Dashboard Mockup ───────────────────────── */
const BAR_HEIGHTS = [28, 48, 36, 64, 50, 78, 95];

// React.memo: DashboardMockup has no props and is expensive to render.
// Prevent re-renders when Hero's scroll/mouse motion values change.
const DashboardMockup: React.FC = React.memo(() => (
  <div
    className="glass-card rounded-3xl p-5 w-full max-w-[320px] select-none"
    style={{ background: 'var(--glass-2)' }}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <div>
        <p className="font-sans text-[10px] font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>
          Live Overview
        </p>
        <p className="font-display font-bold text-base leading-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
          Q2 Performance
        </p>
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <TrendingUp size={15} className="text-white" />
      </motion.div>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-2 gap-2 mb-4">
      {[
        { label: 'Lead Velocity', end: 127, suffix: '%', prefix: '+', delay: 0.6 },
        { label: 'Pipeline',      end: 24,  suffix: 'M',  prefix: '$', delay: 0.7 },
        { label: 'Avg Response',  end: 45,  suffix: 's',  prefix: '',  delay: 0.8 },
        { label: 'Conversions',   end: 94,  suffix: '%',  prefix: '',  delay: 0.9 },
      ].map((m) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: ease.out, delay: m.delay }}
          className="rounded-2xl p-3"
          style={{ background: 'var(--glass-1)', border: '1px solid var(--glass-border-1)' }}
        >
          <p className="font-sans text-[9px] mb-1" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
          <AnimatedMetric end={m.end} prefix={m.prefix} suffix={m.suffix} delay={m.delay} />
        </motion.div>
      ))}
    </div>

    {/* Bar chart */}
    <div>
      <p className="font-sans text-[9px] mb-2" style={{ color: 'var(--text-muted)' }}>Monthly Growth</p>
      <div className="flex items-end gap-1.5 h-14">
        {BAR_HEIGHTS.map((h, i) => (
          <div key={i} className="flex-1 relative overflow-hidden rounded-t" style={{ height: '100%' }}>
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-t"
              style={{
                background: i === 6
                  ? 'var(--gradient-primary)'
                  : 'var(--glass-border-1)',
              }}
              initial={{ height: '0%' }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.9, ease: [0.34, 1.4, 0.64, 1], delay: 0.6 + i * 0.06 }}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Status */}
    <div
      className="flex items-center justify-between mt-4 pt-4"
      style={{ borderTop: '1px solid var(--glass-border-1)' }}
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ backgroundColor: 'var(--sage)' }}
          />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: 'var(--sage)' }} />
        </span>
        <span className="font-sans text-[9px] font-medium" style={{ color: 'var(--text-muted)' }}>
          All systems live
        </span>
      </div>
      <span className="font-sans text-[8px]" style={{ color: 'var(--text-muted)' }}>Real-time</span>
    </div>
  </div>
));
DashboardMockup.displayName = 'DashboardMockup';

/* ══════════════════════════════════════════════════════════
   HERO — Cinematic Atmospheric
══════════════════════════════════════════════════════════ */
const Hero: React.FC = () => {
  // Detect mobile once on mount — not reactive (viewport doesn't change mid-session)
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    []
  );

  const { scrollY } = useScroll();
  // On mobile, disable scroll transforms entirely — saves 4 spring chains
  // on the devices with the least GPU budget.
  const heroO  = useTransform(scrollY, [0, 500], isMobile ? [1, 1] : [1, 0]);
  const heroS  = useTransform(scrollY, [0, 500], isMobile ? [1, 1] : [1, 0.97]);
  const bgY    = useTransform(scrollY, [0, 600], isMobile ? [0, 0] : [0, 60]);
  const orbO   = useTransform(scrollY, [0, 350], isMobile ? [1, 1] : [1, 0]);

  /* Mouse parallax — 3 independent layers */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Layer 1: orbs (slow, ultra-subtle)
  const orbX   = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]),  springCfg.slow);
  const orbY   = useSpring(useTransform(mouseY, [-1, 1], [-4, 4]),  springCfg.slow);
  // Layer 2: panel (standard)
  const panelX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), springCfg.follow);
  const panelY = useSpring(useTransform(mouseY, [-1, 1], [-8, 8]),   springCfg.follow);

  // RAF ref for mousemove throttle
  const rafId = useRef<number>(0);

  // Throttle mousemove to a single RAF frame (16ms) — prevents firing
  // on every pixel of movement which would update 4 spring chains per event.
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    cancelAnimationFrame(rafId.current);
    const cx = e.clientX;
    const cy = e.clientY;
    rafId.current = requestAnimationFrame(() => {
      mouseX.set((cx / window.innerWidth  - 0.5) * 2);
      mouseY.set((cy / window.innerHeight - 0.5) * 2);
    });
  }, [isMobile, mouseX, mouseY]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  return (
    <motion.section
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-28 pb-20"
      style={{ backgroundColor: 'var(--bg-primary)', opacity: heroO, scale: heroS }}
      onMouseMove={handleMouseMove}
    >
      {/* ── Layer 0: Atmospheric gradient background ─────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, zIndex: 0, opacity: orbO }}
      >
        {/* Main atmospheric gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 15% 20%, var(--orb-violet) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 85% 75%, var(--orb-rose) 0%, transparent 60%),
              radial-gradient(ellipse 45% 35% at 55% 55%, var(--orb-sage) 0%, transparent 60%)
            `,
          }}
        />
      </motion.div>

      {/* ── Layer 1: Floating orbs — mouse parallax slow ──── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: orbX, y: orbY, zIndex: 1, opacity: orbO }}
      >
        <div
          className="orb absolute w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)',
            top: '-8%', left: '-5%',
            filter: 'blur(70px)',
            animation: 'orbitA 22s ease-in-out infinite',
          }}
        />
        <div
          className="orb absolute w-[450px] h-[450px]"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 65%)',
            bottom: '-5%', right: '-5%',
            filter: 'blur(70px)',
            animation: 'orbitB 28s ease-in-out infinite',
          }}
        />
        <div
          className="orb absolute w-[300px] h-[300px]"
          style={{
            background: 'radial-gradient(circle, rgba(110,231,183,0.10) 0%, transparent 65%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)',
            animation: 'atmosphericFloat 18s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT: Copy ──────────────────────────────── */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: dur.base, ease: ease.spring }}
              className="inline-flex items-center gap-2 mb-8 eyebrow-badge"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              >
                <Sparkles size={13} style={{ color: 'var(--accent)' }} />
              </motion.div>
              <span>AI-Native Engineering Studio</span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-display font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.02] tracking-tight mb-6 text-balance"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
            >
              <WordReveal text="We build systems" delay={0.1} />
              <br />
              <WordReveal text="that" delay={0.34} />
              {' '}
              <span className="gradient-text gradient-text-animated">
                <WordReveal text="scale futures." delay={0.44} />
              </span>
            </h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: dur.medium, ease: ease.out, delay: 0.75 }}
              className="font-sans text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
            >
              Most agencies deliver deliverables. We engineer outcomes — AI pipelines, automated
              systems, and growth infrastructure that compound over time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.base, ease: ease.out, delay: 1.0 }}
              className="flex flex-wrap gap-3 items-center"
            >
              <Link href="/planner">
                <button className="btn-primary shimmer-sweep text-base px-8 py-4 gap-2">
                  Start the Conversation
                  <ArrowRight size={17} />
                </button>
              </Link>
              <Link href="/games">
                <button className="btn-secondary text-base px-8 py-4">
                  See Our Work
                </button>
              </Link>
            </motion.div>

            {/* Mobile capability chips — visible only below lg */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur.slow, delay: 1.15 }}
              className="flex flex-wrap gap-2 mt-6 lg:hidden"
            >
              {['AI Systems', 'CRM Automation', 'Growth Eng.', 'Full Stack'].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 rounded-full font-sans text-xs font-semibold"
                  style={{
                    background: 'var(--glass-2)',
                    border: '1px solid var(--glass-border-2)',
                    color: 'var(--text-secondary)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* Trust strip — identity stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur.slow, delay: 1.35 }}
              className="flex items-center gap-5 sm:gap-8 mt-12 pt-8 flex-wrap"
              style={{ borderTop: '1px solid var(--glass-border-1)' }}
            >
              {[
                { label: '50+',  sub: 'Systems deployed'    },
                { label: '$2M+', sub: 'Revenue generated'   },
                { label: '98%',  sub: 'Client retention'    },
              ].map(({ label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur.fast, ease: ease.out, delay: 1.35 + i * 0.09 }}
                  className="flex flex-col"
                >
                  <p
                    className="font-display font-bold text-xl leading-none mb-0.5"
                    style={{
                      background: 'var(--gradient-primary)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {label}
                  </p>
                  <p className="font-sans text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {sub}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Floating dashboard panel ─────────── */}
          <motion.div
            className="hidden lg:flex justify-center items-center relative"
            initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: dur.cinematic, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            style={{ x: panelX, y: panelY }}
          >
            {/* Ambient glow behind panel */}
            <div
              className="absolute inset-0 rounded-[40px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.22) 0%, transparent 70%)',
                filter: 'blur(48px)',
                animation: 'glowPulse 5s ease-in-out infinite',
                transform: 'scale(1.35)',
                willChange: 'transform, opacity',
              }}
            />

            {/* Main floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
            >
              <DashboardMockup />
            </motion.div>

            {/* Floating chip A — top right */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.34, 1.4, 0.64, 1] }}
              className="glass-chip absolute -top-5 -right-6 px-3.5 py-2.5 rounded-2xl flex items-center gap-2"
              style={{ animation: 'chipFloat 5s ease-in-out infinite' }}
            >
              <Zap size={13} style={{ color: 'var(--accent)' }} />
              <div>
                <p className="font-sans text-[11px] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  240 leads/week
                </p>
                <p className="font-sans text-[9px]" style={{ color: 'var(--text-muted)' }}>
                  Automation Active
                </p>
              </div>
            </motion.div>

            {/* Floating chip B — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: [0.34, 1.4, 0.64, 1] }}
              className="glass-chip absolute -bottom-4 -left-6 px-3.5 py-2.5 rounded-2xl flex items-center gap-2"
              style={{ animation: 'chipFloat 6s ease-in-out infinite', animationDelay: '1.5s' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: 'var(--sage)', boxShadow: '0 0 8px var(--sage)' }}
              />
              <div>
                <p className="font-sans text-[11px] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  AI Response 45ms
                </p>
                <p className="font-sans text-[9px]" style={{ color: 'var(--text-muted)' }}>
                  99.98% uptime
                </p>
              </div>
            </motion.div>

            {/* Floating metric — right middle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.34, 1.4, 0.64, 1] }}
              className="glass-chip absolute top-1/2 -right-12 px-3 py-2 rounded-xl"
              style={{ animation: 'chipFloat 4.5s ease-in-out infinite', animationDelay: '0.8s' }}
            >
              <p
                className="font-display font-bold text-sm leading-none"
                style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                +127%
              </p>
              <p className="font-sans text-[8px] mt-0.5" style={{ color: 'var(--text-muted)' }}>velocity</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default Hero;