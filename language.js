/* Language + theme. Preference is stored in localStorage. */
function applyLanguage() {
  document.documentElement.lang = PS.lang() === "vi" ? "vi" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = PS.t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = PS.t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", PS.t(el.dataset.i18nAria));
  });
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === PS.lang());
  });
}
function setLanguage(lang) {
  localStorage.setItem("ps_lang", lang);
  applyLanguage();
  if (typeof renderPage === "function") renderPage();
  PS.toast(PS.t("langChanged"));
}
function applyTheme() {
  const theme = localStorage.getItem("ps_theme") || "dark";
  document.documentElement.dataset.theme = theme;
  const btn = document.querySelector("[data-theme-toggle]");
  if (btn) btn.textContent = theme === "dark" ? "☀" : "☾";
}
function toggleTheme() {
  const next = (localStorage.getItem("ps_theme") || "dark") === "dark" ? "light" : "dark";
  localStorage.setItem("ps_theme", next);
  applyTheme();
}
