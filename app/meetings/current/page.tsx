import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import type { SacramentMeeting } from '@/lib/types';

async function fetchMeetingsByDate(dateStr: string): Promise<SacramentMeeting[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/meetings?date=${dateStr}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function CurrentSundayPage() {
  // Informa a Next.js 16 que la ruta requiere datos en tiempo de solicitud (request-time)
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Dom) a 6 (Sáb)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const isoDate = sunday.toISOString().split('T')[0];
  const meetings = await fetchMeetingsByDate(isoDate);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  // Fallback si no hay reunión para este domingo
  redirect('/meetings');
}
