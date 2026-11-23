# How to Run CleaningoAI

This guide provides simple, step-by-step instructions to run the **CleaningoAI** platform locally on your computer.

---

## 1. Prerequisites

Make sure you have the following installed on your machine:
- **Node.js**: Version 18.x, 20.x, or newer (v24 tested)
- **npm**: Comes with Node.js
- A modern web browser (Chrome, Edge, Firefox, or Safari)

To check your Node and npm versions, run in your terminal:
```bash
node -v
npm -v
```

---

## 2. Quick Start

### Step 1: Open Terminal & Ensure You Are in the Project Directory
Open your terminal (PowerShell, Command Prompt, or Bash) in the `CleaningoAI` directory:
```bash
# Verify you are in the CleaningoAI project directory:
pwd
```

### Step 2: Install Dependencies (If not already installed)
```bash
npm install
```

### Step 3: Setup Environment Variables
If `.env.local` is not already present, copy `.env.example`:
```bash
# On Windows (PowerShell):
Copy-Item .env.example .env.local

# On macOS / Linux:
cp .env.example .env.local
```

### Step 4: Run the Development Server
```bash
npm run dev
```

### Step 5: Open in Your Browser
Once the terminal shows `Ready in ...`, open your browser and visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 3. Platform Experiences & Demo Credentials

CleaningoAI features 3 integrated experiences:

### A. Public Website (`http://localhost:3000`)
- **Home**: Platform overview, research highlights, and animated data counters.
- **Technology**: 6-stage analytical pipeline (`/technology`).
- **Research**: Academic proposal, research questions (RQ1–RQ4), and rubrics (`/research`).
- **Impact**: Real Bengaluru field study findings (`/impact`).

### B. Intelligence Application (`http://localhost:3000/app`)
- **GeoIntel Map**: Interactive Bengaluru map with 71 GPS-verified waste sites (`/app/map`).
- **Cleaningo Vision**: AI image analysis lab (`/app/vision`).
- **Severity Engine**: Risk scoring and distribution charts (`/app/severity`).
- **HydroRisk**: Proximity analysis to major Bengaluru water bodies (`/app/hydrorisk`).
- **Incident Reporter**: 4-step wizard to submit reports (`/app/reports`).

### C. Operations Portal (`http://localhost:3000/ops`)
- **Incident Queue**: Review, verify, and resolve reported incidents (`/ops/queue`).
- **Assignments**: Assign field inspectors and monitor workload (`/ops/assign`).
- **Field Inspection**: Inspector view for recording on-site findings (`/ops/inspect`).
- **Audit Log**: Transparent record of all system events and updates (`/ops/audit`).

---

## 4. Demo Login Credentials

You can test role-specific workflows at **[http://localhost:3000/signin](http://localhost:3000/signin)** (or click any row on the page to auto-fill):

| Role | Email | Password | Primary Destination |
| :--- | :--- | :--- | :--- |
| **Municipal Officer** | `officer@cleaningoai.in` | `officer123` | Operations Portal (`/ops`) |
| **Field Inspector** | `inspector@cleaningoai.in` | `inspector123` | Inspection View (`/ops/inspect`) |
| **Platform Admin** | `admin@cleaningoai.in` | `admin123` | Operations Admin (`/ops/admin`) |
| **Researcher** | `researcher@cleaningoai.in` | `researcher123` | Research Workspace (`/app/research`) |
| **Citizen Reporter** | `reporter@cleaningoai.in` | `reporter123` | Report Incident (`/app/reports`) |

---

## 5. Building for Production

To create an optimized production build:

```bash
# 1. Build the application
npm run build

# 2. Start the production server
npm start
```
Then visit **[http://localhost:3000](http://localhost:3000)**.

---

## 6. Troubleshooting

- **Port 3000 already in use**:
  Next.js will automatically suggest running on port 3001 (`http://localhost:3001`), or you can close the process using port 3000:
  ```powershell
  # Windows PowerShell:
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
  ```
- **Database reset / re-seeding**:
  The SQLite database seeds automatically on first launch. If you ever want to re-seed demo data, visit **[http://localhost:3000/ops/admin](http://localhost:3000/ops/admin)** and click **"Trigger Seed"**, or call:
  ```bash
  curl http://localhost:3000/api/seed
  ```

