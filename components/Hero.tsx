// "use client";

// import { useEffect, useRef } from "react";
// import { ArrowDownRight, FileText, Star } from "lucide-react";
// import Link from "next/link";
// import { RiLinkedinLine } from "react-icons/ri";
// import { VscGithubAlt, VscTwitter } from "react-icons/vsc";
// import gsap from "gsap";
// import { useRouter } from "next/navigation";

// const HEADLINE = "Building Scalable Systems That Power Real Products.";

// export default function Hero() {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const words = HEADLINE.split(" ");

//   const router = useRouter();

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // draw-in: antenna line
//       const antenna = rootRef.current!.querySelector<SVGPathElement>(".draw-path");
//       if (antenna) {
//         const len = antenna.getTotalLength();
//         gsap.set(antenna, { strokeDasharray: len, strokeDashoffset: len });
//       }

//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//       tl.set(rootRef.current, { autoAlpha: 1 })
//         .from(".hero-avatar", { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: "back.out(1.7)" })
//         .from(".hero-name-line", { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, "-=0.35")
//         .from(".hero-social", { y: 10, autoAlpha: 0, stagger: 0.06, duration: 0.4 }, "-=0.3")
//         .from(".hero-availability", { scale: 0.7, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.4")
//         .to(".draw-path", { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.5")
//         .from(
//           ".hero-word",
//           { yPercent: 110, autoAlpha: 0, stagger: 0.045, duration: 0.9, ease: "power4.out" },
//           "-=0.5"
//         )
//         .from(".hero-badge", { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.3")
//         .from(".hero-desc", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.25")
//         .from(".hero-cta", { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, "-=0.3");

//       // idle loops
//       gsap.to(".wave-arm", {
//         rotation: -14,               // flipped from +14 — swings outward on the left side
//         transformOrigin: "65px 110px",
//         duration: 0.55,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         delay: 1.4,
//       });;

//       // gsap.to(".wave-arm", {
//       //   rotation: 14,
//       //   transformOrigin: "135px 110px",
//       //   duration: 0.55,
//       //   repeat: -1,
//       //   yoyo: true,
//       //   ease: "sine.inOut",
//       //   delay: 1.4,
//       // });

//       gsap.to([".flame-l-outer", ".flame-r-outer"], {
//         scaleY: 1.18,
//         transformOrigin: "bottom center",
//         duration: 0.16,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         stagger: { each: 0.08, repeat: -1, yoyo: true },
//       });
//       gsap.to([".flame-l-inner", ".flame-r-inner"], {
//         scaleY: 1.3,
//         transformOrigin: "bottom center",
//         duration: 0.12,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         stagger: { each: 0.07, repeat: -1, yoyo: true },
//       });
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={rootRef}
//       className="w-full bg-[#232322] flex items-center justify-center rounded-t-4xl px-2 py-6 mt-24 relative invisible"
//     >
//       <div className="absolute -top-12 -right-2 sm:-right-8 w-32 h-32 animate-float z-20 pointer-events-none">
//         <div className="absolute inset-0 bg-lime-400 rounded-full blur-[30px] opacity-25"></div>

//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 200 200"
//           className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative z-10 animate-pulse"
//         >
//           <rect x="40" y="80" width="120" height="60" rx="15" fill="#cbd5e1" />

//           <path className="flame-l-outer" d="M 60 140 Q 70 180 80 140 Z" fill="#fb923c" />
//           <path className="flame-l-inner" d="M 65 140 Q 70 165 75 140 Z" fill="#fef08a" />
//           <path className="flame-r-outer" d="M 120 140 Q 130 180 140 140 Z" fill="#fb923c" />
//           <path className="flame-r-inner" d="M 125 140 Q 130 165 135 140 Z" fill="#fef08a" />

//           <rect x="55" y="90" width="90" height="60" rx="25" fill="#f8fafc" />
//           <rect x="70" y="110" width="60" height="25" rx="8" fill="#e2e8f0" />

