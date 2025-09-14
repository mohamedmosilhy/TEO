import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

import services_1 from "../assets/images/services-1.jpg";
import services_2 from "../assets/images/services-2.jpg";
import services_3 from "../assets/images/services-3.jpg";
import services_4 from "../assets/images/services-4.jpg";

const projects = [
  {
    name: "Design",
    img: services_1,
    description: "Innovative design solutions",
  },
  { name: "Interior", img: services_2, description: "Elegant interior spaces" },
  {
    name: "Planning",
    img: services_3,
    description: "Strategic project planning",
  },
  {
    name: "Exterior",
    img: services_4,
    description: "Stunning exterior designs",
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const namesRef = useRef([]);
  const imageRef = useRef(null);

  // Animate names only once on mount
  useEffect(() => {
    if (namesRef.current.length) {
      gsap.fromTo(
        namesRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  // Animate image on change with better performance
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  const handleProjectHover = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      id="projects"
      className="flex flex-col md:flex-row gap-8 items-center md:items-stretch py-20 px-8"
    >
      {/* Left side image (2/3 width) */}
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <img
            ref={imageRef}
            src={projects[activeIndex].img}
            alt={projects[activeIndex].name}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Right side project list (1/3 width, centered) */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center gap-6 text-center text-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-main mb-8 uppercase tracking-wide">
          Our Projects
        </h2>
        {projects.map((project, index) => (
          <div
            key={index}
            className="text-center group cursor-pointer"
            onMouseEnter={() => handleProjectHover(index)}
          >
            <p
              ref={(el) => {
                if (el) namesRef.current[index] = el;
              }}
              className={`transition-all duration-300 text-xl ${
                activeIndex === index
                  ? "text-main font-semibold scale-105"
                  : "text-main/70 hover:text-main hover:scale-105"
              }`}
            >
              {project.name}
            </p>
            <p
              className={`text-sm text-gray-400 mt-1 transition-opacity duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
