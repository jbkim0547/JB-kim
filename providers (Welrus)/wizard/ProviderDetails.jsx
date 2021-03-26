import { React, useEffect, Fragment } from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import { WrapperSimple } from "../../../layouts";
import { providerDetailsSchema } from "../../../schema/providerDetailsSchema";
import {
  Button,
  Checkbox,
  Grid,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetails");

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
  "First, enter your basic provider details. Practices and their locations will be covered next";
const subTitleText = "Enter your provider details here";

const defaultTypesList = [];

const ProviderDetails = (props) => {
  _logger("rendering", props);

  const classes = useStyles();

  const {
    // Formik HOC props
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,

    // Loki props
    backLabel,
    nextLabel,
    onBack,
    cantBack,
  } = props;

  useEffect(() => {
    props.setTopText(subTitleText);
    props.setSubHeadingText(subHeadingText);
  });

  function getTitleTypesMenu() {
    return props.references
      ? props.references.titleTypes.map((option) => (
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

  function handleBack(event) {
    props.mergeNow({
      titleTypeId: values.titleTypeId,
      genderTypeId: values.genderTypeId,
      phone: values.phone,
      fax: values.fax,
      networks: values.networks,
      npi: values.npi,
      genderAccepted: values.genderAccepted,
      isAccepting: values.isAccepting,
      userProfileId: values.userProfileId,
    });
    onBack();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Fragment>
        <WrapperSimple sectionHeading="Basic Details">
          <Grid item xs={12} lg={6}>
            {/* --------------------------------------------title */}
            <FormControl
              className={classes.formControl}
              style={{ marginBottom: "15px" }}
            >
              <InputLabel
                id="title-type-input-label"
                className="display-1 mb-2"
                style={{ marginLeft: "10px", paddingBottom: "10px" }}
              >
                {`Provider's title`}
              </InputLabel>
              <Select
                labelId="title-type-input-label"
                name="titleTypeId"
                fullWidth
                value={values.titleTypeId ? values.titleTypeId : 0}
                onChange={handleChange}
                error={touched.titleTypeId && Boolean(errors.titleTypeId)}
                style={{ marginLeft: "10px" }}
              >
                {getTitleTypesMenu()}
              </Select>
            </FormControl>

            {/* --------------------------------------------gender type */}
            <FormControl
              className={classes.formControl}
              style={{ marginBottom: "10px", marginBottom: "5px" }}
            >
              <InputLabel
                id="title-type-input-label"
                style={{ marginLeft: "25px" }}
              >
                {`Provider's gender`}
              </InputLabel>
              <Select
                labelId="title-type-input-label"
                name="genderTypeId"
                fullWidth
                value={values.genderTypeId ? values.genderTypeId : 0}
                onChange={handleChange}
                error={touched.genderTypeId && Boolean(errors.genderTypeId)}
                style={{ marginLeft: "25px" }}
              >
                {getGenderTypesMenu()}
              </Select>
            </FormControl>
            <br />

            {/* --------------------------------------------phone */}
            <TextField
              className={`form-control ${
                errors.phone && touched.phone && "is-invalid"
              } m-3`}
              label="Phone"
              name="phone"
              error={touched.phone && Boolean(errors.phone)}
              value={values.phone ? values.phone : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.phone && errors.phone}
              variant="outlined"
            />

            {/* --------------------------------------------fax */}
            <TextField
              className={` ${errors.fax && touched.fax && "is-invalid"} m-3`}
              name="fax"
              label="Fax"
              error={touched.fax && Boolean(errors.fax)}
              value={values.fax ? values.fax : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.fax && errors.fax}
              variant="outlined"
            />

            {/* --------------------------------------------networks */}
            <TextField
              fullWidth
              className={`form-control ${
                errors.networks && touched.networks && "is-invalid"
              } m-3`}
              label="Networks"
              name="networks"
              error={touched.networks && Boolean(errors.networks)}
              value={values.networks ? values.networks : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.networks && errors.networks}
              variant="outlined"
            />

            {/* --------------------------------------------npi */}
            <TextField
              fullWidth
              className={`form-control ${
                Boolean(errors.npi) && touched.npi && "is-invalid"
              } m-3`}
              type="text"
              label="NPI"
              name="npi"
              error={touched.npi && Boolean(errors.npi)}
              value={values.npi ? values.npi : ""}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.npi && errors.npi}
              variant="outlined"
            />

            {/* --------------------------------------------gender accepted */}
            <FormControl className={classes.formControl}>
              <InputLabel
                id="title-type-input-label"
                style={{ marginLeft: "10px", paddingBottom: "10px" }}
              >
                Gender accepted as patients
              </InputLabel>
              <Select
                fullWidth
                labelId="title-type-input-label"
                name="genderAccepted"
                value={values.genderAccepted ? values.genderAccepted : 0}
                onChange={handleChange}
                error={touched.genderAccepted && Boolean(errors.genderAccepted)}
                style={{ marginLeft: "10px" }}
              >
                {getGenderTypesMenu()}
              </Select>
            </FormControl>

            {/* --------------------------------------------isAccepting */}
            <div className="m-3 ">
              <FormControlLabel
                control={
                  <Checkbox
                    name="isAccepting"
                    checked={values.isAccepting ? values.isAccepting : false}
                    onChange={handleChange}
                  />
                }
                label={`Currently accepting new patients? ${
                  values.isAccepting ? " - Yes" : " - Not at this time"
                }`}
              />
            </div>

            {/* --------------------------------------------buttons */}
            <div style={{ marginLeft: "15px" }}>
              <Button
                type="button"
                color="secondary"
                variant="contained"
                className="btn btn-secondary"
                onClick={handleBack}
                disabled={isSubmitting || cantBack || !isValid}
              >
                {backLabel}
              </Button>
              <span>&nbsp;&nbsp; </span>
              <Button
                type="submit"
                className="btn btn-primary ml-1"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
              >
                {nextLabel}
              </Button>
              <span>&nbsp;&nbsp; </span>
              <Button
                type="button"
                color="secondary"
                variant="outlined"
                className="m-2 btn text-danger"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Clear
              </Button>
            </div>
          </Grid>
        </WrapperSimple>
      </Fragment>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    titleTypeId: props.providerDetails.titleTypeId,
    genderTypeId: props.providerDetails.genderTypeId,
    phone: props.providerDetails.phone,
    fax: props.providerDetails.fax,
    networks: props.providerDetails.networks,
    npi: props.providerDetails.npi,
    genderAccepted: props.providerDetails.genderAccepted,
    isAccepting: props.providerDetails.isAccepting,
    userProfileId: props.providerDetails.userProfileId,
  }),

  enableReinitialize: true,
  validationSchema: providerDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      titleTypeId: values.titleTypeId,
      genderTypeId: values.genderTypeId,
      phone: values.phone,
      fax: values.fax,
      networks: values.networks,
      npi: values.npi,
      genderAccepted: values.genderAccepted,
      isAccepting: values.isAccepting,
      userProfileId: props.providerDetails.userProfileId, // pass through, no edit
    });
  },
})(ProviderDetails);

