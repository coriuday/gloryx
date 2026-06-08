import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionSafety {
  /** True when user has prefers-reduced-motion: reduce */
  reduced: boolean;
  /** True on low-power conditions (low battery / slow connection) */
  isLowPower: boolean;
  /** True on mobile viewports (< 768px) */
  isMobile: boolean;
  /**
   * Returns the given duration (in seconds), or 0 when motion should
   * be disabled (reduced motion or low power).
   */
  dur: (d: number) => number;
  /**
   * Returns the animated value when motion is enabled,
   * the fallback value when motion should be disabled.
   */
  safe: <T>(animated: T, fallback: T) => T;
  /**
   * CSS transition string — empty string when motion disabled.
   * Useful for inline style transitions.
   */
  transition: (value: string) => string;
}

/**
 * useMotionSafety
 *
 * Unified hook for adaptive cinematic rendering. Combines:
 * - prefers-reduced-motion accessibility preference
 * - Battery API (low battery → simplified effects)
 * - Connection quality (2G → simplified effects)
 * - Mobile viewport detection
 *
 * Usage:
 *   const { reduced, isMobile, dur, safe } = useMotionSafety();
 *   const duration = dur(0.65); // → 0 when disabled
 */
export function useMotionSafety(): MotionSafety {
  const reduced = useReducedMotion();
  const [isLowPower, setIsLowPower] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile detection (rechecks on mount only — viewport doesn't
    // change mid-session in standard browsing)
    setIsMobile(window.innerWidth < 768);

    // Battery API — reduce motion on low/unplugged battery
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{ charging: boolean; level: number }>;
    };
    nav.getBattery?.().then((battery) => {
      if (!battery.charging && battery.level < 0.15) {
        setIsLowPower(true);
      }
    }).catch(() => {
      // Battery API not available — that's fine
    });

    // Network quality — reduce on slow connections
    const conn = (navigator as Navigator & {
      connection?: { effectiveType: string };
    }).connection;
    if (
      conn?.effectiveType === '2g' ||
      conn?.effectiveType === 'slow-2g'
    ) {
      setIsLowPower(true);
    }
  }, []);

  const shouldDisable = reduced || isLowPower;

  return {
    reduced,
    isLowPower,
    isMobile,
    dur: (d: number) => shouldDisable ? 0 : d,
    safe: <T>(animated: T, fallback: T): T => shouldDisable ? fallback : animated,
    transition: (value: string) => shouldDisable ? 'none' : value,
  };
}
