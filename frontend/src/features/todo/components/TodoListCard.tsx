import { useState, useEffect } from "react";
import type { TodoItem, TodoList } from "../types";
import { fetchItems, createItem, deleteItem } from "../api/todoApi";
import { TodoItemCard } from "./TodoItemCard";


export function TodoListCard({ todolist, onDeleteList }: { todolist: TodoList, onDeleteList: (listId: number) => void }) {
    const [list_items, setListItems] = useState<TodoItem[]>([]);
    const [insertingItem, setInsertingItem] = useState<boolean>(false);
    const [newItemText, setNewItemText] = useState<string>("");

    const loadItems = async (listId: number) => {
        try {
            const data = await fetchItems(listId);
            setListItems(data);
        } catch (e) {
            console.error("Failed to load items", e);
        }
    }

    useEffect(() => {
        loadItems(todolist.id);
    }, [todolist.id]);

    const handleAddItem = async () => {
        try {
            const newItem = await createItem(todolist.id, newItemText);
            setListItems(prev => [...prev, newItem]);
            setNewItemText("");
            setInsertingItem(false);
        } catch (e) {
            console.error("Failed to create item", e);
        }
    }

    const handleDeleteItem = async (itemId: number) => {
        try {
            await deleteItem(itemId);
            setListItems(prev => prev.filter(item => item.id !== itemId));
        } catch (e) {
            console.error("Failed to delete item", e);
        }
    }
    

    return (
        <div className="
            group relative w-full md:w-3/4
            rounded-2xl border border-slate-700/60
            bg-gradient-to-br from-slate-900 to-slate-800
            p-6 shadow-xl
            transition-all duration-300
            hover:shadow-emerald-500/20 hover:border-emerald-500/50
        ">
            <h2 className="
                flex items-center gap-2
                text-2xl font-semibold tracking-tight text-slate-100
                group-hover:text-emerald-400 transition
                mb-4
                ">
                <span className="text-xl">📄</span>
                {todolist.title}
                <button
                    title="Delete list"
                    className="
                        absolute top-4 right-4
                        w-7 h-7
                        flex items-center justify-center
                        rounded-full

                        text-slate-400
                        opacity-0
                        scale-90

                        group-hover:opacity-100
                        group-hover:scale-100

                        hover:text-red-400
                        hover:bg-red-500/10

                        transition-all duration-200
                        "
                    onClick={() => {
                        onDeleteList(todolist.id);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                </button>
            </h2>

            <div className="space-y-1 pl-2">
                {list_items.map(item => (
                    <div
                        key={item.id}
                        className="
                        flex items-center gap-3 text-sm text-slate-300
                        px-3 py-2 rounded-lg
                        hover:bg-slate-800/60 transition
                        ">
                        <TodoItemCard todoitem={item} handleDeleteItem={handleDeleteItem} />
                    </div>
                ))}

                {/* New Item */}
                <div className="pt-2">
                    {insertingItem ? (
                        <input
                            autoFocus
                            className="
                                w-full bg-slate-800 border border-slate-700 rounded-lg
                                px-3 py-2 text-sm
                                focus:outline-none focus:ring focus:ring-emerald-500/40
                                "
                            placeholder="New item..."
                            value={newItemText}
                            onChange={e => setNewItemText(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAddItem()}
                            onBlur={() => setInsertingItem(false)}
                        />
                    ) : (
                        <button
                            onClick={() => setInsertingItem(true)}
                            className="
                                text-sm text-emerald-400
                                hover:text-emerald-300 hover:underline
                                transition
                                ">

                            + New Item
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

}