import React from "react";
import { ArrowUp } from "lucide-react";
import { InstagramIcon } from "lucide-react"; // Using lucide-react Instagram icon

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-main py-20 px-6 md:px-20 text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Left Section - Philosophy */}
          <div>
            <h2 className="text-xl md:text-2xl font-light uppercase tracking-wider leading-snug mb-4">
              Recognizing the need <br /> is the primary condition
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              At TEO, we believe architecture begins with empathy. By listening
              carefully and understanding vision, we transform ideas into
              spaces—where form, function, and timeless aesthetics converge.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/teoarchitecture/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-10 h-10 border border-main rounded-full hover:bg-main transition-all duration-300"
              >
                <InstagramIcon
                  size={18}
                  className="text-main group-hover:text-black transition-colors duration-300"
                />
              </a>
            </div>
          </div>

          {/* Middle Section - Contact */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider mb-6">
              Contact
            </h3>
            <div className="space-y-3 text-gray-400">
              <p>
                <span className="text-main font-medium">A:</span> Giza, Egypt
                <br />
                17 RADWAN EBN ELTABIB
              </p>
              <p>
                <span className="text-main font-medium">E:</span>{" "}
                <a
                  href="mailto:ahmed.a@teo-arch.com"
                  className="hover:text-main transition-colors duration-300"
                >
                  ahmed.a@teo-arch.com
                </a>
              </p>
              <p>
                <span className="text-main font-medium">T:</span>{" "}
                <a
                  href="tel:+20235691565"
                  className="hover:text-main transition-colors duration-300"
                >
                  +20 235691565
                </a>
              </p>
              <p>
                <span className="text-main font-medium">T:</span>{" "}
                <a
                  href="tel:+201005246243"
                  className="hover:text-main transition-colors duration-300"
                >
                  +20 1005246243
                </a>
              </p>
              <p>
                <span className="text-main font-medium">H:</span> Sun – Thu, 9am
                – 6pm
              </p>
            </div>
          </div>

          {/* Right Section - Projects */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider mb-6">
              Projects
            </h3>
            <div className="space-y-2 text-gray-400 mb-10">
              {["Residential", "Commercial"].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="block hover:text-main transition-all duration-300 hover:translate-x-2 transform"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div>
            <div className="w-14 h-14 border border-main flex items-center justify-center group hover:bg-main transition-all duration-500">
              <span className="text-main group-hover:text-black font-bold text-lg tracking-widest transition-colors duration-500">
                TEO
              </span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} TEO Architecture — All Rights Reserved
          </p>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center w-10 h-10 border border-main hover:bg-main hover:text-black transition-all duration-300 hover:scale-110"
          >
            <ArrowUp
              size={18}
              className="group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
