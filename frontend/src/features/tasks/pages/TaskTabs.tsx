import { useEffect, useState } from "react";
import type { Task, TaskType } from "../types";
import { fetchTasks, deleteTask } from "../api/taskApi";
import { TaskForm } from "../components/TaskForm";
import { TaskCard } from "../components/cards/TaskCard";
import { DailyTaskForm } from "../components/forms/DailyTaskForm";
import { DeadlineTaskForm } from "../components/forms/DeadlineTaskForm";
import { ScheduledTaskForm } from "../components/forms/ScheduledTaskForm";

const TABS: { key: TaskType; name: string; description: string }[] = [
  { key: "DAILY", name: "Daily", description: "Habits & everyday routines" },
  {
    key: "DEADLINE",
    name: "Deadlines",
    description: "Assignments, submissions, due dates",
  },
  {
    key: "SCHEDULED",
    name: "Scheduled",
    description: "Events locked to specific times",
  },
];

export function TaskTabs() {
  const [activeTab, setActiveTab] = useState<TaskType>("DAILY");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async (type: TaskType) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks({ type });
      setTasks(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(activeTab);
  }, [activeTab]);

  const handleAddClick = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteClick = async (task: Task) => {
    const ok = window.confirm(`Delete "${task.title}"?`);
    if (!ok) return;
    await deleteTask(task.id);
    await loadTasks(activeTab);
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingTask(null);
    await loadTasks(activeTab);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-5 relative">
      {/* Tabs row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex rounded-full bg-slate-100 dark:bg-slate-900 p-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1 text-xs sm:text-sm rounded-full transition 
                  ${activeTab === tab.key
                    ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {TABS.find((t) => t.key === activeTab)?.description}
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 text-slate-900 text-sm font-medium shadow-sm hover:bg-emerald-400 active:scale-[0.98] transition"
        >
          <span className="text-lg leading-none">+</span>
          <span>Add task</span>
        </button>
      </div>

      {/* Content */}
      {loading && (
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
      )}

      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {tasks.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4">
              No tasks in this category yet. Use{" "}
              <span className="font-semibold">“Add task”</span> to create one.
            </p>
          ) : (
            <div className="space-y-4 flex flex-col">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <>
          {activeTab === "DAILY" && (
            <DailyTaskForm
              mode={editingTask ? "edit" : "create"}
              task={editingTask ?? undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}

          {activeTab === "DEADLINE" && (
            <DeadlineTaskForm
              mode={editingTask ? "edit" : "create"}
              task={editingTask ?? undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}

          {activeTab === "SCHEDULED" && (
            <ScheduledTaskForm
              mode={editingTask ? "edit" : "create"}
              task={editingTask ?? undefined}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}
        </>
      )}
    </div>
  );
}
