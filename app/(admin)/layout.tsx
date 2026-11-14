export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 border-b border-gray-200 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Leader Administration
        </span>
      </div>
      {children}
    </section>
  );
}