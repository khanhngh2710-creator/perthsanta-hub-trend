/* Shared header, footer, mobile menu. */
const NAV = [
  ["index.html", "navHome", "home"],
  ["series.html", "navSeries", "series"],
  ["series-trends.html", "navTrends", "trends"],
  ["events.html", "navEvents", "events"],
  ["hashtags.html", "navTags", "tags"],
  ["generator.html", "navGen", "gen"],
  ["analytics.html", "navAnalytics", "analytics"],
  ["guides.html", "navGuides", "guides"]
];
function mountChrome() {
  const p = PS.prefix();
  const page = document.body.dataset.page;
  const links = NAV.map(([href, key, id]) => `<a href="${p}${href}" class="${page === id ? "active" : ""}" data-i18n="${key}">${PS.t(key)}</a>`).join("");
  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="${p}index.html">
          <span class="brand-mark" aria-hidden="true">☀</span>
          <span><strong>PERTHSANTA</strong><span data-i18n="brandSub">${PS.t("brandSub")}</span></span>
        </a>
        <nav class="desktop-nav" aria-label="Primary">${links}</nav>
        <div class="header-tools">
          <button class="icon-btn" type="button" data-search-open data-i18n-aria="searchBtn" aria-label="${PS.t("searchBtn")}">⌕</button>
          <div class="lang-switch" role="group" aria-label="Language">
            <button type="button" data-lang="en">EN</button>
            <button type="button" data-lang="vi">VI</button>
          </div>
          <button class="icon-btn" type="button" data-theme-toggle data-i18n-aria="theme" aria-label="${PS.t("theme")}">☀</button>
          <button class="icon-btn menu-btn" type="button" data-menu data-i18n-aria="menu" aria-label="${PS.t("menu")}">☰</button>
        </div>
      </div>
      <div class="search-pop" id="search-pop">
        <input id="global-search" data-i18n-placeholder="search" placeholder="${PS.t("search")}" />
        <div class="search-results" id="search-results"></div>
      </div>
      <div class="menu-panel" id="menu-panel">${links}</div>`;
  }
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `<div class="wrap"><strong>PERTHSANTA HUB</strong><p data-i18n="disclaimer">${PS.t("disclaimer")}</p><p><a href="${p}guides.html#disclaimer" data-i18n="privacy">${PS.t("privacy")}</a></p></div>`;
  }
  const bottom = document.getElementById("bottom-nav");
  if (bottom) {
    const short = NAV.filter((n) => ["home", "series", "trends", "events", "gen"].includes(n[2]));
    bottom.innerHTML = short.map(([href, key, id]) => `<a href="${p}${href}" class="${page === id ? "active" : ""}"><strong>${id === "home" ? "⌂" : id === "series" ? "▣" : id === "trends" ? "↗" : id === "events" ? "◷" : "✎"}</strong><span data-i18n="${key}">${PS.t(key)}</span></a>`).join("");
  }
  document.querySelectorAll(".lang-switch button").forEach((btn) => btn.addEventListener("click", () => setLanguage(btn.dataset.lang)));
  document.querySelector("[data-theme-toggle]")?.addEventListener("click", toggleTheme);
  document.querySelector("[data-menu]")?.addEventListener("click", () => document.getElementById("menu-panel").classList.toggle("open"));
  document.querySelector("[data-search-open]")?.addEventListener("click", () => document.getElementById("search-pop").classList.toggle("open"));
  document.getElementById("global-search")?.addEventListener("input", (e) => runSearch(e.target.value));
  applyTheme();
  applyLanguage();
}
