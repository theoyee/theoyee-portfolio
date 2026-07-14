"use client";

import { useState, useEffect, useRef } from "react";
import { Home } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { id: "home", label: "Home", href: "#", isIcon: true },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const isClickScrolling = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Scroll-spy: sync activeTab to whichever section is in view ---
  useEffect(() => {
    const sectionLinks = NAV_LINKS.filter((l) => !l.isIcon);
    const triggers: ScrollTrigger[] = [];

    const sections = sectionLinks
      .map((l) => ({ id: l.id, el: document.querySelector<HTMLElement>(l.href) }))
      .filter((s): s is { id: string; el: HTMLElement } => !!s.el);

    sections.forEach(({ id, el }) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => !isClickScrolling.current && setActiveTab(id),
        onEnterBack: () => !isClickScrolling.current && setActiveTab(id),
      });
      triggers.push(st);
    });

    // Fall back to "home" once scrolled above the first section
    const firstSection = sections[0]?.el;
    let homeTrigger: ScrollTrigger | null = null;
    if (firstSection) {
      homeTrigger = ScrollTrigger.create({
        trigger: firstSection,
        start: "top center",
        onLeaveBack: () => !isClickScrolling.current && setActiveTab("home"),
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
      homeTrigger?.kill();
    };
  }, []);

  // --- Pill glide to active link ---
  useEffect(() => {
    const activeLink = linksRef.current[activeTab];
    const container = containerRef.current;
    const pill = pillRef.current;

    if (!activeLink || !container || !pill) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    const targetLeft = linkRect.left - containerRect.left;
    const targetTop = linkRect.top - containerRect.top;
    const targetWidth = linkRect.width;
    const targetHeight = linkRect.height;

    gsap.to(pill, {
      x: targetLeft,
      y: targetTop,
      width: targetWidth,
      height: targetHeight,
      duration: 0.45,
      ease: "power4.out",
      overwrite: "auto",
    });
  }, [activeTab]);

  function handleNavClick(id: string) {
    setActiveTab(id);
    // Suppress scroll-spy fighting the click for the duration of the smooth scroll
    isClickScrolling.current = true;
    window.clearTimeout((handleNavClick as any)._t);
    (handleNavClick as any)._t = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 w-full flex justify-center pt-4 pb-6 z-50 transition-all duration-300">
      <div
        ref={containerRef}
        className={`flex items-center relative rounded-full p-1 transition-all duration-500 overflow-hidden 
          ${isScrolled ? "backdrop-blur-md bg-black/20 border border-white/[0.06] shadow-[0_8px_32px_0_rgba(0,0,0,0.35)]" : "bg-[#101210] border border-white/[0.08]"}`}
      >
        <div
          ref={pillRef}
          className="absolute top-0 left-0 bg-[#FFB000] rounded-full pointer-events-none z-0"
          style={{ width: 0, height: 0 }}
        />

        {NAV_LINKS.map((link) => {
          const isActive = activeTab === link.id;

          if (link.isIcon) {
            return (
              <a
                key={link.id}
                href={link.href}
                ref={(el) => { linksRef.current[link.id] = el; }}
                onClick={() => handleNavClick(link.id)}
                aria-label={link.label}
                className={`flex h-11 w-11 items-center justify-center rounded-full shrink-0 z-10 transition-colors duration-300 ${isActive ? "text-[#08090A] bg-[#FFB000]/70 backdrop-blur-xl border border-black/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)] scale-95" : "text-white/80 hover:text-[#FFB000]"
                  }`}
              >
                <Home className="h-[18px] w-[18px]" />
              </a>
            );
          }

          return (
            <a
              key={link.id}
              href={link.href}
              ref={(el) => { linksRef.current[link.id] = el; }}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-medium px-5 h-11 flex items-center justify-center rounded-full z-10 shrink-0 select-none transition-colors duration-300 ${isActive ? "text-[#08090A] font-semibold" : "text-white/80 hover:text-[#FFB000]"
                }`}
            >
              {link.label}
            </a>
          );
        })}
      </div >
    </nav >
  );
}

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Home } from "lucide-react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// const NAV_LINKS = [
//   { id: "home", label: "Home", href: "#", isIcon: true },
//   { id: "projects", label: "Projects", href: "#projects" },
//   { id: "services", label: "Services", href: "#services" },
//   { id: "contact", label: "Contact", href: "#contact" },
// ];

// export default function Navbar() {
//   const [activeTab, setActiveTab] = useState("home");
//   const [isScrolled, setIsScrolled] = useState(false);
//   const isClickScrolling = useRef(false);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const pillRef = useRef<HTMLDivElement>(null);
//   const linksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // --- Scroll-spy: sync activeTab to whichever section is in view ---
//   useEffect(() => {
//     const sectionLinks = NAV_LINKS.filter((l) => !l.isIcon);
//     const triggers: ScrollTrigger[] = [];

//     const sections = sectionLinks
//       .map((l) => ({ id: l.id, el: document.querySelector<HTMLElement>(l.href) }))
//       .filter((s): s is { id: string; el: HTMLElement } => !!s.el);

//     sections.forEach(({ id, el }) => {
//       const st = ScrollTrigger.create({
//         trigger: el,
//         start: "top center",
//         end: "bottom center",
//         onEnter: () => !isClickScrolling.current && setActiveTab(id),
//         onEnterBack: () => !isClickScrolling.current && setActiveTab(id),
//       });
//       triggers.push(st);
//     });

//     // Fall back to "home" once scrolled above the first section
//     const firstSection = sections[0]?.el;
//     let homeTrigger: ScrollTrigger | null = null;
//     if (firstSection) {
//       homeTrigger = ScrollTrigger.create({
//         trigger: firstSection,
//         start: "top center",
//         onLeaveBack: () => !isClickScrolling.current && setActiveTab("home"),
//       });
//     }

//     return () => {
//       triggers.forEach((t) => t.kill());
//       homeTrigger?.kill();
//     };
//   }, []);

//   // --- Pill glide to active link ---
//   useEffect(() => {
//     const activeLink = linksRef.current[activeTab];
//     const container = containerRef.current;
//     const pill = pillRef.current;

//     if (!activeLink || !container || !pill) return;

//     const containerRect = container.getBoundingClientRect();
//     const linkRect = activeLink.getBoundingClientRect();

//     const targetLeft = linkRect.left - containerRect.left;
//     const targetTop = linkRect.top - containerRect.top;
//     const targetWidth = linkRect.width;
//     const targetHeight = linkRect.height;

//     gsap.to(pill, {
//       x: targetLeft,
//       y: targetTop,
//       width: targetWidth,
//       height: targetHeight,
//       duration: 0.45,
//       ease: "power4.out",
//       overwrite: "auto",
//     });
//   }, [activeTab]);

//   function handleNavClick(id: string) {
//     setActiveTab(id);
//     // Suppress scroll-spy fighting the click for the duration of the smooth scroll
//     isClickScrolling.current = true;
//     window.clearTimeout((handleNavClick as any)._t);
//     (handleNavClick as any)._t = window.setTimeout(() => {
//       isClickScrolling.current = false;
//     }, 800);
//   }

//   return (
//     <nav className="fixed top-0 left-0 right-0 w-full flex justify-center pt-4 pb-6 z-50 transition-all duration-300">
//       <div
//         ref={containerRef}
//         className={`flex items-center relative rounded-full p-1 transition-all duration-500 overflow-hidden 
//           ${isScrolled ? "backdrop-blur-md bg-black/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]" : "bg-[#181818] border border-transparent"}`}
//       >
//         <div
//           ref={pillRef}
//           className="absolute top-0 left-0 bg-white text-black rounded-full pointer-events-none z-0"
//           style={{ width: 0, height: 0 }}
//         />

//         {NAV_LINKS.map((link) => {
//           const isActive = activeTab === link.id;

//           if (link.isIcon) {
//             return (
//               <a
//                 key={link.id}
//                 href={link.href}
//                 ref={(el) => { linksRef.current[link.id] = el; }}
//                 onClick={() => handleNavClick(link.id)}
//                 aria-label={link.label}
//                 className={`flex h-11 w-11 items-center justify-center rounded-full shrink-0 z-10 transition-colors duration-300 ${isActive ? "text-black bg-white/60 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)] scale-95" : "text-white/80 hover:text-white"
//                   }`}
//               >
//                 <Home className="h-[18px] w-[18px]" />
//               </a>
//             );
//           }

//           return (
//             <a
//               key={link.id}
//               href={link.href}
//               ref={(el) => { linksRef.current[link.id] = el; }}
//               onClick={() => handleNavClick(link.id)}
//               className={`text-sm font-medium px-5 h-11 flex items-center justify-center rounded-full z-10 shrink-0 select-none transition-colors duration-300 ${isActive ? "text-black font-semibold" : "text-white/80 hover:text-white"
//                 }`}
//             >
//               {link.label}
//             </a>
//           );
//         })}
//       </div >
//     </nav >
//   );
// }