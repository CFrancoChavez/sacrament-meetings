import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan and view ward sacrament meeting agendas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 text-slate-900 min-h-screen flex flex-col`}>
        <Header />
        <Suspense fallback={<div className="bg-slate-700 h-10 w-full" />}>
          <NavLinks />
        </Suspense>
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}