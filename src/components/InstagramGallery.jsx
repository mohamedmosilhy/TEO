import React from "react";

import mat1 from "../assets/images/services-1.jpg";
import mat2 from "../assets/images/services-2.jpg";
import mat3 from "../assets/images/services-3.jpg";
import mat4 from "../assets/images/services-4.jpg";
import mat5 from "../assets/images/services-1.jpg";
import mat6 from "../assets/images/services-2.jpg";

const InstagramGallery = () => {
  const instagramUrl = "https://www.instagram.com/teo_architecture"; // Update with real IG link

  const images = [
    { src: mat1, alt: "Architecture project 1" },
    { src: mat2, alt: "Architecture project 2" },
    { src: mat3, alt: "Architecture project 3" },
    { src: mat4, alt: "Architecture project 4" },
    { src: mat5, alt: "Architecture project 5" },
    { src: mat6, alt: "Architecture project 6" },
  ];

  return (
    <section className="bg-black py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl text-main tracking-wide mb-10">
          FOLLOW US ON INSTAGRAM
        </h2>

        {/* Images row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <a
              key={index}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden group relative"
              aria-label={`View ${image.alt} on Instagram`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-40 md:h-48 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="text-sm font-medium">Follow us</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
