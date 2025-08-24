import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingSpinner({ message = 'Loading...', size = 40 }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 4
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingSpinner;
