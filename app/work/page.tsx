// "use client";

// import { useEffect, useRef } from "react";
// import { ArrowUpRight, Briefcase, MapPin, Sparkles } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// const WORK_HISTORY = [
//   {
//     company: "Ningen (DSN x BCT Hackathon 3.0)",
//     logo: "NG",
//     role: "Full-Stack Developer",
//     period: "May 2026",
//     location: "Remote",
//     status: "past",
//     desc: "Built a comprehensive application named Ningen under a tight hackathon deadline, focusing on functional components and backend integration.",
//     highlights: [
//       "Developed core application features and a dynamic navbar configuration",
//       "Integrated decentralized concepts utilizing Solidity and blockchain tools",
//     ],
//     tags: ["React", "Solidity", "Node.js"],
//   },
//   {
//     company: "NHL Data Analytics Platform",
//     logo: "NHL",
//     role: "AI Fullstack Engineer",
//     period: "Feb 2026 – Mar 2026",
//     location: "Remote",
//     status: "past",
//     desc: "Designed a serverless data pipeline leveraging Next.js API routes to aggregate statistics across multiple external APIs.",
//     highlights: [
//       "Built high-performance statistical tracking algorithms using advanced concurrency controls",
//       "Integrated automated report-generation layers using ExcelJS for dynamic reports",
//     ],
//     tags: ["Next.js", "Serverless", "ExcelJS", "APIs"],
//   },
//   {
//     company: "Librobase",
//     logo: "LB",
//     role: "Co-Founder & AI Fullstack Engineer",
//     period: "Jun 2025 – Feb 2026",
//     location: "Remote",
//     status: "past",
//     desc: "Architected and deployed a highly scalable real-time marketplace infrastructure, managing complex authentication and transaction workflows.",
//     highlights: [
//       "Engineered a low-latency live bidding architecture utilizing web sockets globally",
//       "Structured secure and resilient RESTful APIs for continuous transactions",
//       "Integrated media pipelines with Cloudinary for high-performance asset optimization",
//     ],
//     tags: ["Next.js", "Express.js", "MongoDB", "WebSockets"],
//   },
//   {
//     company: "Starix",
//     logo: "SX",
//     role: "Frontend Engineer",
//     period: "2025",
//     location: "Remote",
//     status: "past",
//     desc: "Managed the frontend repository and code deployments, ensuring a highly responsive and seamless user experience.",
//     highlights: [
//       "Handled seamless code deployments for the frontend application",
//       "Optimized the user interface and core components for performance",
//     ],
//     tags: ["React", "Next.js", "Tailwind CSS"],
//   },
//   {
//     company: "Campus Crib",
//     logo: "CC",
//     role: "Front-end Software Engineer",
//     period: "Nov 2024 – Apr 2025",
//     location: "Remote",
//     status: "past",
//     desc: "Spearheaded UI architecture utilizing React and Tailwind CSS to connect users seamlessly with local services.",
//     highlights: [
//       "Designed global state tracking mechanisms via Zustand and Context API",
//       "Integrated real-time messaging functionality using Socket.IO for live updates",
//     ],
//     tags: ["React", "Tailwind CSS", "Zustand", "Socket.IO"],
//   },
//   {
//     company: "Bettisports",
//     logo: "BS",
//     role: "Frontend Software Engineer",
//     period: "Apr 2024 – Oct 2024",
//     location: "Remote",
//     status: "past",
//     desc: "Built scalable, device-agnostic user interfaces for a high-traffic sports content and blogging ecosystem.",
//     highlights: [
//       "Collaborated continuously with clients and designers to map specs into frontend modules",
//       "Ensured high-performance rendering for heavy content delivery",
//     ],
//     tags: ["Frontend", "UI/UX", "React"],
//   },
//   {
//     company: "BuildBridge",
//     logo: "BB",
//     role: "Full-Stack Developer",
//     period: "2024",
//     location: "Remote",
//     status: "past",
//     desc: "Developed and maintained full-stack applications, bridging the gap between frontend user interfaces and robust backend logic.",
//     highlights: [
//       "Architected scalable backend services and API endpoints using Node.js",
//       "Built responsive, dynamic user interfaces with React and modern CSS frameworks",
//     ],
//     tags: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
//   }
// ];

