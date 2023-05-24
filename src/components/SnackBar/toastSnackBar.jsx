import React from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const ToastSnackBar = ({ open, severity, message, onClose }) => {

    const handleCloseSnackbar = () => {
        onClose(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'fit-content',
                maxWidth: '90%'
            }}>
            <Alert
                onClose={handleCloseSnackbar}
                severity={severity}
                sx={{
                    width: '100%',
                    fontSize: '1.2rem',
                    padding: '1.5rem'
                }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ToastSnackBar;