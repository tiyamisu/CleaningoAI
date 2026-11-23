export function DemoBanner({ message }: { message?: string }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
      <span className="text-amber-600 font-bold text-sm flex-shrink-0">⚠️ DEMO MODE</span>
      <p className="text-amber-800 text-sm">
        {message || "This feature operates in demonstration mode. Results are illustrative and do not reflect actual AI model inference or verified real-world data."}
      </p>
    </div>
  );
}
