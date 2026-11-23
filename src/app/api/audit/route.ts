import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '25', 10)));
    const type = searchParams.get('type') ?? null;
    const offset = (page - 1) * limit;

    let countSql = 'SELECT COUNT(*) as total FROM audit_events';
    let eventsSql = 'SELECT *, action AS event_type, details AS description FROM audit_events';
    const params: (string | number)[] = [];

    if (type && type !== 'all') {
      countSql += ' WHERE action = ?';
      eventsSql += ' WHERE action = ?';
      params.push(type);
    }

    eventsSql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    const countRow = db.prepare(countSql).get(...params) as { total: number };
    const total = countRow?.total ?? 0;
    const events = db.prepare(eventsSql).all(...params, limit, offset);

    return NextResponse.json({
      events,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('/api/audit error:', err);
    return NextResponse.json({ events: [], total: 0, page: 1, pages: 0 }, { status: 500 });
  }
}

