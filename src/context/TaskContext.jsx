import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

const initialState = JSON.parse(localStorage.getItem('kanban-tasks')) || [];

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { ...action.payload, id: uuidv4(), createdAt: new Date().toISOString() }];
    case 'UPDATE_TASK':
      return state.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t);
    case 'DELETE_TASK':
      return state.filter(t => t.id !== action.payload);
    case 'MOVE_TASK':
      return state.map(t =>
        t.id === action.payload.id ? { ...t, status: action.payload.status } : t
      );
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });
  const updateTask = (task) => dispatch({ type: 'UPDATE_TASK', payload: task });
  const deleteTask = (id) => dispatch({ type: 'DELETE_TASK', payload: id });
  const moveTask = (id, status) => dispatch({ type: 'MOVE_TASK', payload: { id, status } });

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);