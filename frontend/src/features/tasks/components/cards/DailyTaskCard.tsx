// features/tasks/components/DailyTaskCard.tsx
import type { Task } from "../../types";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function DailyTaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm space-y-2 w-3/4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-slate-500">{task.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-400">
        <span>Priority: {task.daily?.priority ?? "—"}</span>
        <span className="ml-4">
          Repeat: {task.daily?.repeat_rule ?? "—"}
        </span>
      </div>
    </div>
  );
}
