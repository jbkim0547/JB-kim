import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import LocationDetails from "./subforms/LocationDetails";
import Locations from "./cards/Locations";

import debug from "sabio-debug";
const _logger = debug.extend("PracticeLocations");

const newLocationIndexStartPoint = 90100000;

class PracticeLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationList: this.loadLocationList(),
      maxLocationTempId: newLocationIndexStartPoint,
      currentLocation: this.getDefaultLocation(),
      shouldResetForm: false,
      isEditing: false,
    };
    _logger("constructor", this.state);
  }

  // --------------------------------- Constructor / Init Methods
  loadLocationList = () => {
    let locationList = [];
    if (this.props.locations && this.props.locations.length > 0) {
      locationList = [...this.props.locations];
    }
    return locationList;
  };

  getDefaultLocation = () => {
    return {
      id: 0,
      tempLocationId: 0,
      locationTypeId: 2, // 2 = locationType for practice, no edit
      lineOne: "",
      lineTwo: "",
      stateId: 0,
      zip: "",
      latitude: 0,
      longitude: 0,
    };
  };

  findMaxId = (list) => {
    let maxId = 0;
    const listLength = list.length;
    for (let i = 0; i < listLength; i++) {
      const itemId = list[i].id;
      if (itemId && itemId > maxId) {
        maxId = itemId;
      }
    }
    return maxId;
  };

  componentDidMount() {
    const maxLocationTempId = Math.max(
      this.findMaxId(this.state.locationList),
      this.state.maxLocationTempId
    );
    _logger("componentDidMount", maxLocationTempId);
    this.setState((prevState) => {
      return { ...prevState, maxLocationTempId };
    });
  }

  // --------------------------------- Event Handlers
  onEdit = (data) => {
    _logger("onEdit", data);
    this.loadLocation(data);
  };

  loadLocation = (aLocation) => {
    _logger("loadLocation", aLocation);
    this.setState((prevState) => {
      return { ...prevState, currentLocation: aLocation, isEditing: true };
    });
  };

  handleAutoFill = (autofillData) => {
    _logger("autofill data : ", autofillData);
    if (autofillData) {
      this.setState((prevState) => {
        return {
          ...prevState,
          currentLocation: autofillData,
        };
      });
    }
  };

  onRemove = (data) => {
    _logger("onRemove", data);
    const removeIndex = this.findIndexInList(data.id, this.state.locationList);
    if (removeIndex > -1) {
      let locationList = [...this.state.locationList];
      _logger("removing ", locationList[removeIndex]);
      locationList.splice(removeIndex, 1);

      this.setState((prevState) => {
        return { ...prevState, locationList };
      }, this.onReset);
    } else {
      _logger("not removing", removeIndex);
      // add snackbar: unable to remove item
    }
  };

  findIndexInList = (id, list) => {
    _logger("findIndexInList", id, list);
    let result = -1;
    if (id && list && Array.isArray(list)) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          result = i;
          break;
        }
      }
    }
    return result;
  };

  onReset = () => {
    this.setState({
      isEditing: false,
      currentLocation: this.getDefaultLocation(),
      shouldResetForm: false,
    });
  };

  onAddorSaveEdit = (values) => {
    _logger("onAddorSaveEdit", values);
    if (this.state.isEditing) {
      this.saveEdits(values);
    } else {
      this.onAdd(values);
    }
  };

  saveEdits = (values) => {
    _logger("saveEdits", values.id);

    const editIndex = this.findIndexInList(values.id, this.state.locationList);
    if (editIndex > -1) {
      _logger("saving", editIndex);
      let locationList = [...this.state.locationList];
      locationList.splice(editIndex, 1, values);
      _logger("newList", locationList);

      this.setState((prevState) => {
        return {
          ...prevState,
          currentLocation: this.getDefaultLocation(),
          locationList,
          isEditing: false,
          shouldResetForm: true,
        };
      });
    } else {
      _logger("save of edits failed");
      // snackbar here
    }
  };

  onAdd = (values) => {
    _logger("onAdd", values);

    let maxLocationTempId = this.state.maxLocationTempId + 1;
    if (!values.id) {
      values.id = maxLocationTempId;
      values.tempLocationId = values.id;
    }

    let locationList = [...this.state.locationList];
    locationList.push(values);

    this.setState((prevState) => {
      return {
        ...prevState,
        locationList,
        maxLocationTempId,
        currentLocation: this.getDefaultLocation(),
      };
    });
  };

  afterFormReset = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentLocation: this.getDefaultLocation(),
        shouldResetForm: false,
      };
    });
  };

  onDiscard = () => {
    this.exitView();
  };

  exitView = () => {
    _logger("on exit from ProviderPractices", this.state.locationList);
    this.props.onNext({
      locations: this.state.locationList,
    });
  };

  onPrevious = () => {
    _logger("on exit Previous from ProviderPractices", this.state.locationList);
    if (this.state.locationList.length > 0) {
      this.props.mergeNow({
        locations: this.state.locationList,
      });
    }
    this.props.onBack();
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <div className={"m-3"}>
            <LocationDetails
              location={this.state.currentLocation}
              listCount={
                this.state.locationList ? this.state.locationList.length : 0
              }
              onAddorSave={this.onAddorSaveEdit}
              onPrevious={this.onPrevious}
              onDiscard={this.onDiscard}
              resetComplete={this.afterFormReset}
              shouldResetForm={this.state.shouldResetForm}
              hasReset={this.onReset}
              isEditing={this.state.isEditing}
              handleAutoFill={this.handleAutoFill}
              // reference props:
              references={this.props.references}
              // outer component text:
              setTopText={this.props.setTopText}
              setSubHeadingText={this.props.setSubHeadingText}
              // Loki props:
              backLabel={this.props.backLabel}
              cantBack={this.props.cantBack}
              onNext={this.props.onNext}
              nextLabel={this.props.nextLabel}
            />
          </div>

          {this.state.locationList.length > 0 && (
            <Locations
              locations={this.state.locationList}
              references={this.props.references}
              onEdit={this.onEdit}
              onRemove={this.onRemove}
              showButtons={true}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default PracticeLocations;

PracticeLocations.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      locationTypeId: PropTypes.number,
      lineOne: PropTypes.string,
      lineTwo: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string,
      stateId: PropTypes.number,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
  references: PropTypes.shape({
    affiliationTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    genderTypes: PropTypes.arrayOf(PropTypes.shape({})),
    facilityTypes: PropTypes.arrayOf(PropTypes.shape({})),
    languages: PropTypes.arrayOf(PropTypes.shape({})),
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        map: PropTypes.func,
      })
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        map: PropTypes.func,
      })
    ),
  }),

  // Loki bybass merge
  mergeNow: PropTypes.func,

  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,

  // Loki props
  backLabel: PropTypes.string,
  onBack: PropTypes.func,
  cantBack: PropTypes.bool,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
