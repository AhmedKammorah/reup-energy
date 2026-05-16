# ReUP — Landing Page

Static landing page for **reup.energy**. Plain HTML/CSS/JS — no build step.

## Run locally
```sh
cd landing_page
python3 -m http.server 5500
# open http://localhost:5500
```

## Files
- `index.html` — page structure & copy
- `style.css` — brand-token-driven styles
- `script.js` — smooth scroll + scroll-in animation
- `assets/` — images, logos, og-image, favicon (to be added)

## Next iterations
- Hero photo / video loop (yacht-at-marina, golden hour).
- Captain testimonial section once pilot data exists.
- Newsletter / waitlist form (email capture → Mailchimp / Resend).
- OG image + favicon set.
- Analytics (Plausible or Fathom — privacy-first).
- A11y pass (contrast, keyboard nav, alt text).
- Deploy: Cloudflare Pages / Vercel; DNS at the reup.energy registrar.

## Production plan
When the landing graduates beyond static, port to Next.js to share the design system with the product portals. Until then, ship-fast static.
