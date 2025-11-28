export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-slate-700">
        <h1 className="text-xl font-bold mb-6">Schedule Planner</h1>

        <nav className="space-y-2">
          <button className="w-full text-left hover:bg-slate-800 px-2 py-1 rounded">
            Tasks
          </button>
          <button className="w-full text-left hover:bg-slate-800 px-2 py-1 rounded opacity-60">
            📅 Calendar (coming later)
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
