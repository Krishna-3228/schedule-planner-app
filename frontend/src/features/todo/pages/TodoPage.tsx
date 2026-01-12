import { useEffect, useState } from "react";
import { fetchLists, createList, deleteList } from "../api/todoApi";
import type { TodoList } from "../types";
import { TodoListCard } from "../components/TodoListCard";


export function TodoPage() {
    const [lists, setLists] = useState<TodoList[]>([]);
    const [creatingList, setCreatingList] = useState(false);
    const [newListName, setNewListName] = useState("");

    useEffect(() => {
        fetchLists().then(data => {
            setLists(data);
        });
    }, []);

    const handleDeleteList = async (listId: number) => {
        await deleteList(listId);
        setLists(prev => prev.filter(list => list.id !== listId));
    };


    const handleCreateList = async () => {
        try {
            const newList = await createList(newListName);
            setLists(prev => [...prev, newList]);
            setNewListName("");
            setCreatingList(false);
        } catch (e) {
            console.error("Failed to create list", e);
        }
    }




    return (
        <div className="space-y-6">

            {lists.map(list => (
                <TodoListCard
                    key={list.id}
                    todolist={list}
                    onDeleteList={handleDeleteList}
                />
            ))}

            {/* New List */}
            <div className="pt-4">
                {creatingList ? (
                    <input
                        autoFocus
                        className="bg-slate-800 border border-slate-700 rounded px-3 py-1 text-sm"
                        placeholder="New list name"
                        value={newListName}
                        onChange={e => setNewListName(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleCreateList()}
                        onBlur={() => setCreatingList(false)}
                    />
                ) : (
                    <button
                        onClick={() => setCreatingList(true)}
                        className="text-sm text-emerald-400 hover:underline"
                    >
                        + New List
                    </button>
                )}
            </div>

        </div>

    );

}
