import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { CreateTask, Header, TaskList } from './components';
import styles from './App.module.css';
import { Task } from './@types';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: uuidV4(),
      isDone: false,
      title: 'arrumar o quarto',
    },
    {
      id: uuidV4(),
      isDone: false,
      title: 'jogar lixo fora',
    },
    {
      id: uuidV4(),
      isDone: true,
      title: 'tomar banho',
    },
    {
      id: uuidV4(),
      isDone: true,
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ]);

  function createTask(title: string): Task {
    return {
      id: uuidV4(),
      isDone: false,
      title,
    };
  }

  function handleCreateTask(title: string) {
    setTasks([...tasks, createTask(title)]);
  }

  function handleCheckTask(id: string) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task,
    );
    setTasks(updatedTasks);
  }

  function handleDeleteTask(id: string) {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <CreateTask onCreate={handleCreateTask} />
        <TaskList tasks={tasks} onCheck={handleCheckTask} onDelete={handleDeleteTask} />
      </main>
    </>
  );
}
