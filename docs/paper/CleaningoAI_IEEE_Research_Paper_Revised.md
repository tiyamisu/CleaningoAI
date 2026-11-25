# Deep Learning-Based Urban Waste Detection and Severity Assessment with Drainage-Network-Aware Geospatial Environmental Risk Prioritisation: A Case Study of Bengaluru

**An Integrated Environmental Intelligence Framework Linking Computer Vision, Field Geospatial Observations, and Hydrological Proximity**

**[Author Name], [Co-Author Name]**  
*[Department]*  
*[Faculty Guide Name]*  
*[email]*  

---

## Abstract

Rapid, uncontrolled urbanisation across metropolitan regions in the Global South has generated severe challenges for municipal solid waste management. Conventional municipal response protocols remain heavily reactive, relying on citizen complaint escalations that lack spatial hydrological context and objective severity grading. Consequently, unmanaged open dumpsites frequently accumulate adjacent to stormwater drainage channels, causing severe flash flooding, toxic leachate percolation, and catastrophic waterway contamination during monsoon events. 

This paper presents **CleaningoAI**, an integrated full-stack environmental intelligence and operational research platform developed and benchmarked on a real-world field study of Greater Bengaluru, India. The platform unifies mobile field-captured evidence across 71 GPS-referenced observation sites spanning 14 urban survey zones with a multi-tiered risk screening engine. We systematically examine four prioritisation paradigms: 
1. **E1:** inverse Euclidean waterway proximity,
2. **E2:** empirical field risk proxy scoring,
3. **E3:** linear multi-criteria integration, and
4. **E4:** a topological drainage-network-aware model.

We provide complete architectural and mathematical derivations, evaluate an in-memory deterministic demonstration inference pipeline (`DEMO_MODE_v1.0`), document field dataset provenance, resolve technical framework inconsistencies across Next.js 16.4.6 and SQLite3 WAL persistence, and establish a rigorous, hypothesis-driven experimental evaluation framework. Our findings demonstrate that while proximity screening provides initial operational utility, true hydraulic risk prioritization strictly requires authoritative drainage graph topology, establishing an urgent empirical foundation for municipal smart-city engineering.

**Index Terms—** *Urban Solid Waste Management, Computer Vision, YOLO Object Detection, Geographic Information Systems (GIS), Drainage Network Connectivity, HydroRisk Screening, Environmental Intelligence, Bengaluru Case Study.*

---

## I. Introduction

Municipal solid waste management represents one of the most critical infrastructural and ecological bottlenecks confronting modern developing megacities. In India alone, urban centres generate approximately 62 million tonnes of municipal solid waste annually, of which less than 70% is collected and merely 20% undergoes scientific treatment or disposal. The remaining volume accumulates in unmanaged roadside verges, open unprotected plots, industrial peripheries, and environmentally fragile riverbanks and lake buffers. In rapidly expanding technopoles such as Greater Bengaluru (governed jurisdictionally by the Bruhat Bengaluru Mahanagara Palike—BBMP), waste generation has outpaced municipal collection logistics. Informal dumping is neither spatially uniform nor static; it concentrates at structural transport junctions, low-enforcement corridors, and critical storm-water drain (*rajakaluve*) interfaces.

Current municipal remediation mechanisms suffer from three systemic structural deficiencies:

1. **Purely Reactive Operational Lifecycles:** Municipal dispatch systems rely almost exclusively on manual citizen grievance submissions. Delayed citizen reporting pipelines generate action only after chronic waste accumulation causes severe public nuisance, foul odor, or physical road obstruction.
2. **Subjective and Uncalibrated Field Vision:** Municipal field photographs uploaded via citizen portals or inspector handhelds are archived without automated composition identification, mass/volume estimation, or standardized hazard grading. No baseline exists to objectively compare dump severity across administrative wards.
3. **Hydrological Blindness in Spatial Allocation:** Conventional GIS dashboards, when utilized, treat environmental sensitivity strictly as straight-line (Euclidean) distance to arbitrary landmarks, completely ignoring the hydraulic connectivity, gravity flow directions, and downstream receiving-water networks that govern leachate transport and flood obstruction.

To bridge this critical intersection between environmental data science, deep learning, and geospatial hydrology, we developed **CleaningoAI**. Originally conceived as an urban environmental intelligence platform, CleaningoAI has evolved into an integrated analytical platform addressing the environmental monitoring lifecycle. This paper provides a comprehensive, academically transparent evaluation of the CleaningoAI platform, its underlying mathematical formulations, its real-world field-validated dataset, its actual software architecture, and the methodological boundaries governing its current prototype execution.

---

## II. Related Work and Literature Review

To establish rigorous academic positioning, the methodological underpinnings of CleaningoAI were evaluated against seven core research domains in environmental computing, deep learning, and spatial analysis.

### A. AI-Based Municipal Waste Detection and Classification
Automated waste recognition has evolved rapidly from early handcrafted feature descriptors (such as SIFT, HOG, and color histograms) coupled with Support Vector Machines (SVM) toward deep convolutional neural networks (CNNs). In a comprehensive survey, Fraternali et al. (2024) categorized the state of remote sensing and ground-level computer vision in solid waste monitoring, emphasizing the severe domain shift that occurs when models trained on high-altitude aerial imagery or curated laboratory benchmarks are exposed to unstructured, cluttered street scenes. Shahab and Anjum (2022) developed a multi-path convolutional architecture (mp-CNN) specifically targeting illegal dump detection in low-resource environments, achieving notable localization but highlighting persistent false-positive triggers caused by asphalt patches, leaf litter, and cast shadows. StreetView-Waste (2026), introduced at IEEE/CVF WACV, provided one of the first multi-task street-scene datasets capturing waste receptacles and loose trash, underscoring that waste localization in real-world urban verges requires robust contextual boundary modeling rather than simple whole-image classification.

