'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          <h1 className="text-xl font-bold tracking-wide">First Ward</h1>
          <p className="text-xs text-slate-300">Sacrament Meeting Planner</p>
        </div>
        <div className="text-sm text-slate-300 font-medium h-5">
          {currentDate}
        </div>
      </div>
    </header>
  );
}