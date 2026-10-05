/* Chart.js is loaded only on the analytics page. All figures are demo until replaced. */
function renderCharts() {
  if (typeof Chart === "undefined") return;
  const common = { responsive: true, plugins: { legend: { labels: { color: "#d7dce6" } } }, scales: { x: { ticks: { color: "#a7b0c2" } }, y: { ticks: { color: "#a7b0c2" } } } };
  const e = document.getElementById("chart-engagement");
  const g = document.getElementById("chart-growth");
  const p = document.getElementById("chart-platforms");
  const ep = document.getElementById("chart-episodes");
  if (e) new Chart(e, { type: "bar", data: { labels: analyticsData.engagement.map((x) => x.label), datasets: [{ data: analyticsData.engagement.map((x) => x.value), backgroundColor: "#c45c6a" }] }, options: common });
  if (g) new Chart(g, { type: "line", data: { labels: analyticsData.growth.map((_, i) => `D${i + 1}`), datasets: [{ data: analyticsData.growth, borderColor: "#e4d2b0", tension: 0.3 }] }, options: common });
  if (p) new Chart(p, { type: "doughnut", data: { labels: analyticsData.platforms.map((x) => x.label), datasets: [{ data: analyticsData.platforms.map((x) => x.value), backgroundColor: ["#c45c6a", "#e4d2b0", "#8b6cff", "#7dcea0", "#6aa0c4"] }] }, options: { plugins: common.plugins } });
  if (ep) new Chart(ep, { type: "bar", data: { labels: analyticsData.episodes.map((x) => x.label), datasets: [{ data: analyticsData.episodes.map((x) => x.value), backgroundColor: "#8b6cff" }] }, options: common });
}
