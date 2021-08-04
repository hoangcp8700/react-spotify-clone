import React, { useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// import './DialogInfo.scss'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useArtistFollower } from 'hooks/useArtistFollower';

const useStyles = makeStyles((theme) => ({
    info: {
     display: 'flex',
     alignItems: 'center',

    },
    dialogFollow:{
        transform: 'translateY(-5%)',
        "@media (max-width:545px)": {
            transform: 'translateY(-2%)!important',
        }
    },
    name:{
        marginLeft: theme.spacing(1),
        cursor: 'context-menu'
    },
    type:{
        color: '#9e9e9e',
        fontSize: 14,
        "@media (max-width:545px)": {
            fontSize: 12
        }
    },
    text: {
        color: '#fff',
        "@media (max-width:545px)": {
            fontSize: 12
        }
    },
    img: {
        cursor: 'pointer',
        width: theme.spacing(7),
        height: theme.spacing(7),
        "@media (max-width:545px)": {
            width: theme.spacing(6),
            height: theme.spacing(6),
        }
      },
    button: {
        color: '#9e9e9e',
        borderColor: '#9e9e9e',
        fontSize: 12,
        "&:hover": {
            color: '#fff',
            borderColor: '#fff'
        },
        "@media (max-width:545px)": {
            fontSize: 10,
        }
    },
   
    table:{
        overflow: 'unset',
        maxHeight: 440,
        "& td": {
            padding: ".5rem 1rem",
            "@media (max-width:545px)": {
                padding: ".5rem",
            }
        },
      
        "& tr:last-child td" : {
            borderBottom: 'none',
        }
    }
}))

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        "&::-webkit-scrollbar": {
            width: 10,
            borderRadius: '1rem',
            backgroundColor: 'transparent'
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: '#1fd15d'
        }
    },
}))(MuiDialogContent);

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
});

const DialogFollows = ({list, isOpen, handleDialogFollowing}) => {
    const classes = useStyles()
    const history = useHistory()
    const [open, setOpen] = React.useState(false);
    const [listFollow, setListFollow] = React.useState([])

    useEffect(() => {
        setListFollow(list)
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        setOpen(isOpen);
    },[isOpen])

    const { handleFollow } = useArtistFollower()

    const checkFollow = (id) => {
        const myListFollow = list.items.findIndex(val => val.id === id)
        return myListFollow !== -1 ? 'Đang theo dõi' : 'Theo dõi'
    }
    const handleClose = () => {
        setOpen(false);
        handleDialogFollowing(false)
    };

    
    return (
        <>
         <Dialog 
         className={classes.dialogFollow}
         scroll="body"
         onClose={handleClose} 
         aria-labelledby="customized-dialog-title" 
         open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Đang theo dõi
            </DialogTitle>
            <DialogContent dividers >
                <TableContainer component={Paper} className={classes.table}>
                    <Table  aria-label="simple table">
                        <TableBody>
                        {listFollow?.items?.length && listFollow?.items.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <div className={classes.info}>
                                        <Avatar
                                            onClick={() => history.push(`/artists/${row.id}`)}
                                            alt={row.name} 
                                            src={row?.images[2].url} 
                                            className={classes.img} />
                                        <div className={classes.name}>
                                            <p className={classes.text}>{row.name}</p>
                                            <p className={classes.type}>Nghệ sĩ</p>
                                        </div>
                                    </div>
                                </TableCell>
                               
                                <TableCell align="right">
                                    <Button 
                                        onClick={() => handleFollow(row.id, list)}
                                        className={classes.button} 
                                        variant="outlined">  
                                            {checkFollow(row.id)}
                                        </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>   
        </>
    )
}

export default DialogFollows
