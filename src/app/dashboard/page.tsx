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
import {fetcher} from '@/utils/SWR.utils';

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

export default function Dashboard() {
    const currentDate: Date = new Date(Date.now())
    const firstDayOfMonthDate: string = getMonthFirstDay(currentDate)
    const lastDayOfMonthDate: string = getMonthLastDay(currentDate)

    const latest5ExpansesUrl = `${process.env.NEXT_PUBLIC_MONTH_LATEST_EXPANSE_LOCALHOST_URL}` +
        `userId=${process.env.NEXT_PUBLIC_USER_ID}&firstDayOfMonthDate=${firstDayOfMonthDate}&lastDayOfMonthDate=${lastDayOfMonthDate}`
    const { data, error, isLoading } = useSWR(latest5ExpansesUrl, fetcher)
    if (error) {
        return <Typography variant="h4">Error Loading Data</Typography>
    }
    if (isLoading) return <LoadingBar />

    //todo remove this after getting current budget spend from api
    const expansesTotal = data.reduce((acc: number, item: { amount: number}) => acc + item.amount, 0)

    let percentage: number
    if (expansesTotal > budgetAmount)
    {
        percentage = 100
    } else {
        percentage = (expansesTotal / budgetAmount) * 100
    }
    const progressBarColour = getProgressBarColour(percentage);
    const imageUrl = getImageUrl(percentage);

    const columns = [
        { field: 'categoryName', headerName: 'Category Name', width: 200 },
        {field: 'date', headerName: 'Date', width: 150, valueGetter: (date: any, row:any) => date.value },
        { field: 'name', headerName: 'Name', width: 200 },
        {field: 'amount', headerName: 'Amount', width: 150 },
        {field: 'card_name', headerName: 'Card Name', width: 200 }
    ]

    return (
        <Box sx={{ flexGrow: 1, width: 'auto', overflow: 'auto'}}>
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
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 }
                            }
                        }}
                        pageSizeOptions={[10, 20, 50]}
                    />
                </Grid>
            </Grid>
    </Box>
    )
}