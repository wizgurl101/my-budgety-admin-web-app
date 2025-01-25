'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useSWR from 'swr';
import LoadingBar from '../../../components/loadingBar/page';

export default function UploadBudget() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [showMessage, setShowMessage] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  //todo look into context API to save the User ID
  const userID = process.env.NEXT_PUBLIC_USER_ID;

  const fetcher = async () => {
    const formData = new FormData();

    formData.append('file', selectedFile as File);

    const url = `http://localhost:5000/uploadToExpanse/csv?userId=${userID}`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('An error occurred while uploading the file');
    }

    setShowMessage(true);

    return response.json();
  };

  const { data, error, isLoading, mutate } = useSWR(
    selectedFile ? 'upload-budget' : null,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    await mutate();

    setSelectedFile(null);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Typography variant="h5">Upload Budget CSV</Typography>
        </Grid>
        <Grid size={12}>
          <TextField
            type="file"
            variant="outlined"
            fullWidth
            onChange={handleFileChange}
            disabled={isLoading}
            inputRef={fileInputRef}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            Upload
          </Button>
        </Grid>
        {showMessage && (
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">File uploaded successfully</Typography>
          </Grid>
        )}
        {error && (
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">Error with uploading file</Typography>
          </Grid>
        )}
        {isLoading && <LoadingBar />}
      </Grid>
    </Box>
  );
}
