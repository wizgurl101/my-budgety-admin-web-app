'use client'

import * as React from 'react';
import useSWR from 'swr'
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const columns = [
    { field: 'categoryName', headerName: 'Category Name', width: 200 },
    {field: 'date', headerName: 'Date', width: 200, valueGetter: (date: any, row:any) => date.value },
    { field: 'name', headerName: 'Name', width: 200 },
    {field: 'amount', headerName: 'Amount', width: 200 },
]

const params = {
    userId: "0b039d57-30b9-4e19-a228-9425b8529189",
    firstDayOfMonthDate: "2025-01-01",
    lastDayOfMonthDate: "2025-01-31"
}
const fetcher = async (url: string) =>
{
    const fullUrl = `${url}?userId=${params.userId}&firstDayOfMonthDate=${params.firstDayOfMonthDate}&lastDayOfMonthDate=${params.lastDayOfMonthDate}`

    try {
        const res = await fetch(fullUrl, {
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return await res.json();
    } catch (error) {
        // @ts-ignore
        throw new Error(`Fetch error: ${error.message}`);
    }
};

export default function Page(): React.JSX.Element {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_GET_MONTH_EXPANSE_LOCALHOST_URL}`, fetcher)

    if (error) {
        console.log(error)
        return <Typography variant="h4">Error Loading Data</Typography>
    }
    if (isLoading) return <div>Loading...</div>

    const currentDate = new Date(Date.now())

    console.log(JSON.stringify(data))

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container columns={12}>
                <Grid size={10} sx={{ mt: '2rem', mb: '2rem' }}>
                    <Typography variant="h4">{currentDate.toLocaleString('default', {month: 'long'})} - {currentDate.getFullYear()}</Typography>
                </Grid>
                <Grid size={10}>
                    <DataGrid rows={data} columns={columns} />
                </Grid>
            </Grid>
        </Box>
    )
}