import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "../store";
import {setErrorAC} from "../reducers/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const errorSnackbar = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorAC(null))
    }
    return (
        <Snackbar open={!!errorSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {errorSnackbar} 😠
            </Alert>
        </Snackbar>
    )
}