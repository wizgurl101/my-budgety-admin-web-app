'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface NewCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (categoryName: string) => void;
  label: string;
  buttonLabel: string;
}

export default function NewCategoryDialog({
  open,
  onClose,
  onCreate,
  label,
  buttonLabel,
}: NewCategoryDialogProps) {
  const [categoryName, setCategoryName] = React.useState('');
  const [error, setError] = React.useState('');

  const handleCreate = () => {
    if (categoryName === '') {
      setError('Category Name is required');
      return;
    }

    onCreate(categoryName);
    setCategoryName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{label}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required={true}
          margin="dense"
          label={label}
          type="text"
          fullWidth
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleCreate} color="primary">
          {buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
