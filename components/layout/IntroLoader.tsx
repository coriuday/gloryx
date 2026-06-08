'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading');

  useEffect(() => {
    const start = performance.now();
    const duration = 2000;

    const tick = (now: number) => {
      const elapsed = now - start;
      // Eased progress — slow start, fast finish
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2.5);
      const pct = Math.round(eased * 100);
      setProgress(pct);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setPhase('reveal');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 600);
        }, 400);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg-canvas)' }}
          exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Atmospheric orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute w-[700px] h-[700px] rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 65%)',
                top: '10%', left: '20%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(80px)',
                animation: 'atmosphericFloat 8s ease-in-out infinite',
              }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--orb-rose) 0%, transparent 65%)',
                bottom: '15%', right: '20%',
                filter: 'blur(70px)',
                animation: 'atmosphericFloat 10s ease-in-out infinite reverse',
              }}
            />
            <div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--orb-sage) 0%, transparent 65%)',
                top: '60%', left: '60%',
                filter: 'blur(90px)',
                animation: 'atmosphericFloat 13s ease-in-out infinite',
              }}
            />
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-6 max-w-sm w-full text-center">

            {/* Animated logo mark */}
            <motion.div
              className="relative"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-[28px]"
                style={{
                  background: 'var(--gradient-primary)',
                  filter: 'blur(20px)',
                  opacity: 0.35,
                  transform: 'scale(1.4)',
                }}
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Logo mark */}
              <div
                className="relative w-20 h-20 rounded-[24px] flex items-center justify-center"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-brand)',
                }}
              >
                <span className="font-display font-bold text-2xl text-white tracking-tight">BS</span>
              </div>

              {/* Rotating dashed ring */}
              <motion.div
                className="absolute -inset-4 rounded-[36px] border opacity-25"
                style={{ borderColor: 'var(--accent)', borderStyle: 'dashed' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Brand wordmark — clip reveal */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1
                className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-none"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
              >
                Binary<span className="gradient-text">Scouts</span>
              </h1>
              <p
                className="font-sans text-xs mt-3 tracking-[0.2em] uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                Building Intelligent Systems
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div
                className="w-full h-0.5 rounded-full overflow-hidden"
                style={{ background: 'var(--glass-border-1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'var(--gradient-primary)',
                    width: `${progress}%`,
                    transition: 'width 0.05s ease-out',
                    boxShadow: '0 0 10px rgba(139,92,246,0.5)',
                  }}
                />
              </div>

              {/* Reveal overlay */}
              <motion.div
                className="flex justify-between items-center mt-3"
                style={{ opacity: 0.5 }}
              >
                <span
                  className="font-sans text-[10px] uppercase tracking-widest"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Initialising
                </span>
                <span
                  className="font-sans text-[10px] tabular-nums"
                  style={{ color: 'var(--accent)' }}
                >
                  {progress}%
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
