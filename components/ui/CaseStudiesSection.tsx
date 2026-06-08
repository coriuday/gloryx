'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from '@/components/ui/ProjectCard';

const CaseStudiesSection: React.FC = () => {
  const featured = getFeaturedProjects();

  return (
    <section
      id="work"
      className="py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb absolute w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 65%)',
            top: '-8%', left: '-5%',
            filter: 'blur(80px)',
            animation: 'atmosphericFloat 18s ease-in-out infinite',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div className="max-w-xl">
            <div className="eyebrow-badge mb-5">
              <Sparkles size={11} />
              <span>The Work</span>
            </div>
            <h2
              className="font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight mb-4"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
            >
              The work speaks.{' '}
              <span className="gradient-text">Three transformations.</span>
            </h2>
            <p className="font-sans text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              A glimpse into what becomes possible when you stop patching problems
              and start engineering solutions.
            </p>
          </div>

          <Link href="/work">
            <button className="btn-secondary px-7 py-3 text-sm whitespace-nowrap gap-2">
              View All Work
              <ArrowRight size={14} />
            </button>
          </Link>
        </motion.div>

        {/* Project Cards — from lib/projects.ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Closing note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 font-sans text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          Full case studies are being prepared — real metrics, real methodology, real impact.
        </motion.p>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
