'use client'

import * as React from 'react';
import useSWR from 'swr'
import {DataGrid} from '@mui/x-data-grid';

const columns = [
    { field: 'category_id', headerName: 'Category ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
]

const fetcher = async (url: string) => {
    try
    {
        const res = await fetch(url, {
            mode: 'no-cors'
        })

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

    if (error) return <div>Error loading data</div>
    if (isLoading) return <div>Loading...</div>

    console.log(JSON.stringify(data.data))

    return (
        <>
            <h4>Category</h4>
            <DataGrid rows={data.data} columns={columns} />
        </>
    )
}