import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import { Header, LoginBox, MessageList, SendMessageForm } from '../../components';
import { useAuth } from '../../hooks';

import { styles } from './styles';

export function Home() {
	const { user } = useAuth();

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={{ flex: 1 }}
		>
			<View style={styles.container}>
				<Header />
				<MessageList />
				{user ? <SendMessageForm /> : <LoginBox />}
			</View>
		</KeyboardAvoidingView>
	);
}
