import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskModal({ task, onClose }) {
  const { updateTask, deleteTask } = useTasks();
  const [draft, setDraft] = useState({
    ...task,
    tags: task.tags?.join(', ') || '',
  });

  const handleChange = (field) => (e) => setDraft({ ...draft, [field]: e.target.value });

  const handleSave = () => {
    updateTask({
      ...draft,
      tags: draft.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    onClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Task Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Title</label>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={draft.title}
              onChange={handleChange('title')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
            <textarea
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={3}
              value={draft.description}
              onChange={handleChange('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={draft.status}
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
                value={draft.priority}
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
                value={draft.tags}
                onChange={handleChange('tags')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Deadline</label>
              <input
                type="date"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                value={draft.deadline || ''}
                onChange={handleChange('deadline')}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleDelete}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Delete Task
            </button>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}