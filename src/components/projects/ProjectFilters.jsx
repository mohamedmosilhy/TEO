import { memo } from "react";
import { Grid3X3, List } from "lucide-react";

/**
 * ProjectFilters component for filtering and viewing projects
 * Provides category/type filters and view mode toggles
 */
const ProjectFilters = memo(
  ({
    activeFilter,
    setActiveFilter,
    activeType,
    setActiveType,
    viewMode,
    setViewMode,
    categories,
    types,
    filteredCount,
    totalCount,
  }) => {
    return (
      <div className="mb-12">
        {/* View Mode Toggle */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-main text-black"
                  : "bg-gray-800 text-gray-400"
              }`}
              title="Grid View"
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-main text-black"
                  : "bg-gray-800 text-gray-400"
              }`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Filter Options (Always Visible) */}
        <div className="bg-gray-900/50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-main mb-4">Category</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === category
                        ? "bg-main text-black"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h3 className="text-lg font-semibold text-main mb-4">Type</h3>
              <div className="flex flex-wrap gap-3">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeType === type
                        ? "bg-main text-black"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center">
          <p className="text-gray-400">
            Showing {filteredCount} of {totalCount} projects
          </p>
        </div>
      </div>
    );
  }
);

ProjectFilters.displayName = "ProjectFilters";

export default ProjectFilters;
