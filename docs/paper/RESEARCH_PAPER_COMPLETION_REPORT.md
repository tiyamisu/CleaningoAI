# CleaningoAI — Research Paper Completion & Verification Report

**Author Role:** Senior Research Engineer, Academic Research-Paper Editor, Computer Vision Researcher, Full-Stack Software Architect  
**Project:** CleaningoAI (Bengaluru Environmental Intelligence Pilot & Platform v2.0)  
**Date of Completion:** November 24, 2026  
**Primary Deliverables:**
1. Revised Word Manuscript: `docs/paper/CleaningoAI_IEEE_Research_Paper_Revised.docx` (6.62 MB, IEEE format, embedded figures & tables)
2. Markdown Research Manuscript: `docs/paper/CleaningoAI_IEEE_Research_Paper_Revised.md`
3. System Architecture Blueprint: `docs/architecture_diagram.png` (300 DPI high-resolution diagram)
4. Genuine Application Screenshots: `docs/screenshots/fig1_main_dashboard.png` through `fig8_dataset_repository.png` (8 high-res PNGs captured from live running server)

---

## 1. Executive Summary

This report documents the systematic inspection, technical verification, and academic enhancement of the research paper titled:
> *"Deep Learning-Based Urban Waste Detection and Severity Assessment with Drainage-Network-Aware Geospatial Environmental Risk Prioritisation: A Case Study of Bengaluru"*

The objective was to elevate the original working research proposal into a publication-grade, academically defensible, and implementation-accurate research paper suitable for an undergraduate AIML project submission, while adhering strictly to non-fabrication protocols.

### Critical Exclusions Respected
- **Author Information:** Left 100% untouched (`[Author Name]`, `[Co-Author Name]`, `[Faculty Guide Name]`, `[Department]`, `[email]`).
- **References & Bibliography:** Preserved verbatim without adding, deleting, fabricating, or altering any reference, journal, DOI, or link (exact 10 references retained from original Section 20).

---

## 2. Comprehensive Workspace Inspection

Before modifying any academic text, the complete project workspace was audited across code, databases, documentation, and running processes:

| Area Inspected | Files & Artifacts Examined | Key Findings & Evidence |
| :--- | :--- | :--- |
| **Project Dependencies** | `package.json`, `package-lock.json` | Next.js is **16.4.6** (Canary/App Router), React is **19.3.0**, Tailwind CSS is **4.3.3**, TypeScript is **5.8**. Documentation mentioning Next.js 15 was outdated. |
| **Database Schema & Data** | `data/cleaningoai.db`, `src/lib/db.ts`, `src/lib/seed.ts` | Embedded SQLite operated via `better-sqlite3` with `PRAGMA journal_mode = WAL`. Exactly **71 observations** and **6 incidents** exist. |
| **Raw Excel Field Data** | `media_1795451992575_b9b33acc.xlsx` | Sheet `MAIN_DATA` has exactly 71 verified observations. Sheet `SCORING_RULES` details exact empirical formula: Near Water (+1), Burning (+2), Large Size (+1), Unmanaged (+1), Animal Exposure (+1), Monitoring Frequency (+0.5 to +1). |
| **Vision AI Module** | `src/app/api/vision/analyze/route.ts`, `src/app/(app)/app/vision/page.tsx` | **Mock Adapter (`DEMO_MODE_v1.0`):** Injects 200–400 ms artificial delay, hashes filename/size for deterministic mock bounding boxes and confidence (0.65–0.89). No trained model weights or neural checkpoints exist. Explicit `is_demo: true` payload returned. |
| **HydroRisk Engine** | `src/app/api/hydrorisk/route.ts`, `src/app/(app)/app/hydrorisk/page.tsx` | Computes E1 (Euclidean inverse distance to 10 centroid waterways, 5000m normalizer), E2 (Field risk proxy: High=1.0, Med=0.6, Low=0.2), E3 (`0.5*E1 + 0.5*E2`). E4 is prototype demo where `E4 = E3` with explicit note: *"UNKNOWN — drainage graph connectivity not verified."* |
| **Incident System** | `src/app/api/incidents/route.ts`, `src/app/(app)/app/incidents/page.tsx` | 6 incidents in database. Inconsistency identified: `INC-2026-00006` possesses status `'verified'`, while earlier documentation listed only 5 states (`submitted`, `under_review`, `assigned`, `inspected`, `resolved`). |
| **Geospatial Mapping** | `src/components/map/ObservationMap.tsx` | Leaflet 1.9.4 map with custom SVG pins for High (red), Medium (amber), Low (green) risk, popup inspection, and zone filtering across 14 Bengaluru zones. |
| **Analytics Module** | `src/app/(app)/app/analytics/page.tsx` | Recharts bar and pie charts rendering zone density, waste category proportions, and risk level breakdowns from `/api/analytics`. |
| **Running Application** | `http://localhost:3000` | Process active and responsive. All routes returning HTTP 200. |

