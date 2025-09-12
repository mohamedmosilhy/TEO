import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("home")?.offsetHeight || 500;
      if (window.scrollY > heroHeight - 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-black ${
          scrolled ? "border-b-2 border-secondary" : ""
        }`}
      >
        <div className="relative flex justify-between items-center px-6 py-3 text-white">
          {/* Logo + Title + Line */}
          <div className="flex items-center gap-2 relative flex-1">
            <a href="#home">
              <img
                src={logo}
                alt="logo"
                className="w-14 rounded transition-transform duration-300 hover:scale-105"
              />
            </a>

            <div className="relative flex-1">
              <h1
                className={`text-2xl tracking-wide font-semibold transition-colors duration-300 ${
                  scrolled ? "text-secondary" : "text-white"
                }`}
              >
                TEO
              </h1>
              {/* Line under TEO full width (before scroll only) */}
              {!scrolled && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white"></span>
              )}
            </div>
          </div>

          {/* Desktop Menu (inside navbar when scrolled) */}
          {scrolled && (
            <ul className="hidden md:flex flex-row gap-6 text-sm font-bold items-center z-10 text-secondary">
              {["Home", "Projects", "Services", "Our Story", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:underline underline-offset-8 decoration-2 decoration-light/50 transition-colors duration-300 hover:text-white"
                    >
                      {item.toUpperCase()}
                    </a>
                  </li>
                )
              )}
            </ul>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Floating Links (before scroll only, vertical on right) */}
      {!scrolled && (
        <ul className="hidden md:flex flex-col gap-5 text-sm font-bold absolute top-24 right-10 text-white z-40">
          {["Home", "Projects", "Services", "Our Story", "Contact"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:underline underline-offset-8 decoration-2 decoration-light/50 transition-colors duration-300 hover:text-secondary"
                >
                  {item.toUpperCase()}
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
