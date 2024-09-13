import { Box, Container } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
          mt: 4,
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
