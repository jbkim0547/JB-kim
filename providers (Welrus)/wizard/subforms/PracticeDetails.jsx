import { React, useEffect } from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import { practiceDetailsSchema } from "../../../../schema/practiceDetailsSchema";

import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";

import debug from "sabio-debug";
const _logger = debug.extend("PracticeDetails");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
  },
}));

const subHeadingText = "Enter your practice details here:";
const subTitleText =
  "Enter the details of a particular practice. The same location may be used for more than one practice";

const defaultTypesList = [];

const PracticeDetails = (props) => {
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

    // array manager integration
    onDiscard,
    shouldResetForm,
    resetComplete,
    hasReset,
    isEditing,
  } = props;

  useEffect(() => {
    props.setTopText(subTitleText);
    props.setSubHeadingText(subHeadingText);
  });

  useEffect(() => {
    _logger("useEffect reset", shouldResetForm);
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

  function getLocationBasics(aLocation) {
    let result = "";
    if (aLocation) {
      const lineTwo = aLocation.lineTwo ? ` ${aLocation.lineTwo}` : "";
      result = `${aLocation.lineOne}${lineTwo} ${aLocation.city}`;
    }
    return result;
  }

  // --------------------------------------------- SELECT MENUS
  function getGenderTypesMenu() {
    return props.references
      ? props.references.genderTypes.map((option) => (
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

  function getLocationsMenu() {
    return props.locations
      ? props.locations.map((option) => (
          <MenuItem key={option.tempLocationId} value={option.tempLocationId}>
            {getLocationBasics(option)}
          </MenuItem>
        ))
      : defaultTypesList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ));
  }

  function getFacilityTypesMenu() {
    return props.references
      ? props.references.facilityTypes.map((option) => (
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

  function getLabelForAddButton() {
    let result = "Add";
    if (isEditing) {
      result = "Save";
    }
    return result;
  }

  // --------------------------------------------- RENDER
  return (
    <form onSubmit={handleSubmit} className="p-1">
      <Card>
        <Grid container>
          <Grid item xs={12}>
            {/* --------------------------------------------name */}
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  className={`${
                    errors.name && touched.name && "is-invalid"
                  } ml-3`}
                  label="Practice name (optional):"
                  name="name"
                  error={touched.name && Boolean(errors.name)}
                  value={values.name ? values.name : ""}
                  placeholder="My Practice Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                  style={{ paddingTop: "15px" }}
                />
              </Grid>
            </Grid>
            {/* --------------------------------------------location */}
            <Grid container spacing={1}>
              <Grid item>
                <FormControl
                  className={`${classes.formControl} ml-3`}
                  error={
                    Boolean(errors.tempLocationId) && touched.tempLocationId
                  }
                >
                  <InputLabel id="tempLocationId-input-label">
                    Select the location of your practice:
                  </InputLabel>
                  <Select
                    labelId="tempLocationId-input-label"
                    name="tempLocationId"
                    value={values.tempLocationId}
                    defaultValue={5}
                    onChange={handleChange}
                  >
                    {getLocationsMenu()}
                  </Select>
                  <FormHelperText>{errors.tempLocationId}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            {/* --------------------------------------------facilityTypeId */}
            <Grid container spacing={1}>
              <Grid item>
                <FormControl
                  className={`${classes.formControl} ml-3`}
                  error={
                    Boolean(errors.facilityTypeId) && touched.facilityTypeId
                  }
                >
                  <InputLabel id="facilityTypeId-input-label">
                    Select a facility type:
                  </InputLabel>
                  <Select
                    labelId="facilityTypeId-input-label"
                    name="facilityTypeId"
                    value={values.facilityTypeId}
                    onChange={handleChange}
                    errors={errors.facilityTypeId}
                  >
                    {getFacilityTypesMenu()}
                  </Select>
                  <FormHelperText>{errors.facilityTypeId}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            {/* --------------------------------------------phone */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  className={`${
                    errors.phone && touched.phone && "is-invalid"
                  } ml-3`}
                  label="Practice phone:"
                  name="phone"
                  error={touched.phone && Boolean(errors.phone)}
                  value={values.phone ? values.phone : ""}
                  placeholder="555-000-0001"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  helperText={touched.phone && errors.phone}
                />
              </Grid>

              {/* --------------------------------------------fax */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  className={` ${errors.fax && touched.fax && "is-invalid"}`}
                  label="Practice fax (optional):"
                  name="fax"
                  error={touched.fax && Boolean(errors.fax)}
                  value={values.fax ? values.fax : ""}
                  placeholder="555-000-0000"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.fax && errors.fax}
                  variant="outlined"
                  style={{ marginLeft: "18px" }}
                />
              </Grid>
            </Grid>

            {/* --------------------------------------------email */}
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  className={` ${
                    errors.email && touched.email && "is-invalid"
                  } ml-3`}
                  label="Practice email (optional)"
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  value={values.email ? values.email : ""}
                  placeholder="mypractice@example.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                  style={{ paddingTop: "15px" }}
                />
              </Grid>
            </Grid>

            {/* --------------------------------------------siteUrl */}
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  className={`${
                    errors.siteUrl && touched.siteUrl && "is-invalid"
                  } ml-3`}
                  label="Practice siteUrl (optional)"
                  name="siteUrl"
                  error={touched.siteUrl && Boolean(errors.siteUrl)}
                  value={values.siteUrl ? values.siteUrl : ""}
                  placeholder="https://www.mypractice.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.siteUrl && errors.siteUrl}
                  variant="outlined"
                  style={{ paddingTop: "15px" }}
                />
              </Grid>
            </Grid>

            {/* --------------------------------------------adaAccessible */}
            <Grid container spacing={1}>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="adaAccessible"
                        checked={values.adaAccessible}
                        onChange={handleChange}
                        style={{ marginLeft: "10px" }}
                      />
                    }
                    label={`ADA accessible location? ${
                      values.adaAccessible ? " - Yes" : " - Not at this time"
                    }`}
                  />
                </FormControl>
                {/* --------------------------------------------insuranceAccepted */}
                <FormControl className={classes.formControl}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="insuranceAccepted"
                        checked={values.insuranceAccepted}
                        onChange={handleChange}
                        style={{ marginLeft: "10px" }}
                      />
                    }
                    label={`Accepting insurance? ${
                      values.insuranceAccepted
                        ? " - Yes"
                        : " - Not at this time"
                    }`}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* --------------------------------------------genderAccepted */}
            <Grid container spacing={1}>
              <Grid item>
                <FormControl className={`${classes.formControl}`}>
                  <InputLabel
                    id="genderAccepted-input-label"
                    style={{ marginLeft: "5px" }}
                  >
                    Choose a genderAccepted type:
                  </InputLabel>
                  <Select
                    labelId="genderAccepted-input-label"
                    name="genderAccepted"
                    value={values.genderAccepted ? values.genderAccepted : 0}
                    onChange={handleChange}
                    sytle={{ marginLeft: "20px" }}
                  >
                    {getGenderTypesMenu()}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* --------------------------------------------buttons */}
            <Grid container justify="center" spacing={3}>
              <Grid item>
                <div>
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    variant="contained"
                    color="secondary"
                    onClick={handleBackClick}
                    disabled={isSubmitting || cantBack}
                  >
                    {backLabel}
                  </Button>
                </div>
              </Grid>
              {/* ------------------ */}
              <Grid item>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {getLabelForAddButton()}
                  </Button>
                </div>
              </Grid>
              {/* ------------------ */}
              <Grid item>
                <div>
                  <Button
                    type="button"
                    className="btn btn-secondary ml-1 text-danger"
                    variant="outlined"
                    onClick={handleAllReset}
                    disabled={isSubmitting}
                  >
                    Clear
                  </Button>
                </div>
              </Grid>
              {/* ------------------ */}
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
      </Card>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    tempLocationId: props.practice.tempLocationId,
    name: props.practice.name,
    facilityTypeId: props.practice.facilityTypeId,
    phone: props.practice.phone,
    fax: props.practice.fax,
    email: props.practice.email,
    siteUrl: props.practice.siteUrl,
    adaAccessible: props.practice.adaAccessible,
    insuranceAccepted: props.practice.insuranceAccepted,
    genderAccepted: props.practice.genderAccepted,
    id: props.practice.id,
    tempPracticeId: props.practice.tempPracticeId,
  }),

  enableReinitialize: true,
  validationSchema: practiceDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onAddorSave({
      tempLocationId: values.tempLocationId,
      name: values.name === "" ? null : values.name,
      facilityTypeId: values.facilityTypeId,
      phone: values.phone,
      fax: values.fax === "" ? null : values.fax,
      email: values.email === "" ? null : values.email,
      siteUrl: values.siteUrl === "" ? null : values.siteUrl,
      adaAccessible: values.adaAccessible,
      insuranceAccepted: values.insuranceAccepted,
      genderAccepted:
        values.genderAccepted === 0 ? null : values.genderAccepted,
      id: props.practice.id, // pass through, no edit
      tempPracticeId: props.practice.tempPracticeId, // pass through, no edit
    });
  },
})(PracticeDetails);