//           <circle cx="85" cy="122.5" r="5" fill="#ef4444" />
//           <circle cx="100" cy="122.5" r="5" fill="#eab308" />
//           <circle cx="115" cy="122.5" r="5" fill="#22c55e" />

//           <g className="wave-arm">
//             <path d="M 65 110 Q 25 80 50 45" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
//             <circle cx="50" cy="45" r="10" fill="#94a3b8" />
//           </g>

//           <path d="M 135 110 Q 165 130 145 145" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
//           <circle cx="145" cy="145" r="10" fill="#94a3b8" />

//           <rect x="45" y="20" width="110" height="85" rx="42.5" fill="#f8fafc" />
//           <rect x="45" y="95" width="110" height="15" rx="7.5" fill="#e2e8f0" />
//           <rect x="55" y="35" width="90" height="50" rx="25" fill="#0f172a" />
//           <path d="M 65 55 Q 100 25 135 55 A 30 30 0 0 0 65 55 Z" fill="#ffffff" opacity="0.15" />

//           <circle cx="85" cy="60" r="8" fill="#38bdf8" />
//           <circle cx="115" cy="60" r="8" fill="#38bdf8" />

//           <ellipse cx="70" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />
//           <ellipse cx="130" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />

//           <path className="draw-path" d="M 140 35 L 165 15" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
//           <circle cx="165" cy="15" r="8" fill="#f59e0b" />
//         </svg>
//         {/* <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 200 200"
//           className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative z-10"
//         >
//           <rect x="40" y="80" width="120" height="60" rx="15" fill="#cbd5e1" />

//           <path className="flame-l-outer" d="M 60 140 Q 70 180 80 140 Z" fill="#fb923c" />
//           <path className="flame-l-inner" d="M 65 140 Q 70 165 75 140 Z" fill="#fef08a" />
//           <path className="flame-r-outer" d="M 120 140 Q 130 180 140 140 Z" fill="#fb923c" />
//           <path className="flame-r-inner" d="M 125 140 Q 130 165 135 140 Z" fill="#fef08a" />

//           <rect x="55" y="90" width="90" height="60" rx="25" fill="#f8fafc" />
//           <rect x="70" y="110" width="60" height="25" rx="8" fill="#e2e8f0" />

//           <circle cx="85" cy="122.5" r="5" fill="#ef4444" />
//           <circle cx="100" cy="122.5" r="5" fill="#eab308" />
//           <circle cx="115" cy="122.5" r="5" fill="#22c55e" />


//           <path d="M 45 110 Q 35 130 55 145" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
//           <circle cx="55" cy="145" r="10" fill="#94a3b8" />


//           <g className="wave-arm">
//             <path d="M 135 110 Q 175 80 150 45" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
//             <circle cx="150" cy="45" r="10" fill="#94a3b8" />
//           </g>

//           <rect x="45" y="20" width="110" height="85" rx="42.5" fill="#f8fafc" />
//           <rect x="45" y="95" width="110" height="15" rx="7.5" fill="#e2e8f0" />
//           <rect x="55" y="35" width="90" height="50" rx="25" fill="#0f172a" />
//           <path d="M 65 55 Q 100 25 135 55 A 30 30 0 0 0 65 55 Z" fill="#ffffff" opacity="0.15" />

//           <circle cx="85" cy="60" r="8" fill="#38bdf8" />
//           <circle cx="115" cy="60" r="8" fill="#38bdf8" />

//           <ellipse cx="70" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />
//           <ellipse cx="130" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />

//           <path className="draw-path" d="M 140 35 L 165 15" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
//           <circle cx="165" cy="15" r="8" fill="#f59e0b" />
//         </svg> */}
//       </div>

