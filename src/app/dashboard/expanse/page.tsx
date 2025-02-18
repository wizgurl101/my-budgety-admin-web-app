'use client';

import * as React from 'react';
import LoadingBar from '@/components/LoadingBar/page';
import { getMonthFirstDay, getMonthLastDay } from '@/utils/dateTime.utils';
import useSWR, { mutate } from 'swr';
import { DataGrid, GridRenderCellParams, GridRowModel } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Category } from '@/types/category';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { fetcher } from '@/utils/SWR.utils';
import EditExpanseDialog from '@/app/dashboard/expanse/EditExpanseDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '@/components/DeleteDialog/page';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';

const ExpanseFetcher = async ([url, date]: [string, Date]) => {
  const params = {
    // todo: get userId from context
    userId: `${process.env.NEXT_PUBLIC_USER_ID}`,
    firstDayOfMonthDate: getMonthFirstDay(date),
    lastDayOfMonthDate: getMonthLastDay(date),
  };
  const fullUrl = `${url}?userId=${params.userId}&firstDayOfMonthDate=${params.firstDayOfMonthDate}&lastDayOfMonthDate=${params.lastDayOfMonthDate}`;

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

export default function Expanse() {
  const [date, setDate] = React.useState(new Date(Date.now()));
  const currentDate = new Date(Date.now());

  //todo look into context API to save the User ID
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  const { data, error, isLoading } = useSWR(
    [`http://localhost:5000/expanse/month`, date],
    ExpanseFetcher
  );
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useSWR(`http://localhost:5000/category?userId=${userId}`, fetcher);
  const [isEditExpanseDialogOpen, setEditExpanseDialogOpen] =
    React.useState(false);
  const [isDeleteExpanseDialogOpen, setDeleteExpanseDialogOpen] =
    React.useState(false);
  const [selectedExpanse, setSelectedExpanse] =
    React.useState<GridRowModel<any> | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState('');
  const [responseMessage, setResponseMessage] = React.useState('');

  if (error || categoryError) {
    return <Typography variant="h4">Error Loading Data</Typography>;
  }
  if (isLoading || categoryIsLoading) return <LoadingBar />;

  const categories: Category[] = categoryData.map((item: any) => ({
    category_id: item.category_id,
    name: item.name,
  }));

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      valueGetter: (date: any, row: any) => date.value,
    },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
      valueFormatter: (amount: Number) => {
        const valueFormatted = amount.toFixed(2);
        return `$${valueFormatted}`;
      },
    },
    { field: 'categoryName', headerName: 'Category Name', width: 210 },
    { field: 'card_name', headerName: 'Card Name', width: 160 },
    {
      field: 'edit',
      width: 100,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => handleEditExpanse(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      width: 120,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => handleDeleteExpanse(params.row)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleOnClose = () => {
    setEditExpanseDialogOpen(false);
    setDeleteExpanseDialogOpen(false);
  };

  const handleEditExpanse = (expanse: GridRowModel<any>) => {
    setSelectedExpanse(expanse);
    const category = categoryData.find(
      (category: any) => category.name === expanse.categoryName
    );
    setSelectedCategoryId(category.category_id);
    setEditExpanseDialogOpen(true);
  };

  const editExpanse = async (categoryId: string) => {
    try {
      await mutate('/expanse', async () => {
        const url = `http://localhost:5000/expanse/${selectedExpanse.expanse_id}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            updatedCategoryId: categoryId,
            updatedDate: selectedExpanse.date.value,
            updatedName: selectedExpanse.name,
            updatedAmount: selectedExpanse.amount,
            updatedCardName: selectedExpanse.card_name,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to updated keyword');
        }

        const data = await response.json();
        setResponseMessage(data.message);
        setSelectedExpanse(null);
        setSelectedCategoryId('');

        setTimeout(() => {
          setResponseMessage('');
        }, 3000);

        await mutate([`http://localhost:5000/expanse/month`, date]);
      });
    } catch (error) {
      // @ts-ignore
      throw new Error(`Failed to update keyword: ${error.message}`);
    }
  };

  const handleDeleteExpanse = async (expanse: GridRowModel<any>) => {
    setSelectedExpanse(expanse);
    setDeleteExpanseDialogOpen(true);
  };

  const deleteExpanse = async () => {
    try {
      await mutate('/expanse', async () => {
        const url = `http://localhost:5000/expanse/${selectedExpanse.expanse_id}`;
        const response = await fetch(url, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete keyword');
        }

        const data = await response.json();
        setResponseMessage(data.message);
        setSelectedExpanse(null);
        setSelectedCategoryId('');

        setTimeout(() => {
          setResponseMessage('');
        }, 3000);

        await mutate([`http://localhost:5000/expanse/month`, date]);
      });
    } catch (error) {
      // @ts-ignore
      throw new Error(`Failed to delete keyword: ${error.message}`);
    }
  };

  const handlePreviousMonth =  async () => {
    const previousMonth = new Date(date);
    previousMonth.setMonth(date.getMonth() - 1);
    setDate(previousMonth);
    await mutate([`http://localhost:5000/expanse/month`, date]);
  };

  const handleNextMonth = async () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);
    setDate(nextMonth);
    await mutate([`http://localhost:5000/expanse/month`, date]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={12} rowSpacing={2}>
        <Grid
          size={10}
          sx={{
            mt: '2rem',
            mb: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" spacing={4}>
            <IconButton>
              <NavigateBeforeIcon
                aria-label="previous month button"
                onClick={handlePreviousMonth}
              />
            </IconButton>
            <Typography variant="h4">
              {date.toLocaleString('default', { month: 'long' })}{' '}
              {date.getFullYear()}
            </Typography>
            {currentDate.getMonth() !== date.getMonth() && (
              <IconButton>
                <NavigateNextIcon
                  aria-label="next month button"
                  onClick={handleNextMonth}
                />
              </IconButton>
            )}
          </Stack>
        </Grid>
        <Grid size={10}>
          <Typography variant="body1">{responseMessage}</Typography>
        </Grid>
        <Grid size={12} sx={{ overflow: 'auto' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
          />
        </Grid>
        {isEditExpanseDialogOpen && (
          <EditExpanseDialog
            open={isEditExpanseDialogOpen}
            onCloseAction={handleOnClose}
            onUpdateAction={editExpanse}
            label="Edit Expanse"
            categories={categories}
            keywordCategoryId={selectedCategoryId}
          />
        )}
        {isDeleteExpanseDialogOpen && (
          <DeleteDialog
            open={isDeleteExpanseDialogOpen}
            onCloseAction={handleOnClose}
            onDeletionAction={deleteExpanse}
            name="this expanse"
          />
        )}
      </Grid>
    </Box>
  );
}
