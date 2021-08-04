import React, { useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './Snackbar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from 'features/Home/playTrackSlice';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlert = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.play.message)
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        if(!message.mes) return
        
        setTimeout(() => setOpen(true), 250)

        const timer = setTimeout(() => {
            dispatch(setMessage({...message, mes: null}))
            setOpen(false)
        }, 6000);
        
        return () => {
            setOpen(false)
            clearTimeout(timer)
        }
        // eslint-disable-next-line 
    },[message])
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
    
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={message.severity}>
                {message.mes}
            </Alert>
        </Snackbar>
        
    )
}

export default SnackbarAlert
