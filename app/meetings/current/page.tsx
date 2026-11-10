import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentSundayPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Dom) a 6 (Sáb)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const isoDate = sunday.toISOString().split('T')[0];
  const meetings = getMeetings(isoDate);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  // Fallback si no hay reunión para este domingo
  redirect('/meetings');
}