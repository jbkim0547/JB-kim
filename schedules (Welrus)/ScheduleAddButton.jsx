import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddLocationRoundedIcon from "@material-ui/icons/AddLocationRounded";
import debug from "sabio-debug";

const _logger = debug.extend("ScheduleAddButton");

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ScheduleAddButton(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [practiceId, setPracticeId] = React.useState("");
  const [practicesNoScheduleId, setPracticesNoScheduleId] = React.useState([]);
  const [mappedData, setMappedData] = React.useState([]);
  let mappedPracticesNoScheduleId;

  const handleChange = (event) => {
    setPracticeId(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (e) => {
    _logger(e);
    props.addSchedule(practiceId);
    setOpen(false);
  };

  const filterPracticesByScheduleId = (practice) => {
    let result = practice.scheduleId === 0;

    return result;
  };

  const mappingPractices = (practice) => {
    return <option value={practice.id}>{practice.name}</option>;
  };

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (!isFirstRender.current) {
      let practices = props.providerDetails.practices;
      _logger("PRACTICES", practices);

      let practicesWithoutScheduleIds = practices.filter(
        filterPracticesByScheduleId
      );
      _logger("filtered bois", practicesWithoutScheduleIds);
    

      setPracticesNoScheduleId(practicesWithoutScheduleIds);
    }
  }, [props.providerDetails]);

  React.useEffect(() => {
    isFirstRender.current = false; //toggles flag after first render/mounting
  }, []);

  const isFirstRenderV2 = React.useRef(true);

  React.useEffect(() => {
    if (!isFirstRenderV2.current) {
      if (!props.addedNewSchedule) {
        mappedPracticesNoScheduleId = practicesNoScheduleId.map(
          mappingPractices
        );

        setMappedData(mappedPracticesNoScheduleId);
      } else {
        let filteredPractices = practicesNoScheduleId.filter(
          (practice) => practice.id !== props.addedNewSchedule.id
        );
        mappedPracticesNoScheduleId = filteredPractices.map(mappingPractices);

        setMappedData(mappedPracticesNoScheduleId);
      }
    }
  }, [practicesNoScheduleId, props.addedNewSchedule]);

  React.useEffect(() => {
    isFirstRenderV2.current = false; //toggles flag after first render/mounting
  }, []);

  return (
    <div>
      <div className="card-header--actions">
        <Tooltip placement="right" title="Add a schedule to a practice">
          <IconButton size="medium" color="primary">
            <AddLocationRoundedIcon
              onClick={handleClickOpen}
              fontSize="large"
              color="secondary"
            />
          </IconButton>
        </Tooltip>
      </div>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Choose your practice</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Practices</InputLabel>
              <Select
                native
                value={practiceId}
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {mappedData}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ScheduleAddButton.propTypes = {
  handleConfirm: PropTypes.func,
  addSchedule: PropTypes.func,
  fullProps: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        providerId: PropTypes.number,
      }),
    }),
  }),
  providerDetails: PropTypes.shape({
    practices: PropTypes.arrayOf[PropTypes.shape({})],
  }),
  addedNewSchedule: PropTypes.shape({
    id: PropTypes.number,
  }),
};
