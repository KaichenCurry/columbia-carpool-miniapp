# Columbia Carpool Miniapp

A workflow-first WeChat Mini Program MVP for Fort Lee ↔ Columbia University commuting.

> This repository is **not an AI-native product yet**. It is a real workflow product MVP with a clear roadmap toward AI-native evolution, including smart matching, demand prediction, and risk detection.

## What this project is

This project is a campus carpool product prototype for Columbia students commuting between Fort Lee, NJ and Columbia University.

It focuses on three concrete problems:
- commuting cost is high
- ad-hoc coordination in group chats is inefficient
- first-time ride sharing has a trust barrier

The current MVP includes two ride modes:
- **Ride share**: driver posts a trip and takes passengers
- **Uber group split**: riders form a small group and split a ride

## Why this project is worth viewing

- it comes from a **real user scenario**, not a fictional case study
- it is built as a **complete workflow**, not just a UI prototype
- it includes **trust rules, pricing explanation, and trip state design**
- it already has a product structure that can evolve into AI features later

## Project Screens

### Key screen links
- [Homepage / Trip square](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=6-2)
- [Trip detail](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=12-2)
- [Create trip](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=15-2)
- [My trips](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=19-2)
- [Join confirmation](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/%E6%8B%BC%E8%BD%A6-UI?node-id=21-2)

### Screen overview
| Screen | What it shows |
|---|---|
| Homepage | map view, today banner, ride cards, mode tabs, publish button |
| Trip detail | route timeline, toll breakdown, driver info, seat status |
| Create trip | mode selection, origin/destination, time, seat count |
| My trips | active trip card, history list, savings feedback |
| Join confirmation | rider list, payment method, fee explanation |

> Static PNG screenshots can be exported later if needed. For now, the Figma links above are the most accurate review entry points.

## Repository Contents

- `miniprogram/` - WeChat Mini Program frontend
- `cloudfunctions/` - cloud functions for trip creation, joining, cancellation, profile, and verification
- `CLAUDE_CODE_PROMPT.md` - product and UI specification
- `UI_COMPONENTS.md` - UI component rules
- `docs_FIGMA.md` - design file notes and screen mapping
- `AI产品经理项目提炼_简历与面试稿.md` - interview and resume notes

## Core Features

- homepage trip square
- trip detail page
- create trip flow
- join confirmation flow
- my trips page
- campus verification and payment method setup

## Current Product Scope

### Already implemented in the repo
- Mini Program page structure
- trip creation and join flows
- trip detail and my trips views
- cloud function skeleton and data model
- campus verification entry
- mock data and seed data for local testing

### Not yet implemented
- real AI features
- real payment settlement
- live trip fulfillment tracking
- operations strategy for cold start

## AI Roadmap

The AI part is currently a **roadmap**, not a shipped feature. The most realistic next steps are:
- natural language trip creation
- smart trip recommendation based on route and time
- demand prediction for peak commute windows
- abnormal cancellation detection

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
