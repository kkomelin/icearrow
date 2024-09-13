import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { HashRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import { Routing } from './Routing';
import { theme } from './theme';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Layout>
            <Routing />
          </Layout>
        </HashRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
