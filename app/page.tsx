"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import CreateEditModal from "@/components/CreateEditModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;

    return (
      task.header.toLowerCase().includes(query) ||
      task.body.toLowerCase().includes(query)
    );
  });

  const handleSave = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      if (exists) {
        return prev.map((t) => (t.id === task.id ? task : t));
      }
      return [...prev, task];
    });
  };

  const handleDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Task History</h1>

          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="bg-sky-700 px-4 py-2 rounded-lg hover:bg-sky-800"
          >
            Create New Content
          </button>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDelete={() => setDeleteId(task.id)}
            />
          ))}
        </div>
      </div>

      <CreateEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        existingTask={editingTask}
      />

      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
