# Тайна частых букв

Lesson for 5th grade (40 min): Caesar cipher, frequency charts, mode, frequency analysis, Huffman compression.
Slides are Markdown on [reveal.js](https://revealjs.com); live demos are plain HTML pages shown in iframes.

## Run

```sh
make start   # http://localhost:8000, hot reload (PORT=9000 make start to change)
```

reveal.js loads the `.md` files with `fetch`, so `file://` won't work; any static server does.
GitHub Pages: Settings → Pages → Source: **GitHub Actions**; `.github/workflows/pages.yml` deploys on every push to `main`.

## Layout

```
index.html          deck: one <section> per slides/NN-name/slides.md (slides split by a line with ---, notes after "Note:")
apps/cipher.html    demo: Caesar, frequencies, frequency attack, Huffman
apps/gallery.html   demo: graph gallery (not used in slides)
apps/print*.html    A4 cipher-ruler cutting sheets (Russian / Estonian alphabet)
assets/custom.css   theme tweaks on top of reveal's "white" theme
vendor/reveal/      reveal.js, vendored: no build step; offline, the Golos Text web font falls back to system fonts
server.js           dev server
```

## Demos

Embedded in slides as iframes; `#caesar #freq #break #tree #zip #unzip #where` select the tab, `?embed` hides the chrome, `?light` is for projectors:

```html
<iframe data-src="apps/cipher.html?embed&light#break" data-preload class="r-stretch"></iframe>
```

## Printable alphabets

A4 landscape cipher-ruler strips to cut out (pick ru/et/en on the page): [print.html](https://kpavlov.github.io/cypher-class/apps/print.html).

## Keys

`S` speaker view · `F` fullscreen · `Esc` overview · `?print-pdf` in the URL, then print to PDF from Chrome.

## Credits

[Caesar cipher, Wikipedia](https://en.wikipedia.org/wiki/Caesar_cipher) for the history facts; [reveal.js](https://revealjs.com) (MIT, `vendor/reveal/LICENSE`).
