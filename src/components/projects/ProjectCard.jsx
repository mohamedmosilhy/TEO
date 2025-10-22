import { memo } from "react";

/**
 * ProjectCard component for displaying project information
 * Supports both grid and list view modes
 */
const ProjectCard = memo(({ project, viewMode, onClick }) => {
  // Grid view layout
  if (viewMode === "grid") {
    return (
      <div
        className="group cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => onClick(project)}
      >
        <div className="relative overflow-hidden shadow-2xl">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-main/20 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <span className="bg-main/20 px-3 py-1 rounded-full">
                {project.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view layout
  return (
    <div
      className="flex gap-6 p-6 bg-gray-900/30 rounded-2xl hover:bg-gray-900/50 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(project)}
    >
      <img
        src={project.img}
        alt={project.title}
        className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-3">{project.description}</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="bg-main/20 px-3 py-1 rounded-full">
            {project.category}
          </span>
          <span className="bg-main/20 px-3 py-1 rounded-full">
            {project.type}
          </span>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
