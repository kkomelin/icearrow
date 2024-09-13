import { Box, Link, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {
  const name = import.meta.env.VITE_APP_NAME || '';
  const description = import.meta.env.VITE_APP_DESCRIPTION || '';

  const theme = useTheme();

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
        marginBottom: '50px',
        gap: '1rem',
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        color="inherit"
        underline="none"
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.8rem',
          '&:hover img': {
            animation: 'rotateAnimation 2s infinite linear',
          },
        }}
      >
        <Box
          sx={{
            verticalAlign: 'middle',
            width: '30px',
            height: '30px',
            border: '2px solid ' + theme.palette.primary.main,
            borderRadius: '50%',
            padding: '5px',
          }}
          component="img"
          alt="Ice Arrow Logo"
          src="/logo.png"
        />

        <Typography
          variant="h1"
          color="primary"
          component="div"
          sx={{
            fontSize: '2rem',
            fontWeight: 400,
          }}
        >
          {name}
        </Typography>
      </Link>
    </Box>
  );
};
