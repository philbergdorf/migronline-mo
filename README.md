# Migronline MO

A clone of the Migronline iOS-app web prototype, restyled with values from the
**Migros Online design system** (DTCG tokens): m-orange primary, grey neutrals
on white surfaces, Helvetica Now type (system Helvetica stack as fallback),
4/8px/pill radii and ink elevations. The original playful "Harvest" version
lives in the `migronline` repo.

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (theme values mapped from the design tokens) + **Konsta UI**
- **lucide-react** icons

## Getting started

```bash
npm install
npm run dev      # dev server (http://localhost:5174)
npm run build    # type-check + production build
```

## Screens

Discover · Products · Cook · Promotions · Basket — routed via
`react-router-dom` (hash routing), wrapped in an on-screen iPhone frame, behind
a lightweight client-side password gate.
