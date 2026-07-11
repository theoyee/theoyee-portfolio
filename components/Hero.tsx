import { ArrowDownRight, FileText, Star, Webhook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RiLinkedinLine } from "react-icons/ri";
import { VscGithubAlt, VscTwitter } from "react-icons/vsc";

export default function Hero() {
  return (
    <div className=" w-full bg-[#232322] flex items-center justify-center rounded-t-4xl px-2 py-6 mt-24 relative">

      {/* --- ENHANCED MASCOT WRAPPER --- */}
      <div className="absolute -top-12 -right-2 sm:-right-8 w-32 h-32 animate-float z-20 pointer-events-none">

        {/* The Million-Dollar Glow Effect (matched to your lime theme) */}
        <div className="absolute inset-0 bg-lime-400 rounded-full blur-[30px] opacity-25"></div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative z-10"
        >
          {/* --- JETPACK --- */}
          <rect x="40" y="80" width="120" height="60" rx="15" fill="#cbd5e1" />

          {/* Thruster Flames */}
          {/* Left Flame */}
          <path d="M 60 140 Q 70 180 80 140 Z" fill="#fb923c" />
          <path d="M 65 140 Q 70 165 75 140 Z" fill="#fef08a" />
          {/* Right Flame */}
          <path d="M 120 140 Q 130 180 140 140 Z" fill="#fb923c" />
          <path d="M 125 140 Q 130 165 135 140 Z" fill="#fef08a" />

          {/* --- BODY --- */}
          <rect x="55" y="90" width="90" height="60" rx="25" fill="#f8fafc" />

          {/* Chest Plate */}
          <rect x="70" y="110" width="60" height="25" rx="8" fill="#e2e8f0" />

          {/* Chest Buttons */}
          <circle cx="85" cy="122.5" r="5" fill="#ef4444" /> {/* Red */}
          <circle cx="100" cy="122.5" r="5" fill="#eab308" /> {/* Yellow */}
          <circle cx="115" cy="122.5" r="5" fill="#22c55e" /> {/* Green */}

          {/* --- ARMS --- */}
          {/* Left Arm (Resting) */}
          <path d="M 65 110 Q 35 130 55 145" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
          <circle cx="55" cy="145" r="10" fill="#94a3b8" /> {/* Left Hand */}

          {/* Right Arm (Waving) */}
          <path d="M 135 110 Q 175 80 150 45" fill="none" stroke="#f8fafc" strokeWidth="16" strokeLinecap="round" />
          <circle cx="150" cy="45" r="10" fill="#94a3b8" /> {/* Right Hand */}

          {/* --- HEAD --- */}
          {/* Helmet Base */}
          <rect x="45" y="20" width="110" height="85" rx="42.5" fill="#f8fafc" />

          {/* Helmet Bottom Trim */}
          <rect x="45" y="95" width="110" height="15" rx="7.5" fill="#e2e8f0" />

          {/* Visor Glass */}
          <rect x="55" y="35" width="90" height="50" rx="25" fill="#0f172a" />

          {/* Visor Glass Reflection (gives it 3D shine) */}
          <path d="M 65 55 Q 100 25 135 55 A 30 30 0 0 0 65 55 Z" fill="#ffffff" opacity="0.15" />

          {/* Cute Glowing Eyes */}
          <circle cx="85" cy="60" r="8" fill="#38bdf8" />
          <circle cx="115" cy="60" r="8" fill="#38bdf8" />

          {/* Rosy Cheeks */}
          <ellipse cx="70" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />
          <ellipse cx="130" cy="70" rx="6" ry="3" fill="#ec4899" opacity="0.5" />

          {/* --- ANTENNA --- */}
          <path d="M 140 35 L 165 15" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="165" cy="15" r="8" fill="#f59e0b" />

        </svg>
      </div>
      {/* --- END ENHANCED MASCOT --- */}

      <div className="w-full  rounded-[32px] border border-white/10 bg-[#121212]  p-10 sm:p-12 ">
        {/* Top row: profile + availability */}
        <div className="flex items-start justify-between ">
          <div className="flex items-center gap-4  flex-1">
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="https://api.dicebear.com/10.x/micah/svg?seed=theoyee&backgroundColor=121212&radius=50"
                // "https://api.dicebear.com/10.x/personas/svg?seed=theoyee&backgroundColor=121212&radius=50"
                // "https://api.dicebear.com/10.x/notionists/svg?seed=theoyee&backgroundColor=121212&radius=50"
                // "https://api.dicebear.com/10.x/initial-face/svg?seed=theoyee&backgroundColor=fcfcfa&radius=50"
                // "https://api.dicebear.com/10.x/notionists/svg?seed=theoyee&backgroundColor=121212&radius=50"
                // "https://api.dicebear.com/10.x/micah/svg?seed=theoyee&backgroundColor=121212&radius=50"
                // "https://api.dicebear.com/10.x/personas/svg?seed=theoyee&backgroundColor=121212&radius=50"
                // "https://api.dicebear.com/10.x/lorelei/svg?seed=theoyee&backgroundColor=ffffff&radius=50"
                // src="https://api.dicebear.com/9.x/adventurer/svg?seed=theoyee&backgroundColor=232322"
                alt="_theoyee avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold leading-tight">_theoyee</h2>
              <p className="text-white/50 text-sm mt-0.5">Software Engineer</p>
              <div className="flex items-center gap-3 mt-3 max-sm:mt-1">
                <a href="https://x.com/_theoyee" aria-label="X (Twitter)" className="text-white/50 hover:text-white transition-colors">
                  <VscTwitter className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
                </a>
                <a href="https://www.linkedin.com/in/oyetunji-olagoke/" aria-label="LinkedIn" className="text-white/50 hover:text-white transition-colors">
                  <RiLinkedinLine className="h-[20px] w-[20px]" fill="currentColor" strokeWidth={0} />
                </a>
                <a href="https://github.com/theoyee" aria-label="GitHub" className="text-white/50 hover:text-white transition-colors">
                  <VscGithubAlt className="h-[18px] w-[18px]" fill="currentColor" strokeWidth={0} />
                </a>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <div className="relative flex h-2.5 w-2.5">
              {/* The Pinging Outer Ring */}
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              {/* The Static Inner Core (Your original element) */}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_8px_2px_rgba(163,230,53,0.6)]" />
            </div>

            <span className="text-white/60 text-sm leading-snug text-right">
              Available
              <br />
              for work
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mt-10 text-white text-4xl sm:text-5xl md:text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
          Building Scalable Systems That Power Real Products.
        </h1>

        {/* Badge */}
        <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-white text-sm font-medium">Full-Stack &amp; Systems Architecture</span>
        </div>

        {/* Description */}
        <p className="mt-6 text-white/50 text-base sm:text-lg leading-relaxed max-w-xl">
          I build deliberate world-class software. I enjoy creating innovative solutions and
          tackling complex challenges.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex items-center gap-3 max-ms:justify-center">
          <button className="group flex items-center gap-3 rounded-full bg-lime-700 [#5b4cf5] pl-6 pr-2 py-2 text-white font-medium hover:bg-lime-600 transition-colors">
            <span>Get started</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </button>

          <button className="rounded-full bg-white/10 px-6 py-3.5 text-white font-medium hover:bg-white/15 transition-colors max-md:hidden">
            My work
          </button>

          <Link
            href={'https://drive.google.com/file/d/1cy5yZDp8fMaa4XCj4dMbbXkGp7gZLcPn/view?usp=sharing'}
            aria-label="Resume"
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors"
          >
            <FileText className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}