import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { Component } from "react";
import providerServiceService from "@services/providerServiceService";
import logger from "sabio-debug";
import { REACT_APP_APIKEY } from "../../services/serviceHelpers"; //"@service./serviceHelpers";

const _logger = logger.extend("Map");
const libraries = ["places"];
var mapOptions = { disableDefaultUI: true };
const mapContainerStyle = {
  height: "400px",
  width: "100%",
  padding: `0 40px`,
};

class OnlyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      center: null,
      zoom: 2.5,
      locations: [],
      selected: null,
      providerContact: { firstName: "", lastName: "" },
      providerAddress: {
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zipcode: "",
      },
      providerId: 0,
    };
  }
  componentDidMount() {
    this.getCurrentUserLocation();
  }

  getCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      this.showLocation,
      this.showLocationError
    );
  };

  showLocation = (position) => {
    let center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    this.setState((prevState) => {
      return { ...prevState, center, zoom: 10 };
    }, this.showClosestProviders(center));
    _logger("location found.................", center);
  };

  showLocationError = (error) => {
    if (error.code === 1) {
      _logger("Error: Access is denied!");
    } else if (error.code === 2) {
      _logger("Error: Position is unavailable!");
    }
  };

  showClosestProviders = (center) => {
    let payload = {
      radius: 24901,
      latitude: center.lat,
      longitude: center.lng,
    };
    _logger(payload);
    providerServiceService
      .getProvidersLocation(payload)
      .then(this.onGetProvidersLocationSuccess)
      .catch(this.onGetProvidersLocationError);
  };

  onGetProvidersLocationSuccess = (response) => {
    _logger({ success: response });
    let locationArray = response.item;

    let locations = locationArray.map(this.mapThis);
    _logger(locations);
    this.setState((prevState) => {
      return { ...prevState, locations: locations };
    });
  };

  mapThis = (item) => {
    let thisLocation = {
      keyId: `${item.providerId}${item.location.id}${item.location.locationType.id}`,
      position: {
        lat: item.location.latitude,
        lng: item.location.longitude,
      },
      name: {
        firstName: item.userProfile.firstName,
        lastName: item.userProfile.lastName,
      },
      address: {
        lineOne: item.location.lineOne,
        lineTwo: item.location.lineTwo,
        city: item.location.city,
        state: item.location.state.code,
        zipcode: item.location.zip,
      },
      providerId: item.providerId,
    };
    _logger("location..............", thisLocation);
    return thisLocation;
  };

  onGetProvidersLocationError = (error) => {
    _logger({ error: error });
  };

  onSelect = (item) => {
    _logger("onSelect firing............", item);
    this.setState((prevState) => {
      return {
        ...prevState,
        selected: item.position,
        zoom: 18,
        center: item.position,
        providerContact: item.name,
        providerAddress: item.address,
        providerId: item.providerId,
      };
    });
  };

  onViewDetails = () => {
    let providerId = this.state.providerId;
    _logger("providerId................", providerId);
    this.props.fullProps.history.push(`/provider/${providerId}/details`);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <LoadScript libraries={libraries} googleMapsApiKey={REACT_APP_APIKEY}>
            <GoogleMap
              id="marker-example"
              mapContainerStyle={mapContainerStyle}
              zoom={this.state.zoom}
              center={this.state.center}
              options={mapOptions}
            >
              {this.state.locations.map((item) => {
                return (
                  <Marker
                    key={item.keyId}
                    position={item.position}
                    onClick={() => this.onSelect(item)}
                  />
                );
              })}
              {this.state.selected && (
                <InfoWindow
                  position={this.state.selected}
                  clickable={true}
                  onCloseClick={() => this.onSelect({})}
                >
                  <div className="poi-info-window gm-style">
                    <div className="title full-width">{`${this.state.providerContact.firstName} ${this.state.providerContact.lastName}`}</div>
                    <div className="address">
                      <div>{`${this.state.providerAddress.lineOne}`}</div>
                      <div>{`${this.state.providerAddress.lineTwo}`}</div>
                      <div>{`${this.state.providerAddress.city}, ${this.state.providerAddress.state} ${this.state.providerAddress.zipcode}`}</div>
                    </div>
                    <div className="view-link">
                      <a onClick={this.onViewDetails}>View Details</a>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </React.Fragment>
    );
  }
}
OnlyMap.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      addres: PropTypes.shape({
        city: PropTypes.string,
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        state: PropTypes.string,
        zipcode: PropTypes.string,
      }),
      keyId: PropTypes.string,
      name: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      providerId: PropTypes.number,
    })
  ),
  lowestPrice: PropTypes.func,
  fullProps: PropTypes.shape({
    history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  }),
};

export default OnlyMap;
