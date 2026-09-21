# Migronline MO — prototype copy

Independent local copy of the original prototype. Run commands from this folder.
Open http://127.0.0.1:5175 and enter the prototype password `migi`.

## Design directions

Open http://127.0.0.1:5175/directions.html to compare four interactive concepts:

- **Daily** keeps Migros orange and puts everyday shopping first.
- **Market** reimagines the brand with blue, pink, editorial type and seasonal discovery.
- **Table** explores a plum-and-citron identity centred on cooking and weekly meal planning.
- **Fresh** applies a green produce-led visual identity to the original app. It reuses
  the original `App`, all five navigation tabs, page sections, providers and recipe flows.
  Open http://127.0.0.1:5175/directions.html?concept=fresh for the focused comparison,
  or http://127.0.0.1:5175/fresh.html for the standalone concept.

The first three concepts include search, category filters, basket quantities, delivery choices,
recipes, saved favourites and meal planning. Concepts use demonstration content and
prices; no orders are placed. Interaction state lasts until the page is refreshed.
The original copied app remains available at `/`. Photography and fonts require internet access.
Fresh retains the original prototype’s working interactions and placeholder actions.
Its generated produce hero is included locally in `public/images/fresh-produce.png`.

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
npm run dev      # dev server (http://127.0.0.1:5175)
npm run build    # type-check + production build
```

## Screens

Discover · Products · Cook · Promotions · Basket — routed via
`react-router-dom` (hash routing), wrapped in an on-screen iPhone frame, behind
a lightweight client-side password gate.
