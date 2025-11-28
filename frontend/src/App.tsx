import { MainLayout } from "./layout/MainLayout";
import { TaskTabs } from "./features/tasks/components/TaskTabs";

export default function App() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <TaskTabs />
      </div>
    </MainLayout>
  );
}

