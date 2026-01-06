// features/tasks/components/DeadlineTaskCard.tsx
import { TaskCardBase } from "./TaskCardBase";
import type { Task } from "../../types";

export function DeadlineTaskCard({ task }: { task: Task }) {
  return (
    <TaskCardBase task={task} onEdit={() => {}} onDelete={() => {}}>
      <div className="text-sm text-red-600">
        ⏰ Deadline: {task.deadline?.deadline_at}
      </div>
    </TaskCardBase>
  );
}
