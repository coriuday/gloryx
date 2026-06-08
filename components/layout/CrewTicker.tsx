'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Zap, Globe } from 'lucide-react';

const TICKER_ITEMS = [
  'System health: All services operational',
  'CRM automation pipeline: Active — 240 leads processed this week',
  'AI integration layer: Online — Response time 85ms avg',
  'Infrastructure status: 99.98% uptime over last 30 days',
  'New deployment: BinaryScouts Studio v3.0 successfully launched',
  'Analytics: Organic traffic +127% this quarter across managed properties',
];

const CrewTicker: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setLogIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
        setVisible(true);
      }, 350);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-8 flex items-center justify-between px-4 md:px-6 select-none relative z-[60]"
      style={{
        backgroundColor: 'var(--ticker-bg)',
        borderBottom: '1px solid var(--ticker-border)',
      }}
    >
      {/* Left: live status */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent)' }} />
        </span>
        <span
          className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-wider hidden sm:block"
          style={{ color: 'var(--accent)' }}
        >
          Live
        </span>
        <span
          className={`font-sans text-[10px] md:text-xs transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ color: 'var(--text-secondary)' }}
        >
          {TICKER_ITEMS[logIndex]}
        </span>
      </div>

      {/* Right: system metrics */}
      <div className="hidden md:flex items-center gap-5" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3" style={{ color: 'var(--accent)' }} />
          <span className="text-[10px] font-medium">12ms avg</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3" style={{ color: 'var(--cyan)' }} />
          <span className="text-[10px] font-medium">99.98% uptime</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Globe className="w-3 h-3" />
          <span className="text-[10px] font-medium">3 regions active</span>
        </div>
      </div>
    </div>
  );
};

export default CrewTicker;
