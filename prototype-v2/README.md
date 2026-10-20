# Migronline MO — version 2

Independent version based on `prototype-copy`, including its local changes at the time of copying. Run commands from this folder.

The original and `prototype-copy` can continue to run separately. Version 2 uses its own browser storage on port 5176.
Open http://127.0.0.1:5176 and enter the prototype password `migi`.

Published version: https://philbergdorf.github.io/migronline-mo/v2/
The repository's GitHub Pages workflow publishes this version under `/v2/`,
alongside the original prototype at the site root.

## Version 2 product search

Products includes a sticky search field below its title. Focusing it switches from
browsing to catalogue results, with 15 sample recent searches shown for an empty
query. New searches join the history when submitted or when leaving the field,
newest first, up to 15 distinct queries. Tapping a recent query runs it again and
moves it to the top; its trailing × button deletes it. History is temporary and
resets to the sample list on refresh.
Search matches product names, display titles and descriptions, ignoring case
and accents. Product cards retain their basket quantity controls.

Clear resets the query; Cancel or Escape returns to browsing at the previous scroll
position. Enter dismisses the keyboard while keeping the results. Queries and the
browsing/results scroll positions survive tab switches until the app is refreshed.
The separate Search navigation item and floating search button have been removed.
Cook remains an optional navigation destination in Account preferences.

## Recent orders

Recent orders lists sample weekly shops from the last six calendar months,
grouped by month with the newest first. Dates use the Europe/Zurich timezone.
Each order opens its own route with every purchased product grouped by category.
The category navigation is shared with Your regular buys: it sticks to the top,
jumps to a category, and highlights the visible section as you scroll.
Product quantities show the past purchase; basket controls add individual units,
and “Add order to basket” adds the original quantities. Order totals include
CHF 5.90 delivery. Returning to the list preserves its scroll position.

## Home campaign teasers

Discover includes a manually scrolling “Worth a look” slider between the
delivery slot and “Your regular buys”, with raclette, autumn meals and new product campaigns.
Images have no overlay badges. Scratch & Win appears as a fourth teaser when its
Account preference is enabled, opening the existing game directly. Its separate
home section has been removed; returning from the game restores its teaser.
Cards snap into place, show a preview of the next card, and support Tab and
left/right arrow keys. Motion respects the reduced-motion preference.
Each card opens a campaign detail page. Back to Discover returns to the same
campaign in the slider, and each detail page links to its related assortment.
The competition is sample content and does not accept entries.

Campaign photography was created with built-in image generation. The local assets
and complete prompts are in `public/images/campaigns/` and its `sources.json`.

## Design directions

Open http://127.0.0.1:5176/directions.html to compare four interactive concepts:

- **Daily** keeps Migros orange and puts everyday shopping first.
- **Market** reimagines the brand with blue, pink, editorial type and seasonal discovery.
- **Table** explores a plum-and-citron identity centred on cooking and weekly meal planning.
- **Fresh** applies a green produce-led visual identity to the original app. It reuses
  the original `App`, all five navigation tabs, page sections, providers and recipe flows.
  Open http://127.0.0.1:5176/directions.html?concept=fresh for the focused comparison,
  or http://127.0.0.1:5176/fresh.html for the standalone concept.

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
npm run dev      # dev server (http://127.0.0.1:5176)
npm run build    # type-check + production build
```

## Screens

Discover · Products · Cook · Promotions · Basket — routed via
`react-router-dom` (hash routing), wrapped in an on-screen iPhone frame, behind
a lightweight client-side password gate.
