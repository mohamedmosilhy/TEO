import React, { useEffect } from "react";
import Story from "../components/Story";

const StoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Story />
    </div>
  );
};

export default StoryPage;