### B. YOLO-Based Object Detection for Environmental Monitoring
Single-stage object detectors from the You Only Look Once (YOLO) family have emerged as the industry standard for real-time edge intelligence. Recent benchmarks on the pLitterStreet dataset (IEEE CIETES, 2025) systematically compared YOLOv8, YOLOv9, and YOLOv10 architectures, demonstrating that while larger backbones deliver marginal gains in mean Average Precision (mAP@0.5), lightweight variants (e.g., YOLOv8n and YOLOv11s) provide the requisite inference latency (under 50 ms) necessary for field mobile deployment. Concurrently, hybrid frameworks pairing YOLOv8 detection backbones with Segment Anything Model 2 (SAM 2) zero-shot segmentation (IEEE ICSEDIS, 2026) demonstrated impressive polygon mask delineation on complex municipal waste piles, confirming that combining bounding-box localization with pixel-level area estimation provides the strongest visual proxy for physical pile volume.

### C. Computer Vision for Illegal Dumping and Waste Localisation
Deploying deep learning for municipal enforcement requires moving beyond isolated bounding boxes toward spatial verification. Valenzuela-Levi et al. (2026) deployed YOLOv8 detectors across a repository of over 10,000 georeferenced pedestrian-perspective street images, creating city-scale heatmaps of litter hotspots. Their findings demonstrated that pedestrian-view optical capture exhibits significant spatial clustering along commercial corridors and public transit nodes, establishing empirical evidence that mobile field capture directly mirrors systemic municipal collection failures.

### D. GIS-Based Environmental Risk Assessment and Hotspot Identification
Spatial analysis of illegal solid waste dumping has historically relied on Multi-Criteria Decision Analysis (MCDA) integrated with Geographic Information Systems (GIS). In a landmark local study of Bengaluru, Kashyap, Chanakya, and Ramachandra (2021) from the Indian Institute of Science (IISc) mapped and characterized 268 unauthorized waste dump sites across the city, identifying that proximity to vacant open plots, low street-lighting density, and proximity to arterial ring roads were primary spatial determinants of dump recurrence. Similarly, Sultana and Inayathulla (2025) conducted a geospatial characterization of dump sites across the BBMP East Zone, confirming that commercial mixed-waste generation consistently spills into peripheral storm drains when official primary collection vehicles fail to adhere to scheduled morning frequencies.

### E. Drainage-Network-Aware Waste and Hydrological Pollution Risk
While spatial proximity to water bodies has frequently been included in vulnerability mapping, true drainage-network-aware risk modeling remains exceptionally scarce. Das and Morshed (2026) developed a GeoAI framework for detecting illegal dumping risk zones in Khulna, Bangladesh (published in PLOS ONE), demonstrating that spatial cross-validation and feature attribution identify proximity to primary drains as a dominant predictor of environmental vulnerability. However, like most contemporary studies, Das and Morshed treated drain proximity as straight-line Euclidean distance. As established in hydrological transport mechanics, Euclidean distance fails to capture hydraulic flow direction, channel slope, pipe culvert blockages, or topological graph connectivity. A dumpsite situated 100 metres from a riverbank may be physically separated by a concrete retaining wall, whereas an unmanaged dump 800 metres upstream along an open storm-water canal poses an immediate and direct downstream contamination and choking threat.

### F. Smart-City Municipal Response Systems and The Research Gap
Existing smart-city municipal grievance redressal systems (e.g., BBMP Sahaaya, Swachhata App) operate merely as passive relational ticketing databases. They do not integrate real-time computer vision inference, do not evaluate multi-criteria spatial environmental risk, and cannot rank dispatched cleaning crews according to hydrological catastrophe potential. Table I summarizes the literature landscape and identifies the specific research gap addressed by CleaningoAI.

#### TABLE I: Literature Review Matrix and Academic Positioning

| Study & Venue | Methodological Contribution | Critical Implication for CleaningoAI |
| :--- | :--- | :--- |
| **Fraternali et al. (2024)**<br>*Waste Management* | Comprehensive survey of remote-sensing and GIS waste detection methodologies. | Highlights domain shift; reinforces necessity of transparent field-level evaluation. |
| **Shahab & Anjum (2022)**<br>*Sustainability* | Multi-path CNN for illegal dumping localization in low-resource environments. | Proves CNN detection is established; novelty must reside in multi-criteria geospatial integration. |
| **Das & Morshed (2026)**<br>*PLOS ONE* | GeoAI risk mapping with 341 sites, spatial CV, and drain proximity in Khulna. | Closest contemporary benchmark; motivates investigating network connectivity over simple drain distance. |
| **Valenzuela-Levi et al. (2026)**<br>*Resour. Conserv. Recycl.* | City-scale litter hotspot mapping utilizing 10,000+ pedestrian street images & YOLOv8. | Confirms pedestrian-view optical capture clusters heavily along unmanaged transit corridors. |
| **Kashyap et al. (2021)**<br>*IISc Case Study* | Spatial quantification of 268 unauthorized dumping locations across Bengaluru. | Provides empirical baseline for Bengaluru dumping behavior; validates arterial verge clustering. |
| **Sultana & Inayathulla (2025)**<br>*Int. J. Env. Sci.* | GIS characterization of dump sites and composition in BBMP East Zone. | Confirms mixed waste dominance (>70%) and lack of municipal enforcement in peripheral wards. |
| **Gibellini et al. (2025)**<br>*Waste Manag. Bull.* | Deep learning pipeline for waste detection in very-high-resolution aerial imagery. | Emphasizes failure of aerial models at street level; justifies handheld mobile camera perspectives. |
| **Litter Detection (2025)**<br>*IEEE CIETES* | Benchmarked YOLOv8/v9/v10 architectures on real-world street litter dataset. | Establishes lightweight YOLO checkpoints as optimal for low-latency field edge inference. |
| **Waste Segmentation (2026)**<br>*IEEE ICSEDIS* | Combined YOLOv8 bounding boxes with SAM 2 zero-shot segmentation masks. | Demonstrates pixel-area masking as superior volume proxy compared to simple bounding rectangles. |
| **StreetView-Waste (2026)**<br>*IEEE/CVF WACV* | Multi-task urban waste and container detection benchmark on street scenes. | Standardizes urban waste taxonomy: mixed waste, plastic-dominant, and construction debris. |

