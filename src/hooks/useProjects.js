import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export const useProjects = (projects) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectsRef = useRef([]);

  // Filter projects based on active filters
  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      activeFilter === "All" || project.category === activeFilter;
    const typeMatch = activeType === "All" || project.type === activeType;
    return categoryMatch && typeMatch;
  });

  // Animate projects on mount and filter change
  useEffect(() => {
    const ctx = gsap.context(() => {
      projectsRef.current.forEach((project, i) => {
        if (!project) return;

        gsap.fromTo(
          project,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
          }
        );
      });
    });

    return () => ctx.revert();
  }, [filteredProjects]);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  return {
    // Filter state
    activeFilter,
    setActiveFilter,
    activeType,
    setActiveType,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,

    // Modal state
    selectedProject,
    isModalOpen,
    handleProjectClick,
    closeModal,

    // Computed values
    filteredProjects,
    projectsRef,
  };
};
