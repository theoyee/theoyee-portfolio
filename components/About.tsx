// import { ArrowDownRight, Code, Cpu, Layers } from "lucide-react";

// export default function About() {
//   const pillars = [
//     {
//       icon: <Cpu className="h-5 w-5 text-[#5b4cf5]" />,
//       title: "Backend & Systems Architecture",
//       desc: "Designing resilient API layers, structuring data models, and engineering lightweight, fast backend services.",
//     },
//     {
//       icon: <Layers className="h-5 w-5 text-[#5b4cf5]" />,
//       title: "Modern Frontend Engineering",
//       desc: "Crafting modular, high-performance interfaces using React and Next.js with deep optimization for layouts and animations.",
//     },
//     {
//       icon: <Code className="h-5 w-5 text-[#5b4cf5]" />,
//       title: "Robust Infrastructure",
//       desc: "Setting up modern CI/CD systems, containerized cloud workflows, and highly automated deployment pipelines.",
//     },
//   ];

//   return (
//     <section className="w-full bg-[#232322] rounded-b-4xl flex items-center justify-center px-2 py-6">
//       <div className="w-full p-10 sm:p-12">
//         {/* Top row: Section header + tracking badge */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-white text-xl font-semibold leading-tight">About</h2>
//             <p className="text-white/50 text-sm mt-0.5">Philosophy &amp; Stack</p>
//           </div>

//           <div className="hidden sm:flex items-center gap-2 shrink-0">
//             <span className="text-white/40 text-xs font-mono tracking-wider uppercase">
//               [ index // 01 ]
//             </span>
//           </div>
//         </div>

//         {/* Headline */}
//         <h3 className="mt-10 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-3xl">
//           Engineering products with deliberate execution and clean foundations.
//         </h3>

//         {/* Narrative / Context split layout */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 border-t border-white/5 pt-8">
//           <div className="md:col-span-2">
//             <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
//               The Strategy
//             </span>
//           </div>
//           <div className="md:col-span-3 space-y-6 text-white/50 text-base sm:text-lg leading-relaxed">
//             <p>
//               I ground my engineering approach at the intersection of performance and structural clarity.
//               Instead of rushing straight to production, I prioritize planning data schemas and architecture
//               patterns that allow products to scale smoothly without compounding tech debt.
//             </p>
//             <p>
//               My goal remains constant: minimize unnecessary runtime overhead, build clean systems that
//               collaborators actually enjoy extending, and deliver fast user experiences that feel fully
//               native across browsers.
//             </p>
//           </div>
//         </div>

//         {/* Technical focus grid cards */}
//         <div className="mt-12 border-t border-white/5 pt-8">
//           <span className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-8">
//             Technical Focus
//           </span>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {pillars.map((pillar, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors group"
//               >
//                 <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center mb-5 border border-white/10">
//                   {pillar.icon}
//                 </div>
//                 <h4 className="text-white text-lg font-medium mb-2">{pillar.title}</h4>
//                 <p className="text-white/40 text-sm leading-relaxed">{pillar.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom CTA block */}
//         <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <p className="text-white/40 text-sm">
//             Interested in tracing the development history of my applications?
//           </p>
//           <button className="group flex items-center gap-3 rounded-full bg-white/10 pl-6 pr-2 py-2 text-white font-medium hover:bg-white/15 transition-colors self-start sm:self-auto">
//             <span>Explore my work</span>
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#121212]">
//               <ArrowDownRight className="h-4 w-4" />
//             </span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }



// import { ArrowUpRight, Cpu, Layers, Server } from "lucide-react";

// export default function About() {
//   const pipeline = [
//     {
//       stage: "01",
//       tag: "INTERFACE",
//       icon: <Layers className="h-4 w-4" />,
//       title: "Modern Frontend Engineering",
//       desc: "Modular React and Next.js interfaces, tuned for layout stability and motion that never fights the frame rate.",
//     },
//     {
//       stage: "02",
//       tag: "LOGIC",
//       icon: <Cpu className="h-4 w-4" />,
//       title: "Backend & Systems Architecture",
//       desc: "API layers and data models designed for the load they'll actually carry, not the one in the demo.",
//     },
//     {
//       stage: "03",
//       tag: "INFRASTRUCTURE",
//       icon: <Server className="h-4 w-4" />,
//       title: "Deployment & Delivery",
//       desc: "CI/CD and containerized pipelines that turn a merged branch into a running system, automatically.",
//     },
//   ];

//   return (
//     <div className="w-full bg-[#232322] rounded-b-[28px]  px-2 py-6">
//       <div className="w-full p-10 sm:p-12">
//         {/* Header row */}
//         <div className="flex items-start justify-between gap-6">
//           <div>
//             <h2 className="text-white text-xl font-semibold leading-tight">About</h2>
//             <p className="text-white/45 text-sm mt-1">Philosophy &amp; stack</p>
//           </div>

