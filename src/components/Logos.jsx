import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useMemo } from "react";

export const Logos = () => {
  const logos = useMemo(
    () => [
      { id: 1, name: "Brand A" },
      { id: 2, name: "Brand B" },
      { id: 3, name: "Brand C" },
      { id: 4, name: "Brand D" },
      { id: 5, name: "Brand E" },
    ],
    []
  );

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Duplicate logos for seamless scrolling
    const totalLogos = [...logos, ...logos];

    // Clear container and render duplicated logos
    container.innerHTML = "";
    totalLogos.forEach((logo) => {
      const div = document.createElement("div");
      div.className = `
        flex-shrink-0 
        w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 
        h-40 sm:h-48 md:h-52 lg:h-56 flex items-center justify-center
      `;
      div.innerHTML = `
        <div class="w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 
          bg-main text-white font-bold rounded-full flex items-center justify-center">
          ${logo.id}
        </div>
      `;
      container.appendChild(div);
    });

    // GSAP infinite scroll animation
    const totalWidth = container.scrollWidth / 2; // because we duplicated logos
    gsap.to(container, {
      x: `-=${totalWidth}`,
      duration: 30, // adjust speed
      ease: "linear",
      repeat: -1,
    });
  }, [logos]);

  return (
    <div id="clients" className="w-full overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            ref={containerRef}
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Logos;
