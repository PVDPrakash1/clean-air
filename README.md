# ClearAir AI – Your Smart Pollution Companion

**Tagline:** *Breathe Better. Live Smarter. Build a Cleaner Future.*

ClearAir AI is a location-aware, GenAI-powered environmental assistant designed to help families and communities respond to urban air pollution and winter smog through practical daily decisions.

## Key Enhancements (v2.0)

* **Subfolder Deployment Ready (`pvdprakash.com/clean-air`):** Pre-configured with `base: '/clean-air/'` in `vite.config.js` and matching `RewriteBase /clean-air/` in `public/.htaccess`.
* **Automated Testing Suite:** Includes Vitest + React Testing Library unit and UI tests (`npm test`) covering AQI locality switching, multilingual UI, commute emission calculations, CADR purifier sizing, and GenAI chat fallback behavior.
* **Security Hardening:** Includes Content Security Policy (CSP) headers, Apache security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`), prompt sanitization, request rate limiting, and an optional Node.js backend proxy (`server/proxy.js`).
* **WCAG / WAI-ARIA Accessibility:** Full `tablist`/`tab`/`tabpanel` keyboard semantics, explicit form labels, `aria-live` regions, skip-to-content link, and high-contrast color tokens.

## Run Locally & Run Tests

```bash
npm install
npm test
npm run dev
```

## Build & Deploy to GoDaddy (`pvdprakash.com/clean-air`)

1. Run `npm run build` to generate the `dist/` folder.
2. In GoDaddy cPanel **File Manager**, open `public_html` and create a folder named `clean-air`.
3. Enable **Show Hidden Files** in File Manager Settings, then upload all contents of `dist/` (including `.htaccess` and `assets/`) into `public_html/clean-air/`.
4. Visit `https://pvdprakash.com/clean-air/`.
