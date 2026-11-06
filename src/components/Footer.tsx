import React from 'react';
import { ExternalLink, Film } from 'lucide-react';
import { CREW_MEMBERS } from '../data/crew';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-900 bg-[#040406] py-16 px-6 sm:px-8 text-center text-zinc-400">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Film Emblem */}
        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400">
          <Film className="w-4 h-4" />
        </div>

        {/* Title */}
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white tracking-[0.25em] uppercase mb-2">
          THE FILM CREW
        </h2>

        {/* Required Tagline */}
        <p className="text-xs sm:text-sm tracking-[0.3em] font-light text-zinc-400 uppercase mb-10">
          "MADE FOR THE LOVE OF CINEMA."
        </p>

        {/* Four Crew Member Links */}
        <div className="w-full max-w-3xl pt-8 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-left">
          {CREW_MEMBERS.map((member) => (
            <a
              key={member.id}
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-zinc-900 hover:border-zinc-700 bg-zinc-950/40 rounded transition-all group cursor-pointer"
            >
              <div className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest mb-1">
                {member.role}
              </div>
              <div className="text-xs font-semibold text-zinc-200 group-hover:text-white flex items-center justify-between">
                <span>{member.name}</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </a>
          ))}
        </div>

        {/* Minimal Copyright */}
        <div className="text-[11px] font-mono-code text-zinc-600 tracking-wider">
          © {new Date().getFullYear()} THE FILM CREW · ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};
