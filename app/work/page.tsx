"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
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
// --- end placeholder data ---

export default function Work() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(rootRef.current, { autoAlpha: 1 })
        .from(".work-badge", { y: -16, autoAlpha: 0, duration: 0.6 })
        .from(".work-word", { yPercent: 110, autoAlpha: 0, stagger: 0.045, duration: 0.9, ease: "power4.out" }, "-=0.3")
        .from(".work-desc", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.4");

      // timeline spine draws in as you scroll
      const line = lineRef.current;
      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-timeline",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        });
      }

      // each role card
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        const dot = card.querySelector(".work-dot");
        const tlCard = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
        });
        tlCard
          .from(dot, { scale: 0, autoAlpha: 0, duration: 0.4, ease: "back.out(2.5)" })
          .from(card.querySelector(".work-card-inner"), { y: 40, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
          .from(card.querySelectorAll(".work-highlight"), { x: -12, autoAlpha: 0, stagger: 0.08, duration: 0.4 }, "-=0.35")
          .from(card.querySelectorAll(".work-tag"), { scale: 0.85, autoAlpha: 0, stagger: 0.04, duration: 0.3 }, "-=0.25");
      });

      gsap.from(".work-cta", {
        y: 20, autoAlpha: 0, duration: 0.6,
        scrollTrigger: { trigger: ".work-cta", start: "top 90%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const headline = "Where I've worked and what I built.";
  const words = headline.split(" ");

  return (
    <div
      ref={rootRef}
      className="flex flex-col flex-1 items-center justify-center bg-[#121212] font-sans invisible"
    >
      <main className="min-h-full w-full max-w-[85rem] items-center justify-between py-6 sm:items-start">
        <div className="section-wrapper">


          {/* Header */}
          <div className="w-full bg-[#232322] rounded-t-4xl px-2 py-6 mt-24">
            <div className="w-full rounded-[32px] border border-white/10 bg-[#121212] p-10 sm:p-12">
              <div className="work-badge inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Briefcase className="h-3.5 w-3.5 text-lime-400" />
                <span className="text-white text-sm font-medium">Work History</span>
              </div>

              <h1 className="mt-8 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
                {words.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] pb-1">
                    <span className="work-word inline-block">{w}</span>
                  </span>
                ))}
              </h1>

              <p className="work-desc mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
                A timeline of roles, responsibilities, and the systems I helped ship along the way.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <section className="w-full px-2 py-6">
            <div className="work-timeline relative w-full rounded-[28px] bg-[#151516] border border-white/[0.06] py-10 sm:py-12 px-6 sm:px-12">
              {/* spine */}
              <svg
                className="absolute left-[34px] sm:left-[54px] top-14 bottom-14 w-px h-[calc(100%-7rem)]"
                width="2"
                preserveAspectRatio="none"
                viewBox="0 0 2 100"
                style={{ height: "calc(100% - 7rem)" }}
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
                      <div className="work-dot h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-[#1b1b1c] border border-white/10 flex items-center justify-center text-white/70 font-mono text-sm font-semibold z-10">
                        {job.logo}
                      </div>
                    </div>

                    {/* card */}
                    <div className="work-card-inner flex-1 rounded-2xl border border-white/[0.06] bg-[#1b1b1c] p-6 sm:p-8 hover:border-white/20 transition-colors">
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
                          <li key={j} className="work-highlight flex items-start gap-2.5 text-white/45 text-sm leading-relaxed">
                            <span className="mt-2 h-1 w-1 rounded-full bg-[#5b4cf5] shrink-0" />
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
            <p className="text-white/40 text-sm max-sm:text-center">Want the full picture, resume included?</p>
            <a
              href="#contact"
              className="group max-sm:mx-auto flex items-center gap-3 rounded-full bg-lime-600 pl-6 pr-2 py-2 text-white font-medium hover:bg-lime-500 transition-colors self-start sm:self-auto"
            >
              <span>Get in touch</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#121212]">
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