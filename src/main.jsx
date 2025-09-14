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
import Story from "./components/Story";
import Contact from "./components/Contact";
import InstagramGallery from "./components/InstagramGallery";
import Footer from "./components/Footer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <Hero />
    <Services />
    <Logos />
    <Projects />
    <Materials />
    <Testimonials />
    <Story />
    <Contact />
    <InstagramGallery />
    <Footer />
  </StrictMode>
);
