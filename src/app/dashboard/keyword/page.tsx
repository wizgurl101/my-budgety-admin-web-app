'use client';

import * as React from 'react';
import LoadingBar from '@/components/loadingBar/page';
import useSWR, { mutate } from 'swr';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetcher } from '@/utils/SWR.utils';
import KeywordDialog from '@/app/dashboard/keyword/KeywordDialog';
import DeleteDialog from '@/components/deleteDialog/page';

export default function Page(): React.JSX.Element {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState('');
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`,
    fetcher
  );
  const getCategoryKeywordsURL = `http://localhost:5000/keyword/byCategory/${selectedCategoryId}`;
  const {
    data: keywordsData,
    error: keywordsError,
    isLoading: isKeywordLoading,
  } = useSWR(getCategoryKeywordsURL, fetcher);
  const [isNewKeywordDialogOpen, setNewKeywordDialogOpen] =
    React.useState(false);
  const [isEditKeywordDialogOpen, setEditKeywordDialogOpen] =
    React.useState(false);
  const [isDeleteKeywordDialogOpen, setDeleteKeywordDialogOpen] =
    React.useState(false);
  const [selectedKeywordId, setSelectedKeywordId] = React.useState('');
  const [selectedKeywordName, setSelectedKeywordName] = React.useState('');
  const [responseMessage, setResponseMessage] = React.useState('');

  React.useEffect(() => {
    if (data && data.length > 0) {
      setSelectedCategoryId(data[0].category_id);
    }
  }, [data]);

  if (error) {
    return <Typography variant="h4">Error Loading Data</Typography>;
  }
  if (isLoading) return <LoadingBar />;

  const keywordColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'edit',
      width: 100,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => handleEditKeyword(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      width: 100,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => handleDeleteKeyword(params.row)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleSelectCategory = async (event: SelectChangeEvent) => {
    setSelectedCategoryId(event.target.value as string);
    await mutate(`${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`);
  };

  const handleOnClose = () => {
    setNewKeywordDialogOpen(false);
    setEditKeywordDialogOpen(false);
    setDeleteKeywordDialogOpen(false);
  };

  const handleEditKeyword = (keyword: any) => {
    setSelectedKeywordId(keyword.keyword_id);
    setSelectedKeywordName(keyword.name);
    setEditKeywordDialogOpen(true);
  };

  const handleDeleteKeyword = (keyword: any) => {
    setSelectedKeywordId(keyword.keyword_id);
    setSelectedKeywordName(keyword.name);
    setDeleteKeywordDialogOpen(true);
  };

  const createKeyword = async (keywordName: string) => {
    try {
      await mutate('/keyword', async () => {
        const response = await fetch('http://localhost:5000/keyword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryId: selectedCategoryId,
            name: keywordName,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create keyword');
        }

        const data = await response.json();
        setResponseMessage(data.message);

        setTimeout(() => {
          setResponseMessage('');
        }, 3000);

        await mutate(
          `${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`
        );
        await mutate(getCategoryKeywordsURL);
      });
    } catch (error) {
      // @ts-ignore
      throw new Error(`Failed to create category: ${error.message}`);
    }
  };

  const editKeyword = async (keywordName: string) => {
    try {
      await mutate('/keyword', async () => {
        const url = `http://localhost:5000/keyword/${selectedKeywordId}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            updatedName: keywordName,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to updated keyword');
        }

        const data = await response.json();
        setResponseMessage(data.message);
        setSelectedKeywordId('');
        setSelectedKeywordName('');

        setTimeout(() => {
          setResponseMessage('');
        }, 3000);

        await mutate(
          `${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`
        );
        await mutate(getCategoryKeywordsURL);
      });
    } catch (error) {
      // @ts-ignore
      throw new Error(`Failed to update keyword: ${error.message}`);
    }
  };

  const deleteKeyword = async () => {
    try {
      await mutate('/keyword', async () => {
        const url = `http://localhost:5000/keyword/${selectedKeywordId}`;
        const response = await fetch(url, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete keyword');
        }

        const data = await response.json();
        setResponseMessage(data.message);
        setSelectedKeywordId('');
        setSelectedKeywordName('');

        setTimeout(() => {
          setResponseMessage('');
        }, 3000);

        await mutate(
          `${process.env.NEXT_PUBLIC_GET_ALL_CATEGORY_LOCALHOST_URL}`
        );
        await mutate(getCategoryKeywordsURL);
      });
    } catch (error) {
      // @ts-ignore
      throw new Error(`Failed to delete keyword: ${error.message}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={12} rowSpacing={2}>
        <Grid size={12} sx={{ mt: '1rem' }}>
          <Typography variant="h4">Manage Category Keywords</Typography>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label" sx={{ mt: '0.6rem' }}>
              Select A Category
            </InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategoryId}
              onChange={handleSelectCategory}
            >
              {data.map(
                (category: {
                  id: string;
                  category_id: string;
                  name: string;
                }) => (
                  <MenuItem key={category.id} value={category.category_id}>
                    {category.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setNewKeywordDialogOpen(true)}
          >
            + Add New Keyword
          </Button>
        </Grid>
        <Grid size={10}>
          {isNewKeywordDialogOpen && (
            <KeywordDialog
              open={true}
              onClose={handleOnClose}
              onCreate={createKeyword}
              label="New Keyword Name"
              buttonLabel="Add"
            />
          )}
        </Grid>
        <Grid size={10}>
          {isEditKeywordDialogOpen && (
            <KeywordDialog
              open={true}
              onClose={handleOnClose}
              onCreate={editKeyword}
              label={`Edit ${selectedKeywordName} Name`}
              buttonLabel="Update"
            />
          )}
        </Grid>
        <Grid size={10}>
          {isDeleteKeywordDialogOpen && (
            <DeleteDialog
              open={true}
              onCloseAction={handleOnClose}
              onDeletionAction={deleteKeyword}
              name={selectedKeywordName}
            />
          )}
        </Grid>
        <Grid size={10}>
          <Typography variant="body1">{responseMessage}</Typography>
        </Grid>
        <Grid size={12} sx={{ height: '400px', overflowY: 'auto' }}>
          {keywordsError && (
            <Typography variant="h4">Error Loading Keywords</Typography>
          )}
          {isKeywordLoading && <LoadingBar />}
          {!keywordsError && (
            <DataGrid rows={keywordsData} columns={keywordColumns} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
