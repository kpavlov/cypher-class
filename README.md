# Тайна частых букв

Lesson for 5th grade (40 min): Caesar cipher, frequency charts, mode, frequency analysis, Huffman compression.
Slides are Markdown on [reveal.js](https://revealjs.com); live demos are plain HTML pages shown in iframes.

## Run

reveal.js loads the `.md` files with `fetch`, so open the deck through a web server, not `file://`.

```sh
python3 -m http.server 8000
# http://localhost:8000
```

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.
All paths are relative, so the deck also works under `https://<user>.github.io/cypher-class/`.

## Layout

```
index.html                  deck: one <section> per folder
slides/00-intro/slides.md   slides of one block, separated by a line with ---
slides/01-history/…
…
apps/cipher.html            demo: Caesar, frequencies, frequency attack, Huffman
apps/gallery.html           demo: graph gallery (not used in slides)
assets/custom.css           theme tweaks on top of reveal's "white" theme
vendor/reveal/              reveal.js 6.0.2 (MIT), copied from dist/, no build step
                            (theme/black.css is kept but unused; switch the <link> in index.html for a dark deck)
```

## Writing slides

- Slides in a file are separated by a line containing only `---`.
- Speaker notes: a line `Note:` and everything after it in the same slide.
- One big file instead of folders: keep a single `<section data-markdown="slides.md" …>` in `index.html`.
- A new block: create `slides/NN-name/slides.md` and add a `<section data-markdown="…">` in `index.html`.
- Images: write paths relative to `index.html`, for example `slides/03-breaking/img/chart.png`.

## Keys

`S` speaker view · `F` fullscreen · `Esc` overview · `?print-pdf` in the URL, then print to PDF from Chrome.

## Live demos

The demo slides are plain iframes:

```html
<iframe data-src="apps/cipher.html?embed&light#break" data-preload class="r-stretch"></iframe>
```

- `#caesar`, `#freq`, `#break`, `#tree`, `#zip`, `#unzip`, `#where` select the tab.
- `?embed` hides the header and tabs and packs the layout into a 16:9 slide.
- `?light` switches the page to the light palette (white background, darker accents) for projectors.
- After a click inside the iframe the keyboard goes to the page; click outside it to flip slides again.

## Offline

reveal.js is vendored, so the deck works without internet. The demo pages still load fonts from Google Fonts;
offline they fall back to system fonts and everything keeps working. Bundling the fonts is the next step.

## Sources and credits

- History facts (Caesar, Augustus, Al-Kindi, the Russian army in 1915): [Caesar cipher, Wikipedia](https://en.wikipedia.org/wiki/Caesar_cipher).
- reveal.js by Hakim El Hattab, MIT license, see `vendor/reveal/LICENSE`. Copied from the `main` branch, commit `e240e17`.
