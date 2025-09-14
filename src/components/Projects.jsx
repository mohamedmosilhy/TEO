import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Import your real images
import services_1 from "../assets/images/services-1.jpg";
import services_2 from "../assets/images/services-2.jpg";
import services_3 from "../assets/images/services-3.jpg";
import services_4 from "../assets/images/services-4.jpg";

// Example project data (renamed with real titles)
const projects = [
  { name: "Design", img: services_1 },
  { name: "Interior", img: services_2 },
  { name: "Planning", img: services_3 },
  { name: "Exterior", img: services_4 },
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

  // Animate image on change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section
      id="projects"
      className="flex flex-col md:flex-row gap-8 items-center md:items-stretch py-20 px-8"
    >
      {/* Left side image (2/3 width) */}
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <img
          ref={imageRef}
          src={projects[activeIndex].img}
          alt={projects[activeIndex].name}
          className="w-full h-auto rounded shadow-lg"
        />
      </div>

      {/* Right side project list (1/3 width, centered) */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center gap-6 text-center text-lg">
        {projects.map((project, index) => (
          <p
            key={index}
            ref={(el) => {
              if (el) namesRef.current[index] = el;
            }}
            onMouseEnter={() => setActiveIndex(index)}
            className={`cursor-pointer transition-colors duration-300 ${
              activeIndex === index
                ? "text-main font-semibold"
                : "text-main/50 hover:text-main"
            }`}
          >
            {project.name}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Projects;
