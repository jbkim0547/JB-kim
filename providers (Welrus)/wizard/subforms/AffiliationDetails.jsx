import { React, useEffect } from "react";
import { withFormik, ErrorMessage, Field, FieldArray } from "formik";
import PropTypes from "prop-types";
import { affiliationDetailsSchema } from "../../../../schema/affiliationDetailsSchema";

import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Select } from "formik-material-ui";

import debug from "sabio-debug";
const _logger = debug.extend("AffiliationDetails");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const subHeadingText = "Enter the details for your medical Affiliations.";
const subTitleText = "Enter your Medical Affiliations here";

const defaultTypesList = [];

const AffiliationDetails = (props) => {
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

  function getAffiliationTypesMenu() {
    return props.references
      ? props.references.affiliationTypes.map((option) => (
          <MenuItem key={`aftsid_${option.id}`} value={option.id}>
            {option.name}
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
        <Grid
          item
          style={{
            paddingTop: "80px",
            marginLeft: "15px",
            paddingBottom: "25px",
          }}
        >
          <Button
            type="button"
            className="btn btn-secondary"
            variant="outlined"
            onClick={handleBack}
            disabled={isSubmitting || cantBack || !isValid}
          >
            {backLabel}
          </Button>
        </Grid>
        <Grid
          item
          style={{
            paddingTop: "80px",
            marginLeft: "15px",
            paddingBottom: "25px",
          }}
        >
          <Button
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
      affiliations: values.affiliations,
    });
    onBack();
  }

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <Card>
        <Grid container>
          <Grid item xs={12}>
            {/* -------------------------------------------top buttons */}
            {values.affiliations && values.affiliations.length > 2 ? (
              getBackNextButtons()
            ) : (
              <div className="m-3 font-weight-bold text-align-center">
                Enter Affiliation details here:
              </div>
            )}

            <FieldArray
              name="affiliations"
              render={(arrayHelpers) => (
                <div>
                  {values.affiliations && values.affiliations.length > 0 ? (
                    values.affiliations.map((affiliation, index) => (
                      <div key={index}>
                        {/* -------------------------------------------affiliation name */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              className={`form-control ${
                                errors?.affiliations?.[index]?.name &&
                                touched?.affiliations?.[index]?.name &&
                                "is-invalid"
                              } m-3`}
                              label="Name your affiliation"
                              name={`affiliations.${index}.name`}
                              error={
                                touched?.affiliations?.[index]?.name &&
                                Boolean(errors?.affiliations?.[index]?.name)
                              }
                              value={
                                values.affiliations[index]
                                  ? values.affiliations[index].name
                                  : ""
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched?.affiliations?.[index]?.name &&
                                errors?.affiliations?.[index]?.name
                              }
                            />
                          </Grid>
                          {/* ------------------------------------------- ADD/Remove buttons on form */}
                          <Grid item>
                            <Tooltip
                              title={
                                isValid
                                  ? "Insert affiliation above this row"
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
                                      affiliationTypeId: 0,
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

                        {/* ------------------------------------------- affiliationTypeId */}
                        <Grid container spacing={1}>
                          <Grid>
                            <FormControl
                              className={`${classes.formControl} ml-3`}
                              error={Boolean(
                                errors?.affiliations?.[index]?.affiliationTypeId
                              )}
                            >
                              <InputLabel htmlFor="expMonth">
                                Affiliation Type
                              </InputLabel>
                              <Field
                                component={Select}
                                name={`affiliations.${index}.affiliationTypeId`}
                                value={
                                  values.affiliations[index].affiliationTypeId
                                    ? values.affiliations[index]
                                        .affiliationTypeId
                                    : 0
                                }
                              >
                                {getAffiliationTypesMenu()}
                              </Field>
                              <FormHelperText>
                                {
                                  errors?.affiliations?.[index]
                                    ?.affiliationTypeId
                                }
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </div>
                    ))
                  ) : (
                    <div>
                      <Grid container justify="center" spacing={1}>
                        <Grid
                          item
                          xs={2}
                          style={{ marginLeft: "90px", paddingTop: "40px" }}
                        >
                          <Button
                            type="button"
                            color="primary"
                            variant="contained"
                            onClick={() => arrayHelpers.push({})}
                          >
                            Add an affiliation
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </div>
              )}
            />

            {/* -------------------------------------------bottom buttons */}
            {getBackNextButtons()}
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    affiliations: props.affiliations,
  }),

  enableReinitialize: true,
  validationSchema: affiliationDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      affiliations: values.affiliations,
    });
  },
})(AffiliationDetails);

AffiliationDetails.propTypes = {
  affiliations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      affiliationTypeId: PropTypes.number,
    })
  ).isRequired,

  references: PropTypes.shape({
    affiliationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
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
    affiliations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        affiliationTypeId: PropTypes.number,
      })
    ),
  }),
  touched: PropTypes.shape({
    affiliations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.bool,
        affiliationTypeId: PropTypes.bool,
      })
    ),
  }),
  errors: PropTypes.shape({
    affiliations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        affiliationTypeId: PropTypes.string,
      })
    ),
  }),
};
