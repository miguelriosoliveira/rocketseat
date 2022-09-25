import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function LoginBox() {
	const { isLogging, signIn } = useAuth();

	return (
		<View style={styles.container}>
			<Button
				title="ENTRAR COM GITHUB"
				color={COLORS.BLACK_PRIMARY}
				backgroundColor={COLORS.YELLOW}
				icon="github"
				onPress={signIn}
				isLoading={isLogging}
			/>
		</View>
	);
}
