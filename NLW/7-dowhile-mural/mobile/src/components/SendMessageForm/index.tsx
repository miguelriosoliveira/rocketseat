import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';

import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
	const [message, setMessage] = useState('');
	const [isSendingMessage, setIsSendingMessage] = useState(false);

	async function handleSubmit() {
		const messageTrimmed = message.trim();
		if (messageTrimmed.length) {
			setIsSendingMessage(true);
			await api.post('/messages', { message: messageTrimmed });
			setMessage('');
			Keyboard.dismiss();
			setIsSendingMessage(false);
			Alert.alert('Mensagem enviada com sucesso!');
		} else {
			Alert.alert('Escreva a mensagem para enviar.');
		}
	}

	return (
		<View style={styles.container}>
			<TextInput
				keyboardAppearance="dark"
				placeholder="Qual sua expectativa para o evento?"
				placeholderTextColor={COLORS.GRAY_PRIMARY}
				multiline
				maxLength={140}
				editable={!isSendingMessage}
				value={message}
				onChangeText={setMessage}
				style={styles.input}
			/>
			<Button
				title="ENVIAR MENSAGEM"
				color={COLORS.WHITE}
				backgroundColor={COLORS.PINK}
				isLoading={isSendingMessage}
				onPress={handleSubmit}
			/>
		</View>
	);
}
