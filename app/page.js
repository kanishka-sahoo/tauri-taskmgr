"use client";

import React, { useState, useEffect, useRef } from "react";
import TaskCard from "./taskcard";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [dateValue, setDateValue] = useState(null);
    const [timeValue, setTimeValue] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        if (editingTaskId !== null && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingTaskId]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleDateChange = (event) => {
        setDateValue(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTimeValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) {
            return;
        }
        let updatedTasks;
        if (editingTaskId !== null) {
            updatedTasks = tasks.map((task) =>
                task.id === editingTaskId ? { ...task, task: inputValue, date: dateValue, time: timeValue } : task
            );
            setEditingTaskId(null);
        } else {
            const newTask = {
                id: new Date().getTime(),
                task: inputValue,
                completed: false,
                date: dateValue,
                time: timeValue
            };
            updatedTasks = [...tasks, newTask];
        }
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setInputValue("");
        setDateValue("");
        setTimeValue("");
    };

    const handleToggle = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleEdit = (id, taskname, date, time) => {
        setEditingTaskId(id);
        setInputValue(taskname);
        setDateValue(date);
        setTimeValue(time);
    };
    const sortedTasks = tasks.sort((a, b) => {
        if (a.date === b.date) {
            return a.time.localeCompare(b.time);
        } else {
            return a.date.localeCompare(b.date);
        }
    });
    return (
        <main className="flex flex-col flex-1 min-h-screen dark:bg-gray-900 dark:text-white">
            <div className="flex flex-col items-center flex-1 p-4 w-full lg:max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-6xl font-bold pt-16">Task Planner</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex text-white font-bold rounded mt-8 w-full flex-col md:flex-row"
                >
                    <input
                        type="text"
                        className="border border-blue-500 text-black font-bold py-4 px-4 rounded mt-4 w-full md:w-1/3 md:mr-2"
                        placeholder="Enter task"
                        value={inputValue}
                        onChange={handleInputChange}
                        ref={inputRef}
                        autoFocus
                    />
                    <input
                        type="date"
                        className="border border-blue-500 text-black font-bold py-4 px-4 rounded mt-4 w-full md:w-1/3 md:ml-2 md:mr-2 max-h-16"
                        value={dateValue}
                        onChange={handleDateChange}
                    />
                    <input
                        type="time"
                        className="border border-blue-500 text-black font-bold py-4 px-4 rounded mt-4 w-full md:w-1/3 md:ml-2 md:mr-2 max-h-16"
                        value={timeValue}
                        onChange={handleTimeChange}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 border border-blue-500 text-white font-bold py-4 px-4 rounded mt-4 w-full md:w-1/3 md:ml-2 max-h-16"
                    >
                        {editingTaskId !== null ? "Update Task" : "Add Task"}
                    </button>
                </form>
                {sortedTasks.map((task, index) => (
                    <TaskCard
                        key={index}
                        id={index}
                        task={task.task}
                        date={task.date}
                        time={task.time}
                        completed={task.completed}
                        onToggle={() => handleToggle(task.id)}
                        onDelete={() => handleDelete(task.id)}
                        onEdit={() => handleEdit(task.id, task.task, task.date, task.time)}
                    />
                ))}
            </div>
        </main>
    );
}
