"use client";

import { Task } from "@/types/task";

interface Props {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
}

const handleGenerateText = (task: Task) => {
    // Placeholder for AI content generation logic
    console.log(`Generating content for task: ${task.header}`);
}

export default function TaskCard({ task, onEdit, onDelete }: Props) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl hover:border-sky-600 transition">
            <h3 className="text-lg font-semibold">{task.header}</h3>
            <p className="text-zinc-400 mt-2">{task.body}</p>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={onEdit}
                    className="px-3 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                >
                    Modify
                </button>

                <button
                    onClick={onDelete}
                    className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700"
                >
                    Delete
                </button>

                <button
                    onClick={() => handleGenerateText(task)}
                    className="px-3 py-1 bg-zinc-800 rounded-lg hover:bg-zinc-700"
                >
                    Generate Content for X and LinkedIn by AI
                </button>
            </div>
        </div>
    );
}