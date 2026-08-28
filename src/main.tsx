import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { MouseProvider } from "./providers/MouseProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MouseProvider>
          <App />
        </MouseProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
