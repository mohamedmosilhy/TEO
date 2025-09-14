import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Services } from "./components/Services";
import { Logos } from "./components/Logos";
import Projects from "./components/Projects";
import Materials from "./components/Materials";
import Testimonials from "./components/Testimonials";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <Hero />
    <Services />
    <Logos />
    <Projects />
    <Materials />
    <Testimonials />
  </StrictMode>
);
