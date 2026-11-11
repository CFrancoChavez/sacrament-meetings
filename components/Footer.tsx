'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-400 py-6 mt-auto border-t border-slate-800 text-sm">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-1">
        <p>The Church of Jesus Christ of Latter-day Saints</p>
        <p className="text-xs text-slate-500">
          &copy; {year} Sacrament Meeting Planner &bull; WDD 430
        </p>
      </div>
    </footer>
  );
}