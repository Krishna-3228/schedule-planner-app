// src/features/tasks/components/forms/DeadlineTaskForm.tsx
import { useState } from "react";
import type { Task, TaskStatus } from "../../types";
import { createTask, updateTask, type DeadlineTaskPayload } from "../../api/taskApi";

const STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];

function isoToLocal(iso?: string | null): string {
    if (!iso) return "";
    // "2025-11-28T12:34:56Z" → "2025-11-28T12:34"
    return iso.slice(0, 16);
}

function localToIso(value: string | null | undefined): string | null {
    if (!value) return null;
    return new Date(value).toISOString();
}


const nowLocal = new Date().toISOString().slice(0, 16);

interface TaskFormProps {
    mode: "create" | "edit";
    task?: Task;
    onSuccess: () => void;
    onCancel: () => void;
}

export function DeadlineTaskForm({
    mode,
    task,
    onSuccess,
    onCancel
}: TaskFormProps) {
    const [title, setTitle] = useState<string>(task?.title ?? "")
    const [description, setDescription] = useState<string>(task?.description ?? "")
    const [status, setStatus] = useState<TaskStatus>(task?.status ?? "TODO")

    const [deadlineAt, setDeadlineAt] = useState<string>(isoToLocal(task?.deadline?.deadline_at ?? null))
    const [reminderAt, setReminderAt] = useState<string>(isoToLocal(task?.deadline?.reminder_at ?? null))

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function buildPayload(): DeadlineTaskPayload {

        return {
            title,
            description: description || null,
            type: "DEADLINE",
            status,
            deadline_at: localToIso(deadlineAt),
            reminder_at: localToIso(reminderAt)

        };
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const payload = buildPayload();

            if (mode === "create") {
                await createTask(payload, "/deadline");
            } else if (mode === "edit" && task) {
                await updateTask(task.id, payload);
            }

            onSuccess();
        } catch (err: any) {
            const backend = err?.data;

            if (backend?.detail) {
                const message = backend.detail
                    .map((d: any) => d.msg)
                    .join(", ");

                setError(message);
            } else {
                setError("Something went wrong");
            }
        }

        finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-xl" >
                <h3>
                    {mode === "create" ? "Add Deadline Task" : "Update Deadline Task"}
                </h3>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <p className="text-sm text-red-400 bg-red-950/40 px-3 py-2 rounded">
                            {error}
                        </p>
                    )}
                    <div className="space-y-1">
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Deadline</label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/50"
                                    value={deadlineAt}
                                    min={nowLocal}
                                    onChange={(e) => setDeadlineAt(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Reminder</label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/50"
                                    value={reminderAt}
                                    min={nowLocal}
                                    onChange={(e) => setReminderAt(e.target.value)}
                                />
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
                    </div>
                </form>

            </div>
        </div>
    );
}