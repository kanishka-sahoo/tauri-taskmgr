import TaskView from "./screen/taskview";

export default function MainScreen({ title, taskNumber }: { title: string, taskNumber: number }) {
  return (
    <div className="container flex overflow-scroll overflow-x-hidden flex-col mx-auto w-full max-h-screen">
      <h1 className="pl-2 mt-1 w-full text-5xl text-black dark:text-white">{title}</h1>
      {taskNumber == 0 && <TaskView />}
    </div>
  );
}
