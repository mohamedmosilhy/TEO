import React, { useEffect } from "react";
import TEOSpecialties from "../components/TEOSpecialties";

const TEOSpecialtiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <TEOSpecialties />
    </div>
  );
};

export default TEOSpecialtiesPage;
