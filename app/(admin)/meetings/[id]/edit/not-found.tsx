import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <main className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Meeting not found</h2>
      <p className="mt-2 text-sm text-slate-600">
        Could not find the requested sacrament meeting record. It may have been deleted or the ID does not exist.
      </p>
      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900"
      >
        Back to Meetings
      </Link>
    </main>
  );
}