---

## 3. Checklist of Completed Enhancements

| Item # | Master Prompt Requirement | Implementation Status | Location in Revised Paper |
| :---: | :--- | :---: | :--- |
| **1** | **Related Work / Literature Review** | **COMPLETED** | **Section II (Subsections A–F, Table I)**<br>Extensively expanded across all 7 requested topics. Analyzed all 10 references from the bibliography. Formulated the exact research gap in Table I. |
| **2** | **Dataset Collection & Methodology** | **COMPLETED** | **Section III (Subsections A–E, Table II, Eq. 1)**<br>Documented 71 GPS observations across 14 zones, WGS-84 CRS, field scoring formula, complete schema table, and dataset boundaries. |
| **3** | **Distinction: Field Risk vs Ground Truth** | **COMPLETED** | **Section III.D**<br>Explicitly established that 30 High, 33 Medium, and 8 Low are manual field risk categories, NOT ground-truth severity. Emphasized that 0 of 71 observations have human severity annotations. |
| **4** | **System Architecture Diagram** | **COMPLETED** | **Section IV, Figure 1 (`docs/architecture_diagram.png`)**<br>Generated 300 DPI academic diagram displaying presentation tier, Next.js application logic, SQLite WAL, analytical engines, mock adapter, and dashed future ML backend. |
| **5** | **Genuine Application Screenshots** | **COMPLETED** | **Section VIII.B, Figures 2–9 (`docs/screenshots/`)**<br>Captured 8 authentic 2x high-resolution screenshots using Playwright directly against `http://localhost:3000`. Full academic figure captions added. |
| **6** | **Computer Vision / YOLO Methodology** | **COMPLETED** | **Section V (Subsections A–C)**<br>Transparently documented in-memory mock adapter (`DEMO_MODE_v1.0`), deterministic seeding, artificial delay (200–400ms), and defined planned spatial-holdout training protocol. |
| **7** | **HydroRisk Mathematical Derivations** | **COMPLETED** | **Section VI (Subsections A–E, Table IV, Eqs. 2–6)**<br>Derived E1 (equirectangular distance & 5000m normalizer), E2 (1.0/0.6/0.2 mapping), E3 (`0.5*E1 + 0.5*E2`), and documented that E4 currently equals E3. Formulated proposed graph equation (Eq. 6). |
| **8** | **Experimental Evaluation Framework** | **COMPLETED** | **Section VII (Subsections A–D)**<br>Defined formal metrics for RQ1 (P, R, mAP@0.5), RQ2 (Cohen's kappa, Krippendorff's alpha), RQ3 (Spearman rho), and RQ4 (MTTR). Stated that experiments E1–E3 are pending and E4 is synthetic demo. |
| **9** | **Technical Inconsistencies Resolved** | **COMPLETED** | **Section IV.A & IV.B**<br>Next.js confirmed as 16.4.6 (React 19.3.0). Incident status model reconciled to 6 states including `'verified'` (`INC-2026-00006`). |
| **10** | **Academic Writing & IEEE Formatting** | **COMPLETED** | **Full Document (`CleaningoAI_IEEE_Research_Paper_Revised.docx` & `.md`)**<br>Formal academic prose, structured headings, professional table formatting with dark green headers, italicized figure captions, and centered equations. |
| **11** | **Author Placeholders Untouched** | **COMPLETED** | **Front Matter**<br>Retained exact placeholders: `[Author Name]`, `[Co-Author Name]`, `[Faculty Guide Name]`, `[Department]`, `[email]`. |
| **12** | **References Untouched** | **COMPLETED** | **Section XIII (References)**<br>Exact 10 citations and links from original Section 20 retained without modification. |

