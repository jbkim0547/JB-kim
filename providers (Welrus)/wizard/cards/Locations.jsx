import React, { Component } from "react";
import PropTypes from "prop-types";

import LocationCard from "./LocationCard";

import debug from "sabio-debug";
const _logger = debug.extend("Locations");

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedLocations: [],
    };
    _logger("constructor", props);
  }

  // ---------------------------------------- LIFECYCLE TRIGGERS
  componentDidMount() {
    this.renderLocations();
  }

  componentDidUpdate(prevProps) {
    _logger("componentDidUpdate", prevProps);
    if (prevProps.locations !== this.props.locations) {
      this.renderLocations();
    }
  }

  // ---------------------------------------------- CARD MAPPING

  renderLocations = () => {
    _logger("renderLocations");
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedLocations: this.props.locations.map(this.mapLocation),
      };
    });
  };

  mapLocation = (singleLocaton) => {
    return (
      <LocationCard
        className="m-3"
        location={singleLocaton}
        key={`wizloc_${singleLocaton.id}`}
        references={this.props.references}
        onEdit={this.props.onEdit}
        onRemove={this.props.onRemove}
        showButtons={this.props.showButtons}
      />
    );
  };

  // ---------------------------------------------------- RENDER
  render() {
    return <React.Fragment>{this.state.mappedLocations}</React.Fragment>;
  }
}

export default Locations;

Locations.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      tempLocationId: PropTypes.number,
      locationTypeId: PropTypes.number,
      lineOne: PropTypes.string,
      lineTwo: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string,
      stateId: PropTypes.number,
      stateCode: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ).isRequired,
  references: PropTypes.shape({
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ).isRequired,
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        code: PropTypes.string,
        map: PropTypes.func,
      })
    ).isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  showButtons: PropTypes.bool,
};
