import { Box, Link, Typography } from '@mui/material';

export const Header = () => {
  const name = import.meta.env.VITE_APP_NAME || '';
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href="/" color="inherit" underline="none">
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Box
          sx={{
            verticalAlign: 'middle',
            width: '80px',
            height: '80px',
          }}
          component="img"
          height="40"
          alt=""
          src="/logo.webp"
        />
      </Link>
    </Box>
  );
};
