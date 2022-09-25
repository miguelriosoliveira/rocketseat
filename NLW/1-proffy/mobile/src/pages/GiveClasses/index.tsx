import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import giveClassesBgImg from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClasses: React.FC = () => {
	const navigator = useNavigation();

	return (
		<View style={styles.container}>
			<ImageBackground resizeMode="contain" source={giveClassesBgImg} style={styles.content}>
				<Text style={styles.title}>Quer ser um Proffy?</Text>
				<Text style={styles.description}>
					Pra começar, você precisa se cadastrar na nossa plataforma web.
				</Text>
			</ImageBackground>

			<RectButton onPress={navigator.goBack} style={styles.okButton}>
				<Text style={styles.okButtonText}>Tudo bem</Text>
			</RectButton>
		</View>
	);
};

export default GiveClasses;
