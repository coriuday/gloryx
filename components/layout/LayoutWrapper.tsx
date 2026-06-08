'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/hooks/ThemeProvider';
import { AudioProvider } from '@/components/hooks/AudioProvider';
import CustomCursor from '@/components/layout/CustomCursor';
import CrewTicker from '@/components/layout/CrewTicker';
import Terminal from '@/components/ui/Terminal';
import ScrollProgressBar from '@/components/motion/ScrollProgressBar';

interface LayoutWrapperProps {
  children: React.ReactNode;
  bodyClass: string;
}

export default function LayoutWrapper({ children, bodyClass }: LayoutWrapperProps) {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body
      className={`${bodyClass} antialiased min-h-screen`}
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <AudioProvider>
        {/* Scroll progress line — top of viewport, above everything */}
        {mounted && <ScrollProgressBar />}

        {/* Custom cursor — desktop only, disabled on touch */}
        {mounted && <CustomCursor />}

        {/* System status ticker — hidden on mobile, visible from md: */}
        <div className="hidden md:block">
          <CrewTicker />
        </div>

        {/* Page content */}
        {children}

        {/* Floating AI terminal — event-driven via bs:terminal-toggle */}
        <Terminal />
      </AudioProvider>
    </body>
  );
}
