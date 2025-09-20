import { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";

const testimonials = [
  {
    text: "The colors made our office feel alive. Every day we feel more creative.",
    author: "Sara Hassan",
  },
  {
    text: "The fitting out gave the place balance. Now the space feels warm and welcoming.",
    author: "Mohamed Ali",
  },
  {
    text: "Our home feels completely new after the renovation. The design lifts our mood every day.",
    author: "Omar Khaled",
  },
  {
    text: "Calm, elegant, and practical. The design helps us focus without stress.",
    author: "Mona El-Sayed",
  },
  {
    text: "The colors and details boosted our team’s energy. We can feel the change.",
    author: "Ahmed Samir",
  },
  {
    text: "They turned our house into a real home. Simple touches but very powerful.",
    author: "Nour Ahmed",
  },
  {
    text: "Clients feel relaxed the moment they walk in. The design really works.",
    author: "Hany Mostafa",
  },
  {
    text: "The interior feels stylish and positive. It’s both beautiful and useful.",
    author: "Aya Ibrahim",
  },
  {
    text: "Our shop feels modern and calm at the same time. People love it.",
    author: "Youssef Adel",
  },
  {
    text: "Every corner feels like it has a story. Very thoughtful work.",
    author: "Laila Hossam",
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
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

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
    <section className="bg-black text-white py-20 px-6 md:px-20 relative flex flex-col items-center justify-center overflow-hidden">
      {/* Arrows */}
      <button
        onClick={prevTestimonial}
        className="absolute left-6 md:left-12 text-main text-2xl hover:text-white transition-all duration-300 hover:scale-125"
        aria-label="Previous testimonial"
      >
        <FaArrowLeft />
      </button>

      {/* Testimonial text */}
      <div ref={textRef} className="max-w-3xl text-center px-6">
        <p className="text-base md:text-lg text-main leading-relaxed italic mb-6">
          "{testimonials[activeIndex].text}"
        </p>
        <p className="text-gray-400 text-sm md:text-base font-medium">
          — {testimonials[activeIndex].author}
        </p>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-main scale-125 shadow-md"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={nextTestimonial}
        className="absolute right-6 md:right-12 text-main text-2xl hover:text-white transition-all duration-300 hover:scale-125"
        aria-label="Next testimonial"
      >
        <FaArrowRight />
      </button>
    </section>
  );
};

export default Testimonials;
