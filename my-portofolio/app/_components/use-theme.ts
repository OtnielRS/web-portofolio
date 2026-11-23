"use client";

import { useSyncExternalStore } from "react";
import { THEME_MEDIA_QUERY, THEME_STORAGE_KEY } from "./theme-config";

const themeEvent = "portfolio-theme-change";

function getTheme(): "light" | "dark" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function serverTheme(): "light" | "dark" {
  return "light";
}

function subscribe(notify: () => void) {
  const systemTheme = window.matchMedia(THEME_MEDIA_QUERY);

  function syncSystemTheme() {
    if (document.documentElement.dataset.themePreference !== "system") return;
    document.documentElement.dataset.theme = systemTheme.matches ? "dark" : "light";
    notify();
  }

  function syncStorage(event: StorageEvent) {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    const preference = event.newValue === "dark" || event.newValue === "light" ? event.newValue : "system";
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.dataset.theme = preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;
    notify();
  }
  window.addEventListener(themeEvent, notify);
  window.addEventListener("storage", syncStorage);
  systemTheme.addEventListener("change", syncSystemTheme);
  syncSystemTheme();
  return () => {
    window.removeEventListener(themeEvent, notify);
    window.removeEventListener("storage", syncStorage);
    systemTheme.removeEventListener("change", syncSystemTheme);
  };
}

export function toggleTheme() {
  const theme = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = theme;
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* Theme remains usable when storage is blocked. */ }
  window.dispatchEvent(new Event(themeEvent));
}

export default function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, serverTheme);
}