//           <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 shrink-0">
//             <span className="relative flex h-1.5 w-1.5">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5b4cf5]/60" />
//               <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5b4cf5]" />
//             </span>
//             <span className="text-white/50 text-[11px] font-mono tracking-wider uppercase">
//               currently shipping
//             </span>
//           </div>
//         </div>

//         {/* Headline */}
//         <h3 className="mt-10 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-3xl">
//           Engineering products with deliberate execution and clean foundations.
//         </h3>

//         {/* Narrative / Strategy split */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 border-t border-white/[0.06] pt-8">
//           <div className="md:col-span-2">
//             <span className="text-white/40 text-xs font-mono font-medium uppercase tracking-wider">
//               the strategy
//             </span>
//           </div>
//           <div className="md:col-span-3 space-y-6 text-white/55 text-base sm:text-lg leading-relaxed">
//             <p>
//               I ground my engineering approach at the intersection of performance and structural clarity.
//               Instead of rushing straight to production, I plan the data schema and the architecture pattern
//               first, so the product can scale without compounding tech debt later.
//             </p>
//             <p>
//               The goal stays constant across every project: cut runtime overhead, build systems a collaborator
//               can extend without a walkthrough, and ship interfaces that feel native to whatever browser opens
//               them.
//             </p>
//           </div>
//         </div>

//         {/* Signature element: architecture pipeline */}
//         <div className="mt-12 border-t border-white/[0.06] pt-10">
//           <span className="text-white/40 text-xs font-mono font-medium uppercase tracking-wider block mb-10">
//             how a request moves through my stack
//           </span>

//           <div className="relative">
//             {/* connector line (desktop) */}
//             <div className="hidden md:block absolute left-0 right-0 top-[38px] h-px overflow-hidden">
//               <div className="h-full w-full bg-white/[0.08]" />
//               <div className="pipeline-flow absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-lime-600 to-transparent" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
//               {pipeline.map((step, i) => (
//                 <div key={i} className="relative">
//                   <div className="flex items-center gap-3 md:block">
//                     <div className="relative z-10 h-[76px] w-[76px] md:h-[76px] md:w-[76px] shrink-0 rounded-2xl border border-white/[0.08] bg-[#151516] flex flex-col items-center justify-center gap-1 text-lime-400">
//                       {step.icon}
//                       <span className="text-white/30 text-[10px] font-mono tracking-widest">
//                         {step.stage}
//                       </span>
//                     </div>
//                     <span className="md:hidden text-white/30 text-[11px] font-mono tracking-widest uppercase">
//                       {step.tag}
//                     </span>
//                   </div>

//                   <div className="mt-4 md:mt-5">
//                     <span className="hidden md:inline-block text-white/30 text-[11px] font-mono tracking-widest uppercase mb-2">
//                       {step.tag}
//                     </span>
//                     <h4 className="text-white text-lg font-medium mb-2 mt-0.5">{step.title}</h4>
//                     <p className="text-white/40 text-sm leading-relaxed max-w-xs">{step.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-12 py-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-sm:justify-center">
//           <p className="text-white/45 text-sm max-sm:text-center">
//             Want to see the commits behind the pipeline above?
//           </p>
//           <a
//             href="/work"
//             className="group max-sm:mx-auto flex items-center gap-3 rounded-full bg-white/[0.08] pl-6 pr-2 py-2 text-white font-medium hover:bg-lime-600 transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1b1c]"
//           >
//             <span>Explore my work</span>
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#151516] group-hover:bg-[#1b1b1c] transition-colors">
//               <ArrowUpRight className="h-4 w-4" />
//             </span>
//           </a>
//         </div>
//       </div>

//       <style>{`
//         @keyframes pipeline-flow {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(300%); }
//         }
//         .pipeline-flow {
//           animation: pipeline-flow 3.5s ease-in-out infinite;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .pipeline-flow { animation: none; }
//           .animate-ping { animation: none; }
//         }
//       `}</style>
//     </div>
//   );
// }



import { ArrowUpRight, Cpu, Layers, Server } from "lucide-react";

