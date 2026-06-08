import { useEffect, useState } from 'react';

/**
 * Returns true when the user has requested reduced motion
 * via their OS / browser accessibility settings.
 *
 * Usage:
 *   const reduced = useReducedMotion();
 *   const duration = reduced ? 0 : 0.65;
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
