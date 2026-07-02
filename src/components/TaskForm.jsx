import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskForm({ onClose }) {
  const { addTask } = useTasks();
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    tags: '',
    deadline: '',
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    addTask({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      deadline: form.deadline,
      tags: form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Add New Task</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Title</label>
            <input
              autoFocus
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="e.g. Fix login bug"
              value={form.title}
              onChange={handleChange('title')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
            <textarea
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={3}
              placeholder="Optional details..."
              value={form.description}
              onChange={handleChange('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={form.status}
                onChange={handleChange('status')}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Priority</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={form.priority}
                onChange={handleChange('priority')}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Tags</label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                placeholder="bug, urgent"
                value={form.tags}
                onChange={handleChange('tags')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Deadline</label>
              <input
                type="date"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={form.deadline}
                onChange={handleChange('deadline')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}