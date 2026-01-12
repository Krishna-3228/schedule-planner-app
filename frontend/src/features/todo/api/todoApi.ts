import type { TodoList, TodoItem } from "../types";

const BASE = "http://127.0.0.1:8000/api/v1/todos";

export async function fetchLists(): Promise<TodoList[]> {
  const res = await fetch(`${BASE}/lists`);
  if (!res.ok) throw new Error("Failed to load lists");
  return res.json();
}

export async function createList(name: string) {
  const res = await fetch(`${BASE}/lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: name }),
  });
  if (!res.ok) throw new Error("Failed to create list");
  return res.json();
}

export async function deleteList(listId: number) {
  const res = await fetch(`${BASE}/lists/${listId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete list");
}

export async function fetchItems(listId: number): Promise<TodoItem[]> {
  const res = await fetch(`${BASE}/lists/${listId}/items`);
  if (!res.ok) throw new Error("Failed to load items");
  return res.json();
}

export async function createItem(listId: number, title: string) {
  const res = await fetch(`${BASE}/lists/${listId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}


export async function toggleItem(itemId: number) {
  const res = await fetch(`${BASE}/items/${itemId}`, {
    method: "PATCH",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to toggle item");
  }

  return res.json();
}


export async function deleteItem(itemId: number) {
  const res = await fetch(`${BASE}/items/${itemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete item");
}