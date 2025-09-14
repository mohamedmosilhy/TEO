import { useEffect, useRef } from "react";
import services_1 from "../assets/images/services-1.jpg";
import services_2 from "../assets/images/services-2.jpg";
import services_3 from "../assets/images/services-3.jpg";
import services_4 from "../assets/images/services-4.jpg";

export const Services = () => {
  const services = [
    { img: services_1, title: "Design", href: "#design" },
    { img: services_2, title: "Interior", href: "#interior" },
    { img: services_3, title: "Planning", href: "#planning" },
    { img: services_4, title: "Exterior", href: "#exterior" },
  ];

  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const overlayRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer = null;

    const setupObserver = () => {
      // cleanup first
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      if (isMobile) {
        // only observe on mobile / 1-column
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const index = Number(entry.target.dataset.index ?? -1);
              if (index < 0) return;

              const bg = bgRefs.current[index];
              const overlay = overlayRefs.current[index];
              const text = textRefs.current[index];

              if (entry.isIntersecting) {
                bg?.classList.add("scale-110");
                overlay?.classList.add("opacity-0");
                text?.classList.add("translate-x-6", "opacity-0");
              } else {
                bg?.classList.remove("scale-110");
                overlay?.classList.remove("opacity-0");
                text?.classList.remove("translate-x-6", "opacity-0");
              }
            });
          },
          { threshold: 0.9 }
        );

        cardsRef.current.forEach((card) => {
          if (card) observer.observe(card);
        });
      }
    };

    setupObserver();

    // watch for viewport changes
    const handleResize = () => setupObserver();
    window.addEventListener("resize", handleResize);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="services"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-0 m-0"
    >
      {services.map((service, index) => (
        <a
          key={index}
          href={service.href}
          data-index={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="relative block
            h-[30rem] sm:h-[30rem] lg:h-[26rem] 
            overflow-hidden group border-0 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
          aria-label={`View ${service.title} services`}
        >
          {/* Background Image */}
          <div
            ref={(el) => (bgRefs.current[index] = el)}
            style={{ backgroundImage: `url(${service.img})` }}
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 
              group-hover:scale-110 group-focus:scale-110 group-active:scale-110"
          ></div>

          {/* Overlay */}
          <div
            ref={(el) => (overlayRefs.current[index] = el)}
            className="absolute inset-0 bg-black/90 transition-opacity duration-500 
              group-hover:opacity-0 group-focus:opacity-0 group-active:opacity-0"
          ></div>

          {/* Text */}
          <div className="absolute bottom-6 left-6 z-10">
            <p
              ref={(el) => (textRefs.current[index] = el)}
              className="text-main font-bold text-lg lg:text-base uppercase tracking-wide 
                transform transition-all duration-700 ease-in-out
                group-hover:translate-x-10 group-hover:opacity-0 
                group-focus:translate-x-10 group-focus:opacity-0 
                group-active:translate-x-10 group-active:opacity-0"
            >
              {service.title}
            </p>
          </div>
        </a>
      ))}
    </section>
  );
};
