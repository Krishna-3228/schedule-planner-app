// src/features/tasks/api/taskApi.ts
import type { Task, TaskStatus, TaskType } from "../types";

const BASE_URL = "http://127.0.0.1:8000/api/v1/tasks";

export interface DailyTaskPayload {
  title: string;
  description?: string | null;
  type: TaskType;
  status?: TaskStatus;
  repeat_rule?: string | null;
  priority?: number | null;


}
export interface DeadlineTaskPayload {
  title: string;
  description?: string | null;
  type: TaskType;
  status?: TaskStatus;
    deadline_at?: string | null;
    reminder_at?: string | null;
}
export interface ScheduledTaskPayload {
  title: string;
  description?: string | null;
  type: TaskType;
  status?: TaskStatus;
    scheduled_start?: string | null;
    scheduled_end?: string | null;
    location?: string | null;
}

export async function fetchTasks(params?: {
  type?: TaskType;
  status?: TaskStatus;
}): Promise<Task[]> {
  const url = new URL(BASE_URL);

  if (params?.type) url.searchParams.set("type", params.type);
  if (params?.status) url.searchParams.set("status", params.status);

  const res = await fetch(url.toString());

  const data = await res.json();
  console.log("API RESPONSE:", data);   // 👈 add this

  if (!res.ok) throw new Error("Failed to fetch tasks");
  return data;
}

export async function createTask(payload: DailyTaskPayload | DeadlineTaskPayload | ScheduledTaskPayload, path: string): Promise<Task> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(
  id: number,
  payload: Partial<DailyTaskPayload | DeadlineTaskPayload | ScheduledTaskPayload>
): Promise<Task> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error("Failed to delete task");
}
