import { useState, useEffect } from "react";
import { HeroVideos } from "../constants";

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleVideoEnd = () => {
    setFade(false); // start fade-out
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === HeroVideos.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true); // fade back in
    }, 500); // duration matches CSS transition
  };

  useEffect(() => {
    setFade(true);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video with fade effect */}
      <video
        key={HeroVideos[currentIndex].id}
        src={HeroVideos[currentIndex].video}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        onEnded={handleVideoEnd}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Texts */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 mt-60">
        {HeroVideos[currentIndex].textLists.map((text, index) => (
          <h1
            key={index}
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg opacity-0 animate-fadeInUp"
          >
            {text}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
