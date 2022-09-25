import { AppProps } from 'next/app';
import React from 'react';

import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerProvider } from '../hooks/usePlayer';
import styles from '../styles/app.module.scss';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<PlayerProvider>
			<div className={styles.appContainer}>
				<main>
					<Header />
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<Component {...pageProps} />
				</main>
				<Player />
			</div>
		</PlayerProvider>
	);
}

export default MyApp;
