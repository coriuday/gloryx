'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        transformOrigin: '0%',
        zIndex: 9999,
        background: 'linear-gradient(90deg, #6366f1, #06b6d4, #818cf8)',
        boxShadow: '0 0 12px rgba(99,102,241,0.7)',
      }}
    />
  );
};

export default ScrollProgressBar;
