'use client'

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
}

export default function NewCategoryDialog ({ open, onClose, onCreate }: NewCategoryDialogProps) {
    const [categoryName, setCategoryName] = React.useState('');

    const handleCreate = () => {
        onCreate(categoryName);
        setCategoryName('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Category Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}