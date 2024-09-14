import { Box, Container, useTheme } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        // display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
          display: 'flex',
        },
      }}
    >
      <Header />
      <Container
        maxWidth={'lg'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexGrow: 1,
          width: '100%',
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
