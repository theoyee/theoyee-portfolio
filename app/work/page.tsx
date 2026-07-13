"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Briefcase, MapPin, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// --- Replace with your real work history ---
const WORK_HISTORY = [
  {
    company: "Company Name",
    logo: "CN",
    role: "Senior Software Engineer",
    period: "2024 — Present",
    location: "Remote",
    status: "current",
    desc: "Led development of core platform features, owning the full stack from database schema to shipped UI. Worked closely with product to turn ambiguous requirements into stable releases.",
    highlights: [
      "Rebuilt the primary dashboard, cutting load time significantly",
      "Introduced a shared component system adopted across three product teams",
      "Mentored two junior engineers through their first production releases",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
  },
  {
    company: "Previous Company",
    logo: "PC",
    role: "Full-Stack Developer",
    period: "2022 — 2024",
    location: "Remote",
    status: "past",
    desc: "Built and maintained customer-facing web applications, working across the entire stack from API design to frontend polish.",
    highlights: [
      "Shipped a real-time notification system used by all active users",
      "Migrated legacy REST endpoints to a typed API layer",
      "Reduced production incidents through improved test coverage",
    ],
    tags: ["React", "Express", "MongoDB", "Docker"],
  },
  {
    company: "Earlier Company",
    logo: "EC",
    role: "Junior Developer",
    period: "2021 — 2022",
    location: "On-site",
    status: "past",
    desc: "Started as a junior developer, contributing to internal tools and learning production engineering practices on a small team.",
    highlights: [
      "Built internal admin tooling that replaced manual spreadsheet workflows",
      "Fixed bugs across the codebase while ramping up on the stack",
    ],
    tags: ["JavaScript", "Vue", "Firebase"],
  },
];

// --- Replace with your real stats ---
const STATS = [
  { value: 3, suffix: "+", label: "Years experience" },
  { value: WORK_HISTORY.length, suffix: "", label: "Companies" },
  { value: 12, suffix: "+", label: "Projects shipped" },
];
// --- end placeholder data ---

export default function Work() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Intro sequence ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(rootRef.current, { autoAlpha: 1 })
        .from(".work-badge", { y: -16, autoAlpha: 0, duration: 0.6 })
        .from(
          ".work-word",
          { yPercent: 110, autoAlpha: 0, stagger: 0.045, duration: 0.9, ease: "power4.out" },
          "-=0.3"
        )
        .from(".work-desc", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.4")
        .from(".work-stat", { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, "-=0.3");

      // --- Stat counters ---
      gsap.utils.toArray<HTMLElement>(".work-stat-number").forEach((el) => {
        const target = parseFloat(el.dataset.value || "0");
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val).toString();
          },
        });
      });

      // --- Timeline spine draws in as you scroll ---
      const line = lineRef.current;
      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-timeline",
            start: "top 75%",
            end: "bottom 85%",
            scrub: 0.6,
          },
        });
      }

      // --- Each role card ---
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        const dot = card.querySelector(".work-dot");
        const dotPulse = card.querySelector(".work-dot-pulse");
        const tlCard = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
        });
        tlCard
          .from(dot, { scale: 0, autoAlpha: 0, duration: 0.45, ease: "back.out(2.5)" })
          .to(dotPulse, { autoAlpha: 1, duration: 0.3 }, "-=0.1")
          .from(
            card.querySelector(".work-card-inner"),
            { y: 44, autoAlpha: 0, duration: 0.75, ease: "power3.out" },
            "-=0.25"
          )
          .from(
            card.querySelectorAll(".work-highlight"),
            { x: -14, autoAlpha: 0, stagger: 0.08, duration: 0.4 },
            "-=0.35"
          )
          .from(
            card.querySelectorAll(".work-tag"),
            { scale: 0.85, autoAlpha: 0, stagger: 0.04, duration: 0.3 },
            "-=0.25"
          );

        // subtle lift on hover
        const inner = card.querySelector<HTMLElement>(".work-card-inner");
        if (inner) {
          const enter = () =>
            gsap.to(inner, { y: -4, duration: 0.35, ease: "power2.out" });
          const leave = () =>
            gsap.to(inner, { y: 0, duration: 0.45, ease: "power3.out" });
          inner.addEventListener("mouseenter", enter);
          inner.addEventListener("mouseleave", leave);
        }
      });

      gsap.from(".work-cta", {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        scrollTrigger: { trigger: ".work-cta", start: "top 92%" },
      });

      // --- Background glow parallax ---
      gsap.to(".work-glow", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const headline = "Where I've worked and what I built.";
  const words = headline.split(" ");

  return (
    <div
      ref={rootRef}
      className="flex flex-col flex-1 items-center justify-center bg-[#121212] font-sans invisible relative overflow-hidden"
    >
      {/* ambient glow */}
      <div className="work-glow pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#5b4cf5]/10 blur-[120px]" />

      <main className="min-h-full w-full max-w-[85rem] items-center justify-between py-6 sm:items-start relative">
        <div className="section-wrapper">
          <Navbar />

          {/* Header */}
          <div className="w-full bg-[#232322] rounded-4xl px-2 py-6 mt-24">
            <div className="w-full rounded-[32px] border border-white/10 bg-[#121212] p-10 sm:p-12 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="work-badge relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Briefcase className="h-3.5 w-3.5 text-lime-400" />
                <span className="text-white text-sm font-medium">Work History</span>
              </div>

              <h1 className="relative mt-8 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
                {words.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
                    <span className="work-word inline-block">{w}</span>
                  </span>
                ))}
              </h1>

              <p className="work-desc relative mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
                A timeline of roles, responsibilities, and the systems I helped ship along the way.
              </p>

              {/* Stats row */}
              <div className="relative mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg border-t border-white/[0.06] pt-8">
                {STATS.map((stat, i) => (
                  <div key={i} className="work-stat">
                    <div className="flex items-baseline gap-0.5">
                      <span
                        className="work-stat-number text-white text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums"
                        data-value={stat.value}
                      >
                        0
                      </span>
                      <span className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="mt-1 text-white/40 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <section className="w-full px-2 py-6">
            <div className="work-timeline relative w-full rounded-[28px] bg-[#151516] border border-white/[0.06] py-10 sm:py-12 px-6 sm:px-12 overflow-hidden">
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
                  stroke="#5b4cf5"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="flex flex-col gap-10 sm:gap-14">
                {WORK_HISTORY.map((job, i) => (
                  <div key={i} className="work-card relative flex gap-6 sm:gap-10">
                    {/* dot + logo */}
                    <div className="relative shrink-0 flex flex-col items-center">
                      <div
                        className={`work-dot relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl flex items-center justify-center font-mono text-sm font-semibold z-10 border ${job.status === "current"
                          ? "bg-[#5b4cf5]/10 border-[#5b4cf5]/40 text-[#5b4cf5]"
                          : "bg-[#1b1b1c] border-white/10 text-white/70"
                          }`}
                      >
                        {job.status === "current" && (
                          <span className="work-dot-pulse opacity-0 absolute inset-0 rounded-2xl bg-[#5b4cf5]/20 animate-pulse" />
                        )}
                        <span className="relative">{job.logo}</span>
                      </div>
                    </div>

                    {/* card */}
                    <div
                      className={`work-card-inner flex-1 rounded-2xl border p-6 sm:p-8 transition-colors ${job.status === "current"
                        ? "border-[#5b4cf5]/30 bg-gradient-to-br from-[#5b4cf5]/[0.07] to-[#1b1b1c] hover:border-[#5b4cf5]/50"
                        : "border-white/[0.06] bg-[#1b1b1c] hover:border-white/20"
                        }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h3 className="text-white text-xl font-semibold">{job.role}</h3>
                            {job.status === "current" && (
                              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border text-lime-400 border-lime-400/30 bg-lime-400/10">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400/60" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
                                </span>
                                current
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-white/60 text-sm font-medium">{job.company}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-white/40 text-xs font-mono uppercase tracking-wider">{job.period}</p>
                          <p className="mt-1 flex items-center gap-1 text-white/30 text-xs justify-end">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-white/50 text-sm sm:text-base leading-relaxed">{job.desc}</p>

                      <ul className="mt-5 flex flex-col gap-2">
                        {job.highlights.map((h, j) => (
                          <li
                            key={j}
                            className="work-highlight flex items-start gap-2.5 text-white/45 text-sm leading-relaxed"
                          >
                            <span
                              className={`mt-2 h-1 w-1 rounded-full shrink-0 ${job.status === "current" ? "bg-lime-400" : "bg-[#5b4cf5]"
                                }`}
                            />
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
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="work-cta w-full px-2 pb-6 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-white/40 text-sm max-sm:text-center flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="h-3.5 w-3.5 text-lime-400 shrink-0" />
              Want the full picture, resume included?
            </p>
            <a
              href="#contact"
              className="group max-sm:mx-auto flex items-center gap-3 rounded-full bg-lime-600 pl-6 pr-2 py-2 text-white font-medium hover:bg-lime-500 transition-colors self-start sm:self-auto"
            >
              <span>Get in touch</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </main >
      <Footer />
    </div >
  );
}