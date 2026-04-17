# 🚗 Columbia Carpool Miniapp

<div align="center">

[![Stars](https://img.shields.io/github/stars/KaichenCurry/columbia-carpool-miniapp?style=flat-square)](https://github.com/KaichenCurry/columbia-carpool-miniapp/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/WeChat%20Mini%20Program-07C160?style=flat-square)](https://developers.weixin.qq.com/miniprogram/dev/index.html)
[![WeChat](https://img.shields.io/badge/WeChat-07C160?style=flat-square&logo=wechat&logoColor=white)](https://weixin.qq.com/)

**WeChat Mini Program for Columbia Students — Fort Lee ↔ Columbia University**

[中文](./README.md) · [Product Requirements](./docs/PRD.md) · [Figma Design](./docs_FIGMA.md)

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Problems & Solutions](#problems--solutions)
- [Features](#features)
- [Core Features](#core-features)
- [Technical Architecture](#technical-architecture)
- [AI Feature](#ai-feature)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Related Documents](#related-documents)

---

## Introduction

### What It Is

A WeChat Mini Program connecting Columbia University students commuting between **Fort Lee, NJ** and **Columbia University**.

### Core Scenario

> Columbia students living in Fort Lee commute daily through the **George Washington Bridge (GWB)**. The one-way toll is **$23.30**. With carpooling, each passenger pays only **$8** — driver covers costs, passengers save money.

### Two Ride Modes

| Mode | Description | Price |
|------|-------------|-------|
| 🚗 Ride Share | Driver posts trip, passengers join | $8/person |
| 🚕 Uber Split | Passengers team up for Uber | Real-time |

---

## Problems & Solutions

### Three Pain Points

```
┌────────────────────────────────────────────────────────────────────────┐
│                    3 Commuting Pain Points                              │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   💰 High Toll                  📱 Inefficient Coordination   🔒 Trust │
│   GWB $23.30/crossing         Chaos in WeChat groups      Unknown driver │
│   Too expensive alone           Information scattered          No verification │
│        │                              │                           │        │
│        ▼                              ▼                           ▼        │
│   💵 Split the Cost             📋 Standardized Flow          ✅ CU Verification │
│   Only $8/person               One-click post/join          Verified identity │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Our Solution

| Pain Point | Solution | Implementation |
|-----------|----------|---------------|
| High cost | Fixed split | GWB $8/person, all-inclusive |
| Inefficient coordination | Online management | WeChat Mini Program |
| Trust issues | Identity verification | Columbia email verification |

---

## Features

### 1. Homepage — Carpool Square

![Homepage](./docs/screenshots/01-homepage.png)

**Features**:
- Map showing Fort Lee ↔ Columbia route
- Real-time "X people traveled today" banner
- Rideshare / Uber Split mode toggle
- Trip cards (driver, time, price, seats)

### 2. Trip Detail

![Trip Detail](./docs/screenshots/02-trip-detail.png)

**Features**:
- Driver info (verification badge, rating, vehicle)
- Route timeline visualization
- Cost breakdown (GWB $8, no hidden fees)
- Passenger list (joined/remaining seats)

### 3. Create Trip

![Create Trip](./docs/screenshots/03-create-trip.png)

**Features**:
- Mode toggle (Rideshare / Uber Split)
- Origin/destination selection
- Departure time picker
- Seat count selection
- **AI Smart departure time suggestion**

### 4. My Trips

![My Trips](./docs/screenshots/04-my-trips.png)

**Features**:
- Active / History tabs
- Trip cards with status
- Status tags (Pending / In Progress / Completed)

### 5. Confirm Join

![Confirm Join](./docs/screenshots/05-confirm-join.png)

**Features**:
- Trip summary
- Passenger preview
- Payment method (Zelle / Venmo)
- One-click confirm

---

## Core Features

### 🛡️ Trust System

| Feature | Description | Status |
|---------|-------------|--------|
| CU Verification | Columbia email/ID verification | ✅ |
| Rating System | 5-star rating | ✅ |
| Real Info | Name, license plate, vehicle | ✅ |
| Trip History | Driver's completed trips | ✅ |

### 💰 Transparent Pricing

| Item | Amount | Note |
|------|--------|------|
| GWB Toll | **$8/person** | Fixed |
| Gas Subsidy | Included | No extra |
| Hidden Fees | None | Clear |

### 📱 User Flow

```
Browse → View Detail → Join → Confirm Payment → My Trips
```

---

## Technical Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       WeChat Mini Program Frontend                       │
│                                                                         │
│   pages/index      pages/trip-detail    pages/create-trip    pages/my    │
│   components/*              services/*                                  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      WeChat Cloud Functions                             │
│                                                                         │
│   createTrip   joinTrip   leaveTrip   cancelTrip                      │
│   getTrips    getTripDetail   getMyTrips   getUserProfile             │
│   verifyCU    getCreateTripHint                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      WeChat Cloud Database                              │
│                    users        trips        passengers                  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology | Note |
|-------|-----------|------|
| Frontend | WeChat Mini Program | Native + custom components |
| Backend | Cloud Functions | Node.js serverless |
| Database | Cloud Database | NoSQL collections |
| Maps | WeChat Maps API | Route & markers |

---

## AI Feature

### Smart Departure Time Suggestion

AI recommends optimal departure time based on historical data.

```json
{
  "departureTime": "8:30 AM",
  "confidence": "High",
  "reason": "Historical data shows 8:30 AM avoids GWB morning peak",
  "strategy": "heuristic_v1"
}
```

> ⚠️ **Current**: Heuristic algorithm. ML model planned for future.

---

## Quick Start

### Requirements

| Environment | Requirement |
|------------|-------------|
| WeChat DevTools | Latest |
| WeChat | 8.0+ |

### Setup

```bash
# 1. Clone
git clone https://github.com/KaichenCurry/columbia-carpool-miniapp.git
cd columbia-carpool-miniapp

# 2. Import in WeChat DevTools
# Select "Import Project"
# Choose project root directory

# 3. Configure cloud environment
# Set cloud env ID in miniprogram/app.js

# 4. Create collections in WeChat Cloud Console:
# users, trips, passengers

# 5. Import seed data (optional)
# cloudfunctions/seeds/
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
    ├── screenshots/
    ├── PRD.md
    └── docs_FIGMA.md
```

---

## Roadmap

```
v1.0 (Current) ──────────────────────────────────────────────────────────
    ✅ Basic carpool flow
    ✅ CU verification
    ✅ Heuristic AI suggestion

        ▼
v1.1 ─────────────────────────────────────────────────────────────────────
    📝 Natural language trip creation
    🔍 Smart search & filter

        ▼
v2.0 ─────────────────────────────────────────────────────────────────────
    🤖 ML recommendation model
    🚨 GWB real-time traffic
    ⚠️ Anomaly detection
```

---

## Related Documents

| Document | Description |
|----------|-------------|
| [PRD.md](./docs/PRD.md) | Product Requirements Document |
| [docs_FIGMA.md](./docs_FIGMA.md) | Figma design notes |
| [UI_COMPONENTS.md](./UI_COMPONENTS.md) | UI component specs |

---

## License

[MIT License](./LICENSE)

---

<div align="center">

**Star ⭐ if you find it useful!**

*Made by [Curry Chen](https://github.com/KaichenCurry)*

</div>
