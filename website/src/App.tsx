import { Container } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { HashRouter } from 'react-router-dom';
import { Routing } from './Routing';
import { Attribution } from './shared/Attribution';
import { theme } from './theme';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <HashRouter>
          {/* <Header /> */}
          <Container maxWidth={'lg'}>
            <Routing />
            <Attribution />
          </Container>
        </HashRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
