// features/tasks/components/ScheduledTaskCard.tsx
import { TaskCardBase } from "./TaskCardBase";
import type { Task } from "../../types";

export function ScheduledTaskCard({ task }: { task: Task }) {
  return (
    <TaskCardBase task={task} onEdit={() => {}} onDelete={() => {}}>
      <div className="text-sm text-green-600">
        🕒 {task.scheduled?.scheduled_start} → {task.scheduled?.scheduled_end}
        <br />
        📍 {task.scheduled?.location}
      </div>
    </TaskCardBase>
  );
}
