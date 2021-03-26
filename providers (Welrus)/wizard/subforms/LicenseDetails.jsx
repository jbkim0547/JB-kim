import { React, useEffect } from "react";
import { withFormik, FieldArray } from "formik";
import PropTypes from "prop-types";
import { licenseDetailsSchema } from "../../../../schema/licenseDetailsSchema";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import debug from "sabio-debug";
const _logger = debug.extend("LicenseDetails");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 210,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const subHeadingText = "Enter the details for your medical licenses.";
const subTitleText = "Enter your Medical Licenses here";

const defaultTypesList = [];

const LicenseDetails = (props) => {
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
    handleSubmit,
    setFieldValue,

    // Loki props
    backLabel,
    nextLabel,
    cantBack,
    onBack,
  } = props;
  // --------------------------------------------- Special Handlers
  useEffect(() => {
    props.setTopText(subTitleText);
    props.setSubHeadingText(subHeadingText);
  });

  function getToday() {
    return new Date();
  }

  function handleDateChange(index, e) {
    _logger("handleDateChange", index, e);
    setFieldValue(`licenses[${index}]['dateExpires']`, e);
  }

  function getStatesMenu() {
    return props.references
      ? props.references.states.map((option) => (
          <MenuItem key={`pldsid_${option.id}`} value={option.id}>
            {`${option.code} - ${option.name}`}
          </MenuItem>
        ))
      : defaultTypesList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ));
  }

  function getBackNextButtons() {
    return (
      <Grid container justify="center" spacing={1}>
        <Grid item style={{ paddingTop: "60px" }}>
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            type="button"
            className="btn btn-secondary"
            variant="outlined"
            onClick={handleBack}
            disabled={isSubmitting || cantBack || !isValid}
          >
            {backLabel}
          </Button>
        </Grid>
        <Grid item style={{ paddingTop: "60px" }}>
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
          >
            {nextLabel}
          </Button>
        </Grid>
      </Grid>
    );
  }

  function handleBack(event) {
    props.mergeNow({
      licenses: values.licenses,
    });
    onBack();
  }

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <Card>
        <Grid container>
          <Grid item xs={12}>
            {/* -------------------------------------------top buttons */}
            {values.licenses && values.licenses.length > 2 ? (
              getBackNextButtons()
            ) : (
              <div></div>
            )}

            <FieldArray
              name="licenses"
              render={(arrayHelpers) => (
                <div>
                  {values.licenses && values.licenses.length > 0 ? (
                    values.licenses.map((license, index) => (
                      <div key={index}>
                        {/* -------------------------------------------license name */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              className={`form-control ${
                                errors?.licenses?.[index]?.name &&
                                touched?.licenses?.[index]?.name &&
                                "is-invalid"
                              } m-3`}
                              label="Name of Medical License"
                              name={`licenses.${index}.name`}
                              error={
                                touched?.licenses?.[index]?.name &&
                                Boolean(errors?.licenses?.[index]?.name)
                              }
                              value={
                                values.licenses[index]
                                  ? values.licenses[index].name
                                  : ""
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched?.licenses?.[index]?.name &&
                                errors?.licenses?.[index]?.name
                              }
                            />
                          </Grid>
                          {/* ------------------------------------------- buttons on form */}
                          <Grid item>
                            <Tooltip
                              title={
                                isValid
                                  ? "Insert license above this row"
                                  : "Must complete current record before adding a new one"
                              }
                              arrow
                            >
                              <span>
                                <Button
                                  className="ml-5 mt-3"
                                  type="button"
                                  color="secondary"
                                  variant="contained"
                                  onClick={() =>
                                    arrayHelpers.insert(index, {
                                      name: "",
                                      licenseStateId: 0,
                                      licenseNumber: "",
                                      dateExpires: getToday(),
                                    })
                                  }
                                  disabled={isSubmitting || !isValid}
                                >
                                  Add
                                </Button>
                              </span>
                            </Tooltip>
                          </Grid>

                          <Grid item>
                            <Button
                              className="ml-1 mt-3"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              X
                            </Button>
                          </Grid>
                        </Grid>
                        {/* -------------------------------------------license number */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              className={`form-control ${
                                (errors?.licenses?.[index]?.licenseNumber ||
                                  errors?.licenses?.[index]) &&
                                touched?.licenses?.[index]?.licenseNumber &&
                                "is-invalid"
                              } m-3`}
                              label="License Number:"
                              name={`licenses.${index}.licenseNumber`}
                              error={
                                touched?.licenses?.[index]?.licenseNumber &&
                                (Boolean(
                                  errors?.licenses?.[index]?.licenseNumber
                                ) ||
                                  Boolean(errors?.licenses?.[index]))
                              }
                              value={
                                values.licenses[index]
                                  ? values.licenses[index].licenseNumber
                                  : ""
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              variant="outlined"
                              helperText={
                                touched?.licenses?.[index]?.licenseNumber &&
                                errors?.licenses?.[index]?.licenseNumber
                              }
                            />
                          </Grid>
                        </Grid>
                        {/* ------------------------------------------- stateId */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <FormControl
                              className={`${classes.formControl} ml-3`}
                              error={Boolean(
                                errors?.licenses?.[index]?.licenseStateId
                              )}
                            >
                              <InputLabel id="stateId-input-label">
                                Select a state:
                              </InputLabel>
                              <Select
                                labelId="stateId-input-label"
                                name={`licenses.${index}.licenseStateId`}
                                value={
                                  values.licenses[index].licenseStateId
                                    ? values.licenses[index].licenseStateId
                                    : 0
                                }
                                onChange={handleChange}
                              >
                                {getStatesMenu()}
                              </Select>
                              <FormHelperText>
                                {errors?.licenses?.[index]?.licenseStateId}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                        {/* ------------------------------------------- date expires */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                className="ml-3"
                                margin="normal"
                                id="date-picker-dialog"
                                label="License Expiration Date:"
                                format="MM/dd/yyyy"
                                name={`licenses.${index}.dateExpires`}
                                value={
                                  values.licenses[index].dateExpires
                                    ? values.licenses[index].dateExpires
                                    : getToday()
                                }
                                onChange={(e) => handleDateChange(index, e)}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </Grid>
                        </Grid>
                      </div>
                    ))
                  ) : (
                    <Grid container justify="center" spacing={1}>
                      <Grid
                        item
                        xs={2}
                        style={{ marginLeft: "110px", paddingTop: "40px" }}
                      >
                        <Button
                          type="button"
                          color="primary"
                          variant="contained"
                          onClick={() => arrayHelpers.push({})}
                        >
                          Add a license
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </div>
              )}
            />

            {/* -------------------------------------------bottom buttons */}
            {getBackNextButtons()}

            {/* -------------------------------------------END */}
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    licenses: props.licenses,
  }),

  enableReinitialize: true,
  validationSchema: licenseDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      licenses: values.licenses,
    });
  },
})(LicenseDetails);

