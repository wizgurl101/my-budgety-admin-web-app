'use client'

import * as React from 'react';
import LoadingBar from "@/components/loadingBar/page";
import useSWR from 'swr'
import {DataGrid} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import NewCategoryDialog from "@/app/dashboard/category/NewCategoryDialog";

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
    const [isNewCategoryDialogOpen, setNewCategoryDialogOpen] = React.useState(false)

    if (error){
        return  <Typography variant="h4">Error Loading Data</Typography>
    }
    if (isLoading) return <LoadingBar />

    //todo look into context API to save the User ID
    const userID = process.env.NEXT_PUBLIC_USER_ID

    const createCategory = async (categoryName: string) => {
        try {
            console.log('Creating category')
        } catch (error) {
            // @ts-ignore
            throw new Error(`Failed to create category: ${error.message}`)
        }
    }

    const handleOnClose = () => {
        setNewCategoryDialogOpen(false)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container columns={12}>
                <Grid size={10} sx={{ mt: '2rem', mb: '2rem' }}>
                    <Typography variant="h4">Categories</Typography>
                </Grid>
                <Grid size={10} sx={{ mb: '1rem'}}>
                    <Button variant="contained"  onClick={() => setNewCategoryDialogOpen(true)}>
                        + Add New Category
                    </Button>
                </Grid>
                <Grid size={10}>
                    {isNewCategoryDialogOpen && (<NewCategoryDialog open={true}
                                                                    onClose={handleOnClose}
                                                                    onCreate={createCategory}>

                    </NewCategoryDialog>)}
                </Grid>
                <Grid size={10}>
                    <DataGrid rows={data} columns={columns} />
                </Grid>
            </Grid>
        </Box>
    )
}