import NavBar from "@/components/navbar/page";
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from "react";

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

export default function Dashboard() {
    return (
        <>
        <NavBar />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: '#fff',
                    gap: 2
                }}
            >
                <DataGrid rows={sampleData} columns={columns} />
            </Container>
        </>
    )
}