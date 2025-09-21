import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import services_1 from "../assets/images/services/services-1.jpg";
import services_2 from "../assets/images/services/services-2.jpg";
import services_3 from "../assets/images/services/services-3.jpg";
import services_4 from "../assets/images/services/services-4.jpg";

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {
  const services = [
    {
      img: services_2,
      title: "Interior",
      href: "#design",
      desc: "We craft designs that merge creativity with precision. Thinkers, makers, and dreamers converge to inspire bold ideas. Every concept balances innovation with functionality, tailored to client's vision.",
    },
    {
      img: services_4,
      title: "Exterior",
      href: "#exterior",
      desc: "We design outdoor spaces and building facades that blend aesthetics with functionality. From landscaping to facade treatments, every exterior is crafted to complement the environment and enhance the overall architectural vision.",
    },
    {
      img: services_3,
      title: "Fitting Out",
      href: "#fitting-out",
      desc: "We turn raw spaces into fully realized environments. Our culture unites thinkers, makers, and dreamers to create inspiring interiors. From planning to execution, we deliver functional and aesthetic spaces.",
    },
    {
      img: services_1,
      title: "Renovation",
      href: "#renovation",
      desc: "We breathe new life into existing spaces with thoughtful renovation. Creativity and expertise converge to revive and reimagine environments. Every project blends modern needs with timeless character.",
    },
  ];

  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        if (!row) return;

        // slide left for even, right for odd
        const fromX = i % 2 === 0 ? -100 : 100;

        gsap.fromTo(
          row,
          { opacity: 0, xPercent: fromX },
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="flex flex-col gap-12 px-6 md:px-20 py-20 overflow-x-hidden"
    >
      {services.map((service, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) rowsRef.current[index] = el;
          }}
          className={`flex flex-col md:flex-row items-center gap-8 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          } opacity-0`}
        >
          {/* Image */}
          <div className="flex-1 w-full">
            <img
              src={service.img}
              alt={service.title}
              className="w-full max-w-full h-64 sm:h-80 lg:h-[28rem] object-cover shadow-xl"
            />
          </div>

          {/* Text */}
          <div className="flex-1 text-left max-w-lg px-2">
            <h3 className="text-xl md:text-2xl font-bold text-main mb-4 uppercase tracking-wide">
              {service.title}
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-700">
              {service.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
