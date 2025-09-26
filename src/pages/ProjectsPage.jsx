import React, { useEffect } from "react";
import Projects from "../components/Projects";

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Projects />
    </div>
  );
};

export default ProjectsPage;
