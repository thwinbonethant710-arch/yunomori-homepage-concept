# Yunomori Onsen & Spa — Homepage Concept

**Independent Homepage Concept by Valewick House.**
Not commissioned by, or affiliated with, Yunomori Onsen & Spa.

A single-page, dependency-free concept (HTML, CSS, vanilla JS). No build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
```

## Structure

```
index.html        Semantic page: Hero, Experience, Onsen, Spa & Wellness, Locations, Final CTA
css/styles.css    Tokens (colour, type, spacing), layout, motion, responsive rules
js/main.js        Scroll reveals, restrained parallax, mobile menu, sticky booking bar
assets/img/       Drop licensed photography here (see below)
```

## Imagery

The concept ships with art-directed CSS scenes (timber, stone, water, drifting steam, film grain) so it
renders without any external assets. To use real photography, add these files and they layer over the CSS
treatment automatically (the CSS acts as a tonal grade):

| File | Used in | Direction |
|------|---------|-----------|
| `assets/img/hero.jpg` | Hero (16:9, landscape) | Onsen water, steam, warm light, timber |
| `assets/img/experience-1.jpg` | The Experience (4:5) | Timber and stone beside water |
| `assets/img/experience-2.jpg` | The Experience (3:4) | Steam, quiet interior |
| `assets/img/onsen.jpg` | Onsen (16:9, landscape) | Mineral water, steam |
| `assets/img/spa.jpg` | Spa & Wellness (4:5) | Calm, warmly lit treatment space |
| `assets/img/final.jpg` | Final CTA (16:9, landscape) | Dusk, water and timber |

Use photography that Yunomori owns or that is properly licensed. Do not lift images from their site.

## Content sources

Copy and facts are drawn only from Yunomori's publicly indexed website content: onsens using mineral spring
water sourced from Wat Wangkanai (Kanchanaburi); the Thai massage, herbal compress, head/shoulder/foot,
deep tissue and aromatherapy offerings; and the four locations (Sukhumvit, Sathorn 10, Pattaya, Singapore)
with their one-line descriptors. No pricing, awards or statistics are included.

Please verify all copy, location details and booking links with the business before any real use.
Booking buttons point to the official site and no booking functionality is built.

## Motion

Slow image reveals, line-by-line headline rise, restrained parallax, drifting steam and hover transitions.
All motion uses transform and opacity only, is rAF-throttled, and is disabled under `prefers-reduced-motion`.

## Fonts

Cormorant Garamond (display) and Hanken Grotesk (text) via Google Fonts. Self-host for production.
