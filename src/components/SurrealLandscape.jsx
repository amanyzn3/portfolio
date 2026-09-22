import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Procedural Low-Poly Mountain Terrain
function SculptedTerrain() {
  const geom = useMemo(() => {
    const plane = new THREE.PlaneGeometry(120, 140, 48, 56);
    plane.rotateX(-Math.PI / 2);
    const pos = plane.attributes.position;
    
    // Displace vertices to form cliff ridges, canyon valleys, and dramatic spires
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      // Keep starting tunnel area low and open
      if (z > -10) {
        pos.setY(i, -12);
        continue;
      }

      // Height noise
      const d1 = Math.sin(x * 0.08) * Math.cos(z * 0.06) * 6;
      const d2 = Math.sin(x * 0.18 + 1.2) * Math.sin(z * 0.14) * 3;
      const ridge = Math.abs(x - 6) < 8 && z < -18 && z > -36 ? 8.5 : 0; // Main cliff ridge
      const canyon = Math.exp(-Math.pow(x - 2, 2) / 24) * -7; // Deep canyon chasm
      
      pos.setY(i, -6 + d1 + d2 + ridge + canyon);
    }
    plane.computeVertexNormals();
    return plane;
  }, []);

  return (
    <group position={[0, -2, 0]}>
      {/* Solid low-poly faceted surface */}
      <mesh geometry={geom} receiveShadow castShadow>
        <meshStandardMaterial
          color="#241e30"
          roughness={0.85}
          metalness={0.15}
          flatShading
        />
      </mesh>
      
      {/* Glowing wireframe accent for digital-surrealist depth */}
      <mesh geometry={geom} position={[0, 0.02, 0]}>
        <meshBasicMaterial
          color="#89AACC"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>
    </group>
  );
}

// 2. The Floating Threshold Door
function PortalDoor() {
  const glowRef = useRef(null);

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 2.5 + Math.sin(state.clock.elapsedTime * 2.5) * 0.8;
    }
  });

  return (
    <group position={[0, 1.2, 0]}>
      {/* Floating stone pedestal */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.35, 8]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.9} flatShading />
      </mesh>

      {/* Door frame pillars */}
      <mesh position={[-0.9, 0.2, 0]}>
        <boxGeometry args={[0.18, 2.4, 0.2]} />
        <meshStandardMaterial color="#2d2d3d" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0.9, 0.2, 0]}>
        <boxGeometry args={[0.18, 2.4, 0.2]} />
        <meshStandardMaterial color="#2d2d3d" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <boxGeometry args={[2.0, 0.18, 0.2]} />
        <meshStandardMaterial color="#2d2d3d" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Glowing Event Horizon Plane */}
      <mesh position={[0, 0.2, 0]}>
        <planeGeometry args={[1.6, 2.3]} />
        <meshBasicMaterial
          color="#4E85BF"
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Dark back barrier to completely block distant elements before entering */}
      <mesh position={[0, 0.2, -0.05]}>
        <planeGeometry args={[1.6, 2.3]} />
        <meshBasicMaterial
          color="#08080a"
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Door PointLight */}
      <pointLight
        ref={glowRef}
        color="#89AACC"
        distance={8}
        intensity={3}
        position={[0, 0.5, 0.2]}
      />
    </group>
  );
}

// 3. Dalí Melting Clock Draped on Cliff Edge
function MeltingClock() {
  const clockMesh = useMemo(() => {
    const geom = new THREE.CylinderGeometry(1.6, 1.6, 0.15, 24);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      if (z > 0) {
        pos.setY(i, pos.getY(i) - Math.pow(z, 2) * 0.7);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <group position={[6.2, 2.4, -28]} rotation={[0.4, -0.6, 0.2]}>
      <mesh geometry={clockMesh} castShadow>
        <meshStandardMaterial
          color="#d97706"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 24]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.4} />
      </mesh>
      <mesh position={[0.1, 0.16, 0.2]} rotation={[0.2, 0.4, 0]}>
        <boxGeometry args={[0.08, 0.04, 0.9]} />
        <meshStandardMaterial color="#1e1b4b" />
      </mesh>
    </group>
  );
}

// Caspar David Friedrich Cliff Wanderer
function WandererFigure() {
  return (
    <group position={[7.8, 2.8, -25]} rotation={[0, -Math.PI / 4, 0]}>
      <mesh position={[-0.1, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.8, 6]} />
        <meshStandardMaterial color="#18181b" roughness={0.9} />
      </mesh>
      <mesh position={[0.1, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.09, 0.8, 6]} />
        <meshStandardMaterial color="#18181b" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.22, 0.35, 0.9, 7]} />
        <meshStandardMaterial color="#27272a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#713f12" roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 0.6, 0.15]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 5]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.8} />
      </mesh>
    </group>
  );
}

