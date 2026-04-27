# Castle Valeting and Detailing

Static one-page site for Castle Valeting and Detailing in Redditch.

Live at https://www.castlevaleting.co.uk/.

## Stack

Plain HTML, CSS, vanilla JS. No framework, no build step.

CDN dependencies:

- Google Fonts: Cinzel (headings) + Inter (body)
- Swiper 11 for the gallery carousel

## Files

```
index.html
assets/
  css/styles.css
  js/main.js
  logo/      brand assets (transparent PNG, JPG, header car, RiverWood credit)
  flyer/     original flyer (not displayed, kept for reference)
  gallery/   8 detail photos + the branded van shot used in About
```

`Images/` at the project root holds the high-res originals and is gitignored.

## Run it

Open `index.html` directly, or serve the folder if you prefer:

```
python3 -m http.server 8765
```

## Design tokens

Colour palette is defined as CSS custom properties on `:root` at the top of `assets/css/styles.css`:

| token             | value     | use                          |
| ----------------- | --------- | ---------------------------- |
| `--bg`            | `#0a0a0a` | page background              |
| `--bg-card`       | `#161616` | service / pricing / contact cards |
| `--gold`          | `#d4af37` | primary gold                 |
| `--gold-light`    | `#f4d47c` | highlight, shimmer peak      |
| `--gold-dark`     | `#8a6d1c` | shadow / border tint         |
| `--text`          | `#e8e8e8` | body text                    |
| `--text-muted`    | `#a0a0a0` | secondary text               |

Headings use a 135deg gold gradient clipped to text via `background-clip: text`.

Type:

- Headings: Cinzel, weights 500–700
- Body: Inter, weights 300–700

Breakpoints: 560px and 900px (mobile-first).

## JS behaviour

`assets/js/main.js` handles:

- Sticky-nav blur after 40px of scroll
- Mobile menu toggle (Esc to close)
- IntersectionObserver scroll reveals on `[data-reveal]`
- Swiper init for the gallery
- Custom lightbox (Esc / arrow keys / swipe)
- All animation paths short-circuit under `prefers-reduced-motion`

## Editing copy

Phone, email, Instagram and Facebook URLs are hard-coded in `index.html`.
Search for `07751182260` or `castle_valeting@hotmail.com` to find them.

Pricing lives in the `#pricing` section as plain markup. Update the
`<li>` items in `.price-list` / `.price-features`.

Gallery slides are `<div class="swiper-slide">` blocks inside
`.gallery-swiper .swiper-wrapper`. Add a new compressed JPEG to
`assets/gallery/`, then add a slide that points at it.

## Deploy

Pushing to `main` rebuilds GitHub Pages automatically (~60s).
