import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-slate-200 max-w-3xl mx-auto space-y-6">
      {/* Printable Header */}
      <div className="text-center border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Sacrament Meeting Agenda</h2>
        <p className="text-slate-500 font-medium mt-1">{meeting.date}</p>
        <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold capitalize bg-slate-100 text-slate-700 border border-slate-300">
          {meeting.meetingType} Meeting
        </span>
      </div>

      {/* Leadership */}
      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-md border border-slate-100 text-sm">
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Presiding</span>
          <span className="font-medium text-slate-800">{meeting.presiding}</span>
        </div>
        <div>
          <span className="text-xs text-slate-500 uppercase tracking-wider block font-semibold">Conducting</span>
          <span className="font-medium text-slate-800">{meeting.conducting}</span>
        </div>
      </div>

      {/* Announcements */}
      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-1">Announcements</h3>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
            {meeting.announcements.map((ann, idx) => (
              <li key={idx}>{ann}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Opening Services */}
      <section className="space-y-2 text-sm">
        <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-1">Opening</h3>
        <div className="space-y-1">
          <p><span className="font-semibold text-slate-700">Opening Hymn:</span> #{meeting.openingHymn.number} - "{meeting.openingHymn.title}"</p>
          <p><span className="font-semibold text-slate-700">Invocation:</span> {meeting.openingPrayer}</p>
        </div>
      </section>

      {/* Ward Business */}
      <section className="space-y-2 text-sm">
        <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-1">Ward Business</h3>
        {meeting.stakeBusiness && (
          <p className="text-amber-800 bg-amber-50 p-2 rounded text-xs font-semibold border border-amber-200">
            &bull; Stake Business Scheduled
          </p>
        )}
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            {meeting.wardBusiness.map((b, idx) => (
              <li key={idx}>{b.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 italic text-xs">Standard ward business.</p>
        )}
      </section>

      {/* Sacrament */}
      <section className="space-y-2 text-sm">
        <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-1">Sacrament</h3>
        <p><span className="font-semibold text-slate-700">Sacrament Hymn:</span> #{meeting.sacramentHymn.number} - "{meeting.sacramentHymn.title}"</p>
      </section>

      {/* Speakers / Musical Numbers */}
      <section className="space-y-2 text-sm">
        <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-1">Program / Speakers</h3>
        {meeting.speakers.length > 0 ? (
          <ul className="divide-y divide-slate-100">
            {meeting.speakers.map((s, idx) => (
              <li key={idx} className="py-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800">{s.name}</p>
                  {s.topic && <p className="text-xs text-slate-500">Topic: {s.topic}</p>}
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 capitalize">
                  {s.type}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 italic text-xs">Bearing of testimonies by congregation.</p>
        )}
      </section>

      {/* Closing */}
      <section className="space-y-2 text-sm">
        <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-1">Closing</h3>
        <div className="space-y-1">
          <p><span className="font-semibold text-slate-700">Closing Hymn:</span> #{meeting.closingHymn.number} - "{meeting.closingHymn.title}"</p>
          <p><span className="font-semibold text-slate-700">Benediction:</span> {meeting.closingPrayer}</p>
        </div>
      </section>
    </article>
  );
}