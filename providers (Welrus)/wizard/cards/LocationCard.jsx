import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Typography, CardHeader } from "@material-ui/core";

import debug from "sabio-debug";
const _logger = debug.extend("LocationCard");

const notOnFile = "data not entered";

const findIdInList = (idToFind, listToSearch) => {
  const result = listToSearch.find((singleRecord) => {
    return singleRecord.id === idToFind;
  });
  return result;
};

function LocationCard({ location, references, onEdit, onRemove, ...props }) {
  _logger("rendering", location ? location.lineOne : notOnFile);

  function handleEdit(e) {
    onEdit(location);
  }

  function handleRemove(e) {
    onRemove(location);
  }

  function getStateCode(stateId) {
    let result = "";
    if (references) {
      const stateObj = findIdInList(stateId, references.states);
      if (stateObj) {
        result = stateObj.code;
      }
    }
    return result;
  }

  function getLocationType(locationTypeId) {
    let result = "";
    if (references) {
      const locationTypeObj = findIdInList(
        locationTypeId,
        references.locationTypes
      );
      if (locationTypeObj) {
        result = locationTypeObj.name;
      }
    }
    return result;
  }

  return (
    <Grid item xs={12} md={8} lg={6}>
      <Card style={{ marginLeft: "28px" }}>
        <CardHeader
          title={
            <Typography
              variant="h4"
              className="font-size-lg text-white font-weight-bold align-text-center"
            >
              Location Type &nbsp;:&nbsp;&nbsp;
              {` ${getLocationType(location.locationTypeId)}`}
            </Typography>
          }
          style={{ backgroundColor: "#3C447A", height: "50px" }}
        />

        <Grid container>
          <Grid item xs={12}>
            <div className="m-2">
              <span className="font-weight-bold font-size-lg text-black ">
                {` `}
                {location.lineOne}
                <span>{location.lineTwo ? `, ${location.lineTwo}` : ""}</span>
              </span>
              <div>
                <span className="font-weight-bold font-size-lg text-black ">
                  {location.city}
                  {` `}
                  {getStateCode(location.stateId)}
                  {` `}
                  {location.zip}
                </span>
              </div>
            </div>

            <div></div>

            {props.showButtons && (
              <Grid container justify="center" spacing={1}>
                <Grid item xs={8}>
                  <div
                    style={{ marginBottom: "10px", paddingTop: "20px" }}
                    className="ml-3"
                  >
                    <Button
                      type="button"
                      className="btn btn-secondary"
                      variant="contained"
                      color="secondary"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-secondary text-danger"
                      variant="outlined"
                      onClick={handleRemove}
                      style={{ marginLeft: "20px" }}
                    >
                      X
                    </Button>
                  </div>
                </Grid>
              </Grid>
            )}
            <div>
              <span hidden={true}>{` ${location.latitude},`}</span>
              <span hidden={true}>{` ${location.longitude}`}</span>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

LocationCard.propTypes = {
  location: PropTypes.shape({
    tempLocationId: PropTypes.number.isRequired,
    locationTypeId: PropTypes.number.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string,
    city: PropTypes.string.isRequired,
    zip: PropTypes.string,
    stateId: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  references: PropTypes.shape({
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  showButtons: PropTypes.bool.isRequired,
};
export default React.memo(LocationCard);
