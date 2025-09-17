export function Box({ title, content }: { title: string; content: string }) {
  return (
    <div className="border-2 border-slate-400 rounded-xl p-4 text-center">
      <h2 className="text-sm font-medium text-slate-600 mb-2">{title}</h2>
      <p className="text-2xl font-semibold">{content}</p>
    </div>
  );
}