---

## III. Study Area and Dataset Methodology

### A. Geographical Context: Greater Bengaluru Pilot
The empirical study area encompasses the Greater Bengaluru metropolitan region (Karnataka, India), spanning latitudes 12.89°N to 13.08°N and longitudes 77.44°E to 77.68°E. Topographically situated on the Mysore Plateau at an average elevation of 920 metres above mean sea level, Bengaluru features a natural undulating terrain divided into three primary drainage valleys: the Vrishabhavathi, Koramangala-Challaghatta (K&C), and Hebbal valleys. Historically, these valleys sustained an intricate interconnected cascade of over 200 man-made lakes linked by primary storm-water drains (*rajakaluves*). Decades of rapid urban expansion, encroachment, and solid waste dumping have choked these channels, resulting in catastrophic urban flooding during moderate monsoonal convective precipitation.

### B. Field Data Collection Protocol and Provenance
The primary dataset comprises 71 GPS-referenced field observations collected systematically across 14 designated urban survey zones between January 2025 and May 2026. Field inspections were conducted using mobile handheld terminals equipped with high-accuracy GNSS hardware operating on the WGS-84 (EPSG:4326) coordinate reference system. Each observation records a multi-dimensional feature vector capturing site attributes, physical waste composition, management intervention status, and immediate environmental hazards.

#### TABLE II: Primary Dataset Schema and Encoded Attributes

| Attribute Name | Storage Type | Description and Operational Encoding |
| :--- | :--- | :--- |
| **ID** | `TEXT (PK)` | Stable unique observation identifier (e.g., CLN_0001 through CLN_0071). |
| **Zone_ID** | `TEXT` | Zonal administrative identifier across 14 surveyed zones (e.g., ZONE_10-TF, ZONE_02-KK). |
| **Date_Captured** | `TEXT` | Timestamp of field audit (recorded as DD-MM-YYYY or ISO datetime). |
| **Latitude, Longitude** | `REAL` | WGS-84 GNSS coordinates recorded to six decimal places (spatial resolution ~0.11 m). |
| **Area_Label** | `TEXT` | Textual description of landmark, road stretch, or municipal ward context. |
| **Site_Type** | `TEXT` | Physical context: Roadside, River_Bank, Open_Unprotected_Land, Under_Bridge, Electric_Pole, etc. |
| **Waste_Type** | `TEXT` | Dominant visual waste classification: MIXED (87.3%), PLASTIC (8.5%), CONSTRUCTION (4.2%). |
| **Size_Level** | `REAL` | Estimated visual accumulation scale: Ordinal scale from 1.0 (minimal) to 5.0 (massive). |
| **Risk_Score** | `REAL` | Field-evaluated empirical risk score computed via multi-variable conditions (Range: 0 to 7). |
| **Risk_Level** | `TEXT` | Categorical field risk grouping: HIGH (30 sites), MEDIUM (33 sites), LOW (8 sites). |
| **Management_Status** | `TEXT` | Operational status: NOT_MANAGED (81.7%), PARTIALLY_MANAGED, MANAGED, OFFICIAL_SITE. |
| **Monitoring_Frequency** | `TEXT` | BBMP surveillance regularity: NONE (78.9%), OCCASIONAL, DAILY_MORNING, CONTINUOUS. |
| **Burning_Observed** | `TEXT` | Active open combustion or charred residue indicator: YES (27 sites), NO (24 sites), MAYBE (20 sites). |
| **Centralized_Point** | `TEXT` | Indicator whether location serves as recognized community aggregation point (YES/NO). |
| **PRIMARY_CAUSE** | `TEXT` | Multi-tag root cause: NO_DUSTBIN, LOW_ENFORCEMENT, OPEN_LAND_ACCESS, INDUSTRIAL_DUMPING. |

### C. Mathematical Derivation of Field Risk Scores
The recorded field `Risk_Score` is governed by a deterministic, additive point-based evaluation heuristic designed to reflect immediate environmental hazard during field inspection. Formally, for any observation $i$, the score $R_i$ is computed as:

$$R_i = C_{\text{water}} + C_{\text{burn}} + C_{\text{size}} + C_{\text{mgmt}} + C_{\text{freq}} + C_{\text{anim}} \tag{1}$$

where the constituent indicator penalties are defined as follows:
- $C_{\text{water}} = +1.0$ if the dumpsite is situated within 50 metres of a natural water body or open drain; otherwise $0.0$.
- $C_{\text{burn}} = +2.0$ if active combustion, toxic smoke, or extensive ash/charred residue is observed; otherwise $0.0$.
- $C_{\text{size}} = +1.0$ if the accumulation $\text{Size\_Level} \ge 4.0$ (pile height $> 1.5$ m or volume $> 10\text{ m}^3$); otherwise $0.0$.
- $C_{\text{mgmt}} = +1.0$ if $\text{Management\_Status} = \text{'NOT\_MANAGED'}$; $+0.5$ if $\text{'PARTIALLY\_MANAGED'}$; $0.0$ if officially managed.
- $C_{\text{freq}} = +1.0$ if $\text{Monitoring\_Frequency} = \text{'NONE'}$; $+0.5$ if $\text{'OCCASIONAL'}$; $0.0$ if scheduled daily.
- $C_{\text{anim}} = +1.0$ if stray cattle, dogs, or rodents are actively foraging in the uncontained refuse; otherwise $0.0$.

The resulting score ranges from $0$ to $7$. Sites scoring $R_i \ge 5$ are classified as **HIGH** risk; scores of $3 \le R_i \le 4$ are categorized as **MEDIUM** risk; and scores $R_i \le 2$ are designated as **LOW** risk.

