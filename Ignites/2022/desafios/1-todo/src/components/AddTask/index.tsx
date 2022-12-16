import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './styles.module.css';

interface AddTaskProps {
  onCreate: (title: string) => void;
}

export function CreateTask({ onCreate }: AddTaskProps) {
  const [task, setTask] = useState('');
  const isEmpty = !task;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onCreate(task);
    setTask('');
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  return (
    <form className={styles.addTask} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={task}
        onChange={handleChange}
      />
      <button type="submit" disabled={isEmpty}>
        Criar <PlusCircle size={16} />
      </button>
    </form>
  );
}
