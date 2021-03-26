import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardHeader,
} from "@material-ui/core";
import WebIcon from "@material-ui/icons/Web";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import InfoIcon from "@material-ui/icons/Info";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import debug from "sabio-debug";
import AccessibleIcon from "@material-ui/icons/Accessible";
const _logger = debug.extend("PracticeCard");

const notOnFile = "data not entered";

const findIdInList = (idToFind, listToSearch) => {
  const result = listToSearch.find((singleRecord) => {
    return singleRecord.id === idToFind;
  });
  return result;
};

function PracticeCard({ practice, onEdit, onRemove, ...props }) {
  _logger("rendering", practice ? practice.id : "no data");

  // ------------------------------------------------------ EVENT HANDLERS
  function handleEdit(e) {
    onEdit(practice);
  }

  function handleRemove(e) {
    onRemove(practice);
  }

  // ------------------------------------------------------ DATA LOOKUP HELPERS

  function getGender() {
    let result = notOnFile;
    if (props && props.references) {
      const genderObj = findIdInList(
        practice.genderAccepted,
        props.references.genderTypes
      );
      if (genderObj) {
        result = genderObj.name;
      }
    }
    return result;
  }

  function getFacilityTypeName() {
    let result = "";
    if (props && props.references) {
      const facilityTypeObj = findIdInList(
        practice.facilityTypeId,
        props.references.facilityTypes
      );
      if (facilityTypeObj) {
        result = facilityTypeObj.name;
      }
    }
    return result;
  }

  function getLocation(tempLocationId) {
    let location = null;
    location = findIdInList(tempLocationId, props.locations);
    return location;
  }

  // ------------------------------------------------------ RENDER
  return (
    <Grid item xs={12} md={8} lg={6}>
      {/*  this grid sizing matches form grid in PracticeDetails set in PracticePrivders */}
      <Card>
        <CardHeader
          title={
            <Typography variant="h4" className="font-weight-bold text-white">
              Practice: &nbsp;{" "}
              {practice.name ? `${practice.name}` : ` Name: ${notOnFile}`}{" "}
              &nbsp; {getFacilityTypeName()}
            </Typography>
          }
          style={{ backgroundColor: "#3C447A", height: "50px" }}
        />
        {/* ------------------------------------------- TITLE --- */}

        <List>
          {/* -------------------------------------------- WEB PAGE-- */}
          <ListItem>
            <WebIcon />
            <ListItemText>
              {" "}
              <div className="font-weight-bold">
                {" "}
                &nbsp; &nbsp;{" "}
                {practice.siteUrl
                  ? ` ${practice.siteUrl}`
                  : ` Url: ${notOnFile}`}
              </div>
            </ListItemText>
          </ListItem>
          {/* -------------------------------------------- LOCATION-- */}
          <ListItem>
            <AddLocationIcon />
            <ListItemText
              className=" font-weight-bold "
              style={{ marginLeft: "15px" }}
            >
              {" "}
              <LocationData
                location={getLocation(practice.tempLocationId)}
                references={props.references}
              />
            </ListItemText>
          </ListItem>
          {/* -------------------------------------------- CONTACT -- */}
          <ListItem>
            <CallIcon />
            <ListItemText style={{ marginLeft: "15px" }}>
              <div className="font-weight-bold">
                {` Phone: ${practice.phone}`}
                {practice.fax ? ` - Fax: ${practice.fax}` : ""}
              </div>
            </ListItemText>
          </ListItem>
          <ListItem>
            <EmailIcon />
            <ListItemText style={{ marginLeft: "15px" }}>
              {" "}
              <div className="font-weight-bold">
                {" "}
                {practice.email ? ` ${practice.email}` : ` Email: ${notOnFile}`}
              </div>
            </ListItemText>
          </ListItem>
          {/* -------------------------------------------- OTHER -- */}
          <ListItem>
            <InfoIcon />
            <ListItemText style={{ marginLeft: "15px" }}>
              <div className="font-weight-bold">
                {" "}
                {practice.insuranceAccepted
                  ? ` Insurance is accepted. `
                  : ` Insurance is not accepted. `}
              </div>
            </ListItemText>
          </ListItem>
          <ListItem>
            <AccessibleIcon />
            <ListItemText style={{ marginLeft: "15px" }}>
              {" "}
              <div className="font-weight-bold">
                {" "}
                {practice.adaAccessible
                  ? ` The location is ADA accessible.`
                  : ` The location is not ADA accessible.`}
              </div>
            </ListItemText>
          </ListItem>
          <ListItem>
            <PeopleAltIcon />
            <ListItemText style={{ marginLeft: "15px" }}>
              <div className="font-weight-bold">
                {` Gender accepted: ${getGender()}`}
              </div>
            </ListItemText>
          </ListItem>
        </List>

        {/* -------------------------------------------- BUTTONS -- */}
        <Grid container justify="center" spacing={1}>
          <Grid item>
            {props.showButtons ? (
              <Button
                style={{ marginBottom: "10px" }}
                variant="contained"
                color="secondary"
                type="button"
                className="btn btn-secondary ml-1"
                onClick={handleEdit}
              >
                Edit
              </Button>
            ) : (
              ""
            )}
          </Grid>
          <Grid item>
            {props.showButtons ? (
              <Button
                style={{ marginBottom: "10px" }}
                variant="contained"
                color="secondary"
                type="button"
                className="btn btn-secondary ml-1"
                onClick={handleRemove}
              >
                X
              </Button>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

const LocationData = ({ location, references }) => {
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
    <div>
      <div>
        <div>
          <span className="font-weight-bold">
            {` `}
            {location.lineOne}
            <span>{location.lineTwo ? `, ${location.lineTwo}` : ""}</span>
          </span>
          <div>
            <span className="font-weight-bold">
              {location.city}
              {` `}
              {getStateCode(location.stateId)}
              {` `}
              {location.zip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

PracticeCard.propTypes = {
  practice: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tempLocationId: PropTypes.number.isRequired,
    locationData: PropTypes.string, // result, not in basic object
    name: PropTypes.string,
    facilityTypeId: PropTypes.number.isRequired,
    facilityTypeName: PropTypes.string, // result, not in basic object
    phone: PropTypes.string.isRequired,
    fax: PropTypes.string,
    email: PropTypes.string,
    siteUrl: PropTypes.string,
    scheduleId: PropTypes.number, // not displayed in Add mode
    adaAccessible: PropTypes.bool.isRequired,
    insuranceAccepted: PropTypes.bool.isRequired,
    genderAccepted: PropTypes.number,
    genderAcceptedValue: PropTypes.string, // result, not in basic object
  }).isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  showButtons: PropTypes.bool.isRequired,

  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tempLocationId: PropTypes.number,
      locationTypeId: PropTypes.number,
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string,
      stateId: PropTypes.number.isRequired,
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
    ).isRequired,
    genderTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ).isRequired,
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
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
};

LocationData.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number,
    tempLocationId: PropTypes.number,
    locationTypeId: PropTypes.number,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string,
    city: PropTypes.string.isRequired,
    zip: PropTypes.string,
    stateId: PropTypes.number.isRequired,
    stateCode: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  references: PropTypes.shape({
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default React.memo(PracticeCard);