// const STATS = [
//   { value: 2, suffix: "+", label: "Years experience" },
//   { value: WORK_HISTORY.length, suffix: "", label: "Companies" },
//   { value: 10, suffix: "+", label: "Projects shipped" },
// ];

// export default function Work() {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const lineRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // --- Intro sequence ---
//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
//       tl.set(rootRef.current, { autoAlpha: 1 })
//         .from(".work-badge", { y: -16, autoAlpha: 0, duration: 0.6 })
//         .from(
//           ".work-word",
//           { yPercent: 110, autoAlpha: 0, stagger: 0.045, duration: 0.9, ease: "power4.out" },
//           "-=0.3"
//         )
//         .from(".work-desc", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.4")
//         .from(".work-stat", { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, "-=0.3");

//       // --- Stat counters ---
//       gsap.utils.toArray<HTMLElement>(".work-stat-number").forEach((el) => {
//         const target = parseFloat(el.dataset.value || "0");
//         const counter = { val: 0 };
//         gsap.to(counter, {
//           val: target,
//           duration: 1.4,
//           ease: "power2.out",
//           scrollTrigger: { trigger: el, start: "top 90%", once: true },
//           onUpdate: () => {
//             el.textContent = Math.floor(counter.val).toString();
//           },
//         });
//       });

//       // --- Timeline spine draws in as you scroll ---
//       const line = lineRef.current;
//       if (line) {
//         const len = line.getTotalLength();
//         gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
//         gsap.to(line, {
//           strokeDashoffset: 0,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ".work-timeline",
//             start: "top 75%",
//             end: "bottom 85%",
//             scrub: 0.6,
//           },
//         });
//       }

//       // --- Each role card ---
//       gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
//         const dot = card.querySelector(".work-dot");
//         const dotPulse = card.querySelector(".work-dot-pulse");
//         const tlCard = gsap.timeline({
//           scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
//         });
//         tlCard
//           .from(dot, { scale: 0, autoAlpha: 0, duration: 0.45, ease: "back.out(2.5)" })
//           .to(dotPulse, { autoAlpha: 1, duration: 0.3 }, "-=0.1")
//           .from(
//             card.querySelector(".work-card-inner"),
//             { y: 44, autoAlpha: 0, duration: 0.75, ease: "power3.out" },
//             "-=0.25"
//           )
//           .from(
//             card.querySelectorAll(".work-highlight"),
//             { x: -14, autoAlpha: 0, stagger: 0.08, duration: 0.4 },
//             "-=0.35"
//           )
//           .from(
//             card.querySelectorAll(".work-tag"),
//             { scale: 0.85, autoAlpha: 0, stagger: 0.04, duration: 0.3 },
//             "-=0.25"
//           );

//         // subtle lift on hover
//         const inner = card.querySelector<HTMLElement>(".work-card-inner");
//         if (inner) {
//           const enter = () =>
//             gsap.to(inner, { y: -4, duration: 0.35, ease: "power2.out" });
//           const leave = () =>
//             gsap.to(inner, { y: 0, duration: 0.45, ease: "power3.out" });
//           inner.addEventListener("mouseenter", enter);
//           inner.addEventListener("mouseleave", leave);
//         }
//       });

//       gsap.from(".work-cta", {
//         y: 20,
//         autoAlpha: 0,
//         duration: 0.6,
//         scrollTrigger: { trigger: ".work-cta", start: "top 92%" },
//       });

//       // --- Background glow parallax ---
//       gsap.to(".work-glow", {
//         yPercent: 20,
//         ease: "none",
//         scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
//       });
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   const headline = "Where I've worked and what I built.";
//   const words = headline.split(" ");

//   return (
//     <div
//       ref={rootRef}
//       className="flex flex-col flex-1 items-center justify-center bg-[#121212] font-sans invisible relative overflow-hidden"
//     >
//       <main className="min-h-full w-full max-w-[85rem] items-center justify-between py-6 sm:items-start relative">
//         <div className="section-wrapper">
//           {/* Header */}
//           <div className="w-full bg-[#232322] rounded-4xl px-2 py-6 mt-24">
//             <div className="w-full rounded-[32px] border border-white/10 bg-[#121212] p-10 sm:p-12 relative overflow-hidden">
//               <div
//                 className="absolute inset-0 opacity-[0.03] pointer-events-none"
//                 style={{
//                   backgroundImage:
//                     "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
//                   backgroundSize: "32px 32px",
//                 }}
//               />

