function initJeanTheme() {
  const root = document.documentElement;
  const palette = {
    dark: {
      "--bg-page": "#170904",
      "--bg-card": "#2e1309",
      "--border-card": "rgba(251, 146, 60, 0.35)",
      "--text-main": "#fffbeb",
      "--text-muted": "#fdba74",
      "--accent": "#f97316",
      "--btn-bg": "#421b0d",
      "--btn-text": "#fffbeb"
    },
    light: {
      "--bg-page": "#fffbeb",
      "--bg-card": "#fef3c7",
      "--border-card": "rgba(124, 45, 18, 0.3)",
      "--text-main": "#7c2d12",
      "--text-muted": "#b45309",
      "--accent": "#d97706",
      "--btn-bg": "#fde68a",
      "--btn-text": "#7c2d12"
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
  document.addEventListener("DOMContentLoaded", initJeanTheme);
} else {
  initJeanTheme();
}