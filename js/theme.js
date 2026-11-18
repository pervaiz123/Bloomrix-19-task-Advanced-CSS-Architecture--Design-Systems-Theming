(function () {
  const STORAGE_KEY = "ds-theme";
  const root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      toggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    applyTheme(stored || getSystemTheme());
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || getSystemTheme();
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next); // only save on explicit user action
    applyTheme(next);
  }

  // Listen for system preference changes (only when user has not set a preference)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });

  // Initialize
  initTheme();

  // Expose
  window.DSTheme = { toggleTheme, applyTheme };
})();
