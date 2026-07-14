"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

interface BackgroundGlowProps {
  colorFrom?: string;
  colorMid?: string;
  blur?: number;
  className?: string;
}

export default function BackgroundGlow({
  colorFrom = "rgba(255,176,0,.22)",
  colorMid = "rgba(89,217,199,.14)",
  blur = 120,
  className = "",
}: BackgroundGlowProps) {
  const glow = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          fullMotion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { reduceMotion } = ctx.conditions as { reduceMotion: boolean };

          if (reduceMotion) {
            gsap.set(glow.current, { opacity: 0.3 });
            return;
          }

          const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });

          tl.to(glow.current, {
            x: 80,
            y: 30,
            scale: 1.2,
            rotation: 8,
            duration: 8,
          }).to(
            glow.current,
            { opacity: 0.4, duration: 6 },
            0
          );
        }
      );

      return () => mm.revert();
    },
    { scope: glow }
  );

  return (
    // <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div
      ref={glow}
      aria-hidden="true"
      className={`absolute left-1/2 -top-40 -translate-x-1/2 h-[600px] w-full rounded-full will-change-transform ${className}`}
      style={{
        filter: `blur(${blur}px)`,
        background: `radial-gradient(circle at center, ${colorFrom} 0%, ${colorMid} 85%, transparent 75%)`,
      }}
    />
    // </div>
  );
}


// "use client";

// import { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";

// gsap.registerPlugin(useGSAP);

// interface BackgroundGlowProps {
//   colorFrom?: string;
//   colorMid?: string;
//   blur?: number;
//   className?: string;
// }

// export default function BackgroundGlow({
//   colorFrom = "rgba(163,230,53,.25)",
//   colorMid = "rgba(91,76,245,.18)",
//   blur = 120,
//   className = "",
// }: BackgroundGlowProps) {
//   const glow = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia();

//       mm.add(
//         {
//           reduceMotion: "(prefers-reduced-motion: reduce)",
//           fullMotion: "(prefers-reduced-motion: no-preference)",
//         },
//         (ctx) => {
//           const { reduceMotion } = ctx.conditions as { reduceMotion: boolean };

//           if (reduceMotion) {
//             gsap.set(glow.current, { opacity: 0.3 });
//             return;
//           }

//           const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });

//           tl.to(glow.current, {
//             x: 80,
//             y: 30,
//             scale: 1.2,
//             rotation: 8,
//             duration: 8,
//           }).to(
//             glow.current,
//             { opacity: 0.4, duration: 6 },
//             0
//           );
//         }
//       );

//       return () => mm.revert();
//     },
//     { scope: glow }
//   );

//   return (
//     // Fixed wrapper = pinned to the viewport, sits behind every page's
//     // content, and clips overflow so the animation can't cause a
//     // horizontal scrollbar at the edges of the screen.
//     // <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
//     <div
//       ref={glow}
//       aria-hidden="true"
//       className={`absolute left-1/2 -top-40 -translate-x-1/2 h-[600px] w-full rounded-full will-change-transform ${className}`}
//       style={{
//         filter: `blur(${blur}px)`,
//         background: `radial-gradient(circle at center, ${colorFrom} 0%, ${colorMid} 85%, transparent 75%)`,
//       }}
//     />
//     // </div>
//   );
// }