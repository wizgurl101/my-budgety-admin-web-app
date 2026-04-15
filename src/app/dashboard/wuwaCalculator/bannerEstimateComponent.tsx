import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormControl, Stack, TextField, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Image from 'next/image';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { calculateBannerCost } from './wuwa.helpers';

export default function BannerEstimateComponent(): React.JSX.Element {
  const [asteriteNumber, setAsteriteNumber] = React.useState(0);
  const [radiantTidesNumber, setRadiantTidesNumber] = React.useState(0);
  const [pityNumber, setPityNumber] = React.useState(0);
  const [bannerCost, setBannerCost] = React.useState(0);
  const [isEventCardGuaranteed, setIsEventCardGuaranteed] =
    React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

  const handleAsteriteNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    const asteriteNumber = parseInt(event.target.value);
    setAsteriteNumber(asteriteNumber);
  };

  const handleRadiantTidesNumber = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const radiantTidesNumber = parseInt(event.target.value);
    setRadiantTidesNumber(radiantTidesNumber);
  };

  const handlePityNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    const pityNumber = parseInt(event.target.value);
    setPityNumber(pityNumber);
  };

  const handleEventCardGuaranteedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEventCardGuaranteed(event.target.value === 'y');
  };

  const handleBannerCostCalculation = () => {
    const cost = calculateBannerCost();
    let imageUrl = '';

    if (cost < 50) {
      imageUrl = '/images/terriermon-banner-go-for-it.jpg';
    } else {
      imageUrl = '/images/terriermon-banner-judging-you.jpg';
    }

    setImageUrl(imageUrl);
    setShowImage(true);
    setBannerCost(cost);
  };

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
          <Typography variant="h4">Character Banner Cost Estimate</Typography>
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
            <TextField
              label="Enter number of asterites"
              type="number"
              variant="outlined"
              sx={{ width: '500px' }}
              onBlur={handleAsteriteNumber}
            />
            <TextField
              label="Enter number of radiant tides"
              type="number"
              variant="outlined"
              sx={{ width: '500px' }}
              onBlur={handleRadiantTidesNumber}
            />
            <TextField
              label="Enter number of pity"
              type="number"
              variant="outlined"
              sx={{ width: '500px' }}
              onBlur={handlePityNumber}
            />
            <FormControl>
              <FormLabel id="event-card-radio-group-label">
                Is event card guaranteed?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="event-card-radio-group-label"
                name="row-radio-buttons-group"
                value={isEventCardGuaranteed ? 'y' : 'n'}
                onChange={handleEventCardGuaranteedChange}
              >
                <FormControlLabel value="n" control={<Radio />} label="No" />
                <FormControlLabel value="y" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="success"
              onClick={handleBannerCostCalculation}
            >
              Calculate
            </Button>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5">
                Pulling in this banner will cost ${bannerCost}
              </Typography>
              {showImage && (
                <Image
                  src={imageUrl}
                  alt="Terriermon status according to amount spent"
                  width={300}
                  height={300}
                />
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
