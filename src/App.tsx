import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

const Education = lazy(() => import("./pages/Education"));
const Experience = lazy(() => import("./pages/Experience"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Gallery = lazy(() => import("./pages/Gallery"));

export function App() {
  return (
    <Suspense fallback={<div className="route-loader" aria-label="Sayfa yükleniyor" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Suspense>
  );
}
