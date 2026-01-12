import { useState } from "react";
import { MainLayout } from "./layout/MainLayout";
import { TaskTabs } from "./features/tasks/pages/TaskTabs";
import { DateView} from "./features/tasks/pages/DateView";
import { TodoPage } from "./features/todo/pages/TodoPage";

export default function App() {
  const [page, setPage] = useState<"home" | "todo" | "addtask">("home");
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <MainLayout page={page} setPage={setPage} selectedDate={selectedDate} onSelectDate={setSelectedDate}>
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Home & upcoming tasks
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Organize your daily, deadline-based, and scheduled work in one place.
        </p>
      </header>

      <section className="mt-6">
        {page === "home" && <DateView selectedDate={selectedDate} />}
        {page === "addtask" && <TaskTabs />}
        {page === "todo" && <TodoPage />}
      </section>
    </MainLayout>
  );
}
