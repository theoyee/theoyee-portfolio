"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type NavLink = {
  id: string;
  label: string;
  href: string;
  isIcon?: boolean;
};

const DEFAULT_NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#", isIcon: true },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact", href: "#contact" },
];


const Work_NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "/", isIcon: true },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "services", label: "Services", href: "/#services" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

const INACTIVITY_TIME = 3000;
const IDLE_WIDTH = 240;

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  const pathname = usePathname();

  const NAV_LINKS = pathname == '/' ? DEFAULT_NAV_LINKS : Work_NAV_LINKS;

  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Record<string, HTMLAnchorElement | null>>({});

  // --------------------------------------------------
  // Inactivity detection
  // --------------------------------------------------
  useEffect(() => {
    const resetInactivity = () => {
      setIsIdle(false);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => setIsIdle(true), INACTIVITY_TIME);
    };

    const activityEvents: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "pointermove",
      "touchstart",
      "scroll",
      "keydown",
    ];

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetInactivity, { passive: true })
    );
    resetInactivity();

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, resetInactivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // --------------------------------------------------
  // Scroll state (shadow / blur intensity)
  // --------------------------------------------------
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------------------------------
  // Scroll spy
  // --------------------------------------------------
  // --------------------------------------------------
  // Scroll spy
  // --------------------------------------------------
  useEffect(() => {
    const sectionLinks = NAV_LINKS.filter((l) => !l.isIcon);
    const triggers: ScrollTrigger[] = [];

    const sections = sectionLinks
      .map((l) => {
        // Safely extract just the "#id" part for the query selector (e.g., "/#projects" -> "#projects")
        const hashIndex = l.href.indexOf("#");
        const selector = hashIndex !== -1 ? l.href.substring(hashIndex) : null;

        return {
          id: l.id,
          el: selector ? document.querySelector<HTMLElement>(selector) : null
        };
      })
      .filter((s): s is { id: string; el: HTMLElement } => !!s.el);

    sections.forEach(({ id, el }) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => !isClickScrolling.current && setActiveTab(id),
          onEnterBack: () => !isClickScrolling.current && setActiveTab(id),
        })
      );
    });

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
  }, [NAV_LINKS]);

  // --------------------------------------------------
  // Active pill animation (with resize-aware re-measurement)
  // --------------------------------------------------
  const movePill = useCallback(() => {
    const pill = pillRef.current;
    const container = containerRef.current;
    if (!pill || !container) return;

    if (isIdle) {
      gsap.to(pill, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      return;
    }

    const activeLink = linksRef.current[activeTab];
    if (!activeLink) return;

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    gsap.to(pill, {
      x: linkRect.left - containerRect.left,
      y: linkRect.top - containerRect.top,
      width: linkRect.width,
      height: linkRect.height,
      opacity: 1,
      duration: 0.55,
      ease: "elastic.out(1, 0.75)",
      overwrite: "auto",
    });
  }, [activeTab, isIdle]);

  useEffect(() => {
    movePill();
  }, [movePill]);

  // Re-align the pill if the layout shifts (font load, resize, etc.)
  useEffect(() => {
    const handleResize = () => movePill();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [movePill]);

  // --------------------------------------------------
  // Navbar shell transition (pill nav <-> idle capsule)
  // --------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      width: isIdle ? IDLE_WIDTH : "auto",
      duration: 0.6,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  }, [isIdle]);

  function handleNavClick(id: string) {
    setActiveTab(id);
    isClickScrolling.current = true;
    if (clickScrollTimeout.current) clearTimeout(clickScrollTimeout.current);
    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex w-full justify-center pt-4 pb-6">
      <div
        ref={containerRef}
        className={`relative flex items-center overflow-hidden rounded-full p-1 transition-[background-color,border-color,box-shadow] duration-500 ${isScrolled
          ? "border border-white/[0.06] bg-black/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] backdrop-blur-md"
          : "border border-white/[0.08] bg-[#101210]"
          }`}
      >
        {/* Active pill indicator */}
        <div
          ref={pillRef}
          className="pointer-events-none absolute left-0 top-0 z-0 rounded-full bg-[#FFB000] opacity-0 shadow-[0_2px_10px_rgba(255,176,0,0.35)]"
          style={{ width: 0, height: 0 }}
        />

        {/* IDLE STATE — "available for hire" capsule */}
        <div
          className={`flex items-center gap-3 px-3 py-2 transition-all duration-500 ${isIdle ? "scale-100 opacity-100" : "pointer-events-none absolute scale-95 opacity-0"
            }`}
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/[0.08] bg-[#181A18] ">
            {/* <div className="bg-[#FFB000] h-8 w-8 rounded-full  " /> */}
            <img
              src="https://api.dicebear.com/10.x/micah/svg?seed=theoyee&backgroundColor=121212&radius=150"
              alt="Oyee Olagoke"
              className="h-full w-full object-cover absolute"
              draggable={true}
            />
            <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#101210] bg-[#59D9C7]" />
          </div>

          <div className="flex items-center gap-2 pr-2">
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-white/60">
              Available for hire
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#59D9C7]/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#59D9C7]" />
            </span>
          </div>
        </div>

        {/* NORMAL NAV */}
        <div
          className={`flex items-center transition-all duration-500 ${isIdle ? "pointer-events-none absolute scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeTab === link.id;

            if (link.isIcon) {
              return (
                <a
                  key={link.id}
                  href={link.href}
                  ref={(el) => {
                    linksRef.current[link.id] = el;
                  }}
                  onClick={() => handleNavClick(link.id)}
                  aria-label={link.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#FFB000]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101210] ${isActive
                    ? "scale-95 border border-black/10 bg-[#FFB000]/70 text-[#08090A] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl"
                    : "text-white/80 hover:text-[#FFB000]"
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
                ref={(el) => {
                  linksRef.current[link.id] = el;
                }}
                onClick={() => handleNavClick(link.id)}
                aria-current={isActive ? "page" : undefined}
                className={`z-10 flex h-11 shrink-0 select-none items-center justify-center rounded-full px-5 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#FFB000]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101210] ${isActive ? "font-semibold text-[#08090A]" : "text-white/80 hover:text-[#FFB000]"
                  }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}