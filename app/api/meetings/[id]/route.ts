import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (Number.isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid ID. Must be a number.' },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(id);

  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found.' },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}