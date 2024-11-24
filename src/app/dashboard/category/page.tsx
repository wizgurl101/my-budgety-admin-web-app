'use client'

import * as React from 'react';
import useSWR from 'swr'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'category_id', headerName: 'Category ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
]

export default function Page(): React.JSX.Element {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`, fetcher)

    if (error) return <div>Error loading data</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <DataGrid rows={data.data} columns={columns} />
        </>
    )
}