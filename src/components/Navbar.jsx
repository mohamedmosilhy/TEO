import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      id="navbar"
      className="flex justify-between items-center p-4 text-white absolute top-0 left-0 w-full z-50 bg-background/30 backdrop-blur-sm transition-colors duration-300"
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <a href="#home">
          <img
            src={logo}
            alt="logo"
            className="w-16 rounded transition-transform duration-300 hover:scale-105"
          />
        </a>
        <h1 className="text-3xl tracking-wide transition-colors duration-300 hover:text-white">
          TEO
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:flex-col gap-8 text-md md:absolute md:right-5 md:top-30">
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

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-20 right-4 bg-background/90 backdrop-blur-md rounded-xl p-6 flex flex-col gap-4 text-md font-bold shadow-lg lg:hidden">
          {["Home", "Projects", "Services", "Our Story", "Contact"].map(
            (item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:underline underline-offset-8 decoration-2 decoration-light/50 transition-colors duration-300 hover:text-white"
                >
                  {item}
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </nav>
  );
}
