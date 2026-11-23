import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';

export async function GET(_req: NextRequest) {
  try {
    const db = getDb();
    seedIfEmpty(db);

    // Total observations
    const totalObs = (db.prepare('SELECT COUNT(*) as c FROM observations').get() as { c: number }).c;

    // By risk level
    const byRisk = db.prepare(
      "SELECT risk_level, COUNT(*) as count FROM observations GROUP BY risk_level"
    ).all() as { risk_level: string; count: number }[];

    // By waste type
    const byWaste = db.prepare(
      "SELECT waste_type, COUNT(*) as count FROM observations GROUP BY waste_type"
    ).all() as { waste_type: string; count: number }[];

    // By zone
    const byZone = db.prepare(
      "SELECT zone_id, COUNT(*) as count FROM observations GROUP BY zone_id ORDER BY count DESC"
    ).all() as { zone_id: string; count: number }[];

    // By management status
    const byMgmt = db.prepare(
      "SELECT management_status, COUNT(*) as count FROM observations GROUP BY management_status"
    ).all() as { management_status: string; count: number }[];

    // Burning observed
    const burningYes = (db.prepare(
      "SELECT COUNT(*) as c FROM observations WHERE UPPER(burning_observed) = 'YES'"
    ).get() as { c: number }).c;

    // By site type
    const bySiteType = db.prepare(
      "SELECT site_type, COUNT(*) as count FROM observations GROUP BY site_type ORDER BY count DESC LIMIT 10"
    ).all() as { site_type: string; count: number }[];

    // Annotation progress
    const annotated = (db.prepare(
      "SELECT COUNT(*) as c FROM observations WHERE severity_label IS NOT NULL"
    ).get() as { c: number }).c;

    // Incidents
    const totalInc = (db.prepare('SELECT COUNT(*) as c FROM incidents').get() as { c: number }).c;

    const byIncStatus = db.prepare(
      "SELECT status, COUNT(*) as count FROM incidents GROUP BY status"
    ).all() as { status: string; count: number }[];

    // Experiments
    const experiments = db.prepare('SELECT * FROM experiments').all();

    return NextResponse.json({
      observations: {
        total: totalObs,
        byRisk,
        byWaste,
        byZone,
        byManagement: byMgmt,
        bySiteType,
        burningObserved: burningYes,
        annotated,
        annotationProgress: totalObs > 0 ? Math.round((annotated / totalObs) * 100) : 0,
      },
      incidents: {
        total: totalInc,
        byStatus: byIncStatus,
      },
      research: {
        experiments,
        datasetSize: totalObs,
        zones: byZone.length,
        annotationComplete: annotated,
      },
    });
  } catch (err) {
    console.error('[API /analytics GET]', err);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

