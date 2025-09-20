import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Stats = () => {
  const stats = useMemo(
    () => [
      { id: 1, label: "Designs", value: 170, suffix: "+" },
      { id: 2, label: "Satisfied Clients", value: 54, suffix: "+" },
      { id: 3, label: "Years", value: 35, suffix: "+" },
      { id: 4, label: "Projects", value: 720, suffix: "" },
    ],
    []
  );

  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;

      const finalValue = stats[i].value;

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: finalValue,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true, // ✅ ensures animation runs only once
          },
          onUpdate: function () {
            el.innerText = Math.floor(el.innerText) + stats[i].suffix;
          },
        }
      );
    });
  }, [stats]);

  return (
    <section id="stats" className="bg-black text-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 text-center lg:text-left">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className="flex flex-col items-center lg:items-start"
            >
              <h3 className="text-base md:text-lg font-medium mb-2">
                {stat.label}
              </h3>
              <span
                ref={(el) => (refs.current[i] = el)}
                className="text-3xl md:text-4xl font-bold"
              >
                0
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
