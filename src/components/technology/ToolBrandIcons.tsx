import type { IconType } from "react-icons";

export const PowerBiIcon: IconType = ({ title, ...props }) => (
  <svg viewBox="0 0 32 32" fill="none" role="img" aria-label={title} {...props}>
    <rect x="4" y="15" width="5.5" height="12" rx="2" fill="currentColor" opacity=".62" />
    <rect x="10.5" y="10" width="5.5" height="17" rx="2" fill="currentColor" opacity=".76" />
    <rect x="17" y="6" width="5.5" height="21" rx="2" fill="currentColor" opacity=".9" />
    <rect x="23.5" y="3" width="4.5" height="24" rx="2" fill="currentColor" />
  </svg>
);