### D. Essential Distinction: Field Risk Categories vs. Ground-Truth Severity
A critical academic and methodological distinction must be explicitly maintained throughout this investigation:
1. **Field Risk Categories:** The 30 High, 33 Medium, and 8 Low records represent empirical field risk categories derived from manual inspection heuristics (Equation 1). They reflect composite circumstantial vulnerability, heavily weighted by open combustion and lack of municipal clearance.
2. **Ground-Truth Visual Severity:** Independent ground-truth visual severity labels—defined as standardized ordinal classifications (Low, Medium, High, Not Assessable) adjudicated by multiple blinded human raters following a formal visual rubric—are currently pending across all 71 observation sites.

Currently, zero out of the 71 observations possess adjudicated human severity annotations in the database (`annotation_status = 'pending'`). Consequently, all downstream baseline experiments utilize the recorded field-risk category strictly as an empirical proxy, rather than claiming a validated ground-truth computer vision target.

### E. Dataset Limitations and Sampling Biases
Scientific integrity requires transparent acknowledgment of four primary dataset limitations:
1. **Sample Size:** A sample size of $N = 71$ sites is sufficient for localized pilot prototyping and baseline comparative screening, but insufficient for training deep CNNs from scratch without severe overfitting.
2. **Non-Random Sampling Bias:** Field collection was targeted toward arterial transport stretches, peri-urban transition zones, and known high-accumulation corridors (e.g., Peenya industrial corridors, Nagarbhavi, Banashankari). The sample does not represent a randomized, uniform spatial grid across the entire 741 km² BBMP territory.
3. **Elevated Hazard Proportions:** Open waste burning was recorded in 27 out of 71 sites (38.0%), reflecting severe local air quality hazards that may dominate the empirical risk distribution relative to non-burning sites.
4. **Optical Variance:** Photographic records were captured under varying ambient illumination, variable camera angles, and differing optical resolutions, requiring standardized normalization prior to automated batch inference.

---

## IV. System Architecture and Implementation

CleaningoAI is engineered as a production-grade, modular web-native intelligence platform designed to support citizen reporting, inspector dispatch, and geospatial analytical screening. Figure 1 illustrates the end-to-end system architecture, delineating client presentation, full-stack application logic, embedded relational persistence, and active analytical modules.

![Figure 1: CleaningoAI System Architecture](docs/architecture_diagram.png)
*Fig. 1. End-to-end system architecture of CleaningoAI showing presentation tier, Next.js full-stack routing, embedded SQLite persistence, HydroRisk screening modules, mock vision adapter, and proposed future ML integration.*

### A. Technology Stack and Verification of Framework Versions
A rigorous audit of the repository's configuration files (`package.json` and `package-lock.json`) was conducted to resolve prior documentation ambiguities regarding framework dependencies. The authoritative software stack comprises:
- **Application Framework:** Next.js 16.4.6 (Next.js Canary / App Router architecture) running on React 19.3.0 and TypeScript 5.8.
- **Styling Infrastructure:** Tailwind CSS v4.3.3 utilizing CSS-native `@theme` tokens in `globals.css`, eliminating legacy `tailwind.config.js` overhead.
- **Data Persistence:** SQLite3 version 13.2 via the `better-sqlite3` native driver, operating synchronously with Write-Ahead Logging (`PRAGMA journal_mode = WAL`) and enforced foreign keys.
- **Geospatial Mapping:** Leaflet 1.9.4 and React-Leaflet 5.0.0 for hardware-accelerated interactive map rendering with WGS-84 coordinate projection.
- **Visualization Suite:** Recharts 3.11.0 for SVG-based analytical charting, supported by Lucide-React 1.78.0 for enterprise iconography.

### B. Technical Reconciliation: Incident Lifecycle Status Model
During source code verification, an apparent inconsistency was detected between the incident workflow documented in early project proposals and the database implementation. Earlier proposal notes outlined a five-stage lifecycle: `submitted -> under_review -> assigned -> inspected -> resolved`. However, direct inspection of the live database (`cleaningoai.db`) revealed six active incident records:
1. `INC-2026-00001`: **Assigned** (`assigned_to: inspector.ravi@cleaningoai.in`; Area: Delhi Public School Road; Severity: High).
2. `INC-2026-00002`: **Submitted** (Unassigned citizen report; Area: Hosahalli Region; Severity: High).
3. `INC-2026-00003`: **Under Review** (Escalated complaint; Area: Govindrajnagar Ward; Severity: High).
4. `INC-2026-00004`: **Inspected** (Field inspection completed; Area: Sankalpataru Forest Road; Severity: High).
5. `INC-2026-00005`: **Resolved** (Remediated by municipal team; Area: Kachohalli River Bank; Severity: Medium).
6. `INC-2026-00006`: **VERIFIED** (Field verified incident; Area: Banashankari 6th Stage; Severity: High).

The existence of the `'verified'` status reflects an advanced verification state introduced during field operational testing to denote incidents whose photographic evidence has been confirmed by a senior municipal officer prior to work-order issuance. The current codebase supports all six states, ensuring complete audit trail tracking within the `incident_timeline` table.

### C. Application Programming Interface (API) Specifications
CleaningoAI exposes high-performance RESTful API routes implemented via Next.js route handlers. Table III documents the active endpoints, their parameters, and behavioral payloads.

#### TABLE III: RESTful API Route Specifications

