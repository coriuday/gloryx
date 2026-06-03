'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gx-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gx-black via-transparent to-gx-blue/20 z-10"></div>
        {/* Abstract "Matrix" vibe background */}
        <img
          src="https://images.unsplash.com/photo-1519608487953-e999c9dc296f?q=80&w=2832&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
        />
      </div>

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 z-10 bg-grid-pattern bg-[length:40px_40px] opacity-10 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-block mb-6 border border-gx-green/30 bg-gx-black/50 backdrop-blur-sm px-4 py-2">
          <span className="font-display text-gx-green uppercase tracking-widest text-sm font-bold">
            System Status: Online
          </span>
        </div>

        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl uppercase leading-none tracking-tighter mb-4 text-white drop-shadow-2xl">
          Dominate <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gx-green via-white to-gx-orange">
            The Matrix
          </span>
        </h1>

        <div className="w-32 h-2 bg-gx-orange mx-auto mb-8 transform -skew-x-12"></div>

        <p className="font-sans text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-light border-l-4 border-gx-green pl-6 text-left md:text-center md:border-l-0 md:pl-0">
          Full-service digital marketing and automation. We don&apos;t just play the game. We rewrite the code.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button className="group relative w-full md:w-auto overflow-hidden bg-gx-green text-black font-display font-bold text-xl uppercase px-12 py-5 tracking-wider hover:text-white transition-colors duration-200 delay-75 clip-corner shadow-[0_0_15px_rgba(121,192,67,0.3)] hover:shadow-[0_0_25px_rgba(121,192,67,0.5)]">
            <span className="relative z-10 drop-shadow-sm">View Services</span>
            <div className="absolute inset-0 bg-gx-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -skew-x-12 scale-150 origin-right"></div>
          </button>

          <button className="w-full md:w-auto px-10 py-5 border-2 border-white text-white font-display font-bold text-xl uppercase tracking-wider hover:bg-white hover:text-gx-black transition-all duration-300 clip-corner-rev">
            Get Quote
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown size={40} className="text-gx-green" />
      </div>
    </section>
  );
};

export default Hero;