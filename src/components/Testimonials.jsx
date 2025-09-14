import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";

const testimonials = [
  {
    text: "Felis donec et odio pellentesque diam volutpat commodo. Elit ullamcorper dignissim cras tincidunt.",
    author: "CEO, Mark Nouar",
  },
  {
    text: "Amazing experience! The team delivered beyond expectations with stunning results.",
    author: "Client, Sarah Johnson",
  },
  {
    text: "Professional, creative, and always on time. Highly recommended!",
    author: "Founder, Alex Brown",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRef = useRef(null);

  // Animate testimonial on change
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  // Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-20 relative flex flex-col items-center justify-center">
      {/* Arrows */}
      <button
        onClick={() =>
          setActiveIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
          )
        }
        className="absolute left-8 text-main text-xl"
      >
        <FaArrowLeft />
      </button>

      <div ref={textRef} className="max-w-3xl text-center px-6">
        <p className="text-lg md:text-xl text-main leading-relaxed italic">
          “{testimonials[activeIndex].text}”
        </p>
        <p className="mt-4 text-gray-400 text-sm">
          {testimonials[activeIndex].author}
        </p>
      </div>

      <button
        onClick={() =>
          setActiveIndex((prev) => (prev + 1) % testimonials.length)
        }
        className="absolute right-8 text-main text-xl"
      >
        <FaArrowRight />
      </button>
    </section>
  );
};

export default Testimonials;
