# Change Password Portal

Standalone Angular 18 portal for the AMEX Change Password feature.
Runs on **port 4212**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server on port 4212
npm start
# → http://localhost:4212
```

---

## Project Structure

```
change-password-portal/
├── angular.json                          # Angular CLI config (port 4212)
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .npmrc
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss
    └── app/
        ├── app.component.ts              # Shell: top-bar, AMEX logo, nav, breadcrumb
        ├── app.config.ts
        ├── app.routes.ts
        └── pages/
            ├── change-password/
            │   └── change-password.component.ts   # Form with validation & strength meter
            └── coming-soon/
                └── coming-soon.component.ts        # Stub for other routes
```

---

## Features

- **Shell** — same look & feel as pay-with-points portal:
  - Top bar: *(Change Country)* + **LOG OUT**
  - AMEX SVG logo
  - Nav tabs with MISC dropdown (all items)
  - Breadcrumb: `Admin › Change Password`

- **Change Password Form**
  - Show/hide toggle on all 3 fields
  - Live password **strength meter** (Weak → Fair → Good → Strong)
  - **6-rule checklist** (min 8 chars, uppercase, lowercase, number, special char, different from current)
  - Real-time **match indicator** on confirm field
  - Client-side **validation** with inline error messages
  - Loading spinner on submit + inline success message

---

## Build for Production

```bash
npm run build
# Output → dist/change-password-portal/
```