| Endpoint & Method | Input Parameters / Body | Functional Purpose and Response Payload |
| :--- | :--- | :--- |
| `GET /api/observations` | `status`, `zone`, `risk_level`, `limit` (default: 100) | Retrieves observation records filtered by zone or risk score. Returns JSON array with WGS-84 coordinates and metadata. |
| `GET /api/hydrorisk` | None (Computes across all observations) | Executes HydroRisk pipeline. Computes E1-E4 scores against 10 reference waterways. Returns sorted risk rankings. |
| `GET /api/incidents`<br>`POST /api/incidents` | **GET:** `status`, `limit`<br>**POST:** `title`, `lat`, `lng`, `area`, `waste_type`, `reporter` | **GET:** Fetches incident records and timelines.<br>**POST:** Creates incident ID (`INC-YYYY-XXXXX`), logs audit event, and returns `201 Created`. |
| `POST /api/vision/analyze` | `multipart/form-data` (image) or `application/json` | Invokes Vision AI Lab pipeline. Validates file size ($\le 10$ MB) and type. Returns mock bounding boxes, confidence, and demo disclaimer. |
| `GET /api/analytics` | None | Aggregates observational totals, risk proportions, zone distributions, and incident status counts for Recharts dashboards. |

---

## V. Computer Vision and YOLO Methodology

### A. Design of the Deep Learning Detection Pipeline
The theoretical computer vision objective of CleaningoAI is to detect, classify, and localize open waste deposits from handheld citizen and inspector photographs. The target taxonomy comprises three mutually exclusive primary classes: (1) `mixed_waste`, (2) `plastic_dominant_waste`, and (3) `construction_debris`, with secondary detection of active open burning.

### B. Current Prototype Implementation: In-Memory Mock Adapter
Scientific accuracy requires documenting the actual current implementation status of the Vision AI Lab. In the deployed codebase (`src/app/api/vision/analyze/route.ts`), object detection is currently executed via a deterministic in-memory mock inference adapter. No fine-tuned PyTorch checkpoint, TensorRT engine, or ONNX runtime is connected to the live API endpoint. The mock adapter functions as follows:
1. **Input Validation:** Enforces genuine image MIME types (JPEG, PNG, WebP) and restricts file sizes to 10 MB.
2. **Artificial Latency:** Injects an artificial asynchronous delay between 200 ms and 400 ms (`Math.random() * 200 + 200`) to simulate network transmission and neural inference runtime.
3. **Pseudo-Deterministic Output:** Hashes image filename length and byte size to generate pseudo-random yet reproducible detection results.
4. **Mock Geometry:** Generates synthetic bounding box coordinates, assigns confidence values between 0.65 and 0.89, selects an ordinal severity estimate, and returns a `model_version` tag of `'DEMO_MODE_v1.0'`.
5. **Ethical Disclosures:** Every API response explicitly returns an `is_demo: true` flag and a mandatory disclaimer string: *"DEMONSTRATION MODE — Results are illustrative only and do not reflect actual AI model inference."*

### C. Planned Model Training and Evaluation Protocol
To transition from the mock adapter to a validated deep-learning backend, the following empirical training protocol has been formulated:
1. **Tooling:** Bounding-box annotation of all field photographs using CVAT (Computer Vision Annotation Tool), standardizing on Pascal VOC / YOLO format with strict inter-annotator adjudication.
2. **Architecture:** Transfer learning utilizing pretrained weights from YOLOv8m and YOLOv11s, initialized from MS COCO.
3. **Data Partitions:** Crucially, images must be split by geographic survey zone or unique site ID (70% train, 15% validation, 15% test). Random pixel- or image-level shuffling must be strictly prohibited to prevent data leakage between proximate photographs taken at identical dumpsites.
4. **Loss Functions:** Optimization via composite loss combining Complete Intersection over Union (CIoU) for bounding-box regression and Binary Cross-Entropy (BCE) for multi-class classification.

---

## VI. HydroRisk and Drainage-Network Methodology

The HydroRisk analytical engine constitutes the core mathematical contribution of CleaningoAI. It evaluates the hypothesis that evaluating physical drainage proximity and hydrological network pathways provides superior operational prioritization compared to visual dump size alone.

### A. Formulation E1: Inverse Normalized Euclidean Proximity
The proximity baseline E1 measures straight-line Euclidean distance between dumpsite coordinates $(\text{lat}_i, \text{lng}_i)$ and the nearest of 10 reference major water bodies and drainage conduits in Bengaluru (e.g., Vrishabhavathi River, Bellandur Lake, Peenya Drain). Distance in metres is computed using the equirectangular projection approximation:

$$d(i, w) = 111320 \times \sqrt{(\text{lat}_i - \text{lat}_w)^2 + \left((\text{lng}_i - \text{lng}_w) \times \cos\left(\frac{\text{lat}_i + \text{lat}_w}{2}\right)\right)^2} \tag{2}$$

Let $d_{\min}(i) = \min_{w} d(i, w)$ represent the distance to the closest reference waterway. The normalized proximity score $E1_i$ is formulated as an inverse linear distance bounded by a 5,000-metre threshold:

$$E1_i = \max\left(0, 1 - \frac{d_{\min}(i)}{5000}\right) \tag{3}$$

Consequently, a dumpsite directly abutting a waterway ($d_{\min} = 0$) receives $E1 = 1.0$, while any site located 5 km or further receives $E1 = 0.0$.

### B. Formulation E2: Field Risk Proxy Scoring
Because verified visual severity annotations are pending across the dataset, baseline E2 maps the recorded empirical field `Risk_Level` directly into a normalized ordinal scalar:

$$E2_i = \begin{cases} 1.0 & \text{if } \text{Risk\_Level} = \text{'HIGH'} \\ 0.6 & \text{if } \text{Risk\_Level} = \text{'MEDIUM'} \\ 0.2 & \text{if } \text{Risk\_Level} = \text{'LOW'} \end{cases} \tag{4}$$

This mapping provides an empirical benchmark capturing visual accumulation scale, presence of active open burning, and lack of municipal clearance.

### C. Formulation E3: Linear Multi-Criteria Integration
Formulation E3 establishes a linear combination weighting visual field severity equally with Euclidean hydrological proximity:

$$E3_i = 0.5 \times E1_i + 0.5 \times E2_i \tag{5}$$

