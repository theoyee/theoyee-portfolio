"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Loader2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";

import { RiLinkedinLine } from "react-icons/ri";
import { VscGithubAlt, VscTwitter } from "react-icons/vsc";


const EMAIL = "hello@example.com";

export default function Contact() {
  // --- live local-time / availability indicator ---
  const [time, setTime] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

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
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          hour12: false,
        }).format(now),
        10
      );
      setIsOnline(hour >= 8 && hour < 23);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // --- form state machine ---
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 280)}px`;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      // wire this up to your API route / email service of choice
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      form.reset();
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    } catch {
      setStatus("error");
    }
  }

  const [copied, setCopied] = useState(false);
  function copyEmail() {
    navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const socials = [
    { icon: <VscTwitter className="h-4 w-4" />, label: "X", href: "#" },
    { icon: <RiLinkedinLine className="h-4 w-4" />, label: "LinkedIn", href: "#" },
    { icon: <VscGithubAlt className="h-4 w-4" />, label: "GitHub", href: "#" },
  ];

  const channels = [
    { icon: <MessageCircle className="h-4 w-4" />, label: "WhatsApp", note: "fastest reply", href: "#" },
    { icon: <Send className="h-4 w-4" />, label: "Telegram", note: "usually within a day", href: "#" },
    { icon: <Mail className="h-4 w-4" />, label: "Email", note: "for longer briefs", href: `mailto:${EMAIL}` },
  ];

  return (
    <div className=" w-full md:not-even:bg-[#151516] px-2 py-6 rounded-4xl" id="contact">
      <div className="w-full rounded-[28px]  md:bg-[#1b1b1c] md:px-10 py-10 sm:py-22">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-white text-xl font-semibold leading-tight">Contact</h2>
            <p className="text-white/45 text-sm mt-1">Let{`'`}s start a conversation</p>
          </div>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 shrink-0 font-mono text-[11px] tracking-wider uppercase">
            <span className="relative flex h-1.5 w-1.5">
              {isOnline && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5b4cf5]/60" />
              )}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isOnline === null ? "bg-white/20" : isOnline ? "bg-[#5b4cf5]" : "bg-white/25"
                  }`}
              />
            </span>
            <span className="text-white/50 tabular-nums">
              {time ?? "--:--:--"} WAT
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/50">
              {isOnline === null ? "checking" : isOnline ? "online now" : "usually asleep"}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="mt-10 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
          Let{`'`}s build something worth shipping.
        </h3>

        {/* Two column body */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-white/[0.06] pt-10">
          {/* Left: intro + profile + channels */}
          <div className="md:col-span-5">
            <p className="text-white/50 text-base leading-relaxed">
              Have a project in mind, or a role worth discussing? Tell me what you{`'`}re building and
              I{`'`}ll get back to you with a straight answer, not a sales pitch.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 font-mono text-sm">
                OE
              </div>
              <div>
                <p className="text-white text-sm font-medium">Oyee Emmanuel</p>
                <p className="text-white/40 text-xs">Software Engineer</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white hover:border-[#5b4cf5] hover:bg-[#5b4cf5]/10 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* direct channels */}
            <div className="mt-10 border-t border-white/[0.06]">
              {channels.map((c, i) => (
                <div
                  key={i}
                  className="group flex items-center justify-between py-4 border-b border-white/[0.06] hover:border-white/20 transition-colors"
                >
                  <a href={c.href} className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#5b4cf5] group-hover:border-[#5b4cf5] transition-colors shrink-0">
                      {c.icon}
                    </span>
                    <span className="text-white/80 text-sm font-medium">{c.label}</span>
                  </a>

                  {c.label === "Email" ? (
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="flex items-center gap-1.5 text-white/30 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-[#5b4cf5]" /> copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> copy
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-white/30 text-xs font-mono uppercase tracking-wider">
                      {c.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-7">
            {status === "success" ? (
              <div className="h-full flex flex-col items-start justify-center rounded-2xl border border-[#5b4cf5]/30 bg-[#5b4cf5]/[0.06] p-8 min-h-[360px]">
                <span className="h-11 w-11 rounded-full bg-[#5b4cf5]/15 border border-[#5b4cf5]/40 flex items-center justify-center text-[#5b4cf5]">
                  <Check className="h-5 w-5" />
                </span>
                <h4 className="mt-5 text-white text-xl font-semibold">Message sent.</h4>
                <p className="mt-2 text-white/50 text-sm leading-relaxed max-w-sm">
                  Thanks for reaching out — I read every message myself and usually reply within a
                  day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-[#5b4cf5] text-sm font-medium hover:underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <label className="block">
                    <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="mt-2 w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#5b4cf5] transition-colors"
                    />
                  </label>

                  <label className="block">
                    <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="mt-2 w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#5b4cf5] transition-colors"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">
                    Message
                  </span>
                  <textarea
                    ref={textareaRef}
                    name="message"
                    required
                    rows={5}
                    onInput={autoResize}
                    placeholder="How can I help you?"
                    className="mt-2 w-full bg-transparent border-b border-white/15 pb-3 text-white placeholder:text-white/25 text-sm leading-relaxed resize-none focus:outline-none focus:border-[#5b4cf5] transition-colors"
                  />
                </label>

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Something went wrong — try again, or reach out on one of the channels to the
                    left.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-2 flex items-center justify-center gap-2 rounded-full   bg-gradient-to-br from-[#5B4CF5] via-[#232322] [#5145EA] to-lime-400 bg[#5b4cf5] py-3.5 text-white text-sm font-medium hover:bg-[#4c3fe0] transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5b4cf5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1b1c]"
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