import { React, useEffect } from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import { locationDetailsSchema } from "../../../../schema/locationDetailsSchema";
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import AutoCompletePracticeLocation from "./formsupport/AutoCompletePracticeLocation";
import debug from "sabio-debug";
const _logger = debug.extend("LocationDetails");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const subHeadingText =
  "Enter the locations of your practices. One location may be used for more than one practice";
const subTitleText = "Enter your location details here";

const defaultTypesList = [];

const LocationDetails = (props) => {
  _logger("rendering", props);

  const classes = useStyles();

  const {
    // Formik HOC props
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,

    // Loki props
    backLabel,
    nextLabel,
    cantBack,

    // array manager props
    onDiscard,
    shouldResetForm,
    resetComplete,
    hasReset,
    isEditing,
  } = props;

  // --------------------------------------------- Special Handlers
  useEffect(() => {
    props.setTopText(subTitleText);
    props.setSubHeadingText(subHeadingText);
  });

  useEffect(() => {
    _logger("useEffect", shouldResetForm);
    if (shouldResetForm) {
      handleReset();
      resetComplete();
    }
  }, [shouldResetForm]);

  function handleBackClick(e) {
    props.onPrevious();
  }

  function handleAllReset() {
    handleReset();
    hasReset();
  }

  function getLabelForAddButton() {
    let result = "Add";
    if (isEditing) {
      result = "Save";
    }
    return result;
  }

  // --------------------------------------------- AUTO COMPLETE
  function onSelectedLocation(address, lat, lng) {
    const zipLast4 = address.postal_code_suffix
      ? `-${address.postal_code_suffix}`
      : "";
    const lineOne = `${address.street_number} ${address.route}`;
    const zip = `${address.postal_code}${zipLast4}`;
    const stateObj = findStateId(address.administrative_area_level_1);

    props.handleAutoFill({
      id: props.location.id,
      tempLocationId: props.location.tempLocationId,
      locationTypeId: values.locationTypeId,
      lineOne,
      lineTwo: values.lineTwo ? values.lineTwo : "",
      city: address.locality,
      stateName: address.administrative_area_level_1,
      stateId: stateObj ? stateObj.id : null,
      zip,
      latitude: lat,
      longitude: lng,
    });
  }

  function findStateId(stateName) {
    stateName = stateName.trim();
    const result = props.references.states.find((singleState) => {
      return singleState.name === stateName || singleState.code === stateName;
    });
    return result;
  }

  // --------------------------------------------- SELECT MENUS
  function getLocationTypesMenu() {
    return props.references
      ? props.references.locationTypes.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))
      : defaultTypesList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ));
  }

  function getStatesMenu() {
    return props.references
      ? props.references.states.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {`${option.code} - ${option.name}`}
          </MenuItem>
        ))
      : defaultTypesList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ));
  }

  // --------------------------------------------- RENDER
  return (
    <form onSubmit={handleSubmit} style={{ alignItems: "center" }}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          {/* --------------------------------------------auto complete */}
          <Grid container spacing={1}>
            <Grid item xs={8} lg={8}>
              <div>
                <AutoCompletePracticeLocation
                  onSelectedLocation={onSelectedLocation}
                />
              </div>
            </Grid>
          </Grid>
          {/* --------------------------------------------locationTypeId */}
          <Grid container spacing={1}>
            <Grid item xs={8} lg={8}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  id="locationTypeId-input-label"
                  style={{ marginLeft: "15px" }}
                >
                  Location type fixed:
                </InputLabel>
                <Select
                  labelId="locationTypeId-input-label"
                  name="locationTypeId"
                  value={values.locationTypeId ? values.locationTypeId : 2}
                  inputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                  onChange={handleChange}
                  style={{ marginLeft: "8px" }}
                >
                  {getLocationTypesMenu()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* --------------------------------------------lineOne */}
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                className={`${
                  errors.lineOne && touched.lineOne && "is-invalid"
                } m-3`}
                label="Practice street address"
                name="lineOne"
                error={touched.lineOne && Boolean(errors.lineOne)}
                value={values.lineOne ? values.lineOne : ""}
                placeholder={`101 First St`}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.lineOne && errors.lineOne}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {/* --------------------------------------------lineTwo */}
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                className={`form-control ${
                  errors.latitude && touched.latitude && "is-invalid"
                } m-3`}
                label="Practice address additional info (optional)"
                name="lineTwo"
                error={touched.lineTwo && Boolean(errors.lineTwo)}
                value={values.lineTwo ? values.lineTwo : ""}
                placeholder={`Suite No 202`}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                helperText={touched.lineTwo && errors.lineTwo}
              />
            </Grid>
          </Grid>
          {/* --------------------------------------------city */}
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                className={`${errors.city && touched.city && "is-invalid"} m-3`}
                label="City"
                name="city"
                error={touched.city && Boolean(errors.city)}
                value={values.city ? values.city : ""}
                placeholder={`Culver City`}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.city && errors.city}
                variant="outlined"
              />
            </Grid>
            {/* --------------------------------------------stateId */}
            <Grid item xs={8}>
              <FormControl
                className={classes.formControl}
                error={Boolean(errors.stateId) && touched.stateId}
              >
                <InputLabel
                  id="stateId-input-label"
                  style={{ marginLeft: "15px" }}
                >
                  Select a state:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  name="stateId"
                  value={values.stateId}
                  onChange={handleChange}
                  style={{ marginLeft: "8px" }}
                  variant="filled"
                >
                  {getStatesMenu()}
                </Select>
                <FormHelperText>{errors.stateId}</FormHelperText>
              </FormControl>
            </Grid>
            {/* --------------------------------------------zip */}
            <Grid item xs={8}>
              <TextField
                fullWidth
                className={`form-control ${
                  errors.zip && touched.zip && "is-invalid"
                } m-3`}
                label="Postal zipcode"
                name="zip"
                error={touched.zip && Boolean(errors.zip)}
                value={values.zip ? values.zip : ""}
                placeholder={"00000-0000"}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.zip && errors.zip}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {/* --------------------------------------------latitude */}
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <TextField
                hidden={true}
                className={`form-control ${
                  errors.latitude && touched.latitude && "is-invalid"
                } m-3`}
                label="Provider latitude"
                name="latitude"
                type="number"
                step="0.00000000000001"
                error={touched.latitude && Boolean(errors.latitude)}
                value={values.latitude ? values.latitude : 0}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.latitude && errors.latitude}
                inputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Grid>
            {/* --------------------------------------------longitude */}
            <Grid item xs={8}>
              <TextField
                hidden={true}
                className={`form-control ${
                  errors.longitude && touched.longitude && "is-invalid"
                } m-3`}
                label="Provider longitude"
                name="longitude"
                type="number"
                step="0.00000000000001"
                error={touched.longitude && Boolean(errors.longitude)}
                value={values.longitude ? values.longitude : 0}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.longitude && errors.longitude}
                inputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Grid>
          </Grid>

          {/* --------------------------------------------buttons */}
          <Grid container spacing={1} style={{ marginLeft: "10px" }}>
            <Grid item>
              <Button
                type="button"
                className="btn btn-secondary"
                variant="contained"
                onClick={handleBackClick}
                color="secondary"
                disabled={isSubmitting || cantBack}
              >
                {backLabel}
              </Button>
            </Grid>
            {/* ------------------ Submit ( Add / Save ) */}
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ marginLeft: "10px" }}
              >
                {getLabelForAddButton()}
              </Button>
            </Grid>
            {/* ------------------ Reset */}
            <Grid item>
              <Button
                type="button"
                className="btn btn-secondary text-danger"
                variant="outlined"
                onClick={handleAllReset}
                disabled={isSubmitting}
                style={{ marginLeft: "15px" }}
              >
                Clear
              </Button>
            </Grid>
            {/* ------------------ Skip */}
            <Grid item>
              <div style={{ marginBottom: "10px" }}>
                <Tooltip title="Discard current form data and advance" arrow>
                  <span>
                    <Button
                      type="button"
                      color="secondary"
                      variant="contained"
                      onClick={onDiscard}
                      disabled={isSubmitting || props.listCount < 1}
                      style={{ marginLeft: "10px" }}
                    >
                      {nextLabel}
                    </Button>
                  </span>
                </Tooltip>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    id: props.location.id,
    tempLocationId: props.location.tempLocationId,
    locationTypeId: props.location.locationTypeId,
    lineOne: props.location.lineOne,
    lineTwo: props.location.lineTwo,
    city: props.location.city,
    zip: props.location.zip,
    stateId: props.location.stateId,
    latitude: props.location.latitude,
    longitude: props.location.longitude,
  }),

  enableReinitialize: true,
  validationSchema: locationDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onAddorSave({
      id: props.location.id, // pass thru no edit
      tempLocationId: props.location.tempLocationId, // pass thru no edit
      locationTypeId: values.locationTypeId,
      lineOne: values.lineOne,
      lineTwo: values.lineTwo === "" ? null : values.lineTwo,
      city: values.city,
      stateId: values.stateId,
      zip: values.zip === "" ? null : values.zip,
      latitude: values.latitude,
      longitude: values.longitude,
    });
  },
})(LocationDetails);

