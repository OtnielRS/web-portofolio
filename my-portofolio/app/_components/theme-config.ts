export const THEME_STORAGE_KEY = "portfolio-theme";

export const themeBootstrap = `(() => { try { const theme = localStorage.getItem('${THEME_STORAGE_KEY}') === 'dark' ? 'dark' : 'light'; document.documentElement.dataset.theme = theme; } catch { document.documentElement.dataset.theme = 'light'; } })();`;
