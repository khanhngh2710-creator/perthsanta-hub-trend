/* Small helpers used across pages. */
const PS = {
  prefix() {
    return document.body.dataset.depth === "1" ? "../" : "./";
  },
  t(key) {
    const lang = localStorage.getItem("ps_lang") || "en";
    return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  },
  lang() {
    return localStorage.getItem("ps_lang") || "en";
  },
  toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 1800);
  },
  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    PS.toast(PS.t("copied"));
  },
  favKey(type) {
    return `ps_fav_${type}`;
  },
  isFav(type, id) {
    return PS.getFavs(type).includes(id);
  },
  getFavs(type) {
    try { return JSON.parse(localStorage.getItem(PS.favKey(type)) || "[]"); } catch (e) { return []; }
  },
  toggleFav(type, id) {
    const list = PS.getFavs(type);
    const next = list.includes(id) ? list.filter((x) => x !== id) : list.concat(id);
    localStorage.setItem(PS.favKey(type), JSON.stringify(next));
    return next.includes(id);
  },
  recent(id) {
    const list = JSON.parse(localStorage.getItem("ps_recent") || "[]").filter((x) => x !== id);
    list.unshift(id);
    localStorage.setItem("ps_recent", JSON.stringify(list.slice(0, 8)));
  },
  qs() {
    return Object.fromEntries(new URLSearchParams(location.search));
  },
  todayISO() {
    const d = new Date();
    const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return z.toISOString().slice(0, 10);
  },
  eventDate(ev) {
    return new Date(`${ev.date}T${ev.time || "00:00"}:00+07:00`);
  }
};
