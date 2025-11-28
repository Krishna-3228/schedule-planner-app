export type TaskType = "DAILY" | "DEADLINE" | "SCHEDULED";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  type: TaskType;
  status: TaskStatus;
  deadline_at?: string | null;
  scheduled_start?: string | null;
  scheduled_end?: string | null;
}