---

## 4. Technical Inconsistencies Detected & Resolved

### A. Next.js Version Discrepancy
- **Issue:** Early project documentation referenced Next.js 15.
- **Evidence:** `package.json` specifies `"next": "16.4.6"`, `"react": "19.3.0"`, `"tailwindcss": "4.3.3"`.
- **Resolution in Paper:** Section IV.A authoritatively specifies Next.js 16.4.6 (App Router Canary) running on React 19.3.0.

### B. Incident Lifecycle Status Model & Incident Counts
- **Issue:** Documentation stated a 5-stage lifecycle (`submitted`, `under_review`, `assigned`, `inspected`, `resolved`).
- **Evidence:** SQLite query revealed 6 active records, with `INC-2026-00006` assigned the status `'verified'`.
- **Resolution in Paper:** Section IV.B documents all 6 active database records and explains that `'verified'` represents an advanced operational state for officer confirmation prior to work-order issuance.

### C. HydroRisk E4 Implementation Reality
- **Issue:** Earlier proposals implied an active drainage network routing model.
- **Evidence:** `src/app/api/hydrorisk/route.ts` line 65 sets `e4_score = e3_score`, referencing 10 approximate waterway centroid coordinates with no topological rajakaluve shapefile connected.
- **Resolution in Paper:** Section VI.D explicitly discloses that E4 currently equals E3 with status marked `UNKNOWN`. Section VI.E presents the proposed graph formulation (Equation 6) as future work.

### D. Vision AI Inference Reality
- **Issue:** UI components present bounding boxes and confidence readouts.
- **Evidence:** `src/app/api/vision/analyze/route.ts` is an in-memory mock adapter hashing input file attributes to simulate outputs with an artificial 200–400 ms delay.
- **Resolution in Paper:** Section V.B explicitly describes the mock adapter architecture and confirms that neural network weights and mAP benchmarks remain to be executed after formal ground-truth annotation.

---

## 5. Summary of Mock vs. Real Components

| Platform Subsystem | Real / Implemented Functionality | Mocked / Simulated / Demonstration Functionality |
| :--- | :--- | :--- |
| **Field Observation Database** | **REAL:** 71 verified WGS-84 GNSS records across 14 Bengaluru zones in SQLite WAL database. | None. All 71 records are genuine field data. |
| **Spatial Map Explorer** | **REAL:** Interactive Leaflet map with genuine coordinates, popups, and zone filters. | None. Real map rendering. |
| **HydroRisk Proximity (E1)** | **REAL:** Equirectangular distance calculation to 10 reference waterway coordinates. | Waterway points are approximate regional reference coordinates, not an exhaustive hydraulic mesh. |
| **Severity Proxy (E2)** | **REAL:** Direct mapping of field-recorded risk categories (High=1.0, Med=0.6, Low=0.2). | Proxy scoring only; 0 of 71 sites have human severity annotations. |
| **Combined Screening (E3)** | **REAL:** Linear multi-criteria formulation ($0.5 \times E1 + 0.5 \times E2$). | None. Formula executes directly on observations. |
| **Network-Aware Risk (E4)** | **MOCK / PLACEHOLDER:** `e4_score` is set equal to `e3_score`. | Drainage graph connectivity is marked `UNKNOWN`. No hydraulic routing. |
| **Vision AI Lab** | **MOCK:** Validates genuine image uploads and file sizes up to 10 MB. | In-memory mock adapter (`DEMO_MODE_v1.0`). Generates synthetic bounding boxes and confidences (0.65–0.89) using an artificial delay (200–400ms). |
| **Incident Operations** | **REAL:** 6 lifecycle records stored in SQLite with timeline logging and CRUD API endpoints. | Small sample size ($N = 6$ incidents, 1 resolved). |
| **Spatial Analytics** | **REAL:** Recharts bar and pie charts rendering real-time aggregations from SQLite database. | None. Charts reflect genuine database state. |

