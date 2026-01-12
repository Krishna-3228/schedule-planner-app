// src/layout/MainLayout.tsx
import { useState, type ReactNode } from "react";
import { Calendar } from "../features/tasks/components/Calender";
import { SettingsPanel } from "../features/tasks/components/SettingsPanel";

interface MainLayoutProps {
  page: "home" | "todo" | "addtask";
  setPage: (page: "home" | "todo" | "addtask") => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  children: ReactNode;
}

export function MainLayout({ page, setPage, selectedDate, onSelectDate, children }: MainLayoutProps) {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  function closeSettings() {
    setShowSettings(false);
  }

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

          <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} />

          <nav className="flex-1 px-4 py-2 text-sm bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto no-scrollbar">
            <div className="space-y-1">

              <button
                onClick={() => setPage("home")}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium transition
                    ${page === "home"
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}

              >
                <span className="text-lg">🏠</span>
                <span>Home</span>
              </button>

              <button
                onClick={() => setPage("todo")}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium transition
                    ${page === "todo"
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}              >
                <span className="text-lg">📝</span>
                <span>Todo List</span>
              </button>
              
              <button
                onClick={() => setPage("addtask")}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium transition
                    ${page === "addtask"
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}              >
                <span className="text-lg">➕</span>
                <span>Add New Tasks</span>
              </button>
            </div>
          </nav>

          <button
            onClick={() => setShowSettings(true)}
            className="w-full text-left border border-slate-900/60 dark:border-slate-800 rounded-lg m-1 px-4 py-3
             hover:bg-slate-100 dark:hover:bg-slate-800 transition
             text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-50"
          >
            <span>⚙️</span> Settings
          </button>

        </aside>

        {showSettings && <SettingsPanel closeSettings={closeSettings} />}

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
