import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CanvasScene } from './components/CanvasScene';
import { OverlayUI } from './components/OverlayUI';
import { ProjectDetailModal } from './components/ProjectDetailModal';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Create GSAP ScrollTrigger tied to the scroll height
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Jump to specific scroll progress point
  const handleJumpToPhase = (targetProgress) => {
    if (!scrollContainerRef.current) return;
    const totalScrollable =
      scrollContainerRef.current.scrollHeight - window.innerHeight;
    const targetY = totalScrollable * targetProgress;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative bg-obsidian text-white min-h-screen">
      {/* 1. 3D WebGL Canvas (Fixed full-screen backdrop) */}
      <CanvasScene
        scrollProgress={scrollProgress}
        onSelectProject={setSelectedProject}
      />

      {/* 2. Fixed Overlay UI (HUD, typography, timeline, progress indicator) */}
      <OverlayUI
        scrollProgress={scrollProgress}
        onJumpToPhase={handleJumpToPhase}
      />

      {/* 3. Interactive Project Deep-Dive & Screenshots Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 3. Invisible Scroll Track (500vh to give ample scroll travel for the spline journey) */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-[500vh] pointer-events-none"
        aria-hidden="true"
      >
        {/* Invisible milestone triggers for accessibility & structural scroll points */}
        <div className="absolute top-[0%] h-px w-full" id="phase-threshold" />
        <div className="absolute top-[25%] h-px w-full" id="phase-clouddive" />
        <div className="absolute top-[55%] h-px w-full" id="phase-dreamscape" />
        <div className="absolute top-[85%] h-px w-full" id="phase-projects" />
      </div>
    </div>
  );
}
