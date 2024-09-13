import { Container } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { HashRouter } from 'react-router-dom';
import { Routing } from './Routing';
import { Footer } from './shared/Footer';
import { Header } from './shared/Header';
import { theme } from './theme';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Header />
          <Container maxWidth={'lg'}>
            <Routing />
            <Footer />
          </Container>
        </HashRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
