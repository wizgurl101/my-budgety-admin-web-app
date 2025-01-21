'use client'

import * as React from 'react';
import LoadingBar from "@/components/loadingBar/page";
import useSWR, {mutate} from 'swr'
import {DataGrid} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {fetcher} from "@/utils/SWR.utils";

export default function Page(): React.JSX.Element {
    return (
    <Box sx={{flexGrow: 1}}>
        <Grid container spacing={12}>
            <Grid size={10} sx={{ mt: '2rem', mb: '2rem' }}>
                <Typography variant="h4">Manage Category's Keywords</Typography>
            </Grid>
        </Grid>
    </Box>
    )
}