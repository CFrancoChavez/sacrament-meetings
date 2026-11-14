import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

async function CurrentSundayRedirect(): Promise<React.ReactNode> {
  // Informa a Next.js 16 que la fecha se calcula en tiempo de solicitud
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Dom) a 6 (Sáb)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const isoDate = sunday.toISOString().split('T')[0];
  const meetings = await getMeetings('', 1, isoDate);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  // Fallback si no hay reunión para este domingo
  redirect('/meetings');
}

export default function CurrentSundayPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-slate-600">
          Loading current Sunday&apos;s sacrament meeting...
        </div>
      }
    >
      <CurrentSundayRedirect />
    </Suspense>
  );
}