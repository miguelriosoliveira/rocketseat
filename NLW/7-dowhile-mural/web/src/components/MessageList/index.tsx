import { useEffect, useState } from 'react';
import SocketClient from 'socket.io-client';

import logo from '../../assets/logo.svg';
import { api } from '../../services';

import styles from './styles.module.scss';

interface User {
	name: string;
	login: string;
	avatar_url: string;
}

interface Message {
	id: string;
	text: string;
	user: User;
}

const API_URL = import.meta.env.VITE_API_URL;

const socketClient = SocketClient(API_URL);

const messagesQueue: Message[] = [];
socketClient.on('new-message', (message: Message) => {
	messagesQueue.push(message);
});

export function MessageList() {
	const [last3Messages, setLast3Messages] = useState<Message[]>([]);

	useEffect(() => {
		setInterval(() => {
			if (messagesQueue.length) {
				setLast3Messages(prevState =>
					[messagesQueue[0], prevState[0], prevState[1]].filter(Boolean),
				);
				messagesQueue.shift();
			}
		}, 3_000);
	}, []);

	useEffect(() => {
		api.get<Message[]>('/messages/last3').then(response => setLast3Messages(response.data));
	}, []);

	return (
		<div className={styles.messageListWrapper}>
			<img src={logo} alt="Logo do evento DoWhile 2021" />

			<ul className={styles.messageList}>
				{last3Messages.map(message => (
					<li key={message.id} className={styles.message}>
						<p className={styles.messageContent}>{message.text}</p>
						<div className={styles.messageUser}>
							<div className={styles.userImage}>
								<img
									src={message.user.avatar_url}
									alt={`Avatar do GitHub de ${message.user.name}`}
								/>
							</div>
							<span>{message.user.name}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
