# 🚗 Columbia Carpool Miniapp

<div align="center">

[![Stars](https://img.shields.io/github/stars/KaichenCurry/columbia-carpool-miniapp?style=flat-square)](https://github.com/KaichenCurry/columbia-carpool-miniapp/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-WeChat%20Mini%20Program-07C160?style=flat-square)](https://developers.weixin.qq.com/miniprogram/dev/index.html)

**WeChat Mini Program for Columbia Students — Fort Lee ↔ Columbia University**

[中文](./README.md) · [Documentation](./docs) · [Figma Design](./docs_FIGMA.md)

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Problems & Solutions](#problems--solutions)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [AI Feature](#ai-feature)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Links](#links)

---

## Introduction

A WeChat Mini Program connecting Columbia University students commuting between **Fort Lee, NJ** and **Columbia University**.

### Two Ride Modes

| Mode | Description |
|------|-------------|
| 🚗 Ride Share | Driver posts trip, passengers join |
| 🚕 Uber Split | Passengers form group to split ride |

---

## Problems & Solutions

```
┌─────────────────────────────────────────────────────────────┐
│                    3 Commuting Pain Points                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  💰 High Toll           📱 Inefficient Coordination   🔒 Trust Barrier │
│  GWB $23.30/crossing   Chaos in WeChat groups     First-time anxiety │
│       ↓                        ↓                       ↓      │
│  💵 Split the Cost          📋 Standardized Flow      ✅ CU Verification │
│  Only $8/person           One-click post/join       Verified identity   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Features

### 1. Homepage — Carpool Square

![Homepage](./docs/screenshots/01-homepage.png)

Map showing Fort Lee ↔ Columbia route, real-time daily stats.

### 2. Trip Detail

![Trip Detail](./docs/screenshots/02-trip-detail.png)

Driver info, route timeline, cost breakdown, passenger list.

### 3. Create Trip

![Create Trip](./docs/screenshots/03-create-trip.png)

Select mode, set route & time, post trip.

### 4. My Trips

![My Trips](./docs/screenshots/04-my-trips.png)

View active/history trips, manage joined carpools.

### 5. Confirm Join

![Confirm Join](./docs/screenshots/05-confirm-join.png)

Confirm trip, select payment method (Zelle/Venmo), complete join.

---

## Core Features

### 🛡️ Trust System

| Feature | Description |
|---------|-------------|
| CU Verification | Driver must verify Columbia identity |
| Rating System | 5-star + trip history |
| Real Info | Name, license plate, vehicle model |

### 💰 Transparent Pricing

| Item | Amount |
|------|--------|
| GWB Toll | Fixed **$8/person** |
| Gas Subsidy | Included |
| Hidden Fees | None |

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    WeChat Mini Program Frontend                  │
│   pages/index       pages/trip-detail       pages/my-trips        │
│   components/*      services/*             app.js               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    WeChat Cloud Functions                       │
│                                                                  │
│   createTrip    joinTrip    leaveTrip    cancelTrip             │
│   getTrips      getTripDetail    getMyTrips    getUserProfile   │
│   verifyCU      getCreateTripHint                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    WeChat Cloud Database                        │
│      users              trips            passengers               │
└─────────────────────────────────────────────────────────────────┘
```

---

## AI Feature

### Smart Departure Time Suggestion

AI suggests optimal departure time based on historical data.

```json
{
  "departureTime": "8:30 AM",
  "confidence": "High",
  "reason": "Historical data shows 8:30 AM avoids GWB morning peak",
  "strategy": "heuristic_v1"
}
```

> Note: Currently heuristic-based, ML model planned for future.

---

## Quick Start

### Requirements

- WeChat DevTools
- WeChat Cloud Environment

### Setup

```bash
# 1. Clone
git clone https://github.com/KaichenCurry/columbia-carpool-miniapp.git
cd columbia-carpool-miniapp

# 2. Import in WeChat DevTools
# Select "Import Project", choose project.config.json

# 3. Configure cloud environment
# Set your cloud env ID in miniprogram/app.js

# 4. Initialize database (optional)
# Import seed data from cloudfunctions/seeds/
```

---

## Project Structure

```
columbia-carpool-miniapp/
├── miniprogram/                 # Mini Program
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── app.js
│
├── cloudfunctions/            # Cloud Functions
│   ├── createTrip/
│   ├── joinTrip/
│   ├── getTrips/
│   ├── verifyCU/
│   ├── getCreateTripHint/
│   └── seeds/
│
└── docs/
    └── screenshots/
```

---

## Roadmap

```
v1.0 (Current) ──────────────────────────────────────────────────────
    ✅ Basic carpool flow
    ✅ CU verification
    ✅ Heuristic AI suggestion

        ▼
v1.1 ────────────────────────────────────────────────────────────────
    📝 Natural language trip creation
    🔍 Smart search & filter

        ▼
v1.2 ────────────────────────────────────────────────────────────────
    📊 Historical data analysis
    🚗 Favorite routes

        ▼
v2.0 ────────────────────────────────────────────────────────────────
    🤖 ML recommendation model
    🚨 GWB real-time traffic
    ⚠️ Anomaly detection
```

---

## Links

| Resource | Link |
|----------|------|
| GitHub | https://github.com/KaichenCurry/columbia-carpool-miniapp |
| Figma | [Open](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/拼车-UI) |

---

## License

[MIT License](./LICENSE)

---

<div align="center">

**Star ⭐ if you find it useful!**

*Made by [Curry Chen](https://github.com/KaichenCurry)*

</div>
