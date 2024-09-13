import { Box, Link, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {
  const name = import.meta.env.VITE_APP_NAME || '';

  const theme = useTheme();

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
        marginBottom: '50px',
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
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
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
