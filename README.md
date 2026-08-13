# Takeout

A demo food delivery web app. Frontend only: no backend, no API keys, no network
requests, no image hosts. Everything runs from in-memory data, so it looks the
same offline as it does on stage.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

Other scripts:

```bash
npm run build     # type-check and build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## The demo flows

**1. Find something to eat** — Search restaurants by name, cuisine, or dish;
filter by cuisine or free delivery; sort by rating, speed, or fee. Open a
restaurant to see its menu with popular items pulled to the top, then add
dishes and adjust quantities inline.

**2. Order and track it** — Review the cart in the side drawer, choose delivery
or pickup, pick a tip, and pay with a fake card. Placing the order moves you to
a live tracking screen that walks from confirmed to delivered in about 36
seconds, with a moving courier and a countdown.

**3. Reorder** — Order history keeps every order in this browser. Reorder refills
the cart in one tap.

Two details worth demoing: adding a dish from a second restaurant asks before it
replaces your cart, and refreshing the page mid-delivery keeps the correct
progress because status is derived from the order's timestamp.

There's a **Fill demo details** button on checkout so you don't have to type an
address on stage, and **Reset demo data** on the orders screen to get back to a
clean slate.

## How it's built

Vite, React, TypeScript, and plain CSS. No UI or state libraries beyond React
Router.

```
src/
  data/restaurants.ts   Dummy catalog: 8 restaurants with full menus
  lib/
    store.ts            State shape, reducer, contexts, and hooks
    StoreProvider.tsx   Provider that persists state to localStorage
    ui.ts               Cart drawer and toast context
    UIProvider.tsx      Provider for that ephemeral UI state
    tracking.ts         Order timeline stages and time-derived progress
    format.ts           Currency, dates, and card input formatting
  components/           Header, cart drawer, cards, and other shared pieces
  pages/                Browse, RestaurantMenu, Checkout, TrackOrder, Orders
  index.css             Design tokens and every component style
```

A few conventions to know before editing:

- **Money is whole cents.** Format with `money()` at the edges only, so
  arithmetic stays exact.
- **Cart state is persisted; order status is not.** Status comes from
  `placedAt` plus the stages in `lib/tracking.ts`, which is why a refresh
  doesn't restart the timeline. Change the demo's pacing by editing `startsAt`
  on those stages.
- **One cart, one restaurant**, matching how real delivery apps behave.
- **Food photos are emoji on gradients** (`components/Tile.tsx`), which keeps
  the app dependency-free and offline.

## Not included

This is a demo, so there's no auth, no payment processing, no server, and no
tests. Orders live in `localStorage` under `takeout.state.v1` and disappear when
you clear site data.
