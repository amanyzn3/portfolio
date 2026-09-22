import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Compass } from 'lucide-react';

const ROLES = ['Full-stack', 'AI-focused', 'Data-minded', 'Collaborative'];

export const OverlayUI = ({ scrollProgress = 0, onJumpToPhase }) => {
  const percent = Math.round(scrollProgress * 100);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setIsFading(false);
      }, 250);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const currentRole = ROLES[roleIndex];
  const article = currentRole === 'AI-focused' ? 'An' : 'A';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10 select-none text-white font-sans">
      {/* 1. TOP PORTFOLIO NAVBAR */}
      <header className="flex items-center justify-between w-full">
        {/* Brand identity: AY */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] p-[2px] shadow-lg">
            <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <span className="font-display italic text-sm text-[#f5f5f5] font-bold">
                AY
              </span>
            </div>
          </div>
          <div>
            <span className="font-display italic text-base tracking-wide text-white font-semibold block leading-none">
              Aman Yazeen
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-widest block mt-1 uppercase">
              Full-Stack Developer · Intern @ JHF IT
            </span>
          </div>
        </div>

        {/* Portfolio Navigation Pill: Home | Journey | Work */}
        <nav className="pointer-events-auto hidden sm:inline-flex items-center gap-1.5 rounded-full glass-panel border border-white/10 p-1.5 shadow-2xl">
          <button
            type="button"
            onClick={() => onJumpToPhase(0.0)}
            className={`text-xs rounded-full px-4 py-1.5 font-medium transition-colors cursor-pointer ${
              scrollProgress < 0.35
                ? 'text-white bg-white/15 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onJumpToPhase(0.55)}
            className={`text-xs rounded-full px-4 py-1.5 font-medium transition-colors cursor-pointer ${
              scrollProgress >= 0.35 && scrollProgress < 0.78
                ? 'text-white bg-white/15 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Journey
          </button>
          <button
            type="button"
            onClick={() => onJumpToPhase(0.85)}
            className={`text-xs rounded-full px-4 py-1.5 font-medium transition-colors cursor-pointer ${
              scrollProgress >= 0.78
                ? 'text-white bg-white/15 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Work
          </button>
        </nav>

        {/* Action Button: Email */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href="mailto:amanyzn3@gmail.com"
            className="glass-panel px-4 py-2 rounded-full text-xs font-medium text-white hover:text-[#89AACC] hover:border-[#4E85BF]/50 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#89AACC]" />
            <span>Say hi ↗</span>
          </a>
        </div>
      </header>

      {/* 2. DYNAMIC CENTER HERO / STORY OVERLAYS */}
      <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center justify-center my-auto transition-all duration-700">
        {/* Phase 1: The Threshold Intro */}
        {scrollProgress < 0.18 && (
          <div className="animate-fade-in flex flex-col items-center">
            <h1 className="font-display italic text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] text-glow mb-4">
              Aman Yazeen
            </h1>
            <div className="text-base sm:text-lg text-white/90 mb-4 flex items-center justify-center gap-1.5 flex-wrap">
              <span className="transition-opacity duration-200">{article}</span>
              <span
                className={`font-serif italic text-base sm:text-lg text-[#89AACC] font-normal transition-all duration-200 inline-block ${
                  isFading ? 'opacity-0 -translate-y-0.5' : 'opacity-100 translate-y-0'
                }`}
                style={{ textShadow: '0 0 14px rgba(137, 170, 204, 0.35)' }}
              >
                {currentRole}
              </span>
              <span>developer who turns conversations into action.</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
              Software engineering intern at JHF IT Innovations, building software where team chat, task tracking and analytics come together, from React interfaces to Gemini copilots and Power BI dashboards.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 animate-bounce">
              <ArrowDown className="w-4 h-4 text-[#89AACC]" />
              <span>Scroll to enter</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. RIGHT VERTICAL SCROLL TRACKER */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 pointer-events-auto">
        <span className="font-mono text-[11px] text-gray-400 tracking-widest">
          {String(percent).padStart(2, '0')}%
        </span>
        <div className="w-[3px] h-36 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="w-full bg-gradient-to-b from-[#89AACC] to-[#4E85BF] rounded-full transition-all duration-100 ease-out"
            style={{ height: `${percent}%` }}
          />
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: '01', p: 0.0 },
            { label: '02', p: 0.32 },
            { label: '03', p: 0.65 },
            { label: '04', p: 0.95 },
          ].map((step, idx) => (
            <button
              key={idx}
              onClick={() => onJumpToPhase(step.p)}
              className={`w-6 h-6 rounded-full text-[10px] font-mono flex items-center justify-center border transition-all duration-300 cursor-pointer ${
                Math.abs(scrollProgress - step.p) < 0.15
                  ? 'bg-[#4E85BF] text-white border-[#89AACC] font-bold shadow-md'
                  : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/40'
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. FOOTER HUD */}
      <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 pointer-events-auto">
        {/* Social connections */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/amanyzn3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="mailto:amanyzn3@gmail.com"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Status indicator: Open to opportunities with pulsing green dot */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-xs text-gray-300 font-mono tracking-wider">
              INTERN @ JHF IT INNOVATIONS · OPEN TO OPPORTUNITIES
            </span>
          </div>
          {scrollProgress > 0.85 && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="glass-panel text-xs px-3 py-1 rounded-full text-[#89AACC] hover:bg-[#4E85BF] hover:text-white transition-all cursor-pointer"
            >
              ↑ Top
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
