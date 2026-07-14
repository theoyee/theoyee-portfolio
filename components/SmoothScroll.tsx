"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // 1. The Million-Dollar Config
    // We swap the fixed 'duration' for 'lerp' (Linear Interpolation). 
    // Lerp creates a physics-based, weighted momentum that feels significantly more premium.
    const lenis = new Lenis({
      lerp: 0.08, // The sweet spot. Lower = smoother/heavier, Higher = snappier.
      wheelMultiplier: 1, // Keeps the physical scroll wheel feeling natural
      smoothWheel: true,
      touchMultiplier: 1.5, // Tightened from 2 so mobile doesn't feel out of control
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    // 2. Sync Lenis with GSAP ScrollTrigger
    // This tells ScrollTrigger to update its calculations every time Lenis moves the page.
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Hook Lenis into GSAP's Ticker
    // Instead of using standard requestAnimationFrame, we bind Lenis to GSAP's master clock.
    // This ensures perfect frame-by-frame synchronization between your scroll and your animations.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP's time is in seconds, Lenis expects milliseconds
    });

    // 4. Disable GSAP Lag Smoothing
    // Prevents GSAP from artificially adjusting time when the main thread gets busy,
    // which stops visual stuttering when scrolling rapidly.
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up cleanly to prevent memory leaks
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return null;
}