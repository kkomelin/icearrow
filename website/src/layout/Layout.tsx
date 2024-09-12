import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '20px',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
