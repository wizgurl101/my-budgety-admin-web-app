'use client';

import * as React from 'react';
import useSWR from 'swr';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { fetcher } from '@/utils/SWR.utils';
import LoadingBar from '@/components/LoadingBar/page';

export default function Page(): React.JSX.Element {
  const currentDate: Date = new Date(Date.now());

  const ladsSpendURL =
    `http://${process.env.NEXT_PUBLIC_HOST}` +
    `/gamesSpentAmount/ladsYearAmount?userId=${process.env.NEXT_PUBLIC_USER_ID}` +
    `&year=${currentDate.getFullYear()}`;

  const { data: ladsData, error, isLoading } = useSWR(ladsSpendURL, fetcher);

  if (error) {
    return <Typography variant="h4">Error Loading Data</Typography>;
  }

  if (isLoading) {
    return <LoadingBar />;
  }

  const ladsSpentAmount = ladsData[0].total;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Typography variant="h4">Lads Banner Cost Estimate</Typography>
        <Typography variant="h4">
          Total Spent in {currentDate.getFullYear()}: ${ladsSpentAmount}
        </Typography>
      </Grid>
    </Box>
  );
}
