import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Sacrament Meetings</h2>
        <Suspense fallback={<div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-slate-200" />}>
          <MeetingSearch />
        </Suspense>
      </div>

      {meetings.length === 0 ? (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">
          No sacrament meetings found matching &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}