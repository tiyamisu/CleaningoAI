import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'cleaningoai.db');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeSchema();
  }
  return db;
}

function initializeSchema() {
  const d = db;
  
  d.exec(`
    CREATE TABLE IF NOT EXISTS observations (
      id TEXT PRIMARY KEY,
      zone_id TEXT NOT NULL,
      date_captured TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      area_label TEXT,
      site_type TEXT,
      waste_type TEXT,
      size_level REAL,
      risk_score REAL,
      risk_level TEXT,
      management_status TEXT,
      monitoring_frequency TEXT,
      burning_observed TEXT DEFAULT 'NO',
      centralized_point TEXT DEFAULT 'NO',
      primary_cause TEXT,
      severity_label TEXT,
      severity_confidence REAL,
      severity_reviewer TEXT,
      annotation_status TEXT DEFAULT 'pending',
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS incidents (
      id TEXT PRIMARY KEY,
      observation_id TEXT REFERENCES observations(id),
      title TEXT NOT NULL,
      description TEXT,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      area_label TEXT,
      waste_type TEXT,
      severity TEXT,
      status TEXT DEFAULT 'submitted',
      reporter_name TEXT,
      reporter_email TEXT,
      reporter_phone TEXT,
      assigned_to TEXT,
      inspector_id TEXT,
      evidence_path TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS incident_timeline (
      id TEXT PRIMARY KEY,
      incident_id TEXT NOT NULL REFERENCES incidents(id),
      action TEXT NOT NULL,
      actor TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'citizen',
      password_hash TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS analysis_jobs (
      id TEXT PRIMARY KEY,
      observation_id TEXT REFERENCES observations(id),
      incident_id TEXT REFERENCES incidents(id),
      image_path TEXT,
      model_version TEXT DEFAULT 'DEMO_MODE_v1.0',
      status TEXT DEFAULT 'completed',
      waste_detected INTEGER DEFAULT 0,
      waste_classes TEXT,
      confidence REAL,
      bounding_boxes TEXT,
      severity_estimate TEXT,
      is_demo INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS annotations (
      id TEXT PRIMARY KEY,
      observation_id TEXT REFERENCES observations(id),
      rater_id TEXT,
      severity_label TEXT,
      waste_classes TEXT,
      notes TEXT,
      confidence REAL DEFAULT 0.8,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS experiments (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT,
      description TEXT,
      approach TEXT,
      status TEXT DEFAULT 'pending',
      metrics TEXT,
      dataset_version TEXT,
      model_version TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS audit_events (
      id TEXT PRIMARY KEY,
      entity_type TEXT,
      entity_id TEXT,
      action TEXT,
      actor TEXT,
      details TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_observations_zone ON observations(zone_id);
    CREATE INDEX IF NOT EXISTS idx_observations_risk ON observations(risk_level);
    CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
    CREATE INDEX IF NOT EXISTS idx_timeline_incident ON incident_timeline(incident_id);
    CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_events(entity_type, entity_id);

    -- V2.0 Non-destructive extensions -------------------------------------------

    CREATE TABLE IF NOT EXISTS materials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      cas_number TEXT,
      category TEXT,
      density_kg_m3 REAL,
      recyclability TEXT DEFAULT 'unknown',
      hazard_level TEXT DEFAULT 'low',
      properties_json TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS facilities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT,
      address TEXT,
      country TEXT DEFAULT 'India',
      region TEXT,
      latitude REAL,
      longitude REAL,
      sector TEXT,
      capacity_tonnes_day REAL,
      status TEXT DEFAULT 'active',
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS chemical_substances (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      formula TEXT,
      cas_number TEXT,
      hazard_class TEXT,
      molecular_weight_g_mol REAL,
      boiling_point_c REAL,
      melting_point_c REAL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sensors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT,
      location_id TEXT,
      latitude REAL,
      longitude REAL,
      status TEXT DEFAULT 'offline',
      last_reading_at TEXT,
      unit TEXT,
      threshold_min REAL,
      threshold_max REAL,
      metadata_json TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS samples (
      id TEXT PRIMARY KEY,
      observation_id TEXT REFERENCES observations(id),
      collected_at TEXT,
      matrix_type TEXT,
      collector_name TEXT,
      lab_name TEXT,
      lab_results_json TEXT,
      status TEXT DEFAULT 'pending',
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS interventions (
      id TEXT PRIMARY KEY,
      observation_id TEXT REFERENCES observations(id),
      incident_id TEXT REFERENCES incidents(id),
      type TEXT,
      started_at TEXT,
      completed_at TEXT,
      status TEXT DEFAULT 'planned',
      contractor TEXT,
      cost_inr REAL,
      outcome_json TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_materials_category ON materials(category);
    CREATE INDEX IF NOT EXISTS idx_facilities_country ON facilities(country);
    CREATE INDEX IF NOT EXISTS idx_sensors_status ON sensors(status);
    CREATE INDEX IF NOT EXISTS idx_interventions_status ON interventions(status);
    -- End V2.0 extensions --------------------------------------------------------
  `);
}

export { getDb };
export default getDb;
