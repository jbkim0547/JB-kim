import React from "react";
import PropTypes from "prop-types";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsSchedulesDropdown");

export default function ProviderDetailsSchedulesDropdown(props) {
  const [mappedData, setMappedData] = React.useState([]);
  let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

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

        return (
          <MenuItem value={scheduleIdDetails.id}>{practice.name}</MenuItem>
        );
      }
      //<div key={`scheduleIdDetails-${scheduleIdDetails.id}`}>
      //KNOWN BUG: if I have the key, the dropdown won't render, if I don't have it, I get
      //unique key errors
    } else {
      //<div key={`scheduleIdDetails-${scheduleIdDetails.id}`}>
      return <MenuItem value={scheduleIdDetails.id}>Unnamed Schedule</MenuItem>;
    }
  };

  const minimalSelectClasses = useMinimalSelectStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  React.useEffect(() => {
    _logger(schedules);

    mapScheduleIdList(schedules);
  }, [props.scheduleIdState]);

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Choose a Practice</InputLabel>
        <Select
          disableUnderline
          classes={{ root: minimalSelectClasses.select }}
          MenuProps={menuProps}
          IconComponent={iconComponent}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.schedule}
          onChange={props.handleChangeSchedule}
          label="Schedule"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {mappedData}
        </Select>
      </FormControl>
    </div>
  );
}

ProviderDetailsSchedulesDropdown.propTypes = {
  handleChangeSchedule: PropTypes.func,
  scheduleIdState: PropTypes.number,
  schedule: PropTypes.string,
  className: PropTypes.string,
};
