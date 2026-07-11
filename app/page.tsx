import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#121212] font-sans ">
      <main className="min-h-full w-full max-w-[85rem]  items-center justify-between py-6 sm:items-start">
        {/* <Services /> */}


        <div className="section-wrapper">
          <Navbar />
          <Hero />
          <About />
          <Projects />
        </div>

        <div className="max-sm:bg-[#232322] section-wrapper">
          <Services />
        </div>

        <div className="section-wrapper">
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
