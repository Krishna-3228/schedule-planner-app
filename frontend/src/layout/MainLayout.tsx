// src/layout/MainLayout.tsx
import type { ReactNode } from "react";
import { useTheme } from "../theme";
import { Calendar } from "../features/tasks/components/Calender";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-200 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex h-screen max-h-screen">
        {/* Sidebar */}
        <aside className="w-80 border-r border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-900/80 backdrop-blur flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Task Quest
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your personal task space (v0.1 · local development)
              </p>
            </div>
          </div>

          <Calendar />

          <nav className="flex-1 px-4 py-4 space-y-6 text-sm bg-slate-400 dark:bg-slate-800 overflow-y-auto no-scrollbar">
            <div>
              <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Planning
              </p>
              <button className="w-full text-left m-1 px-3 py-2 rounded-lg bg-emerald-500 text-slate-800 dark:text-slate-900 text-sm font-medium shadow-sm hover:bg-emerald-400 active:scale-[0.98] transition">
                + Add New Tasks
              </button>
            </div>
          </nav>

          <div className="border border-slate-900/60 dark:border-slate-800 rounded-lg m-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <p className="px-4 py-3 m-2 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-50">
                Settings
            </p>
            <div>
              
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <span className="text-sm">
                  Theme
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    Switch between light and dark
                  </span>
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-6 lg:px-10 lg:py-10 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
