import { useState } from "react";
import { toggleItem } from "../api/todoApi";
import type { TodoItem } from "../types";



export function TodoItemCard({ todoitem, handleDeleteItem }: { todoitem: TodoItem, handleDeleteItem: (itemId: number) => void }) {

      const [is_Done, setIsDone] = useState<boolean>(!!todoitem.is_done);

    const handleToggle = async () => {
        setIsDone(prev => !prev); // optimistic

        try {
            const updated = await toggleItem(todoitem.id);
            setIsDone(updated.is_done);
            } catch {
            setIsDone(prev => !prev); // rollback on failure
            }
    };

    return (
        <div className="group flex items-center gap-3 py-1 pr-2 rounded-md hover:bg-slate-800/50 transition">

            <input
                 type="checkbox"
            checked={is_Done}
            onChange={handleToggle}
            className="accent-emerald-500"
            />

            <span className="flex-1 text-slate-200">
                {todoitem.title}
            </span>

            <button
                title="Delete item"
                className="
                    w-6 h-6
                    justify-self-end ml-auto
                    rounded

                    text-slate-400
                    opacity-0
                    scale-90

                    group-hover:opacity-100
                    group-hover:scale-100

                    hover:text-red-400
                    hover:bg-red-500/10

                    transition-all duration-200
                    "
                onClick={() => handleDeleteItem(todoitem.id)}
                    >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
            </button>
        </div>

    );
}
