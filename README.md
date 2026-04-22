# Castle Valeting & Detailing

Single-page marketing site for Castle Valeting & Detailing, a mobile car detailing service in Redditch.

## Stack
Pure static HTML, CSS and JavaScript. No build step, no framework, no backend. External dependencies are loaded from CDN:
- Google Fonts (Cinzel + Inter)
- Swiper.js 11 (gallery carousel)

## Run locally
Open `index.html` in any modern browser. That's it.

For a more accurate local preview (needed so CORS, service-worker caching and fetch paths behave like production), serve from the project root:

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve
```

Then visit http://localhost:8000.

## Deploy
Any static host works. Easiest options:
- **Netlify**: drag the project folder onto https://app.netlify.com/drop
- **Vercel**: `npx vercel` in the project folder
- **GitHub Pages**: push to `main` and enable Pages on the root

## Project structure
```
index.html                    Page markup
assets/
  css/styles.css              All styles
  js/main.js                  Nav, reveal, Swiper, lightbox
  logo/                       Logos (transparent PNG + black-bg JPG)
  flyer/                      Original flyer (kept for reference only)
  gallery/                    8 compressed gallery photos
Images/                       Source high-res photos (gitignored, local backup)
```

## Editing content
- **Phone, email, Instagram**: update the hardcoded values in `index.html` — search for `07751182260`, `castle_valeting@hotmail.com`, and `castlevaleting`.
- **Gallery images**: drop a new `.jpg` into `assets/gallery/`, then add a `<div class="swiper-slide">` in the gallery section of `index.html`.
- **Copy**: all body copy is directly in `index.html` inside the relevant `<section>`.

## Colour palette
Defined as CSS custom properties in `:root` at the top of `assets/css/styles.css`:
- `--bg` (near black), `--bg-card`
- `--gold`, `--gold-light`, `--gold-dark`
- `--text`, `--text-muted`

## Accessibility
- Semantic landmarks and skip link
- Keyboard-operable navigation, mobile menu, lightbox (Esc / Arrow keys)
- `prefers-reduced-motion` disables shimmer, particles, carousel autoplay and scroll-reveal animations
- AAA body contrast on black background
