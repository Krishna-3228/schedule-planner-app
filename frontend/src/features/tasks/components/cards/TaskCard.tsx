// features/tasks/components/TaskCard.tsx
import type { Task } from "../../types";
import { DailyTaskCard } from "./DailyTaskCard";
import { DeadlineTaskCard } from "./DeadlineTaskCard";
import { ScheduledTaskCard } from "./ScheduledTaskCard";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onEdit, onDelete }: Props) {
  if (task.type === "DAILY") return <DailyTaskCard task={task} onEdit={onEdit} onDelete={onDelete} />;
  if (task.type === "DEADLINE") return <DeadlineTaskCard task={task} onEdit={onEdit} onDelete={onDelete} />;
  return <ScheduledTaskCard task={task} onEdit={onEdit} onDelete={onDelete} />;
}
