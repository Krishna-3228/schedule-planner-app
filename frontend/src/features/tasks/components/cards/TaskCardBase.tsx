// features/tasks/components/TaskCardBase.tsx
import type { ReactNode } from "react";
import type { Task } from "../../types";

interface Props {
  task: Task;
  children: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCardBase({ task, children, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-4 shadow-sm space-y-2 w-3/4">
      <div className="flex justify-between items-start">
        <div className="w-3/5">
          <h3 className="font-medium">{task.title}</h3>
          <p className="text-sm text-slate-500">{task.description}</p>
        </div>

        {children}

        <div className="flex flex-col gap-2">
          <button onClick={onEdit} className="text-blue-500 text-sm">Edit</button>
          <button onClick={onDelete} className="text-red-500 text-sm">Delete</button>
        </div>
      </div>

      
    </div>
  );
}
