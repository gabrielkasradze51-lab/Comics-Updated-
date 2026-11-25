function initRioTheme() {
  const root = document.documentElement;
  const palette = {
    dark: {
      "--bg-page": "#05140e",
      "--bg-card": "#0c291e",
      "--border-card": "rgba(52, 211, 153, 0.35)",
      "--text-main": "#ecfdf5",
      "--text-muted": "#6ee7b7",
      "--accent": "#10b981",
      "--btn-bg": "#0f3828",
      "--btn-text": "#ecfdf5"
    },
    light: {
      "--bg-page": "#ecfdf5",
      "--bg-card": "#d1fae5",
      "--border-card": "rgba(6, 78, 59, 0.3)",
      "--text-main": "#064e3b",
      "--text-muted": "#047857",
      "--accent": "#059669",
      "--btn-bg": "#a7f3d0",
      "--btn-text": "#064e3b"
    }
  };

  mountThemeToggle(root, palette);
}

function mountThemeToggle(root, palette) {
  const oldBar = document.getElementById("top-theme-bar");
  if (oldBar) oldBar.remove();

  const topBar = document.createElement("div");
  topBar.id = "top-theme-bar";
  topBar.style.cssText = "position:fixed;top:12px;right:16px;z-index:99999;display:flex;align-items:center;";

  const toggleBtn = document.createElement("button");
  toggleBtn.id = "theme-toggle";
  toggleBtn.type = "button";
  toggleBtn.style.cssText = "cursor:pointer;border-radius:999px;padding:8px 15px;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:600;line-height:1;box-shadow:0 6px 18px rgba(0,0,0,0.35);transition:transform 0.2s ease,background 0.3s ease,color 0.3s ease;";

  topBar.appendChild(toggleBtn);
  document.body.prepend(topBar);

  const applyTheme = (theme) => {
    const mode = theme === "light" ? "light" : "dark";
    const vars = palette[mode];
    root.setAttribute("data-theme", mode);
    localStorage.setItem("tshrafne-theme", mode);
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    toggleBtn.style.backgroundColor = vars["--btn-bg"];
    toggleBtn.style.color = vars["--btn-text"];
    toggleBtn.style.border = `1px solid ${vars["--border-card"]}`;
    document.body.style.backgroundColor = vars["--bg-page"];
    document.body.style.color = vars["--text-main"];
    document.body.style.transition = "background-color 0.35s ease, color 0.35s ease";
    toggleBtn.textContent = mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
  };

  applyTheme(localStorage.getItem("tshrafne-theme") || "dark");
  toggleBtn.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRioTheme);
} else {
  initRioTheme();
}