LocationDetails.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number,
    tempLocationId: PropTypes.number,
    locationTypeId: PropTypes.number,
    lineOne: PropTypes.string,
    lineTwo: PropTypes.string,
    city: PropTypes.string,
    stateId: PropTypes.number,
    zip: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  references: PropTypes.shape({
    facilityTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
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
    ),
  }),

  // Set instructions and current subform title on Outer Component
  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,
  // array manager component props
  onAddorSave: PropTypes.func,
  onPrevious: PropTypes.func,
  onDiscard: PropTypes.func,
  resetComplete: PropTypes.func.isRequired,
  shouldResetForm: PropTypes.bool.isRequired,
  hasReset: PropTypes.func.isRequired, // form tells array manager to cancel edit
  isEditing: PropTypes.bool.isRequired,
  listCount: PropTypes.number.isRequired,
  handleAutoFill: PropTypes.func,
  // withFormik props
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  // Loki props
  backLabel: PropTypes.string,
  cantBack: PropTypes.bool,
  nextLabel: PropTypes.string,

  // Formik mapPropsToValues
  values: PropTypes.shape({
    id: PropTypes.number,
    tempLocationId: PropTypes.number,
    locationTypeId: PropTypes.number,
    lineOne: PropTypes.string,
    lineTwo: PropTypes.string,
    city: PropTypes.string,
    stateId: PropTypes.number,
    zip: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  touched: PropTypes.shape({
    id: PropTypes.bool,
    tempLocationId: PropTypes.bool,
    locationTypeId: PropTypes.bool,
    lineOne: PropTypes.bool,
    lineTwo: PropTypes.bool,
    city: PropTypes.bool,
    stateId: PropTypes.bool,
    zip: PropTypes.bool,
    latitude: PropTypes.bool,
    longitude: PropTypes.bool,
  }),
  errors: PropTypes.shape({
    id: PropTypes.string,
    tempLocationId: PropTypes.string,
    locationTypeId: PropTypes.string,
    lineOne: PropTypes.string,
    lineTwo: PropTypes.string,
    city: PropTypes.string,
    stateId: PropTypes.string,
    zip: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
  }),
};
