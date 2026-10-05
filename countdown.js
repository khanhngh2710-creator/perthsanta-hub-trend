/* Countdown for the next non-past demo/real event. */
function nextEvent() {
  const now = Date.now();
  return eventData
    .map((ev) => ({ ...ev, at: PS.eventDate(ev).getTime() }))
    .filter((ev) => ev.at > now)
    .sort((a, b) => a.at - b.at)[0] || null;
}
function paintCountdown(root) {
  if (!root) return;
  const ev = nextEvent();
  if (!ev) {
    root.innerHTML = `<h3>${PS.t("nextEvent")}</h3><p>${PS.t("noUpcoming")}</p>`;
    return;
  }
  const diff = Math.max(0, ev.at - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  root.innerHTML = `<p class="badge demo">${ev.demo ? PS.t("demoLabel") : ""}</p><h3>${ev.event}</h3><p class="muted">${ev.date} · ${ev.time} ${ev.timezone}</p><div class="count"><div><strong>${days}</strong>${PS.t("days")}</div><div><strong>${hours}</strong>${PS.t("hours")}</div><div><strong>${minutes}</strong>${PS.t("minutes")}</div><div><strong>${seconds}</strong>${PS.t("seconds")}</div></div>`;
}
function startCountdown() {
  const roots = document.querySelectorAll("[data-countdown]");
  const tick = () => document.querySelectorAll("[data-countdown]").forEach(paintCountdown);
  tick();
  if (!window.__psCountdown) {
    window.__psCountdown = setInterval(tick, 1000);
  }
}
