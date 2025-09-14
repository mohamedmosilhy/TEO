import React, { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const philosophyRef = useRef(null);
  const contactRef = useRef(null);
  const projectsRef = useRef(null);
  const bottomRef = useRef(null);
  const socialLinksRef = useRef([]);
  const projectLinksRef = useRef([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!footerRef.current) return;

    // reset arrays to avoid duplicates on re-render
    socialLinksRef.current = [];
    projectLinksRef.current = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(philosophyRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          contactRef.current,
          { y: 80, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .from(
          projectsRef.current,
          { y: 80, opacity: 0, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .from(
          bottomRef.current,
          { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );

      // Social links stagger
      gsap.from(socialLinksRef.current, {
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });

      // Project links stagger
      gsap.from(projectLinksRef.current, {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });

      // Contact items
      gsap.from(".contact-item", {
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Helpers to collect refs
  const addToSocialRefs = (el) => {
    if (el && !socialLinksRef.current.includes(el)) {
      socialLinksRef.current.push(el);
    }
  };

  const addToProjectRefs = (el) => {
    if (el && !projectLinksRef.current.includes(el)) {
      projectLinksRef.current.push(el);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-black text-main py-14 px-6 md:px-12 text-sm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Left Section */}
          <div ref={philosophyRef}>
            <h2 className="text-lg md:text-xl font-light uppercase tracking-wider leading-snug mb-4">
              Recognizing the need <br /> is the primary condition
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              At TEO, we believe architecture begins with empathy. By listening
              carefully and understanding vision, we transform ideas into
              spaces—where form, function, and timeless aesthetics converge.
            </p>

            <div className="flex items-center gap-6">
              {["IG", "FB", "LI"].map((link, idx) => (
                <React.Fragment key={idx}>
                  <a
                    ref={addToSocialRefs}
                    href="#"
                    className="hover:text-white transition-all duration-300 uppercase tracking-wider text-xs hover:scale-110"
                  >
                    {link}
                  </a>
                  {idx !== 2 && <span className="w-5 h-px bg-main"></span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Middle Section */}
          <div ref={contactRef}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Contact
            </h3>
            <div className="space-y-3 text-gray-400">
              <p className="contact-item">
                <span className="text-main font-medium">A:</span> Cairo, Egypt
                <br /> New Cairo, 5th Settlement
              </p>
              <p className="contact-item">
                <span className="text-main font-medium">E:</span>{" "}
                <a
                  href="mailto:info@teo-egypt.com"
                  className="hover:text-main transition-colors duration-300"
                >
                  info@teo-egypt.com
                </a>
              </p>
              <p className="contact-item">
                <span className="text-main font-medium">T:</span>{" "}
                <a
                  href="tel:+201234567890"
                  className="hover:text-main transition-colors duration-300"
                >
                  +20 12 3456 7890
                </a>
              </p>
              <p className="contact-item">
                <span className="text-main font-medium">T:</span>{" "}
                <a
                  href="tel:+201234567891"
                  className="hover:text-main transition-colors duration-300"
                >
                  +20 12 3456 7891
                </a>
              </p>
              <p className="contact-item">
                <span className="text-main font-medium">H:</span> Sun – Thu, 9am
                – 6pm
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div ref={projectsRef}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Projects
            </h3>
            <div className="space-y-2 text-gray-400 mb-10">
              {[
                "Residential",
                "Commercial",
                "Interior Design",
                "Competitions",
                "Renovation",
              ].map((item, idx) => (
                <a
                  key={idx}
                  ref={addToProjectRefs}
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
        <div
          ref={bottomRef}
          className="mt-14 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div>
            <div className="w-14 h-14 border border-main flex items-center justify-center group hover:bg-main transition-all duration-500">
              <span className="text-main group-hover:text-black font-bold text-lg tracking-widest transition-colors duration-500">
                TEO
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} TEO Architecture — All Rights Reserved
          </p>

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
