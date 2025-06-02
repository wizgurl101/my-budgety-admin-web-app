import React from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { ladsBannerTypes } from '@/app/dashboard/ladsCalculator/lads.constants';
import { calculateBannerCost } from './lads.helpers';

export default function BannerEstimateComponent(): React.JSX.Element {
  const [selectedBannerType, setBannerType] = React.useState('multi');
  const [diamondNumber, setDiamondNumber] = React.useState(0);
  const [purpleDiamondNumber, setPurpleDiamondNumber] = React.useState(0);
  const [deepspaceWishNumber, setDeepspaceWishNumber] = React.useState(0);
  const [pityNumber, setPityNumber] = React.useState(0);
  const [wishesMadeNumber, setWishesMadeNumber] = React.useState(0);
  const [bannerCost, setBannerCost] = React.useState(0);
  const [isEventCardGuaranteed, setIsEventCardGuaranteed] =
    React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');

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

  const handleWishesMadeNumber = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const wishesMadeNumber = parseInt(event.target.value);
    setWishesMadeNumber(wishesMadeNumber);
  };

  const handleEventCardGuaranteedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsEventCardGuaranteed(event.target.value === 'y');
  };

  const handleBannerCostCalculation = () => {
    const cost = calculateBannerCost(
      selectedBannerType,
      diamondNumber,
      purpleDiamondNumber,
      deepspaceWishNumber,
      pityNumber,
      wishesMadeNumber,
      isEventCardGuaranteed
    );
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
                sx={{ width: '500px' }}
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
              sx={{ width: '500px' }}
              onBlur={handleDiamondNumber}
            />
            <TextField
              label="Enter number of purple diamonds"
              type="number"
              variant="outlined"
              sx={{ width: '500px' }}
              onBlur={handlePurpleDiamondNumber}
            />
            <TextField
              label="Enter number of deepspace wish"
              type="number"
              variant="outlined"
              sx={{ width: '500px' }}
              onBlur={handleDeepspaceWishNumber}
            />
            <TextField
              label="Enter number of pity"
              type="number"
              variant="outlined"
              sx={{ width: '500px' }}
              onBlur={handlePityNumber}
            />
            <TextField
              label="wishes made"
              type="number"
              variant="outlined"
              sx={{ width: '500px' }}
              onBlur={handleWishesMadeNumber}
            />
            <FormControl>
              <FormLabel id="event-card-radio-group-label">
                Is event guaranteed?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="event-card-radio-group-label"
                name="row-radio-buttons-group"
                value="n"
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
