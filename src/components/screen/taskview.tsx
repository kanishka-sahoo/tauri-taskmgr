import { useState, useMemo, useEffect } from 'react';
import AddNewButton from './addnewicon';
import TaskListItem from './tasklistitem';
import { X, PlusCircle } from 'lucide-react';

interface Label {
  id: number;
  name: string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  labels: Label[];
  completionDate: string;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = 'taskViewData';

const getInitialState = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData) {
    const { tasks, selectedLabels } = JSON.parse(storedData);
    return { tasks, selectedLabels };
  }
  return {
    tasks: [],
    selectedLabels: []
  };
};

export default function TaskView() {
  const [tasks, setTasks] = useState<Task[]>(getInitialState().tasks);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(getInitialState().selectedLabels);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ tasks, selectedLabels }));
  }, [tasks, selectedLabels]);

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleAddNewClick = () => {
    addTask();
  }

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      name: "Edit This Task",
      description: "Click the Edit icon to begin editing",
      labels: [{ id: 0, name: "New Task" }],
      completionDate: new Date().toISOString().split('T')[0],
      isCompleted: false
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const allLabels = useMemo(() => {
    const labelSet = new Set<string>();
    tasks.forEach(task => {
      task.labels.forEach(label => labelSet.add(label.name));
    });
    return Array.from(labelSet);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (selectedLabels.length === 0) return tasks;
    return tasks.filter(task =>
      task.labels.some(label => selectedLabels.includes(label.name))
    );
  }, [tasks, selectedLabels]);

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="relative flex-1 mx-2 mt-2 w-full h-full text-black dark:text-white">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {allLabels.map(label => (
          <button
            key={label}
            onClick={() => toggleLabel(label)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1
              ${selectedLabels.includes(label)
                ? 'bg-red-500 text-white'
                : 'text-gray-800 bg-gray-200 dark:text-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
          >
            {label}
            {selectedLabels.includes(label) && (
              <X size={14} className="ml-1" />
            )}
          </button>
        ))}
      </div>
      <div className="pr-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskListItem
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="mb-4 text-xl">No tasks found. Time to be productive!</p>
            <button
              onClick={handleAddNewClick}
              className="inline-flex items-center py-2 px-4 text-white bg-blue-500 rounded-md transition-colors hover:bg-blue-600"
            >
              <PlusCircle size={20} className="mr-2" />
              Create Your First Task
            </button>
          </div>
        )}
      </div>
      <AddNewButton onClick={handleAddNewClick} />
    </div>
  );
}
