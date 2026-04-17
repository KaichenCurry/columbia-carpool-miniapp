# Columbia Carpool Miniapp

A workflow-first WeChat Mini Program MVP for Fort Lee ↔ Columbia University commuting.

> A real product MVP built around a real student commute scenario. The repo now includes a **small shipped AI demo** in the create-trip flow: an AI-style departure-time suggestion based on route direction and current trip samples.

## Project Snapshot

- **Product type**: WeChat Mini Program MVP
- **Core scenario**: Fort Lee ↔ Columbia student commute
- **Main modes**: Ride share / Uber group split
- **Current AI scope**: lightweight departure-time recommendation (`heuristic_v1`)
- **Positioning**: workflow-first product with an AI-native roadmap

## What problem it solves

This project is designed for Columbia students commuting between **Fort Lee, NJ** and **Columbia University**.

It focuses on three concrete problems:
- commuting cost is high because the route crosses the George Washington Bridge
- ad-hoc coordination in group chats is inefficient
- first-time ride sharing has a trust barrier

## Product Showcase

### Homepage
![Homepage](docs/screenshots/home.jpg)

### Trip Detail
![Trip Detail](docs/screenshots/trip-detail.jpg)

### Create Trip
![Create Trip](docs/screenshots/create-trip.png)

### More screens in Figma
- [My trips](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=19-2)
- [Join confirmation](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=21-2)

## What is implemented now

### Product workflow
- homepage trip square
- trip detail page
- create trip flow
- join confirmation flow
- my trips page
- campus verification entry

### Engineering structure
- Mini Program frontend under `miniprogram/`
- cloud functions under `cloudfunctions/`
- mock data and seed data for local validation
- product spec and UI tokens documented in the repo

## Shipped AI demo

This repo now includes a **small real AI demo** inside the existing create-trip flow.

### What it does
- generates a suggested departure time when the user opens the create-trip sheet
- updates the suggestion when the user changes mode or swaps route
- shows:
  - suggested departure time
  - confidence label
  - short reason text
  - strategy version `heuristic_v1`
- supports **one-click apply** back into the form

### What it is not
- not a large-model assistant
- not a full matching engine
- not a demand forecasting system
- not a production-grade recommendation model

This keeps the claim honest: the repo has **one shipped AI-style capability**, while larger AI features remain part of the roadmap.

## AI roadmap

The most realistic next steps are:
- natural language trip creation
- smart trip recommendation based on route and time
- peak commute demand prediction
- abnormal cancellation detection
- GWB traffic-aware ride reminders

## Why this project is worth reviewing

- based on a **real user scenario**, not a fictional case study
- built as a **complete workflow**, not just a UI draft
- includes trust rules, pricing explanation, and trip-state design
- now contains a small but real AI demo in the codebase
- suitable for product / AI PM portfolio discussion because the scope is honest and explainable

## Repository Contents

- `miniprogram/` - WeChat Mini Program frontend
- `cloudfunctions/` - cloud functions for trip creation, joining, cancellation, profile, verification, and AI hint generation
- `CLAUDE_CODE_PROMPT.md` - product and UI specification
- `UI_COMPONENTS.md` - UI component rules
- `docs_FIGMA.md` - design file notes and screen mapping
- `AI产品经理项目提炼_简历与面试稿.md` - resume and interview notes

## Figma Design

Main design file:
https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI

## Local Development

### WeChat Mini Program
1. Open this project in WeChat DevTools.
2. Import the project with `project.config.json`.
3. Set your own cloud environment ID in `miniprogram/app.js`.
4. Create cloud database collections and import seed data from `cloudfunctions/seeds/` if needed.

### Seed Data
- `users.seed.json`
- `trips.seed.json`

## Notes

- `project.private.config.json` is excluded from version control.
- `.claude/` is excluded from version control.
- The cloud environment ID has been cleared before open-source publishing.

## License

MIT