LicenseDetails.propTypes = {
  licenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      licenseStateId: PropTypes.number,
      licenseNumber: PropTypes.string,
      dateExpires: PropTypes.instanceOf(Date),
    })
  ).isRequired,

  references: PropTypes.shape({
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  mergeNow: PropTypes.func.isRequired,

  // Set instructions and current subform title on Outer Component
  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,

  // withFormik props
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  setFieldValue: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  // Loki props
  backLabel: PropTypes.string,
  cantBack: PropTypes.bool,
  nextLabel: PropTypes.string,
  onBack: PropTypes.func,
  onNext: PropTypes.func,

  // withFormik mapPropsToValues
  values: PropTypes.shape({
    licenses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        licenseStateId: PropTypes.number,
        licenseNumber: PropTypes.string,
        dateExpires: PropTypes.instanceOf(Date),
      })
    ),
  }),
  touched: PropTypes.shape({
    licenses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.bool,
        licenseStateId: PropTypes.bool,
        licenseNumber: PropTypes.bool,
        dateExpires: PropTypes.bool,
      })
    ),
  }),
  errors: PropTypes.shape({
    licenses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        licenseStateId: PropTypes.string,
        licenseNumber: PropTypes.string,
        dateExpires: PropTypes.string,
      })
    ),
  }),
};
