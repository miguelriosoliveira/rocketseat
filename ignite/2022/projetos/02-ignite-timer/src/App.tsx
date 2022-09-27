import { ThemeProvider } from 'styled-components';

import { Router } from './Router';
import { GlobalStyles } from './styles';
import { defaultTheme } from './styles/themes';

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Router />
			<GlobalStyles />
		</ThemeProvider>
	);
}
