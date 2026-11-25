import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';

export async function GET() {
  try {
    const db = getDb();
    seedIfEmpty(db);

    const experiments = db.prepare('SELECT * FROM experiments ORDER BY created_at ASC').all();
    const annotations = db.prepare('SELECT * FROM annotations ORDER BY created_at DESC LIMIT 100').all();
    const datasetSize = (db.prepare('SELECT COUNT(*) as c FROM observations').get() as { c: number }).c;
    const zones = db.prepare('SELECT DISTINCT zone_id FROM observations').all() as { zone_id: string }[];
    const annotated = (db.prepare(
      "SELECT COUNT(*) as c FROM observations WHERE severity_label IS NOT NULL AND severity_label != ''"
    ).get() as { c: number }).c;

    return NextResponse.json({
      dataset: {
        total: datasetSize,
        annotated,
        pending: datasetSize - annotated,
        zones: zones.map((z) => z.zone_id),
        split_strategy: 'Site-level spatial holdout is proposed; no split has been assigned or run.',
      },
      experiments,
      annotations,
      model_registry: [
        {
          id: 'MODEL_DEMO_001',
          name: 'YOLOv8n-pretrained (DEMO)',
          version: 'DEMO_MODE_v1.0',
          status: 'demo',
          checkpoint: 'Not integrated — using demo inference adapter',
          note: 'Real model checkpoint required. Transfer learning from COCO weights planned.',
        },
      ],
    });
  } catch (err) {
    console.error('[API /research GET]', err);
    return NextResponse.json({ error: 'Failed to fetch research data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();

    if (body.type === 'annotation') {
      const id = `ANN_${Date.now()}`;
      db.prepare(`
        INSERT INTO annotations (id, observation_id, rater_id, severity_label, waste_classes, notes, confidence)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(id, body.observation_id, body.rater_id || 'anonymous',
        body.severity_label, body.waste_classes || '', body.notes || '', body.confidence || 0.8);

      // Update observation annotation_status
      db.prepare("UPDATE observations SET severity_label = ?, annotation_status = 'annotated', updated_at = datetime('now') WHERE id = ?")
        .run(body.severity_label, body.observation_id);

      return NextResponse.json({ id, message: 'Annotation saved' }, { status: 201 });
    }

    return NextResponse.json({ error: 'Unknown research action type' }, { status: 400 });
  } catch (err) {
    console.error('[API /research POST]', err);
    return NextResponse.json({ error: 'Failed to save research data' }, { status: 500 });
  }
}

