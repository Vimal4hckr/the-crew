import React, { useState } from 'react';
import { ExternalLink, Quote, Film } from 'lucide-react';
import { CrewMember } from '../data/crew';

interface CrewCardProps {
  member: CrewMember;
  index: number;
}

export const CrewCard: React.FC<CrewCardProps> = ({ member }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <article
      id={member.id}
      className="group relative border border-zinc-800/80 bg-[#0a0a0f] transition-all duration-500 hover:border-zinc-600/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
    >
      {/* Top 35mm film perforation header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-zinc-950/60 font-mono-code text-[11px] text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-widest">{member.number}</span>
          <span className="text-zinc-600">/</span>
          <span className="tracking-widest uppercase text-zinc-300">{member.role}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 text-[10px]">
          <span>{member.cameraSpec}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN: LARGE CINEMATIC PORTRAIT CONTAINER */}
        <div className="relative lg:col-span-5 bg-black overflow-hidden aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto min-h-[420px] lg:min-h-[560px]">
          {/* Main Portrait Image or Simple Dark Fallback */}
          {!imageError ? (
            <img
              src={member.imagePath}
              alt={`${member.name} — ${member.designation}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.05]"
            />
          ) : (
            <div className="w-full h-full bg-[#0a0b10] flex flex-col items-center justify-center p-8 text-center border border-zinc-900">
              <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center mb-3 text-zinc-500">
                <Film className="w-5 h-5 text-zinc-400" />
              </div>
              <span className="font-mono-code text-[10px] tracking-[0.25em] text-zinc-400 uppercase mb-1">
                {member.role}
              </span>
              <span className="font-cinzel text-xl text-white font-bold tracking-wide">
                {member.name}
              </span>
              <span className="font-mono-code text-[10px] text-zinc-600 mt-3 tracking-widest">
                AWAITING 35MM EXPOSURE
              </span>
            </div>
          )}

          {/* Film Viewfinder Framing Crosshairs Overlay */}
          <div className="absolute inset-4 pointer-events-none border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />
          </div>

          {/* Subtle gradient vignette at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* RIGHT COLUMN: EDITORIAL PROFILE DETAILS */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#0c0d12] via-[#090a0d] to-[#07070a]">
          <div>
            {/* Role & Number lockup */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-[0.3em] font-mono-code text-zinc-400 uppercase font-semibold">
                {member.role}
              </span>
              <span className="w-8 h-[1px] bg-zinc-700" />
              <span className="text-xs font-mono-code text-zinc-500">MEMBER {member.number}</span>
            </div>

            {/* Name */}
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide uppercase mb-2">
              {member.name}
            </h2>

            {/* Designation */}
            <div className="text-sm sm:text-base text-zinc-400 font-medium tracking-wide mb-6">
              {member.designation}
            </div>

            {/* Introduction quote / statement */}
            <div className="relative pl-4 border-l-2 border-zinc-700 mb-6 italic text-zinc-300 text-sm sm:text-base leading-relaxed">
              <Quote className="w-3.5 h-3.5 text-zinc-500 mb-1 inline mr-1 opacity-70" />
              {member.introduction}
            </div>

            {/* Biography */}
            <div className="text-zinc-400 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
              {member.bio}
            </div>

            {/* Verified Disciplines & Credits */}
            <div className="mb-8 pt-4 border-t border-zinc-800/80">
              <div className="text-[11px] font-mono-code text-zinc-500 uppercase tracking-widest mb-3">
                Key Cinematic Disciplines
              </div>
              <ul className="space-y-1.5">
                {member.credits.map((credit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                    <span>{credit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Button & Link Section */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-none hover:bg-zinc-200 transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.1)] shrink-0"
            >
              <span>{member.buttonLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <div className="text-[11px] font-mono-code text-zinc-500 truncate max-w-full">
              {member.role === 'WRITER & DIRECTOR' ? (
                <span>Director Portfolio · Official Reference</span>
              ) : (
                <span>Instagram Profile · @{member.name.replace(/\s+/g, '').toLowerCase()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
