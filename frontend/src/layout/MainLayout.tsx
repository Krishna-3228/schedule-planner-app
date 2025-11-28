// src/layout/MainLayout.tsx
import type { ReactNode } from "react";
import { useTheme } from "../theme";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="flex h-screen max-h-screen">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Schedule Planner
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your personal task space
              </p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-6 text-sm">
            <div>
              <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Planning
              </p>
              <button className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900 text-sm font-medium">
                Tasks
              </button>
              <button className="w-full text-left px-3 py-2 mt-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                📅 Calendar <span className="text-xs text-slate-400">(coming soon)</span>
              </button>
            </div>

            <div>
              <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Settings
              </p>
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
          </nav>

          <div className="px-4 py-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            v0.1 · local development
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
