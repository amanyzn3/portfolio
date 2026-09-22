import React, { useState, useEffect } from 'react';

// CSS Art Mockup for NinoCare (Pediatric Healthcare Companion)
function NinoCareCSSArt() {
  return (
    <div className="w-full h-full min-h-[340px] bg-gradient-to-br from-[#1c1524] via-[#121320] to-[#0c0d16] rounded-2xl p-5 border border-pink-500/20 flex flex-col justify-between relative overflow-hidden shadow-inner">
      {/* Soft pink / cyan ambient glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* App Header Simulation */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-pink-500/30">
            👶
          </div>
          <div>
            <div className="text-xs font-bold text-white font-sans">Baby Leo</div>
            <div className="text-[10px] text-pink-300/80 font-mono">6 Months · Healthy Growth</div>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
          ● AI COPILOT ACTIVE
        </div>
      </div>

      {/* Main Pediatric Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5 my-3 relative z-10">
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
          <div className="text-[9px] font-mono text-gray-400 uppercase">Weight</div>
          <div className="text-sm font-bold text-white mt-0.5">7.8 kg</div>
          <div className="text-[9px] text-emerald-400 font-mono">75th Percentile</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
          <div className="text-[9px] font-mono text-gray-400 uppercase">Height</div>
          <div className="text-sm font-bold text-white mt-0.5">67.5 cm</div>
          <div className="text-[9px] text-emerald-400 font-mono">Normal Curve</div>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
          <div className="text-[9px] font-mono text-gray-400 uppercase">Next Vaccine</div>
          <div className="text-sm font-bold text-pink-300 mt-0.5">In 12 Days</div>
          <div className="text-[9px] text-gray-400 font-mono">Rotavirus & DTaP</div>
        </div>
      </div>

      {/* AI Triage Chat Simulation */}
      <div className="space-y-2 relative z-10">
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-md bg-pink-500/30 flex items-center justify-center text-[10px] text-pink-300 shrink-0 mt-0.5">
            AI
          </div>
          <div className="text-[11px] text-gray-300 leading-snug">
            <span className="text-pink-300 font-semibold">NinoBot:</span> "Leo’s teething symptoms are within normal range. Offer a chilled teething ring and track temperature twice daily."
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Dr. Sarah Jenkins (Pediatrician)</span>
          </div>
          <span className="text-[10px] font-mono text-pink-300 hover:underline cursor-pointer">Message ↗</span>
        </div>
      </div>

      {/* Footer Simulation */}
      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400 relative z-10">
        <span>Final-Year Project · Led & Presented by Aman</span>
        <span className="text-pink-400">Flutter · Firebase · AI</span>
      </div>
    </div>
  );
}

export function ProjectDetailModal({ project, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Close on Escape key & arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (project?.screenshots?.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.screenshots.length - 1));
        } else if (e.key === 'ArrowRight') {
          setActiveImageIndex((prev) => (prev < project.screenshots.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  if (!project) return null;

  const screenshots = project.screenshots || [];
  const currentScreenshot = screenshots[activeImageIndex];
  const isNinoCare = project.title === 'NinoCare';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#090b14]/95 border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col"
        style={{
          boxShadow: `0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(${project.glowRgb || '78, 133, 191'}, 0.25)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Specular Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            boxShadow: `0 0 15px ${project.accent}`,
          }}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider"
              style={{
                backgroundColor: `${project.accent}25`,
                color: project.accent,
                border: `1px solid ${project.accent}60`,
              }}
            >
              STEP {project.stepNum}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all hover:scale-105"
              >
                <span>GitHub</span>
                <span className="text-xs">↗</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:rotate-90"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Headline & Subtitle */}
          <div>
            <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-gray-400 mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: project.accent }} />
              {project.subtitle}
            </p>
          </div>

          {/* Grid: Screenshots & Visual on Left, Deep-Dive Details on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Visual Showcase (Screenshots or CSS Art) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              {isNinoCare ? (
                <NinoCareCSSArt />
              ) : screenshots.length > 0 ? (
                <div className="space-y-3">
                  {/* Main Active Screenshot Viewport */}
                  <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/15 aspect-[16/10] flex items-center justify-center group">
                    <img
                      src={currentScreenshot.src}
                      alt={currentScreenshot.title}
                      className="w-full h-full object-contain bg-black/40 transition-all duration-300"
                    />

                    {/* Navigation Arrows for Multiple Screenshots */}
                    {screenshots.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev > 0 ? prev - 1 : screenshots.length - 1
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Previous screenshot"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() =>
                            setActiveImageIndex((prev) =>
                              prev < screenshots.length - 1 ? prev + 1 : 0
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                          aria-label="Next screenshot"
                        >
                          ›
                        </button>
                      </>
                    )}

                    {/* Screenshot Counter Pill */}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 border border-white/20 text-[10px] font-mono text-gray-300">
                      {activeImageIndex + 1} / {screenshots.length}
                    </div>
                  </div>

                  {/* Active Screenshot Title & Caption */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs font-bold text-white font-sans">
                      {currentScreenshot.title}
                    </div>
                    <div className="text-[11px] text-gray-400 font-sans mt-0.5 leading-relaxed">
                      {currentScreenshot.desc}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {screenshots.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {screenshots.map((s, sidx) => (
                        <button
                          key={sidx}
                          onClick={() => setActiveImageIndex(sidx)}
                          className={`relative rounded-lg overflow-hidden shrink-0 w-16 h-11 border transition-all ${
                            activeImageIndex === sidx
                              ? 'border-white ring-2 ring-white/50 scale-105'
                              : 'border-white/20 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback for Academic / Certificate */
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center flex flex-col items-center justify-center min-h-[260px]">
                  <div className="text-4xl mb-3">🎓</div>
                  <div className="text-sm font-bold text-white mb-1">{project.title}</div>
                  <div className="text-xs text-gray-400 max-w-sm leading-relaxed">
                    {project.subtitle} · Evaluated & verified academic achievement.
                  </div>
                </div>
              )}
            </div>

            {/* Deep Dive Details on Right */}
            <div className="lg:col-span-5 space-y-4">
              {/* Telemetry Metrics Strip */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  {project.metrics.map((m, midx) => (
                    <div key={midx} className="text-center">
                      <div className="text-[9px] uppercase font-mono text-gray-400 tracking-wider">
                        {m.label}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 truncate">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comprehensive Description */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                  About the Project
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                  {project.longDesc || project.desc}
                </p>
              </div>

              {/* Key Features List */}
              {project.features && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Key Features & Innovations
                  </div>
                  <ul className="space-y-1.5">
                    {project.features.map((f, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                        <span className="text-xs shrink-0 mt-0.5" style={{ color: project.accent }}>✦</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Pills */}
              {project.tech && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
                    Technologies Used
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, tidx) => (
                      <span
                        key={tidx}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.05] border border-white/10 text-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-white/15 hover:bg-white/25 border border-white/25 transition-all hover:scale-105"
                    style={{ borderColor: `${project.accent}80` }}
                  >
                    <span>View Repository on GitHub</span>
                    <span>↗</span>
                  </a>
                )}
                <span className="text-[10px] text-gray-500 font-mono">
                  Verified Project by Aman Yazeen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
