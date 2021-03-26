import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import debug from "sabio-debug";
const _logger = debug.extend("ScheduleFormV2");

export default function ScheduleFormV2(props) {
  const handleDateChange = (date) => {
    props.setSelectedDate(date);
    _logger(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          value={props.selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

ScheduleFormV2.propTypes = {
  handleDateChange: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
  setSelectedDate: PropTypes.func,
};
