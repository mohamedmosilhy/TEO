import React from "react";
import {
  SiInstagram,
  SiFacebook,
  SiLinkedin,
  SiWhatsapp,
} from "react-icons/si";
import { ArrowUp } from "lucide-react";
import logo from "../assets/images/logo.jpg";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-main pt-20 pb-8 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 w-full">
          {/* Company Info */}
          <div className="flex flex-col items-center md:order-1 order-3 sm:items-start sm:text-left text-center space-y-4">
            <img
              src={logo}
              alt="TEO Architecture Logo"
              className="w-16 h-16 object-contain"
            />
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              Technical Engineering Office
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs uppercase">
              Creating exceptional architectural experiences that blend
              innovation with timeless design.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col order-1 items-start space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3 text-gray-400">
              <p>
                <span className="text-main font-medium">Address:</span> Cairo,
                Egypt
              </p>
              <p>
                <span className="text-main font-medium">Email:</span>{" "}
                <a
                  href="mailto:ahmed.a@teo-arch.com"
                  className="hover:text-main transition-colors duration-300 break-all"
                >
                  ahmed.a@teo-arch.com
                </a>
              </p>
              <p>
                <span className="text-main font-medium">Phone:</span>{" "}
                <a
                  href="tel:+201005246243"
                  className="hover:text-main transition-colors duration-300"
                >
                  +20 1005246243
                </a>
              </p>
              <p>
                <span className="text-main font-medium">Working Hours:</span>{" "}
                Sun – Thu, 9am – 6pm
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start order-2 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/teoarchitecture/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-9 h-9 border border-main hover:bg-main transition-all duration-300 hover:scale-90"
              >
                <SiInstagram
                  className="text-main group-hover:text-black transition-colors duration-300"
                  size={18}
                />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-9 h-9 border border-main hover:bg-main transition-all duration-300 hover:scale-90"
              >
                <SiFacebook
                  className="text-main group-hover:text-black transition-colors duration-300"
                  size={18}
                />
              </a>

              <a
                href="https://wa.me/201005246243"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-9 h-9 border border-main hover:bg-main transition-all duration-300 hover:scale-110"
              >
                <SiWhatsapp
                  className="text-main group-hover:text-black transition-colors duration-300"
                  size={18}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-6 pt-8 border-t border-gray-800 w-full">
          <p className="text-gray-500 text-xs text-center sm:text-left order-2 sm:order-1">
            © {new Date().getFullYear()} TEO — All Rights Reserved
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center w-10 h-10 border border-main hover:bg-main hover:text-black transition-all duration-300 hover:scale-110 order-1 sm:order-2"
          >
            <ArrowUp
              size={16}
              className="group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
