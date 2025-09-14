import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import gsap from "gsap";

import services_1 from "../assets/images/services-1.jpg";
import services_2 from "../assets/images/services-2.jpg";
import services_3 from "../assets/images/services-3.jpg";
import services_4 from "../assets/images/services-4.jpg";

const projects = [
  {
    id: 1,
    name: "Design",
    img: services_1,
    description: "Innovative design solutions",
    title: "Modern Residential Complex",
    fullDescription:
      "A groundbreaking residential development that combines contemporary design with sustainable living. This project features innovative space planning and cutting-edge architectural solutions.",
    location: "New Cairo, Egypt",
    year: "2024",
    architect: "Ahmed Abdel Mohaimen",
    area: "15,000 sqm",
    client: "Private Developer",
    category: "Residential",
    images: [services_1, services_2, services_3, services_4],
    features: [
      "Sustainable Design",
      "Smart Home Integration",
      "Landscape Architecture",
      "Energy Efficiency",
      "Modern Amenities",
    ],
  },
  {
    id: 2,
    name: "Interior",
    img: services_2,
    description: "Elegant interior spaces",
    title: "Luxury Office Complex",
    fullDescription:
      "An elegant office complex featuring sophisticated interior design that creates inspiring work environments. The design emphasizes natural light, open spaces, and premium finishes.",
    location: "Zamalek, Cairo",
    year: "2023",
    architect: "TEO Design Team",
    area: "8,500 sqm",
    client: "Corporate Client",
    category: "Commercial",
    images: [services_2, services_1, services_4, services_3],
    features: [
      "Premium Finishes",
      "Open Plan Layout",
      "Natural Lighting",
      "Collaborative Spaces",
      "Executive Suites",
    ],
  },
  {
    id: 3,
    name: "Planning",
    img: services_3,
    description: "Strategic project planning",
    title: "Urban Development Project",
    fullDescription:
      "A comprehensive urban planning project that reimagines city living. This development integrates residential, commercial, and recreational spaces in a cohesive master plan.",
    location: "6th October City",
    year: "2024",
    architect: "TEO Architecture",
    area: "25,000 sqm",
    client: "Government Entity",
    category: "Mixed Use",
    images: [services_3, services_1, services_2, services_4],
    features: [
      "Master Planning",
      "Infrastructure Design",
      "Green Spaces",
      "Public Amenities",
      "Traffic Solutions",
    ],
  },
  {
    id: 4,
    name: "Exterior",
    img: services_4,
    description: "Stunning exterior designs",
    title: "Contemporary Villa Collection",
    fullDescription:
      "A collection of contemporary villas featuring striking exterior designs that blend modern aesthetics with local architectural traditions. Each villa is uniquely designed while maintaining cohesive design language.",
    location: "North Coast, Egypt",
    year: "2023",
    architect: "Ahmed Abdel Mohaimen",
    area: "12,000 sqm",
    client: "Private Developer",
    category: "Residential",
    images: [services_4, services_3, services_1, services_2],
    features: [
      "Contemporary Facades",
      "Outdoor Living",
      "Privacy Design",
      "Landscape Integration",
      "Premium Materials",
    ],
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const namesRef = useRef([]);
  const imageRef = useRef(null);
  const modalRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Animate names only once on mount
  useEffect(() => {
    if (namesRef.current.length) {
      gsap.fromTo(
        namesRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  // Animate image on change with better performance
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeIndex]);

  // Modal animation
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isModalOpen]);

  const handleProjectHover = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0); // Reset to first image
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }, []);

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
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
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
          setIsModalOpen(false);
          setSelectedProject(null);
          setCurrentImageIndex(0);
          setIsAutoPlay(false);
          setIsZoomed(false);
          document.body.style.overflow = "unset"; // Restore scrolling
        },
      });
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen && selectedProject) {
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
            if (!isZoomed) {
              toggleAutoPlay();
            }
            break;
          case "z":
          case "Z":
            if (!isZoomed) {
              toggleZoom();
            }
            break;
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isModalOpen,
    selectedProject,
    closeModal,
    prevImage,
    nextImage,
    isZoomed,
    toggleAutoPlay,
    toggleZoom,
  ]);

  return (
    <section
      id="projects"
      className="flex flex-col md:flex-row gap-8 items-center md:items-stretch py-20 px-8"
    >
      {/* Left side image (2/3 width) */}
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <img
            ref={imageRef}
            src={projects[activeIndex].img}
            alt={projects[activeIndex].name}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Right side project list (1/3 width, centered) */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center gap-6 text-center text-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-main mb-8 uppercase tracking-wide">
          Our Projects
        </h2>
        {projects.map((project, index) => (
          <div
            key={index}
            className="text-center group cursor-pointer"
            onMouseEnter={() => handleProjectHover(index)}
            onClick={() => handleProjectClick(project)}
          >
            <p
              ref={(el) => {
                if (el) namesRef.current[index] = el;
              }}
              className={`transition-all duration-300 text-xl ${
                activeIndex === index
                  ? "text-main font-semibold scale-105"
                  : "text-main/70 hover:text-main hover:scale-105"
              }`}
            >
              {project.name}
            </p>
            <p
              className={`text-sm text-gray-400 mt-1 transition-opacity duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-main/20 via-transparent to-main/10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(142,120,97,0.1),transparent_50%)]"></div>
          </div>

          <div
            ref={modalRef}
            className="bg-black/95 border border-main/20 rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl backdrop-blur-sm relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 100%)",
            }}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-black/90 via-gray-900/50 to-black/90 border-b border-main/30 px-8 py-6 flex justify-between items-center backdrop-blur-sm">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 bg-main rounded-full animate-pulse"></div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </h2>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-main uppercase tracking-wider text-sm font-semibold">
                    {selectedProject.category}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400 text-xs">
                      {selectedProject.year}
                    </span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-400 text-xs">
                      {selectedProject.location}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-all duration-300 p-3 hover:bg-main/20 rounded-full z-10 group border border-transparent hover:border-main/30"
                aria-label="Close modal"
              >
                <X
                  size={24}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Images (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Main Image Carousel */}
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-2xl group bg-gray-900/50 cursor-pointer"
                    onClick={toggleZoom}
                  >
                    {/* Loading overlay */}
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
                      className={`w-full h-96 md:h-[500px] object-cover transition-all duration-700 ease-out ${
                        isImageLoading
                          ? "opacity-50 scale-105"
                          : "opacity-100 scale-100"
                      }`}
                    />

                    {/* Removed overlays for cleaner image display */}

                    {/* Image counter with progress */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <span className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-main/30">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images.length}
                      </span>
                      {/* Progress dots */}
                      <div className="flex gap-1">
                        {selectedProject.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? "bg-main scale-125"
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Auto-play controls */}
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={toggleAutoPlay}
                        className="bg-black/80 backdrop-blur-sm text-white p-2 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300 group"
                        aria-label={
                          isAutoPlay ? "Pause slideshow" : "Play slideshow"
                        }
                      >
                        {isAutoPlay ? (
                          <Pause
                            size={16}
                            className="group-hover:scale-110 transition-transform"
                          />
                        ) : (
                          <Play
                            size={16}
                            className="group-hover:scale-110 transition-transform ml-0.5"
                          />
                        )}
                      </button>
                    </div>

                    {/* Enhanced navigation arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-main/80 hover:scale-110 border border-main/30"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-main/80 hover:scale-110 border border-main/30"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Zoom button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={toggleZoom}
                        className="bg-black/80 backdrop-blur-sm text-white p-2 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300 group"
                        aria-label={isZoomed ? "Exit zoom" : "Zoom image"}
                      >
                        {isZoomed ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                            <line x1="8" y1="8" x2="16" y2="16"></line>
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {selectedProject.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer bg-gray-800/50 border border-transparent hover:border-main/50 transition-all duration-300"
                        onClick={() => selectImage(index)}
                      >
                        <img
                          src={image}
                          alt={`${selectedProject.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-main/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {index === currentImageIndex && (
                          <>
                            <div className="absolute inset-0 border-2 border-main shadow-lg shadow-main/30"></div>
                            <div className="absolute top-1 right-1 w-3 h-3 bg-main rounded-full animate-pulse"></div>
                          </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Project Details (1/3 width) */}
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <div className="w-1 h-6 bg-main mr-3"></div>
                      Project Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg">
                      <MapPin className="text-main flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Location
                        </p>
                        <p className="font-medium text-white text-sm">
                          {selectedProject.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg">
                      <Calendar className="text-main flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Year
                        </p>
                        <p className="font-medium text-white text-sm">
                          {selectedProject.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg">
                      <User className="text-main flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Architect
                        </p>
                        <p className="font-medium text-white text-sm">
                          {selectedProject.architect}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg">
                      <div className="w-5 h-5 bg-main rounded flex-shrink-0"></div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Area
                        </p>
                        <p className="font-medium text-white text-sm">
                          {selectedProject.area}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg">
                      <div className="w-5 h-5 bg-main/20 border border-main rounded flex-shrink-0"></div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Client
                        </p>
                        <p className="font-medium text-white text-sm">
                          {selectedProject.client}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <div className="w-1 h-6 bg-main mr-3"></div>
                      Key Features
                    </h3>
                    <div className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-900/30 rounded transition-colors duration-200"
                        >
                          <ArrowRight
                            className="text-main flex-shrink-0"
                            size={16}
                          />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Overlay */}
      {isZoomed && selectedProject && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedProject.images[currentImageIndex]}
              alt={`${selectedProject.title} - Zoomed`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Zoom controls */}
            <button
              onClick={toggleZoom}
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300 group"
              aria-label="Exit zoom"
            >
              <X
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>

            {/* Navigation in zoom */}
            {selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white p-3 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300 group"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white p-3 rounded-full border border-main/30 hover:bg-main/20 transition-all duration-300 group"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image counter in zoom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-main/30">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
