import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBar(): React.ReactElement {
  return <CircularProgress color="success" size="6rem" />;
}
