import type { Task, TaskStatus, TaskType } from "../types";

const BASE_URL = "http://localhost:8000/api/v1/tasks";

export async function fetchTasks(params?: {
  type?: TaskType;
  status?: TaskStatus;
}): Promise<Task[]> {
  const url = new URL(BASE_URL);

  if (params?.type) url.searchParams.set("type", params.type);
  if (params?.status) url.searchParams.set("status", params.status);

  const res = await fetch(url.toString());
  return await res.json();
}
