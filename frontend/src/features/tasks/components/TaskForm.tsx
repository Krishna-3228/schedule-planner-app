// src/features/tasks/components/TaskForm.tsx
import { useState } from "react";
import type { Task, TaskStatus, TaskType } from "../types";
import { createTask, updateTask, type TaskPayload } from "../api/taskApi";

const TASK_TYPES: TaskType[] = ["DAILY", "DEADLINE", "SCHEDULED"];
const STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];

function isoToLocal(iso?: string | null): string {
  if (!iso) return "";
  // "2025-11-28T12:34:56Z" → "2025-11-28T12:34"
  return iso.slice(0, 16);
}

interface TaskFormProps {
  mode: "create" | "edit";
  initialType: TaskType;
  task?: Task;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TaskForm({
  mode,
  initialType,
  task,
  onSuccess,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [type, setType] = useState<TaskType>(task?.type ?? initialType);
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "TODO");

  const [deadlineAt, setDeadlineAt] = useState(
    isoToLocal(task?.deadline_at ?? null)
  );
  const [scheduledStart, setScheduledStart] = useState(
    isoToLocal(task?.scheduled_start ?? null)
  );
  const [scheduledEnd, setScheduledEnd] = useState(
    isoToLocal(task?.scheduled_end ?? null)
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function buildPayload(): TaskPayload {
    const toIso = (value: string) =>
      value ? new Date(value).toISOString() : null;

    return {
      title,
      description: description || null,
      type,
      status,
      deadline_at: toIso(deadlineAt),
      scheduled_start: toIso(scheduledStart),
      scheduled_end: toIso(scheduledEnd),
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = buildPayload();

      if (mode === "create") {
        await createTask(payload);
      } else if (mode === "edit" && task) {
        await updateTask(task.id, payload);
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-xl">
        <h3 className="text-lg font-semibold mb-4">
          {mode === "create" ? "Add Task" : "Edit Task"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded">
              {error}
            </p>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <input
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/50"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Type</label>
              <select
                className="w-full rounded bg-slate-800 border border-slate-700 px-2 py-2 text-sm"
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
              >
                {TASK_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Status</label>
              <select
                className="w-full rounded bg-slate-800 border border-slate-700 px-2 py-2 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional date/time fields */}
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">
                Deadline (for DEADLINE tasks)
              </label>
              <input
                type="datetime-local"
                className="w-full rounded bg-slate-800 border border-slate-700 px-2 py-2 text-sm"
                value={deadlineAt}
                onChange={(e) => setDeadlineAt(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Scheduled start (for SCHEDULED)
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded bg-slate-800 border border-slate-700 px-2 py-2 text-sm"
                  value={scheduledStart}
                  onChange={(e) => setScheduledStart(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Scheduled end (for SCHEDULED)
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded bg-slate-800 border border-slate-700 px-2 py-2 text-sm"
                  value={scheduledEnd}
                  onChange={(e) => setScheduledEnd(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 text-sm rounded border border-slate-600 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-3 py-2 text-sm rounded bg-emerald-500 text-slate-900 font-medium hover:bg-emerald-400 disabled:opacity-60"
            >
              {submitting
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                ? "Create task"
                : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
