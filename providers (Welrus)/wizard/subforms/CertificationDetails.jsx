import { React, useEffect } from "react";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import { certificationDetailsSchema } from "../../../../schema/certificationDetailsSchema";

import { Button, Card, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import debug from "sabio-debug";
const _logger = debug.extend("CertificationDetails");

const subHeadingText = "Enter the details for your medical Certifications.";
const subTitleText = "Enter your Medical Certifications here";

const defaultTypesList = [];

const CertificationDetails = (props) => {
  _logger("rendering", props);

  const {
    // Formik HOC props
    values,
    errors,
    isValid,
    isSubmitting,
    handleSubmit,
    setFieldValue,

    // Loki props
    backLabel,
    nextLabel,
    cantBack,
    onBack,
  } = props;
  // --------------------------------------------- Special Handlers
  const count = values?.certifications?.length;

  useEffect(() => {
    props.setTopText(subTitleText);
    props.setSubHeadingText(subHeadingText);
  }, []);

  const getCertificationOption = (option) => {
    if (option) {
      return `${option.name}`;
    }
  };

  const getCertValues = (certList) => {
    _logger("certList ", certList);
    let result = [];
    if (props?.references?.certifications && certList?.length > 0) {
      for (let i = 0; i < certList.length; i++) {
        const current = certList[i];

        const found = props.references.certifications.find((item) => {
          return current.certificationId === item.id;
        });

        if (found) {
          found.certificationId = current.certificationId;
          result.push(found);
        }
      }
    }
    return result;
  };

  const handleCertChange = (event, options) => {
    _logger("handleCertChange", event, options);
    let currentList = [...options];

    if (currentList && currentList?.length > 0) {
      for (let i = 0; i < currentList?.length; i++) {
        if (currentList[i]) {
          let current = currentList[i];
          const name = `certifications.${i}.certificationId`;
          const id = i;
          const certificationId = current?.id ?? null;
          current.certificationId = certificationId;
          setFieldValue(name, certificationId, id);
        }
      }
    }
    if (values?.certifications?.length > currentList.length) {
      props.mergeNow({
        certifications: currentList,
      });
    }
  };

  const getErrors = () => {
    let result = null;
    if (errors?.certifications?.length > 0) {
      result = "";
      for (let i = 0; i < errors.certifications.length; i++) {
        result += ` ${errors.certifications[i].certificationId} `;
      }
    }
    return result;
  };

  function getBackNextButtons() {
    return (
      <Grid container justify="center" spacing={1}>
        <Grid
          item
          style={{
            paddingTop: "60px",
            marginLeft: "15px",
            paddingBottom: "25px",
          }}
        >
          <Button
            type="button"
            className="btn btn-secondary"
            variant="outlined"
            onClick={handleBack}
            disabled={isSubmitting || cantBack || !isValid || !count}
          >
            {backLabel}
          </Button>
        </Grid>
        <Grid
          item
          style={{
            paddingTop: "60px",
            marginLeft: "15px",
            paddingBottom: "25px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSubmitting || !isValid || !count}
          >
            {nextLabel}
          </Button>
        </Grid>
      </Grid>
    );
  }

  function handleBack(event) {
    props.mergeNow({
      certifications: values.certifications,
    });
    onBack();
  }

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <Card>
        <Grid container>
          <Grid item xs={12}>
            {/* -------------------------------------------top buttons */}
            <Autocomplete
              className="m-3"
              multiple
              options={
                props.references
                  ? props.references.certifications
                  : defaultTypesList
              }
              getOptionLabel={getCertificationOption}
              onChange={handleCertChange}
              value={getCertValues(values.certifications)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select a certification:"
                  placeholder="Type here..."
                  error={!count || errors.certifications}
                  helperText={
                    (!count && `Enter at least one certification`) ||
                    getErrors()
                  }
                />
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
    certifications: props.certifications,
  }),

  enableReinitialize: true,
  validationSchema: certificationDetailsSchema,

  handleSubmit: (values, { props }) => {
    props.onNext({
      certifications: values.certifications,
    });
  },
})(CertificationDetails);

CertificationDetails.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      certificationId: PropTypes.number,
    })
  ).isRequired,

  references: PropTypes.shape({
    certifications: PropTypes.arrayOf(
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
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        certificationId: PropTypes.number,
        id: PropTypes.number,
      })
    ),
  }),
  touched: PropTypes.shape({
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        certificationId: PropTypes.bool,
      })
    ),
  }),
  errors: PropTypes.shape({
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        certificationId: PropTypes.string,
      })
    ),
  }),
};
