import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    seedIfEmpty(db);

    const { searchParams } = new URL(req.url);
    const zone = searchParams.get('zone');
    const risk = searchParams.get('risk');
    const waste_type = searchParams.get('waste_type');
    const limit = Math.min(parseInt(searchParams.get('limit') || '500'), 1000);
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = 'SELECT * FROM observations WHERE 1=1';
    const params: (string | number)[] = [];

    if (zone) { query += ' AND zone_id = ?'; params.push(zone); }
    if (risk) { query += ' AND UPPER(risk_level) = ?'; params.push(risk.toUpperCase()); }
    if (waste_type) { query += ' AND UPPER(waste_type) = ?'; params.push(waste_type.toUpperCase()); }

    query += ' ORDER BY risk_score DESC, id ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const observations = db.prepare(query).all(...params);
    const totalRow = db.prepare('SELECT COUNT(*) as count FROM observations').get() as { count: number };

    return NextResponse.json({ observations, total: totalRow.count, limit, offset });
  } catch (err) {
    console.error('[API /observations GET]', err);
    return NextResponse.json({ error: 'Failed to fetch observations' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();
    const id = `OBS_${Date.now()}`;

    db.prepare(`
      INSERT INTO observations (id, zone_id, date_captured, latitude, longitude, area_label,
        site_type, waste_type, size_level, risk_score, risk_level, management_status, notes)
      VALUES (?, ?, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.zone_id || 'UNKNOWN',
      parseFloat(body.latitude),
      parseFloat(body.longitude),
      body.area_label || '',
      body.site_type || 'Roadside',
      body.waste_type || 'MIXED',
      parseFloat(body.size_level) || 1,
      parseFloat(body.risk_score) || 0,
      body.risk_level || 'LOW',
      body.management_status || 'NOT_MANAGED',
      body.notes || ''
    );

    return NextResponse.json({ id, message: 'Observation created' }, { status: 201 });
  } catch (err) {
    console.error('[API /observations POST]', err);
    return NextResponse.json({ error: 'Failed to create observation' }, { status: 500 });
  }
}

