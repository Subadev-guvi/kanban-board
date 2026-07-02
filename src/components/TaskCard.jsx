import { useDraggable } from '@dnd-kit/core';
import { useTasks } from '../context/TaskContext';

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
};

export default function TaskCard({ task, onClick }) {
  const { deleteTask } = useTasks();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 50 : 'auto',
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="bg-white rounded-lg shadow p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border border-slate-100"
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-medium text-slate-800 text-sm leading-snug">{task.title}</h3>
        <button
          onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
          className="text-slate-300 hover:text-red-500 text-sm shrink-0"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-2">
        {task.priority && (
          <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority}
          </span>
        )}
        {task.tags?.map(tag => (
          <span key={tag} className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {task.deadline && (
        <p className="text-[11px] text-slate-400 mt-2">📅 {task.deadline}</p>
      )}
    </div>
  );
}