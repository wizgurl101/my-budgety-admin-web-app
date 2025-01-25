'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Category } from '@/types/category';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface EditExpanseDialogProps {
  open: boolean;
  onCloseAction: () => void;
  onUpdateAction: (categoryId: string) => void;
  label: string;
  categories: Category[];
  keywordCategoryId: string;
}

export default function EditExpanseDialog({
  open,
  onCloseAction,
  onUpdateAction,
  label,
  categories,
  keywordCategoryId,
}: EditExpanseDialogProps) {
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState(keywordCategoryId);

  const handleSelectCategory = async (event: SelectChangeEvent) => {
    setSelectedCategoryId(event.target.value as string);
  };

  const handleEdit = () => {
    onUpdateAction(selectedCategoryId);
    onCloseAction();
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseAction}
      PaperProps={{
        sx: {
          width: '30rem', // Set the desired width here
        },
      }}
    >
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="category-select-label" sx={{ mt: '0.6rem' }}>
            Select A Category
          </InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategoryId}
            onChange={handleSelectCategory}
          >
            {categories.map(
              (category: { category_id: string; name: string }) => (
                <MenuItem
                  key={category.category_id}
                  value={category.category_id}
                >
                  {category.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseAction} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleEdit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
