// src/features/tasks/types.ts
export type TaskType = "DAILY" | "DEADLINE" | "SCHEDULED";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export interface DailyMeta {
  repeat_rule?: string | null;
  priority?: number | null;
}

export interface DeadlineMeta {
  deadline_at?: string | null;
  reminder_at?: string | null;
}

export interface ScheduledMeta {
  scheduled_start?: string | null;
  scheduled_end?: string | null;
  location?: string | null;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  type: TaskType;
  status: TaskStatus;

  daily?: DailyMeta | null;
  deadline?: DeadlineMeta | null;
  scheduled?: ScheduledMeta | null;
}
