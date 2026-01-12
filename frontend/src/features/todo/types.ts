export interface TodoList {
  id: number;
  title: string;
}

export interface TodoItem {
  id: number;
  list_id: number;
  title: string;
  is_done: boolean;
  position: number;   // order inside the list
  created_at: string;
}
