export default function Footer() {
  const year = new Date().getFullYear();



  return (
    <footer className="w-full px-2 py-10">
      <div className="w-full px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm">
          © {year} Oyee Goke. All rights reserved.
        </p>


        <p className="text-white/30 text-xs font-mono">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}