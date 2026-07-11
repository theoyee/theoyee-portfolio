"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  // Track the actual mouse coordinates
  const mouse = useRef({ x: 0, y: 0 });
  // Track the delayed coordinates of the outer circle
  const circle = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide the default browser cursor globally
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Make the inner dot follow instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop for the lagging outer circle
    let animationFrameId: number;

    const animate = () => {
      // Lerp formula: current + (target - current) * easingFactor
      // 0.15 controls the smoothness. Lower = slower trail, Higher = tighter follow.
      circle.current.x += (mouse.current.x - circle.current.x) * 0.15;
      circle.current.y += (mouse.current.y - circle.current.y) * 0.15;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${circle.current.x}px, ${circle.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Tiny Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Lagging Outer Circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/60 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-75 ease-out"
      />
    </>
  );
}