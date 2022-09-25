import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AuthProvider } from './src/hooks';
import { Home } from './src/screens';

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<AuthProvider>
			{/* eslint-disable-next-line react/style-prop-object */}
			<StatusBar style="light" translucent backgroundColor="transparent" />
			<Home />
		</AuthProvider>
	);
}
