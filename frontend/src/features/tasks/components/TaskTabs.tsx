import { useEffect, useState } from "react";
import type { Task, TaskType } from "../types";
import { fetchTasks } from "../api/taskApi";

const TABS: { key: TaskType; name: string }[] = [
  { key: "DAILY", name: "Daily" },
  { key: "DEADLINE", name: "Deadlines" },
  { key: "SCHEDULED", name: "Scheduled" },
];

export function TaskTabs() {
  const [activeTab, setActiveTab] = useState<TaskType>("DAILY");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTasks({ type: activeTab })
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Tab buttons */}
      <div className="flex gap-2 bg-slate-800 w-fit p-1 rounded-lg">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1 rounded-md text-sm transition 
              ${
                activeTab === t.key
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Task list */}
      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-slate-400">No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-slate-800 p-4 rounded-lg flex justify-between border border-slate-700"
            >
              <div>
                <p className="text-lg font-semibold">{task.title}</p>
                {task.description && (
                  <p className="text-sm text-slate-300">
                    {task.description}
                  </p>
                )}
              </div>
              <span className="text-xs text-slate-400 uppercase">
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
