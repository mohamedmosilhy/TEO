import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isNotHomePage = location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("home")?.offsetHeight || 500;
      setScrolled(window.scrollY > heroHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  // Helper to create links
  const createLink = (label, to) => {
    if (to.includes("#")) {
      return { label, to, isHash: true };
    }
    return { label, to, isHash: false };
  };

  const links = [
    createLink("HOME", "/TEO/"),
    createLink("TEO SPECIALTIES", "/teo-specialties/"),
    createLink("TEO PROJECTS", "/projects/"),
    createLink("TEO STORY", "/story/"),
    createLink("CONTACT", "/TEO/#contact"),
  ];

  // Centralized link rendering
  const renderLinks = (isMobile = false, useTextMain = false) =>
    links.map(({ label, to, isHash }) =>
      isHash ? (
        <li key={label}>
          <HashLink
            smooth
            to={to}
            onClick={isMobile ? () => setIsOpen(false) : undefined}
            className={`hover:underline underline-offset-8 decoration-2 decoration-light/50 transition-colors duration-300 ${
              useTextMain ? "text-main" : "text-white"
            }`}
          >
            {label}
          </HashLink>
        </li>
      ) : (
        <li key={label}>
          <Link
            to={to}
            onClick={isMobile ? () => setIsOpen(false) : undefined}
            className={`hover:underline underline-offset-8 decoration-2 decoration-light/50 transition-colors duration-300 ${
              useTextMain ? "text-main" : "text-white"
            }`}
          >
            {label}
          </Link>
        </li>
      )
    );

  const alwaysScrolled = scrolled || isNotHomePage;

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-black ${
          alwaysScrolled ? "border-b-2 border-main" : ""
        }`}
      >
        <div className="relative flex justify-between items-center px-6 py-3">
          {/* Logo + Title */}
          <div className="flex items-center gap-2 relative flex-1">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-12 transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <div className="relative flex-1">
              <h1
                className={`text-2xl tracking-wide font-semibold transition-colors duration-300 ${
                  alwaysScrolled ? "text-main" : "text-white"
                }`}
              >
                TEO
              </h1>
              {/* Underline only on home page before scroll */}
              {!alwaysScrolled && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white block"></span>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          {alwaysScrolled && (
            <ul className="hidden md:flex flex-row gap-6 text-sm font-bold items-center z-10">
              {renderLinks(false, true)}
            </ul>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-300 ${
                alwaysScrolled ? "text-main" : "text-white"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 text-sm font-bold px-6 py-4 text-main">
            {renderLinks(true, true)}
          </ul>
        </div>
      </nav>

      {/* Spacer below navbar for non-home pages */}
      {isNotHomePage && <div className="h-24 md:h-28"></div>}

      {/* Floating vertical links on home page before scroll */}
      {!alwaysScrolled && (
        <ul className="hidden md:flex flex-col gap-5 text-sm font-bold absolute top-24 right-10 text-white z-40">
          {renderLinks(false, false)}
        </ul>
      )}
    </>
  );
}
