# Industrial Sales & Services — static website

Production-ready static site. No build step, no backend. Upload the folder to any
host (Hostinger, cPanel, Netlify, GitHub Pages, S3) and it runs.

---

## 1. Before going live — replace these placeholders

Everything the client must supply is a **capitalised placeholder**. Nothing is invented.

### `js/data.js` → the `SITE` object (edit this first)

| Key | Example |
|---|---|
| `companyName` | Sri Murugan Engineering Works |
| `phone` | +91 98765 43210 |
| `phoneDial` | +919876543210 |
| `whatsapp` | 919876543210 — country code + number, **no `+`, no spaces** |
| `whatsappDisplay` | +91 98765 43210 |
| `email` | enquiry@example.com |
| `address`, `city`, `district`, `state`, `pincode` | |
| `hours` | Mon–Sat, 9:00 AM – 7:00 PM |
| `domain` | www.example.com |

Editing `SITE` updates the header, footer, contact block, phone links, WhatsApp
links and the page title automatically. You do not edit the HTML for any of this.

### `index.html` → find-and-replace the same tokens

`COMPANY_NAME`, `CITY`, `DISTRICT`, `STATE`, `PHONE`, `EMAIL`, `ADDRESS`,
`PINCODE`, `OPENING_HOURS`, `WEBSITE_DOMAIN` — they appear in the `<title>`,
meta description, Open Graph tags and the JSON-LD LocalBusiness schema.
(JS fills the visible page; these are for crawlers, which read the raw HTML.)

### `robots.txt` and `sitemap.xml`

Replace `WEBSITE_DOMAIN`. Update `<lastmod>` at launch.

---

## 2. Adding a product or service later

Open `js/data.js`, copy an existing object, change the values:

```javascript
{
  id: 'air-receiver-tank',
  name: 'Air Receiver Tank',
  category: 'Industrial Equipment',   // shown on the card
  group: 'Equipment',                 // must match a filter button
  code: 'EQP-04',                     // the little tag on the image
  description: 'Short line about it.',
  image: 'assets/images/products/air-receiver-tank.svg',
  tags: ['tank', 'receiver', 'air'],  // extra words the search should match
  type: 'product'                     // 'product' or 'service'
}
```

That is the whole job. The card, the filter, the search index, the enquiry modal,
the WhatsApp message and the footer list all pick it up automatically.

A **new filter button** appears by itself if you use a new `group` value.

---

## 3. Images

All 36 images are hand-drawn technical SVGs, one per item, named after the item's
`id`. Nothing is stock photography, so an image can never be mismatched.

To swap in a real photo:

1. Save it as WebP, roughly 800×600, under `assets/images/products/` (or
   `services/`, `projects/`).
2. Point the item's `image` value at the new file.
3. For gallery entries, also set `placeholder: false` to remove the
   "Placeholder" badge.

**The gallery is currently all placeholders.** No project is described as
completed, and no client name, location, value or date is claimed anywhere on
the site. Do not remove the badges until real photographs are supplied.

---

## 4. File map

```
index.html          all sections, meta tags, JSON-LD schema
css/styles.css      design tokens + every component
js/data.js          ← the client's file: config + all content
js/modal.js         one reusable enquiry modal
js/enquiry.js       WhatsApp / email message building + validation
js/products.js      product grid + filters
js/services.js      service grid + filters
js/gallery.js       project grid + filters
js/navigation.js    header, mobile menu, scroll spy
js/main.js          config binding, search, reveal animations
```

---

## 5. Moving to a CMS later

`data.js` ends by publishing everything to one place:

```javascript
window.APP.data = { SITE, products, services, projects, ... };
```

To go database-driven, delete the arrays and fetch instead:

```javascript
window.APP.data = await (await fetch('/api/catalogue')).json();
```

No rendering file changes. `products.js`, `services.js` and `gallery.js` only
ever read from `APP.data`.

---

## 6. Notes on two decisions

**CSS.** Hand-authored with a token system instead of the Tailwind CDN build.
The CDN ships a compiler to the browser and would cost the 90+ Lighthouse target.
If you want literal Tailwind, add a CLI build step — the class structure maps over
cleanly.

**Forms.** No backend, so submitting opens WhatsApp or the visitor's email app
with the enquiry pre-filled. Nothing is stored. If the client later wants enquiries
in a database, only `enquiry.js` changes.

---

## 7. Tested

- No horizontal scroll at 320 / 360 / 375 / 390 / 414 / 768 / 1024 / 1280 / 1440
- Mobile menu: hamburger, close button, ESC, outside click, link click, scroll lock
- Modal: focus trap, ESC, backdrop click, field validation, correct
  "Product Required" vs "Service Required" labelling, Quantity for products and
  Location for services
- Search: `valve` → 5 valves, `roof` → roofing + sheet work, `cattle` → cow shed,
  arrow keys and Enter work
- Filters: products 5/5/3, services 3/1/2/5, gallery by category
- Zero console errors
