import { TaskProvider } from './context/TaskContext';
import Board from './components/Board';

function App() {
  return (
    <TaskProvider>
      <Board />
    </TaskProvider>
  );
}

export default App;