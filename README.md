# PerthSanta Hub

Fan-made static site for series notes, trend guides, hashtags, a comment generator, events, and demo analytics. Not affiliated with Perth, Santa, management, production companies, broadcasters, or official platforms.

## Deploy on GitHub Pages

1. Create a GitHub repository (for example `perthsanta-hub`).
2. Upload every file in this folder, keeping the same structure.
3. Commit to the `main` branch.
4. Open the repository **Settings**.
5. Open **Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch `main`.
8. Select folder `/ (root)`.
9. Save.
10. Open the URL GitHub shows, usually `https://USERNAME.github.io/perthsanta-hub/`.

Paths are relative, so the site works in a project site (not only at the domain root).

## Update later

Edit the data file, commit, and push. GitHub Pages will refresh after the new deploy.

| What to change | File |
| --- | --- |
| Episodes | `data/episodes.js` |
| Series cards | `data/series.js` |
| Events and countdown | `data/events.js` |
| Hashtags | `data/hashtags.js` |
| Comment building blocks | `data/comments.js` |
| Demo charts | `data/analytics.js` |
| English / Vietnamese labels | `data/translations.js` |
| Images | `assets/images/` (replace the SVG placeholders) |

Dates in `data/events.js` that are not confirmed must stay `demo: true`. Do not enter unofficial dates, cast, hashtags, or view counts as facts.

## Local check

Open `index.html` in a browser. Clipboard and the service worker are more reliable over `http://localhost` than `file://`. A simple local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Pages

- Home, Series, Love You Teacher, Heartbound, episode detail
- Trends and platform guides (X, Instagram, TikTok, Facebook, YouTube)
- Events with list, sample calendar, and countdown
- Hashtag center with copy
- Comment generator (one comment per click)
- Analytics (Chart.js CDN, labeled DEMO DATA)
- EN / VI switch and dark / light theme, saved in localStorage