//               <div className="work-badge relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
//                 <Briefcase className="h-3.5 w-3.5 text-lime-400" />
//                 <span className="text-white text-sm font-medium">Work History</span>
//               </div>

//               <h1 className="relative mt-8 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
//                 {words.map((w, i) => (
//                   <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
//                     <span className="work-word inline-block">{w}</span>
//                   </span>
//                 ))}
//               </h1>

//               <p className="work-desc relative mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
//                 A timeline of roles, projects, and the systems I helped ship along the way.
//               </p>

//               {/* Stats row */}
//               <div className="relative mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg border-t border-white/[0.06] pt-8">
//                 {STATS.map((stat, i) => (
//                   <div key={i} className="work-stat">
//                     <div className="flex items-baseline gap-0.5">
//                       <span
//                         className="work-stat-number text-white text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums"
//                         data-value={stat.value}
//                       >
//                         0
//                       </span>
//                       <span className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">
//                         {stat.suffix}
//                       </span>
//                     </div>
//                     <p className="mt-1 text-white/40 text-xs sm:text-sm">{stat.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Timeline */}
//           <section className="w-full px-2 py-6">
//             <div className="work-timeline relative w-full rounded-[28px] bg-[#151516] border border-white/[0.06] py-10 sm:py-12 px-6 sm:px-12 overflow-hidden">
//               {/* spine */}
//               <svg
//                 className="absolute left-[34px] sm:left-[54px] top-14 w-px pointer-events-none"
//                 style={{ height: "calc(100% - 7rem)" }}
//                 width="2"
//                 preserveAspectRatio="none"
//                 viewBox="0 0 2 100"
//               >
//                 <path
//                   ref={lineRef}
//                   d="M 1 0 L 1 100"
//                   stroke="#5b4cf5"
//                   strokeWidth="2"
//                   vectorEffect="non-scaling-stroke"
//                 />
//               </svg>

//               <div className="flex flex-col gap-10 sm:gap-14">
//                 {WORK_HISTORY.map((job, i) => (
//                   <div key={i} className="work-card relative flex gap-6 sm:gap-10">
//                     {/* dot + logo */}
//                     <div className="relative shrink-0 flex flex-col items-center">
//                       <div
//                         className={`work-dot relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl flex items-center justify-center font-mono text-sm font-semibold z-10 border ${job.status === "current"
//                           ? "bg-[#5b4cf5]/10 border-[#5b4cf5]/40 text-[#5b4cf5]"
//                           : "bg-[#1b1b1c] border-white/10 text-white/70"
//                           }`}
//                       >
//                         {job.status === "current" && (
//                           <span className="work-dot-pulse opacity-0 absolute inset-0 rounded-2xl bg-[#5b4cf5]/20 animate-pulse" />
//                         )}
//                         <span className="relative">{job.logo}</span>
//                       </div>
//                     </div>

//                     {/* card */}
//                     <div
//                       className={`work-card-inner flex-1 rounded-2xl border p-6 sm:p-8 transition-colors ${job.status === "current"
//                         ? "border-[#5b4cf5]/30 bg-gradient-to-br from-[#5b4cf5]/[0.07] to-[#1b1b1c] hover:border-[#5b4cf5]/50"
//                         : "border-white/[0.06] bg-[#1b1b1c] hover:border-white/20"
//                         }`}
//                     >
//                       <div className="flex flex-wrap items-start justify-between gap-3">
//                         <div>
//                           <div className="flex items-center gap-2.5 flex-wrap">
//                             <h3 className="text-white text-xl font-semibold">{job.role}</h3>
//                             {job.status === "current" && (
//                               <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border text-lime-400 border-lime-400/30 bg-lime-400/10">
//                                 <span className="relative flex h-1.5 w-1.5">
//                                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400/60" />
//                                   <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
//                                 </span>
//                                 current
//                               </span>
//                             )}
//                           </div>
//                           <p className="mt-1 text-white/60 text-sm font-medium">{job.company}</p>
//                         </div>

