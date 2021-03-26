import React from "react";

import {
  Grid,
  InputAdornment,
  Card,
  Button,
  TextField,
  FormGroup,
  FormControl,
  Container,
} from "@material-ui/core";

import { Formik, Field } from "formik";
import toastr from "toastr";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";
import * as contactFormService from "services/contactFormService";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
import PersonIcon from "@material-ui/icons/Person";
import hero3 from "../../assets/images/hero-bg/hero-6.jpg";
import WelrusLogo from "../../assets/images/welrusLogo/plainWelrusLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink as RouterLink } from "react-router-dom";
import Swal from "sweetalert2";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import contactFormSchema from "../../schema/contactFormSchema";

const _logger = debug.extend("ContactForm");

class ContactForm extends React.Component {
  state = {
    formData: {
      name: "",
      email: "",
      title: "",
      message: "",
    },
    message: null,
  };

  componentDidMount() {}

  handleSubmit = (values) => {
    _logger("values", this.state.formData, values);
    contactFormService
      .add(values)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitError);
  };

  onSubmitSuccess = (values) => {
    _logger(values);
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: { ...prevState.formData },
      };
    }, this._finishWizard);
  };
  onSubmitError = (err) => {
    _logger("submit error:", err);
    toastr.error("There was an error with your Submission, Please Try Again.");
  };

  _finishWizard = () => {
    _logger("navigating away");
    this.notifyUserSubmitSuccess();
  };

  notifyUserSubmitSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Thank You!",
      text: "Your submission was successful! We will contact you soon ",

      showConfirmButton: true,
      confirmButtonText: `Ok`,
    }).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={contactFormSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(formikProps) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              handleChange,
              isValid,
              isSubmitting,
            } = formikProps;
            return (
              <div className="app-wrapper bg-white">
                <div className="app-main">
                  <div className="app-content p-0">
                    <div className="app-inner-content-layout--main">
                      <div className="flex-grow-1 w-100 d-flex align-items-center">
                        <div className="bg-composed-wrapper--content">
                          <div className="hero-wrapper bg-composed-wrapper bg-deep-blue min-vh-100">
                            <div className="flex-grow-1 w-100 d-flex align-items-center">
                              <Button
                                size="large"
                                color="secondary"
                                variant="contained"
                                className="text-white btn-go-back"
                                component={RouterLink}
                                to="/"
                              >
                                <span className="btn-wrapper--icon">
                                  <FontAwesomeIcon
                                    icon={["fas", "arrow-left"]}
                                  />
                                </span>
                                <span className="btn-wrapper--label">
                                  Return
                                </span>
                              </Button>
                              <div
                                className="bg-composed-wrapper--image bg-composed-filter-rm opacity-9"
                                style={{
                                  backgroundImage: "url(" + hero3 + ")",
                                }}
                              />

                              <div className="bg-composed-wrapper--bg opacity-5" />
                              <div className="bg-composed-wrapper--content text-center py-5 ">
                                <Grid
                                  item
                                  xl={5}
                                  lg={6}
                                  md={10}
                                  sm={12}
                                  className="mx-auto text-Center text-white"
                                >
                                  <Grid container justify="center" spacing={4}>
                                    <Grid
                                      item
                                      xs={12}
                                      lg={4}
                                      xl={8}
                                      className="px-0 d-none d-lg-flex align-items-center"
                                    >
                                      <img
                                        alt="..."
                                        className="w-100 mx-center img-center"
                                        src={WelrusLogo}
                                      />
                                    </Grid>
                                  </Grid>

                                  <Grid
                                    container
                                    spacing={1}
                                    style={{ justifyContent: "center" }}
                                  >
                                    <contentposition right>
                                      <Grid
                                        item
                                        xs={4}
                                        md={6}
                                        lg={12}
                                        spacing={2}
                                      >
                                        <h1 className=" mb-2 font-weight-bold font-Montserrat-Alternates">
                                          <p>Contact Us</p>
                                        </h1>
                                        <Container
                                          className="text-center"
                                          style={{
                                            display: "inline-flex",
                                            color: "#003366",
                                          }}
                                        >
                                          <h2
                                            className="font-size-lg  mb-2 font-weight-bold font-Montserrat-Alternates"
                                            style={{ color: "#003366" }}
                                          >
                                            <p>
                                              {" "}
                                              Message us by filling out the form
                                              below
                                            </p>

                                            <p>
                                              and we will get back to you as
                                              soon as possible with a response.
                                            </p>
                                            <p>Thank You !</p>
                                          </h2>
                                        </Container>
                                      </Grid>
                                    </contentposition>
                                  </Grid>

                                  <form
                                    onSubmit={handleSubmit}
                                    className={"col-md-10 pt-2"}
                                  >
                                    <Card className="p-5 mx-5 text-center">
                                      <FormGroup>
                                        <FormControl
                                          className="w-100"
                                          error={errors.name && touched.name}
                                        >
                                          <TextField
                                            className="mt-2"
                                            margin="dense"
                                            id="Name"
                                            type="name"
                                            name="name"
                                            autoComplete="off"
                                            label="Name:"
                                            placeholder="Enter your full name"
                                            multiline
                                            variant="outlined"
                                            value={values.name}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  {/* <PermIdentityTwoToneIcon color="disabled"/> */}
                                                  <PersonIcon color="disabled" />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />

                                          <small
                                            id="NameInlineHelp"
                                            className="text-muted"
                                          >
                                            {errors.name && touched.name && (
                                              <span className="input-feedback text-danger">
                                                {errors.name}
                                              </span>
                                            )}
                                          </small>
                                        </FormControl>
                                        <FormControl
                                          className="w-100"
                                          error={errors.email && touched.email}
                                        >
                                          <TextField
                                            className="mt-4"
                                            variant="outlined"
                                            label="Email:"
                                            margin="dense"
                                            placeholder="Enter your email address"
                                            multiline
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="off"
                                            values={values.email}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  <EmailTwoToneIcon color="disabled" />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />

                                          <small
                                            id="EmailInlineHelp"
                                            className="text-muted"
                                          >
                                            {errors.email && touched.email && (
                                              <span className="input-feedback text-danger">
                                                {errors.email}
                                              </span>
                                            )}
                                          </small>
                                        </FormControl>

                                        <FormGroup>
                                          <FormControl
                                            className="w-100"
                                            error={
                                              errors.title && touched.title
                                            }
                                          >
                                            <TextField
                                              className="mt-4"
                                              autoComplete="off"
                                              onChange={handleChange}
                                              margin="dense"
                                              type="title"
                                              id="title"
                                              name="title"
                                              label="Title:"
                                              placeholder="Title:"
                                              multiline
                                              variant="outlined"
                                              value={values.title}
                                              InputProps={{
                                                endAdornment: (
                                                  <InputAdornment>
                                                    <AccountCircleTwoToneIcon color="disabled" />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </FormControl>
                                          <small
                                            id="NameInlineHelp"
                                            className="text-muted"
                                          >
                                            {errors.title && touched.title && (
                                              <span className="input-feedback text-danger">
                                                {errors.title}
                                              </span>
                                            )}
                                          </small>
                                        </FormGroup>

                                        <FormGroup>
                                          <FormControl
                                            className="w-100"
                                            error={
                                              errors.message && touched.message
                                            }
                                          >
                                            <TextField
                                              className="mt-4 "
                                              type="message"
                                              id="message"
                                              name="message"
                                              label="Message"
                                              placeholder="Write message in the Box:"
                                              multiline
                                              rows="5"
                                              variant="outlined"
                                              value={values.message}
                                              onChange={handleChange}
                                              InputProps={{
                                                endAdornment: (
                                                  <InputAdornment>
                                                    <BorderColorTwoToneIcon color="disabled" />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </FormControl>
                                          <small
                                            id="messageInlineHelp"
                                            className="text-muted"
                                          >
                                            {errors.message &&
                                              touched.message && (
                                                <span className="input-feedback text-danger">
                                                  {errors.message}
                                                </span>
                                              )}
                                          </small>
                                        </FormGroup>
                                        <div>
                                          <Button
                                            variant="contained"
                                            className="mt-4"
                                            size="Large"
                                            color="Primary"
                                            type="submit"
                                          >
                                            <span className="btn-wrapper--label">
                                              Submit &raquo;
                                            </span>
                                          </Button>
                                        </div>
                                      </FormGroup>
                                    </Card>
                                  </form>
                                </Grid>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}
ContactForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default ContactForm;
