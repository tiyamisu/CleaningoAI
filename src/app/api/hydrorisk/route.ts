import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';

// Bengaluru major waterways (approximate centroids for E1 Euclidean distance demo)
const DEMO_WATERWAYS = [
  { name: 'Vrishabhavathi River', lat: 12.957, lng: 77.498 },
  { name: 'Arkavathi River', lat: 13.027, lng: 77.442 },
  { name: 'Hebbal Lake', lat: 13.044, lng: 77.597 },
  { name: 'Ulsoor Lake', lat: 12.985, lng: 77.620 },
  { name: 'Bellandur Lake', lat: 12.927, lng: 77.675 },
  { name: 'Agara Lake', lat: 12.922, lng: 77.638 },
  { name: 'Kengeri Lake', lat: 12.912, lng: 77.482 },
  { name: 'Hesaraghatta Reservoir', lat: 13.085, lng: 77.496 },
  { name: 'Nyanappanahalli Lake', lat: 12.910, lng: 77.615 },
  { name: 'Peenya Drain', lat: 13.033, lng: 77.517 },
];

function euclideanDegrees(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dlat = lat1 - lat2;
  const dlng = (lng1 - lng2) * Math.cos(((lat1 + lat2) / 2) * (Math.PI / 180));
  return Math.sqrt(dlat * dlat + dlng * dlng) * 111320; // metres
}

function nearestWaterway(lat: number, lng: number) {
  let best = DEMO_WATERWAYS[0];
  let bestDist = Infinity;
  for (const w of DEMO_WATERWAYS) {
    const d = euclideanDegrees(lat, lng, w.lat, w.lng);
    if (d < bestDist) { bestDist = d; best = w; }
  }
  return { name: best.name, distance_m: Math.round(bestDist) };
}

export async function GET(_req: NextRequest) {
  try {
    const db = getDb();
    seedIfEmpty(db);

    const observations = db.prepare(
      'SELECT id, latitude, longitude, risk_level, risk_score, severity_label, zone_id, area_label, waste_type FROM observations ORDER BY risk_score DESC'
    ).all() as {
      id: string; latitude: number; longitude: number;
      risk_level: string; risk_score: number; severity_label: string | null;
      zone_id: string; area_label: string; waste_type: string;
    }[];

    const results = observations.map((obs) => {
      const { name: nearest_waterway, distance_m } = nearestWaterway(obs.latitude, obs.longitude);

      // E1: Euclidean proximity score (inverse distance, normalised 0-1)
      const maxDist = 5000;
      const e1_score = parseFloat(Math.max(0, 1 - distance_m / maxDist).toFixed(3));

      // E2: Severity-based score
      const sevMap: Record<string, number> = { high: 1.0, medium: 0.6, low: 0.2, not_assessable: 0 };
      const riskMap: Record<string, number> = { HIGH: 1.0, MEDIUM: 0.6, LOW: 0.2 };
      const e2_score = sevMap[obs.severity_label || ''] ?? riskMap[obs.risk_level] ?? 0.3;

      // E3: Combined
      const e3_score = parseFloat((0.5 * e1_score + 0.5 * e2_score).toFixed(3));

      // E4: Same as E3 but notes connectivity is DEMO/UNKNOWN
      const e4_connectivity = 'UNKNOWN — drainage graph connectivity not verified';
      const e4_score = e3_score; // identical until real network data available

      return {
        id: obs.id,
        area_label: obs.area_label,
        zone_id: obs.zone_id,
        waste_type: obs.waste_type,
        risk_level: obs.risk_level,
        risk_score: obs.risk_score,
        latitude: obs.latitude,
        longitude: obs.longitude,
        nearest_waterway,
        distance_to_waterway_m: distance_m,
        e1_score,
        e2_score: parseFloat(e2_score.toFixed(3)),
        e3_score,
        e4_score,
        e4_connectivity,
        is_demo: true,
        disclaimer: 'SYNTHETIC DEMO — Drainage network connectivity is NOT hydraulically verified. All scores are illustrative screening indicators only.',
      };
    });

    // Sort by e4_score desc for ranking
    results.sort((a, b) => b.e4_score - a.e4_score);

    return NextResponse.json({
      results,
      total: results.length,
      methodology_note:
        'E1: Euclidean distance to the nearest approximate reference coordinate hardcoded for the demo. E2: Recorded field risk category used as a proxy because severity annotations are pending. E3: 0.5×E1 + 0.5×E2. E4 equals E3; drainage graph connectivity is unknown and is not calculated.',
      disclaimer:
        'All priority scores are inspection planning indicators. No hydraulic connectivity has been field-verified. Do not use for engineering or regulatory decisions.',
    });
  } catch (err) {
    console.error('[API /hydrorisk GET]', err);
    return NextResponse.json({ error: 'Failed to compute HydroRisk' }, { status: 500 });
  }
}

