import { ChakraProvider } from '@chakra-ui/react';

import { Header } from '../components';
import { theme } from '../styles/theme';

import 'swiper/swiper-bundle.min.css';

export default function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Header />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
