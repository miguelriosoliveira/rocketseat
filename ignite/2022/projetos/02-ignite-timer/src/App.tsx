import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles';
import { defaultTheme } from './styles/themes';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      hello world
      <GlobalStyles />
    </ThemeProvider>
  );
}
