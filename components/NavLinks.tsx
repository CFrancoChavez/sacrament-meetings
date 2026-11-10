'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'All Meetings' },
    { href: '/meetings/current', label: 'Current Sunday' },
  ];

  return (
    <nav className="bg-slate-700 text-white text-sm font-medium border-b border-slate-600">
      <div className="max-w-5xl mx-auto px-4 flex gap-6">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href) && link.href !== '/meetings/current');
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={`py-3 px-2 border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-400 text-blue-300 font-semibold'
                  : 'border-transparent hover:border-slate-400 hover:text-slate-200'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}