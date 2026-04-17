# Columbia Carpool Miniapp

A WeChat Mini Program MVP for Fort Lee ↔ Columbia University commuting.

## Project Overview

This project is a campus carpool product prototype designed for Columbia students commuting between Fort Lee, NJ and Columbia University.

It focuses on three core problems:
- high commuting cost
- low efficiency of ad-hoc group coordination
- lack of trust in ride-sharing scenarios

The product includes two ride modes:
- Ride share
- Uber group split

## Repository Contents

- `miniprogram/` - WeChat Mini Program frontend
- `cloudfunctions/` - cloud functions for trip creation, joining, cancellation, profile and verification
- `CLAUDE_CODE_PROMPT.md` - product and UI specification
- `UI_COMPONENTS.md` - UI component rules
- `AI产品经理项目提炼_简历与面试稿.md` - interview and resume notes

## Core Features

- trip square homepage
- trip detail page
- create trip flow
- join confirmation flow
- my trips page
- campus verification and payment method setup

## Product Highlights

- focused on a real high-frequency commuting scenario
- designed with a complete workflow from browsing to fulfillment
- built lightweight trust mechanisms for a campus environment
- structured data model prepared for future smart matching and recommendation features

## Figma Design

Figma file:
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