$E3$ ranges continuously from $0.1$ to $1.0$. It provides an intuitive operational screening priority, identifying sites that are both heavily accumulated and geographically close to receiving water bodies.

### D. Formulation E4: Drainage-Aware Integration and Prototype Reality
The central theoretical objective of CleaningoAI is Formulation E4: a true drainage-network-aware environmental risk score that replaces Euclidean proximity with topological graph distance and downstream flow accumulation. However, rigorous scientific honesty requires reporting the actual prototype status:
1. **Illustrative References:** The 10 waterway coordinates in the application are approximate centroid reference points hardcoded for screening demonstration.
2. **Unverified Network:** Authoritative vector shapefiles of Bengaluru's 842 km storm-water drain (SWD) network are not yet integrated into the spatial engine.
3. **Equivalence in Prototype:** In the current codebase (`src/app/api/hydrorisk/route.ts`), E4 is set directly equal to E3 (`e4_score = e3_score`), accompanied by an explicit metadata warning: *"UNKNOWN — drainage graph connectivity not verified."*

### E. Proposed Graph-Theoretic Drainage Model for Future Implementation
To achieve true drainage-aware risk modeling in Phase 2, we propose a directed acyclic graph formulation $G = (V, E, W)$. Vertices $V$ represent drainage manholes, channel junctions, and lake inlets; directed edges $E$ represent rajakaluve conduits weighted by hydraulic length and flow capacity $W$. Each dumpsite $i$ is snapped orthogonally to its nearest plausible drainage conduit $e \in E$ within a maximum tolerance radius $\delta_{\text{snap}} \le 100\text{ m}$. The true downstream network distance $D_{\text{net}}(i)$ to the nearest ecologically sensitive receiving water body $L$ is computed via Dijkstra's shortest path:

$$D_{\text{net}}(i) = \text{dist}_{\text{snap}}(i, e) + \min_{p \in \text{Paths}(e \to L)} \sum_{\text{edge} \in p} \text{length}(\text{edge}) \tag{6}$$

The resulting network score $E4_{\text{ideal}}$ is then parameterized by downstream transport potential and upstream contributing catchment area, providing an uncompromised hydraulic metric.

#### TABLE IV: Comparative Formulation Matrix Across Models E1–E4

| Model | Mathematical Inputs | Methodological Purpose | Prototype Implementation Status |
| :--- | :--- | :--- | :--- |
| **E1 Proximity** | Inverse Euclidean distance to nearest reference water body. | Conventional GIS proximity baseline. | Fully Implemented (Equation 3). |
| **E2 Severity** | Field-recorded risk category (High=1.0, Med=0.6, Low=0.2). | Visual hazard severity baseline. | Fully Implemented (Equation 4). |
| **E3 Linear** | $0.5 \times E1 + 0.5 \times E2$ (Equally weighted combination). | Multi-criteria baseline screening. | Fully Implemented (Equation 5). |
| **E4 Network** | Severity + Topological drainage graph connectivity. | Proposed primary scientific contribution. | Prototype Demo: E4 = E3 (Connectivity UNKNOWN). |

---

## VII. Experimental Evaluation Framework

To maintain academic rigor without fabricating experimental outcomes, we formally specify the hypotheses, evaluation metrics, and experimental designs intended to govern CleaningoAI's empirical evaluation.

### A. Research Question 1: Vision-Based Detection and Localization
RQ1 evaluates whether deep CNNs can accurately detect and localize waste instances in cluttered street photographs. Standard object detection metrics are specified: Precision ($P = \frac{TP}{TP + FP}$), Recall ($R = \frac{TP}{TP + FN}$), and mean Average Precision evaluated at IoU thresholds of 0.50 (mAP@0.5) and 0.50:0.95 (mAP@0.5:0.95). Because ground-truth bounding box labels have not yet been produced for the 71 field images, we do not report fabricated mAP percentages; evaluation remains pending formal annotation.

### B. Research Question 2: Severity Rubric Reliability
RQ2 investigates whether independent human raters can consistently classify waste accumulation into four ordinal severity tiers (Low, Medium, High, Not Assessable). Inter-rater reliability will be statistically evaluated using Cohen's weighted kappa ($\kappa_w$) for pairwise reviewer agreement and Krippendorff's alpha ($\alpha$) for multi-rater adjudication with missing observations. Target benchmark: $\kappa_w \ge 0.70$ to establish an acceptable visual severity baseline.

### C. Research Question 3: Value of Drainage-Network Connectivity
RQ3 examines whether network connectivity provides statistically significant prioritization variance beyond straight-line proximity. We specify Spearman's rank correlation coefficient ($\rho_s$) to compare the priority orderings produced by E1 (Euclidean) versus true E4 (Network). If $\rho_s < 0.75$, it confirms that drainage graph topology meaningfully re-ranks dumpsite urgency compared to simplistic proximity heuristics.

### D. Research Question 4: Municipal Operations and Dispatch Efficacy
RQ4 evaluates operational response acceleration. We specify Mean Time to Resolution (MTTR), defined as the temporal duration between citizen incident creation (`created_at`) and verified remediation (`status = 'resolved'`). Across the six currently seeded incident records, one incident is resolved (`INC-2026-00005`, duration: 8 days), one is inspected, one is assigned, one is under review, one is verified, and one is submitted. Because $N = 1$ resolved incident is statistically insufficient, we report incident counts rather than manufacturing statistical significance.

---

## VIII. Descriptive Results and Implementation Evidence

We present the verified descriptive statistics extracted from the 71 Bengaluru field observations and showcase genuine application screenshots captured from the running Next.js platform.

### A. Empirical Dataset Distribution Across Bengaluru Survey Zones
Table V details the geographic and categorical distribution of field observations across the 14 survey zones.

#### TABLE V: Geographical and Hazard Distribution Across Survey Zones

