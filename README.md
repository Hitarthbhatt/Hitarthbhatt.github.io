# Hitarth Bhatt — Portfolio

Personal portfolio site for Hitarth Bhatt, iOS Engineer. Static HTML/CSS/JS served via GitHub Pages at [hitarthbhatt.github.io](https://hitarthbhatt.github.io).

## Stack

- Plain HTML, CSS custom properties, vanilla JS (no build step)
- Inter via Google Fonts
- Light/dark theme persisted to `localStorage`, honors `prefers-color-scheme`

## Local preview

```
open index.html
# or
python3 -m http.server 8000
```

## Versions

The repo is tagged so either design can be checked out at any time.

| Tag | Design | How to switch |
|---|---|---|
| `v1.0-legacy` | Original 2023 design (Bootstrap 4 + jQuery) | `git checkout v1.0-legacy` |
| `v2.0-refined` | Refined 2026 redesign (Direction 01) | `git checkout v2.0-refined` |

Return to the live branch with `git checkout master`.

To list tags: `git tag -n9`.

## Project layout

```
index.html        # entry, semantic scaffolding
css/style.css     # tokens + layout, light/dark via [data-theme]
js/data.js        # window.HB — single source of truth
js/theme.js       # theme bootstrap + toggle
js/render.js      # populates highlights, projects, experience, footer
images/           # project screenshots
resume/           # PDF résumé
```

Update copy or projects by editing `js/data.js` only — the render layer rebuilds the DOM on load.
