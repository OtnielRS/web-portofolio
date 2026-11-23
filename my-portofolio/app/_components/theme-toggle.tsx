"use client";

import useTheme, { toggleTheme } from "./use-theme";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const theme = useTheme();
  return (
    <button
      type="button"
      className={compact ? "theme-toggle" : "scene-theme-toggle"}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      <svg className="theme-icon-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>
      </svg>
      <svg className="theme-icon-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>
      </svg>
      {!compact && <><span className="theme-icon-light">Lights off</span><span className="theme-icon-dark">Lights on</span></>}
    </button>
  );
}
