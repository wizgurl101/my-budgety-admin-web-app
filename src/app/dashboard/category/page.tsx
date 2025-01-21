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
import NewCategoryDialog from "@/app/dashboard/category/NewCategoryDialog";
import DeleteCategoryDialog from "@/app/dashboard/category/DeleteCategoryDialog";

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
    const [isEditCategoryDialogOpen, setEditCategoryDialogOpen] = React.useState(false)
    const [isDeleteCategoryDialogOpen, setDeleteCategoryDialogOpen] = React.useState(false)
    const [selectedCategoryName, setSelectedCategoryName] = React.useState('')
    const [selectedCategoryId, setSelectedCategoryId] = React.useState('')
    const [responseMessage, setResponseMessage] = React.useState('')

    if (error){
        return  <Typography variant="h4">Error Loading Data</Typography>
    }
    if (isLoading) return <LoadingBar />

    //todo look into context API to save the User ID
    const userID = process.env.NEXT_PUBLIC_USER_ID

    const createCategory = async (categoryName: string) => {
        try {
            await mutate('/category', async () => {
                const response = await fetch('http://localhost:5000/category', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userID,
                        categoryName: categoryName,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create category');
                }

                const data = await response.json();
                setResponseMessage(data.message)

                setTimeout(() => {
                    setResponseMessage("")
                }, 5000)

                await mutate(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`)
            })
        } catch (error) {
            // @ts-ignore
            throw new Error(`Failed to create category: ${error.message}`)
        }
    }

    const handleOnClose = () => {
        setNewCategoryDialogOpen(false)
        setEditCategoryDialogOpen(false)
        setDeleteCategoryDialogOpen(false)
    }

    const handleEditCategory = (category: any) => {
        setSelectedCategoryId(category.category_id)
        setSelectedCategoryName(category.name)
        setEditCategoryDialogOpen(true)
    }

    const handleDeleteCategory = (category: any) => {
        setSelectedCategoryId(category.category_id)
        setSelectedCategoryName(category.name)
        setDeleteCategoryDialogOpen(true)
    }

    // @ts-ignore
    const columns = [
        { field: 'category_id', headerName: 'Category ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'edit',
            width: 100,
            filterable: false,
            renderCell: (params) => (
                <IconButton onClick={() => handleEditCategory(params.row)}>
                    <EditIcon />
                </IconButton>
            )
        },
        {
            field: 'delete',
            width: 100,
            filterable: false,
            renderCell: (params) => (
                <IconButton onClick={() => handleDeleteCategory(params.row)}>
                    <DeleteIcon />
                </IconButton>
            )
        }
    ]

    const editCategory = async (categoryName: string) => {
        try {
            await mutate('/category', async () => {
                const url = `http://localhost:5000/category/${selectedCategoryId}`
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        updatedName: categoryName,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to updated category');
                }

                const data = await response.json();
                setResponseMessage(data.message)
                setSelectedCategoryId('')

                setTimeout(() => {
                    setResponseMessage("")
                }, 5000)

                await mutate(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`)
            })
        } catch (error) {
            // @ts-ignore
            throw new Error(`Failed to update category: ${error.message}`)
        }
    }

    const deleteCategory = async (categoryName: string) => {
        try {
            await mutate('/category', async () => {
                const url = `http://localhost:5000/category/${selectedCategoryId}`
                const response = await fetch(url, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete category');
                }

                const data = await response.json();
                setResponseMessage(data.message)
                setSelectedCategoryId('')

                setTimeout(() => {
                    setResponseMessage("")
                }, 5000)

                await mutate(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`)
            })
        } catch (error) {
            // @ts-ignore
            throw new Error(`Failed to delete category: ${error.message}`)
        }
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
                    <Typography variant="body1">{responseMessage}</Typography>
                </Grid>
                <Grid size={10}>
                    {isNewCategoryDialogOpen && (<NewCategoryDialog open={true}
                                                                    onClose={handleOnClose}
                                                                    onCreate={createCategory}
                                                                    label="New Category Name"
                                                                    buttonLabel="Add"
                    />)}
                </Grid>
                <Grid size={10}>
                    {isEditCategoryDialogOpen && (<NewCategoryDialog open={true}
                                                                    onClose={handleOnClose}
                                                                    onCreate={editCategory}
                                                                    label={`Edit Category: ${selectedCategoryName} Name`}
                                                                    buttonLabel="Update"
                    />)}
                </Grid>
                <Grid size={10}>
                    {isDeleteCategoryDialogOpen && (<DeleteCategoryDialog open={true}
                                                                    onClose={handleOnClose}
                                                                    onDeletion={deleteCategory}
                                                                    categoryName={selectedCategoryName}
                    />)}
                </Grid>
                <Grid size={10}>
                    <DataGrid rows={data} columns={columns} />
                </Grid>
            </Grid>
        </Box>
    )
}