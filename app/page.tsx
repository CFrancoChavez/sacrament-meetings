import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-6 text-center py-12">
      <h2 className="text-4xl font-extrabold text-slate-800">
        Welcome to Sacrament Meeting Planner
      </h2>
      <p className="text-slate-600 max-w-2xl mx-auto text-lg">
        Easily plan, view, and organize sacrament meeting agendas, hymns, speakers, and announcements for your ward.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Link
          href="/meetings"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition-colors shadow"
        >
          Browse All Meetings
        </Link>
        <Link
          href="/meetings/current"
          className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-md transition-colors shadow"
        >
          View Current Sunday
        </Link>
      </div>
    </div>
  );
}