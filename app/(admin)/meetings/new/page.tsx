import { createMeeting } from '@/lib/actions';
import { MeetingForm } from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Sacrament Meeting</h1>
        <p className="mt-1 text-sm text-slate-600">
          Plan a new Sunday sacrament meeting agenda.
        </p>
      </div>
      <MeetingForm action={createMeeting} submitLabel="Create Meeting" />
    </div>
  );
}