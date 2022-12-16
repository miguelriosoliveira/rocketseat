import { CheckCircle, Circle, ClipboardText, Trash } from 'phosphor-react';
import { Task } from '../../@types';
import styles from './styles.module.css';

interface TaskListProps {
  tasks: Task[];
  onCheck: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskList({ tasks, onCheck, onDelete }: TaskListProps) {
  const totalCount = tasks.length;
  const finishedCount = tasks.reduce((count, task) => count + Number(task.isDone), 0);

  function handleCheckTask(taskId: string) {
    return () => onCheck(taskId);
  }

  function handleDeleteTask(taskId: string) {
    return () => onDelete(taskId);
  }

  return (
    <>
      <header className={styles.taskListHeader}>
        <span className={styles.createdTasksLabel}>
          Tarefas criadas
          <span className={styles.badge}>{totalCount}</span>
        </span>

        <span className={styles.finishedTasksLabel}>
          Concluídas
          <span className={styles.badge}>
            {finishedCount} de {totalCount}
          </span>
        </span>
      </header>

      <main className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className={`${styles.task} ${task.isDone ? styles.checked : ''}`}>
              <div className={styles.taskContent} onClick={handleCheckTask(task.id)}>
                {task.isDone ? (
                  <CheckCircle
                    className={`${styles.checkbox} ${styles.checkedCheckbox}`}
                    size={18}
                    color="#5e60ce"
                    weight="fill"
                  />
                ) : (
                  <Circle
                    className={`${styles.checkbox} ${styles.unCheckedCheckbox}`}
                    size={18}
                    color="#4ea8de"
                  />
                )}

                <p>{task.title}</p>
              </div>

              <button className={styles.deleteButton} onClick={handleDeleteTask(task.id)}>
                <Trash size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className={styles.emptyMessage}>
            <ClipboardText size={56} color="#333333" weight="light" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
      </main>
    </>
  );
}
