/* One comment per click. Templates live in data/comments.js. */
function generateComment(opts) {
  const bank = commentBank[opts.lang] || commentBank.en;
  const tone = bank[opts.tone] || bank.supportive;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  let text = `${pick(tone.open)} ${pick(tone.body)} ${pick(tone.close)}`;
  if (opts.series === "lyt") text = `Love You Teacher — ${text}`;
  if (opts.series === "hb") text = `Heartbound — ${text}`;
  if (opts.length === "short") text = pick(tone.close);
  if (opts.length === "long") text += ` ${pick(tone.body)}`;
  if (opts.hashtag) text += ` ${opts.hashtag}`;
  return text;
}