// 4. Ultra-Attractive Celestial Staircase with Integrated Project & Milestone Cards
const staircaseData = [
  // Step 0: Entrance step onto the ascending path
  {
    x: 1.2, y: 0.6, z: -30, rotY: 0.1,
    accent: '#4E85BF',
    glowRgb: '78, 133, 191',
    isPlatform: false,
  },
  // Step 1: Education
  {
    x: 2.2, y: 1.5, z: -32.5, rotY: 0.22,
    accent: '#34d399',
    glowRgb: '52, 211, 153',
    peak: 0.48,
    isPlatform: true,
    stepNum: '01',
    numberLabel: '01 / 07',
    statusBadge: 'ACADEMIC FOUNDATION · SYSTEMS',
    category: 'EDUCATION & FOUNDATION',
    status: 'COMPLETED',
    title: 'B.Sc. Computer Science',
    subtitle: 'Core Systems & Software Foundations',
    desc: 'Foundational computer science covering algorithms, data structures, distributed systems, and database engineering.',
    longDesc: 'Undergraduate computer science education focused on building solid foundational problem-solving skills, scalable software architectures, algorithmic complexity analysis, and hands-on full-stack development.',
    stats: ['Algorithms & Arch', 'Data Structures', 'Database Systems'],
    metrics: [
      { label: 'Degree', value: 'B.Sc. CS' },
      { label: 'Domain', value: 'Software Eng.' },
      { label: 'Focus', value: 'Algorithms' },
    ],
    features: [
      'Algorithms & Computational Complexity Analysis',
      'Data Structures & Object-Oriented Architecture',
      'Database Systems & Relational Modeling',
      'Full-Stack Web Systems & Client-Server Design',
    ],
    tech: ['Algorithms', 'System Design', 'Databases', 'Python'],
    previewType: 'academic',
  },
  // Connector step
  {
    x: 3.2, y: 2.2, z: -35.0, rotY: 0.36,
    accent: '#38bdf8',
    glowRgb: '56, 189, 248',
    isPlatform: false,
  },
  // Step 2: Flagship Project - SyncHub
  {
    x: 3.8, y: 3.0, z: -37.5, rotY: 0.48,
    accent: '#38bdf8',
    glowRgb: '56, 189, 248',
    peak: 0.58,
    isPlatform: true,
    stepNum: '02',
    numberLabel: '02 / 07',
    statusBadge: 'LIVE PLATFORM · WORKSPACE',
    category: 'FEATURED FULL-STACK PLATFORM',
    status: 'PRODUCTION',
    title: 'SyncHub',
    subtitle: 'Workspace & Gemini AI Copilot',
    desc: 'All-in-one workspace unifying Kanban workflows, team chat with one-tap Turn into Task, and an embedded Gemini AI copilot.',
    longDesc: 'A unified enterprise workspace designed to eradicate lost context between communication and execution. SyncHub integrates structured Kanban boards, contextual team channels with instant Turn into Task conversion, role-based security, and an embedded Gemini copilot that summarizes discussions and drafts tickets.',
    stats: ['Gemini Copilot', '1-Tap Tasks', 'Kanban Board'],
    metrics: [
      { label: 'Copilot', value: 'Gemini AI' },
      { label: 'Chat', value: 'Turn into Task' },
      { label: 'Workflow', value: 'Kanban Board' },
    ],
    previewImage: '/assets/01_manager_dashboard.png',
    previewAlt: 'SyncHub Manager Dashboard',
    screenshots: [
      {
        src: '/assets/01_manager_dashboard.png',
        title: 'Manager Executive Dashboard',
        desc: 'Sprint health overview, milestone tracking, team workload, and real-time velocity metrics.',
      },
      {
        src: '/assets/02_kanban_project_board.png',
        title: 'Interactive Kanban Project Board',
        desc: 'Multi-column agile board with drag-and-drop task movement, priority color-coding, and inline filters.',
      },
      {
        src: '/assets/03_task_detail_modal.png',
        title: 'Task Detail & Subtask Drawer',
        desc: 'Granular task management featuring subtasks, checklist progress bars, assignees, and time logging.',
      },
      {
        src: '/assets/04_team_chat_drawer.png',
        title: 'Team Chat & One-Tap Turn into Task',
        desc: 'Integrated team messaging with one-tap conversion of chat messages directly into actionable board tasks.',
      },
      {
        src: '/assets/05_project_status_overview.png',
        title: 'Project Status Overview',
        desc: 'Cross-functional delivery status tracking, automated progress calculation, and delivery alerts.',
      },
      {
        src: '/assets/06_employee_my_day.png',
        title: 'Employee My Day Focus Hub',
        desc: 'Tailored personal dashboard for individual contributors to organize daily execution and priorities.',
      },
      {
        src: '/assets/07_personal_habits_hub.png',
        title: 'Personal Habits Arena',
        desc: 'Gamified habit building engine with daily streaks, XP level progression, and challenge quests.',
      },
      {
        src: '/assets/00_login_screen.png',
        title: 'Authentication & Access Portal',
        desc: 'Clean role-based access control with secure authentication.',
      },
    ],
    features: [
      'Gemini-powered AI Copilot for automated ticket generation and discussion synthesis',
      'One-tap "Turn into Task" straight from contextual team chat messages',
      'Role-based access control (Admin, Manager, Contributor)',
      'Multi-stage Kanban board with smooth state transitions and priority tagging',
      'Personal Habits Arena with streak tracking and XP rewards',
    ],
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Gemini AI', 'Tailwind CSS'],
    link: 'https://github.com/amanyzn3/SyncH',
  },
  // Connector step
  {
    x: 3.6, y: 3.8, z: -40.0, rotY: 0.62,
    accent: '#818cf8',
    glowRgb: '129, 140, 248',
    isPlatform: false,
  },
  // Step 3: Power BI Analytics Dashboard
  {
    x: 2.8, y: 4.6, z: -42.5, rotY: 0.78,
    accent: '#818cf8',
    glowRgb: '129, 140, 248',
    peak: 0.68,
    isPlatform: true,
    stepNum: '03',
    numberLabel: '03 / 07',
    statusBadge: 'ANALYTICS MODEL · INTELLIGENCE',
    category: 'DATA INTELLIGENCE',
    status: 'ANALYTICS MODEL',
    title: 'Task & Project Performance',
    subtitle: 'SyncHub Power BI Analytics',
    desc: "Executive Power BI dashboard on SyncHub's telemetry: 30 tasks, 16 completed, 14 overdue, and a 52% efficiency index.",
    longDesc: 'A production-grade Power BI dashboard evaluating SyncHub task telemetry. Provides engineering managers with instantaneous clarity on delivery health, team velocity, bottlenecks, and completion ratios.',
    stats: ['30 Tasks Tracked', '52% Efficiency', '16 Done / 14 Overdue'],
    metrics: [
      { label: 'Scope', value: '30 Tasks' },
      { label: 'Efficiency', value: '52% Score' },
      { label: 'Breakdown', value: '16 Done / 14 Overdue' },
    ],
    previewImage: '/assets/power_bi_dashboard.png',
    previewAlt: 'Power BI Dashboard',
    screenshots: [
      {
        src: '/assets/power_bi_dashboard.png',
        title: 'Task & Project Performance Dashboard',
        desc: 'Interactive Power BI model analyzing 30 team tasks: 16 completed, 14 overdue, and 52% efficiency index with priority and assignee breakdowns.',
      },
    ],
    features: [
      'Comprehensive data model evaluating 30 live cross-functional project tasks',
      'Efficiency KPI calculation establishing a 52% baseline performance index',
      'Milestone tracking highlighting 16 completed vs. 14 overdue deliverables',
      'Interactive DAX slices by task priority, department category, and assignee',
    ],
    tech: ['Power BI', 'DAX', 'Data Modeling', 'ETL Analytics'],
    badge: 'Power BI Dashboard',
  },
  // Connector step
  {
    x: 1.8, y: 5.3, z: -45.0, rotY: 0.92,
    accent: '#fb7185',
    glowRgb: '251, 113, 133',
    isPlatform: false,
  },
  // Step 4: Final-Year Project - NinoCare
  {
    x: 0.8, y: 6.1, z: -47.5, rotY: 1.08,
    accent: '#fb7185',
    glowRgb: '251, 113, 133',
    peak: 0.78,
    isPlatform: true,
    stepNum: '04',
    numberLabel: '04 / 07',
    statusBadge: 'FINAL YEAR PROJECT · HEALTHCARE',
    category: 'HEALTHCARE AI COMPANION',
    status: 'FINAL YEAR PROJECT',
    title: 'NinoCare',
    subtitle: 'Parenting & Pediatric Companion',
    desc: 'Pediatric healthcare companion for new parents with infant growth tracking, automated vaccination alerts, and an AI triage chatbot.',
    longDesc: 'Aman Yazeen’s final-year computer science project, which he led and presented. NinoCare empowers new parents with proactive pediatric tools: growth percentile tracking, automated vaccination reminder alerts, an AI pediatric health chatbot, and direct doctor communication.',
    stats: ['Team Lead', 'Pediatric AI Bot', 'Vaccine Alerts'],
    metrics: [
      { label: 'Role', value: 'Team Lead' },
      { label: 'AI Bot', value: 'Parent Support' },
      { label: 'Tracking', value: 'Vaccines & Growth' },
    ],
    features: [
      'Infant growth milestone and percentile tracking (weight, height, developmental stages)',
      'Automated pediatric vaccination calendar alerts and dosage schedules',
      'AI triage companion providing instant, verified infant care guidance',
      'Practitioner messaging portal for remote consultation with healthcare providers',
    ],
    tech: ['Flutter', 'Firebase', 'AI Health Bot', 'Pediatric Care'],
    previewType: 'css_art',
    link: 'https://github.com/amanyzn3/niino',
  },
  // Connector step
  {
    x: 0.1, y: 6.8, z: -50.0, rotY: 1.24,
    accent: '#fbbf24',
    glowRgb: '251, 191, 36',
    isPlatform: false,
  },
  // Step 5: Gamified Arena - Personal Habits Hub
  {
    x: -0.4, y: 7.5, z: -52.5, rotY: 1.38,
    accent: '#fbbf24',
    glowRgb: '251, 191, 36',
    peak: 0.87,
    isPlatform: true,
    stepNum: '05',
    numberLabel: '05 / 07',
    statusBadge: 'ACTIVE QUEST · PRODUCTIVITY',
    category: 'GAMIFIED PRODUCTIVITY',
    status: 'ARENA ENGINE',
    title: 'Personal Habits Hub',
    subtitle: "SyncHub's Challenge & Quest Arena",
    desc: "SyncHub's personal arena: daily habit tracking, streak counters, XP level progression, daily challenge quests, and an intelligent AI motivator.",
    longDesc: "A gamified personal productivity arena integrated into SyncHub. Leverages behavioral psychology, daily challenge quests, XP levels, and an AI habit motivator to turn everyday consistency into an engaging game.",
    stats: ['XP & Streaks', 'Daily Challenges', 'AI Generated'],
    metrics: [
      { label: 'Mechanic', value: 'XP & Streaks' },
      { label: 'Quests', value: 'Daily Challenges' },
      { label: 'Motivator', value: 'AI Generated' },
    ],
    previewImage: '/assets/07_personal_habits_hub.png',
    previewAlt: 'Personal Habits Hub Arena',
    screenshots: [
      {
        src: '/assets/07_personal_habits_hub.png',
        title: 'Personal Habits Arena',
        desc: 'Gamified habit building engine with daily streaks, XP level progression, and challenge quests.',
      },
    ],
    features: [
      'Daily habit tracking with streak multipliers and consistency scores',
      'Gamified XP progression system with unlockable level milestones',
      'Daily challenge quests that reward continuous execution',
      'Personalized AI habit motivator that generates encouragement based on habit performance',
    ],
    tech: ['React', 'Gamification Engine', 'Daily Quests', 'AI Motivator'],
    link: 'https://github.com/amanyzn3/SyncH',
  },
  // Connector step
  {
    x: -0.3, y: 8.2, z: -55.0, rotY: 1.52,
    accent: '#a78bfa',
    glowRgb: '167, 139, 250',
    isPlatform: false,
  },
  // Step 6: Certification - IIT Madras
  {
    x: 0.2, y: 8.9, z: -57.5, rotY: 1.68,
    accent: '#a78bfa',
    glowRgb: '167, 139, 250',
    peak: 0.94,
    isPlatform: true,
    stepNum: '06',
    numberLabel: '06 / 07',
    statusBadge: 'ELITE CERTIFICATION · 67%',
    date: 'Jul–Oct 2023',
    category: 'ELITE CERTIFICATION',
    status: 'NPTEL · IIT MADRAS',
    title: 'The Joy of Computing Using Python',
    subtitle: 'IIT Madras Faculty Evaluation',
    desc: 'Elite certification in algorithmic problem solving, recursion, data structures, and mathematical computation evaluated by IIT Madras faculty.',
    longDesc: 'Elite certification awarded by NPTEL and the Indian Institute of Technology Madras (IIT Madras) with a 67% score. Covers advanced algorithmic problem solving, recursion, data structures, and computational thinking in Python.',
    stats: ['IIT Madras Faculty', 'Elite 67% Score', 'NPTEL Verified'],
    metrics: [
      { label: 'Institution', value: 'IIT Madras' },
      { label: 'Result', value: 'Elite (67%)' },
      { label: 'Platform', value: 'NPTEL' },
    ],
    features: [
      'Evaluated by IIT Madras faculty (Jul–Oct 2023 session)',
      'Elite Certification awarded with 67% composite score',
      'Deep exploration of algorithmic paradigms, sorting algorithms, and recursion',
      'Practical problem formulation and Python data structure implementation',
    ],
    tech: ['Python 3', 'Algorithmic Problem Solving', 'NPTEL IIT Madras'],
    previewType: 'certificate',
    badge: 'Elite Certificate · 67%',
  },
  // Step 7: Summit Platform - Current Internship & Career Summary
  {
    x: 0.8, y: 9.7, z: -60.5, rotY: 1.84,
    accent: '#38bdf8',
    glowRgb: '56, 189, 248',
    peak: 0.99,
    isPlatform: true,
    stepNum: '07',
    numberLabel: '07 / 07',
    statusBadge: 'CURRENT INTERN · JHF IT INNOVATIONS',
    category: 'ACTIVE INTERNSHIP & SUMMARY',
    status: 'ACTIVE INTERNSHIP',
    title: 'Aman Yazeen',
    subtitle: 'Software Engineering Intern @ JHF IT Innovations',
    desc: 'Software engineering intern at JHF IT Innovations and full-stack developer building modern web applications, AI copilots, and data analytics dashboards.',
    longDesc: 'Currently working as a Software Engineering Intern at JHF IT Innovations. Experienced in full-stack web engineering, building enterprise platforms (SyncHub), healthcare apps (NinoCare), AI copilots, and business intelligence models (Power BI).',
    stats: ['JHF IT Innovations', 'Software Intern', 'Full-Stack & AI'],
    metrics: [
      { label: 'Current Role', value: 'Intern' },
      { label: 'Company', value: 'JHF IT Innovations' },
      { label: 'Domain', value: 'Full-Stack & AI' },
    ],
    features: [
      'Software Engineering Intern at JHF IT Innovations',
      'Full-stack web application development with React, TypeScript, FastAPI, and PostgreSQL',
      'AI integrations using Google Gemini API for intelligent copilots and automation',
      'Executive analytics modeling with Power BI and DAX telemetry',
      'Open to software engineering and developer opportunities',
    ],
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Python', 'Tailwind'],
    previewType: 'summit',
    isSummit: true,
  },
];

