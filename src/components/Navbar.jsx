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
          scrolled ? "border-b-2 border-main" : ""
        }`}
      >
        <div className="relative flex justify-between items-center px-6 py-3">
          {/* Logo + Title + Line */}
          <div className="flex items-center gap-2 relative flex-1">
            <a href="#home">
              <img
                src={logo}
                alt="logo"
                className="w-12 rounded transition-transform duration-300 hover:scale-105"
              />
            </a>

            <div className="relative flex-1">
              <h1
                className={`text-2xl tracking-wide font-semibold transition-colors duration-300 ${
                  scrolled ? "text-main" : "text-white"
                }`}
              >
                TEO
              </h1>

              {/* Line only on desktop when navbar is not scrolled */}
              {!scrolled && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white hidden md:block"></span>
              )}
            </div>
          </div>

          {/* Desktop Menu (inside navbar when scrolled) */}
          {scrolled && (
            <ul className="hidden md:flex flex-row gap-6 text-sm font-bold items-center z-10 text-main">
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
              className={`focus:outline-none transition-colors duration-300 ${
                scrolled ? "text-main" : "text-white"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (with smooth transition) */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul
            className={`flex flex-col gap-4 text-sm font-bold px-6 py-4 transition-colors duration-300 ${
              scrolled ? "text-main" : "text-white"
            }`}
          >
            {["Home", "Projects", "Services", "Our Story", "Contact"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:underline underline-offset-8 decoration-2 decoration-light/50 hover:text-white transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.toUpperCase()}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>

      {/* Hero Floating Links (before scroll only, vertical on right for large screens) */}
      {!scrolled && (
        <ul className="hidden md:flex flex-col gap-5 text-sm font-bold absolute top-24 right-10 text-white z-40">
          {["Home", "Projects", "Services", "Our Story", "Contact"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:underline underline-offset-8 decoration-2 decoration-light/50 transition-colors duration-300 hover:text-main"
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
