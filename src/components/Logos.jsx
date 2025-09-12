import { useRef, useEffect, useState, useCallback } from "react";

const logosData = [
  { id: 1, name: "Brand A", color: "bg-main" },
  { id: 2, name: "Brand B", color: "bg-main" },
  { id: 3, name: "Brand C", color: "bg-main" },
  { id: 4, name: "Brand D", color: "bg-main" },
  { id: 5, name: "Brand E", color: "bg-main" },
];

export const Logos = ({ logos = logosData }) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [dimensions, setDimensions] = useState({ cardWidth: 0, gap: 0 });

  // Responsive speed
  const getSpeed = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) return 0.2;
    if (width < 1024) return 0.3;
    return 0.4;
  }, []);

  // Responsive gap
  const getGap = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) return 16;
    if (width < 768) return 20;
    if (width < 1024) return 24;
    return 28;
  }, []);

  // Responsive card width
  const getCardWidth = useCallback(() => {
    const width = window.innerWidth;
    const containerWidth = containerRef.current?.offsetWidth || width;

    if (width < 640) return containerWidth;
    if (width < 768) return containerWidth / 2;
    if (width < 1024) return containerWidth / 3;
    if (width < 1280) return containerWidth / 4;
    return containerWidth / 5;
  }, []);

  // Update card width & gap on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ cardWidth: getCardWidth(), gap: getGap() });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [getCardWidth, getGap]);

  // Animation loop
  useEffect(() => {
    if (!containerRef.current) return;

    const animate = () => {
      setOffset((prev) => {
        const totalWidth = dimensions.cardWidth + dimensions.gap;
        const maxOffset = totalWidth * logos.length;
        const next = prev + getSpeed();
        return next >= maxOffset ? next - maxOffset : next;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions, logos.length, getSpeed]);

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            ref={containerRef}
            className="flex gap-4 sm:gap-6 md:gap-6 lg:gap-6 py-8"
            style={{
              transform: `translateX(-${offset}px)`,
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 group"
              >
                <div className="relative p-6 md:p-8 h-36 sm:h-48 md:h-44 lg:h-44 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                  {/* Logo Circle */}
                  <div className="relative h-full flex items-center justify-center">
                    <div
                      className={`w-16 sm:w-24 md:w-20 lg:w-24 h-16 sm:h-24 md:h-20 lg:h-24
                        ${logo.color}
                        rounded-full flex items-center justify-center
                        text-white font-bold text-lg shadow-lg transition-all duration-500 ring-4 ring-white/20`}
                    >
                      {logo.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
