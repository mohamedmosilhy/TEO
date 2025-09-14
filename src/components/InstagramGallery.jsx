import React from "react";

import mat1 from "../assets/images/services-1.jpg";
import mat2 from "../assets/images/services-2.jpg";
import mat3 from "../assets/images/services-3.jpg";
import mat4 from "../assets/images/services-4.jpg";
import mat5 from "../assets/images/services-1.jpg";
import mat6 from "../assets/images/services-2.jpg";

const InstagramGallery = () => {
  const instagramUrl = "https://www.instagram.com/yourpage"; // replace with your real IG link

  const images = [mat1, mat2, mat3, mat4, mat5, mat6];

  return (
    <section className="bg-black py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl text-main tracking-wide mb-10">
          FOLLOW US ON INSTAGRAM
        </h2>

        {/* Images row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {images.map((img, index) => (
            <a
              key={index}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden group"
            >
              <img
                src={img}
                alt={`Instagram ${index + 1}`}
                className="w-full h-40 md:h-48 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out rounded-lg"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
