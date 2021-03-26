import { React, useEffect } from "react";
import { withFormik, FieldArray } from "formik";
import PropTypes from "prop-types";
import { expertiseDetailsSchema } from "../../../../schema/expertiseDetailsSchema";

import { Button, Card, Grid, TextField, Tooltip } from "@material-ui/core";

import debug from "sabio-debug";
const _logger = debug.extend("ExpertiseDetails");

const subHeadingText = "Enter the details for your medical Expertise.";
const subTitleText = "Enter your Medical Expertise here";

const ExpertiseDetails = (props) => {
  _logger("rendering", props);

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
      expertise: values.expertise,
    });
    onBack();
  }

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <Card>
        <Grid container>
          <Grid item xs={12}>
            {/* -------------------------------------------top buttons */}
            {values.expertise && values.expertise.length > 2 ? (
              getBackNextButtons()
            ) : (
              <div className="m-3 text-align-center">
                Enter your Expertise details here:
              </div>
            )}

            <FieldArray
              name="expertise"
              render={(arrayHelpers) => (
                <div>
                  {values.expertise && values.expertise.length > 0 ? (
                    values.expertise.map((anExpertise, index) => (
                      <div key={index}>
                        {/* -------------------------------------------expertise name */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              className={`form-control ${
                                errors?.expertise?.[index]?.name &&
                                touched?.expertise?.[index]?.name &&
                                "is-invalid"
                              } m-3`}
                              label="Name of your expertise (100 characters available):"
                              name={`expertise.${index}.name`}
                              error={
                                touched?.expertise?.[index]?.name &&
                                Boolean(errors?.expertise?.[index]?.name)
                              }
                              value={
                                values.expertise[index]
                                  ? values.expertise[index].name
                                  : ""
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched?.expertise?.[index]?.name &&
                                errors?.expertise?.[index]?.name
                              }
                            />
                          </Grid>
                          {/* ------------------------------------------- ADD/Remove buttons on form */}
                          <Grid item>
                            <Tooltip
                              title={
                                isValid
                                  ? "Insert new expertise above this row"
                                  : "Must complete current record before adding a new one"
                              }
                              arrow
                            >
                              <span>
                                <Button
                                  className="ml-5"
                                  type="button"
                                  color="secondary"
                                  variant="contained"
                                  onClick={() =>
                                    arrayHelpers.insert(index, {
                                      name: "",
                                      description: "",
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
                              className="ml-1"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              X
                            </Button>
                          </Grid>
                        </Grid>

                        {/* ------------------------------------------- description */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <TextField
                              fullWidth
                              className={`form-control ${
                                errors?.expertise?.[index]?.description &&
                                touched?.expertise?.[index]?.description &&
                                "is-invalid"
                              } m-3`}
                              label="Describe your expertise (up to 500 characters):"
                              name={`expertise.${index}.description`}
                              error={
                                touched?.expertise?.[index]?.description &&
                                Boolean(errors?.expertise?.[index]?.description)
                              }
                              value={
                                values.expertise[index]
                                  ? values.expertise[index].description
                                  : ""
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              helperText={
                                touched?.expertise?.[index]?.description &&
                                errors?.expertise?.[index]?.description
                              }
                            />
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
                            Add an expertise
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

            {/* -------------------------------------------END */}
          </Grid>
        </Grid>
      </Card>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    expertise: props.expertise,
  }),

  enableReinitialize: true,
  validationSchema: expertiseDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      expertise: values.expertise,
    });
  },
})(ExpertiseDetails);

ExpertiseDetails.propTypes = {
  expertise: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
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
    expertise: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
  touched: PropTypes.shape({
    expertise: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.bool,
        description: PropTypes.bool,
      })
    ),
  }),
  errors: PropTypes.shape({
    expertise: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
};
