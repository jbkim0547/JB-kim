import React, { Fragment } from "react";
import debug from "sabio-debug";
import { Formik, Form } from 'formik';
import providerDemoRequestSchema from "../../schema/providerDemoRequestSchema";
import {
  FormControl,
  Grid,
  Card,
  TextField,
  Button,
  Container,
  InputAdornment,
  CardContent,
  Snackbar,
} from '@material-ui/core';
import Alert from "../../assets/components/Alert";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import LocationSearchInput from "components/locations/LocationSearchInput";
import PropTypes from "prop-types"
import providerDemoRequestService from "../../services/providerDemoRequestService";

const _logger = debug.extend("ProviderDemoRequest")

class ProviderDemoRequestForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      snackBarShow: false,
      severity: "success",
      barMessage: "",
      formData: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        npi: "",
        locationTypeId: 3,
        lineOne: "",
        city: "",
        zip: "",
        stateId: "",
        latitude: "",
        longitude: "",
      }
    }
    _logger("props from parent component(RegisterForm):", props)
  }

  onSelectedLocation = (address, lat, lng, setFieldValue) => {
    let streetAdd = `${address.street_number} ${address.route}`;
    let stateList = this.props.props.references.states;

    let returnedState = stateList.findIndex(
      (stateList) => stateList.name === address.administrative_area_level_1
    );

    let selectedState = stateList[returnedState];

    _logger("selectedState:", selectedState);

    setFieldValue("lineOne", streetAdd)
    setFieldValue("city", address.locality)
    setFieldValue("zip", address.postal_code)
    setFieldValue("stateId", selectedState.id)
    setFieldValue("latitude", lat);
    setFieldValue("longitude", lng);
  };

  handleSubmit = (values, { resetForm }) => {
    providerDemoRequestService.demoRequest(values)
      .then(this.demoRequestSuccess)
      .catch(this.demoRequestError);
    _logger("values:", values)

    resetForm(this.state.formData);
  }

  demoRequestSuccess = (response) => {
    _logger("Demo Request Submitted Successfully", response)
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Demo Request Sent!",
        severity: "success"
      }
    }, () => (_logger(`snackbarShow:${this.state.snackBarShow}`)))
  }

  demoRequestError = (err) => {
    _logger("demo request error", err)
    this.setState((prevState) => {
      return {
        ...prevState,
        snackBarShow: true,
        barMessage: "There is an error on your request",
        severity: "error"
      }
    }, () => (_logger(`snackbarShow:${this.state.snackBarShow}`)))
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        snackBarShow: false
      }
    })
  };

  render() {
    return (
      <Fragment>
        <Formik
          initialValues={this.state.formData}
          validationSchema={providerDemoRequestSchema}
          onSubmit={this.handleSubmit}
          enableReinitialize={true}
        >
          {(formikProps) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              handleChange,
              isSubmitting,
              setFieldValue
            } = formikProps;
            return (
              <Container maxWidth="sm">

                <Grid container className="d-flex flex-column ">
                  <Grid className="d-flex align-items-center">
                    <Form
                      autoComplete="off"
                      noValidate
                      onSubmit={handleSubmit}>
                      <Card className="m-0 w-100 p-0 border-0">
                        <CardContent className="p-3">
                          <Grid container spacing={1}>
                            <Grid item xs={12} lg={6} className="d-flex align-items-center">
                              <div className="p-3">
                                <FormControl error={errors.firstName && touched.firstName}>
                                  <TextField
                                    variant="outlined"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                    className="m-2"
                                    id="firstName"
                                    label="First Name"
                                  />
                                </FormControl>
                                <FormControl error={errors.emailAddress && touched.emailAddress}>
                                  <TextField
                                    variant="outlined"
                                    value={values.emailAddress}
                                    onChange={handleChange}
                                    fullWidth
                                    className="m-2"
                                    id="emailAddress"
                                    label="Email Address"
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment>
                                          <EmailTwoToneIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </FormControl>
                                <FormControl error={errors.npi && touched.npi}>
                                  <TextField
                                    variant="outlined"
                                    value={values.npi}
                                    onChange={handleChange}
                                    fullWidth
                                    className="m-2"
                                    id="npi"
                                    label="NPI"
                                    placeholder="Enter 10 digit NPI"
                                  />
                                </FormControl>
                              </div>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                              <div className="p-3">
                                <FormControl error={errors.lastName && touched.lastName}>
                                  <TextField
                                    variant="outlined"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                    className="m-2"
                                    id="lastName"
                                    label="Last Name"
                                  />
                                </FormControl>
                                <FormControl error={errors.phoneNumber && touched.phoneNumber}>
                                  <TextField
                                    variant="outlined"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    className="m-2"
                                    id="phoneNumber"
                                    label="Phone Number"
                                  />
                                </FormControl>
                                <LocationSearchInput onSelectedLocation={(loc, lat, lng) => this.onSelectedLocation(loc, lat, lng, setFieldValue)} />
                              </div>
                            </Grid>
                          </Grid>
                          <div className="text-center">
                            <Button
                              type="submit"
                              className="m-2"
                              variant="contained"
                              size="large"
                              color="primary"
                              disabled={isSubmitting}
                            >
                              Submit &raquo;
                              </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Form>
                  </Grid>
                </Grid>
              </Container>
            );
          }}
        </Formik>
        <Snackbar
          open={this.state.snackBarShow}
          autoHideDuration={3000}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={this.state.severity}>{this.state.barMessage}</Alert>
        </Snackbar>
      </Fragment>
    )
  }
}

ProviderDemoRequestForm.propTypes = {
  props: PropTypes.shape({
    references: PropTypes.shape({
      locationTypes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
      states: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.string,
          id: PropTypes.number.isRequired,
          name: PropTypes.string,
        })
      )
    })
  })
};
export default ProviderDemoRequestForm;