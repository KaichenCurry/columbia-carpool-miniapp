# 🚗 Columbia Carpool Miniapp

<div align="center">

[![Stars](https://img.shields.io/github/stars/KaichenCurry/columbia-carpool-miniapp?style=flat-square)](https://github.com/KaichenCurry/columbia-carpool-miniapp/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/WeChat%20Mini%20Program-07C160?style=flat-square)](https://developers.weixin.qq.com/miniprogram/dev/index.html)

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

```mermaid
flowchart LR
    subgraph Pain["Pain Points"]
        P1["💰 High Toll<br/>GWB $23.30/crossing"]
        P2["📱 Inefficient<br/>WeChat chaos"]
        P3["🔒 Trust Issues<br/>Unknown driver"]
    end

    subgraph Solution["Solutions"]
        S1["💵 Split Cost<br/>Only $8/person"]
        S2["📋 Standardized Flow<br/>One-click post/join"]
        S3["✅ CU Verification<br/>Verified identity"]
    end

    P1 --> S1
    P2 --> S2
    P3 --> S3

    style Pain fill:#ffcccc,stroke:#ff6666
    style Solution fill:#ccffcc,stroke:#66cc66
```

---

## Features

### User Flow

![Feature Preview](./docs/screenshots/merged-flow.png)

**Step 1: Homepage — Carpool Square**
Browse available trips, view map and daily carpool stats.

**Step 2: Trip Detail**
View driver info, route timeline, cost breakdown, then join.

**Step 3: Create Trip**
Fill in trip details, set time and seats, post your carpool.

**Step 4: My Trips**
Manage joined trips, view active/history orders.

**Step 5: Confirm Join**
Select payment method (Zelle/Venmo), complete the join.

---

## Core Features

### Trust System

| Feature | Description | Status |
|---------|-------------|--------|
| CU Verification | Columbia email/ID verification | ✅ |
| Rating System | 5-star rating | ✅ |
| Real Info | Name, license plate, vehicle | ✅ |
| Trip History | Driver's completed trips | ✅ |

### Transparent Pricing

| Item | Amount | Note |
|------|--------|------|
| GWB Toll | **$8/person** | Fixed |
| Gas Subsidy | Included | No extra |
| Hidden Fees | None | Clear |

---

## Technical Architecture

### System Architecture

```mermaid
flowchart TD
    subgraph Frontend["WeChat Mini Program"]
        F1["pages/index<br/>Carpool Square"]
        F2["pages/trip-detail<br/>Trip Detail"]
        F3["pages/create-trip<br/>Create Trip"]
        F4["pages/my-trips<br/>My Trips"]
        F5["components/*<br/>Components"]
        F6["services/*<br/>API Services"]
    end

    subgraph Cloud["WeChat Cloud"]
        C1["createTrip"]
        C2["joinTrip"]
        C3["leaveTrip"]
        C4["getTrips"]
        C5["verifyCU"]
        C6["..."]
    end

    subgraph Database["Cloud Database"]
        D1["users"]
        D2["trips"]
        D3["passengers"]
    end

    Frontend --> Cloud
    Cloud --> Database

    style Frontend fill:#e3f2fd,stroke:#2196f3
    style Cloud fill:#fff8e1,stroke:#ffc107
    style Database fill:#e8f5e9,stroke:#4caf50
```

---

## Quick Start

### Requirements

| Environment | Requirement |
|------------|--------------|
| WeChat DevTools | Latest |
| WeChat | 8.0+ |

### Setup

```bash
# 1. Clone
git clone https://github.com/KaichenCurry/columbia-carpool-miniapp.git
cd columbia-carpool-miniapp

# 2. Import in WeChat DevTools
# Select "Import Project"

# 3. Configure cloud environment
# Set cloud env ID in miniprogram/app.js

# 4. Create collections
# users, trips, passengers
```

---

## Project Structure

```
columbia-carpool-miniapp/
├── miniprogram/                    # Mini Program
│   ├── pages/
│   │   ├── index/               # Homepage
│   │   ├── trip-detail/          # Trip Detail
│   │   ├── create-trip/         # Create Trip
│   │   ├── my-trips/            # My Trips
│   │   └── join-confirm/        # Confirm
│   ├── components/               # Components
│   ├── services/                 # API Services
│   └── app.js
│
├── cloudfunctions/                # Cloud Functions
│   ├── createTrip/
│   ├── joinTrip/
│   ├── getTrips/
│   ├── verifyCU/
│   └── ...
│
└── docs/
    ├── screenshots/
    ├── PRD.md
    └── docs_FIGMA.md
```

---

## Project Status

### ✅ Implemented

| Feature | Status |
|---------|--------|
| 5-page Mini Program | ✅ |
| Create/Join flow | ✅ |
| CU Verification | ✅ |
| Mock data | ✅ |

### ⚠️ Planned

| Feature | Status |
|---------|--------|
| AI departure suggestion | ⚠️ v1.1 |
| Payment integration | ⚠️ Planned |
| Real-time tracking | ⚠️ Planned |

---

## Roadmap

```mermaid
gantt
    title Product Roadmap
    dateFormat  YYYY-MM
    section v1.0
    Basic carpool flow       :2026-01, 2026-04
    CU verification          :2026-01, 2026-04

    section v1.1
    AI departure suggestion   :2026-05, 2026-07
    Natural language create  :2026-05, 2026-07

    section v1.2
    Historical data analysis :2026-08, 2026-10
    Favorite routes          :2026-08, 2026-10

    section v2.0
    ML recommendation       :2026-11, 2027-01
    GWB real-time traffic  :2026-11, 2027-01
    Anomaly detection       :2026-11, 2027-01
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
