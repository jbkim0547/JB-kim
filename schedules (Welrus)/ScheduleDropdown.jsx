import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import debug from "sabio-debug";
const _logger = debug.extend("ScheduleDropdown");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ScheduleDropdown(props) {
  const [mappedData, setMappedData] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    _logger(props.scheduleIdList);

    mapScheduleIdList(props.scheduleIdList);
  }, [props.scheduleIdList]);

  const mapScheduleIdList = (scheduleIdList) => {
    let mappedScheduleIdList = scheduleIdList.map(mappingScheduleIdList);

    setMappedData(mappedScheduleIdList);
  };

  const mappingScheduleIdList = (scheduleIdDetails) => {
    if (scheduleIdDetails.practices) {
      if (Array.isArray(scheduleIdDetails.practices)) {
        let [practice] = scheduleIdDetails.practices;

        return (
          <MenuItem value={scheduleIdDetails.id}>{practice.name}</MenuItem>
        );
      } else {
        let practice = scheduleIdDetails.practices;
        props.setAddedNewSchedule(practice);

        return (
          <MenuItem value={scheduleIdDetails.id}>{practice.name}</MenuItem>
        );
      }
      //<div key={`scheduleIdDetails-${scheduleIdDetails.id}`}>
      //KNOWN BUG: if I have the key, the dropdown won't render, if I don't have it, I get
      //unique key errors
    } else {
      //<div key={`scheduleIdDetails-${scheduleIdDetails.id}`}>
      return <MenuItem value={scheduleIdDetails.id}>unnamed schedule</MenuItem>;
    }
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Schedule</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.schedule}
          onChange={props.handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {mappedData}
        </Select>
        <FormHelperText>
          Please choose a schedule for your Practice
        </FormHelperText>
      </FormControl>
    </div>
  );
}

ScheduleDropdown.propTypes = {
  handleChange: PropTypes.func,
  schedule: PropTypes.number,
  scheduleIdList: PropTypes.arrayOf[PropTypes.shape({})],
  setAddedNewSchedule: PropTypes.func,
  addedNewSchedule: PropTypes.shape({}),
  providerDetails: PropTypes.shape({}),
};
