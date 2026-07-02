import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const COLUMN_STYLES = {
  todo: 'border-t-4 border-slate-400',
  inprogress: 'border-t-4 border-amber-400',
  done: 'border-t-4 border-emerald-400',
};

export default function Column({ column, tasks, onCardClick }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[280px] rounded-xl shadow-sm ${COLUMN_STYLES[column.id]} flex flex-col transition-colors ${
        isOver ? 'bg-indigo-50' : 'bg-slate-50'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <h2 className="font-semibold text-slate-700">{column.title}</h2>
        <span className="text-xs font-medium bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>
      <div className="flex-1 p-3 space-y-3 min-h-[200px] overflow-y-auto">
        {tasks.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-6">No tasks yet</p>
        )}
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={() => onCardClick(task)} />
        ))}
      </div>
    </div>
  );
}