import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "../assets/images/services-3.jpg"; // replace with your real "About Us" image

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Early return if refs aren't ready
    if (!imageRef.current || !textRef.current) return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Image animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Text animation
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
    });

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center gap-12 p-10 md:p-16 overflow-hidden">
      {/* Left column: Image */}
      <div ref={imageRef} className="w-full md:w-1/2">
        <img
          src={aboutImg}
          alt="About TEO"
          className="w-full h-auto object-cover rounded-xl shadow-lg"
          loading="lazy"
        />
      </div>

      {/* Right column: Text */}
      <div
        ref={textRef}
        className="w-full md:w-1/2 flex flex-col justify-center"
      >
        <h2 className="text-3xl md:text-4xl text-main mb-6 font-bold">
          TEO Story
        </h2>
        <div className="text-gray-400 leading-relaxed space-y-4">
          <p className="mb-4">
            TEO was originally founded by the late{" "}
            <strong className="text-gray-300">
              Eng. Mohamed Abdel Mohaimen
            </strong>
            , a visionary who reshaped Egypt's construction landscape in the
            early 1980s. With a profound commitment to{" "}
            <em className="text-gray-300">
              architectural excellence, precision finishing, and client-centric
              service
            </em>
            , he sought to elevate the built environment and introduce a new
            standard of design sophistication.
          </p>

          <p className="mb-4">
            As one of the pioneers in bridging the{" "}
            <em className="text-gray-300">public and private sectors</em>, Eng.
            Mohamed championed the idea that architecture should not only serve
            functional needs but also{" "}
            <em className="text-gray-300">
              enhance the cultural and aesthetic identity
            </em>{" "}
            of communities.
          </p>

          <p className="mb-4">
            Following his passing, the mantle was taken up by his son,{" "}
            <strong className="text-gray-300">Eng. Ahmed Abdel Mohaimen</strong>
            . With over two decades of consultancy and leadership in{" "}
            <em className="text-gray-300">mega-scale developments</em>, he
            infused TEO with renewed vision—merging his technical mastery and
            meticulous approach with his father's timeless principles.
          </p>

          <p>
            Today, TEO embodies the{" "}
            <em className="text-gray-300">
              fusion of tradition and innovation
            </em>
            . We remain committed to our heritage of uncompromising quality
            while continuously adapting to the{" "}
            <em className="text-gray-300">evolving architectural dialogue</em>{" "}
            of our time. By integrating global standards with local identity, we
            promise our clients not just buildings, but{" "}
            <strong className="text-gray-200">
              living experiences defined by elegance, precision, and enduring
              value
            </strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;
