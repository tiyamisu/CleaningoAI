import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();

    const incident = db.prepare('SELECT *, id as inc_id, area_label as location_text, severity as risk_level FROM incidents WHERE id = ?').get(id);
    if (!incident) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }

    const timeline = db.prepare(
      'SELECT * FROM incident_timeline WHERE incident_id = ? ORDER BY created_at ASC'
    ).all(id);

    return NextResponse.json({ incident, timeline });
  } catch (err) {
    console.error('[API /incidents/[id] GET]', err);
    return NextResponse.json({ error: 'Failed to fetch incident' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const body = await req.json();

    const incident = db.prepare('SELECT * FROM incidents WHERE id = ?').get(id) as { status: string } | undefined;
    if (!incident) {
      return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }

    const updates: string[] = [];
    const vals: (string | number)[] = [];

    if (body.status) { updates.push('status = ?'); vals.push(body.status); }
    if (body.assigned_to || body.assigned_inspector) { updates.push('assigned_to = ?'); vals.push(body.assigned_to || body.assigned_inspector); }
    if (body.notes) { updates.push('notes = ?'); vals.push(body.notes); }
    updates.push("updated_at = datetime('now')");
    vals.push(id);

    if (updates.length > 1) {
      db.prepare(`UPDATE incidents SET ${updates.join(', ')} WHERE id = ?`).run(...vals);
    }

    // Add timeline entry
    const timelineAction = body.status
      ? `Status changed to ${body.status}`
      : body.assigned_inspector
      ? `Assigned to inspector: ${body.assigned_inspector}`
      : 'Updated';

    db.prepare(`
      INSERT INTO incident_timeline (id, incident_id, action, actor, notes)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      randomUUID(), id, timelineAction,
      body.changed_by || body.actor || 'System',
      body.note || body.notes || ''
    );

    // Audit
    db.prepare(`
      INSERT INTO audit_events (id, entity_type, entity_id, action, actor, details)
      VALUES (?, 'incident', ?, ?, ?, ?)
    `).run(randomUUID(), id, 'updated', body.actor || 'system', timelineAction);

    const updated = db.prepare('SELECT *, id as inc_id, area_label as location_text, severity as risk_level FROM incidents WHERE id = ?').get(id);
    return NextResponse.json({ incident: updated, message: 'Updated successfully' });
  } catch (err) {
    console.error('[API /incidents/[id] PATCH]', err);
    return NextResponse.json({ error: 'Failed to update incident' }, { status: 500 });
  }
}

