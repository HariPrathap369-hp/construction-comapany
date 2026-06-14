# MCB Brothers Construction — Website

A world-class, single-page marketing website for **MCB Brothers Construction**.
Built as a fast, dependency-free **static site** (HTML + CSS + vanilla JS) — no build
step, no framework. It hosts for free on GitHub Pages, Netlify, Vercel, or any web host.

![Bold industrial theme](https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70)

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

### 1. Business details (important)
Search the project for **`EDIT YOUR DETAILS`** — the placeholders below appear in the
top bar, the Contact section, and the footer. Update them everywhere:

| Placeholder | Where |
|---|---|
| `(555) 123-4567` | phone (also in `tel:` links) |
| `info@mcbbrothersconstruction.com` | email (also in `mailto:` links) |
| `1234 Builder's Way, Suite 100, Your City, ST 00000` | address |
| `Mon–Fri 8:00–18:00 · Sat 9:00–14:00` | hours |
| `Lic. #000000` | license number (footer) |
| stats: `15+`, `480+`, `2.5M`, `98%` | hero + stats — edit the `data-count` values in `index.html` |

> The testimonials, project names, and stats are realistic **placeholders** — swap in
> your real clients, projects, and numbers when you have them.

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
