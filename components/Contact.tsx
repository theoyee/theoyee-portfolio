"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { RiLinkedinLine } from "react-icons/ri";
import { VscGithubAlt, VscTwitter } from "react-icons/vsc";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const EMAIL = "oyetunjie5@gmail.com";

export default function Contact() {
  const [time, setTime] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );
      const hour = parseInt(
        new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", hour12: false }).format(now),
        10
      );
      setIsOnline(hour >= 8 && hour < 23);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 280)}px`;
  }

  const [result, setResult] = useState("");

  // --- CLIENT-SIDE FETCH TO BYPASS CLOUDFLARE ---
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setResult("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add the access key and a custom subject line
    formData.append("access_key", "316b61c5-c086-47c8-a775-eacc17063f17");
    formData.append("subject", `New Portfolio Message from ${formData.get("name")}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      } else {
        setStatus("error");
        setResult(data.message || "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setResult("Network error. Please try again or use direct email.");
    }
  }

  const [copied, setCopied] = useState(false);
  function copyEmail() {
    navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const socials = [
    { icon: <VscTwitter className="h-4 w-4" />, label: "X", href: "https://x.com/_theoyee" },
    { icon: <RiLinkedinLine className="h-4 w-4" />, label: "LinkedIn", href: "https://www.linkedin.com/in/oyetunji-olagoke/" },
    { icon: <VscGithubAlt className="h-4 w-4" />, label: "GitHub", href: "https://github.com/theoyee" },
  ];

  const channels = [
    { icon: <MessageCircle className="h-4 w-4" />, label: "WhatsApp", note: "fastest reply", href: "https://wa.me/2348064500750" },
    { icon: <Send className="h-4 w-4" />, label: "Telegram", note: "usually within a day", href: "https://t.me/oxgoh" },
    { icon: <Mail className="h-4 w-4" />, label: "Email", note: "for longer briefs", href: `mailto:${EMAIL}` },
  ];

  // scroll-in reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-badge", {
        autoAlpha: 0, y: -10, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });
      gsap.from(".contact-headline", {
        y: 30, autoAlpha: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-headline", start: "top 85%" },
      });
      gsap.from(".contact-left > *", {
        x: -24, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-left", start: "top 80%" },
      });
      gsap.from(".contact-field", {
        y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // success checkmark draw-in
  useEffect(() => {
    if (status !== "success" || !successRef.current) return;
    const ctx = gsap.context(() => {
      const circle = successRef.current!.querySelector<SVGCircleElement>(".check-circle");
      const mark = successRef.current!.querySelector<SVGPathElement>(".check-mark");
      if (!circle || !mark) return;

      const circleLen = circle.getTotalLength();
      const markLen = mark.getTotalLength();
      gsap.set(circle, { strokeDasharray: circleLen, strokeDashoffset: circleLen });
      gsap.set(mark, { strokeDasharray: markLen, strokeDashoffset: markLen });
      gsap.set(successRef.current, { autoAlpha: 0, y: 16 });

      gsap
        .timeline()
        .to(successRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(circle, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .to(mark, { strokeDashoffset: 0, duration: 0.45, ease: "power2.out" }, "-=0.15")
        .from(".success-text > *", { y: 10, autoAlpha: 0, stagger: 0.08, duration: 0.4 }, "-=0.2");
    }, successRef);
    return () => ctx.revert();
  }, [status]);

  return (
    <div ref={sectionRef} className="w-full md:bg-[#101210] px-2 py-6 rounded-4xl" id="contact">
      <div className="w-full rounded-[28px] md:bg-[#0D0F0D] md:px-10 py-10 sm:py-22">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-[#E7E5DE] text-xl font-display font-semibold leading-tight">Contact</h2>
            <p className="text-white/45 text-sm mt-1">Let{`'`}s start a conversation</p>
          </div>

          <div className="contact-badge hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 shrink-0 font-mono text-[11px] tracking-wider uppercase">
            <span className="relative flex h-1.5 w-1.5">
              {isOnline && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#59D9C7]/60" />}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isOnline === null ? "bg-white/20" : isOnline ? "bg-[#59D9C7]" : "bg-white/25"
                  }`}
              />
            </span>
            <span className="text-white/50 tabular-nums">{time ?? "--:--:--"} WAT</span>
            <span className="text-white/20">·</span>
            <span className="text-white/50">{isOnline === null ? "checking" : isOnline ? "online now" : "usually asleep"}</span>
          </div>
        </div>

        <h3 className="contact-headline mt-10 text-[#E7E5DE] text-4xl sm:text-5xl md:text-[52px] font-display font-semibold leading-[1.08] tracking-tight max-w-2xl">
          Let{`'`}s build something worth shipping.
        </h3>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-white/[0.06] pt-10">
          <div className="contact-left md:col-span-5">
            <p className="text-white/50 text-base leading-relaxed font-sans">
              Have a project in mind, or a role worth discussing? Tell me what you{`'`}re building and
              I{`'`}ll get back to you with a straight answer, not a sales pitch.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 font-mono text-sm">
                <img
                  src="https://api.dicebear.com/10.x/micah/svg?seed=theoyee&backgroundColor=121212&radius=50"
                  alt="_theoyee avatar"
                  className="h-full w-full object-cover border-double rounded-full"
                />
              </div>
              <div>
                <p className="text-[#E7E5DE] text-sm font-medium">Oyee Emmanuel</p>
                <p className="text-white/40 text-xs">Software Engineer</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#08090A] hover:border-[#FFB000] hover:bg-[#FFB000] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="mt-10 border-t border-white/[0.06]">
              {channels.map((c, i) => (
                <div key={i} className="contact-channel group flex items-center justify-between py-4 border-b border-white/[0.06] hover:border-white/20 transition-colors">
                  <a href={c.href} target="_blank" className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#FFB000] group-hover:border-[#FFB000] transition-colors shrink-0">
                      {c.icon}
                    </span>
                    <span className="text-white/80 text-sm font-medium">{c.label}</span>
                  </a>

                  {c.label === "Email" ? (
                    <button type="button" onClick={copyEmail} className="flex items-center gap-1.5 text-white/30 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors">
                      {copied ? (
                        <>
                          <svg className="h-3 w-3 text-[#59D9C7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> copy
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-white/30 text-xs font-mono uppercase tracking-wider">{c.note}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            {status === "success" ? (
              <div
                ref={successRef}
                className="h-full flex flex-col items-start justify-center rounded-2xl border border-[#59D9C7]/30 bg-[#59D9C7]/[0.06] p-8 min-h-[360px]"
              >
                <span className="h-11 w-11 rounded-full bg-[#59D9C7]/15 border border-[#59D9C7]/40 flex items-center justify-center text-[#59D9C7]">
                  <svg viewBox="0 0 52 52" className="h-6 w-6">
                    <circle className="check-circle" cx="26" cy="26" r="23" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path className="check-mark" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" />
                  </svg>
                </span>
                <div className="success-text">
                  <h4 className="mt-5 text-[#E7E5DE] text-xl font-semibold">Message sent.</h4>
                  <p className="mt-2 text-white/50 text-sm leading-relaxed max-w-sm font-sans">
                    Thanks for reaching out — I read every message myself and usually reply within a day.
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-[#59D9C7] text-sm font-medium hover:underline underline-offset-4">
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form flex flex-col gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <label className="contact-field block">
                    <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="mt-2 w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#FFB000] transition-colors"
                    />
                  </label>

                  <label className="contact-field block">
                    <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="mt-2 w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#FFB000] transition-colors"
                    />
                  </label>
                </div>

                <label className="contact-field block">
                  <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">Message</span>
                  <textarea
                    ref={textareaRef}
                    name="message"
                    required
                    rows={5}
                    onInput={autoResize}
                    placeholder="How can I help you?"
                    className="mt-2 w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder:text-white/25 text-sm leading-relaxed resize-none focus:outline-none focus:border-[#FFB000] transition-colors"
                  />
                </label>

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    {result || "Something went wrong — try again, or reach out on one of the channels to the left."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="contact-field group mt-2 flex items-center justify-center gap-2 rounded-full bg-[#FFB000] py-3.5 text-[#08090A] text-sm font-medium hover:bg-[#FFC133] transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#59D9C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0F0D]"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 -translate-y-px group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-transform" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-ping, .animate-spin { animation: none; }
        }
      `}</style>
    </div>
  );
}