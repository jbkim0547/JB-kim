import { LoadScript, Marker } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { Component } from "react";
import logger from "sabio-debug";
import { REACT_APP_APIKEY } from "../../services/serviceHelpers"; //"@service./serviceHelpers";
import { FormControl, TextField } from "@material-ui/core";
const _logger = logger.extend("AutoComplete Search");
const libraries = ["places"];
class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      center: { lat: 38.685, lng: -115.234 },
      zoom: 2.5,
    };

    this.autocomplete = null;
  }

  onLoad = (autocomplete) => {
    this.autocomplete = autocomplete;
  };
  onMarkerLoad = (marker) => {
    this.marker = marker;
  };
  onPlaceChanged = () => {
    if (this.autocomplete !== null) {
      _logger(this.autocomplete.getPlace());

      const addressComponents = this.autocomplete.getPlace();
      let location = { place: " " };
      const lat = addressComponents.geometry.location.lat();
      const lng = addressComponents.geometry.location.lng();

      addressComponents.address_components.forEach((element) => {
        location[element.types[0]] = element.long_name;
      });

      this.props.onSelectedLocation(location, lat, lng);
      this.setState((prevState) => {
        return {
          ...prevState,
          position: { lat: lat, lng: lng },
          center: { lat: lat, lng: lng },
          zoom: 13,
        };
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <LoadScript libraries={libraries} googleMapsApiKey={REACT_APP_APIKEY}>
            <Autocomplete
              onLoad={this.onLoad}
              onPlaceChanged={this.onPlaceChanged}
            >
              <FormControl className="mt-4 w-100 ml-8">
                <TextField
                  variant="outlined"
                  fullWidth
                  className="m-2"
                  id="Address"
                  label="Select Address"
                  placeholder="76108, 123 E. St, Fort Worth, TX.."
                />
              </FormControl>
            </Autocomplete>
            {this.state.position && (
              <Marker
                onLoad={this.onMarkerLoad}
                position={this.state.position}
              />
            )}
          </LoadScript>
        </div>
      </React.Fragment>
    );
  }
}
LocationSearchInput.propTypes = {
  onSelectedLocation: PropTypes.func,
};

export default LocationSearchInput;
