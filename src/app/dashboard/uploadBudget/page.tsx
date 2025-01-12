'use client'

import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useSWR from 'swr';

export default function UploadBudget() {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const fetcher = async (url: string, file: File) => {
        const formData = new FormData();

        console.log(file.name)
        formData.append('file', file);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        return response.json();
    };

    const { data, error, mutate } = useSWR(
        selectedFile ? [`${process.env.NEXT_PUBLIC_UPLOAD_CSV_TO_EXPANSE_LOCALHOST_URL}`, selectedFile] : null,
        fetcher
    );

    const handleUpload = () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }
        mutate();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container columns={12} justifyContent="center" alignItems="center">
                <Grid size={12} sx={{ mt: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5">Upload Budget CSV</Typography>
                </Grid>
                <Grid size={12}>
                    <TextField
                        type="file"
                        variant="outlined"
                        fullWidth
                        onChange={handleFileChange}
                        inputProps={{ accept: '.csv' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        sx={{ mt: 2 }}
                    >
                        Upload
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}