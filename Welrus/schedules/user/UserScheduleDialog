import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
//import 'react-big-calendar/lib/sass/styles';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import UserCalendar from "@components/schedules/user/UserCalendar";
import debug from "sabio-debug";
const _logger = debug.extend("UserScheduleDialog");

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    className: "bg-midnight-bloom rounded",
    color: "secondary",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  style: {
    className: "bg-midnight-bloom rounded",
    color: "bg-midnight-bloom rounded",
    backgroundColor: "bg-midnight-bloom rounded",
  },
  //I'm trying to get the dialog window to be the bg-midnight-bloom
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserScheduleDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const changeColorToClassName = () =>
  // {
  //   return {className: "bg-night-sky"}
  // }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Schedule Appointment (User)
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            {/* <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <UserCalendar providerId={props.fullProps.providerDetails.id} />

        {/* <List>



          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List> */}
      </Dialog>
    </div>
  );
}

UserScheduleDialog.propTypes = {
  fullProps: PropTypes.shape({
    providerDetails: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }),
};
