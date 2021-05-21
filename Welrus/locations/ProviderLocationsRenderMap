import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import logger from "sabio-debug";
import { REACT_APP_APIKEY } from "@services/serviceHelpers";
const _logger = logger.extend("Locations");

const libraries = ["places"];

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const ProviderLocationsRenderMap = (props) => {
  const [selectedProvider, setSelectedProvider] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [locations, setLocations] = React.useState([]);
  const [center, setCenter] = React.useState({ lat: 38.685, lng: -115.234 });
  const [zoom, setZoom] = React.useState(3);

  useEffect(() => {
    setLocations(props.locations);
  });

  const onSelect = (item) => {
    _logger("onSelect firing............", item);

    setZoom(10);
    setCenter(item.position);
    setSelectedProvider(item);
    setSelectedLocation(item.position);
  };

  const onViewDetails = () => {
    let providerId = selectedProvider.providerId;
    _logger("providerId................", providerId);
    props.route(`/provider/${providerId}/details`);
  };

  return (
    <LoadScript libraries={libraries} googleMapsApiKey={REACT_APP_APIKEY}>
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={center}
      >
        {locations.map((item) => (
          <Marker
            key={`L${item.id}P${item.providerId}`}
            position={item.position}
            onClick={() => onSelect(item)}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation}
            clickable={true}
            onCloseClick={() =>
              onSelect({
                name: {
                  firstName: "",
                  lastName: "",
                },
                address: {
                  lineOne: "",
                  lineTwo: "",
                  city: "",
                  state: "",
                  zipcode: "",
                },
              })
            }
          >
            <div className="poi-info-window gm-style">
              <div className="title full-width">{`${
                selectedProvider.name.firstName &&
                selectedProvider.name.firstName
              } ${selectedProvider.name.lastName}`}</div>
              <div className="address">
                <div>{`${selectedProvider.address.lineOne}`}</div>
                <div>{`${
                  selectedProvider.address.lineTwo
                    ? selectedProvider.address.lineTwo
                    : ""
                }`}</div>
                <div>{`${selectedProvider.address.city}, ${selectedProvider.address.state} ${selectedProvider.address.zipcode}`}</div>
              </div>
              <div className="view-link">
                <a onClick={onViewDetails}>View Details</a>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

ProviderLocationsRenderMap.propTypes = {
  route: PropTypes.func,
  locations: PropTypes.arrayOf(PropTypes.object),
  providerId: PropTypes.number,
};

export default ProviderLocationsRenderMap;
