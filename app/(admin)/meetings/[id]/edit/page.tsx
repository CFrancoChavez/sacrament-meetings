import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import { updateMeeting } from '@/lib/actions';
import { MeetingForm } from '@/components/MeetingForm';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

async function EditMeetingContent({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Sacrament Meeting ({meeting.date})
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Update the details for this sacrament meeting agenda.
        </p>
      </div>
      <MeetingForm
        action={updateMeetingWithId}
        initialMeeting={meeting}
        submitLabel="Update Meeting"
      />
    </div>
  );
}

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <main className="py-8">
      <Suspense fallback={<div className="mx-auto h-96 max-w-4xl animate-pulse rounded-lg bg-slate-200" />}>
        <EditMeetingContent params={params} />
      </Suspense>
    </main>
  );
}