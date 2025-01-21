'use client'

import * as React from 'react';
import LoadingBar from "@/components/loadingBar/page";
import useSWR, {mutate} from 'swr'
import {DataGrid} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {fetcher} from "@/utils/SWR.utils";

export default function Page(): React.JSX.Element {
    const [selectedCategoryId, setSelectedCategoryId] = React.useState('');
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`, fetcher)
    const getCategoryKeywordsURL = `http://localhost:5000/keyword/byCategory/${selectedCategoryId}`
    const { data: keywordsData,  error: keywordsError, isLoading: isKeywordLoading } = useSWR(getCategoryKeywordsURL, fetcher)

    React.useEffect(() => {
        if (data && data.length > 0) {
            setSelectedCategoryId(data[0].category_id);
        }
    }, [data]);

    if (error){
        return  <Typography variant="h4">Error Loading Data</Typography>
    }
    if (isLoading) return <LoadingBar />

    // @ts-ignore
    const keywordColumns = [
        { field: 'name', headerName: 'Name', width: 200 },
    ]

    const handleSelectCategory = async (event: SelectChangeEvent) => {
        setSelectedCategoryId(event.target.value as string);
        await mutate(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`)
    };

    return (
    <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={12}>
            <Grid size={12} sx={{ mt: '2rem'}}>
                <Typography variant="h4">Manage Category's Keywords</Typography>
            </Grid>
            <Grid size={12}>
                <FormControl fullWidth>
                    <InputLabel id="category-select-label"
                    sx={{ mt: '0.6rem' }}
                    >
                        Select A Category
                    </InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={selectedCategoryId}
                        onChange={handleSelectCategory}
                    >
                        {data.map((category: { id: string, category_id: string, name: string }) => (
                            <MenuItem key={category.id} value={category.category_id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={12}  sx={{height: '400px', overflowY: 'auto'}}>
                {keywordsError && <Typography variant="h4">Error Loading Keywords</Typography>}
                {isKeywordLoading && <LoadingBar />}
                {!keywordsError && <DataGrid rows={keywordsData} columns={keywordColumns} />}
            </Grid>
        </Grid>
    </Box>
    )
}