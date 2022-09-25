import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import styles from './App.module.scss';
import { LoginBox, MessageList, SendMessageForm } from './components';
import { useAuth } from './hooks';

export function App() {
	const { user } = useAuth();

	return (
		<>
			<main className={`${styles.contentWrapper} ${user ? styles.contentSigned : ''}`}>
				<MessageList />
				{user ? <SendMessageForm /> : <LoginBox />}
			</main>
			<ToastContainer />
		</>
	);
}
