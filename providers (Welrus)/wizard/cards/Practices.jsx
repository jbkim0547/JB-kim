import React, { Component } from "react";
import PropTypes from "prop-types";

import PracticeCard from "./PracticeCard";

import debug from "sabio-debug";
const _logger = debug.extend("Practices");

class Practices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mappedPractices: [],
    };
    _logger("constructor", props);
  }

  // ---------------------------------------- LIFECYCLE TRIGGERS
  componentDidMount() {
    this.renderPractices();
  }

  componentDidUpdate(prevProps) {
    _logger("componentDidUpdate", prevProps);
    if (prevProps.practices !== this.props.practices) {
      this.renderPractices();
    }
  }

  // ---------------------------------------------- CARD MAPPING

  renderPractices = () => {
    _logger("renderPractices");
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedPractices: this.props.practices.map(this.mapPractice),
      };
    });
  };

  mapPractice = (singlePractice) => {
    return (
      <PracticeCard
        className="m-3"
        practice={singlePractice}
        key={`wizprac_${singlePractice.id}`}
        onEdit={this.props.onEdit}
        onRemove={this.props.onRemove}
        references={this.props.references}
        locations={this.props.locations}
        showButtons={this.props.showButtons}
      />
    );
  };

  // ---------------------------------------------------- RENDER
  render() {
    return <React.Fragment>{this.state.mappedPractices}</React.Fragment>;
  }
}

export default Practices;

Practices.propTypes = {
  practices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
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
    facilityTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    genderTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  showButtons: PropTypes.bool,
};