//                         <div className="text-right shrink-0">
//                           <p className="text-white/40 text-xs font-mono uppercase tracking-wider">{job.period}</p>
//                           <p className="mt-1 flex items-center gap-1 text-white/30 text-xs justify-end">
//                             <MapPin className="h-3 w-3" />
//                             {job.location}
//                           </p>
//                         </div>
//                       </div>

//                       <p className="mt-5 text-white/50 text-sm sm:text-base leading-relaxed">{job.desc}</p>

//                       <ul className="mt-5 flex flex-col gap-2">
//                         {job.highlights.map((h, j) => (
//                           <li
//                             key={j}
//                             className="work-highlight flex items-start gap-2.5 text-white/45 text-sm leading-relaxed"
//                           >
//                             <span
//                               className={`mt-2 h-1 w-1 rounded-full shrink-0 ${job.status === "current" ? "bg-lime-400" : "bg-[#5b4cf5]"
//                                 }`}
//                             />
//                             {h}
//                           </li>
//                         ))}
//                       </ul>

//                       <div className="mt-5 flex flex-wrap gap-2">
//                         {job.tags.map((tag, j) => (
//                           <span
//                             key={j}
//                             className="work-tag text-[11px] font-mono uppercase tracking-wider text-white/40 border border-white/[0.08] rounded-full px-2.5 py-1"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Bottom CTA */}
//           <div className="work-cta w-full px-2 pb-6 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <p className="text-white/40 text-sm max-sm:text-center flex items-center gap-2 justify-center sm:justify-start">
//               <Sparkles className="h-3.5 w-3.5 text-lime-400 shrink-0" />
//               Want the full picture, resume included?
//             </p>
//             <a
//               href="#contact"
//               className="group max-sm:mx-auto flex items-center gap-3 rounded-full bg-lime-600 pl-6 pr-2 py-2 text-white font-medium hover:bg-lime-500 transition-colors self-start sm:self-auto"
//             >
//               <span>Get in touch</span>
//               <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
//                 <ArrowUpRight className="h-4 w-4" />
//               </span>
//             </a>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }



"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Terminal, GitCommit, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// NOTE ON FONTS
// This design leans on three registered roles via next/font/google in your
// root layout (or a local fonts.ts):
//   --font-display : Space Grotesk  (bold, geometric — used only on the H1)
//   --font-body    : Inter          (everything readable)
//   --font-mono    : JetBrains Mono (timestamps, tags, log furniture)
// If you already load JetBrains Mono elsewhere, just point --font-mono at it.
// Tailwind usage below assumes: font-display / font-sans / font-mono utility
// classes are wired to those variables. If not yet wired, swap the class
// names for whatever your tailwind.config maps them to.

