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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const modalRef = useRef(null);
  const autoPlayRef = useRef(null);

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setIsImageLoading(true);
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsImageLoading(false), 300);
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setIsImageLoading(true);
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
      setTimeout(() => setIsImageLoading(false), 300);
    }
  }, [selectedProject]);

  const selectImage = useCallback((index) => {
    setIsImageLoading(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsImageLoading(false), 300);
  }, []);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => !prev);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && selectedProject && selectedProject.images.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, selectedProject]);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: "power3.out",
        onComplete: () => {
          onClose();
          setCurrentImageIndex(0);
          setIsAutoPlay(false);
          setIsZoomed(false);
          document.body.style.overflow = "unset";
        },
      });
    }
  }, [onClose]);

  // Animate modal open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (isOpen && selectedProject) {
        switch (e.key) {
          case "Escape":
            if (isZoomed) {
              setIsZoomed(false);
            } else {
              closeModal();
            }
            break;
          case "ArrowLeft":
            prevImage();
            break;
          case "ArrowRight":
            nextImage();
            break;
          case " ":
            e.preventDefault();
            if (!isZoomed) toggleAutoPlay();
            break;
          case "z":
          case "Z":
            toggleZoom();
            break;
        }
      }
    },
    [
      isOpen,
      selectedProject,
      closeModal,
      prevImage,
      nextImage,
      isZoomed,
      toggleAutoPlay,
      toggleZoom,
    ]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen && selectedProject) {
      setCurrentImageIndex(0);
      setIsAutoPlay(false);
      setIsZoomed(false);
    }
  }, [isOpen, selectedProject]);

  if (!isOpen || !selectedProject) return null;

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-black/95 border border-main/30 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.8)]"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b border-main/20">
            <h2 className="text-2xl md:text-3xl font-bold text-main drop-shadow-md">
              {selectedProject.title}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-main/20 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Gallery */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-6">
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-xl group">
                  {isImageLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                      <div className="w-8 h-8 border-2 border-main/30 border-t-main rounded-full animate-spin"></div>
                    </div>
                  )}

                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${
                      currentImageIndex + 1
                    }`}
                    className={`w-full h-[450px] md:h-[650px] object-cover transition-all duration-700 rounded-xl ${
                      isImageLoading
                        ? "opacity-50 scale-105"
                        : "opacity-100 scale-100"
                    }`}
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-main/80"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-main/80"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Controls (bottom right) */}
                  <div className="absolute bottom-4 right-4 flex gap-3">
                    {/* Auto-play */}
                    <button
                      onClick={toggleAutoPlay}
                      className="bg-black/80 backdrop-blur-sm text-white p-2 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300"
                    >
                      {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    {/* Zoom */}
                    <button
                      onClick={toggleZoom}
                      className="bg-black/80 backdrop-blur-sm text-white p-2 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-3 mt-6">
                  {selectedProject.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
                      onClick={() => selectImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${selectedProject.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 border-2 border-main shadow-lg shadow-main/30"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Overlay */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${selectedProject.title} - Zoomed`}
              className="max-w-full max-h-full object-contain drop-shadow-lg"
            />

            <button
              onClick={toggleZoom}
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300"
            >
              <X size={24} />
            </button>

            {selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white p-3 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white p-3 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
});

ProjectModal.displayName = "ProjectModal";

export default ProjectModal;
