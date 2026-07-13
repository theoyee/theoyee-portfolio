"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Film, Gauge } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const secondary = [
    {
      num: "03",
      title: "ShortForgeEngine",
      desc: "Video generation pipeline turning scripts into rendered shorts — queued jobs, containerized workers, automated FFmpeg rendering.",
      tags: ["BullMQ", "Redis", "FFmpeg", "Docker"],
      status: "live",
      href: "#",
    },
    {
      num: "04",
      title: "JobTrackr",
      desc: "AI-assisted job application tracker that parses postings, tracks pipeline stages, and drafts follow-ups.",
      tags: ["Prisma", "PostgreSQL", "NextAuth", "Anthropic API"],
      status: "building",
      href: "#",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-badge", {
        autoAlpha: 0, y: -10, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".proj-headline", {
        y: 30, autoAlpha: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-headline", start: "top 85%" },
      });

      gsap.from(".proj-desc", {
        y: 18, autoAlpha: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-desc", start: "top 88%" },
      });

      // featured cards
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
        });
        tl.from(card, { y: 60, autoAlpha: 0, duration: 0.9, ease: "power3.out" })
          .from(card.querySelectorAll(".proj-card-meta > *"), { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.5 }, "-=0.4")
          .from(card.querySelectorAll(".proj-tag"), { scale: 0.85, autoAlpha: 0, stagger: 0.04, duration: 0.35 }, "-=0.3");
      });

      // sparkline draw-in
      gsap.utils.toArray<SVGPathElement>(".proj-sparkline").forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: path, start: "top 80%" },
        });
      });

      // directory rows
      gsap.from(".proj-row", {
        x: -28, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".proj-directory", start: "top 85%" },
      });

      gsap.from(".proj-cta", {
        y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".proj-cta", start: "top 92%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-2 py-6">


      <div className="w-full rounded-[28px] boder borderwhite/[0.06] bg[#1b1b1c] py-10 sm:py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-white text-xl font-semibold leading-tight">Projects</h2>
            <p className="text-white/45 text-sm mt-1">Selected work</p>
          </div>

          <div className="proj-badge hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5b4cf5]/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5b4cf5]" />
            </span>
            <span className="text-white/50 text-[11px] font-mono tracking-wider uppercase">
              2 live · 1 building
            </span>
          </div>
        </div>

        <h3 className="proj-headline mt-10 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
          Things I{`'`}ve built and shipped.
        </h3>
        <p className="proj-desc mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl">
          Each one solved a real constraint — real-time data, recommendation quality, render
          throughput. No todo apps.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/[0.06] pt-10">
          <Link
            href="https://zentra-degen.vercel.app/"
            target="_blank"
            className="proj-card group rounded-2xl border border-white/[0.06] bg-[#151516] overflow-hidden hover:border-white/20 transition-colors flex flex-col">
            <div className="relative h-52 bg-[#0c0c0d] overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(245,166,35,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.15) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <svg viewBox="0 0 400 120" className="absolute bottom-0 left-0 w-full h-24 opacity-80" preserveAspectRatio="none">
                <polyline
                  className="proj-sparkline"
                  points="0,90 40,70 80,80 120,40 160,55 200,20 240,35 280,15 320,45 360,25 400,10"
                  fill="none"
                  stroke="#f5a623"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5a623] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">live</span>
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[11px] text-[#f5a623]/70">$DEGEN +182.4%</div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="proj-card-meta flex items-start justify-between gap-3">
                <h4 className="text-white text-xl font-semibold">Zentra Degen Scanner</h4>
                <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
              <p className="proj-card-meta mt-2 text-white/50 text-sm leading-relaxed flex-1">
                A Bloomberg-terminal-style scanner for Solana meme coins — live ticker feed, risk
                scoring, and a token detail view built for split-second reads.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Solana", "WebSockets", "Ai"].map((t, i) => (
                  <span key={i} className="proj-tag text-[11px] font-mono uppercase tracking-wider text-white/40 border border-white/[0.08] rounded-full px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          <Link
            href="https://reelwise-three.vercel.app/"
            target="_blank"
            className="proj-card group rounded-2xl border border-white/[0.06] bg-[#151516] overflow-hidden hover:border-white/20 transition-colors flex flex-col"
          >
            <div className="relative h-52 bg-gradient-to-br from-[#2a2420] to-[#1c1815] overflow-hidden flex items-center justify-center">
              <span className="font-serif text-[120px] leading-none text-[#e8c07d]/10 select-none" aria-hidden>
                R
              </span>
              <div className="absolute inset-x-6 bottom-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-4">
                <p className="font-serif text-white/80 text-sm italic">{`"`}Uncannily accurate.{`"`}</p>
                <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-white/30">recommended for you</p>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e8c07d] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">live</span>
              </div>
              <Film className="absolute bottom-4 right-4 h-4 w-4 text-[#e8c07d]/50" />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="proj-card-meta flex items-start justify-between gap-3">
                <h4 className="text-white text-xl font-semibold">Reelwise</h4>
                <ArrowUpRight className="h-5 w-5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>
              <p className="proj-card-meta mt-2 text-white/50 text-sm leading-relaxed flex-1">
                An AI movie recommendation app with taste-modeling that actually improves with
                use, wrapped in an editorial, cinema-inspired interface.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js", "LangChain", "OpenAI", "Gemini Ai"].map((t, i) => (
                  <span key={i} className="proj-tag text-[11px] font-mono uppercase tracking-wider text-white/40 border border-white/[0.08] rounded-full px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </div>

        <div className="proj-directory mt-6 border-t border-white/[0.06]">
          {secondary.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="proj-row group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-white/[0.06] py-7 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-white/20 font-mono text-sm font-semibold w-8 shrink-0">{p.num}</span>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-white text-lg font-medium">{p.title}</h4>
                  <span
                    className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${p.status === "live"
                      ? "text-[#5b4cf5] border-[#5b4cf5]/30 bg-[#5b4cf5]/10"
                      : "text-white/40 border-white/10"
                      }`}
                  >
                    <Gauge className="h-3 w-3" />
                    {p.status === "live" ? "live" : "building"}
                  </span>
                </div>
                <p className="mt-1.5 text-white/45 text-sm leading-relaxed max-w-xl">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="text-[11px] font-mono uppercase tracking-wider text-white/35 border border-white/[0.08] rounded-full px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 group-hover:text-white group-hover:border-[#5b4cf5] group-hover:bg-[#5b4cf5]/10 transition-colors shrink-0 self-start sm:self-center">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div >

        <div className="proj-cta mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-white/40 text-sm max-sm:text-center">More in progress than what{`'`}s shown here.</p>
          <Link
            href="https://github.com/theoyee"
            target="_blank"
            className="group max-sm:mx-auto flex items-center gap-3 rounded-full bg-white/[0.08] pl-6 pr-2 py-2 text-white font-medium hover:bg-[#5b4cf5] transition-colors self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b4cf5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1b1c]"
          >
            <span>View GitHub</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#151516] group-hover:bg-[#1b1b1c] transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div >
      </div >

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-ping, .animate-pulse { animation: none; }
        }
      `}</style>
    </section >
  );
}