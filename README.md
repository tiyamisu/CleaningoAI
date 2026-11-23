# CleaningoAI

**Urban Environmental Intelligence Platform**  
*See Waste. Understand Risk. Enable Action.*

> **Research Status:** Academic Prototype — Experiments Pending  
> **Study Area:** Bengaluru, Karnataka, India  
> **Dataset:** 71 verified field observations across 14 zones

---

## Overview

CleaningoAI is a research prototype combining:
1. **Deep-learning waste detection** — YOLO-based waste localisation (DEMO MODE)
2. **Image-derived severity assessment** — Low / Medium / High / Not Assessable rubric
3. **Drainage-network-aware priority scoring** — Geospatial environmental risk analysis

**Research Title:** Deep Learning-Based Urban Waste Detection and Severity Assessment with Drainage-Network-Aware Geospatial Environmental Risk Prioritisation: A Case Study of Bengaluru

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- Python 3.10+ (optional, for inference server)

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@cleaningo.ai | demo123 |
| Municipal Officer | officer@cleaningo.ai | demo123 |
| Field Inspector | inspector@cleaningo.ai | demo123 |
| Researcher | researcher@cleaningo.ai | demo123 |
| Citizen | citizen@cleaningo.ai | demo123 |

---

## Project Structure

```
cleaningoai/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public website pages
│   │   ├── (app)/             # Intelligence application
│   │   ├── (ops)/             # Operations portal
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── layout/            # Navigation, sidebars, footers
│   │   ├── map/               # Leaflet map components
│   │   ├── charts/            # Recharts visualisations
│   │   └── ui/                # Design system components
│   └── lib/
│       ├── db.ts              # SQLite database
│       ├── seed.ts            # Database seeding (71 real records)
│       ├── constants.ts       # Zone definitions, labels
│       ├── utils.ts           # Utility functions
│       └── api.ts             # Client API helpers
├── data/
│   └── cleaningoai.db         # SQLite database (auto-created)
├── public/
│   ├── uploads/               # Uploaded images
│   ├── logo.svg               # Light logo
│   ├── logo-dark.svg          # Dark logo
│   └── emblem.svg             # Standalone emblem
├── .env.example               # Environment variable template
└── field_data.json            # Exported field observations (71 records)
```

---

## Three Product Experiences

### 1. Public Website (`/`)
Startup-facing website explaining CleaningoAI, its research, technology, and Bengaluru pilot.

### 2. Intelligence Application (`/app`)
- **GeoIntel** — Interactive Bengaluru map with 71 real observation markers
- **Vision** — AI image analysis (DEMO MODE clearly labelled)
- **Severity Engine** — Annotation and assessment workflow
- **HydroRisk** — Drainage-network-aware priority scoring (SYNTHETIC DEMO NETWORK)
- **Reports** — Public incident submission
- **Incidents** — Incident lifecycle management
- **Analytics** — Real-time analytics from database
- **Research** — Academic workspace

### 3. Operations Portal (`/ops`)
Role-aware portal for municipal officers, field inspectors, and administrators.

---

## Research Dataset

| Metric | Value |
|--------|-------|
| Total verified observations | 71 |
| Unique zones | 14 |
| Waste types | MIXED, PLASTIC, CONSTRUCTION |
| Date range | Feb 2026 – May 2026 |
| Coordinate system | WGS84 (EPSG:4326) |

### Data Provenance
- Field observations: **Verified** (real GPS coordinates, field-collected)
- Drainage network: **SYNTHETIC DEMO** (illustrative only, not hydraulically verified)
- AI inference results: **DEMO MODE** (until real model checkpoint is integrated)

---

## Scientific Limitations

1. **Drainage connectivity is unverified** — HydroRisk uses a synthetic demo network. No hydraulic connectivity has been field-verified.
2. **AI inference is demo mode** — YOLO model integration requires a trained checkpoint not yet available.
3. **Severity labels are pending** — Human annotation of the 71 observations has not been completed.
4. **Research is proposal stage** — Experiments E1–E4 have not been conducted. No metrics are reported.
5. **Environmental risk ≠ contamination** — Risk scores are inspection priority indicators, not measured contamination or health risk.

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Database | SQLite (better-sqlite3) |
| Maps | Leaflet.js, react-leaflet |
| Charts | Recharts |
| Icons | Lucide React |
| AI (future) | Python FastAPI + YOLO |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/observations` | List observations (filterable) |
| POST | `/api/observations` | Create observation |
| GET | `/api/incidents` | List incidents |
| POST | `/api/incidents` | Submit incident |
| GET | `/api/incidents/[id]` | Get incident detail |
| PATCH | `/api/incidents/[id]` | Update incident status |
| GET | `/api/analytics` | Aggregated analytics |
| POST | `/api/vision/analyze` | Demo AI analysis |
| GET | `/api/hydrorisk` | Priority scores |

---

## Known Limitations

- Photo upload stores files locally (not production-grade object storage)
- Authentication uses demo credentials (not production-ready)
- Drainage analysis uses synthetic data
- AI inference is simulation only
- No real-time data updates (no WebSocket)
- Single-user SQLite (not suitable for concurrent production use)

---

## Future Development Roadmap

1. **Integrate real YOLO checkpoint** — Replace DEMO MODE with actual inference
2. **Acquire authoritative drainage data** — BBMP/BWSSB municipal drainage geometry
3. **Field-verify connectivity** — On-site validation of drainage connections
4. **Multi-rater severity annotation** — Cohen's kappa validation
5. **Run experiments E1–E4** — Comparative evaluation with spatial cross-validation
6. **Production database** — PostgreSQL + PostGIS for concurrent access
7. **Object storage** — AWS S3 / GCS for photograph storage
8. **Multi-city expansion** — Generalise beyond Bengaluru

---

## Disclaimer

This platform is an **academic research prototype**. All environmental risk assessments are inspection priority screening tools and do not represent measured contamination, verified pollution, or regulatory environmental assessment. The platform must not be used for engineering, regulatory, or legal decisions without independent professional verification.

---

© 2026 CleaningoAI Research Team | Bengaluru, Karnataka, India | Academic Research Prototype
