import { NextRequest, NextResponse } from 'next/server';
import getDb from '@/lib/db';
import { seedIfEmpty } from '@/lib/seed';

async function seed(_req: NextRequest) {
  try {
    const db = getDb();
    seedIfEmpty(db);
    return NextResponse.json({ message: 'Database seeded successfully', status: 'ok' });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export const GET = seed;
export const POST = seed;

