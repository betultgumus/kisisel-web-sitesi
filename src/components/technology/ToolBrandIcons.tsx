import { useId } from "react";
import type { IconType } from "react-icons";

// Geometry follows the current Spark SVG served by Google's official Gemini site.
const GEMINI_SPARK_PATH = "M164.93 86.68c-13.56-5.84-25.42-13.84-35.6-24.01-10.17-10.17-18.18-22.04-24.01-35.6-2.23-5.19-4.04-10.54-5.42-16.02C99.45 9.26 97.85 8 96 8s-3.45 1.26-3.9 3.05c-1.38 5.48-3.18 10.81-5.42 16.02-5.84 13.56-13.84 25.43-24.01 35.6-10.17 10.16-22.04 18.17-35.6 24.01-5.19 2.23-10.54 4.04-16.02 5.42C9.26 92.55 8 94.15 8 96s1.26 3.45 3.05 3.9c5.48 1.38 10.81 3.18 16.02 5.42 13.56 5.84 25.42 13.84 35.6 24.01 10.17 10.17 18.18 22.04 24.01 35.6 2.24 5.2 4.04 10.54 5.42 16.02A4.03 4.03 0 0 0 96 184c1.85 0 3.45-1.26 3.9-3.05 1.38-5.48 3.18-10.81 5.42-16.02 5.84-13.56 13.84-25.42 24.01-35.6 10.17-10.17 22.04-18.18 35.6-24.01 5.2-2.24 10.54-4.04 16.02-5.42A4.03 4.03 0 0 0 184 96c0-1.85-1.26-3.45-3.05-3.9-5.48-1.38-10.81-3.18-16.02-5.42";

export const GeminiBrandIcon: IconType = ({ title, ...props }) => {
  const instanceId = useId().replace(/:/g, "");
  const verticalGradientId = `gemini-vertical-${instanceId}`;
  const yellowGradientId = `gemini-yellow-${instanceId}`;

  return (
    <svg viewBox="0 0 192 192" role="img" aria-label={title} {...props}>
      <defs>
        <linearGradient id={verticalGradientId} x1="96" y1="8" x2="96" y2="184" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#EA4335" />
          <stop offset="0.32" stopColor="#EA4335" />
          <stop offset="0.5" stopColor="#4285F4" />
          <stop offset="0.68" stopColor="#4285F4" />
          <stop offset="1" stopColor="#34A853" />
        </linearGradient>
        <radialGradient id={yellowGradientId} cx="8" cy="96" r="112" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBBC04" />
          <stop offset="0.24" stopColor="#FBBC04" stopOpacity="0.98" />
          <stop offset="0.72" stopColor="#FBBC04" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={GEMINI_SPARK_PATH} fill={`url(#${verticalGradientId})`} />
      <path d={GEMINI_SPARK_PATH} fill={`url(#${yellowGradientId})`} />
    </svg>
  );
};

export const PowerBiIcon: IconType = ({ title, ...props }) => (
  <svg viewBox="0 0 32 32" fill="none" role="img" aria-label={title} {...props}>
    <rect x="4" y="15" width="5.5" height="12" rx="2" fill="currentColor" opacity=".62" />
    <rect x="10.5" y="10" width="5.5" height="17" rx="2" fill="currentColor" opacity=".76" />
    <rect x="17" y="6" width="5.5" height="21" rx="2" fill="currentColor" opacity=".9" />
    <rect x="23.5" y="3" width="4.5" height="24" rx="2" fill="currentColor" />
  </svg>
);
