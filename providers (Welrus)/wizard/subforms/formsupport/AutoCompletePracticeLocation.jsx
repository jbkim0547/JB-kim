import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import logger from "sabio-debug";
const _logger = logger.extend("AutoCompletePracticeLocation");
const apiKey = "AIzaSyASUgxNOHFzT1QVWeL-2YVAu4kYTxnaTco";

class AutoCompletePracticeLocation extends Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;
  }

  onLoad = (autocomplete) => {
    this.autocomplete = autocomplete;
  };

  onPlaceChanged = () => {
    if (this.autocomplete !== null) {
      _logger(this.autocomplete.getPlace());

      const addressComponents = this.autocomplete.getPlace();
      let location = { place: " " };
      let lat = addressComponents.geometry.location.lat();
      let lng = addressComponents.geometry.location.lng();
      _logger(lat, "lat");
      _logger(lng, "lng");

      addressComponents.address_components.forEach((element) => {
        location[element.types[0]] = element.long_name;
      });

      _logger(location);

      this.props.onSelectedLocation(location, lat, lng);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <LoadScript libraries={["places"]} googleMapsApiKey={apiKey}>
            <Autocomplete
              onLoad={this.onLoad}
              onPlaceChanged={this.onPlaceChanged}
            >
              <div>
                <TextField
                  fullWidth
                  className="ml-3 my-3"
                  label="Autocomplete Address Search"
                  name="autocomplete"
                  placeholder={`AutoComplete: Enter Practice Address Here`}
                />
              </div>
            </Autocomplete>
          </LoadScript>
        </div>
      </React.Fragment>
    );
  }
}
AutoCompletePracticeLocation.propTypes = {
  onSelectedLocation: PropTypes.func,
};

export default AutoCompletePracticeLocation;
