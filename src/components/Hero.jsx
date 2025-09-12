import background from "../assets/images/hero-1.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Text at bottom-left */}
      <div className="absolute bottom-20 md:left-10 left-5 text-white sm:text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg uppercase ">
          Where Architecture Meets Elegance
        </h1>
        <p className="text-lg md:text-xl drop-shadow-md">
          Creating interiors that inspire, transform, and endure.
        </p>
      </div>
    </section>
  );
}
