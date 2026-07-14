/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type CursorState = "default" | "link" | "button" | "text" | "media" | "drag";

// Resolve synchronously on the client so we never render (then unrender)
// the cursor DOM on touch devices — avoids the ref-not-mounted window.
function getIsTouch() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Resolve on mount, client-only — avoids hydration mismatch while still
  // settling before the cursor DOM needs to exist.
  useEffect(() => {
    setIsTouch(getIsTouch());
    setMounted(true);
  }, []);

  const active = mounted && !isTouch;

  useGSAP(() => {
    if (!active || !dotRef.current || !ringRef.current) return;

    document.body.style.cursor = "none";

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.5, ease: "power3.out" });

    let magnetTarget: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const pullX = cx + (e.clientX - cx) * 0.3;
        const pullY = cy + (e.clientY - cy) * 0.3;
        dotX(pullX);
        dotY(pullY);
        ringX(pullX);
        ringY(pullY);
        return;
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!el) return;
      setCursorState((el.dataset.cursor as CursorState) ?? "default");
      setLabel(el.dataset.cursorLabel ?? "");
      if (el.dataset.magnetic !== undefined) magnetTarget = el;
    };

    const handleOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!el) return;
      setCursorState("default");
      setLabel("");
      magnetTarget = null;
    };

    const handleMouseDown = () => {
      gsap.to(ringRef.current, { scale: 0.85, duration: 0.2, ease: "power2.out" });
    };
    const handleMouseUp = () => {
      gsap.to(ringRef.current, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeaveWindow);
    window.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
    };
  }, [active]);

  useGSAP(() => {
    if (!active || !ringRef.current || !dotRef.current) return;

    const variants: Record<CursorState, gsap.TweenVars> = {
      default: { width: 36, height: 36, borderWidth: 1, backgroundColor: "rgba(255,255,255,0)" },
      link: { width: 64, height: 64, borderWidth: 0, backgroundColor: "rgba(255,255,255,0.1)" },
      button: { width: 80, height: 80, borderWidth: 0, backgroundColor: "rgba(163,230,53,0.15)" },
      text: { width: 4, height: 40, borderWidth: 0, backgroundColor: "rgba(255,255,255,0.6)" },
      media: { width: 96, height: 96, borderWidth: 1, backgroundColor: "rgba(0,0,0,0.2)" },
      drag: { width: 72, height: 72, borderWidth: 0, backgroundColor: "rgba(255,255,255,0.15)" },
    };

    gsap.to(ringRef.current, { ...variants[cursorState], duration: 0.4, ease: "elastic.out(1, 0.75)" });
    gsap.to(dotRef.current, {
      opacity: cursorState === "text" || cursorState === "button" ? 0 : 1,
      duration: 0.2,
    });
  }, [cursorState, active]);

  useGSAP(() => {
    if (!active || !dotRef.current || !ringRef.current) return;

    gsap.to([dotRef.current, ringRef.current], {
      opacity: isVisible ? 1 : 0,
      duration: 0.3,
    });
  }, [isVisible, active]);

  // Don't render the cursor DOM at all until we're sure it's a
  // non-touch device — refs stay null and harmless until then.
  if (!active) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-white/60 pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      >
        <span
          ref={labelRef}
          className="text-[10px] font-medium uppercase tracking-wide text-white whitespace-nowrap"
        >
          {label}
        </span>
      </div>
    </>
  );
}