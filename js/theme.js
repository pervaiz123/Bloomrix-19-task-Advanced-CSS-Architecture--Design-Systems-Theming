(function () {
  const STORAGE_KEY = "ds-theme";
  const root = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      toggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    }
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || getPreferredTheme();
    setTheme(current === "dark" ? "light" : "dark");
  }

  // Init
  setTheme(getPreferredTheme());

  // Listen for system changes only if no explicit preference
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Expose
  window.DSTheme = { setTheme, toggleTheme, getPreferredTheme };
})();
