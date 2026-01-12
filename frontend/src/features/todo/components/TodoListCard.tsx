import { useState, useEffect } from "react";
import type { TodoItem, TodoList } from "../types";
import { fetchItems, createItem, deleteItem, updateList } from "../api/todoApi";
import { TodoItemCard } from "./TodoItemCard";


export function TodoListCard({ todolist, onDeleteList, onUpdateList }: { todolist: TodoList, onDeleteList: (listId: number) => void, onUpdateList: (listId: number, newTitle: string) => void }) {
    const [list_items, setListItems] = useState<TodoItem[]>([]);
    const [insertingItem, setInsertingItem] = useState<boolean>(false);
    const [newItemText, setNewItemText] = useState<string>("");

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editListTitle, setEditListTitle] = useState<string>(todolist.title);

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
                {isEditing ? (
                    <input
                        type="text"
                        value={editListTitle}
                        onChange={(e) => {
                            setEditListTitle(e.target.value);
                        }}
                        onKeyDown={e => e.key === "Enter" && onUpdateList(todolist.id, editListTitle) && setIsEditing(false)}

                        className="bg-transparent border-b border-emerald-500 focus:outline-none focus:border-emerald-400"
                    />
                ) : (
                    todolist.title
                )}
                <button
                    title="Edit list"
                    className="
                        absolute top-4 right-12
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
                        setIsEditing(!isEditing);
                    }}
                >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>


                </button>

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
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
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