//       <div className="w-full rounded-[32px] border border-white/10 bg-[#121212] p-10 sm:p-12 relative">
//         <div
//           className="absolute inset-0 opacity-[0.03] pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
//             backgroundSize: "50px 50px",
//           }}
//         />
//         <div className="flex items-start justify-between relative ">

//           <div className="flex items-center gap-4 flex-1">
//             <div className="hero-avatar h-16 w-16 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
//               <img
//                 src="https://api.dicebear.com/10.x/micah/svg?seed=theoyee&backgroundColor=121212&radius=50"
//                 alt="_theoyee avatar"
//                 className="h-full w-full object-cover border-double"
//               />
//             </div>
//             <div>
//               <h2 className="hero-name-line text-white text-xl font-semibold leading-tight">_theoyee</h2>
//               <p className="hero-name-line text-white/50 text-sm mt-0.5">Software Engineer</p>
//               <div className="flex items-center gap-3 mt-3 max-sm:mt-1">
//                 <a href="https://x.com/_theoyee" aria-label="X (Twitter)" className="hero-social text-white/50 hover:text-white transition-colors">
//                   <VscTwitter className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
//                 </a>
//                 <a href="https://www.linkedin.com/in/oyetunji-olagoke/" aria-label="LinkedIn" className="hero-social text-white/50 hover:text-white transition-colors">
//                   <RiLinkedinLine className="h-[20px] w-[20px]" fill="currentColor" strokeWidth={0} />
//                 </a>
//                 <a href="https://github.com/theoyee" aria-label="GitHub" className="hero-social text-white/50 hover:text-white transition-colors">
//                   <VscGithubAlt className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="hero-availability hidden sm:flex items-center gap-2 shrink-0">
//             <div className="relative flex h-2.5 w-2.5">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
//               <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_8px_2px_rgba(163,230,53,0.6)]" />
//             </div>
//             <span className="text-white/60 text-sm leading-snug text-right">
//               Available
//               <br />
//               for work
//             </span>
//           </div>
//         </div>

//         <h1 className="mt-10 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
//           {words.map((w, i) => (
//             <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
//               <span className="hero-word inline-block">{w}</span>
//             </span>
//           ))}
//         </h1>

//         <div className="hero-badge mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
//           <div className="flex items-center gap-0.5 text-amber-400">
//             {Array.from({ length: 3 }).map((_, i) => (
//               <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
//             ))}
//           </div>
//           <span className="text-white text-sm font-medium">Full-Stack &amp; Systems Architecture</span>
//         </div>

//         <p className="hero-desc mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
//           I build deliberate world-class software. I enjoy creating innovative solutions and
//           tackling complex challenges.
//         </p>

//         <div className="mt-9 flex items-center gap-3 max-ms:justify-center">
//           <Link
//             href={"#contact"}
//             className="hero-cta group flex items-center gap-3 rounded-full bg-lime-700 [#5b4cf5] pl-6 pr-2 py-2 text-white font-medium hover:bg-lime-600 transition-colors"
//           >
//             <span>Get started</span>
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
//               <ArrowDownRight className="h-4 w-4" />
//             </span>
//           </Link>

//           <button
//             onClick={() => router.push("/work")}
//             className="hero-cta rounded-full bg-white/10 px-6 py-3.5 text-white font-medium hover:bg-white/15 transition-colors max-md:hidden"
//           >
//             My work
//           </button>

