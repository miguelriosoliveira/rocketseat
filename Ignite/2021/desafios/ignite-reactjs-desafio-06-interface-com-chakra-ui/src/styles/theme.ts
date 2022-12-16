import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	colors: {
		highlight: '#FFBA08',
		dark: {
			black: '#000000',
			headingsAndText: '#47585B',
			info: '#999999',
		},
		light: {
			white: '#FFFFFF',
			headingsAndText: '#F5F8FA',
			info: '#DADADA',
		},
	},
	fonts: {
		heading: 'Poppins',
		body: 'Poppins',
	},
	styles: {
		global: {
			body: {
				bg: 'light.headingsAndText',
				color: 'dark.headingsAndText',
			},
			'.swiper-container': {
				h: '100%',

				'.swiper-button-prev': {
					color: 'highlight',
				},

				'.swiper-button-next': {
					color: 'highlight',
				},

				'.swiper-pagination-bullet': {
					bg: 'dark.info',
					opacity: 1,
				},

				'.swiper-pagination-bullet-active': {
					bg: 'highlight',
				},
			},
		},
	},
});
