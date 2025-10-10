import { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ZoomIn,
} from "lucide-react";
import gsap from "gsap";

const ProjectModal = memo(({ isOpen, selectedProject, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const modalRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Detect media type (image or video)
  const getMediaType = (url) => {
    const ext = url.split(".").pop().toLowerCase();
    return ["mp4", "webm", "ogg"].includes(ext) ? "video" : "image";
  };

  const nextItem = useCallback(() => {
    if (selectedProject) {
      setIsLoading(true);
      setCurrentIndex((prev) =>
        prev === selectedProject.media.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [selectedProject]);

  const prevItem = useCallback(() => {
    if (selectedProject) {
      setIsLoading(true);
      setCurrentIndex((prev) =>
        prev === 0 ? selectedProject.media.length - 1 : prev - 1
      );
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [selectedProject]);

  const selectItem = (index) => {
    setIsLoading(true);
    setCurrentIndex(index);
    setTimeout(() => setIsLoading(false), 300);
  };

  const toggleZoom = () => setIsZoomed((prev) => !prev);
  const toggleAutoPlay = () => setIsAutoPlay((prev) => !prev);

  useEffect(() => {
    if (isAutoPlay && selectedProject?.media?.length > 1) {
      const currentType = getMediaType(selectedProject.media[currentIndex]);
      if (currentType === "image") {
        autoPlayRef.current = setInterval(nextItem, 3000);
      }
    } else {
      clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, nextItem, selectedProject, currentIndex]);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          onClose();
          setCurrentIndex(0);
          setIsAutoPlay(false);
          setIsZoomed(false);
          document.body.style.overflow = "unset";
        },
      });
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsAutoPlay(false);
      setIsZoomed(false);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, selectedProject]);

  if (!isOpen || !selectedProject) return null;

  const currentMedia = selectedProject.media[currentIndex];
  const currentType = getMediaType(currentMedia);

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-black/95 border border-main/30 rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.8)]"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-main/20 sticky top-0 bg-black/95 z-10">
            <h2 className="text-xl md:text-2xl font-bold text-main">
              {selectedProject.title}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white transition p-2 hover:bg-main/20 rounded-full"
            >
              <X size={22} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 flex flex-col gap-6">
              {/* Main Media */}
              <div className="relative rounded-xl overflow-hidden group">
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="w-8 h-8 border-2 border-main/30 border-t-main rounded-full animate-spin"></div>
                  </div>
                )}

                {currentType === "image" ? (
                  <img
                    src={currentMedia}
                    alt={`${selectedProject.title} - ${currentIndex + 1}`}
                    className={`w-full max-h-[70vh] object-contain rounded-lg transition-all duration-700 ${
                      isLoading
                        ? "opacity-50 scale-105"
                        : "opacity-100 scale-100"
                    }`}
                  />
                ) : (
                  <video
                    src={currentMedia}
                    controls
                    autoPlay
                    muted
                    className="w-full max-h-[70vh] object-contain rounded-lg bg-black"
                  />
                )}

                {/* Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex justify-between items-center">
                  <span className="text-white text-sm px-3 py-1 bg-black/60 rounded-full">
                    {currentIndex + 1} / {selectedProject.media.length}
                  </span>
                  {currentType === "image" && (
                    <div className="flex gap-2">
                      <button
                        onClick={toggleAutoPlay}
                        className="bg-black/70 text-white p-2 rounded-full hover:bg-main/20"
                      >
                        {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        onClick={toggleZoom}
                        className="bg-black/70 text-white p-2 rounded-full hover:bg-main/20"
                      >
                        <ZoomIn size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <button
                  onClick={prevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProject.media.map((item, index) => {
                  const type = getMediaType(item);
                  return (
                    <div
                      key={index}
                      onClick={() => selectItem(index)}
                      className={`min-w-[90px] h-[70px] rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                        currentIndex === index
                          ? "border-main"
                          : "border-transparent"
                      }`}
                    >
                      {type === "image" ? (
                        <img
                          src={item}
                          alt=""
                          className="w-full h-full object-cover hover:scale-110 transition"
                        />
                      ) : (
                        <video
                          src={item}
                          muted
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Overlay */}
      {isZoomed && currentType === "image" && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center">
          <img
            src={currentMedia}
            alt={`${selectedProject.title} Zoomed`}
            className="max-w-[95%] max-h-[90%] object-contain"
          />
          <button
            onClick={toggleZoom}
            className="absolute top-6 right-6 bg-black/70 text-white p-3 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </>
  );
});

ProjectModal.displayName = "ProjectModal";
export default ProjectModal;