//           <Link
//             href="https://drive.google.com/file/d/1cy5yZDp8fMaa4XCj4dMbbXkGp7gZLcPn/view?usp=sharing"
//             aria-label="Resume"
//             className="hero-cta flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors"
//           >
//             <FileText className="h-[18px] w-[18px]" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { ArrowDownRight, FileText, Star } from "lucide-react";
import Link from "next/link";
import { RiLinkedinLine } from "react-icons/ri";
import { VscGithubAlt, VscTwitter } from "react-icons/vsc";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const HEADLINE = "Building Scalable Systems That Power Real Products.";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const words = HEADLINE.split(" ");

  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // draw-in: antenna line
      const antenna = rootRef.current!.querySelector<SVGPathElement>(".draw-path");
      if (antenna) {
        const len = antenna.getTotalLength();
        gsap.set(antenna, { strokeDasharray: len, strokeDashoffset: len });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(rootRef.current, { autoAlpha: 1 })
        .from(".hero-avatar", { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: "back.out(1.7)" })
        .from(".hero-name-line", { y: 14, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, "-=0.35")
        .from(".hero-social", { y: 10, autoAlpha: 0, stagger: 0.06, duration: 0.4 }, "-=0.3")
        .from(".hero-availability", { scale: 0.7, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.4")
        .to(".draw-path", { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.5")
        .from(
          ".hero-word",
          { yPercent: 110, autoAlpha: 0, stagger: 0.045, duration: 0.9, ease: "power4.out" },
          "-=0.5"
        )
        .from(".hero-badge", { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.3")
        .from(".hero-desc", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.25")
        .from(".hero-cta", { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, "-=0.3");

      // idle loops
      gsap.to(".wave-arm", {
        rotation: -14, // flipped from +14 — swings outward on the left side
        transformOrigin: "65px 110px",
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.4,
      });

      gsap.to([".flame-l-outer", ".flame-r-outer"], {
        scaleY: 1.18,
        transformOrigin: "bottom center",
        duration: 0.16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.08, repeat: -1, yoyo: true },
      });
      gsap.to([".flame-l-inner", ".flame-r-inner"], {
        scaleY: 1.3,
        transformOrigin: "bottom center",
        duration: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.07, repeat: -1, yoyo: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full bg-[#101210] flex items-center justify-center rounded-t-4xl px-2 py-6 mt-24 relative invisible"
    >
      <div className="absolute -top-12 -right-2 sm:-right-8 w-32 h-32 animate-float z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[#FFB000] rounded-full blur-[30px] opacity-20"></div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] relative z-10 animate-pulse"
        >
          <rect x="40" y="80" width="120" height="60" rx="15" fill="#cbd5e1" />

          <path className="flame-l-outer" d="M 60 140 Q 70 180 80 140 Z" fill="#fb923c" />
          <path className="flame-l-inner" d="M 65 140 Q 70 165 75 140 Z" fill="#fef08a" />
          <path className="flame-r-outer" d="M 120 140 Q 130 180 140 140 Z" fill="#fb923c" />
          <path className="flame-r-inner" d="M 125 140 Q 130 165 135 140 Z" fill="#fef08a" />

          <rect x="55" y="90" width="90" height="60" rx="25" fill="#f8fafc" />
          <rect x="70" y="110" width="60" height="25" rx="8" fill="#e2e8f0" />

          <circle cx="85" cy="122.5" r="5" fill="#ef4444" />
          <circle cx="100" cy="122.5" r="5" fill="#eab308" />
          <circle cx="115" cy="122.5" r="5" fill="#22c55e" />

          <g className="wave-arm">
            <path d="M 65 110 Q 25 80 50 45" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
            <circle cx="50" cy="45" r="10" fill="#94a3b8" />
          </g>

          <path d="M 135 110 Q 165 130 145 145" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
          <circle cx="145" cy="145" r="10" fill="#94a3b8" />

          <rect x="45" y="20" width="110" height="85" rx="42.5" fill="#f8fafc" />
          <rect x="45" y="95" width="110" height="15" rx="7.5" fill="#e2e8f0" />
          <rect x="55" y="35" width="90" height="50" rx="25" fill="#0f172a" />
          <path d="M 65 55 Q 100 25 135 55 A 30 30 0 0 0 65 55 Z" fill="#ffffff" opacity="0.15" />

          <circle cx="85" cy="60" r="8" fill="#59D9C7" />
          <circle cx="115" cy="60" r="8" fill="#59D9C7" />

          <ellipse cx="70" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />
          <ellipse cx="130" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />

          <path className="draw-path" d="M 140 35 L 165 15" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="165" cy="15" r="8" fill="#FFB000" />
        </svg>
      </div>

      <div className="w-full rounded-[32px] border border-white/10 bg-[#0A0B0A] p-10 sm:p-12 relative">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,176,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,176,0,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="flex items-start justify-between relative ">
          <div className="flex items-center gap-4 flex-1">
            <div className="hero-avatar h-16 w-16 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="https://api.dicebear.com/10.x/micah/svg?seed=theoyee&backgroundColor=121212&radius=50"
                alt="_theoyee avatar"
                className="h-full w-full object-cover border-double"
              />
            </div>
            <div>
              <h2 className="hero-name-line text-[#E7E5DE] text-xl font-display font-semibold leading-tight">
                _theoyee
              </h2>
              <p className="hero-name-line text-white/50 text-sm mt-0.5 font-mono">software_engineer</p>
              <div className="flex items-center gap-3 mt-3 max-sm:mt-1">
                <a href="https://x.com/_theoyee" aria-label="X (Twitter)" className="hero-social text-white/50 hover:text-[#FFB000] transition-colors">
                  <VscTwitter className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
                </a>
                <a href="https://www.linkedin.com/in/oyetunji-olagoke/" aria-label="LinkedIn" className="hero-social text-white/50 hover:text-[#FFB000] transition-colors">
                  <RiLinkedinLine className="h-[20px] w-[20px]" fill="currentColor" strokeWidth={0} />
                </a>
                <a href="https://github.com/theoyee" aria-label="GitHub" className="hero-social text-white/50 hover:text-[#FFB000] transition-colors">
                  <VscGithubAlt className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
                </a>
              </div>
            </div>
          </div>

          <div className="hero-availability hidden sm:flex items-center gap-2 shrink-0">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#59D9C7] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#59D9C7] shadow-[0_0_8px_2px_rgba(89,217,199,0.5)]" />
            </div>
            <span className="text-white/60 text-sm leading-snug text-right font-mono">
              available
              <br />
              for work
            </span>
          </div>
        </div>

        <h1 className="mt-10 text-[#E7E5DE] text-4xl sm:text-5xl md:text-[52px] font-display font-semibold leading-[1.08] tracking-tight max-w-2xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
              <span className="hero-word inline-block">{w}</span>
            </span>
          ))}
        </h1>

        <div className="hero-badge mt-7 inline-flex items-center gap-2 rounded-full border border-[#FFB000]/20 bg-[#FFB000]/[0.06] px-4 py-2">
          <div className="flex items-center gap-0.5 text-[#FFB000]">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-[#E7E5DE] text-sm font-medium">Full-Stack &amp; Systems Architecture</span>
        </div>

        <p className="hero-desc mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl font-sans">
          I build deliberate world-class software. I enjoy creating innovative solutions and
          tackling complex challenges.
        </p>

        <div className="mt-9 flex items-center gap-3 max-ms:justify-center">
          <Link
            href={"#contact"}
            className="hero-cta group flex items-center gap-3 rounded-full bg-[#FFB000] pl-6 pr-2 py-2 text-[#08090A] font-medium hover:bg-[#FFC133] transition-colors"
          >
            <span>Get started</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-[#08090A] text-[#FFB000]">
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </Link>

          <button
            onClick={() => router.push("/work")}
            className="hero-cta rounded-full bg-white/10 px-6 py-3.5 text-white font-medium hover:bg-white/15 transition-colors max-md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#59D9C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B0A]"
          >
            My work
          </button>

          <Link
            href="https://drive.google.com/file/d/1cy5yZDp8fMaa4XCj4dMbbXkGp7gZLcPn/view?usp=sharing"
            aria-label="Resume"
            target="_blank"
            className="hero-cta flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#59D9C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B0A]"
          >
            <FileText className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}