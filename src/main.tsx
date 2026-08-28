import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { MouseProvider } from "./providers/MouseProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MouseProvider>
        <App />
      </MouseProvider>
    </ThemeProvider>
  </StrictMode>,
);
