import React from "react";

// Example material data (replace with your real images)
import mat1 from "../assets/images/services-1.jpg";
import mat2 from "../assets/images/services-2.jpg";
import mat3 from "../assets/images/services-3.jpg";
import mat4 from "../assets/images/services-4.jpg";
import mat5 from "../assets/images/services-1.jpg";
import mat6 from "../assets/images/services-2.jpg";

const materials = [
  { name: "Marble", img: mat1 },
  { name: "Wood", img: mat2 },
  { name: "Glass", img: mat3 },
  { name: "Steel", img: mat4 },
  { name: "Granite", img: mat5 },
  { name: "Concrete", img: mat6 },
];

const Materials = () => {
  return (
    <section className="flex flex-col md:flex-row gap-12 py-20 px-12 bg-black text-white">
      {/* Left column */}
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-main mb-4">
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
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={material.img}
              alt={material.name}
              className="w-full h-52 object-cover shadow-lg"
            />
            <p className="mt-3 text-main font-semibold uppercase tracking-wide">
              {material.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Materials;
