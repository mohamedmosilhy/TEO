import { memo } from "react";
import { projects, categories, types } from "../data/projectsData";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./projects/ProjectCard";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectModal from "./projects/ProjectModal";

const Projects = memo(() => {
  const {
    activeFilter,
    setActiveFilter,
    activeType,
    setActiveType,
    viewMode,
    setViewMode,
    showFilters,
    setShowFilters,
    selectedProject,
    isModalOpen,
    handleProjectClick,
    closeModal,
    filteredProjects,
    projectsRef,
  } = useProjects(projects);

  return (
    <section
      id="projects"
      className="min-h-screen bg-black text-white py-20 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-main mb-6 uppercase tracking-wide">
            Our Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our portfolio of innovative architectural solutions and
            design excellence
          </p>
        </div>

        {/* Filter Controls */}
        <ProjectFilters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeType={activeType}
          setActiveType={setActiveType}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          types={types}
          filteredCount={filteredProjects.length}
          totalCount={projects.length}
        />

        {/* Projects Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }`}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectsRef.current[index] = el)}
            >
              <ProjectCard
                project={project}
                viewMode={viewMode}
                onClick={handleProjectClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        selectedProject={selectedProject}
        onClose={closeModal}
      />
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
