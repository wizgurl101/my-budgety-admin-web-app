'use client'

import * as React from 'react';
import Image from 'next/image';
import ProgressBar from "@/components/progressBar/page";
import LoadingBar from "@/components/loadingBar/page";
import { getMonthFirstDay, getMonthLastDay } from "@/utils/dateTime.utils";
import useSWR from 'swr'
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//todo remove this after getting current budget amount from api
const budgetAmount: number = 1200

function getImageUrl(percent: number): string {
    if(percent === 100) {
        return "/images/terriermon-disappointed.jpg"
    }

    if(percent >= 50 && percent < 100) {
        return "/images/terriermon-sad.jpg"
    }

    return "/images/terriermon-happy.jpg"
}

function getProgressBarColour(percent: number): string {
    if(percent >= 50 && percent < 100) {
        return "orange"
    }

    if(percent === 100) {
        return "red"
    }

    return "green"
}
 /*
  *  FOR EXPANSE DATA GRID
  * **/
const columns = [
    { field: 'categoryName', headerName: 'Category Name', width: 200 },
    {field: 'date', headerName: 'Date', width: 200, valueGetter: (date: any, row:any) => date.value },
    { field: 'name', headerName: 'Name', width: 200 },
    {field: 'amount', headerName: 'Amount', width: 200 },
]

const currentDate = new Date(Date.now())

const params = {
    userId: `${process.env.NEXT_PUBLIC_USER_ID}`,
    firstDayOfMonthDate: getMonthFirstDay(currentDate),
    lastDayOfMonthDate: getMonthLastDay(currentDate)
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

export default function Dashboard() {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_GET_MONTH_EXPANSE_LOCALHOST_URL}`, fetcher)
    if (error) {
        return <Typography variant="h4">Error Loading Data</Typography>
    }
    if (isLoading) return <LoadingBar />

    //todo remove this after getting current budget spend from api
    const expansesTotal = data.reduce((acc: number, item: { amount: number}) => acc + item.amount, 0)
    const currentDate = new Date(Date.now())

    let percentage: number
    if (expansesTotal > budgetAmount)
    {
        percentage = 100
    } else {
        percentage = (expansesTotal / budgetAmount) * 100
    }
    const progressBarColour = getProgressBarColour(percentage);
    const imageUrl = getImageUrl(percentage);

    return (
        <Box sx={{ flexGrow: 1, width: '100vm', overflow: 'auto'}}>
            <Grid container columns={12} justifyContent="center" alignItems="center">
                <Grid size={10} sx={{ mt: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        src={imageUrl}
                        alt="Terriermon status according to amount spent"
                        width={300}
                        height={300}
                    />
                </Grid>
                <Grid size={6} sx={{ mt: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5">Spend: ${expansesTotal}</Typography>
                </Grid>
                <Grid size={6} sx={{ mt: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5">Budget: ${budgetAmount}</Typography>
                </Grid>
                <Grid size={10}>
                    <ProgressBar percentage={percentage} colour={progressBarColour}/>
                </Grid>
                <Grid size={10} sx={{ mt: '2rem', mb: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h4">{currentDate.toLocaleString('default', {month: 'long'})}  {currentDate.getFullYear()}</Typography>
                </Grid>
                <Grid size={10} sx={{ overflow: 'auto'}}>
                    <DataGrid rows={data} columns={columns} />
                </Grid>
            </Grid>
    </Box>
    )
}