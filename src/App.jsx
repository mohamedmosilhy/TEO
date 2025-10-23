import { StrictMode, Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { Services } from "./components/Services";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Story from "./components/Story";
import Contact from "./components/Contact";

// Lazy load pages for better performance
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const TEOSpecialtiesPage = lazy(() => import("./pages/TEOSpecialtiesPage"));
const TeoStoryPage = lazy(() => import("./pages/TeoStoryPage"));

// Import loading component
import { PageLoading } from "./components/Loading";

// Layout component for pages that need Navbar + Footer
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* Render nested routes */}
    <Footer />
  </>
);

// Home page component
const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Contact />
  </>
);

function App() {
  return (
    <StrictMode>
      {/* TODO: Add basename for GitHub Pages basename="/TEO" */}
      <BrowserRouter >
        <Routes>
          {/* Main layout wraps all pages */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="projects"
              element={
                <Suspense fallback={<PageLoading />}>
                  <ProjectsPage />
                </Suspense>
              }
            />
            <Route
              path="teo-specialties"
              element={
                <Suspense fallback={<PageLoading />}>
                  <TEOSpecialtiesPage />
                </Suspense>
              }
            />
            <Route
              path="story"
              element={
                <Suspense fallback={<PageLoading />}>
                  <TeoStoryPage />
                </Suspense>
              }
            />
          </Route>

          {/* Redirect any unknown path to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
