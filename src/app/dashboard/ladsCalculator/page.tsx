'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

export default function Page(): React.JSX.Element {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Typography variant="h4">Lads Banner Cost Estimate</Typography>
      </Grid>
    </Box>
  );
}
