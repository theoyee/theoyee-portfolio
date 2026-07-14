"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Layout, Server, Zap, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SERV_HEADLINE = "Crafting scalable solutions.";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const words = SERV_HEADLINE.split(" ");

  const offerings = [
    {
      num: "01",
      icon: <Layers className="h-4 w-4" />,
      title: "Full-Stack Development",
      desc: "Responsive, high-performance web applications end to end — clean interfaces on top of database schemas built to hold up under real usage.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
    },
    {
      num: "02",
      icon: <Layout className="h-4 w-4" />,
      title: "SaaS Platforms",
      desc: "Multi-tenant architecture with secure auth flows, subscription billing, and workspace management built to scale past the first hundred users.",
      tags: ["Auth", "Billing", "Multi-tenant"],
    },
    {
      num: "03",
      icon: <Server className="h-4 w-4" />,
      title: "API Design & Integration",
      desc: "Structured, reliable API networks with clean data pathways, external system syncs, and documentation that makes integration a non-event.",
      tags: ["REST", "Webhooks", "Docs"],
    },
    {
      num: "04",
      icon: <Zap className="h-4 w-4" />,
      title: "Performance Optimization",
      desc: "Diagnosing sluggish queries, trimming render loops, and cutting runtime weight so the app is fast on the hardware your users actually have.",
      tags: ["Profiling", "Caching", "Core Web Vitals"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".serv-badge", {
        autoAlpha: 0, y: -10, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".serv-word", {
        yPercent: 110, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      gsap.from(".serv-desc", {
        y: 18, autoAlpha: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".serv-desc", start: "top 88%" },
      });

      gsap.utils.toArray<HTMLElement>(".serv-row").forEach((row) => {
        const bar = row.querySelector(".serv-accent");
        const icon = row.querySelector(".serv-icon");
        const arrow = row.querySelector(".serv-arrow");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 82%", toggleActions: "play none none reverse" },
        });
        tl.from(row, { y: 40, autoAlpha: 0, duration: 0.7, ease: "power3.out" })
          .fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: "power2.out" }, "-=0.5")
          .from(icon, { scale: 0.4, rotate: -35, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.5")
          .from(row.querySelectorAll(".serv-tag"), { autoAlpha: 0, y: 8, stagger: 0.04, duration: 0.3 }, "-=0.3")
          .from(arrow, { autoAlpha: 0, scale: 0.6, duration: 0.4 }, "-=0.3");
      });

      gsap.from(".serv-cta", {
        y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".serv-cta", start: "top 92%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-10 px-2 sm:p-12 ">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-[#E7E5DE] text-xl font-display font-semibold leading-tight">Services</h2>
          <p className="text-white/50 text-sm mt-0.5">What I can do for you</p>
        </div>

        <div className="serv-badge hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#59D9C7]/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#59D9C7]" />
          </span>
          <span className="text-white/50 text-[11px] font-mono tracking-wider uppercase">open for projects</span>
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <h3 className="text-[#E7E5DE] text-4xl sm:text-5xl md:text-[52px] font-display font-semibold leading-[1.08] tracking-tight">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
              <span className="serv-word inline-block">{w}</span>
            </span>
          ))}
        </h3>
        <p className="serv-desc mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
          Im a technical problem solver first — every engagement below is a means to a product
          that holds up under real traffic, not just a demo.
        </p>
      </div>

      <div className="mt-12 border-t border-white/[0.06]">
        {offerings.map((service, i) => (
          <div key={i} className="serv-row group relative border-b border-white/[0.06] py-8 sm:py-10 transition-colors">
            <span className="serv-accent absolute left-0 top-0 h-full w-px bg-[#FFB000] origin-top" />

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 pl-6">
              <div className="sm:col-span-2 flex items-center gap-3 sm:block">
                <span className="text-white/20 font-mono text-sm font-semibold block">{service.num}</span>
                <div className="serv-icon mt-0 sm:mt-3 h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-[#FFB000]">
                  {service.icon}
                </div>
              </div>

              <div className="sm:col-span-8">
                <h4 className="text-[#E7E5DE] text-xl font-semibold mb-2.5">{service.title}</h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl font-sans">{service.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="serv-tag text-[11px] font-mono uppercase tracking-wider text-white/40 border border-white/[0.08] rounded-full px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2 flex items-start sm:justify-end">
                <span className="serv-arrow flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 group-hover:text-[#08090A] group-hover:border-[#FFB000] group-hover:bg-[#FFB000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="serv-cta mt-12 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-white/40 text-sm max-sm:text-center">Have a project in mind that requires engineering focus?</p>
        <a
          href="#contact"
          className="group max-sm:mx-auto flex items-center max-sm:mx-auto gap-3 rounded-full bg-[#FFB000] pl-6 pr-2 py-2 text-[#08090A] font-medium hover:bg-[#FFC133] transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#59D9C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151516]"
        >
          <span>Get in touch</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-[#08090A] text-[#FFB000]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-ping { animation: none; }
        }
      `}</style>
    </section>
  );
}

// "use client";

// import { useEffect, useRef } from "react";
// import { ArrowUpRight, Layout, Server, Zap, Layers } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// const SERV_HEADLINE = "Crafting scalable solutions.";

// export default function Services() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const words = SERV_HEADLINE.split(" ");

//   const offerings = [
//     {
//       num: "01",
//       icon: <Layers className="h-4 w-4" />,
//       title: "Full-Stack Development",
//       desc: "Responsive, high-performance web applications end to end — clean interfaces on top of database schemas built to hold up under real usage.",
//       tags: ["Next.js", "TypeScript", "PostgreSQL"],
//     },
//     {
//       num: "02",
//       icon: <Layout className="h-4 w-4" />,
//       title: "SaaS Platforms",
//       desc: "Multi-tenant architecture with secure auth flows, subscription billing, and workspace management built to scale past the first hundred users.",
//       tags: ["Auth", "Billing", "Multi-tenant"],
//     },
//     {
//       num: "03",
//       icon: <Server className="h-4 w-4" />,
//       title: "API Design & Integration",
//       desc: "Structured, reliable API networks with clean data pathways, external system syncs, and documentation that makes integration a non-event.",
//       tags: ["REST", "Webhooks", "Docs"],
//     },
//     {
//       num: "04",
//       icon: <Zap className="h-4 w-4" />,
//       title: "Performance Optimization",
//       desc: "Diagnosing sluggish queries, trimming render loops, and cutting runtime weight so the app is fast on the hardware your users actually have.",
//       tags: ["Profiling", "Caching", "Core Web Vitals"],
//     },
//   ];

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".serv-badge", {
//         autoAlpha: 0, y: -10, duration: 0.6, ease: "power2.out",
//         scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
//       });

//       gsap.from(".serv-word", {
//         yPercent: 110, autoAlpha: 0, stagger: 0.05, duration: 0.9, ease: "power4.out",
//         scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
//       });

//       gsap.from(".serv-desc", {
//         y: 18, autoAlpha: 0, duration: 0.7, ease: "power3.out",
//         scrollTrigger: { trigger: ".serv-desc", start: "top 88%" },
//       });

//       gsap.utils.toArray<HTMLElement>(".serv-row").forEach((row) => {
//         const bar = row.querySelector(".serv-accent");
//         const icon = row.querySelector(".serv-icon");
//         const arrow = row.querySelector(".serv-arrow");
//         const tl = gsap.timeline({
//           scrollTrigger: { trigger: row, start: "top 82%", toggleActions: "play none none reverse" },
//         });
//         tl.from(row, { y: 40, autoAlpha: 0, duration: 0.7, ease: "power3.out" })
//           .fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: 0.6, ease: "power2.out" }, "-=0.5")
//           .from(icon, { scale: 0.4, rotate: -35, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.5")
//           .from(row.querySelectorAll(".serv-tag"), { autoAlpha: 0, y: 8, stagger: 0.04, duration: 0.3 }, "-=0.3")
//           .from(arrow, { autoAlpha: 0, scale: 0.6, duration: 0.4 }, "-=0.3");
//       });

//       gsap.from(".serv-cta", {
//         y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out",
//         scrollTrigger: { trigger: ".serv-cta", start: "top 92%" },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="w-full py-10 px-2 sm:p-12 ">
//       <div className="flex items-start justify-between gap-6">
//         <div>
//           <h2 className="text-white text-xl font-semibold leading-tight">Services</h2>
//           <p className="text-white/50 text-sm mt-0.5">What I can do for you</p>
//         </div>

//         <div className="serv-badge hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 shrink-0">
//           <span className="relative flex h-1.5 w-1.5">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400/60" />
//             <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
//           </span>
//           <span className="text-white/50 text-[11px] font-mono tracking-wider uppercase">open for projects</span>
//         </div>
//       </div>

//       <div className="mt-10 max-w-3xl">
//         <h3 className="text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight">
//           {words.map((w, i) => (
//             <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
//               <span className="serv-word inline-block">{w}</span>
//             </span>
//           ))}
//         </h3>
//         <p className="serv-desc mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl">
//           Im a technical problem solver first — every engagement below is a means to a product
//           that holds up under real traffic, not just a demo.
//         </p>
//       </div>

//       <div className="mt-12 border-t border-white/[0.06]">
//         {offerings.map((service, i) => (
//           <div key={i} className="serv-row group relative border-b border-white/[0.06] py-8 sm:py-10 transition-colors">
//             <span className="serv-accent absolute left-0 top-0 h-full w-px bg-lime-400 origin-top" />

//             <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 pl-6">
//               <div className="sm:col-span-2 flex items-center gap-3 sm:block">
//                 <span className="text-white/20 font-mono text-sm font-semibold block">{service.num}</span>
//                 <div className="serv-icon mt-0 sm:mt-3 h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-lime-500">
//                   {service.icon}
//                 </div>
//               </div>

//               <div className="sm:col-span-8">
//                 <h4 className="text-white text-xl font-semibold mb-2.5">{service.title}</h4>
//                 <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl">{service.desc}</p>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {service.tags.map((tag, j) => (
//                     <span key={j} className="serv-tag text-[11px] font-mono uppercase tracking-wider text-white/40 border border-white/[0.08] rounded-full px-2.5 py-1">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="sm:col-span-2 flex items-start sm:justify-end">
//                 <span className="serv-arrow flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 group-hover:text-white group-hover:border-lime-600 group-hover:bg-lime-400/10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
//                   <ArrowUpRight className="h-4 w-4" />
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="serv-cta mt-12 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <p className="text-white/40 text-sm max-sm:text-center">Have a project in mind that requires engineering focus?</p>
//         <a
//           href="#contact"
//           className="group max-sm:mx-auto flex items-center max-sm:mx-auto gap-3 rounded-full bg-lime-600 pl-6 pr-2 py-2 text-white font-medium hover:bg-[#4c3fe0] transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b4cf5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151516]"
//         >
//           <span>Get in touch</span>
//           <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#121212]">
//             <ArrowUpRight className="h-4 w-4" />
//           </span>
//         </a>
//       </div>

//       <style>{`
//         @media (prefers-reduced-motion: reduce) {
//           .animate-ping { animation: none; }
//         }
//       `}</style>
//     </section>
//   );
// }



