import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  InputAdornment,
  Card,
  FormGroup,
  FormControl,
  Container,
} from "@material-ui/core";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ComposeModal(Modal) {

    //  That given a prop's value it should set the value of open to true or false
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Button
                     variant="contained"
                    color="primary"
                    className="d-block w-500"
                    onClick={handleClickOpen}
                    size="large"
                  >
                   
                    <span  className="btn-wrapper--icon" > Compose Message </span>
                  </Button>
       
    
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Compose Message
        </DialogTitle>
        <DialogContent dividers>
          
          <FormControl className="w-100">
          <label >To:</label>
            <TextField
            
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          
          <FormControl className="w-100">
          <label >Subject:</label>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Subject"
              type="email"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <label>Message:</label>
          <FormControl className="w-100">
            <TextField
              className="mt-4 spacing={2}"
              autoFocus
              margin="dense"
              type="message"
              id="message"
              name="message"
              label="Message"
              placeholder="Write message in the Box:"
              multiline
              rows="10"
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
         
            <Button
              type="submit"
              autoFocus color="primary"
            >
              Attachments
              <i className="align-middle icon-paper-clip fa fa-paperclip ml-1" />
            </Button>
      
          <Button autoFocus onClick={handleClose} color="primary">
            Save Draft
          </Button>
      
          <Button autoFocus onClick={handleClose}  color="primary">
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
