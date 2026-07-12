"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---- Load-in sequence (navbar + hero) ----
      const tl = gsap.timeline({ defaults: { ease: "back.inOut" } });

      tl.set(containerRef.current, { autoAlpha: 1 })
        .from(".gsap-hero", { y: 100, autoAlpha: 0, duration: 4.1 }, "-=0.45");

      // ---- Scroll-triggered section reveals ----
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 2,
            ease: "power3.inout",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ---- Subtle parallax depth on Services (mobile-safe) ----
      gsap.to(".gsap-services", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: ".gsap-services",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 items-center justify-center bg-[#121212] font-sans invisible"
    >
      <main className="min-h-full w-full max-w-[85rem] items-center justify-between py-6 sm:items-start">
        <div className="section-wrapper">
          <div className="gsap-navbar">
            {/* <Navbar /> */}
          </div>
          <div className="gsap-hero">
            <Hero />
          </div>
          <div className="gsap-reveal">
            <About />
          </div>
          <div className="gsap-reveal" id="projects">
            <Projects />
          </div>
        </div>

        <div className="max-sm:bg-[#232322] section-wrapper gsap-reveal gsap-services" id="services">
          <Services />
        </div>

        <div className="section-wrapper gsap-reveal" id="contact">
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}