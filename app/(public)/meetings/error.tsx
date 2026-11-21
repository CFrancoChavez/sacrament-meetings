'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <main className="mx-auto max-w-xl rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Something went wrong!</h2>
      <p className="mt-2 text-sm text-slate-600">
        {error.message || 'An unexpected error occurred while processing the meeting request.'}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}