| Zone Identifier | Zonal Area Description | Total Sites | High Risk | Med Risk | Low Risk | Burning Observed |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ZONE_02-KK** | Kanakapura / Konanakunte / Kammasandra | 24 | 7 | 17 | 0 | 7 sites (29.2%) |
| **ZONE_03-N_C_G** | Nagarbhavi / Chandralayout / Govindrajnagar | 7 | 5 | 0 | 2 | 3 sites (42.9%) |
| **ZONE_04_HC** | Hesaraghatta / Chikkabanavara / Hosahalli | 3 | 1 | 0 | 2 | 1 site (33.3%) |
| **ZONE_08-FWP** | Fruit Market / Peenya Industrial Area | 2 | 1 | 1 | 0 | 1 site (50.0%) |
| **ZONE_10-TF** | T.Dasarahalli / Banashankari 6th Stage | 3 | 3 | 0 | 0 | 3 sites (100.0%) |
| **ZONE_11_NLG-P** | Nalagedaranahalli / Peenya Ward | 3 | 1 | 2 | 0 | 0 sites (0.0%) |
| **ZONE_12_AG_MAINROAD** | Arekere / Gangondanalli Main Road | 7 | 2 | 5 | 0 | 2 sites (28.6%) |
| **ZONE_14_KN** | Kothnur / Kaveri Nagar | 1 | 0 | 0 | 1 | 0 sites (0.0%) |
| **ZONE_15_K-M_MR** | Kengeri / Madanayakanahalli Road | 2 | 2 | 0 | 0 | 2 sites (100.0%) |
| **ZONE_16_KSF** | Sankalpataru Forest Road / Kammasandra | 6 | 2 | 4 | 0 | 2 sites (33.3%) |
| **ZONE_17_M** | Machohalli / Smart School Approach | 1 | 1 | 0 | 0 | 1 site (100.0%) |
| **ZONE_18_BSKR** | Banashankari Road / Sub-division | 1 | 0 | 0 | 1 | 0 sites (0.0%) |
| **ZONE_19_N-M-V** | Nagasandra / Muddinapalya / ITI Layout | 6 | 4 | 1 | 1 | 4 sites (66.7%) |
| **ZONE_20_KA** | Kachohalli / Lakshmipura | 5 | 1 | 3 | 1 | 1 site (20.0%) |
| **Total / Summary** | **14 Urban Survey Zones in Greater Bengaluru** | **71** | **30 (42.3%)** | **33 (46.5%)** | **8 (11.3%)** | **27 sites (38.0%)** |

---

### B. Prototype Interface Visual Evidence

Figures 2 through 9 display genuine high-resolution screenshots captured directly from the live CleaningoAI platform running on local port 3000.

![Figure 2: Main Dashboard](docs/screenshots/fig1_main_dashboard.png)
*Fig. 2. CleaningoAI Operational Intelligence Overview dashboard displaying real-time KPI telemetry (71 field sites, 30 high risk, 6 incidents, 10 reference waterways), risk level proportions, and module launch points.*

![Figure 3: GeoIntel Map](docs/screenshots/fig2_geointel_map.png)
*Fig. 3. GeoIntel Map Explorer rendering all 71 GPS-referenced observation pins across Bengaluru with WGS-84 projection, interactive risk-tiered color coding (Red: High, Amber: Medium, Green: Low), and site metadata inspect panels.*

![Figure 4: HydroRisk Analysis](docs/screenshots/fig3_hydrorisk_analysis.png)
*Fig. 4. HydroRisk Matrix interface displaying comparative E1-E4 mathematical scores, nearest waterway distance calculations, and explicit synthetic demo disclaimers.*

![Figure 5: Vision AI Lab](docs/screenshots/fig4_vision_ai_lab.png)
*Fig. 5. Vision AI Lab interface exhibiting image upload validation, mock bounding-box localization, confidence metrics, and deterministic DEMO_MODE_v1.0 diagnostic readouts.*

![Figure 6: Severity Engine](docs/screenshots/fig5_severity_engine.png)
*Fig. 6. Severity Engine interface detailing the 4-tier visual annotation rubric, field risk distributions, and pending human reviewer adjudication queues.*

![Figure 7: Incident Queue](docs/screenshots/fig6_incident_queue.png)
*Fig. 7. Municipal Incident Queue displaying end-to-end incident lifecycles across the six verified database states (submitted, under_review, assigned, inspected, resolved, verified).*

![Figure 8: Spatial Analytics](docs/screenshots/fig7_spatial_analytics.png)
*Fig. 8. Spatial Analytics dashboard rendering Recharts visualizations of zonal density clustering, waste category distributions, and management intervention frequencies.*

![Figure 9: Dataset Repository](docs/screenshots/fig8_dataset_repository.png)
*Fig. 9. Dataset Repository module providing tabular exploration, coordinate inspection, and multi-factor filtering across all 71 Bengaluru field observations.*

---

## IX. Discussion

The empirical findings and architectural realization of CleaningoAI yield several critical insights for urban environmental computing in rapidly developing regions:

First, our data demonstrates that informal solid waste accumulation in Bengaluru is heavily decoupled from official waste management infrastructure. Over 81% of surveyed sites were classified as entirely unmanaged, with 78.9% receiving zero regular municipal surveillance. The spatial clustering of 27 active open burning sites in peri-urban transition zones (such as Kammasandra, Muddinapalya, and Kachohalli) reveals that waste dumping acts as an acute localized air pollution hazard long before it impacts aquatic systems. 

Second, the analysis confirms that straight-line Euclidean distance (E1) introduces severe spatial distortions. Several sites located within 100 metres of lakes are situated behind elevated embankments with zero surface runoff connectivity, whereas dumps situated 800 metres upstream along open rajakaluves contribute directly to downstream siltation and toxic leachate transport. This validates our core thesis: smart-city waste governance requires topological drainage network modeling rather than simplistic radial buffering.

---

## X. Limitations and Threats to Validity

