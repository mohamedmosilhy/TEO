import { useState, useEffect, useRef, useCallback } from "react";
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

  // Auto-play every 4 seconds with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  return (
    <section className="bg-black text-white py-20 relative flex flex-col items-center justify-center overflow-hidden">
      {/* Arrows */}
      <button
        onClick={prevTestimonial}
        className="absolute left-8 text-main text-xl hover:text-white transition-colors duration-300 hover:scale-110 transform"
        aria-label="Previous testimonial"
      >
        <FaArrowLeft />
      </button>

      <div ref={textRef} className="max-w-4xl text-center px-6">
        <div className="relative">
          <p className="text-lg md:text-xl text-main leading-relaxed italic mb-6">
            "{testimonials[activeIndex].text}"
          </p>
          <p className="text-gray-400 text-sm font-medium">
            — {testimonials[activeIndex].author}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-main scale-125"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={nextTestimonial}
        className="absolute right-8 text-main text-xl hover:text-white transition-colors duration-300 hover:scale-110 transform"
        aria-label="Next testimonial"
      >
        <FaArrowRight />
      </button>
    </section>
  );
};

export default Testimonials;
