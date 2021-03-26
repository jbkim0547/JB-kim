import { React, useEffect } from "react";
import { withFormik, FieldArray } from "formik";
import PropTypes from "prop-types";
import { specializationDetailsSchema } from "../../../../schema/specializationDetailsSchema";
import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Tooltip,
} from "@material-ui/core";
import AutocompleteSpecializations from "../subforms/formsupport/AutocompleteSpecializations";

import debug from "sabio-debug";
const _logger = debug.extend("SpecializationDetails");

const subHeadingText = "Select from the options your medical specialization.";
const subTitleText = "Enter your Medical Specializations here";

const SpecializationDetails = (props) => {
  _logger("rendering", props);

  const {
    // Formik HOC props
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    handleChange,
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

  const handleSelectChange = (index, option) => {
    _logger("autocomplete select", index, option);
    const name = `specializations.${index}.specializationId`;
    const id = option?.id ? option.id : null;
    setFieldValue(name, id);
  };

  //-------------------------------  Button Actions

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
      specializations: values.specializations,
    });
    onBack();
  }

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <Card>
        <Grid container>
          <Grid item xs={12}>
            {/* -------------------------------------------top buttons */}
            {values.specializations && values.specializations.length > 2 ? (
              getBackNextButtons()
            ) : (
              <div></div>
            )}

            <FieldArray
              name="specializations"
              render={(arrayHelpers) => (
                <div>
                  {values.specializations &&
                  values.specializations.length > 0 ? (
                    values.specializations.map((specialization, index) => (
                      <div key={index}>
                        {/* -------------------------------------------specializationsId autocomplete */}
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <div className="mt-2 ml-3">
                              <AutocompleteSpecializations
                                specializations={
                                  props.references.specializations
                                }
                                value={
                                  values.specializations[index].specializationId
                                    ? values.specializations[index]
                                        .specializationId
                                    : null
                                }
                                changeSpecialization={(option) => {
                                  handleSelectChange(index, option);
                                }} // must be arrow function to capture current index
                                error={
                                  errors?.specializations?.[index]
                                    ?.specializationId
                                }
                                touched={
                                  touched?.specializations?.[index]
                                    ?.specializationId
                                }
                              />
                            </div>
                          </Grid>
                          {/* ------------------------------------------- buttons on form */}
                          <Grid item>
                            <Tooltip
                              title={
                                isValid
                                  ? "Insert specialization above this row"
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
                                      specializationId: 0,
                                      isPrimary: false,
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

                        {/* ------------------------------------------- isPrimary? */}
                        <Grid container spacing={1}>
                          <Grid item xs={5}>
                            <div className="m-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={`specializations.${index}.isPrimary`}
                                    checked={
                                      values.specializations[index].isPrimary
                                    }
                                    onChange={handleChange}
                                  />
                                }
                                label="Check if Primary Specialization."
                              />
                            </div>
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
                          onClick={() =>
                            arrayHelpers.push({
                              specializationId: 0,
                              isPrimary: false,
                            })
                          }
                        >
                          Add a specialization
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
    specializations: props.specializations,
  }),

  enableReinitialize: true,
  validationSchema: specializationDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      specializations: values.specializations,
    });
  },
})(SpecializationDetails);

SpecializationDetails.propTypes = {
  specializations: PropTypes.arrayOf(
    PropTypes.shape({
      specializationId: PropTypes.number,
      isPrimary: PropTypes.bool,
    })
  ).isRequired,

  references: PropTypes.shape({
    specializations: PropTypes.arrayOf(
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
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        specializationId: PropTypes.number,
        isPrimary: PropTypes.bool,
      })
    ),
  }),
  touched: PropTypes.shape({
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        specializationId: PropTypes.bool,
        isPrimary: PropTypes.bool,
      })
    ),
  }),
  errors: PropTypes.shape({
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        specializationId: PropTypes.string,
        isPrimary: PropTypes.string,
      })
    ),
  }),
};
