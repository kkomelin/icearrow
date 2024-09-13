import { Box, Link, Typography, useTheme } from '@mui/material';

export const Header = () => {
  const name = import.meta.env.VITE_APP_NAME || '';

  const theme = useTheme();

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px'
      }}
    >
      <Link
        href="/"
        color="inherit"
        underline="none"
        sx={{
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            verticalAlign: 'middle',
            width: '70px',
            height: '70px',
            border: '5px solid ' + theme.palette.primary.main,
            borderRadius: '50%',
            padding: '10px',
            marginBottom: '10px',
          }}
          component="img"
          height="40"
          alt=""
          src="/logo.png"
        />
        <Typography variant="h1" color="primary" component="div">
          {name}
        </Typography>
      </Link>
    </Box>
  );
};
