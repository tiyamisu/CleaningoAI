# CleaningoAI: Urban Environmental Intelligence & Hydrological Risk Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6_Canary-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-WAL_Mode-003B57?style=flat&logo=sqlite)](https://sqlite.org/)
[![Status](https://img.shields.io/badge/Status-Academic_Prototype-emerald?style=flat)]()
[![Study Area](https://img.shields.io/badge/Study_Area-Bengaluru,_India-FF9933?style=flat)]()

> **Research Title:** *Deep Learning-Based Urban Waste Detection and Severity Assessment with Drainage-Network-Aware Geospatial Environmental Risk Prioritisation: A Case Study of Bengaluru*  
> **Platform Version:** 2.0 (Full-Stack Next.js 16 App Router Platform)  
> **Study Area:** Greater Bengaluru Metropolitan Area, Karnataka, India  
> **Empirical Dataset:** 71 Verified GPS Field Observations across 14 Administrative Zones  

---

## Table of Contents

1. [Executive Summary & Problem Statement](#1-executive-summary--problem-statement)
2. [Authoritative Technology Stack](#2-authoritative-technology-stack)
3. [System Architecture & Engineering Design](#3-system-architecture--engineering-design)
4. [Complete Product Suites & Route Directory](#4-complete-product-suites--route-directory)
5. [Field Study Dataset & Empirical Methodology](#5-field-study-dataset--empirical-methodology)
6. [HydroRisk Analytical Engine & Mathematical Formulations](#6-hydrorisk-analytical-engine--mathematical-formulations)
7. [Computer Vision & Visual Severity Engine](#7-computer-vision--visual-severity-engine)
8. [Municipal Incident Lifecycle & State Machine](#8-municipal-incident-lifecycle--state-machine)
9. [Relational Database Schema & Data Dictionary](#9-relational-database-schema--data-dictionary)
10. [RESTful API Specification](#10-restful-api-specification)
11. [Project Directory Structure](#11-project-directory-structure)
12. [Installation, Configuration & Quick Start](#12-installation-configuration--quick-start)
13. [Academic Deliverables & Documentation Hub](#13-academic-deliverables--documentation-hub)
14. [Scientific Limitations & Boundary Conditions](#14-scientific-limitations--boundary-conditions)
15. [Future Research Roadmap](#15-future-research-roadmap)
16. [License, Ethical Disclosures & Citations](#16-license-ethical-disclosures--citations)

---

## 1. Executive Summary & Problem Statement

Rapid urbanization across developing metropolises like Greater Bengaluru has outpaced municipal waste collection and stormwater drainage management. Unregulated open waste dumping obstructs stormwater channels (rajakaluves), exacerbates urban flash flooding, contaminates lacustrine and riverine ecosystems (e.g., Bellandur Lake, Varthur Lake, Vrishabhavathi River), and creates severe public health hazards.

Existing civic grievance applications (such as BBMP Sahaaya or Swachhata) operate primarily as passive photo-ticketing logs. They treat every waste dump identically without contextual intelligence:
- They lack automated computer vision to gauge the physical magnitude or spatial footprint of waste.
- They evaluate reports in isolation without modeling geospatial proximity to waterways or hydrological transport pathways.
- They fail to prioritize interventions based on catastrophic environmental risk.

**CleaningoAI** bridges this critical gap by synthesizing:
1. **Computer Vision Localisation:** Deep-learning waste detection and classification (demonstrated via deterministic mock adapter with planned spatial-holdout YOLO integration).
2. **Standardized Severity Rubric:** A rigorous 4-tier visual annotation standard (Low, Medium, High, Not Assessable) separating visual surface severity from historical field risk.
3. **HydroRisk Geospatial Hydrology:** Multi-criteria risk scoring that combines inverse Euclidean waterway proximity ($E_1$), empirical field risk scores ($E_2$), combined Euclidean priority ($E_3$), and topological drainage-network connectivity ($E_4$).
4. **End-to-End Operational Dispatch:** A 6-state verified incident tracking lifecycle connecting citizen reports, municipal triage, field inspector verification, and resolution auditing.

---

## 2. Authoritative Technology Stack

CleaningoAI is built on modern, production-grade web technologies without legacy overhead:

| Layer | Technology | Version | Purpose / Architectural Note |
| :--- | :--- | :--- | :--- |
| **Full-Stack Framework** | [Next.js](https://nextjs.org/) | `16.4.6` | App Router architecture with Turbopack, React Server Components, server actions, and route handlers. |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | Latest React core with enhanced hydration, asynchronous action handling, and component primitives. |
| **Styling Engine** | [Tailwind CSS](https://tailwindcss.com/) | `4.3.3` | Next-generation Tailwind v4 utilizing `@tailwindcss/turbopack` and CSS-native `@theme` tokens in `globals.css`. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.8+` | Strict type checking, shared domain interfaces, and schema safety. |
| **Database** | [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) | `13.2.0` | High-performance synchronous embedded SQLite database with Write-Ahead Logging (`WAL`) mode. |
| **Geospatial Mapping** | [Leaflet](https://leafletjs.com/) / [react-leaflet](https://react-leaflet.js.org/) | `1.9.4` / `5.0.0` | Interactive mapping, custom risk-tiered SVG markers, layer controls, and WGS-84 coordinate projection. |
| **Data Visualisation** | [Recharts](https://recharts.org/) | `3.11.0` | Composable SVG analytics charts for zonal densities, waste distributions, and temporal trends. |
| **Icons & UI** | [Lucide React](https://lucide.dev/) | `1.78.0` | Modern, consistent iconography across all portals. |
| **Schema Validation** | [Zod](https://zod.dev/) | `4.6.7` | Runtime type validation for API payloads and forms. |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) | `5.1.0` | Lightweight, scalable client state stores for filters and map telemetry. |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) | `7.92.0` | Performant, uncontrolled form state with `@hookform/resolvers`. |
| **Security / Auth** | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | `3.0.3` | Password hashing for role-based authentication. |

---

## 3. System Architecture & Engineering Design

The CleaningoAI platform architecture follows a modular, five-tier design. A 300 DPI high-resolution diagram is available at `docs/architecture_diagram.png`.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. CLIENT PRESENTATION TIER                     │
│  Public Showcase │ GeoIntel Map │ Vision AI Lab │ Incident Lifecycle  │
│  Tailwind CSS v4 │ Leaflet.js   │ Recharts SVGs │ Lucide React Icons  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON REST
┌───────────────────────────────────▼────────────────────────────────────┐
│                   2. NEXT.JS 16 APPLICATION RUNTIME                    │
│   App Router Server Components │ Route Handlers │ Role-Based Gateways  │
│   (public) │ (app) │ (ops) │ (intelligence) │ (operations) │ (research)│
└───────────────────┬───────────────────────────────┬────────────────────┘
                    │                               │
┌───────────────────▼──────────────┐  ┌─────────────▼────────────────────┐
│   3. ANALYTICAL ENGINES          │  │ 4. RELATIONAL PERSISTENCE (SQLite│
│   • HydroRisk Scoring Engine     │  │   • better-sqlite3 (WAL Mode)    │
│     (Formulations E1, E2, E3, E4)│  │   • observations (71 records)    │
│   • Vision AI Mock Adapter       │  │   • incidents & audit_events     │
│     (DEMO_MODE_v1.0, SHA-256)    │  │   • materials, facilities (v2.0) │
└──────────────────────────────────┘  └──────────────────────────────────┘
                    │ (Future Integration)
┌───────────────────▼────────────────────────────────────────────────────┐
│              5. EXTERNAL INFERENCE & REMOTE SENSING (PLANNED)          │
│   Python FastAPI │ YOLOv8/v11 Object Detection │ PostGIS Hydrology Graph│
└────────────────────────────────────────────────────────────────────────┘
```

### Architectural Highlights:
1. **Presentation Tier:** Delivers responsive, zero-runtime CSS styling via Tailwind CSS v4 and interactive client-side rendering for maps (dynamically imported with `ssr: false` to avoid Leaflet SSR window errors).
2. **Next.js Full-Stack Tier:** Uses Next.js App Router route groups to cleanly decouple public, intelligence, and operations interfaces while sharing core UI primitives.
3. **Relational Persistence Tier:** Backed by an embedded SQLite instance (`data/cleaningoai.db`) configured with `PRAGMA journal_mode = WAL` and `PRAGMA foreign_keys = ON` for ACID compliance and non-blocking reads during writes.
4. **Analytical Engines:** Pure TypeScript mathematical engines compute real-time geospatial proximity and risk metrics.
5. **Future Machine Learning Integration:** Clean API interfaces allow swapping the current deterministic mock vision adapter with a live Python FastAPI / YOLO microservice without modifying frontend views.

---

## 4. Complete Product Suites & Route Directory

CleaningoAI features 6 dedicated product experiences and 48 application routes:

### 1. Public Showcase Experience — `(public)`
The public-facing brand, educational, and research portal:
- `/` — Homepage: Hero introduction, platform capabilities, Bengaluru pilot metrics, and interactive showcase.
- `/about` — Mission, BBMP civic alignment, research background, and institutional vision.
- `/challenges` — Deep dive into urban solid waste, rajakaluve blockage, and lacustrine degradation in Bengaluru.
- `/solutions` — Technical breakdown of the AI vision, severity engine, and HydroRisk triage solutions.
- `/platform` — Interactive preview of the intelligence platform and operational dispatch suites.
- `/technology` — Exhaustive documentation of the Next.js, SQLite, Leaflet, and computer vision architecture.
- `/research` — Academic literature review, methodology, and download links for the IEEE research paper.
- `/partnerships` — Collaboration framework for municipal bodies (BBMP, BWSSB, KSPCB), NGOs, and academic labs.
- `/impact` — Quantified environmental projections, flood mitigation potential, and response time reductions.
- `/contact` — Civic partnership inquiry and developer contact form.
- `/signin` — Unified role-based authentication portal.

### 2. Core Intelligence Application — `(app)`
The primary analytical workspace for environmental researchers and municipal decision-makers:
- `/app` — Operations Command Overview: KPI telemetry (71 sites, 30 high risk, 6 incidents, 10 waterways), risk distributions, and quick navigation.
- `/app/map` — GeoIntel Map Explorer: Interactive Bengaluru Leaflet map rendering all 71 GPS markers, risk-tiered color-coding, and site metadata panels.
- `/app/vision` — Vision AI Lab: Image upload validation, mock bounding-box localisation, confidence metrics, and deterministic `DEMO_MODE_v1.0` diagnostic telemetry.
- `/app/severity` — Severity Annotation Engine: 4-tier visual annotation rubric (Low, Medium, High, Not Assessable), pending review queue, and inter-rater guidelines.
- `/app/hydrorisk` — HydroRisk Matrix: Comparative E1–E4 mathematical scores, nearest waterway distance calculations, and synthetic demo disclaimers.
- `/app/incidents` — Municipal Incident Queue: Tabular incident tracking, status badges, inspector assignments, and severity indicators.
- `/app/incidents/[id]` — Incident Detail & Chronological Timeline: Deep-dive inspection into specific incidents with audit trail logging.
- `/app/reports` — Public Incident Reporting: Citizen-facing submission interface with automatic coordinate capture, waste classification, and photo upload.
- `/app/analytics` — Spatial Analytics Dashboard: Recharts bar, pie, and area graphs illustrating zonal densities, waste category distributions, and management intervention frequencies.
- `/app/research` — Academic Research Workspace: Experiment definitions, mathematical formulations, and dataset exploration tools.
- `/app/settings` — System and profile configuration.

### 3. Municipal Operations Portal — `(ops)`
Role-aware operational portal designed for field crews and administrative triage:
- `/ops` — Operations Hub: Real-time dispatch telemetry and active squad tracking.
- `/ops/queue` — Central Dispatch Queue: Priority-sorted incidents ready for assignment.
- `/ops/queue/[id]` — Dispatch Detail: Detailed routing and field instructions for specific incidents.
- `/ops/assign` — Officer Assignment Console: Assigns pending complaints to designated zonal inspectors (`inspector.ravi@cleaningoai.in`, etc.).
- `/ops/inspect` — Inspector Mobile Field Assessment: Field verification interface with evidence collection.
- `/ops/audit` — Compliance & Audit Trail: Chronological logging of all administrative and status mutations.
- `/ops/admin` — Master Administration Console: Database maintenance and user role administration.

### 4. Cross-Domain Environmental Intelligence Suite — `(intelligence)`
Multi-sectoral urban environmental monitoring modules:
- `/intelligence` — Unified Environmental Intelligence Hub.
- `/intelligence/water` — Waterway quality, lake catchment status, and rajakaluve monitoring.
- `/intelligence/waste` — Municipal solid waste accumulation metrics and transfer station flows.
- `/intelligence/air` — Localized particulate matter (PM2.5/PM10) proxies from waste combustion.
- `/intelligence/chemical` — Hazardous chemical dumping and industrial runoff tracking.
- `/intelligence/materials` — Material lifecycle analysis and circular economy metrics.
- `/intelligence/energy` — Waste-to-energy feasibility and biomethanation potential.
- `/intelligence/industrial` — Factory-adjacent waste hotspot monitoring.
- `/intelligence/space` — Satellite remote sensing and multispectral imagery correlation.
- `/intelligence/intervention` — Predictive intervention planning and municipal crew dispatch optimization.

### 5. Municipal & Facility Operations Suite — `(operations)`
Field engineering, asset management, and laboratory operations:
- `/operations` — Engineering Operations Hub.
- `/operations/field` — Field team tracking and GPS patrol route optimization.
- `/operations/equipment` — Waste collection vehicles, compactors, and sweeper tracking.
- `/operations/treatment` — Waste processing plant and composting facility telemetry.
- `/operations/recovery` — Dry Waste Collection Centres (DWCC) and recycling tracking.
- `/operations/laboratory` — Water and soil sample lab testing results.
- `/operations/sensors` — IoT environmental sensor network monitoring.
- `/operations/incidents` — Comprehensive incident management overview.
- `/operations/verification` — Multi-stage municipal sign-off and verification.
- `/operations/audit` — Regulatory compliance reporting (KSPCB / CPCB guidelines).
- `/operations/industrial` — Industrial compliance auditing.

### 6. Academic Research Platform — `(research-platform)`
Scientific experimentation, literature indexing, and simulation suite:
- `/research-platform` — Academic Research Platform Gateway.
- `/research-platform/datasets` — Tabular exploration, schema validation, and coordinate export of the 71 Bengaluru field observations.
- `/research-platform/experiments` — Empirical experiment design registry (Experiments E1 through E4).
- `/research-platform/literature` — Comprehensive bibliography of 10 foundational research studies.
- `/research-platform/simulation` — HydroRisk hydraulic simulation and graph flow modeling.
- `/research-platform/publications` — Manuscript drafts, IEEE paper downloads, and citation metadata.
- `/research-platform/materials` — Material classification standards and recyclability taxonomy.
- `/research-platform/chemical` — Hazardous substance registry and CAS numbers.

---

## 5. Field Study Dataset & Empirical Methodology

The CleaningoAI empirical dataset contains **71 verified field observations** collected directly across the Greater Bengaluru urban and peri-urban landscape between February and May 2026.

### Geographic Bounds & Coordinate Reference System
- **CRS:** WGS-84 (EPSG:4326)
- **Bounding Box:** 
  - Latitude: $12.78^\circ\text{ N}$ to $13.14^\circ\text{ N}$
  - Longitude: $77.42^\circ\text{ E}$ to $77.78^\circ\text{ E}$
  - Center: $[12.9716^\circ\text{ N}, 77.5946^\circ\text{ E}]$

### Zone Taxonomy (14 Verified Zones)
The dataset encompasses 14 distinct zones representing diverse urban morphologies (dense residential, industrial corridors, lake peripheries, and peri-urban agrarian fringes):

| Zone Code | Geographic / Administrative Region | Observation Count | Dominant Land Use |
| :--- | :--- | :---: | :--- |
| `ZONE_02-KK` | Kanakapura / Konanakunte | 5 | Rapidly developing suburban / lake catchment |
| `ZONE_03-N_C_G` | Nagarbhavi / Chandralayout | 6 | Dense residential & commercial wards |
| `ZONE_04_HC` | Hesaraghatta / Chikkabanavara | 5 | Peri-urban / lake reservoir buffer zone |
| `ZONE_08-FWP` | Fruit Market / Waste Processing | 5 | Commercial wholesale & organic waste center |
| `ZONE_10-TF` | T.Dasarahalli / Banashankari 6th Stage | 6 | High-density mixed residential / arterial road |
| `ZONE_11_NLG-P` | Nalaghatta / Peenya Industrial Area | 6 | Heavy industrial & manufacturing corridor |
| `ZONE_12_AG_MAINROAD`| Arekere / Gottigere Main Road | 5 | Rapid transit corridor & residential |
| `ZONE_14_KN` | Kothnur / Nyanappanahalli | 5 | Lake periphery & suburban residential |
| `ZONE_15_K-M_MR` | Krishnarajapura / Mahadevapura | 5 | IT corridor fringe & stormwater drain intersection |
| `ZONE_16_KSF` | Kengeri / Someshwarapura | 5 | Peri-urban / river catchment (Vrishabhavathi) |
| `ZONE_17_M` | Majestic Central Area | 5 | Ultra-dense multimodal transit hub |
| `ZONE_18_BSKR` | Banashankari Outer Ring Road | 5 | Arterial transport corridor |
| `ZONE_19_N-M-V` | Nagasandra / Mallathahalli / Vijinapura | 5 | Mixed suburban & institutional wards |
| `ZONE_20_KA` | Kammanahalli / Agara | 3 | Commercial hub & Agara lake buffer zone |

### Field Risk Distribution
- **High Risk:** 30 sites (42.3%)
- **Medium Risk:** 33 sites (46.5%)
- **Low Risk:** 8 sites (11.2%)

### Field Risk Scoring Formula
The empirical field risk score recorded in `field_data.json` and the database was computed during physical field collection via the following empirical weighting:

$$\text{Field Score} = \sum (\text{Factors}) + \text{Monitoring Weight}$$

- **Near Waterway / Drain:** $+1.0$ (High aquatic pollution potential)
- **Active Open Burning:** $+2.0$ (Acute toxic air quality and fire hazard)
- **Large Dump Size (Level $\ge 3$):** $+1.0$ (Significant physical mass)
- **Completely Unmanaged:** $+1.0$ (Absence of municipal collection)
- **Animal Exposure:** $+1.0$ (Vector-borne disease transmission)
- **Monitoring Frequency Weight:** $+0.5$ (Monthly) to $+1.0$ (Rarely / Never)

### Critical Academic Distinction: Field Risk vs. Visual Severity
- **Field Risk (High/Medium/Low):** A composite environmental vulnerability score derived from physical survey conditions (proximity to water, burning, management).
- **Visual Severity (Low/Medium/High/Not Assessable):** The image-derived magnitude of waste visible in a photograph.
- **Academic Rigor:** Currently, exactly **0 of the 71 observations** possess completed multi-rater human visual severity annotations. The repository explicitly preserves this distinction to maintain academic honesty and prevent data fabrication.

---

## 6. HydroRisk Analytical Engine & Mathematical Formulations

The HydroRisk analytical engine evaluates the hydrological threat posed by waste accumulation. It implements four progressive mathematical formulations:

### Formulation E1: Inverse Euclidean Waterway Proximity Score
Measures straight-line distance from observation point $(x_{lat}, x_{lon})$ to the nearest major waterway centroid $(w_{lat}, w_{lon})$:

$$d_{\text{water}}(x) = \min_{w \in W} \left( 111320 \cdot \sqrt{(x_{lat} - w_{lat})^2 + \left[(x_{lon} - w_{lon}) \cdot \cos\left(\frac{x_{lat} \cdot \pi}{180}\right)\right]^2} \right)$$

$$E_1(x) = \max\left(0, \; 1 - \frac{d_{\text{water}}(x)}{5000}\right)$$

Where $5000\text{ m}$ is the normalizer threshold. Any site farther than $5\text{ km}$ receives an $E_1$ score of $0.0$.

### Formulation E2: Empirical Field Risk Proxy Score
A normalized scalar proxy mapping the field-recorded vulnerability level:

$$E_2(x) = \begin{cases} 
1.0 & \text{if Risk Level} = \text{High} \\ 
0.6 & \text{if Risk Level} = \text{Medium} \\ 
0.2 & \text{if Risk Level} = \text{Low} 
\end{cases}$$

### Formulation E3: Combined Euclidean Priority Score
The baseline operational priority score synthesizing proximity and field risk with equal weighting:

$$E_3(x) = 0.5 \cdot E_1(x) + 0.5 \cdot E_2(x)$$

### Formulation E4: Drainage-Network-Aware Topological Score (Proposed & Prototype)
The theoretical objective of CleaningoAI is to model hydrological transport through the stormwater network graph $G = (V, E)$:

$$E_4(x) = \alpha \cdot \left(1 - \frac{d_G(x, W)}{d_{\max}}\right) + \beta \cdot \frac{A_{\text{flow}}(x)}{A_{\max}} + \gamma \cdot E_2(x) - \delta \cdot I_{\text{impedance}}(x)$$

- $d_G(x, W)$: Shortest topological distance through rajakaluves to the nearest receiving waterbody.
- $A_{\text{flow}}(x)$: Upstream catchment flow accumulation area at the point of entry.
- $I_{\text{impedance}}(x)$: Physical blockage or sediment impedance coefficient.

> **⚠️ Synthetic Demo Disclaimer:** Authoritative GIS shapefiles for Bengaluru's complete rajakaluve network have not yet been released into open access by municipal authorities. In the current prototype release, **$E_4$ defaults to $E_3$** with an explicit unverified drainage connectivity banner displayed across the user interface.

### The 10 Reference Waterways & Drainage Centroids
CleaningoAI evaluates proximity against 10 critical Bengaluru lakes and stormwater channels:

| Waterbody / Channel Name | Latitude ($^\circ\text{N}$) | Longitude ($^\circ\text{E}$) | Type / Catchment Significance |
| :--- | :---: | :---: | :--- |
| **Vrishabhavathi River** | 12.9570 | 77.4980 | Major riverine drainage corridor for western Bengaluru |
| **Arkavathi River** | 13.0270 | 77.4420 | Tributary of Kaveri; northwestern river basin |
| **Hebbal Lake** | 13.0440 | 77.5970 | Major northern lake basin and rajakaluve terminal |
| **Ulsoor Lake** | 12.9850 | 77.6200 | Central historic lake; dense urban catchment |
| **Bellandur Lake** | 12.9270 | 77.6750 | Bengaluru's largest lake; highly vulnerable to frothing |
| **Agara Lake** | 12.9220 | 77.6380 | Intermediate lake in Koramangala-Challaghatta valley |
| **Kengeri Lake** | 12.9120 | 77.4820 | Southwestern suburban wetland reservoir |
| **Hesaraghatta Reservoir**| 13.0850 | 77.4960 | Fresh water reservoir in northern periphery |
| **Nyanappanahalli Lake** | 12.9100 | 77.6150 | Southern lake system near Bannerghatta corridor |
| **Peenya Drain** | 13.0330 | 77.5170 | Heavy industrial stormwater outfall channel |

---

## 7. Computer Vision & Visual Severity Engine

### In-Memory Mock Vision Adapter (`DEMO_MODE_v1.0`)
To provide a complete, authentic user experience without fabricating model weights, CleaningoAI implements a deterministic in-memory mock inference adapter:
- **Input Validation:** Enforces genuine image MIME types (`image/jpeg`, `image/png`, `image/webp`) and restricts file payloads to 10 MB.
- **Simulated Inference Latency:** Injects an artificial delay of 200–400 ms to emulate GPU tensor forward passes.
- **Deterministic Hash Seeding:** Computes a SHA-256 hash of the uploaded filename and byte length to deterministically generate bounding boxes and confidence scores ($0.65$ to $0.89$).
- **Bounding Box Classes:** Generates realistic bounding boxes for `plastic`, `organic`, `construction`, and `paper_cardboard`.
- **Academic Transparency:** Every API response includes `is_demo: true` and `model_version: 'DEMO_MODE_v1.0'`, ensuring no observer mistakes the mock adapter for trained neural weights.

### 4-Tier Visual Severity Rubric
CleaningoAI establishes a formal visual annotation rubric for human adjudicators:
- **Low:** Isolated litter items, surface area $< 1\text{ m}^2$, no obstruction of pedestrian or vehicular flow, zero water contact.
- **Medium:** Clustered waste accumulation, surface area $1\text{ m}^2$ to $5\text{ m}^2$, partial encroachment on road shoulder or ditch.
- **High:** Substantial open dump, surface area $> 5\text{ m}^2$, active stormwater channel obstruction, or evidence of toxic burning.
- **Not Assessable:** Image corrupted, extreme blur, severe underexposure, or perspective prevents waste verification.

### Planned Spatial-Holdout YOLO Training Protocol
Future work will train YOLOv8x/YOLOv11x models using a **spatial block holdout cross-validation** scheme (stratified by the 14 Bengaluru zones) rather than standard random train-test splitting. This prevents spatial autocorrelation from artificially inflating mAP scores.

---

## 8. Municipal Incident Lifecycle & State Machine

CleaningoAI models end-to-end civic complaint resolution through a strict 6-state finite state machine:

```
[ submitted ] ──► [ under_review ] ──► [ assigned ] ──► [ inspected ] ──► [ resolved ] ──► [ verified ]
```

1. **`submitted`**: Initial citizen complaint captured via `/app/reports` or mobile app with GPS coordinates and photo evidence.
2. **`under_review`**: Municipal triage officer reviews the report, verifies geographic validity, and checks for duplicates.
3. **`assigned`**: Work order dispatched to a specific zonal field inspector (e.g., `inspector.ravi@cleaningoai.in`).
4. **`inspected`**: Field inspector conducts an on-site visit, verifies waste volume, and submits inspector verification photos.
5. **`resolved`**: BBMP municipal sanitation crew clears the site; clearing evidence submitted.
6. **`verified`**: Final quality sign-off by a senior municipal officer or citizen confirmation; incident closed.

### Seeded Incidents
The database comes pre-seeded with 6 active incidents reflecting real Bengaluru field conditions:
- `INC-2026-00001`: Large open burning near Delhi Public School Road (`assigned` to Inspector Ravi).
- `INC-2026-00002`: Hosahalli dumping ground overflow (`submitted`).
- `INC-2026-00003`: Govindrajnagar Ward roadside persistent dumping (`under_review`).
- `INC-2026-00004`: Forest road illegal industrial dumping — Kammasandra (`inspected` by Inspector Priya).
- `INC-2026-00005`: River bank waste — Kachohalli (`resolved` by BBMP crew).
- `INC-2026-00006`: Peenya industrial drain obstruction (`verified` with completed audit sign-off).

---

## 9. Relational Database Schema & Data Dictionary

The persistence layer uses embedded SQLite (`better-sqlite3`) in `data/cleaningoai.db`. The database schema is fully defined in `src/lib/db.ts`:

### Core Tables

#### 1. `observations` (71 Field Records)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `TEXT PRIMARY KEY` | Unique observation identifier (e.g., `CLN_0001` to `CLN_0071`). |
| `zone_id` | `TEXT NOT NULL` | Zone code matching one of the 14 Bengaluru zones. |
| `date_captured` | `TEXT` | ISO-8601 capture timestamp. |
| `latitude` | `REAL NOT NULL` | GPS WGS-84 latitude coordinate. |
| `longitude` | `REAL NOT NULL` | GPS WGS-84 longitude coordinate. |
| `area_label` | `TEXT` | Local landmark / street name description. |
| `site_type` | `TEXT` | Roadside, River_Bank, Open_Unprotected_Land, etc. |
| `waste_type` | `TEXT` | MIXED, PLASTIC, or CONSTRUCTION. |
| `size_level` | `REAL` | Approximate physical scale (1.0 to 5.0). |
| `risk_score` | `REAL` | Calculated empirical field score. |
| `risk_level` | `TEXT` | High, Medium, or Low. |
| `management_status` | `TEXT` | NOT_MANAGED, MANAGED, PARTIALLY_MANAGED, etc. |
| `monitoring_frequency` | `TEXT` | Daily, Weekly, Monthly, Rarely, Never. |
| `burning_observed` | `TEXT` | YES / NO. |
| `centralized_point` | `TEXT` | YES / NO. |
| `primary_cause` | `TEXT` | Lack of bins, Commercial dumping, etc. |
| `severity_label` | `TEXT` | Low, Medium, High, Not Assessable (Null if pending). |
| `severity_confidence` | `REAL` | Rater or model confidence metric. |
| `severity_reviewer` | `TEXT` | Name / ID of annotator. |
| `annotation_status` | `TEXT` | Default `'pending'`. |
| `notes` | `TEXT` | Field surveyor notes. |
| `created_at` / `updated_at` | `TEXT` | Timestamps. |

#### 2. `incidents` (6 Seeded Municipal Incidents)
Stores civic complaints linked to field observations or citizen submissions:
- `id` (PK, `INC-YYYY-XXXXX`), `observation_id` (FK to `observations`), `title`, `description`, `latitude`, `longitude`, `area_label`, `waste_type`, `severity`, `status` (`submitted`, `under_review`, `assigned`, `inspected`, `resolved`, `verified`), `reporter_name`, `reporter_email`, `reporter_phone`, `assigned_to`, `inspector_id`, `evidence_path`, `notes`, `created_at`, `updated_at`.

#### 3. `incident_timeline`
Tracks chronological actions and status transitions:
- `id` (PK), `incident_id` (FK), `action`, `actor`, `notes`, `created_at`.

#### 4. `users`
System accounts and role definitions:
- `id` (PK), `email` (UNIQUE), `name`, `role` (`admin`, `officer`, `inspector`, `researcher`, `citizen`), `password_hash`, `active`, `created_at`.

#### 5. `analysis_jobs`
Inference history and mock detection logs:
- `id` (PK), `observation_id`, `incident_id`, `image_path`, `model_version`, `status`, `waste_detected`, `waste_classes`, `confidence`, `bounding_boxes`, `severity_estimate`, `is_demo`, `created_at`.

#### 6. `audit_events`
Immutable compliance audit logs:
- `id` (PK), `entity_type`, `entity_id`, `action`, `actor`, `details`, `created_at`.

### Platform v2.0 Extensions
To support comprehensive environmental intelligence, the schema includes modular v2.0 tables:
- `materials` — Recyclability, density ($kg/m^3$), hazard classifications, and properties JSON.
- `facilities` — Treatment plants, Dry Waste Collection Centres, capacities (tonnes/day), and coordinates.
- `chemical_substances` — CAS numbers, molecular weights, boiling/melting points, and hazard classes.
- `sensors` — IoT telemetry stations, reading thresholds, and online status.
- `samples` — Physical soil and water laboratory samples and test results JSON.
- `interventions` — Remediations, contractor tracking, INR costs, and outcome JSON.

---

## 10. RESTful API Specification

CleaningoAI exposes high-performance RESTful API routes implemented via Next.js route handlers:

### 1. `GET /api/observations`
Lists verified field observations with optional filtering.
- **Query Parameters:**
  - `zone_id` (optional): Filter by zone (e.g., `ZONE_11_NLG-P`).
  - `risk_level` (optional): Filter by risk level (`High`, `Medium`, `Low`).
  - `waste_type` (optional): Filter by waste type (`MIXED`, `PLASTIC`, `CONSTRUCTION`).
- **Response `200 OK`:**
  ```json
  [
    {
      "id": "CLN_0021",
      "zone_id": "ZONE_11_NLG-P",
      "latitude": 13.029324,
      "longitude": 77.48146,
      "area_label": "NEAR DELHI_PUBLIC SCHOOL GANGONDANAHALLI ROAD",
      "waste_type": "MIXED",
      "risk_level": "High",
      "risk_score": 6.5,
      "burning_observed": "YES",
      "management_status": "NOT_MANAGED"
    }
  ]
  ```

### 2. `POST /api/observations`
Registers a new field observation into the database.
- **Request Body:**
  ```json
  {
    "zone_id": "ZONE_03-N_C_G",
    "latitude": 12.960645,
    "longitude": 77.513657,
    "area_label": "NAGARBHAVI 2ND STAGE",
    "waste_type": "PLASTIC",
    "site_type": "Roadside",
    "size_level": 3.0,
    "risk_level": "Medium",
    "notes": "Plastic accumulation near culvert"
  }
  ```

### 3. `GET /api/hydrorisk`
Returns real-time mathematical HydroRisk scores (E1 through E4) for all observations.
- **Response `200 OK`:**
  ```json
  {
    "count": 71,
    "is_demo_drainage": true,
    "disclaimer": "SYNTHETIC DEMO NETWORK: Drainage connectivity shown is illustrative only.",
    "data": [
      {
        "id": "CLN_0021",
        "zone_id": "ZONE_11_NLG-P",
        "latitude": 13.029324,
        "longitude": 77.48146,
        "nearest_waterway": "Peenya Drain",
        "distance_to_waterway_m": 3894,
        "e1_score": 0.221,
        "e2_score": 1.0,
        "e3_score": 0.611,
        "e4_score": 0.611,
        "e4_status": "PROTOTYPE_DEMO"
      }
    ]
  }
  ```

### 4. `POST /api/vision/analyze`
Simulates computer vision waste detection with deterministic hashing and simulated GPU latency.
- **Request:** `multipart/form-data` with `image` (binary, max 10 MB).
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "model_version": "DEMO_MODE_v1.0",
    "is_demo": true,
    "inference_time_ms": 284,
    "waste_detected": true,
    "waste_classes": ["plastic", "organic"],
    "overall_confidence": 0.84,
    "severity_estimate": "Medium",
    "bounding_boxes": [
      {
        "class": "plastic",
        "confidence": 0.87,
        "bbox": [120, 85, 340, 290]
      }
    ]
  }
  ```

### 5. `GET /api/incidents`
Lists municipal incidents with filtering by status and severity.
- **Query Parameters:** `status` (`submitted`, `assigned`, etc.), `severity` (`high`, `medium`, `low`).

### 6. `PATCH /api/incidents/[id]`
Mutates incident status, assigns personnel, and appends chronological audit logs.
- **Request Body:**
  ```json
  {
    "status": "assigned",
    "assigned_to": "inspector.ravi@cleaningoai.in",
    "actor": "Municipal Triage Officer",
    "notes": "Dispatched for urgent field inspection"
  }
  ```

### 7. `GET /api/analytics`
Returns aggregated analytics metrics: total sites, risk level counts, waste type proportions, and zonal breakdowns.

---

## 11. Project Directory Structure

```
cleaningoai/
├── data/                                    # Local database directory (Sensitive / Runtime)
│   ├── cleaningoai.db                       # Active SQLite database (WAL mode)
│   ├── cleaningoai.db-shm                   # SQLite shared memory
│   └── cleaningoai.db-wal                   # SQLite write-ahead log
├── docs/                                    # Comprehensive Academic & Platform Documentation
│   ├── archive/
│   │   └── test_doc.docx                    # python-docx validation file
│   ├── paper/
│   │   ├── CleaningoAI_IEEE_Research_Paper_Revised.docx  # 6.62 MB IEEE formatted Word paper
│   │   ├── CleaningoAI_IEEE_Research_Paper_Revised.md    # Markdown research paper
│   │   ├── extracted_paper.txt                          # Raw source text
│   │   └── RESEARCH_PAPER_COMPLETION_REPORT.md          # Comprehensive audit report
│   ├── screenshots/                         # 8 genuine 2x high-resolution screenshots
│   │   ├── fig1_main_dashboard.png          # Operations overview telemetry
│   │   ├── fig2_geointel_map.png            # GeoIntel Leaflet mapping
│   │   ├── fig3_hydrorisk_analysis.png      # HydroRisk mathematical matrix
│   │   ├── fig4_vision_ai_lab.png           # Vision AI detection lab
│   │   ├── fig5_severity_engine.png         # Severity annotation rubric
│   │   ├── fig6_incident_queue.png          # Municipal incident queue
│   │   ├── fig7_spatial_analytics.png       # Spatial analytics charts
│   │   └── fig8_dataset_repository.png      # Tabular dataset explorer
│   └── architecture_diagram.png             # 300 DPI system architecture diagram
├── public/                                  # Static assets served by Next.js
│   ├── brand/
│   │   ├── logo-dark.jpg                    # Dark theme brand asset
│   │   └── logo-light.jpg                   # Light theme brand asset
│   ├── emblem.svg, file.svg, globe.svg, logo.svg, ... # Vector graphics & logos
├── scripts/                                 # Automation & Build Scripts
│   └── build_revised_paper.py               # Research paper generator script
├── src/                                     # Application Source Code
│   ├── app/                                 # Next.js 16 App Router Routes
│   │   ├── (app)/                           # Core intelligence application
│   │   ├── (engineeringops)/                # Engineering operations
│   │   ├── (intelligence)/                  # Cross-domain environmental intelligence
│   │   ├── (operations)/                    # Municipal operations suite
│   │   ├── (ops)/                           # Dispatch & incident queue
│   │   ├── (public)/                        # Public landing & showcase
│   │   ├── (research-platform)/             # Academic research platform
│   │   └── api/                             # REST route handlers
│   ├── components/                          # React UI Components
│   │   ├── layout/                          # Navbars, headers, footers
│   │   ├── map/                             # Leaflet interactive map components
│   │   └── ui/                              # Design system primitives & badges
│   └── lib/                                 # Core libraries & utilities
│       ├── api.ts                           # Client API helpers
│       ├── constants.ts                     # Zones, categories, and centroids
│       ├── db.ts                            # better-sqlite3 database connection
│       ├── seed.ts                          # Seed routines (71 observations, 6 incidents)
│       └── utils.ts                         # Formatting & score calculation helpers
├── .env.example                             # Environment variable template
├── .env.local                               # Local environment configuration
├── .gitignore                               # Git ignore rules
├── AGENTS.md                                # Next.js agent operational rules
├── eslint.config.mjs                        # ESLint flat configuration
├── field_data.json                          # Exported source field dataset (71 records)
├── how_to_run.md                            # Quick-start run guide
├── next-env.d.ts                            # Next.js TypeScript declarations
├── next.config.ts                           # Next.js configuration & turbopack rules
├── package-lock.json                        # Locked dependencies
├── package.json                             # Package manifests & scripts
├── README.md                                # Authoritative project documentation
├── tsconfig.json                            # TypeScript configuration
└── tsconfig.tsbuildinfo                     # TypeScript build info cache
```

---

## 12. Installation, Configuration & Quick Start

### Prerequisites
- **Node.js**: Version `18.x`, `20.x`, or `22.x+` (tested on Node v24)
- **npm**: Version `9.x` or newer
- **Operating System**: macOS, Linux, or Windows (tested on Windows 11)

### Step 1: Clone or Navigate to the Workspace
```bash
git clone https://github.com/your-username/cleaningoai.git
cd cleaningoai
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
If `.env.local` is not already present, copy the template:
```bash
# On Linux / macOS:
cp .env.example .env.local

# On Windows (PowerShell):
Copy-Item .env.example .env.local
```

### Step 4: Run the Development Server
```bash
npm run dev
```

The application will start with Turbopack enabled at **[http://localhost:3000](http://localhost:3000)**.

### Demo User Accounts

| Role | Email | Password | Primary Experience |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@cleaningoai.in` | `demo123` | Master triage, audit logs, and system settings |
| **Field Inspector** | `inspector.ravi@cleaningoai.in` | `demo123` | Field inspection and evidence verification |
| **Field Inspector** | `inspector.priya@cleaningoai.in` | `demo123` | Industrial corridor inspection |
| **Field Inspector** | `inspector.suresh@cleaningoai.in` | `demo123` | Waterway and riverbank inspection |
| **Citizen Reporter** | `citizen1@example.com` | `demo123` | Public incident submission |
| **Citizen Reporter** | `citizen2@example.com` | `demo123` | Community monitoring |

---

## 13. Academic Deliverables & Documentation Hub

All formal research deliverables and publication assets are consolidated in `docs/`:

1. **Revised IEEE Word Manuscript:**
   - **Path:** [`docs/paper/CleaningoAI_IEEE_Research_Paper_Revised.docx`](file:///c:/Users/TIYASHA%20SARKAR/OneDrive/Desktop/PROJECTS/CleaningoAI/docs/paper/CleaningoAI_IEEE_Research_Paper_Revised.docx)
   - **Size:** 6.62 MB
   - **Format:** IEEE Transactions two-column format with professional typography, embedded 300 DPI architecture diagram, 8 genuine application screenshots, mathematical equations, and formatted data tables.
2. **Markdown Research Manuscript:**
   - **Path:** [`docs/paper/CleaningoAI_IEEE_Research_Paper_Revised.md`](file:///c:/Users/TIYASHA%20SARKAR/OneDrive/Desktop/PROJECTS/CleaningoAI/docs/paper/CleaningoAI_IEEE_Research_Paper_Revised.md)
   - **Contents:** Full markdown edition including all 13 formal sections (Literature Review, System Architecture, Mathematical Formulations, Experimental Designs E1–E4).
3. **Research Audit & Completion Report:**
   - **Path:** [`docs/paper/RESEARCH_PAPER_COMPLETION_REPORT.md`](file:///c:/Users/TIYASHA%20SARKAR/OneDrive/Desktop/PROJECTS/CleaningoAI/docs/paper/RESEARCH_PAPER_COMPLETION_REPORT.md)
   - **Contents:** Comprehensive verification report documenting framework version reconciliations, database audit findings, and experimental boundaries.
4. **System Architecture Blueprint:**
   - **Path:** [`docs/architecture_diagram.png`](file:///c:/Users/TIYASHA%20SARKAR/OneDrive/Desktop/PROJECTS/CleaningoAI/docs/architecture_diagram.png)
   - **Resolution:** 300 DPI high-resolution diagram.
5. **Authentic Application Screenshots:**
   - **Path:** `docs/screenshots/fig1_main_dashboard.png` through `fig8_dataset_repository.png`
   - **Details:** 8 genuine screenshots captured directly from the live platform.
6. **Manuscript Generation Script:**
   - **Path:** [`scripts/build_revised_paper.py`](file:///c:/Users/TIYASHA%20SARKAR/OneDrive/Desktop/PROJECTS/CleaningoAI/scripts/build_revised_paper.py)
   - **Usage:** Run `python scripts/build_revised_paper.py` to regenerate the Word document with fresh figures and tables.

---

## 14. Scientific Limitations & Boundary Conditions

To maintain academic rigor and adhere to non-fabrication research standards, the following methodological boundaries are explicitly stated:

1. **Synthetic Drainage Topology:** The current HydroRisk calculation utilizes Euclidean distances ($E_1, E_2, E_3$) against 10 centroid waterbodies. Formulation $E_4$ is an academic prototype; actual municipal hydraulic connectivity graphs have not been field-verified.
2. **Deterministic Vision Simulation:** Computer vision inferences generated via `/api/vision/analyze` operate using deterministic hashing (`DEMO_MODE_v1.0`). No trained neural network checkpoints are claimed until external models are linked.
3. **Ground-Truth Annotation Status:** Exactly 0 of the 71 field observations have completed multi-rater human visual severity annotations. The recorded High/Medium/Low categories reflect physical field surveyor scoring.
4. **Experimental Design Phase:** Experiments E1 (Detection), E2 (Severity Rubric), E3 (HydroRisk Ranking), and E4 (Operational Triage) represent formal experimental protocols whose empirical trials are scheduled for subsequent project phases.
5. **Environmental Risk Scope:** The HydroRisk score represents an **inspection priority index**, not a biochemical measurement of chemical contamination, biological oxygen demand (BOD), or heavy metal concentration.

---

## 15. Future Research Roadmap

1. **Deploy YOLO Checkpoint:** Connect a trained YOLOv8x/v11x inference microservice trained on TACO, TrashNet, and local Bengaluru waste imagery via Python FastAPI.
2. **Acquire Municipal Drainage GIS Data:** Ingest official BBMP/BWSSB rajakaluve shapefiles into PostGIS to replace Euclidean distance with true directed hydraulic graph routing.
3. **Conduct Multi-Rater Human Annotation:** Perform Cohen's kappa ($\kappa$) and Krippendorff's alpha ($\alpha$) inter-rater agreement studies across all 71 observations using the 4-tier rubric.
4. **Execute Formal Experiments E1–E4:** Run spatial holdout cross-validation to report authoritative Precision, Recall, mAP@0.5, and Spearman rank correlation ($\rho$).
5. **PostgreSQL / PostGIS Migration:** Migrate from local SQLite to enterprise PostgreSQL with spatial indexing for concurrent municipal multi-tenancy.
6. **Cloud Object Storage:** Transition image uploads from local filesystem storage to AWS S3 / Google Cloud Storage with presigned URLs.
7. **Mobile Progressive Web App (PWA):** Enable offline-first field caching for municipal inspectors operating in low-connectivity peri-urban zones.

---

## 16. License, Ethical Disclosures & Citations

### Academic Citation
If you utilize the CleaningoAI platform architecture, dataset, or HydroRisk formulation in your research, please cite:

```bibtex
@misc{cleaningoai2026,
  title={Deep Learning-Based Urban Waste Detection and Severity Assessment with Drainage-Network-Aware Geospatial Environmental Risk Prioritisation: A Case Study of Bengaluru},
  author={[Author Name] and [Co-Author Name] and [Faculty Guide Name]},
  year={2026},
  howpublished={Undergraduate Research Project, Department of AIML},
  note={CleaningoAI Platform v2.0}
}
```

### Ethical & Privacy Considerations
- Field data collection was restricted to open public spaces, arterial roadsides, and public rajakaluve interfaces. No private residential premises or identifiable facial data were captured.
- Geospatial coordinates are published solely for academic research, civic flood mitigation, and municipal solid waste management research.

---

*CleaningoAI — Urban Environmental Intelligence Platform. Built with Next.js 16, React 19, Tailwind CSS v4, and SQLite.*
