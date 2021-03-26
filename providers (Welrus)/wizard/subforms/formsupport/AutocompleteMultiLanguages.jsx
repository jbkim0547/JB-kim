import React, { Component } from "react";
import PropTypes from "prop-types";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import debug from "sabio-debug";
const _logger = debug.extend("AutocompleteMultiLanguages");

const defaultTypesList = [];

class AutocompleteMultiLanguages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedLanguages: [],
      isValid: false,
    };
    _logger("rendering", props);
  }

  componentDidMount() {
    _logger("componentDidMount", this.props.languages);
    let assignedLanguages = [];
    let isValid = false;
    if (this.props.languages !== this.state.assignedLanguages) {
      assignedLanguages = this.getLanguageValues(
        this.props.languages,
        this.props.entityId
      );
      isValid = this.checkIfValid(assignedLanguages);
      this.setState((prevState) => {
        return {
          ...prevState,
          assignedLanguages,
          isValid,
          practiceId: this?.props?.entityId,
        };
      });
    }
    if (this.props.autoMerge) {
      _logger("autoMerge", assignedLanguages);
      this.merge(isValid, assignedLanguages);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.triggerMerge !== this.props.triggerMerge &&
      this.props.triggerMerge
    ) {
      this.merge(this.state.isValid);
    }
    if (!this.props.autoMerge && prevState.isValid !== this.state.isValid) {
      this.props.setValidity(this.state.isValid);
    }
  }

  // --------------------------------------------- Special Handlers
  getLanguageOption = (option) => {
    if (option) {
      return `${option.code} - ${option.name}`;
    }
  };

  getLanguageValues = (incomingList) => {
    _logger("getLanguageValues", incomingList);
    let result = [];

    if (this.props?.references?.languages && incomingList?.length > 0) {
      for (let i = 0; i < incomingList.length; i++) {
        const current = incomingList[i];

        const found = this.props.references.languages.find((item) => {
          return current.languageId === item.id;
        });

        if (found) {
          found.languageId = found.id;
          let newItem = {
            id: found.id,
            languageId: found.id,
            code: found.code,
            name: found.name,
          };
          if (this.props.entityName && this.props.entityId) {
            newItem[this.props.entityName] = this.props.entityId;
          }
          result.push(newItem);
        }
      }
    }
    return result;
  };

  handleSelectChange = (event, options) => {
    _logger("handleSelectChange", options);
    let isValid = false;
    let currentList = [...options];
    if (currentList && currentList?.length > 0) {
      for (let i = 0; i < currentList.length; i++) {
        let current = currentList[i];

        let newItem = {
          languageId: current.id,
          id: current.id,
          code: current.code,
          name: current.name,
        };
        if (this.props.entityName && this.props.entityId) {
          newItem[this.props.entityName] = this.props.entityId;
        }
        currentList[i] = newItem;
      }
    }
    isValid = this.checkIfValid(currentList);

    if (this.props.autoMerge) {
      this.merge(isValid, currentList);
    }

    this.setState((prevState) => {
      return {
        assignedLanguages: currentList,
        isValid,
      };
    });
  };

  merge = (isValid, list, id) => {
    _logger("merge", list, isValid, id);
    this.props.mergeNow({
      languages: list ? list : this.state.assignedLanguages,
      entityId: id ? id : this?.props?.entityId ?? null,
      isValid: isValid,
    });
  };

  checkIfValid = (list) => {
    let result = true;
    if (this.props.isRequired && (!list || list?.length < 1)) {
      result = false;
    }
    _logger("checkIfValid", result);
    return result;
  };

  render() {
    return (
      <Autocomplete
        className="m-3"
        multiple
        options={
          this.props.references
            ? this.props.references.languages
            : defaultTypesList
        }
        getOptionLabel={this.getLanguageOption}
        onChange={this.handleSelectChange}
        value={this.state.assignedLanguages}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select a language type:"
            placeholder="Type here..."
            error={!this.state.isValid}
            helperText={!this.state.isValid && "At least one entry is required"}
          />
        )}
      />
    );
  }
}

export default AutocompleteMultiLanguages;

AutocompleteMultiLanguages.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      languageId: PropTypes.number,
    })
  ),
  references: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  mergeNow: PropTypes.func.isRequired,
  autoMerge: PropTypes.bool,
  triggerMerge: PropTypes.bool,
  isRequired: PropTypes.bool,
  setValidity: PropTypes.func,
  entityName: PropTypes.string,
  entityId: PropTypes.number,
};
