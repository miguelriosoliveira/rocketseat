import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';

import { api } from '../../services/api';
import { MessageProps, Message } from '../Message';

import { styles } from './styles';

const messagesQueue: MessageProps[] = [];

const socketClient = io(String(api.defaults.baseURL));
socketClient.on('new-message', (message: MessageProps) => {
	messagesQueue.push(message);
});

export function MessageList() {
	const [last3Messages, setLast3Messages] = useState<MessageProps[]>([]);

	useEffect(() => {
		api.get<MessageProps[]>('/messages/last3').then(response => setLast3Messages(response.data));
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (messagesQueue.length) {
				setLast3Messages(prevState =>
					[messagesQueue[0], prevState[0], prevState[1]].filter(Boolean),
				);
				messagesQueue.shift();
			}
		}, 3 * 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<ScrollView
			keyboardShouldPersistTaps="never"
			style={styles.container}
			contentContainerStyle={styles.content}
		>
			{last3Messages.map(message => (
				<Message key={message.id} {...message} />
			))}
		</ScrollView>
	);
}
