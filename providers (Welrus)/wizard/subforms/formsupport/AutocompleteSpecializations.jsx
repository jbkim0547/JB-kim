import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import debug from "sabio-debug";
const _logger = debug.extend("AutocompleteSpecializations");

const defaultTypesList = [];

class AutocompleteSpecializations extends Component {
  constructor(props) {
    super(props);
    _logger("constructor", props);
  }

  getSpecializationOption = (option) => {
    return `${option.name}`;
  };

  getValue = () => {
    let result = null;

    if (this.props.value) {
      const value = this.props.value;
      const found = this.props.specializations.find((item) => {
        return value === item.id;
      });
      if (found) {
        result = found;
      }
    }
    return result;
  };

  handleSelectChange = (event, option) => {
    _logger("handleSelectChange initial", event, option);
    this.props.changeSpecialization(option);
  };

  render() {
    return (
      <React.Fragment>
        <Autocomplete
          name="specializationId"
          options={
            this.props.specializations
              ? this.props.specializations
              : defaultTypesList
          }
          getOptionLabel={this.getSpecializationOption}
          value={this.getValue()}
          onChange={this.handleSelectChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select a specialization:"
              variant="outlined"
              placeholder="Type here..."
              fullWidth
            />
          )}
          error={this.props?.touched && this.props?.error}
        />
      </React.Fragment>
    );
  }
}

export default AutocompleteSpecializations;

AutocompleteSpecializations.propTypes = {
  specializations: PropTypes.arrayOf(
    PropTypes.shape({
      specializationId: PropTypes.number,
      isPrimary: PropTypes.bool,
    })
  ).isRequired,
  value: PropTypes.number,
  error: PropTypes.string,
  touched: PropTypes.bool,
  changeSpecialization: PropTypes.func.isRequired,
};