---

## 6. Table of Figures in Revised Research Paper

| Figure # | Filename | Type | Resolution | Description |
| :---: | :--- | :---: | :---: | :--- |
| **Fig. 1** | `docs/architecture_diagram.png` | Architecture Blueprint | 300 DPI | End-to-end system architecture showing presentation tier, Next.js full-stack routing, SQLite WAL persistence, analytical engines, mock adapter, and proposed future ML integration. |
| **Fig. 2** | `docs/screenshots/fig1_main_dashboard.png` | Application Screenshot | 2x Hi-DPI | Operational Intelligence Overview dashboard displaying real-time KPI telemetry (71 field sites, 30 high risk, 6 incidents, 10 reference waterways), risk proportions, and launch points. |
| **Fig. 3** | `docs/screenshots/fig2_geointel_map.png` | Application Screenshot | 2x Hi-DPI | GeoIntel Map Explorer rendering all 71 GPS observation pins across Bengaluru with WGS-84 projection, risk color-coding (Red: High, Amber: Medium, Green: Low), and inspect panels. |
| **Fig. 4** | `docs/screenshots/fig3_hydrorisk_analysis.png` | Application Screenshot | 2x Hi-DPI | HydroRisk Matrix interface displaying comparative E1–E4 scores, nearest waterway distance calculations, and explicit synthetic demo disclaimers. |
| **Fig. 5** | `docs/screenshots/fig4_vision_ai_lab.png` | Application Screenshot | 2x Hi-DPI | Vision AI Lab interface exhibiting image upload validation, mock bounding-box localization, confidence metrics, and deterministic `DEMO_MODE_v1.0` diagnostic readouts. |
| **Fig. 6** | `docs/screenshots/fig5_severity_engine.png` | Application Screenshot | 2x Hi-DPI | Severity Engine interface detailing the 4-tier visual annotation rubric, field risk distributions, and pending human reviewer adjudication queues. |
| **Fig. 7** | `docs/screenshots/fig6_incident_queue.png` | Application Screenshot | 2x Hi-DPI | Municipal Incident Queue displaying end-to-end incident lifecycles across the six verified database states (`submitted`, `under_review`, `assigned`, `inspected`, `resolved`, `verified`). |
| **Fig. 8** | `docs/screenshots/fig7_spatial_analytics.png` | Application Screenshot | 2x Hi-DPI | Spatial Analytics dashboard rendering Recharts visualizations of zonal density clustering, waste category distributions, and management intervention frequencies. |
| **Fig. 9** | `docs/screenshots/fig8_dataset_repository.png` | Application Screenshot | 2x Hi-DPI | Dataset Repository module providing tabular exploration, coordinate inspection, and multi-factor filtering across all 71 Bengaluru field observations. |

---

## 7. Recommended Next Steps for Academic Submission

1. **Conduct Double-Blind Severity Annotations:** Utilize the 4-tier rubric (Low, Medium, High, Not Assessable) with two independent raters across the 71 field images to compute Cohen's weighted kappa ($\kappa_w$).
2. **Fine-Tune YOLO Baseline:** Annotate bounding boxes in CVAT and fine-tune a YOLOv8m/YOLOv11s model using a spatial-holdout split by zone (70/15/15) to report genuine empirical mAP@0.5 and mAP@0.5:0.95.
3. **Integrate Authoritative BBMP Rajakaluve Shapefiles:** Acquire open GIS vector layers for Bengaluru's primary storm-water drains and construct a directed graph in NetworkX/PostGIS to compute true topological E4 scores.
4. **Final Formatting & Author Affiliations:** Insert genuine author names, institutional affiliations, and faculty advisor details into the provided placeholders prior to institutional viva submission.
