import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const badgeColors: Record<string, string> = {
    regular: 'bg-blue-100 text-blue-800 border-blue-200',
    testimony: 'bg-purple-100 text-purple-800 border-purple-200',
    stake: 'bg-amber-100 text-amber-800 border-amber-200',
    general: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-lg font-bold text-slate-800">{meeting.date}</span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize border ${
              badgeColors[meeting.meetingType] || 'bg-slate-100 text-slate-800'
            }`}
          >
            {meeting.meetingType}
          </span>
        </div>
        
        <div className="text-sm text-slate-600 space-y-1 mb-4">
          <p><span className="font-semibold text-slate-700">Presiding:</span> {meeting.presiding}</p>
          <p><span className="font-semibold text-slate-700">Conducting:</span> {meeting.conducting}</p>
          <p><span className="font-semibold text-slate-700">Speakers:</span> {meeting.speakers.length}</p>
        </div>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="block text-center bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
      >
        View Agenda &rarr;
      </Link>
    </div>
  );
}
