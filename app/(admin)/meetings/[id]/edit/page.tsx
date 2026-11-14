import { Suspense } from 'react';

async function EditMeetingContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <h1 className="text-2xl font-bold text-gray-900">
      Edit Meeting #{id} — Coming in Week 04
    </h1>
  );
}

export default function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="py-8">
      <Suspense fallback={<div className="h-8 w-64 animate-pulse rounded bg-slate-200" />}>
        <EditMeetingContent params={params} />
      </Suspense>
    </main>
  );
}