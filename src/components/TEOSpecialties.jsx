import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEOSpecialties = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="teo-specialties"
      className="relative py-20 px-6 md:px-20 overflow-hidden bg-gradient-to-b from-black via-neutral-900 to-black"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-main mb-16 uppercase tracking-wide">
          TEO Specialties
        </h2>

        <div ref={contentRef} className="space-y-12">
          {/* Main Content */}
          <div className="max-w-4xl mx-auto text-center text-gray-300 space-y-8">
            <p className="text-sm md:text-base leading-relaxed">
              At TEO, the client's dream becomes a reality. We make it our top
              priority to accompany our client from the starting point of
              choosing the location, based off accurate recommendations and
              technical views, to the final piece of furniture added.
            </p>

            <p className="text-sm md:text-base leading-relaxed">
              Along these ends, we offer landscaping and designing services,
              with consultations for immaculately paired interior design. This
              is matched and completed with a psychological finish by
              professionals, to ensure your comfort zone engulfs your reality.
              We see how diverse everyone is, and we put effort into being the
              first to mirror one's inside thoughts and feelings, with where
              they feel most comfortable.
            </p>

            <p className="text-sm md:text-base leading-relaxed">
              Undoubtedly, all of our services are completed by professionals
              with immense attention to details, and an extreme knowledge base
              that has been gained over more than two decades. Keeping the
              tradition of the ultimate trust and heavenly touches alive, TEO
              strives to ensure Egyptian homes, buildings and architecture,
              stands uniquely with its own personality, aesthetic and ambiance,
              to reflect the modern retouch being embedded in our current
              society and culture.
            </p>
          </div>

          {/* Goals Section */}
          <div className="grid sm:grid-cols-2 gap-8 mt-16">
            {/* End Goal */}
            <div className="bg-neutral-800/50 p-8 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105">
              <h4 className="text-xl md:text-2xl font-semibold text-main mb-4 uppercase tracking-wide">
                End Goal
              </h4>
              <p className="text-sm md:text-base leading-relaxed text-gray-300">
                At TEO, our main priority is to completely customize homes,
                venturing psychological factors into architectural creations.
              </p>
            </div>

            {/* Road to Goal */}
            <div className="bg-neutral-800/50 p-8 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105">
              <h4 className="text-xl md:text-2xl font-semibold text-main mb-4 uppercase tracking-wide">
                Road to Goal
              </h4>
              <p className="text-sm md:text-base leading-relaxed text-gray-300">
                Encouraging the beliefs of our clients, by turning them into
                reality from start to finish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TEOSpecialties;