const WORK_HISTORY = [
  {
    company: "Ningen (DSN x BCT Hackathon 3.0)",
    logo: "NG",
    role: "Full-Stack Developer",
    period: "May 2026",
    location: "Remote",
    desc: "Built a comprehensive application named Ningen under a tight hackathon deadline, focusing on functional components and backend integration.",
    highlights: [
      "Developed core application features and a dynamic navbar configuration",
      "Integrated decentralized concepts utilizing Solidity and blockchain tools",
    ],
    tags: ["React", "Solidity", "Node.js"],
  },
  {
    company: "NHL Data Analytics Platform",
    logo: "NHL",
    role: "AI Fullstack Engineer",
    period: "Feb 2026 – Mar 2026",
    location: "Remote",
    desc: "Designed a serverless data pipeline leveraging Next.js API routes to aggregate statistics across multiple external APIs.",
    highlights: [
      "Built high-performance statistical tracking algorithms using advanced concurrency controls",
      "Integrated automated report-generation layers using ExcelJS for dynamic reports",
    ],
    tags: ["Next.js", "Serverless", "ExcelJS", "APIs"],
  },
  {
    company: "Librobase",
    logo: "LB",
    role: "Co-Founder & AI Fullstack Engineer",
    period: "Jun 2025 – Feb 2026",
    location: "Remote",
    desc: "Architected and deployed a highly scalable real-time marketplace infrastructure, managing complex authentication and transaction workflows.",
    highlights: [
      "Engineered a low-latency live bidding architecture utilizing web sockets globally",
      "Structured secure and resilient RESTful APIs for continuous transions",
      "Integrated media pipelines with Cloudinary for high-performance asset optimization",
    ],
    tags: ["Next.js", "Express.js", "MongoDB", "WebSockets"],
  },
  {
    company: "Starix",
    logo: "SX",
    role: "Frontend Engineer",
    period: "2025",
    location: "Remote",
    desc: "Managed the frontend repository and code deployments, ensuring a highly responsive and seamless user experience.",
    highlights: [
      "Handled seamless code deployments for the frontend application",
      "Optimized the user interface and core components for performance",
    ],
    tags: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    company: "Campus Crib",
    logo: "CC",
    role: "Front-end Software Engineer",
    period: "Nov 2024 – Apr 2025",
    location: "Remote",
    desc: "Spearheaded UI architecture utilizing React and Tailwind CSS to connect users seamlessly with local services.",
    highlights: [
      "Designed global state tracking mechanisms via Zustand and Context API",
      "Integrated real-time messaging functionality using Socket.IO for live updates",
    ],
    tags: ["React", "Tailwind CSS", "Zustand", "Socket.IO"],
  },
  {
    company: "Bettisports",
    logo: "BS",
    role: "Frontend Software Engineer",
    period: "Apr 2024 – Oct 2024",
    location: "Remote",
    desc: "Built scalable, device-agnostic user interfaces for a high-traffic sports content and blogging ecosystem.",
    highlights: [
      "Collaborated continuously with clients and designers to map specs into frontend modules",
      "Ensured high-performance rendering for heavy content delivery",
    ],
    tags: ["Frontend", "UI/UX", "React"],
  },
  {
    company: "BuildBridge",
    logo: "BB",
    role: "Full-Stack Developer",
    period: "2024",
    location: "Remote",
    desc: "Developed and maintained full-stack applications, bridging the gap between frontend user interfaces and robust backend logic.",
    highlights: [
      "Architected scalable backend services and API endpoints using Node.js",
      "Built responsive, dynamic user interfaces with React and modern CSS frameworks",
    ],
    tags: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
  },
];

const STATS = [
  { value: 2, suffix: "+", label: "years active", key: "yrs_active" },
  { value: WORK_HISTORY.length, suffix: "", label: "orgs shipped to", key: "orgs_count" },
  { value: 10, suffix: "+", label: "projects deployed", key: "proj_count" },
];

