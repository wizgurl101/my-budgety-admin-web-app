import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// todo test data
const sampleData = [
    {
        id: 1,
        category_id: "abc_123",
        name: 'category 1 name'
    },
    {
        id: 2,
        category_id: "def_456",
        name: 'category 2 name'
    }
]

const columns = [
    { field: 'category_id', headerName: 'Category ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
]

export default function Page(): React.JSX.Element {
    return (
        <>
            <DataGrid rows={sampleData} columns={columns} />
        </>
    )
}