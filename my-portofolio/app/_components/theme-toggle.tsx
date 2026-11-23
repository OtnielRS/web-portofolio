"use client";

import useTheme, { toggleTheme } from "./use-theme";
import { useState } from "react";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const theme = useTheme();
  const [sunChange, setSunChange] = useState(0);
  return (
    <button
      type="button"
      className={compact ? "theme-toggle" : "scene-theme-toggle"}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => { toggleTheme(); setSunChange(count => count + 1); }}
    >
      {compact ? (
        <span key={sunChange} className={`solar-toggle-art${sunChange ? " solar-toggle-changed" : ""}`} aria-hidden="true">
          <span className="solar-toggle-flare" />
          <svg className="solar-toggle-sun" width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
            <g className="solar-toggle-rays" strokeLinecap="round">
              <path d="M16 2v4m0 20v4M2 16h4m20 0h4M6.1 6.1l2.8 2.8m14.2 14.2 2.8 2.8M6.1 25.9l2.8-2.8M23.1 8.9l2.8-2.8" />
            </g>
            <circle className="solar-toggle-core" cx="16" cy="16" r="6.5" />
          </svg>
          <svg className="solar-toggle-moon" width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M26.5 19.3A11.8 11.8 0 0 1 12.7 5.5 11.8 11.8 0 1 0 26.5 19.3Z" fill="currentColor" fillOpacity=".18" strokeLinejoin="round" />
          </svg>
        </span>
      ) : <>
      <svg className="theme-icon-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>
      </svg>
      <svg className="theme-icon-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>
      </svg>
      <span className="theme-icon-light">Lights off</span><span className="theme-icon-dark">Lights on</span>
      </>}
    </button>
  );
}
