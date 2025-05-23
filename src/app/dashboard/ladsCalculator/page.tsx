'use client';

import * as React from 'react';
import useSWR from 'swr';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';

import { fetcher } from '@/utils/SWR.utils';
import LoadingBar from '@/components/LoadingBar/page';
import { a11yProps } from './lads.helpers';
import BannerEstimateComponent from './bannerEstimateComponent';
import LadsTabPanelComponent from './ladsTabComponent';
import PullsEstimateComponent from './pullsEstimateComponent';

export default function Page(): React.JSX.Element {
  const currentDate: Date = new Date(Date.now());
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const ladsSpentAmount = ladsData ? ladsData[0].total.toFixed(2) : 0;

  return (
    <Box sx={{ flexGrow: 1, width: 'auto', overflow: 'auto' }}>
      <Grid container columns={12} justifyContent="center" alignItems="center">
        <Grid
          size={12}
          sx={{
            mt: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">
            Total Spent in {currentDate.getFullYear()}: ${ladsSpentAmount}
          </Typography>
        </Grid>
        <Grid
          size={12}
          sx={{
            mt: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="love and deepspace tabs"
                sx={{ width: '800px' }}
              >
                <Tab label="Banner Cost" {...a11yProps(0)} />
                <Tab label="Pull Cost" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <LadsTabPanelComponent value={value} index={0}>
              <BannerEstimateComponent />
            </LadsTabPanelComponent>
            <LadsTabPanelComponent value={value} index={1}>
              <PullsEstimateComponent />
            </LadsTabPanelComponent>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
