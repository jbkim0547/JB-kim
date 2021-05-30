import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loki from "react-loki";
import ScheduleStepper from "@components/schedules/ScheduleStepper";
import scheduleService from "@services/scheduleService";
import debug from "sabio-debug";
const _logger = debug.extend("ScheduleDialog");

export default function ScheduleDialog(props) {
  _logger("rendering dialog", props);
  var addingToMappedNewEventArray = [];
  const [open, setOpen] = React.useState(false);
  const [scheduleTimes, setScheduleTimes] = React.useState([]);
  const [state, setState] = React.useState({});
  const [stagedDate, setStagedDate] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const [selectedDate3, setSelectedDate3] = React.useState(new Date());
  const [newEvents, setNewEvents] = React.useState([]);
  const testingNewIdeaTempId = 53532342262634;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (!isFirstRender.current) {
      _logger(`set toggle open`);
      setOpen(true);
    }
  }, [props.toggleDialog]);

  const handleClose = () => {
    setOpen(false);
    props.setToggleDialogFunc;
    _logger(`set toggle closed`);
  };

  React.useEffect(() => {
    isFirstRender.current = false; //toggles flag after first render/mounting
  }, []);

  const isFirstRenderV2 = React.useRef(true);

  React.useEffect(() => {
    if (!isFirstRenderV2.current) {
      _logger(
        "useEffect for state//////////////////////////////////////////////////",
        state
      );

      addScheduleAvailability();
    }
  }, [state]);

  React.useEffect(() => {
    isFirstRenderV2.current = false; //toggles flag after first render/mounting
  }, []);

  const onClickAddHandler = () => {
    let localeSelectedDate = selectedDate.toLocaleString();
    let date = localeSelectedDate.split(",", 1);

    let localeSelectedDate2 = selectedDate2.toLocaleTimeString();
    let localeSelectedDate3 = selectedDate3.toLocaleTimeString();

    let modifiedSelectedDate = `${date}, ${localeSelectedDate2}`;
    let modifiedSelectedDate2 = `${date}, ${localeSelectedDate2}`;
    let modifiedSelectedDate3 = `${date}, ${localeSelectedDate3}`;

    let newEventObject = {
      id: props.randomIdGenerator,
      title: "Available",
      start: new Date(modifiedSelectedDate2),
      end: new Date(modifiedSelectedDate3),
      status: 1,
    };

    _logger(props.randomIdGenerator);

    addingToMappedNewEventArray.push(newEventObject);

    _logger("checking props.newEvents", props.newEvents);
    let newestMappedNewEventArray = props.newEvents.concat(
      addingToMappedNewEventArray
    );
    _logger("checking props.newEvents", props.newEvents);

    props.setNewEvents(newestMappedNewEventArray);
    _logger("newestMappedNewEventArray", newestMappedNewEventArray);
    _logger("post-Click newEvents", props.newEvents);

    mapScheduleTimesIntoUsableData(newEventObject);

    setOpen(false);
  };

  const mapScheduleTimesIntoUsableData = (event) => {
    let formattedAdding = {
      DayOfWeek: `${event.start.toLocaleString()}`,
      StartTime: `${event.start.toLocaleString()}`,
      EndTime: `${event.end.toLocaleString()}`,
      //22/07/2018, 07:22:13 FORMAT
    };

    let arrClicked = [];

    arrClicked.push(formattedAdding);

    setState({
      scheduleId: props.scheduleIdState,
      createdBy: props.fullProps.currentUser.id,
      scheduleTimes: arrClicked,
    });

    _logger("STATE //////////////////////////////////////////", state);
  };

  const addScheduleAvailability = () => {
    _logger("adding to Schedules CALL /////////", state);
    scheduleService
      .addScheduleAvailability(state)
      .then(onAddScheduleAvailabilitySuccess)
      .catch(onAddScheduleAvailabilityError);
  };

  const onAddScheduleAvailabilitySuccess = (data) => {
    _logger(
      "onAddScheduleAvailabilitySuccess//////////////////////////////////"
    );
    let newEventId = data.item;
    _logger("new event id", newEventId);

    let tempEventIndex = props.newEvents.findIndex(
      (event) => event.id === props.randomIdGenerator
    );

    let tempEvent = props.newEvents.splice(tempEventIndex, 1);
    _logger(tempEvent);

    const mappingTempEvent = (event) => {
      let newTempEvent = {
        id: newEventId,
        title: "Available",
        start: new Date(event.start),
        end: new Date(event.end),
        status: event.status,
      };

      return newTempEvent;
    };

    let newTempEvent = tempEvent.map(mappingTempEvent);

    _logger("newTempEvent", newTempEvent);

    let updatedNewEvents = props.newEvents.concat(newTempEvent);
    props.setNewEvents(updatedNewEvents);
    _logger("INVALID PROP ERRORDELETED FILTER ARRAY", updatedNewEvents);
    _logger("updatedNewEvents", updatedNewEvents);
    _logger("post-Click newEvents", props.newEvents);
  };

  const onAddScheduleAvailabilityError = (err) => {
    _logger(err);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Date and Times</DialogTitle>
        <DialogContent>
          <ScheduleStepper
            fullProps={props}
            selectedDate={selectedDate}
            selectedDate2={selectedDate2}
            selectedDate3={selectedDate3}
            setSelectedDate={setSelectedDate}
            setSelectedDate2={setSelectedDate2}
            setSelectedDate3={setSelectedDate3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClickAddHandler} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ScheduleDialog.propTypes = {
  fullProps: PropTypes.shape({
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    location: PropTypes.shape({
      state: PropTypes.shape({
        providerId: PropTypes.number.isRequired,
      }),
    }),
  }),
  newEvents: PropTypes.arrayOf(PropTypes.shape({})),
  setNewEvents: PropTypes.func,
  newNewEvents: PropTypes.arrayOf(PropTypes.shape({})),
  setNewNewEvents: PropTypes.func,
  state: PropTypes.shape({}),
  setState: PropTypes.func,
  randomIdGenerator: PropTypes.string,
  scheduleIdState: PropTypes.number,
  toggleDialog: PropTypes.bool,
  setToggleDialogFunc: PropTypes.func,
};