ProviderDetails.propTypes = {
  references: PropTypes.shape({
    titleTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    genderTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
  mergeNow: PropTypes.func.isRequired,

  // Set instructions and current subform title on Outer Component
  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,
  // withFormik props
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  // Loki props
  backLabel: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  cantBack: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,

  // Formik mapPropsToValues
  values: PropTypes.shape({
    titleTypeId: PropTypes.number,
    genderTypeId: PropTypes.number,
    phone: PropTypes.string,
    fax: PropTypes.string,
    networks: PropTypes.string,
    npi: PropTypes.string,
    genderAccepted: PropTypes.number,
    isAccepting: PropTypes.bool,
    userProfileId: PropTypes.number,
  }),
  touched: PropTypes.shape({
    titleTypeId: PropTypes.bool,
    genderTypeId: PropTypes.bool,
    phone: PropTypes.bool,
    fax: PropTypes.bool,
    networks: PropTypes.bool,
    npi: PropTypes.bool,
    genderAccepted: PropTypes.bool,
    isAccepting: PropTypes.bool,
    userProfileId: PropTypes.bool,
  }),
  errors: PropTypes.shape({
    titleTypeId: PropTypes.string,
    genderTypeId: PropTypes.string,
    phone: PropTypes.string,
    fax: PropTypes.string,
    networks: PropTypes.string,
    npi: PropTypes.string,
    genderAccepted: PropTypes.string,
    isAccepting: PropTypes.string,
    userProfileId: PropTypes.string,
  }),
};
