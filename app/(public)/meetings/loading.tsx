export default function Loading() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
      <span className="ml-3 text-slate-600 font-medium">Loading meeting data...</span>
    </div>
  );
}