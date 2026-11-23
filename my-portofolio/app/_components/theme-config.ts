export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

export const themeBootstrap = `(() => {
  let saved;
  try { saved = localStorage.getItem('${THEME_STORAGE_KEY}'); } catch {}
  const preference = saved === 'dark' || saved === 'light' ? saved : 'system';
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme = preference === 'system'
    ? (window.matchMedia('${THEME_MEDIA_QUERY}').matches ? 'dark' : 'light')
    : preference;
})();`;
