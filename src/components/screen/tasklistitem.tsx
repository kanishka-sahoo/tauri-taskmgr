import { useState, useEffect } from "react";
import { Calendar, Tag } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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

interface TaskListItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [tagInput, setTagInput] = useState<string>('');

  useEffect(() => {
    if (isEditing) {
      setTagInput(task.labels.map(label => `#${label.name}`).join(' '));
    }
  }, [isEditing, task.labels]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(prev => ({ ...prev, isCompleted: e.target.checked }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const processTags = (input: string): Label[] => {
    const tags = input.split('#').filter(tag => tag.trim() !== '').map(tag => tag.trim());
    return tags.map((tag, index) => ({ id: Date.now() + index, name: tag }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTask = {
      ...editedTask,
      labels: processTags(tagInput)
    };
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200 dark:border-gray-700">
        <input
          name="name"
          value={editedTask.name}
          onChange={handleInputChange}
          className="p-2 mb-2 w-full rounded border dark:text-white dark:bg-gray-700"
          placeholder="Task name"
        />
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleInputChange}
          className="p-2 mb-2 w-full rounded border dark:text-white dark:bg-gray-700"
          placeholder="Task description"
        />
        <div className="flex items-center mb-2">
          <Tag className="mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            value={tagInput}
            onChange={handleTagInputChange}
            className="flex-grow p-2 rounded border dark:text-white dark:bg-gray-700"
            placeholder="Enter tags (e.g., #Work #HighPriority)"
          />
        </div>
        <div className="flex justify-between items-center">
          <input
            type="date"
            name="completionDate"
            value={editedTask.completionDate}
            onChange={handleInputChange}
            className="p-2 rounded border dark:text-white dark:bg-gray-700"
          />
          <div>
            <button type="submit" className="py-2 px-4 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">Save</button>
            <button type="button" onClick={handleCancel} className="py-2 px-4 text-gray-800 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div className="flex items-center p-4 border-b border-gray-200 transition-colors duration-200 ease-in-out dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
      <div className="flex items-center mr-4">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onUpdate({ ...task, isCompleted: !task.isCompleted })}
          className="my-auto mr-2 w-6 h-6"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
        <div className="flex flex-wrap mt-2">
          {task.labels.map((label) => (
            <span key={label.id} className="py-1 px-2 mr-2 mb-2 text-xs font-medium text-gray-800 bg-gray-200 rounded-full dark:text-gray-200 dark:bg-gray-700">
              {label.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-end ml-4">
        <div className="flex items-center mb-2">
          <Calendar className="mr-1 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{task.completionDate}</span>
        </div>
        <div className="flex items-center">
          <button onClick={() => setIsEditing(true)} className="mr-2 text-blue-500 hover:text-blue-600">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-600">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskListItem; 
