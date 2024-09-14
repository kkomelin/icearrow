import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {
  const name = import.meta.env.VITE_APP_NAME || '';

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '30px',
        paddingBottom: '30px',
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
          gap: '0.5rem',
          '& img': {
            animation: 'rotateAnimation 2s infinite linear',
            animationDelay: '1s',
          },
        }}
      >
        <Box
          sx={{
            verticalAlign: 'middle',
            width: '50px',
            height: '50px',
          }}
          component="img"
          alt="IceArrow Logo"
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
