import Header from './components/header/Header';
import MainPage from './pages/MainPage';
import { theme } from './theme/theme';
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';

function App() {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline enableColorScheme />
      <Header />
      <MainPage />
    </CssVarsProvider>
  );
}

export default App;
