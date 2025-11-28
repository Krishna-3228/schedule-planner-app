import { useEffect, useState } from "react";
import type { Task, TaskType } from "../types";
import { fetchTasks, deleteTask } from "../api/taskApi";
import { TaskForm } from "./TaskForm";

const TABS: { key: TaskType; name: string }[] = [
  { key: "DAILY", name: "Daily" },
  { key: "DEADLINE", name: "Deadlines" },
  { key: "SCHEDULED", name: "Scheduled" },
];

export function TaskTabs() {
  const [activeTab, setActiveTab] = useState<TaskType>("DAILY");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Helper to load tasks
  const loadTasks = async (type: TaskType) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks({ type });
      setTasks(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // Initial + tab change load
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
    const ok = window.confirm(
      `Delete task "${task.title}"? This cannot be undone.`
    );
    if (!ok) return;

    try {
      await deleteTask(task.id);
      await loadTasks(activeTab);
    } catch (err: any) {
      alert(err.message ?? "Failed to delete task");
    }
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
    <div className="space-y-6 relative">
      {/* Header row: tabs + add button */}
      <div className="flex items-center justify-between">
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

        <button
          onClick={handleAddClick}
          className="px-3 py-2 text-sm rounded bg-emerald-500 text-slate-900 font-medium hover:bg-emerald-400"
        >
          + Add task
        </button>
      </div>

      {/* Task list */}
      {loading && <p className="text-slate-400 text-sm">Loading…</p>}
      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {tasks.length === 0 ? (
            <p className="text-slate-400 text-sm">No tasks found.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-slate-800 p-4 rounded-lg flex justify-between items-start border border-slate-700"
                >
                  <div className="space-y-1">
                    <p className="text-base font-semibold">{task.title}</p>
                    {task.description && (
                      <p className="text-sm text-slate-300">
                        {task.description}
                      </p>
                    )}
                    <p className="text-xs text-slate-400">
                      Type: {task.type} · Status: {task.status}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="px-2 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task)}
                      className="px-2 py-1 text-xs rounded bg-red-500 text-slate-900 hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Form modal */}
      {showForm && (
        <TaskForm
          mode={editingTask ? "edit" : "create"}
          initialType={activeTab}
          task={editingTask ?? undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}
