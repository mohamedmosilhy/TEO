import services_1 from "../assets/images/services-1.jpg";
import services_2 from "../assets/images/services-2.jpg";
import services_3 from "../assets/images/services-3.jpg";
import services_4 from "../assets/images/services-4.jpg";

export const Services = () => {
  const services = [
    { img: services_1, title: "Design" },
    { img: services_2, title: "Interior" },
    { img: services_3, title: "Planning" },
    { img: services_4, title: "Exterior" },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-0 m-0">
      {services.map((service, index) => (
        <div
          key={index}
          className="relative h-80 sm:h-96 overflow-hidden border border-main group"
        >
          {/* Background Image with scale effect */}
          <div
            style={{ backgroundImage: `url(${service.img})` }}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          ></div>

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/90 transition-opacity duration-500 group-hover:opacity-0"></div>

          {/* Text at bottom-left with slide effect */}
          <div className="absolute bottom-6 left-6 z-10">
            <p className="text-main font-bold text-base tracking-wide uppercase transform transition-all duration-700 ease-in-out group-hover:translate-x-10 group-hover:opacity-0">
              {service.title}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
