import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import story_1 from "../assets/images/story/story-1.png";
import story_2 from "../assets/images/story/story-2.png";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const sectionsRef = useRef([]);
  sectionsRef.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        const image = section.querySelector("img");
        const paragraphs = section.querySelectorAll("p");

        gsap.from(image, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          x: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <section
      id="our-story"
      className="relative flex flex-col gap-12 py-20 px-6 md:px-20 overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-black"
    >
      <h2 className="text-center text-2xl md:text-3xl font-bold text-main mb-12 uppercase tracking-wide">
        TEO Story
      </h2>

      {/* Section 1: Father */}
      <div
        ref={addToRefs}
        className="flex flex-col md:flex-row items-center gap-12"
      >
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[565px] aspect-[565/675] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.7)] bg-white">
            <img
              src={story_1}
              alt="Eng. Mohamed Abdel Mohaimen"
              className="w-full h-full object-cover filter grayscale"
              loading="lazy"
            />
          </div>
        </div>
        {/* Text */}
        <div className="w-full md:w-1/2 text-gray-300 text-sm md:text-base leading-relaxed space-y-6">
          <p>
            TEO was originally founded by the late{" "}
            <strong>Eng. Mohamed Abdel Mohaimen</strong>, a visionary who
            reshaped Egypt's construction landscape in the early 1980s. With a
            commitment to architectural excellence, precision finishing, and
            client-centric service, he sought to elevate the built environment
            and introduce a new standard of design sophistication.
          </p>

          <p>
            As one of the pioneers in bridging the public and private sectors,
            Eng. Mohamed championed the idea that architecture should not only
            serve functional needs but also enhance the cultural and aesthetic
            identity of communities.
          </p>
        </div>
      </div>

      {/* Section 2: Son */}
      <div
        ref={addToRefs}
        className="flex flex-col md:flex-row-reverse items-center gap-12"
      >
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-[565px] aspect-[565/675] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.7)] bg-white">
            <img
              src={story_2}
              alt="Eng. Ahmed Abdel Mohaimen"
              className="w-full h-full object-cover filter grayscale"
              loading="lazy"
            />
          </div>
        </div>
        {/* Text */}
        <div className="w-full md:w-1/2 text-gray-300 text-sm md:text-base leading-relaxed space-y-6">
          <p>
            Following his passing, the mantle was taken up by his son,{" "}
            <strong>Eng. Ahmed Abdel Mohaimen</strong>. With over two decades of
            consultancy and leadership in mega-scale developments, he infused
            TEO with renewed vision—merging technical mastery and meticulous
            approach with his father's timeless principles.
          </p>

          <p>
            Today, TEO embodies the fusion of tradition and innovation. We
            remain committed to our heritage of uncompromising quality while
            continuously adapting to the evolving architectural dialogue of our
            time. By integrating global standards with local identity, we
            promise our clients not just buildings, but living experiences
            defined by elegance, precision, and enduring value.
          </p>
        </div>
      </div>

      {/* Extra Section: Specialties / Vision / Mission */}
      <div className="max-w-4xl mx-auto text-center text-gray-300 space-y-12 mt-16">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-main mb-6 uppercase tracking-wide">
            Our Specialties
          </h3>
          <p className="text-sm md:text-base leading-relaxed">
            At TEO, the client's dream becomes a reality. We make it our top
            priority to accompany our client from the starting point of choosing
            the location, based off accurate recommendations and technical
            views, to the final piece of furniture added.
          </p>
          <p className="text-sm md:text-base leading-relaxed mt-4">
            Along these ends, we offer landscaping and designing services, with
            consultations for immaculately paired interior design. This is
            matched and completed with a psychological finish by professionals,
            to ensure your comfort zone engulfs your reality. We see how diverse
            everyone is, and we put effort into being the first to mirror one's
            inside thoughts and feelings, with where they feel most comfortable.
          </p>
          <p className="text-sm md:text-base leading-relaxed mt-4">
            Undoubtedly, all of our services are completed by professionals with
            immense attention to details, and an extreme knowledge base that has
            been gained over more than two decades. Keeping the tradition of the
            ultimate trust and heavenly touches alive, TEO strives to ensure
            Egyptian homes, buildings and architecture, stands uniquely with its
            own personality, aesthetic and ambiance, to reflect the modern
            retouch being embedded in our current society and culture.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-12 mt-12">
          {/* Vision */}
          <div className="bg-neutral-800/50 p-6 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] transition">
            <h4 className="text-lg md:text-xl font-semibold text-main mb-3 uppercase">
              End Goal (Vision)
            </h4>
            <p className="text-sm md:text-base leading-relaxed">
              At TEO, our main priority is to completely customize homes,
              venturing psychological factors into architectural creations.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-neutral-800/50 p-6 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] transition">
            <h4 className="text-lg md:text-xl font-semibold text-main mb-3 uppercase">
              Road to Goal (Mission)
            </h4>
            <p className="text-sm md:text-base leading-relaxed">
              Encouraging the beliefs of our clients, by turning them into
              reality from start to finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