export default function Work() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(rootRef.current, { autoAlpha: 1 });
        return;
      }

      // --- Boot sequence ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(rootRef.current, { autoAlpha: 1 })
        .from(".work-badge", { y: -14, autoAlpha: 0, duration: 0.5 })
        .from(".work-cursor", { autoAlpha: 0, duration: 0.2 }, "-=0.2")
        .from(
          ".work-word",
          { yPercent: 110, autoAlpha: 0, stagger: 0.045, duration: 0.9, ease: "power4.out" },
          "-=0.25"
        )
        .from(".work-desc", { y: 14, autoAlpha: 0, duration: 0.6 }, "-=0.45")
        .from(".work-stat", { y: 16, autoAlpha: 0, stagger: 0.09, duration: 0.5 }, "-=0.3");

      // --- Stat counters ---
      gsap.utils.toArray<HTMLElement>(".work-stat-number").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val).toString();
          },
        });
      });

      // --- Signal spine: draws in + a scanning playhead synced to scroll ---
      const line = lineRef.current;
      const head = headRef.current;
      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        ScrollTrigger.create({
          trigger: ".work-timeline",
          start: "top 75%",
          end: "bottom 85%",
          scrub: 0.6,
          onUpdate: (self) => {
            gsap.set(line, { strokeDashoffset: len * (1 - self.progress) });
            if (head) gsap.set(head, { top: `${self.progress * 100}%` });
          },
        });
      }

      // --- Each log entry ---
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        const dot = card.querySelector(".work-dot");
        const tlCard = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
        });
        tlCard
          .from(dot, { scale: 0, autoAlpha: 0, duration: 0.4, ease: "back.out(2.5)" })
          .from(
            card.querySelector(".work-card-inner"),
            { y: 40, autoAlpha: 0, duration: 0.7, ease: "power3.out" },
            "-=0.2"
          )
          .from(
            card.querySelectorAll(".work-highlight"),
            { x: -12, autoAlpha: 0, stagger: 0.07, duration: 0.35 },
            "-=0.3"
          )
          .from(
            card.querySelectorAll(".work-tag"),
            { scale: 0.85, autoAlpha: 0, stagger: 0.03, duration: 0.25 },
            "-=0.2"
          );

        const inner = card.querySelector<HTMLElement>(".work-card-inner");
        if (inner) {
          const enter = () => gsap.to(inner, { y: -3, duration: 0.35, ease: "power2.out" });
          const leave = () => gsap.to(inner, { y: 0, duration: 0.45, ease: "power3.out" });
          inner.addEventListener("mouseenter", enter);
          inner.addEventListener("mouseleave", leave);
        }
      });

      gsap.from(".work-cta", {
        y: 18,
        autoAlpha: 0,
        duration: 0.6,
        scrollTrigger: { trigger: ".work-cta", start: "top 92%" },
      });

      // --- Ambient CRT flicker on the background grid (very subtle) ---
      gsap.to(".work-scanlines", {
        opacity: 0.05,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const headline = "A running log of where I've shipped code.";
  const words = headline.split(" ");
  const total = WORK_HISTORY.length;

  return (
    <div
      ref={rootRef}
      className="flex flex-col flex-1 items-center justify-center bg-[#08090A] font-sans invisible relative overflow-hidden"
    >
      {/* ambient scanline / grid texture */}
      <div
        className="work-scanlines pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,176,0,0.5) 0px, rgba(255,176,0,0.5) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <main className="min-h-full w-full max-w-[85rem] items-center justify-between py-6 sm:items-start relative">
        <div className="section-wrapper">
          {/* Header — framed like a terminal window */}
          <div className="w-full bg-[#101210] rounded-4xl px-2 py-6 mt-24">
            <div className="w-full rounded-[32px] border border-white/[0.08] bg-[#0A0B0A] p-10 sm:p-12 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,176,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,176,0,0.5) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* breadcrumb / file path */}
              <div className="relative flex items-center gap-2 text-white/25 font-mono text-[11px] tracking-wide mb-6">
                <span>~/oyetunji</span>
                <span className="text-white/15">/</span>
                <span className="text-white/40">career.log</span>
              </div>

              <div className="work-badge relative inline-flex items-center gap-2 rounded-full border border-[#FFB000]/25 bg-[#FFB000]/[0.07] px-4 py-2">
                <Terminal className="h-3.5 w-3.5 text-[#FFB000]" />
                <span className="text-[#FFB000] text-xs font-mono uppercase tracking-widest">
                  work_history.log
                </span>
              </div>

              <h1 className="relative mt-8 text-[#E7E5DE] text-4xl sm:text-5xl md:text-[52px] font-display font-semibold leading-[1.08] tracking-tight max-w-2xl">
                {words.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
                    <span className="work-word inline-block">{w}</span>
                  </span>
                ))}
                <span className="work-cursor inline-block w-[0.5ch] h-[0.85em] bg-[#59D9C7] align-middle ml-1 animate-pulse" />
              </h1>

              <p className="work-desc relative mt-6 text-white/45 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
                Seven entries, chronological, unedited. Each one is a real
                deployment — the role, the stack, and what actually shipped.
              </p>

              {/* Stats row, styled like a log summary */}
              <div className="relative mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg border-t border-white/[0.06] pt-8">
                {STATS.map((stat, i) => (
                  <div key={i} className="work-stat">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#59D9C7]/70">
                      {stat.key}
                    </p>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span
                        className="work-stat-number text-[#E7E5DE] text-3xl sm:text-4xl font-display font-semibold tracking-tight tabular-nums"
                        data-value={stat.value}
                      >
                        0
                      </span>
                      <span className="text-[#E7E5DE] text-3xl sm:text-4xl font-display font-semibold tracking-tight">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="mt-1 text-white/35 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline / log entries */}
          <section className="w-full px-2 py-6">
            <div className="work-timeline relative w-full rounded-[28px] bg-[#0D0F0D] border border-white/[0.06] py-10 sm:py-12 px-6 sm:px-12 overflow-hidden">
              {/* spine */}
              <svg
                className="absolute left-[34px] sm:left-[54px] top-14 w-px pointer-events-none"
                style={{ height: "calc(100% - 7rem)" }}
                width="2"
                preserveAspectRatio="none"
                viewBox="0 0 2 100"
              >
                <path
                  ref={lineRef}
                  d="M 1 0 L 1 100"
                  stroke="#FFB000"
                  strokeWidth="2"
                  strokeDasharray="1 3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {/* scanning playhead */}
              <div
                ref={headRef}
                className="absolute left-[34px] sm:left-[54px] w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#59D9C7] pointer-events-none"
                style={{ top: "0%", boxShadow: "0 0 10px 2px rgba(89,217,199,0.6)" }}
              />

              <div className="flex flex-col gap-10 sm:gap-14">
                {WORK_HISTORY.map((job, i) => {
                  const version = total - i;
                  const isLatest = i === 0;
                  return (
                    <div key={i} className="work-card relative flex gap-6 sm:gap-10">
                      {/* dot + logo */}
                      <div className="relative shrink-0 flex flex-col items-center">
                        <div className="work-dot relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl flex items-center justify-center font-mono text-sm font-semibold z-10 border bg-[#111311] border-white/10 text-white/70">
                          <span className="relative">{job.logo}</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="work-card-inner group flex-1 rounded-2xl border border-white/[0.07] bg-[#101210] p-6 sm:p-8 transition-colors hover:border-[#FFB000]/25 relative">
                        {/* corner brackets, revealed on hover */}
                        <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t border-l border-[#59D9C7]/0 group-hover:border-[#59D9C7]/60 transition-colors rounded-tl-2xl" />
                        <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r border-[#59D9C7]/0 group-hover:border-[#59D9C7]/60 transition-colors rounded-br-2xl" />

                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                                log {String(total - i).padStart(2, "0")}
                              </span>
                              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/10 text-white/40">
                                <GitCommit className="h-2.5 w-2.5" />
                                v{version}.0
                              </span>
                              {isLatest && (
                                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border text-[#59D9C7] border-[#59D9C7]/30 bg-[#59D9C7]/10">
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#59D9C7]/60" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#59D9C7]" />
                                  </span>
                                  latest
                                </span>
                              )}
                            </div>
                            <h3 className="mt-2 text-[#E7E5DE] text-xl font-display font-semibold">
                              {job.role}
                            </h3>
                            <p className="mt-1 text-white/55 text-sm font-medium">{job.company}</p>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-white/40 text-xs font-mono uppercase tracking-wider">
                              {job.period}
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-white/30 text-xs justify-end">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 text-white/50 text-sm sm:text-base leading-relaxed font-sans">
                          {job.desc}
                        </p>

                        <ul className="mt-5 flex flex-col gap-2">
                          {job.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="work-highlight flex items-start gap-2.5 text-white/45 text-sm leading-relaxed font-sans"
                            >
                              <span className="mt-0.5 font-mono text-[#FFB000]/70 shrink-0">{">"}</span>
                              {h}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {job.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="work-tag text-[11px] font-mono uppercase tracking-wider text-white/40 border border-white/[0.08] rounded-full px-2.5 py-1"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="work-cta w-full px-2 pb-6 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-white/40 text-sm font-mono max-sm:text-center flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-[#59D9C7]">$</span>
              want the full log, resume included?
            </p>
            <a
              href="#contact"
              className="group max-sm:mx-auto flex items-center gap-3 rounded-full bg-[#FFB000] pl-6 pr-2 py-2 text-[#08090A] font-medium hover:bg-[#FFC133] transition-colors self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#59D9C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090A]"
            >
              <span>Get in touch</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-[#08090A] text-[#FFB000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}