// Reusable platform step with glowing neon edges, levitation core and beacon
function CelestialStepMesh({ item, isActive }) {
  const isPlatform = item.isPlatform;
  const width = isPlatform ? 2.4 : 1.3;
  const height = isPlatform ? 0.22 : 0.16;
  const depth = isPlatform ? 1.3 : 0.75;

  const edgesGeom = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(width + 0.02, height + 0.02, depth + 0.02));
  }, [width, height, depth]);

  return (
    <group position={[item.x, item.y, item.z]} rotation={[0, item.rotY, 0]}>
      {/* Dark metallic obsidian slab */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#0c0e18"
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Glowing Neon Edges */}
      <lineSegments geometry={edgesGeom}>
        <lineBasicMaterial
          color={item.accent}
          transparent
          opacity={isActive ? 0.95 : 0.55}
          linewidth={2}
        />
      </lineSegments>

      {/* Underside Levitation Ring */}
      <mesh position={[0, -height / 2 - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={isPlatform ? [0.35, 0.7, 32] : [0.18, 0.38, 24]} />
        <meshBasicMaterial
          color={item.accent}
          transparent
          opacity={isActive ? 0.9 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Localized PointLight casting atmospheric glow */}
      <pointLight
        color={item.accent}
        distance={isPlatform ? 5.5 : 3.0}
        intensity={isActive ? 3.0 : 0.9}
        position={[0, -0.3, 0]}
      />

      {/* Platform Hologram Beacon & Light Guide */}
      {isPlatform && (
        <group position={[0, height / 2 + 0.4, 0]}>
          <mesh>
            <octahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial
              color={item.accent}
              emissive={item.accent}
              emissiveIntensity={isActive ? 3.0 : 1.2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.8, 8]} />
            <meshBasicMaterial
              color={item.accent}
              transparent
              opacity={isActive ? 0.7 : 0.25}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Helpers for Asymmetric "Project Artifact" Card Design
function renderArtifactTitle(title) {
  const upper = title.toUpperCase();
  const words = upper.split(' ');

  if (words.length === 1) {
    if (upper === 'SYNCHUB') {
      return (
        <>
          <span className="text-teal-400">SYNC</span>HUB
        </>
      );
    }
    if (upper === 'NINOCARE') {
      return (
        <>
          <span className="text-teal-400">NINO</span>CARE
        </>
      );
    }
    return <span className="text-teal-400">{upper}</span>;
  }

  // Highlight specific keyword for each project in teal
  let targetWord = words[words.length - 1]; // default to last word
  if (upper.includes('PYTHON')) targetWord = 'PYTHON';
  else if (upper.includes('HABITS')) targetWord = 'HABITS';
  else if (upper.includes('PERFORMANCE')) targetWord = 'PERFORMANCE';
  else if (upper.includes('SCIENCE')) targetWord = 'SCIENCE';
  else if (upper.includes('YAZEEN')) targetWord = 'YAZEEN';

  return words.map((w, idx) => {
    const isHighlight = w === targetWord;
    return (
      <React.Fragment key={idx}>
        <span className={isHighlight ? 'text-teal-400' : 'text-white'}>
          {w}
        </span>
        {idx < words.length - 1 ? ' ' : ''}
      </React.Fragment>
    );
  });
}

function getStickerMetric(item) {
  if (item.title === 'Personal Habits Hub') return 'XP & STREAKS // ARENA';
  if (item.title === 'SyncHub') return 'GEMINI AI // 1-TAP TASKS';
  if (item.title === 'Task & Project Performance') return '52% EFFICIENCY // 30 TASKS';
  if (item.title === 'NinoCare') return 'TEAM LEAD // PEDIATRIC AI';
  if (item.title.includes('Python')) return 'ELITE 67% // IIT MADRAS';
  if (item.title.includes('B.Sc')) return 'CORE ARCH // ALGORITHMS';
  if (item.isSummit) return 'INTERN // JHF IT INNOVATIONS';
  if (item.stats && item.stats.length > 0) return `${item.stats[0]} // METRIC`;
  return 'PROJECT ARCHIVE';
}

function CelestialStaircase({ scrollProgress = 0, onSelectProject }) {
  // Luminous connecting spline threading through all steps
  const ribbonGeom = useMemo(() => {
    const pts = staircaseData.map((s) => new THREE.Vector3(s.x, s.y + 0.1, s.z));
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(70));
  }, []);

  // Hidden until passing through the portal door
  if (scrollProgress < 0.32) {
    return null;
  }

  return (
    <group name="CelestialStaircase">
      {/* Luminous cyan path spline */}
      <primitive
        object={
          new THREE.Line(
            ribbonGeom,
            new THREE.LineBasicMaterial({
              color: new THREE.Color('#38bdf8'),
              transparent: true,
              opacity: 0.3,
              linewidth: 1,
            })
          )
        }
      />

      {/* All 3D steps along the staircase */}
      {staircaseData.map((item, idx) => {
        const isFocus = item.peak && Math.abs(scrollProgress - item.peak) < 0.06;
        return <CelestialStepMesh key={idx} item={item} isActive={isFocus} />;
      })}

      {/* Individual Showcase Cards floating cleanly above each platform */}
      {staircaseData.map((item, idx) => {
        if (!item.isPlatform || !item.peak) return null;

        const radius = 0.065;
        const diff = Math.abs(scrollProgress - item.peak);
        const factor = Math.max(0, 1 - diff / radius);
        const smoothOpacity = factor * factor * (3 - 2 * factor);

        // Skip rendering when outside the active focal window to prevent overlap
        if (smoothOpacity < 0.02) return null;

        return (
          <group key={`card-${idx}`} position={[item.x, item.y + 1.85, item.z]}>
            <Html
              center
              className="pointer-events-auto select-none z-30"
            >
              {/* Asymmetric Project Artifact Dossier Card */}
              <div
                style={{
                  opacity: smoothOpacity,
                  transform: `scale(${0.92 + 0.08 * smoothOpacity}) translateY(${(1 - smoothOpacity) * 14}px)`,
                  transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
                  boxShadow:
                    '0 20px 50px -10px rgba(0,0,0,0.85), 0 0 1px rgba(255,255,255,0.08)',
                }}
                className="flex flex-row w-[340px] sm:w-[590px] md:w-[710px] lg:w-[750px] bg-[#0b0d14]/98 border border-black text-left relative overflow-visible transition-all duration-300 group"
              >
                {/* 1. Narrow Dark Vertical Metadata Spine on Far Left */}
                <div className="w-8 sm:w-10 bg-[#06070a] border-r border-black flex flex-col items-center justify-between py-3.5 px-1 shrink-0 select-none">
                  {/* Project Number */}
                  <span className="font-mono text-[11px] font-bold text-gray-300 tracking-wider">
                    {item.stepNum || '01'}
                  </span>
                  {/* Category Rotated Vertically */}
                  <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-gray-400/80 whitespace-nowrap my-2">
                    {item.category}
                  </div>
                  {/* Small Accent Dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: item.accent || '#2dd4bf',
                      boxShadow: `0 0 8px ${item.accent || '#2dd4bf'}`,
                    }}
                  />
                </div>

                {/* 2. Main Dossier Body: Cover (Left-Center) + Editorial Column (Right) */}
                <div className="flex-1 p-3.5 sm:p-5 flex flex-col md:flex-row gap-3.5 sm:gap-4 items-stretch min-w-0">
                  {/* Visual Cover Area (Left-Center) */}
                  <div className="w-full md:w-[46%] shrink-0 relative flex flex-col">
                    {/* Small Tilted Lime Sticker with Streak/XP Metric */}
                    <div className="absolute -top-2.5 -left-2 z-20 rotate-[-5deg] bg-[#bef264] text-black font-mono font-black text-[9px] sm:text-[10px] tracking-wider uppercase px-2 py-0.5 shadow-md border border-black/20 select-none">
                      {getStickerMetric(item)}
                    </div>

                    {/* Visual Cover Content */}
                    {item.previewType === 'css_art' ? (
                      /* NinoCare Sharp Rectangular Dossier Preview */
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject && onSelectProject(item);
                        }}
                        className="w-full h-full min-h-[195px] md:min-h-[230px] bg-[#12131e] p-3 flex flex-col justify-between border border-black relative overflow-hidden cursor-pointer group/cover"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">👶</span>
                            <div>
                              <div className="text-[11px] font-bold text-white font-mono uppercase">Baby Leo</div>
                              <div className="text-[8px] text-teal-300 font-mono">6 Months · Healthy Growth</div>
                            </div>
                          </div>
                          <span className="text-[8px] font-mono px-1.5 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
                            AI ACTIVE
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 my-2 text-center font-mono">
                          <div className="p-1 bg-white/[0.03] border border-white/10">
                            <div className="text-[7px] text-gray-400 uppercase">Weight</div>
                            <div className="text-[11px] font-bold text-white">7.8 kg</div>
                          </div>
                          <div className="p-1 bg-white/[0.03] border border-white/10">
                            <div className="text-[7px] text-gray-400 uppercase">Height</div>
                            <div className="text-[11px] font-bold text-white">67.5 cm</div>
                          </div>
                          <div className="p-1 bg-white/[0.03] border border-white/10">
                            <div className="text-[7px] text-gray-400 uppercase">Next Vax</div>
                            <div className="text-[11px] font-bold text-teal-300">12 Days</div>
                          </div>
                        </div>
                        <div className="p-1.5 bg-white/[0.03] border border-white/10 text-[9px] text-gray-300 font-mono leading-tight">
                          <span className="text-teal-300 font-bold">NinoBot:</span> "Teething symptoms normal. Temp logged."
                        </div>
                        <div className="text-[8px] font-mono text-gray-400 pt-1.5 border-t border-white/10 flex justify-between uppercase">
                          <span>Final Year Project</span>
                          <span className="text-teal-400">Expand ↗</span>
                        </div>
                      </div>
                    ) : item.previewType === 'academic' ? (
                      /* Academic Plaque Dossier Cover */
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject && onSelectProject(item);
                        }}
                        className="w-full h-full min-h-[195px] md:min-h-[230px] bg-[#070b12] p-4 flex flex-col justify-between border border-black relative overflow-hidden cursor-pointer group/cover text-center"
                      >
                        <div className="text-2xl mt-1">🎓</div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-widest text-teal-400 mb-0.5">
                            Degree Program
                          </div>
                          <div className="font-sans font-black uppercase text-base text-white">
                            B.Sc. Computer Science
                          </div>
                          <div className="text-[9px] text-gray-400 font-mono mt-0.5 uppercase">
                            Core Architecture & Algorithms
                          </div>
                        </div>
                        <div className="text-[8px] font-mono text-gray-400 pt-1.5 border-t border-white/10 flex justify-between uppercase">
                          <span>Degree Verified</span>
                          <span className="text-teal-400">Expand ↗</span>
                        </div>
                      </div>
                    ) : item.previewType === 'certificate' ? (
                      /* Certificate Dossier Cover */
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject && onSelectProject(item);
                        }}
                        className="w-full h-full min-h-[195px] md:min-h-[230px] bg-[#0b0814] p-4 flex flex-col justify-between border border-black relative overflow-hidden cursor-pointer group/cover text-center"
                      >
                        <div className="text-2xl mt-1">📜</div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-widest text-teal-400 mb-0.5">
                            NPTEL · IIT Madras
                          </div>
                          <div className="font-sans font-black uppercase text-base text-white">
                            Elite Certificate · 67%
                          </div>
                          <div className="text-[9px] text-gray-400 font-mono mt-0.5 uppercase">
                            Joy of Computing Using Python
                          </div>
                        </div>
                        <div className="text-[8px] font-mono text-gray-400 pt-1.5 border-t border-white/10 flex justify-between uppercase">
                          <span>Faculty Evaluated</span>
                          <span className="text-teal-400">Expand ↗</span>
                        </div>
                      </div>
                    ) : item.previewType === 'summit' ? (
                      /* Summit Dossier Cover */
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject && onSelectProject(item);
                        }}
                        className="w-full h-full min-h-[195px] md:min-h-[230px] bg-[#070d14] p-4 flex flex-col justify-between border border-black relative overflow-hidden cursor-pointer group/cover text-center"
                      >
                        <div className="text-2xl mt-1">💼</div>
                        <div>
                          <div className="text-[9px] font-mono uppercase tracking-widest text-teal-400 mb-0.5">
                            Active Internship
                          </div>
                          <div className="font-sans font-black uppercase text-base text-white">
                            JHF IT Innovations
                          </div>
                          <div className="text-[9px] text-gray-400 font-mono mt-0.5 uppercase">
                            Software Engineering Intern
                          </div>
                        </div>
                        <div className="text-[8px] font-mono text-gray-400 pt-1.5 border-t border-white/10 flex justify-between uppercase">
                          <span>Aman Yazeen</span>
                          <span className="text-teal-400">Contact ✉</span>
                        </div>
                      </div>
                    ) : (
                      /* Standard Product Screenshot Preview Cover */
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject && onSelectProject(item);
                        }}
                        className="relative w-full h-full min-h-[195px] md:min-h-[230px] bg-[#07080e] border border-black overflow-hidden cursor-pointer group/cover"
                      >
                        <img
                          src={item.previewImage}
                          alt={item.previewAlt || item.title}
                          className="w-full h-full object-cover object-top filter brightness-[0.92] group-hover/cover:brightness-100 group-hover/cover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2 z-10 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-300 bg-black/80 px-2 py-0.5 border border-white/10">
                          FIG // PREVIEW
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Editorial Column on the Right */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Metadata Header */}
                      <div className="flex items-center justify-between gap-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-gray-400 pb-1.5 border-b border-white/10">
                        <span className="text-gray-300 font-semibold truncate">
                          {item.statusBadge}
                        </span>
                        <span className="text-gray-500 shrink-0">
                          {item.stepNum ? `SEC // ${item.stepNum}` : ''}
                        </span>
                      </div>

                      {/* Bold Condensed Uppercase Title with One Highlighted Word in Teal */}
                      <div className="my-2">
                        <h3 className="font-sans font-black uppercase text-xl sm:text-2xl md:text-[25px] tracking-tight text-white leading-tight">
                          {renderArtifactTitle(item.title)}
                        </h3>
                        {item.subtitle && (
                          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 mt-1">
                            {item.subtitle}
                          </div>
                        )}
                      </div>

                      {/* 1-2 Line Editorial Description */}
                      <p className="text-xs sm:text-[13px] text-gray-300/85 leading-relaxed font-sans mb-2 line-clamp-2">
                        {item.desc}
                      </p>

                      {/* Simple Divider Line */}
                      <div className="w-full h-px bg-white/10 my-2" />

                      {/* Tech Stack in Compact Mono Text */}
                      {item.tech && (
                        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 my-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                          <span className="text-gray-500">STACK //</span>
                          <span className="text-gray-300">{item.tech.join(' · ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Simple Divider Line Before Action */}
                    <div>
                      <div className="w-full h-px bg-white/10 my-2" />

                      {/* Action Line: OPEN PROJECT FILE ↗ */}
                      <div className="pt-1 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject && onSelectProject(item);
                          }}
                          className="group/act inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-teal-400 transition-colors cursor-pointer"
                        >
                          <span>OPEN PROJECT FILE</span>
                          <span className="text-teal-400 group-hover/act:translate-x-1 group-hover/act:-translate-y-0.5 transition-transform">
                            ↗
                          </span>
                        </button>

                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                          >
                            GITHUB ↗
                          </a>
                        ) : item.isSummit ? (
                          <a
                            href="mailto:amanyzn3@gmail.com"
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-teal-400 hover:underline"
                          >
                            EMAIL ME ✉
                          </a>
                        ) : (
                          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                            {item.badge || 'VERIFIED'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export const SurrealLandscape = ({ scrollProgress = 0, onSelectProject }) => {
  return (
    <group name="SurrealLandscape">
      <SculptedTerrain />
      <PortalDoor />
      <MeltingClock />
      <WandererFigure />
      <CelestialStaircase
        scrollProgress={scrollProgress}
        onSelectProject={onSelectProject}
      />
    </group>
  );
};
