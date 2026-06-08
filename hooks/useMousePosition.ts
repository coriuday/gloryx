import { useEffect, useRef } from 'react';

interface MousePos { x: number; y: number }

/**
 * Returns a ref (not state) containing the current mouse position.
 * Using a ref avoids React re-renders on every mouse move.
 */
export function useMousePosition(): React.RefObject<MousePos> {
  const pos = useRef<MousePos>({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', update, { passive: true });
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return pos;
}
