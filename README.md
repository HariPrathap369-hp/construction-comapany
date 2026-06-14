# MCB Brothers Construction — Website

A world-class, single-page marketing website for **MCB Brothers Construction** — luxury
home builders in **Ooty & Coonoor, The Nilgiris**. Built as a fast, dependency-free
**static site** (HTML + CSS + vanilla JS) — no build step, no framework. It hosts for
free on GitHub Pages, Netlify, Vercel, or any web host.

![Bold industrial theme](https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=70)

**Real business details already wired in:** phone `+91 98430 70880`, WhatsApp,
address (Selas Kattary, Coonoor), Open-24-hours, the 4.9★ Google rating, and a live
embedded Google map of the location.

## ✨ Features

- **Cinematic hero** with Ken-Burns background, animated trust badges, and dual CTAs
- **Sticky navbar** that turns solid on scroll, with active-section highlighting and a mobile menu
- **Animated stat counters**, scroll-reveal animations, and a moving capabilities marquee
- **Services**, **About / Why-Us**, **Filterable Projects gallery**, **Process timeline**, **Testimonials**
- **Contact section** with a validated quote-request form
- Fully **responsive**, **accessible** (keyboard + reduced-motion friendly), and SEO/Open-Graph ready

## 📁 Structure

```
.
├── index.html        # All page content / sections
├── css/styles.css    # Theme + layout (edit color tokens at the top)
├── js/main.js        # Nav, reveals, counters, filter, form
└── README.md
```

## 🚀 Run locally

It's static, so just open `index.html` — or serve it (recommended, so fonts/images load cleanly):

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## ✏️ Make it yours

### 1. Business details — already real ✅
The live listing details are already in `index.html` (search the top-of-file comment
block to see them in one place):

| Detail | Value |
|---|---|
| Phone | `+91 98430 70880` (`tel:+919843070880`) |
| WhatsApp | `https://wa.me/919843070880` |
| Address | 2/112 F, Selas Kattary (P.O.), Coonoor Tk, Ooty, The Nilgiris, TN 643213 |
| Hours | Open 24 Hours |
| Google rating | 4.9 ★ (52 reviews) |
| Map | live Google embed (coords `11.3349567, 76.7463351`) |

### Still placeholder — replace when ready
- **Project photos** — ✅ all real now (hero, gallery, About and CTA use your own photos
  in `images/`). Add more anytime by dropping files in `images/` and pointing the
  `<img>`/background URLs at them.
- **Testimonials** — ✅ now your three real 5★ Google reviews (Malathi, Sathish,
  Balachandran). Swap or add more anytime.
- **Social links** — Facebook/Instagram currently open a business-name search as a
  placeholder; replace those `href`s in the top bar and footer with your real page URLs.
- **Email** — none was listed publicly; add one wherever you see a phone/WhatsApp block
  if you'd like to show it.
- **Voice assistant (Vapi)** — the floating voice orb is wired in. Open `index.html`,
  find `VAPI_PUBLIC_KEY`, and paste your Vapi **Public Key** (Vapi dashboard → API Keys).
  The assistant ID is already set; until a key is added the orb stays hidden.

### 2. Colors
Open `css/styles.css` and edit the tokens at the top (`:root`):

```css
--accent:   #ffb400;  /* safety amber  */
--accent-2: #ff7a18;  /* orange        */
--bg:       #0e0f12;  /* page background */
```

### 3. Photos
Images are hot-linked from Unsplash (free to use). To use your own job-site photos,
drop them in an `images/` folder and replace the `https://images.unsplash.com/...`
URLs in `index.html`. If an image ever fails to load, it degrades to a neutral
gradient automatically.

### 4. Make the contact form actually send
The form validates and shows a success message but does **not** deliver email on its
own. Pick one:

- **Formspree** — sign up, then set the form tag in `index.html`:
  ```html
  <form class="form" id="quoteForm" action="https://formspree.io/f/yourID" method="POST">
  ```
  and in `js/main.js` replace the success block with a normal `fetch()` POST (or just
  remove `e.preventDefault()` to let Formspree handle the redirect).
- **Netlify Forms** — add `netlify` to the `<form>` tag and deploy on Netlify.

## 🌐 Deploy

**GitHub Pages**
1. Push this repo to GitHub.
2. Settings → Pages → Source: `Deploy from a branch` → pick your branch → `/ (root)`.
3. Your site goes live at `https://<user>.github.io/<repo>/`.

**Netlify / Vercel** — drag-and-drop the folder, or connect the repo. No build command;
publish directory is the project root.

---

© MCB Brothers Construction. Template crafted for a bold, industrial brand.
