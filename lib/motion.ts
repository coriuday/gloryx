/**
 * BinaryScouts Motion Language System
 *
 * Strict L1/L2/L3 hierarchy. Every animation in the codebase
 * should reference these constants — never hardcode timings.
 *
 * L1 Microinteractions  150–300ms  → hover, glow, icon
 * L2 Component          300–700ms  → card reveal, modal, tab
 * L3 Cinematic          700–2000ms → hero, section entrance
 *
 * Performance notes:
 * - fadeUp: filter:blur removed. Use opacity+y only for section
 *   entrances (cheaper — no stencil buffer per element).
 * - fadeUpBlur: hero/key-moments only. Justified cost at L3.
 * - All keyframe animations use translate3d (not scale) for pure
 *   GPU compositing.
 */

// ── Easing Curves ──────────────────────────────────────────
export const ease = {
  /** Standard content reveal — smooth, no overshoot */
  out:    [0.22, 1, 0.36, 1]    as [number,number,number,number],
  /** Entrance with spring feel — slight overshoot */
  spring: [0.34, 1.26, 0.64, 1] as [number,number,number,number],
  /** Fast in, slow out — for elements leaving */
  in:     [0.64, 0, 0.78, 0]    as [number,number,number,number],
  /** Symmetrical — for toggles and swaps */
  inOut:  [0.65, 0, 0.35, 1]    as [number,number,number,number],
} as const;

// ── Duration Tiers ─────────────────────────────────────────
export const dur = {
  /** L1 Microinteraction */
  micro:    0.18,
  /** L1 Hover / glow */
  fast:     0.25,
  /** L2 Component reveal */
  base:     0.45,
  /** L2 Section element */
  medium:   0.65,
  /** L3 Cinematic entrance */
  slow:     0.90,
  /** L3 Hero sequence */
  cinematic:1.20,
} as const;

// ── Stagger Configs ────────────────────────────────────────
export const stagger = {
  /** Cards, list items */
  items:   0.07,
  /** Words in text reveal */
  words:   0.08,
  /** Characters in char reveal */
  chars:   0.035,
  /** Major sections */
  sections:0.15,
} as const;

// ── Spring Configs ─────────────────────────────────────────
export const spring = {
  /** Magnetic / cursor follow */
  follow:   { damping: 22, stiffness: 160, mass: 0.6 },
  /** 3D tilt card */
  tilt:     { damping: 22, stiffness: 200, mass: 0.8 },
  /** Scroll progress bar */
  progress: { stiffness: 200, damping: 30, restDelta: 0.001 },
  /** Drawer / modal */
  drawer:   { type: 'spring' as const, stiffness: 320, damping: 32, mass: 0.9 },
  /** Badge pop */
  badge:    { type: 'spring' as const, stiffness: 380, damping: 28 },
  /** Atmospheric orb parallax — ultra-subtle, dreamlike */
  slow:     { damping: 28, stiffness: 35, mass: 1.2 },
} as const;

// ── Shared Framer Motion Variants ──────────────────────────

/**
 * Standard fade-up for section content.
 * Performance: opacity+y only — no filter:blur.
 * Using blur on section entrances creates a stencil buffer per element,
 * which is expensive when 10–20 elements animate simultaneously.
 */
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: dur.medium, ease: ease.out, delay },
  }),
};

/**
 * Hero / key-moment fade-up WITH blur.
 * Reserved for L3 cinematic entrances only (hero headline, section headers).
 * Cost is justified for 1–3 elements, not for 20-element grids.
 */
export const fadeUpBlur = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: dur.slow, ease: ease.out, delay },
  }),
};

/** Clip-reveal for headlines (overflow:hidden on wrapper) */
export const clipReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: (delay = 0) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: dur.medium, ease: ease.out, delay },
  }),
};

/** Card stagger container */
export const staggerContainer = (delayChildren = 0, staggerChildren = stagger.items) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren, staggerChildren } },
});

/** Viewport config — once:true prevents re-triggering */
export const viewport = (margin = '-60px') => ({ once: true, margin });
