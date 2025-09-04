
export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-slate-700 rounded-full animate-spin"></div>
    </div>
  );
}