PracticeDetails.propTypes = {
  practice: PropTypes.shape({
    tempLocationId: PropTypes.number.isRequired,
    scheduleId: PropTypes.number,
    name: PropTypes.string,
    facilityTypeId: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    fax: PropTypes.string,
    email: PropTypes.string,
    siteUrl: PropTypes.string,
    adaAccessible: PropTypes.bool.isRequired,
    insuranceAccepted: PropTypes.bool.isRequired,
    genderAccepted: PropTypes.number,
    id: PropTypes.number,
    tempPracticeId: PropTypes.number,
  }).isRequired,
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
    ),
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tempLocationId: PropTypes.number,
      locationTypeId: PropTypes.number,
      lineOne: PropTypes.string,
      lineTwo: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string,
      stateId: PropTypes.number,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ).isRequired,

  // Set instructions and current subform title on Outer Component
  setTopText: PropTypes.func.isRequired,
  setSubHeadingText: PropTypes.func.isRequired,
  // array manager component props
  onAddorSave: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  resetComplete: PropTypes.func.isRequired,
  shouldResetForm: PropTypes.bool.isRequired,
  hasReset: PropTypes.func.isRequired, // form tells manager to cancel edit
  isEditing: PropTypes.bool.isRequired,
  listCount: PropTypes.number.isRequired,

  // withFormik props
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // Loki props
  backLabel: PropTypes.string.isRequired,
  cantBack: PropTypes.bool.isRequired,
  nextLabel: PropTypes.string.isRequired,

  // Formik mapPropsToValues
  values: PropTypes.shape({
    tempLocationId: PropTypes.number,
    name: PropTypes.string,
    facilityTypeId: PropTypes.number,
    phone: PropTypes.string,
    fax: PropTypes.string,
    email: PropTypes.string,
    siteUrl: PropTypes.string,
    adaAccessible: PropTypes.bool,
    insuranceAccepted: PropTypes.bool,
    genderAccepted: PropTypes.number,
    id: PropTypes.number,
    tempPracticeId: PropTypes.number,
  }).isRequired,
  touched: PropTypes.shape({
    tempLocationId: PropTypes.bool,
    name: PropTypes.bool,
    facilityTypeId: PropTypes.bool,
    phone: PropTypes.bool,
    fax: PropTypes.bool,
    email: PropTypes.bool,
    siteUrl: PropTypes.bool,
    adaAccessible: PropTypes.bool,
    insuranceAccepted: PropTypes.bool,
    genderAccepted: PropTypes.bool,
    id: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    tempLocationId: PropTypes.string,
    name: PropTypes.string,
    facilityTypeId: PropTypes.string,
    phone: PropTypes.string,
    fax: PropTypes.string,
    email: PropTypes.string,
    siteUrl: PropTypes.string,
    adaAccessible: PropTypes.string,
    insuranceAccepted: PropTypes.string,
    genderAccepted: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
