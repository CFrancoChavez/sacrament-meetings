export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      {children}
    </section>
  );
}