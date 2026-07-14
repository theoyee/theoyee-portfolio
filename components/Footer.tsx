export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full px-2 py-10">
      <div className="w-full px-8 py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm">
          © {year} Oyee Goke. All rights reserved.
        </p>

        <p className="text-white/30 text-xs font-mono flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[#59D9C7]" />
          built with <span className="text-white/45">Next.js</span>
        </p>
      </div>
    </footer>
  );
}