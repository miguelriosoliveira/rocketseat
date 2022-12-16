import { signIn, signOut, useSession } from 'next-auth/client';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
	const [session] = useSession();

	function handleSignIn() {
		signIn('github');
	}

	function handleSignOut() {
		signOut();
	}

	if (session) {
		return (
			<button type="button" className={styles.signInButton} onClick={handleSignOut}>
				<FaGithub color="#04d361" />
				{session.user.name}
				<FiX color="#737380" className={styles.closeIcon} />
			</button>
		);
	}

	return (
		<button type="button" className={styles.signInButton} onClick={handleSignIn}>
			<FaGithub color="#eba417" />
			Sign in with GitHub
		</button>
	);
}
