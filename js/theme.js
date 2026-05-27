(function () {
  var KEY = "hb-theme";
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initial = stored || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", initial);

  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    try { localStorage.setItem(KEY, mode); } catch (e) {}
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", mode === "dark" ? "Switch to light theme" : "Switch to dark theme");
      btn.textContent = mode === "dark" ? "☀" : "☾";
    }
  }

  window.HBTheme = {
    current: function () { return document.documentElement.getAttribute("data-theme"); },
    toggle: function () { setTheme(this.current() === "dark" ? "light" : "dark"); },
    set: setTheme
  };

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    setTheme(initial);
    btn.addEventListener("click", function () { window.HBTheme.toggle(); });
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (!stored) setTheme(e.matches ? "dark" : "light");
    });
  }
})();
