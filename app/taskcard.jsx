"use client";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./globals.css";

const TaskCard = ({ task, completed, onToggle, onDelete, onEdit, date, time }) => {
    return (
        <div className="mt-4 flex w-full items-center justify-between px-6 py-4 bg-gray-100 dark:text-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="mr-4 form-checkbox text-indigo-500 h-6 w-6"
                    checked={completed}
                    onChange={onToggle}
                    readOnly
                />
                <span className="font-semibold text-lg">{task}</span>
            </div>

            <div className="flex items-center">
                <span className="font-semibold opacity-70 mr-2 text-sm">{date}</span>
                <span className="font-semibold opacity-70 mr-4 text-sm">{time}</span>
                <div className="flex">
                    <span
                        className="mr-2 p-2 rounded-full hover:bg-gray-700 cursor-pointer text-blue-400"
                        onClick={onEdit}
                        role="button"
                        tabIndex="0"
                        aria-label="Edit task"
                    >
                        <FaEdit />
                    </span>
                    <span
                        className="p-2 rounded-full hover:bg-gray-700 cursor-pointer text-red-500"
                        onClick={onDelete}
                        role="button"
                        tabIndex="0"
                        aria-label="Delete task"
                    >
                        <FaTrash />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
