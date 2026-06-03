'use client';

import React from 'react';
import { SERVICES } from '@/constants';
import { Play } from 'lucide-react';

const ServicesGrid: React.FC = () => {
  return (
    <section id="inventory" className="py-24 bg-gx-black relative">
      {/* Decorative slant background */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gx-dark skew-x-12 translate-x-1/3 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end border-b-4 border-gx-orange pb-6">
          <div>
            <span className="block text-gx-green font-display font-bold tracking-[0.2em] uppercase mb-2">
              Agency Services
            </span>
            <h2 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter text-white leading-none">
              Our Inventory
            </h2>
          </div>
          <span className="hidden md:block font-display text-2xl text-gx-gray uppercase tracking-widest font-bold">
            Select Your Weapon
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden bg-gx-gray border border-white/5 hover:border-gx-green transition-all duration-300 cursor-pointer ${service.gridSpan || ''}`}
            >
              {/* Image Background */}
              <div className="absolute inset-0 w-full h-full bg-gx-gray">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-30 group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gx-black via-gx-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Decorative Line */}
                <div className={`h-1 w-16 mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${service.featured ? 'bg-gx-orange' : 'bg-gx-green'}`}></div>

                <h3 className="font-display font-bold text-3xl md:text-4xl text-white uppercase tracking-tighter leading-none mb-2 drop-shadow-md group-hover:translate-x-2 transition-transform duration-300">
                  {service.title}
                </h3>

                <p className="font-sans text-gray-400 text-sm md:text-base max-w-md opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {service.description}
                </p>
              </div>

              {/* Labels/Icons */}
              {service.featured && (
                <div className="absolute top-0 right-0 bg-gx-green text-gx-black font-display font-bold uppercase text-xs px-4 py-1">
                  Featured
                </div>
              )}

              {service.videoIcon && (
                <div className="absolute top-6 right-6 text-white group-hover:text-gx-green transition-colors">
                  <Play className="fill-current" size={32} />
                </div>
              )}

              {/* Hover flash effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:animate-pulse pointer-events-none mix-blend-overlay"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;