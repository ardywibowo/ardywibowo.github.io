(function () {
  const modes = {
    0: {
      icon: "fa-sun",
      label: "Theme: Light. Click for dark mode.",
      next: 1,
      selector: ".js-set-theme-light",
    },
    1: {
      icon: "fa-moon",
      label: "Theme: Dark. Click for automatic mode.",
      next: 2,
      selector: ".js-set-theme-dark",
    },
    2: {
      icon: "fa-adjust",
      label: "Theme: Automatic. Click for light mode.",
      next: 0,
      selector: ".js-set-theme-auto",
    },
  };

  function currentMode() {
    const mode = Number.parseInt(localStorage.getItem("wcTheme") || "2", 10);
    return Object.prototype.hasOwnProperty.call(modes, mode) ? mode : 2;
  }

  function setIcon(button, mode) {
    const state = modes[mode] || modes[2];
    const icon = button.querySelector("i");
    if (icon) {
      icon.className = `fas ${state.icon}`;
    }
    button.dataset.themeMode = String(mode);
    button.setAttribute("aria-label", state.label);
    button.setAttribute("title", state.label);
  }

  function applyTheme(mode) {
    const target = document.querySelector(modes[mode].selector);
    if (target) {
      target.click();
    }
  }

  function initThemeCycle() {
    const button = document.querySelector(".theme-cycle-toggle");
    if (!button) return;

    setIcon(button, currentMode());

    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextMode = modes[currentMode()].next;
      applyTheme(nextMode);
      setIcon(button, nextMode);
    });

    document.addEventListener("wcThemeChange", () => {
      setIcon(button, currentMode());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeCycle);
  } else {
    initThemeCycle();
  }
})();
