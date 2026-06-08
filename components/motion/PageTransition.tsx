'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { dur, ease } from '@/lib/motion';

interface PageTransitionProps {
  children: React.ReactNode;
  /** Optional extra className on the root wrapper */
  className?: string;
}

/**
 * Shared cinematic page entrance wrapper.
 * Replaces the per-page `motion.div` boilerplate and provides
 * consistent entrance timing + two atmospheric background orbs
 * so every page feels spatially unified.
 *
 * Usage:
 *   <PageTransition>
 *     <Navbar />
 *     <main>...</main>
 *     <Footer />
 *   </PageTransition>
 */
const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => (
  <motion.div
    className={`min-h-screen flex flex-col relative ${className}`}
    style={{ backgroundColor: 'var(--bg-primary)' }}
    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: dur.medium, ease: ease.out }}
  >
    {/* ── Shared atmospheric background orbs ──────────────────
        These two orbs cover the full viewport behind all content.
        Per-page orb duplicates can be removed.
    ────────────────────────────────────────────────────────── */}
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Primary violet orb — top right quadrant */}
      <div
        className="orb absolute w-[700px] h-[700px]"
        style={{
          background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 65%)',
          top: '-15%',
          right: '-5%',
          filter: 'blur(90px)',
          animation: 'atmosphericFloat 22s ease-in-out infinite',
        }}
      />
      {/* Secondary rose orb — bottom left quadrant */}
      <div
        className="orb absolute w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, var(--orb-rose) 0%, transparent 65%)',
          bottom: '5%',
          left: '-5%',
          filter: 'blur(80px)',
          animation: 'atmosphericFloat 18s ease-in-out infinite reverse',
        }}
      />
      {/* Tertiary sage orb — centre depth layer */}
      <div
        className="orb absolute w-[300px] h-[300px]"
        style={{
          background: 'radial-gradient(circle, var(--orb-sage) 0%, transparent 65%)',
          top: '40%',
          left: '40%',
          filter: 'blur(100px)',
          animation: 'atmosphericFloat 28s ease-in-out infinite',
        }}
      />
    </div>

    {/* Page content sits above orbs */}
    <div className="relative z-10 flex flex-col flex-grow">
      {children}
    </div>
  </motion.div>
);

export default PageTransition;
