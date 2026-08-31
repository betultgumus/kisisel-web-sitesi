import { useId } from "react";
import type { IconType } from "react-icons";

const GEMINI_PATH = "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81";

export const GeminiBrandIcon: IconType = ({ title, ...props }) => {
  const gradientId = `gemini-brand-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={title} {...props}>
      <defs>
        <linearGradient id={gradientId} x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4E82EE" />
          <stop offset="0.54" stopColor="#8B6FD0" />
          <stop offset="1" stopColor="#D96B98" />
        </linearGradient>
      </defs>
      <path d={GEMINI_PATH} fill={`url(#${gradientId})`} />
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
