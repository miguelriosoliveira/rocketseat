import Link from 'next/link';

import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.containerLogo}>
        <Link href="/">
          <img src="/logo.svg" alt="logo" />
        </Link>
      </div>
    </div>
  );
}
