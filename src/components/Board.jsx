import { useState } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useTasks } from '../context/TaskContext';
import Column from './Column';
import TaskModal from './TaskModal';
import TaskForm from './TaskForm';

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function Board() {
  const { tasks, moveTask } = useTasks();
  const [activeTask, setActiveTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Prevents accidental drags from a simple click
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;
    const task = tasks.find(t => t.id === taskId);

    if (task && task.status !== newStatus) {
      moveTask(taskId, newStatus);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">📋 Kanban Board</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
          >
            + Add Task
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="flex flex-col md:flex-row gap-4">
            {COLUMNS.map(col => (
              <Column
                key={col.id}
                column={col}
                tasks={tasks.filter(t => t.status === col.id)}
                onCardClick={setActiveTask}
              />
            ))}
          </div>
        </DndContext>
      </div>

      {activeTask && (
        <TaskModal task={activeTask} onClose={() => setActiveTask(null)} />
      )}
      {showForm && (
        <TaskForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}