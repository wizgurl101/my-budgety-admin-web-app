'use client'

import * as React from 'react';
import LoadingBar from "@/components/loadingBar/page";
import useSWR from 'swr'
import {DataGrid} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

const columns = [
    { field: 'category_id', headerName: 'Category ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
]

const fetcher = async (url: string) => {
    try
    {
        const res = await fetch(url)

        if(!res.ok)
        {
            throw new Error('Network response to get all category was not ok')
        }

        return await res.json()
    } catch (error) {
        // @ts-ignore
        throw new Error(`Failed to fetch data: ${error.message}`)
    }
}

export default function Page(): React.JSX.Element {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`, fetcher)
    const [openNewCategoryDialog, setOpenNewCategoryDialog] = React.useState(false)

    if (error){
        return  <Typography variant="h4">Error Loading Data</Typography>
    }
    if (isLoading) return <LoadingBar />

    const handleOpenNewCategoryDialog = () => {}

    const handleCloseNewCategoryDialog = () => {}

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container columns={12}>
                <Grid size={10} sx={{ mt: '2rem', mb: '2rem' }}>
                    <Typography variant="h4">Categories</Typography>
                </Grid>
                <Grid size={10} sx={{ mb: '1rem'}}>
                    <Button variant="contained"  onClick={handleCreateNewCategory}>
                        + Add New Category
                    </Button>
                </Grid>
                <Grid size={10}>
                    <DataGrid rows={data} columns={columns} />
                </Grid>
            </Grid>
        </Box>
    )
}