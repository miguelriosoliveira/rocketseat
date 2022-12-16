import styles from './styles.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src="/todo-logo.svg" alt="Logo do app" />
      <span className={styles.to}>to</span>
      <span className={styles.do}>do</span>
    </header>
  );
}
