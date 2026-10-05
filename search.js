/* Search across series, episodes, hashtags, events, and guides. */
function searchIndex() {
  const p = PS.prefix();
  const items = [];
  seriesData.forEach((s) => items.push({ type: "Series", title: s.title, href: `${p}series/${s.slug}.html`, text: s.description }));
  Object.values(episodeData).flat().forEach((ep) => {
    items.push({ type: "Episode", title: `${ep.seriesTitle} EP ${ep.number}`, href: `${p}episodes/episode.html?series=${ep.seriesId}&ep=${ep.number}`, text: ep.title });
  });
  hashtagData.forEach((h) => items.push({ type: "Hashtag", title: h.tag, href: `${p}hashtags.html`, text: h.description }));
  eventData.forEach((ev) => items.push({ type: "Event", title: ev.event, href: `${p}events.html`, text: `${ev.date} ${ev.artist}` }));
  [["X", "x"], ["Instagram", "instagram"], ["TikTok", "tiktok"], ["Facebook", "facebook"], ["YouTube", "youtube"]].forEach(([name, slug]) => {
    items.push({ type: "Guide", title: `${name} guide`, href: `${p}guides/${slug}.html`, text: name });
  });
  return items;
}
function runSearch(q) {
  const box = document.getElementById("search-results");
  if (!box) return;
  const query = q.trim().toLowerCase();
  if (!query) { box.innerHTML = ""; return; }
  const hits = searchIndex().filter((item) => `${item.title} ${item.text} ${item.type}`.toLowerCase().includes(query)).slice(0, 8);
  box.innerHTML = hits.length ? hits.map((h) => `<a href="${h.href}"><strong>${h.title}</strong><small>${h.type}</small></a>`).join("") : `<div class="empty">${PS.t("noResults")}</div>`;
}
