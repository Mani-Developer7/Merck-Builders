# Marjan Classic Mall & Residency — Client-Only Demo

This is a **frontend-only** version of the site — no backend, no MongoDB, no
Node server required. All data (projects, blogs, gallery, careers) lives in
your browser's `localStorage`, pre-seeded with sample content so the site
works immediately.

## Run it

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` for the public site.

## Admin Dashboard

Go to `http://localhost:5173/admin/login`

```
Email:    admin@marjanclassic.com
Password: admin123
```

Everything you add/edit/delete in the dashboard (projects, blog posts,
gallery images, career listings) saves to `localStorage` and shows up
immediately on the public site. Image uploads are stored as embedded
base64 data (no file server needed) — fine for a demo, but not ideal for
large numbers of high-res images since browser localStorage has a ~5–10MB
limit per site.

To change the admin email/password, edit `DEFAULT_ADMIN` near the top of
`client/src/api/axios.js` (only applies before the account is first seeded —
clear your browser's localStorage for this site to reset it).

## Resetting the demo data

Open your browser dev tools → Application/Storage tab → clear localStorage
for this site (or run `localStorage.clear()` in the console), then refresh.
It'll reseed the sample projects/blogs/gallery/careers automatically.

## Going to a real backend later

This client-only setup works by swapping `client/src/api/axios.js` for a
mock implementation that mimics the same `api.get/post/put/delete`
interface every page already uses. When you're ready for a real database:

1. Grab the full-stack version of this project (Express + MongoDB backend)
2. Replace `client/src/api/axios.js` with the real axios instance pointing
   at your API
3. No other frontend files need to change — every page already calls the
   same `api.get/post/put/delete` methods

## What's Included
Same as the full version: video hero, GSAP scroll animations, animated
counters, property cards with hover slider/favorites/compare, EMI
calculator, before/after slider, map embed, site-visit modal, rule-based
chat assistant, testimonials, and a full CRUD admin dashboard.
