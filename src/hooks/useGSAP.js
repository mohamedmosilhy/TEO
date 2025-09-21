import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (animationFn, deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current && animationFn) {
        animationFn(ref.current);
      }
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationFn, ...deps]);

  return ref;
};

export const useScrollTrigger = (triggerRef, animationFn, options = {}) => {
  useEffect(() => {
    if (!triggerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(triggerRef.current, options.from || { opacity: 0, y: 50 }, {
        ...(options.to || { opacity: 1, y: 0 }),
        duration: options.duration || 1.2,
        ease: options.ease || "power3.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: options.start || "top 80%",
          toggleActions: options.toggleActions || "play none none reverse",
          once: options.once || false,
          ...options.scrollTrigger,
        },
      });
    });

    return () => ctx.revert();
  }, [triggerRef, animationFn, options]);
};
