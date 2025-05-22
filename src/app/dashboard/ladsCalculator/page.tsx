'use client';

import * as React from 'react';
import useSWR from 'swr';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { fetcher } from '@/utils/SWR.utils';
import LoadingBar from '@/components/LoadingBar/page';
import { ladsBannerTypes } from '@/app/dashboard/ladsCalculator/lads.constants';

export default function Page(): React.JSX.Element {
  const currentDate: Date = new Date(Date.now());
  const [selectedBannerType, setBannerType] = React.useState('multi');
  const [diamondNumber, setDiamondNumber] = React.useState(0);
  const [purpleDiamondNumber, setPurpleDiamondNumber] = React.useState(0);
  const [deepspaceWishNumber, setDeepspaceWishNumber] = React.useState(0);
  const [pityNumber, setPityNumber] = React.useState(0);

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

  const handleBannerTypeChange = (event: SelectChangeEvent) => {
    setBannerType(event.target.value);
  };

  const handleDiamondNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    const diamondNumber = parseInt(event.target.value);
    setDiamondNumber(diamondNumber);
  };

  const handlePurpleDiamondNumber = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const purpleDiamondNumber = parseInt(event.target.value);
    setPurpleDiamondNumber(purpleDiamondNumber);
  };

  const handleDeepspaceWishNumber = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const deepspaceWishNumber = parseInt(event.target.value);
    setDeepspaceWishNumber(deepspaceWishNumber);
  };

  const handlePityNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    const pityNumber = parseInt(event.target.value);
    setPityNumber(pityNumber);
  };

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
          <Typography variant="h4">Lads Banner Cost Estimate</Typography>
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
          <Stack
            direction="column"
            spacing={2}
            useFlexGap
            sx={{ flexWrap: 'wrap' }}
          >
            <FormControl fullWidth>
              <InputLabel id="banner-type-select-label" sx={{ mt: '0.6rem' }}>
                Select The Type Of Banner
              </InputLabel>
              <Select
                labelId="banner-type-select-label"
                value={selectedBannerType}
                onChange={handleBannerTypeChange}
                sx={{ width: '350px' }}
              >
                {ladsBannerTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Enter number of diamonds"
              type="number"
              variant="outlined"
              sx={{ width: '350px' }}
              onBlur={handleDiamondNumber}
            />
            <TextField
              label="Enter number of purple diamonds"
              type="number"
              variant="outlined"
              sx={{ width: '350px' }}
              onBlur={handlePurpleDiamondNumber}
            />
            <TextField
              label="Enter number of deepspace wish"
              type="number"
              variant="outlined"
              sx={{ width: '350px' }}
              onBlur={handleDeepspaceWishNumber}
            />
            <TextField
              label="Enter number of pity"
              type="number"
              variant="outlined"
              sx={{ width: '350px' }}
              onBlur={handlePityNumber}
            />
            <Button variant="contained" color="success">
              Calculate
            </Button>
            <Typography variant="h5">$0</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
