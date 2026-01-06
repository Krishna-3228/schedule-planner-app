// features/tasks/components/TaskCard.tsx
import type { Task } from "../../types";
import { DailyTaskCard } from "./DailyTaskCard";
import { DeadlineTaskCard } from "./DeadlineTaskCard";
import { ScheduledTaskCard } from "./ScheduledTaskCard";

export function TaskCard({ task }: { task: Task }) {
  if (task.type === "DAILY") return <DailyTaskCard task={task} />;
  if (task.type === "DEADLINE") return <DeadlineTaskCard task={task} />;
  return <ScheduledTaskCard task={task} />;
}
