import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';
import { randomUUID } from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    seedIfEmpty(db);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500);

    let query = `SELECT *, id as inc_id, area_label as location_text, severity as risk_level, assigned_to FROM incidents WHERE 1=1`;
    const params: (string | number)[] = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);

    const incidents = db.prepare(query).all(...params);
    const totalRow = db.prepare('SELECT COUNT(*) as count FROM incidents').get() as { count: number };

    return NextResponse.json({ incidents, total: totalRow.count });
  } catch (err) {
    console.error('[API /incidents GET]', err);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();

    // Generate incident ID like INC-2026-00006
    const countRow = db.prepare('SELECT COUNT(*) as cnt FROM incidents').get() as { cnt: number };
    const nextNum = String(countRow.cnt + 1).padStart(5, '0');
    const year = new Date().getFullYear();
    const id = `INC-${year}-${nextNum}`;

    db.prepare(`
      INSERT INTO incidents (id, title, description, latitude, longitude, area_label,
        waste_type, severity, status, reporter_name, reporter_email, reporter_phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?, ?, ?)
    `).run(
      id,
      body.title || 'Environmental Incident Report',
      body.description || '',
      parseFloat(body.latitude),
      parseFloat(body.longitude),
      body.area_label || '',
      body.waste_type || 'MIXED',
      body.severity || 'medium',
      body.reporter_name || 'Anonymous',
      body.reporter_email || '',
      body.reporter_phone || ''
    );

    // Log audit event
    db.prepare(`
      INSERT INTO audit_events (id, entity_type, entity_id, action, actor, details)
      VALUES (?, 'incident', ?, 'created', ?, 'Incident submitted by citizen')
    `).run(randomUUID(), id, body.reporter_email || 'anonymous');

    return NextResponse.json({ id, message: 'Incident reported successfully', incident_id: id }, { status: 201 });
  } catch (err) {
    console.error('[API /incidents POST]', err);
    return NextResponse.json({ error: 'Failed to create incident' }, { status: 500 });
  }
}

