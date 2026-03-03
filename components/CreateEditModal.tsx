"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  existingTask?: Task | null;
}

export default function CreateEditModal({
  isOpen,
  onClose,
  onSave,
  existingTask,
}: Props) {
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (existingTask) {
      setHeader(existingTask.header);
      setBody(existingTask.body);
    } else {
      setHeader("");
      setBody("");
    }
  }, [isOpen, existingTask]);

  if (!isOpen) return null;

  const handleSave = () => {
    const newTask: Task = {
      id: existingTask?.id || crypto.randomUUID(),
      header,
      body,
      createdAt: new Date().toISOString(),
    };

    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 w-[500px] rounded-xl p-6 shadow-xl border border-zinc-800">
        <h2 className="text-lg font-semibold mb-4">
          {existingTask ? "Edit Content" : "Create New Content"}
        </h2>

        <input
          className="w-full bg-zinc-800 px-4 py-2 rounded-lg mb-4"
          placeholder="Header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />

        <textarea
          className="w-full bg-zinc-800 px-4 py-2 rounded-lg h-32"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
