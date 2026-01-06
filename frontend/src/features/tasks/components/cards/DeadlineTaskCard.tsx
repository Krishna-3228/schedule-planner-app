// features/tasks/components/DeadlineTaskCard.tsx
import type { Task } from "../../types";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function DeadlineTaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <div className="group relative w-full md:w-3/4 rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-lg transition-all hover:shadow-red-500/10 hover:border-red-500/50">

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="text-lg font-semibold tracking-tight text-slate-100 group-hover:text-red-400 transition">
            {task.title}
          </h4>

          {task.description && (
            <p className="text-sm text-slate-400 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 text-sm rounded-lg bg-blue-600/90 text-white shadow hover:bg-blue-500 active:scale-95 transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1.5 text-sm rounded-lg bg-red-600/90 text-white shadow hover:bg-red-500 active:scale-95 transition"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6 text-sm text-slate-400">
        <div className="flex items-center gap-1">
          <span className="text-red-400">⏰</span>
          <span>
            Deadline:{" "}
            {task.deadline?.deadline_at
              ? new Date(task.deadline.deadline_at).toLocaleString()
              : "—"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-pink-400">🔔</span>
          <span>
            Reminder:{" "}
            {task.deadline?.reminder_at
              ? new Date(task.deadline.reminder_at).toLocaleString()
              : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

