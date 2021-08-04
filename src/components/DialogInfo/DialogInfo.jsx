import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import './DialogInfo.scss'
import { LoopArtists } from 'utils/LoopArtists';
import { FormatDuration } from 'utils/FormatDuration';
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


const DialogInfo = ({isDialogInfo}) => {
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        setOpen(isDialogInfo.bool);
    },[isDialogInfo])

    const handleClose = () => {
        setOpen(false);
    };
    const TypographyText = ({title, text}) => {
        return (
            <div className="Typography__text">
                <p>{title}</p>
                <p class="text">{text}</p>
            </div>
        )
    }
    return (
        <>
         <Dialog 
         className=""
         scroll="body"
         onClose={handleClose} 
         aria-labelledby="customized-dialog-title" 
         open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Thông tin bài hát
            </DialogTitle>
            <DialogContent dividers >
                <div className="box__poster">
                {isDialogInfo?.value?.album && <img 
                    src={isDialogInfo?.value?.album?.images[1]?.url} 
                    alt={isDialogInfo?.value?.name} />
                }
                </div>
               
                <div className="box__text">
                    <Typography variant="h6" style={{fontWeight:700, marginBottom: '.5rem' }} >
                        {isDialogInfo?.value?.name}
                    </Typography>
                    <TypographyText title="Nghệ sĩ biểu diễn" text={LoopArtists(isDialogInfo?.value?.artists)} />
                    <TypographyText title="Mức độ phổ biến" text={`${isDialogInfo?.value?.popularity}/100`} />
                    <TypographyText title="Thời lượng" text={FormatDuration(isDialogInfo?.value?.duration_ms, true)} />
                    <TypographyText title="Trong album" text={isDialogInfo?.value?.album?.name} />
                </div>
            </DialogContent>
        </Dialog>   
        </>
    )
}

export default DialogInfo
