import { MainLayout } from "./layout/MainLayout";
import { TaskTabs } from "./features/tasks/components/TaskTabs";

export default function App() {
  return (
    <MainLayout>
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Today & upcoming tasks
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Organize your daily, deadline-based, and scheduled work in one place.
        </p>
      </header>

      <section className="mt-6">
        <TaskTabs />
      </section>
    </MainLayout>
  );
}
