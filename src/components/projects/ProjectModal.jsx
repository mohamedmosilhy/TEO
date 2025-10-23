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
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  // Refs
  const modalRef = useRef(null);
  const autoPlayRef = useRef(null);
  const videoRef = useRef(null);
  const isTabVisible = useRef(true);
  const transitionTimeoutRef = useRef(null);

  // ==================== UTILITY FUNCTIONS ====================

  /**
   * Detects if a media file is a video or image based on file extension
   */
  const getMediaType = (url) => {
    const ext = url.split(".").pop().toLowerCase();
    return ["mp4", "webm", "ogg"].includes(ext) ? "video" : "image";
  };

  // ==================== NAVIGATION FUNCTIONS ====================

  /**
   * Navigate to next media item
   */
  const nextItem = useCallback(() => {
    if (selectedProject) {
      setIsLoading(true);
      setCurrentIndex((prev) =>
        prev === selectedProject.media.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [selectedProject]);

  /**
   * Navigate to previous media item
   */
  const prevItem = useCallback(() => {
    if (selectedProject) {
      setIsLoading(true);
      setCurrentIndex((prev) =>
        prev === 0 ? selectedProject.media.length - 1 : prev - 1
      );
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [selectedProject]);

  /**
   * Jump to specific media item by index
   */
  const selectItem = (index) => {
    setIsLoading(true);
    setCurrentIndex(index);
    setTimeout(() => setIsLoading(false), 300);
  };

  /**
   * Toggle zoom mode for images
   */
  const toggleZoom = () => setIsZoomed((prev) => !prev);

  /**
   * Toggle auto-play mode
   */
  const toggleAutoPlay = () => setIsAutoPlay((prev) => !prev);

  // ==================== AUTO-PLAY LOGIC ====================

  /**
   * Handles auto-play for both images and videos
   */
  useEffect(() => {
    if (!isAutoPlay || !selectedProject?.media?.length) return;

    const currentType = getMediaType(selectedProject.media[currentIndex]);
    const isLastItem = currentIndex === selectedProject.media.length - 1;

    if (currentType === "image") {
      if (isLastItem) {
        // Last image - stop auto-play after delay
        autoPlayRef.current = setTimeout(() => {
          setIsAutoPlay(false);
        }, 3000);
      } else {
        // Auto-advance images every 3 seconds
        autoPlayRef.current = setInterval(nextItem, 3000);
      }
    } else if (currentType === "video") {
      // For videos, we'll handle auto-advance in the video event handlers
      clearInterval(autoPlayRef.current);
      // Auto-play the video when it loads
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }

    return () => {
      clearInterval(autoPlayRef.current);
      clearTimeout(autoPlayRef.current);
    };
  }, [isAutoPlay, nextItem, selectedProject, currentIndex]);

  /**
   * Handle video auto-play when current media changes
   */
  useEffect(() => {
    if (selectedProject?.media?.length && isAutoPlay) {
      const currentType = getMediaType(selectedProject.media[currentIndex]);
      if (currentType === "video" && videoRef.current) {
        // Small delay to ensure video element is ready
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }, 100);
      }
    }
  }, [currentIndex, selectedProject, isAutoPlay]);

  // ==================== VIDEO EVENT HANDLERS ====================

  /**
   * Handle video end event with smooth transition
   */
  const handleVideoEnd = useCallback(() => {
    if (isAutoPlay && selectedProject?.media?.length > 1) {
      const isLastItem = currentIndex === selectedProject.media.length - 1;
      if (isLastItem) {
        // Last video finished - stop auto-play
        setIsAutoPlay(false);
      } else {
        setIsVideoLoading(true);
        transitionTimeoutRef.current = setTimeout(() => {
          nextItem();
          setIsVideoLoading(false);
        }, 800);
      }
    } else if (isAutoPlay && selectedProject?.media?.length === 1) {
      // Last video finished - stop auto-play
      setIsAutoPlay(false);
    }
  }, [isAutoPlay, nextItem, selectedProject, currentIndex]);

  /**
   * Handle video load event
   */
  const handleVideoLoad = useCallback(() => {
    if (videoRef.current && isAutoPlay) {
      videoRef.current.play().catch(() => {});
    }
  }, [isAutoPlay]);

  /**
   * Update video progress bar
   */
  const handleVideoTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
    }
  }, []);

  /**
   * Handle video metadata loaded
   */
  const handleVideoLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setIsVideoLoading(false);
    }
  }, []);

  /**
   * Handle video load start
   */
  const handleVideoLoadStart = useCallback(() => {
    setIsVideoLoading(true);
  }, []);

  /**
   * Handle video can play
   */
  const handleVideoCanPlay = useCallback(() => {
    setIsVideoLoading(false);
  }, []);

  // ==================== MODAL MANAGEMENT ====================

  /**
   * Close modal with cleanup and animation
   */
  const closeModal = useCallback(() => {
    // Clear intervals
    clearInterval(autoPlayRef.current);
    clearTimeout(transitionTimeoutRef.current);
    setIsVideoLoading(false);
    setVideoProgress(0);
    setVideoDuration(0);

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
          setIsAutoPlay(true);
          setIsZoomed(false);
          document.body.style.overflow = "unset";
        },
      });
    }
  }, [onClose]);

  // ==================== MODAL EFFECTS ====================

  /**
   * Animate modal entrance
   */
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  /**
   * Initialize modal state when opened
   */
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsAutoPlay(true);
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
                    className={`w-full max-h-[70vh] object-contain transition-all duration-700 ${
                      isLoading
                        ? "opacity-50 scale-105"
                        : "opacity-100 scale-100"
                    }`}
                  />
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={currentMedia}
                      controls
                      autoPlay
                      muted
                      loop={false}
                      onEnded={handleVideoEnd}
                      onLoadedData={handleVideoLoad}
                      onTimeUpdate={handleVideoTimeUpdate}
                      onLoadedMetadata={handleVideoLoadedMetadata}
                      onLoadStart={handleVideoLoadStart}
                      onCanPlay={handleVideoCanPlay}
                      onPlay={() => {
                        // Video started playing
                      }}
                      onPause={() => {
                        // Video paused
                      }}
                      className={`w-full max-h-[70vh] object-contain bg-black transition-all duration-500 ${
                        isVideoLoading
                          ? "opacity-70 scale-105"
                          : "opacity-100 scale-100"
                      }`}
                    />

                    {/* Video Loading Overlay */}
                    {isVideoLoading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-main/30 border-t-main rounded-full animate-spin"></div>
                          <span className="text-white text-sm">
                            Loading video...
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Custom Video Progress Bar */}
                    {videoDuration > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                        <div
                          className="h-full bg-main transition-all duration-300"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm px-3 py-1 bg-black/60 rounded-full">
                      {currentIndex + 1} / {selectedProject.media.length}
                    </span>
                    {currentType === "video" && videoDuration > 0 && (
                      <span className="text-white text-xs px-2 py-1 bg-black/40 rounded">
                        {Math.floor(videoRef.current?.currentTime || 0)}s /{" "}
                        {Math.floor(videoDuration)}s
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleAutoPlay}
                      className={`bg-black/70 text-white p-2 rounded-full hover:bg-main/20 transition-all duration-200 ${
                        isAutoPlay ? "bg-main/30" : ""
                      }`}
                      title={isAutoPlay ? "Pause Auto-play" : "Start Auto-play"}
                    >
                      {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    {currentType === "image" && (
                      <button
                        onClick={toggleZoom}
                        className="bg-black/70 text-white p-2 rounded-full hover:bg-main/20 transition-all duration-200"
                        title="Zoom Image"
                      >
                        <ZoomIn size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Enhanced Navigation */}
                <button
                  onClick={prevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-main/30 hover:scale-110"
                  title="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-main/30 hover:scale-110"
                  title="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Enhanced Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProject.media.map((item, index) => {
                  const type = getMediaType(item);
                  return (
                    <div
                      key={index}
                      onClick={() => selectItem(index)}
                      className={`min-w-[90px] h-[70px] overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                        currentIndex === index
                          ? "border-main shadow-lg shadow-main/30"
                          : "border-transparent hover:border-main/50"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        {type === "image" ? (
                          <img
                            src={item}
                            alt=""
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <video
                              src={item}
                              muted
                              className="w-full h-full object-cover"
                              preload="metadata"
                              onLoadedData={(e) => {
                                // Set video to first frame for thumbnail
                                e.target.currentTime = 1;
                              }}
                            />
                            {/* Video Play Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors duration-200">
                              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                <Play
                                  size={14}
                                  className="text-gray-800 ml-0.5"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Media Type Indicator */}
                        <div className="absolute top-1 right-1">
                          {type === "video" ? (
                            <div className="w-5 h-5 bg-black/60 rounded-full flex items-center justify-center">
                              <Play size={8} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 bg-black/60 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-sm" />
                            </div>
                          )}
                        </div>
                      </div>
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
