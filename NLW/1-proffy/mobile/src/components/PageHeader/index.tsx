import React, { useEffect, useCallback } from 'react';
import { View, Image, Text, BackHandler } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';

interface Props {
	title: string;
}

const PageHeader: React.FC<Props> = ({ title }) => {
	const navigator = useNavigation();

	const navigateTo = useCallback(
		(pageName: string) => () => {
			navigator.navigate(pageName);
			return true;
		},
		[navigator],
	);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', navigateTo('Landing'));
		return () => backHandler.remove();
	}, [navigateTo]);

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<BorderlessButton onPress={navigateTo('Landing')}>
					<Image source={backIcon} resizeMode="contain" />
				</BorderlessButton>

				<Image source={logoImg} resizeMode="contain" />
			</View>

			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

export default PageHeader;
