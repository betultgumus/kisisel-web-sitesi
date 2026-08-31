import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./styles/globals.css";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

if (window.location.hash) {
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

window.scrollTo({ top: 0, left: 0, behavior: "auto" });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
