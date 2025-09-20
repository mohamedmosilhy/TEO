import React from "react";

import mat1 from "../assets/images/services-1.jpg";
import mat2 from "../assets/images/services-2.jpg";
import mat3 from "../assets/images/services-3.jpg";
import mat4 from "../assets/images/services-4.jpg";
import mat5 from "../assets/images/services-1.jpg";
import mat6 from "../assets/images/services-2.jpg";

const materials = [
  { name: "Marble", img: mat1, description: "Elegant natural stone" },
  { name: "Wood", img: mat2, description: "Warm timber finishes" },
  { name: "Glass", img: mat3, description: "Modern transparency" },
  { name: "Steel", img: mat4, description: "Industrial strength" },
  { name: "Granite", img: mat5, description: "Durable stone surfaces" },
  { name: "Concrete", img: mat6, description: "Contemporary textures" },
];

const Materials = () => {
  return (
    <section className="flex flex-col md:flex-row gap-12 py-20 px-6 md:px-20 bg-black text-white">
      {/* Left column */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-main mb-4">
          Premium <br /> Products <br /> and Materials
        </h2>
        <p className="text-gray-400 max-w-sm">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat.
        </p>
      </div>

      {/* Right column */}
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
              <img
                src={material.img}
                alt={material.name}
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-sm font-medium px-4 text-center">
                  {material.description}
                </p>
              </div>
            </div>
            <p className="text-main font-semibold uppercase tracking-wide group-hover:text-white transition-colors duration-300">
              {material.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Materials;
