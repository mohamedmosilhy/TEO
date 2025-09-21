import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

import background from "../assets/images/hero/2.jpeg";
import background_2 from "../assets/images/hero/6.jpeg";
import background_3 from "../assets/images/hero/3.jpg";
import background_4 from "../assets/images/hero/9.jpg";

const images = [background, background_2, background_3, background_4];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bgRef = useRef(null);

  const changeImage = useCallback(() => {
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        gsap.to(bgRef.current, { opacity: 1, duration: 1 });
      },
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(changeImage, 3000);
    return () => clearInterval(interval);
  }, [changeImage]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Text */}
      <div className="absolute bottom-20 md:left-10 left-5 text-white sm:text-center md:text-left z-10 w-[90%] md:w-[65%] px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg leading-snug uppercase">
          We are designers, consultants and technical specialists
        </h1>
        <p className="text-sm md:text-base drop-shadow-md leading-relaxed">
          Working in a culture where thinkers, makers and dreamers converge.
        </p>
      </div>
    </section>
  );
}
