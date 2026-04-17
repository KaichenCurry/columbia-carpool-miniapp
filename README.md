# Columbia Carpool Miniapp

<div align="center">

A workflow-first WeChat Mini Program MVP for **Fort Lee ↔ Columbia University** commuting.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![WeChat Mini Program](https://img.shields.io/badge/platform-WeChat%20Mini%20Program-07C160)](./project.config.json)
[![AI Demo](https://img.shields.io/badge/AI%20demo-heuristic__v1-4C6FFF)](./cloudfunctions/getCreateTripHint/index.js)
[![Status](https://img.shields.io/badge/status-MVP-orange)](#current-status)

</div>

---

## Overview

This project is a campus carpool product prototype for Columbia students commuting between **Fort Lee, NJ** and **Columbia University**.

It is built around three concrete problems:
- commute cost is high because the route crosses the **George Washington Bridge**
- ride coordination in group chats is inefficient
- first-time ride sharing has a trust barrier

The current MVP supports two ride modes:
- **Ride share**: a driver posts a trip and takes passengers
- **Uber group split**: riders form a group and split a ride

> This is **not** a fully AI-native product yet. It is a real workflow MVP with one small shipped AI-style feature and a larger roadmap for future evolution.

---

## Table of Contents

- [Overview](#overview)
- [Product Showcase](#product-showcase)
- [Core Features](#core-features)
- [Shipped AI Demo](#shipped-ai-demo)
- [Architecture](#architecture)
- [Current Status](#current-status)
- [Quick Start](#quick-start)
- [Design Resources](#design-resources)
- [Roadmap](#roadmap)
- [License](#license)

---

## Product Showcase

### Figma entry points

- [Homepage](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=6-2)
- [Trip Detail](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=12-2)
- [Create Trip](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=15-2)
- [My Trips](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=19-2)
- [Join Confirmation](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=21-2)

---

## Core Features

### Product flow
- browse available trips from the homepage trip square
- view trip route, toll breakdown, seat status, and driver info
- create a new ride-share or Uber split trip
- confirm joining with payment method selection
- review active and history trips from the personal trip center

### Trust and rules
- campus verification entry
- clear pricing explanation for toll-sharing
- payment method selection flow
- trip status management and seat tracking

### Engineering support
- Mini Program frontend pages and components
- cloud functions for trip creation, joining, leaving, cancellation, and profile queries
- mock data and seed data for local testing

---

## Shipped AI Demo

A small AI-style feature is already implemented inside the **create-trip flow**.

### What it does
- generates a suggested departure time when the create-trip sheet opens
- refreshes the suggestion when the user changes trip mode or swaps route
- returns:
  - suggested departure time
  - confidence label
  - short reason text
  - strategy version `heuristic_v1`
- supports **one-click apply** back into the trip form

### Current implementation
- frontend hook: `miniprogram/pages/index/index.js`
- UI card: `miniprogram/components/create-trip-sheet/`
- service layer: `miniprogram/services/trip.service.js`
- backend function: `cloudfunctions/getCreateTripHint/index.js`

### What it is not
- not an LLM-powered assistant
- not a full ride-matching engine
- not a production recommendation system
- not a demand forecasting model

This is intentionally scoped as a **small, honest, explainable AI demo** rather than an overstated AI claim.

---

## Architecture

```text
Mini Program UI
  └─ miniprogram/pages/*
       └─ create-trip-sheet component
            └─ trip.service.js
                 └─ cloud.js
                      └─ cloudfunctions/*
                           ├─ createTrip
                           ├─ joinTrip
                           ├─ getTrips
                           ├─ getTripDetail
                           ├─ getMyTrips
                           ├─ getUserProfile
                           ├─ verifyCU
                           └─ getCreateTripHint
```

### Key directories
- `miniprogram/` — frontend pages, components, services, constants
- `cloudfunctions/` — cloud function endpoints and shared backend logic
- `cloudfunctions/common/src/` — constants, validators, repos, mappers, response helpers
- `cloudfunctions/seeds/` — local seed data for `users` and `trips`
- `docs/screenshots/` — README visual assets

---

## Current Status

### Implemented
- 5-page Mini Program structure
- trip creation and join workflow
- trip detail and my trips views
- cloud function skeleton for major trip operations
- local mock fallback in frontend service layer
- small heuristic AI trip-hint feature

### Limitations
- some create-flow selectors still use placeholder interactions
- payment settlement is not integrated
- live trip fulfillment tracking is not implemented
- AI logic is heuristic, not model-driven
- some frontend flows rely on mock fallback for local testing

---

## Quick Start

### Requirements
- WeChat DevTools
- a WeChat cloud environment

### Run locally
1. Open the repo in **WeChat DevTools**.
2. Import the project using `project.config.json`.
3. Set your own cloud environment ID in `miniprogram/app.js`.
4. Create cloud database collections and import seed data from `cloudfunctions/seeds/` if needed.

### Seed data
- `cloudfunctions/seeds/users.seed.json`
- `cloudfunctions/seeds/trips.seed.json`
- `cloudfunctions/seeds/README.txt`

---

## Design Resources

- Figma notes: [`docs_FIGMA.md`](./docs_FIGMA.md)
- product spec: [`CLAUDE_CODE_PROMPT.md`](./CLAUDE_CODE_PROMPT.md)
- UI tokens and component rules: [`UI_COMPONENTS.md`](./UI_COMPONENTS.md)

---

## Roadmap

Potential next steps:
- natural language trip creation
- smarter recommendation based on route and time patterns
- peak commute demand prediction
- abnormal cancellation detection
- GWB traffic-aware ride reminders

---

## License

MIT — see [`LICENSE`](./LICENSE).
