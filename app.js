/* Page renderers. Content comes from /data, not hard-coded HTML. */
function favButton(type, id) {
  const on = PS.isFav(type, id);
  return `<button class="btn ghost small fav-btn" type="button" data-fav="${type}:${id}" aria-pressed="${on}">${on ? PS.t("favd") : PS.t("fav")}</button>`;
}
function bindFavs() {
  document.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.onclick = () => {
      const [type, id] = btn.dataset.fav.split(":");
      const on = PS.toggleFav(type, id);
      btn.setAttribute("aria-pressed", String(on));
      btn.textContent = on ? PS.t("favd") : PS.t("fav");
    };
  });
}
function progressLabel(pct) {
  if (pct >= 100) return PS.t("completed");
  if (pct >= 70) return PS.t("strong");
  if (pct > 0) return PS.t("active");
  return PS.t("notStarted");
}
function renderHome() {
  const root = document.getElementById("app");
  const today = PS.todayISO();
  const todayEvents = eventData.filter((ev) => ev.date === today);
  const upcoming = eventData.filter((ev) => PS.eventDate(ev).getTime() >= Date.now()).slice(0, 4);
  const trend = todayEvents[0];
  const campaign = analyticsData.campaign;
  const pct = Math.min(100, Math.round((campaign.current / campaign.target) * 100));
  root.innerHTML = `
    <section class="hero">
      <div>
        <p class="kicker" data-i18n="heroKicker">${PS.t("heroKicker")}</p>
        <h1>PERTHSANTA HUB</h1>
        <p class="lede" data-i18n="heroSub">${PS.t("heroSub")}</p>
        <div class="row">
          <a class="btn" href="${PS.prefix()}series.html" data-i18n="exploreSeries">${PS.t("exploreSeries")}</a>
          <a class="btn ghost" href="${PS.prefix()}series-trends.html" data-i18n="todaysTrends">${PS.t("todaysTrends")}</a>
        </div>
      </div>
    </section>
    <section class="section grid grid-2">
      <article class="card">
        <p class="badge">${PS.t("todayTrend")}</p>
        <p class="muted">${today}</p>
        ${trend ? `<p class="badge demo">${PS.t("demoLabel")}</p><h2>${trend.event}</h2><p class="hash">${trend.hashtag}</p><p>${trend.time} ${trend.timezone} · ${trend.platform}</p><button class="btn small" type="button" data-copy="${trend.hashtag}">${PS.t("copyHashtag")}</button>` : `<h2>${PS.t("noTrend")}</h2><p class="muted">${PS.t("addOfficial")}</p>`}
      </article>
      <article class="card" data-countdown></article>
    </section>
    <section class="section">
      <div class="section-head"><h2>${PS.t("fanProgress")}</h2><p>${PS.t("notRank")} · ${PS.t("demoLabel")}</p></div>
      <article class="card">
        <div class="row" style="justify-content:space-between"><strong>${campaign.label}</strong><span>${progressLabel(pct)} · ${pct}%</span></div>
        <div class="progress" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" role="progressbar"><span style="width:${pct}%"></span></div>
        <p class="muted">${campaign.current} / ${campaign.target}</p>
      </article>
    </section>
    <section class="section">
      <div class="section-head"><h2>${PS.t("upcoming")}</h2><a href="${PS.prefix()}events.html">${PS.t("open")}</a></div>
      <div class="grid grid-2">${upcoming.map(eventCard).join("") || `<p class="empty">${PS.t("noUpcoming")}</p>`}</div>
    </section>
    <section class="section">
      <div class="section-head"><h2>${PS.t("featured")}</h2></div>
      <div class="grid grid-2">${seriesData.map(seriesCard).join("")}</div>
    </section>
    <section class="section">
      <div class="section-head"><h2>${PS.t("quickTools")}</h2></div>
      <div class="grid grid-4">
        ${toolCard(PS.t("toolsHash"), "hashtags.html")}
        ${toolCard(PS.t("toolsGen"), "generator.html")}
        ${toolCard(PS.t("toolsGuide"), "guides.html")}
        ${toolCard(PS.t("toolsCal"), "events.html")}
      </div>
    </section>`;
}
function toolCard(label, href) {
  return `<a class="card" href="${PS.prefix()}${href}"><h3>${label}</h3><p class="muted">${PS.t("open")}</p></a>`;
}
function seriesCard(s) {
  return `<article class="card"><div class="cover"><span>${s.title}</span></div><p class="badge demo">${PS.t("demoLabel")}</p><h3>${s.title}</h3><p class="muted">${s.description}</p><p>${PS.t("episodes")}: ${s.episodes} · ${PS.t("status")}: ${s.status}</p><div class="row">${favButton("series", s.id)}<a class="btn small" href="${PS.prefix()}${s.slug}.html">${PS.t("open")}</a></div></article>`;
}
function eventCard(ev) {
  return `<article class="card"><p class="badge demo">${ev.demo ? PS.t("sampleEvent") : ev.status}</p><h3>${ev.event}</h3><p>${ev.date} · ${ev.time} ${ev.timezone}</p><p class="muted">${ev.artist} · ${ev.location} · ${ev.platform}</p><div class="row">${favButton("events", ev.id)}${ev.officialLink ? `<a class="btn small" href="${ev.officialLink}">Link</a>` : ""}</div></article>`;
}
function renderSeries() {
  document.getElementById("app").innerHTML = `<h1>${PS.t("navSeries")}</h1><p class="lede">${PS.t("addOfficial")}</p><div class="grid grid-2">${seriesData.map(seriesCard).join("")}</div>`;
}
function renderSeriesDetail(id) {
  const s = seriesData.find((x) => x.id === id);
  const eps = episodeData[id] || [];
  document.getElementById("app").innerHTML = `
    <p class="kicker">${s.title}</p>
    <h1>${s.title}</h1>
    <p class="badge demo">${PS.t("demoLabel")}</p>
    <p class="lede">${s.description}</p>
    <p>${PS.t("cast")}: ${s.cast}</p>
    <p>${PS.t("platform")}: ${s.platform}</p>
    <div class="row">${favButton("series", s.id)}<a class="btn ghost small" href="${PS.prefix()}series.html">${PS.t("backSeries")}</a></div>
    <div class="filters">
      <select id="status-filter" aria-label="Status"><option value="all">${PS.t("all")}</option><option>Demo data</option></select>
    </div>
    <div class="episode-list" id="ep-list">${eps.map(epRow).join("")}</div>`;
  document.getElementById("status-filter").onchange = (e) => {
    const val = e.target.value;
    document.getElementById("ep-list").innerHTML = eps.filter((ep) => val === "all" || ep.status === val).map(epRow).join("");
    bindFavs();
  };
}
function epRow(ep) {
  return `<article class="card ep-card"><div class="ep-num">${String(ep.number).padStart(2, "0")}</div><div><h3>${ep.title}</h3><p class="muted">${ep.date} · ${ep.status}</p><p class="hash">${ep.hashtags[0]}</p></div><div class="actions row">${favButton("episodes", `${ep.seriesId}-${ep.number}`)}<a class="btn small" href="${PS.prefix()}episode.html?series=${ep.seriesId}&ep=${ep.number}">${PS.t("viewEpisode")}</a></div></article>`;
}
function renderEpisode() {
  const q = PS.qs();
  const ep = (episodeData[q.series] || []).find((x) => String(x.number) === String(q.ep));
  const root = document.getElementById("app");
  if (!ep) { root.innerHTML = `<p class="empty">${PS.t("noResults")}</p>`; return; }
  PS.recent(`${ep.seriesId}-${ep.number}`);
  const series = seriesData.find((s) => s.id === ep.seriesId);
  root.innerHTML = `
    <p class="kicker">${ep.seriesTitle}</p>
    <h1>EP ${String(ep.number).padStart(2, "0")}</h1>
    <p class="badge demo">${PS.t("demoLabel")}</p>
    <h2>${ep.title}</h2>
    <p>${ep.date} · ${ep.time}</p>
    <article class="card"><h3>Synopsis</h3><p>${ep.synopsis}</p><h3>Characters</h3><p>${ep.characters}</p><h3>Key moments</h3><ul>${ep.moments.map((m) => `<li>${m}</li>`).join("")}</ul><h3>${PS.t("goal")}</h3><p>${ep.target}</p><p class="hash">${ep.hashtags.join(" ")}</p><p>${ep.campaign}</p><div class="row"><button class="btn small" type="button" data-copy="${ep.hashtags[0]}">${PS.t("copyHashtag")}</button><a class="btn small" href="${PS.prefix()}generator.html?series=${ep.seriesId}&tag=${encodeURIComponent(ep.hashtags[0])}">${PS.t("generate")}</a>${favButton("episodes", `${ep.seriesId}-${ep.number}`)}<a class="btn ghost small" href="${PS.prefix()}${series.slug}.html">${PS.t("backSeries")}</a></div></article>`;
}
function renderTrends() {
  const platforms = [
    ["X", "x", "#LoveYouTeacherEP10", "Increase early relevant replies and reposts."],
    ["Instagram", "instagram", "#LoveYouTeacher", "Like, comment, save, and story the official post."],
    ["TikTok", "tiktok", "#Heartbound", "Watch through, like, and comment naturally."],
    ["Facebook", "facebook", "#PerthSanta", "React, comment, and share the official post."],
    ["YouTube", "youtube", "#PerthSanta", "Watch, like, and leave one relevant comment."]
  ];
  document.getElementById("app").innerHTML = `<h1>${PS.t("navTrends")}</h1><p class="lede">${PS.t("notRank")}</p><div class="filters"><select id="pf" aria-label="Platform"><option value="all">${PS.t("all")}</option>${platforms.map((p) => `<option>${p[0]}</option>`).join("")}</select></div><div class="grid grid-2" id="pf-grid">${platforms.map(platformCard).join("")}</div>`;
  document.getElementById("pf").onchange = (e) => {
    const val = e.target.value;
    document.getElementById("pf-grid").innerHTML = platforms.filter((p) => val === "all" || p[0] === val).map(platformCard).join("");
    bindCopy();
  };
}
function platformCard(p) {
  return `<article class="card"><p class="badge">${p[0]}</p><h3>${PS.t("current")}</h3><p class="hash">${p[2]}</p><p>${PS.t("goal")}: ${p[3]}</p><p class="note">${PS.t("demoLabel")}</p><div class="row"><button class="btn small" type="button" data-copy="${p[2]}">${PS.t("copy")}</button><a class="btn ghost small" href="${PS.prefix()}${p[1]}.html">${PS.t("open")}</a></div></article>`;
}
function renderEvents() {
  const today = PS.todayISO();
  const groups = {
    today: eventData.filter((e) => e.date === today),
    upcoming: eventData.filter((e) => e.date > today),
    past: eventData.filter((e) => e.date < today)
  };
  document.getElementById("app").innerHTML = `
    <h1>${PS.t("navEvents")}</h1>
    <div class="card" data-countdown></div>
    <div class="tabs"><button class="btn ghost small active" data-tab="list">${PS.t("list")}</button><button class="btn ghost small" data-tab="cal">${PS.t("calendar")}</button></div>
    <div id="event-view"></div>`;
  const draw = (mode) => {
    const view = document.getElementById("event-view");
    if (mode === "cal") {
      const days = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(2026, 9, i + 1);
        const iso = d.toISOString().slice(0, 10);
        const hit = eventData.find((e) => e.date === iso);
        return `<div class="day ${hit ? "has" : ""}"><strong>${i + 1}</strong><div>${hit ? "DEMO" : ""}</div></div>`;
      });
      view.innerHTML = `<p class="note">${PS.t("demoLabel")} · October 2026 sample</p><div class="cal">${days.join("")}</div>`;
    } else {
      view.innerHTML = ["today", "upcoming", "past"].map((key) => `<section class="section"><h2>${PS.t(key === "today" ? "today" : key === "upcoming" ? "upcoming" : "past")}</h2><div class="grid grid-2">${groups[key].map(eventCard).join("") || `<p class="empty">—</p>`}</div></section>`).join("");
      bindFavs();
    }
  };
  draw("list");
  document.querySelectorAll("[data-tab]").forEach((btn) => btn.onclick = () => {
    document.querySelectorAll("[data-tab]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    draw(btn.dataset.tab);
  });
}
function renderHashtags() {
  const cats = [["current", "Current"], ["lyt", "Love You Teacher"], ["hb", "Heartbound"], ["perth", "Perth"], ["santa", "Santa"], ["ps", "PerthSanta"], ["events", "Events"]];
  document.getElementById("app").innerHTML = `<h1>${PS.t("navTags")}</h1><div class="row"><button class="btn small" type="button" id="copy-all">${PS.t("copyAll")}</button></div><div class="filters" id="tag-filters">${cats.map((c, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-cat="${c[0]}">${c[1]}</button>`).join("")}</div><div class="grid grid-2" id="tag-grid"></div>`;
  const draw = (cat) => {
    document.getElementById("tag-grid").innerHTML = hashtagData.filter((h) => h.category === cat).map((h) => `<article class="card"><p class="hash">${h.tag}</p><p>${h.description}</p><p class="muted">${h.platform} · ${h.status}</p><button class="btn small" type="button" data-copy="${h.tag}">${PS.t("copy")}</button></article>`).join("") || `<p class="empty">${PS.t("noResults")}</p>`;
    bindCopy();
  };
  draw("current");
  document.querySelectorAll("[data-cat]").forEach((btn) => btn.onclick = () => {
    document.querySelectorAll("[data-cat]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    draw(btn.dataset.cat);
  });
  document.getElementById("copy-all").onclick = () => PS.copy(hashtagData.map((h) => h.tag).join(" "));
}
function renderGenerator() {
  const q = PS.qs();
  const tags = hashtagData.map((h) => `<option ${q.tag === h.tag ? "selected" : ""}>${h.tag}</option>`).join("");
  document.getElementById("app").innerHTML = `
    <h1>${PS.t("navGen")}</h1>
    <p class="lede">One comment each click. Natural support only — no spam, no rank promises.</p>
    <form class="card grid grid-2" id="gen-form">
      <label class="field">Platform<select name="platform"><option>X</option><option>Instagram</option><option>TikTok</option><option>Facebook</option><option>YouTube</option></select></label>
      <label class="field">Series<select name="series"><option value="lyt" ${q.series === "lyt" ? "selected" : ""}>Love You Teacher</option><option value="hb" ${q.series === "hb" ? "selected" : ""}>Heartbound</option><option value="general">General PerthSanta</option></select></label>
      <label class="field">Tone<select name="tone"><option value="emotional">Emotional</option><option value="cute">Cute</option><option value="excited">Excited</option><option value="supportive">Supportive</option><option value="proud">Proud</option><option value="funny">Funny</option><option value="simple">Simple</option><option value="fan">Fan-style</option></select></label>
      <label class="field">Language<select name="lang"><option value="en">English</option><option value="vi">Vietnamese</option></select></label>
      <label class="field">Length<select name="length"><option value="short">Short</option><option value="medium" selected>Medium</option><option value="long">Long</option></select></label>
      <label class="field">Hashtag<select name="hashtag">${tags}</select></label>
      <button class="btn" type="submit">${PS.t("generate")}</button>
    </form>
    <article class="card"><div class="comment-out" id="comment-out">—</div><button class="btn small" type="button" id="copy-comment">${PS.t("copy")}</button></article>`;
  let last = "";
  document.getElementById("gen-form").onsubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    last = generateComment(data);
    document.getElementById("comment-out").textContent = last;
    PS.toast(PS.t("generated"));
  };
  document.getElementById("copy-comment").onclick = () => { if (last) PS.copy(last); };
}
function renderAnalytics() {
  const pct = Math.min(100, Math.round((analyticsData.campaign.current / analyticsData.campaign.target) * 100));
  document.getElementById("app").innerHTML = `
    <h1>${PS.t("navAnalytics")}</h1>
    <p class="badge demo">DEMO DATA</p>
    <p class="lede">${PS.t("notRank")} ${PS.t("addOfficial")}</p>
    <section class="section grid grid-4">${analyticsData.engagement.map((x) => `<article class="card"><p class="muted">${x.label}</p><p class="stat">${x.value}</p></article>`).join("")}</section>
    <section class="section grid grid-2">
      <article class="card"><h3>${PS.t("engagement")}</h3><canvas id="chart-engagement"></canvas></article>
      <article class="card"><h3>${PS.t("trendGrowth")}</h3><canvas id="chart-growth"></canvas></article>
      <article class="card"><h3>${PS.t("platformCompare")}</h3><canvas id="chart-platforms"></canvas></article>
      <article class="card"><h3>${PS.t("episodeCompare")}</h3><canvas id="chart-episodes"></canvas></article>
    </section>
    <article class="card"><h3>${PS.t("fanProgress")}</h3><div class="progress"><span style="width:${pct}%"></span></div><p>${pct}% · ${progressLabel(pct)}</p></article>`;
  renderCharts();
}
function guideBody(name, items, checks) {
  return `
    <p class="kicker">Guide</p><h1>${name}</h1>
    <p class="lede">Use official posts and relevant comments. This is a fan checklist, not a ranking method.</p>
    ${items.map((block) => `<section class="section card"><h2>${block[0]}</h2><ul>${block[1].map((li) => `<li>${li}</li>`).join("")}</ul></section>`).join("")}
    <section class="section card"><h2>${PS.t("checklist")}</h2><ul class="checklist">${checks.map((c) => `<li><input type="checkbox" /> <span>${c}</span></li>`).join("")}</ul></section>
    <a class="btn ghost" href="${PS.prefix()}guides.html">${PS.t("backSeries")}</a>`;
}
const GUIDES = {
  x: ["X", [
    [PS.t("before"), ["Follow the official account.", "Read the episode context.", "Prepare one natural reply, not a copied block."]],
    [PS.t("atStart"), ["Open the official post.", "Use the official hashtag once, in context."]],
    [PS.t("first30"), ["Like, repost, and reply with a specific thought.", "Quote with your own words."]],
    [PS.t("during"), ["Reply to other relevant fans.", "Avoid repeated identical comments."]],
    [PS.t("after"), ["Check whether the conversation is still on topic.", "Do not spam late identical replies."]]
  ], ["Follow official account", "Like official post", "Repost", "Reply naturally", "Use official hashtag", "Quote with meaningful text", "Avoid spam", "Check trend status"]],
  instagram: ["Instagram", [
    ["Like", ["Like the official post early if you are online."]],
    ["Comment", ["One specific comment is better than repeated tags."]],
    ["Share / Story", ["Share to story only if the post allows it."]],
    ["Save", ["Save posts you actually want to revisit."]],
    ["Reel", ["Watch the reel through before liking or commenting."]]
  ], ["Like", "Comment", "Share", "Save", "Story", "Watch reel", "Avoid spam"]],
  tiktok: ["TikTok", [
    ["Watch", ["Let the video play.", "Complete the video if you are actually watching."]],
    ["Respond", ["Like, comment naturally, share, or favorite."]],
    ["Avoid", ["Do not paste the same comment on many videos."]]
  ], ["Watch", "Complete the video", "Like", "Comment naturally", "Share", "Favorite", "Avoid spam"]],
  facebook: ["Facebook", [
    ["Reaction", ["Use a real reaction on the official post."]],
    ["Comment / Share", ["Comment once, share when the post is public.", "Follow the page if you want updates."]],
    ["Save", ["Save where the platform offers it."]]
  ], ["Reaction", "Comment", "Share", "Follow", "Save where available", "Avoid spam"]],
  youtube: ["YouTube", [
    ["Watch", ["Watch the video you are commenting on."]],
    ["Respond", ["Like, comment with a real note, share if you want."]],
    ["Subscribe", ["Subscribe only if you want future uploads."]],
    ["Avoid", ["Do not repeat the same comment."]]
  ], ["Watch", "Like", "Comment", "Share", "Subscribe if desired", "Avoid repetitive comments"]]
};
function renderGuide(key) {
  const g = GUIDES[key];
  document.getElementById("app").innerHTML = guideBody(g[0], g[1], g[2]);
}
function renderGuides() {
  document.getElementById("app").innerHTML = `<h1>${PS.t("navGuides")}</h1><div class="grid grid-2">${Object.keys(GUIDES).map((k) => `<a class="card" href="${PS.prefix()}${k}.html"><h3>${GUIDES[k][0]}</h3><p class="muted">${PS.t("open")}</p></a>`).join("")}</div><section class="section card" id="disclaimer"><h2>${PS.t("privacy")}</h2><p>${PS.t("disclaimer")}</p><p>This site stores only language, theme, favorites, and recently viewed episodes in localStorage on your device. It does not collect accounts or personal data.</p></section>`;
}
function bindCopy() {
  document.querySelectorAll("[data-copy]").forEach((btn) => { btn.onclick = () => PS.copy(btn.dataset.copy); });
}
function renderPage() {
  const page = document.body.dataset.page;
  const map = { home: renderHome, series: renderSeries, lyt: () => renderSeriesDetail("lyt"), hb: () => renderSeriesDetail("hb"), episode: renderEpisode, trends: renderTrends, events: renderEvents, tags: renderHashtags, gen: renderGenerator, analytics: renderAnalytics, guides: renderGuides, x: () => renderGuide("x"), instagram: () => renderGuide("instagram"), tiktok: () => renderGuide("tiktok"), facebook: () => renderGuide("facebook"), youtube: () => renderGuide("youtube") };
  if (map[page]) map[page]();
  bindFavs();
  bindCopy();
  startCountdown();
}
document.addEventListener("DOMContentLoaded", () => {
  mountChrome();
  renderPage();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(`${PS.prefix()}sw.js`).catch(() => {});
  }
});
