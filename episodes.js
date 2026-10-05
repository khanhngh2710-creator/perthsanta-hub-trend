/* EDIT THIS FILE to add or edit episodes. Do not present these fields as official facts. */
const episodeData = {
  lyt: Array.from({ length: 10 }, (_, i) => ({
    seriesId: "lyt",
    seriesTitle: "Love You Teacher",
    number: i + 1,
    title: `Episode ${String(i + 1).padStart(2, "0")} — demo title`,
    date: "Add official date here.",
    time: "Add official time here.",
    synopsis: "Demo data. Add the official episode synopsis here.",
    characters: "Demo data. Add key characters here.",
    moments: ["Demo moment — replace with official notes.", "Demo moment — replace with official notes."],
    hashtags: [`#LoveYouTeacherEP${i + 1}`, "#LoveYouTeacher", "#PerthSanta"],
    target: "Fan campaign goal: early, relevant engagement. Not a guaranteed rank.",
    campaign: "Suggested actions: like, repost or share, and reply naturally with the episode hashtag.",
    status: "Demo data",
    links: []
  })),
  hb: Array.from({ length: 10 }, (_, i) => ({
    seriesId: "hb",
    seriesTitle: "Heartbound",
    number: i + 1,
    title: `Episode ${String(i + 1).padStart(2, "0")} — demo title`,
    date: "Add official date here.",
    time: "Add official time here.",
    synopsis: "Demo data. Add the official episode synopsis here.",
    characters: "Demo data. Add key characters here.",
    moments: ["Demo moment — replace with official notes."],
    hashtags: [`#HeartboundEP${i + 1}`, "#Heartbound", "#PerthSanta"],
    target: "Fan campaign goal: thoughtful early engagement. Not a guaranteed rank.",
    campaign: "Suggested actions: watch, like, comment naturally, and share the official post.",
    status: "Demo data",
    links: []
  }))
};
