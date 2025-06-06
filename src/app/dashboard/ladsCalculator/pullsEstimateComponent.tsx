import * as React from 'react';
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
import Image from 'next/image';

import { ladsBannerTypes } from '@/app/dashboard/ladsCalculator/lads.constants';
import { calculatePullCost } from './lads.helpers';

export default function PullsEstimateComponent(): React.JSX.Element {
  const [selectedBannerType, setBannerType] = React.useState('multi');
  const [pullNumber, setPullNumber] = React.useState(0);
  const [pullCost, setPullCost] = React.useState(0);
  const [showImage, setShowImage] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

  const handleBannerTypeChange = (event: SelectChangeEvent) => {
    setBannerType(event.target.value);
  };

  const handlePullNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    const pullNumber = parseInt(event.target.value);
    setPullNumber(pullNumber);
  };

  const handlePullCostCalculation = () => {
    const cost = calculatePullCost(selectedBannerType, pullNumber);
    let imageUrl = '';

    if (cost < 50) {
      imageUrl = '/images/terriermon-banner-go-for-it.jpg';
    } else {
      imageUrl = '/images/terriermon-banner-judging-you.jpg';
    }

    setPullCost(cost);
    setImageUrl(imageUrl);
    setShowImage(true);
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
          <Typography variant="h4">Pulls Cost Estimate</Typography>
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
              label="Enter number of pulls"
              type="number"
              variant="outlined"
              sx={{ width: '350px' }}
              onBlur={handlePullNumber}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handlePullCostCalculation}
            >
              Calculate
            </Button>
            <Typography variant="h5">
              {pullNumber} pulls will cost ${pullCost}
            </Typography>
            {showImage && (
              <Image
                src={imageUrl}
                alt="Terriermon status according to amount spent"
                width={300}
                height={300}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
