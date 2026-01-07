// src/features/tasks/components/forms/ScheduledTaskForm.tsx
import { useState } from "react";
import type { Task, TaskStatus } from "../../types";
import { createTask, updateTask, type ScheduledTaskPayload } from "../../api/taskApi";

const STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE", "CANCELLED"];

function isoToLocal(iso?: string | null): string {
    if (!iso) return "";
    // "2025-11-28T12:34:56Z" → "2025-11-28T12:34"
    return iso.slice(0, 16);
}

const nowLocal = new Date().toISOString().slice(0, 16);

interface TaskFormProps {
    mode: "create" | "edit";
    task?: Task;
    onSuccess: () => void;
    onCancel: () => void;
}

export function ScheduledTaskForm({
    mode,
    task,
    onSuccess,
    onCancel
}: TaskFormProps) {
    const [title, setTitle] = useState<string>(task?.title ?? "")
    const [description, setDescription] = useState<string>(task?.description ?? "")
    const [status, setStatus] = useState<TaskStatus>(task?.status ?? "TODO")

    const [scheduledStart, setScheduledStart] = useState<string>(isoToLocal(task?.scheduled?.scheduled_start ?? null))
    const [scheduledEnd, setScheduledEnd] = useState<string>(isoToLocal(task?.scheduled?.scheduled_end ?? null))
    const [location, setLocation] = useState<string>(task?.scheduled?.location ?? "")

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);   

    function buildPayload(): ScheduledTaskPayload {

        return {
            title,
            description: description || null,
            type: "SCHEDULED",
            status,
            scheduled_start: isoToLocal(scheduledStart),
            scheduled_end: isoToLocal(scheduledEnd),
            location: location || null
        };
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const payload = buildPayload();

            if (mode === "create") {
                await createTask(payload, "/scheduled");
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
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-xl" >
                <h3>
                    {mode === "create" ? "Add Scheduled Task" : "Update Scheduled Task"}
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
                                <label className="text-sm font-medium">Scheduled Start</label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/50"
                                    value={scheduledStart}
                                    min={nowLocal}
                                    onChange={(e) => setScheduledStart(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Scheduled End</label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/50"
                                    value={scheduledEnd}
                                    min={nowLocal}
                                    onChange={(e) => setScheduledEnd(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Location</label>
                                <input
                                    className="w-full rounded bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-emerald-500/50"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
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
    )
}