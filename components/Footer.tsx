'use client';

import {useSyncExternalStore } from 'react';
const emptySubscribe = () => () => {};

export default function Footer() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );
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