export default function About() {
  const pipeline = [
    {
      stage: "01",
      tag: "INTERFACE",
      icon: <Layers className="h-4 w-4" />,
      title: "Modern Frontend Engineering",
      desc: "Modular React and Next.js interfaces, tuned for layout stability and motion that never fights the frame rate.",
    },
    {
      stage: "02",
      tag: "LOGIC",
      icon: <Cpu className="h-4 w-4" />,
      title: "Backend & Systems Architecture",
      desc: "API layers and data models designed for the load they'll actually carry, not the one in the demo.",
    },
    {
      stage: "03",
      tag: "INFRASTRUCTURE",
      icon: <Server className="h-4 w-4" />,
      title: "Deployment & Delivery",
      desc: "CI/CD and containerized pipelines that turn a merged branch into a running system, automatically.",
    },
  ];

  return (
    <div className="w-full bg-[#101210] rounded-b-[28px] px-2 py-6">
      <div className="w-full py-10 sm:p-12">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-[#E7E5DE] text-xl font-display font-semibold leading-tight">About</h2>
            <p className="text-white/45 text-sm mt-1">Philosophy &amp; stack</p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#59D9C7]/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#59D9C7]" />
            </span>
            <span className="text-white/50 text-[11px] font-mono tracking-wider uppercase">
              currently shipping
            </span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="mt-10 text-[#E7E5DE] text-4xl sm:text-5xl md:text-[52px] font-display font-semibold leading-[1.08] tracking-tight max-w-3xl">
          Engineering products with deliberate execution and clean foundations.
        </h3>

        {/* Narrative / Strategy split */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 border-t border-white/[0.06] pt-8">
          <div className="md:col-span-2">
            <span className="text-white/40 text-xs font-mono font-medium uppercase tracking-wider">
              the strategy
            </span>

            <div className="relative h-full w-full overflow-hidden  bordr borderwhite/[0.08] bg[#181A18] ">
              {/* <div className="bg-[#FFB000] h-8 w-8 rounded-full  " /> */}
              <img
                src="https://api.dicebear.com/10.x/micah/svg?seed=theoyeelzr&backgroundColor=121212&radius=150"
                // src="https://api.dicebear.com/10.x/micah/svg?seed=theoyee&backgroundColor=121212&radius=150"
                alt="Oyee Olagoke"
                className="h-full w-full object-contain absolute"
                draggable={true}
              />
              {/* <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#101210] bg-[#59D9C7]" /> */}
            </div>
          </div>
          <div className="md:col-span-3 space-y-6 text-white/55 text-base sm:text-lg leading-relaxed font-sans">
            <p>
              I ground my engineering approach at the intersection of performance and structural clarity.
              Instead of rushing straight to production, I plan the data schema and the architecture pattern
              first, so the product can scale without compounding tech debt later.
            </p>
            <p>
              The goal stays constant across every project: cut runtime overhead, build systems a collaborator
              can extend without a walkthrough, and ship interfaces that feel native to whatever browser opens
              them.
            </p>
          </div>
        </div>

        {/* Signature element: architecture pipeline */}
        <div className="mt-12 border-t border-white/[0.06] pt-10">
          <span className="text-white/40 text-xs font-mono font-medium uppercase tracking-wider block mb-10">
            how a request moves through my stack
          </span>

          <div className="relative">
            {/* connector line (desktop) */}
            <div className="hidden md:block absolute left-0 right-0 top-[38px] h-px overflow-hidden">
              <div className="h-full w-full bg-white/[0.08]" />
              <div className="pipeline-flow absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFB000] to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
              {pipeline.map((step, i) => (
                <div key={i} className="relative">
                  <div className="flex items-center gap-3 md:block">
                    <div className="relative z-10 h-[76px] w-[76px] md:h-[76px] md:w-[76px] shrink-0 rounded-2xl border border-white/[0.08] bg-[#0D0F0D] flex flex-col items-center justify-center gap-1 text-[#FFB000]">
                      {step.icon}
                      <span className="text-white/30 text-[10px] font-mono tracking-widest">
                        {step.stage}
                      </span>
                    </div>
                    <span className="md:hidden text-white/30 text-[11px] font-mono tracking-widest uppercase">
                      {step.tag}
                    </span>
                  </div>

                  <div className="mt-4 md:mt-5">
                    <span className="hidden md:inline-block text-white/30 text-[11px] font-mono tracking-widest uppercase mb-2">
                      {step.tag}
                    </span>
                    <h4 className="text-[#E7E5DE] text-lg font-medium mb-2 mt-0.5">{step.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs font-sans">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 py-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-sm:justify-center">
          <p className="text-white/45 text-sm max-sm:text-center">
            Want to see the commits behind the pipeline above?
          </p>
          <a
            href="/work"
            className="group max-sm:mx-auto flex items-center gap-3 rounded-full bg-white/[0.08] pl-6 pr-2 py-2 text-white font-medium hover:bg-[#FFB000] hover:text-[#08090A] transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#59D9C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101210]"
          >
            <span>Explore my work</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#0D0F0D] group-hover:bg-[#08090A] group-hover:border-black/20 group-hover:text-[#FFB000] transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pipeline-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .pipeline-flow {
          animation: pipeline-flow 3.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pipeline-flow { animation: none; }
          .animate-ping { animation: none; }
        }
      `}</style>
    </div>
  );
}