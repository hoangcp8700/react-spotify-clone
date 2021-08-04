import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonActive: {
      backgroundColor: '#1fd15d',
      color: '#fff',
      fontSize: 14,
      '&:hover': {
        backgroundColor: '#0b9462',
      }
    },
    text:{
      color: 'gray!important'
    },
    button: {
        color: 'gray',
        fontSize: 14,
        "&:hover": {
            textDecoration: 'underline'
        }
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));

const DialogAlert = ({isDialog, handleDialog}) => {
    const classes = useStyles()
    const handleClose = () => {
        handleDialog({...isDialog, bool:false});
    }
    const handleConfirmDelete = () => {
        handleDialog({...isDialog, bool:true, continue: true})
    }

  return (
    <>
      <Dialog
        open={isDialog.bool}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Xác nhận lần cuối?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className={classes.text}>
            Bạn đã chắc chắc xóa chưa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={handleClose} color="primary">
            Hủy bỏ
          </Button>
          <Button className={classes.buttonActive} onClick={handleConfirmDelete} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
    )
}

export default DialogAlert
