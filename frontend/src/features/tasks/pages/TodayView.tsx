// src/features/tasks/pages/TodayView.tsx
import { useEffect, useState } from "react";
import { fetchTasks } from "../api/taskApi";
import type { Task } from "../types";
import { TaskCard } from "../components/cards/TaskCard";
import { DailyTaskCard } from "../components/cards/DailyTaskCard";

function isToday(dateStr?: string | null) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const today = new Date();

    return (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
    );
}

export function TodayView() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks().then(setTasks);
    }, []);

    const dailyTasks = tasks.filter(t => t.type === "DAILY");

    const timeline = tasks
        .filter(t => {
            if (t.type === "DEADLINE") return isToday(t.deadline?.deadline_at);
            if (t.type === "SCHEDULED") return isToday(t.scheduled?.scheduled_start);
            return false;
        })
        .sort((a, b) => {
            const ta =
                a.type === "DEADLINE"
                    ? new Date(a.deadline!.deadline_at!).getTime()
                    : new Date(a.scheduled!.scheduled_start!).getTime();

            const tb =
                b.type === "DEADLINE"
                    ? new Date(b.deadline!.deadline_at!).getTime()
                    : new Date(b.scheduled!.scheduled_start!).getTime();

            return ta - tb;
        });

    return (
        <div className="space-y-8">

            {/* TIMELINE */}
            <section>
                <h3 className="font-semibold mb-3">Today's Timeline</h3>
                {timeline.length === 0 ? "No tasks scheduled for today." :
                    (<div className="space-y-2">
                        {timeline.map(task => {
                            const time =
                                task.type === "DEADLINE"
                                    ? new Date(task.deadline!.deadline_at!).toLocaleTimeString()
                                    : new Date(task.scheduled!.scheduled_start!).toLocaleTimeString();

                            return (
                                <div key={task.id} className="flex gap-4 items-start">
                                    <span className="w-20 text-sm text-slate-500 pt-3">{time}</span>
                                    <TaskCard task={task} />
                                </div>
                            );
                        })}

                    </div>)}
            </section>

            {/* DAILY TASKS */}
            <section>
                <h3 className="font-semibold mb-3">Daily Tasks</h3>
                <div className="space-y-3">
                    {dailyTasks.map(t => (
                        <DailyTaskCard
                            key={t.id}
                            task={t}
                            onEdit={() => { }}
                            onDelete={() => { }}
                        />
                    ))}
                </div>
            </section>



        </div>
    );
}

