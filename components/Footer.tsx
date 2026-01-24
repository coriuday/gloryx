'use client';

import React from 'react';
import { Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gx-dark border-t-4 border-gx-blue text-white pt-24 pb-12 relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.02] transform rotate-12">
        <h1 className="text-[300px] font-display font-bold uppercase leading-none">GloryX</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Brand Col */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-white text-gx-black flex items-center justify-center font-display font-bold text-lg">G</div>
              <span className="font-display font-bold text-2xl tracking-tighter uppercase">GloryX</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Redefining the agency experience with raw creativity and precise automation.
              We don't follow trends, we set the trajectory.
            </p>
            <div className="flex space-x-6">
              {[Globe, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-500 hover:text-gx-green transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-bold text-xl uppercase tracking-widest mb-8 text-gx-green border-b border-gx-green/30 pb-2 inline-block">Company</h4>
            <ul className="space-y-4 font-sans text-gray-400">
              {['About Us', 'Careers', 'Press', 'Legal'].map((link) => (
                <li key={link}><a href="#" className="hover:text-white hover:translate-x-2 transition-all block duration-300">/ {link}</a></li>
              ))}
            </ul>
          </div>

          {/* Expertise Links */}
          <div>
            <h4 className="font-display font-bold text-xl uppercase tracking-widest mb-8 text-gx-orange border-b border-gx-orange/30 pb-2 inline-block">Expertise</h4>
            <ul className="space-y-4 font-sans text-gray-400">
              {['Marketing', 'Development', 'Design', 'Automation'].map((link) => (
                <li key={link}><a href="#" className="hover:text-white hover:translate-x-2 transition-all block duration-300">/ {link}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-xl uppercase tracking-widest mb-8 text-gx-blue border-b border-gx-blue/30 pb-2 inline-block">Join the Crew</h4>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="ENTER EMAIL"
                className="bg-gx-black border-2 border-gray-800 p-4 text-sm focus:outline-none focus:border-gx-green transition-colors text-white font-bold uppercase placeholder-gray-600"
              />
              <button className="bg-gx-green hover:bg-white text-gx-black font-display font-bold uppercase py-4 tracking-wider transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hover:shadow-none translate-x-0 hover:translate-x-[2px] hover:translate-y-[2px]">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-bold uppercase tracking-wider">
          <p>&copy; 2024 GloryX Agency. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-gx-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gx-green transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;