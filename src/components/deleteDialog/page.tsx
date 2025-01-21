'use client'

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

interface DeleteDialogProps {
    open: boolean;
    onCloseAction: () => void;
    onDeletionAction: () => Promise<void>;
    name: string;
}

export default function DeleteDialog ({ open, onCloseAction, onDeletionAction, name}: DeleteDialogProps) {
    const handleDeletion = async () => {
        await onDeletionAction();
        onCloseAction();
    };

    return (
        <Dialog open={open} onClose={onCloseAction}>
            <DialogTitle>Confirm deletion of {name}</DialogTitle>
            <DialogContent>
                <Typography
                    variant="body1"
                    color="textPrimary">
                    Are you sure you want to delete: {name}?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseAction} color="primary">
                    Cancel
                </Button>
                <Button type="submit" onClick={handleDeletion} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}