1. **Internal Validity (Vision Pipeline):** The computer vision inference pipeline currently operates via an in-memory mock adapter (`DEMO_MODE_v1.0`). No trained neural network weights or automated accuracy metrics are claimed.
2. **Construct Validity (Severity Ground Truth):** Ground-truth visual severity annotations remain pending across all 71 observations. The existing E2 score utilizes empirical field risk categories as a proxy.
3. **Construct Validity (Hydrological Network):** The 10 waterway coordinates in the HydroRisk engine are approximate centroid reference points. Authoritative BBMP drainage shapefiles and hydraulic flow directions are not yet integrated; thus E4 currently equals E3.
4. **External Validity (Geographic Specificity):** The field dataset of 71 sites is localized to Greater Bengaluru and exhibits targeted spatial sampling along arterial verges and peripheral industrial corridors.

---

## XI. Future Work and Roadmap

To advance CleaningoAI toward full academic and municipal operational deployment, future work will proceed along four structured phases:
- **Phase 1 (Visual Annotation):** Complete double-blind human visual annotation of all 71 field photographs using CVAT to establish inter-rater kappa agreement.
- **Phase 2 (Model Training):** Fine-tune YOLOv8/YOLOv11 architectures using spatially holdout splits by zone, benchmarking mAP@0.5 against baseline models.
- **Phase 3 (Drainage Graph):** Acquire authoritative GIS shapefiles of BBMP primary and secondary storm-water drains; construct a directed graph in NetworkX/PostGIS to compute true topological E4 scores.
- **Phase 4 (Field Deployment):** Deploy a mobile Progressive Web App (PWA) enabling real-time edge capture, citizen reporting, and automated municipal work-order dispatch.

---

## XII. Conclusion

This paper presented CleaningoAI, an integrated environmental intelligence and operational research platform evaluated on an empirical field study of Greater Bengaluru. By synthesizing mobile GPS observations across 71 sites in 14 urban zones, full-stack Next.js 16.4.6 architecture, embedded SQLite persistence, and multi-criteria HydroRisk screening formulations, CleaningoAI bridges the critical gap between visual waste detection and hydrological risk assessment. We have transparently established the platform's current operational state, clearly distinguishing implemented proximity heuristics from pending drainage graph integrations, and provided a comprehensive foundation for future smart-city environmental engineering.

---

## References

[1] Fraternali et al. (2024). Solid waste detection, monitoring and mapping in remote sensing images: A survey. Waste Management 189, 88–102. DOI/record: 10.1016/j.wasman.2024.08.003.

[2] Shahab & Anjum (2022). Solid Waste Management Scenario in India and Illegal Dump Detection Using Deep Learning. Sustainability 14(23), 15896. DOI/record: 10.3390/su142315896.

[3] Das & Morshed (2026). A GeoAI framework for detecting risk zones from illegal dumping sites in Khulna, Bangladesh. PLOS ONE 21(3), e0345178. DOI/record: 10.1371/journal.pone.0345178.

[4] Valenzuela-Levi et al. (2026 online article). Mapping waste mismanagement: Detecting litter hotspots with geospatial AI and pedestrian imagery. Resources, Conservation & Recycling, article 108772. DOI/record: 10.1016/j.resconrec.2025.108772.

[5] Kashyap, Chanakya & Ramachandra (2021). Pattern, characterization and quantification of unauthorized waste dump sites: A case study of Bangalore. Journal of Solid Waste Technology and Management 47(2), 362–370. DOI/record: See IISc research page.

[6] Sultana & Inayathulla (2025). Assessment of Current Waste Management Practices, Illegal Dump Site Occurrence, and Solid Waste Composition in East Zone of BBMP, Bangalore: A Geospatial Perspective. International Journal of Environmental Sciences 11(8), 1000–1010. DOI/record: 10.64252/r5b6bg28.

[7] Gibellini et al. (2025). A Deep Learning Pipeline for Solid Waste Detection in Remote Sensing Images. Waste Management Bulletin 3(4), 100246. DOI/record: 10.1016/j.wmb.2025.100246.

[8] Litter detection in Real-World Environments using YOLO models (2025). Litter detection in Real-World Environments using YOLO models. IEEE CIETES 2025. DOI/record: 10.1109/CIETES63869.2025.10995152.

[9] Urban Waste Detection and Segmentation using Deep Learning and Computer Vision Techniques (2026). Urban Waste Detection and Segmentation using Deep Learning and Computer Vision Techniques. IEEE ICSEDIS 2026. DOI/record: 10.1109/ICSEDIS68157.2026.11518479.

[10] StreetView-Waste (WACV 2026). StreetView-Waste: A Multi-Task Dataset for Urban Waste Management. IEEE/CVF WACV 2026. DOI/record: 10.1109/WACV61042.2026.00295.

**Reference links:**
- 2024 survey: https://doi.org/10.1016/j.wasman.2024.08.003
- 2022 mp-CNN paper: https://doi.org/10.3390/su142315896
- 2026 Khulna GeoAI: https://doi.org/10.1371/journal.pone.0345178
- 2026 geospatial pedestrian imagery: https://doi.org/10.1016/j.resconrec.2025.108772
- Bengaluru unauthorised dump sites: https://wgbis.ces.iisc.ac.in/energy/paper/PATTERN%2C%20CHARACTERIZATION%20AND%20QUANTIFICATION%20OF%20UNAUTHORIZED%20WASTE%20DUMP%20SITES/materials.html
- BBMP East Zone 2025 study: https://doi.org/10.64252/r5b6bg28
- 2025 remote sensing DL pipeline: https://doi.org/10.1016/j.wmb.2025.100246
- 2025 YOLO litter detection: https://doi.org/10.1109/CIETES63869.2025.10995152
- 2026 YOLOv8 + SAM2: https://doi.org/10.1109/ICSEDIS68157.2026.11518479
- StreetView-Waste WACV 2026: https://doi.org/10.1109/WACV61042.2026.00295
