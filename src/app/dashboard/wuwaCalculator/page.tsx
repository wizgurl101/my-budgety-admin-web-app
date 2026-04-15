'use client';

import * as React from 'react';
import useSWR from 'swr';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';

import { fetcher } from '@/utils/SWR.utils';
import LoadingBar from '@/components/LoadingBar/page';
import { a11yProps } from './wuwa.helpers';
import BannerEstimateComponent from './bannerEstimateComponent';
import WuwaTabPanelComponent from './wuwaTabComponent';
import PullsEstimateComponent from './pullsEstimateComponent';

export default function Page(): React.JSX.Element {
  const currentDate: Date = new Date(Date.now());
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const WuwaSpentAmount = 0;

  return (
    <Box sx={{ flexGrow: 1, width: 'auto', overflow: 'auto' }}>
      <Grid container columns={12} justifycontent="center" alignitems="center">
        <Grid
          size={12}
          sx={{
            mt: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '800px',
              height: '400px',
              backgroundImage: "url('/images/wuthering-wave-estimate-bg.jpg')",
              backgroundSize: 'cover',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '1rem',
                fontWeight: 'bold',
              }}
            >
              Total Spent on Wuthering Wave in {currentDate.getFullYear()}: $
              {WuwaSpentAmount}
            </Typography>
          </Box>
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
                aria-label="wuthering wave tabs"
                sx={{ width: '800px' }}
              >
                <Tab label="Banner Cost" {...a11yProps(0)} />
                <Tab label="Pull Cost" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <WuwaTabPanelComponent value={value} index={0}>
              <BannerEstimateComponent />
            </WuwaTabPanelComponent>
            <WuwaTabPanelComponent value={value} index={1}>
              <PullsEstimateComponent />
            </WuwaTabPanelComponent>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
