"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-config";

const themeEvent = "portfolio-theme-change";

function getTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function serverTheme(): "light" | "dark" {
  return "light";
}

function subscribe(notify: () => void) {
  function syncStorage(event: StorageEvent) {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    notify();
  }
  window.addEventListener(themeEvent, notify);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(themeEvent, notify);
    window.removeEventListener("storage", syncStorage);
  };
}

export function toggleTheme() {
  const theme = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* Theme remains usable when storage is blocked. */ }
  window.dispatchEvent(new Event(themeEvent));
}

export default function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, serverTheme);
}
