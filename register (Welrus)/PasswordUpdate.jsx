import React, { Fragment, useState } from "react";
import userService from "@services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Grid,
  InputAdornment,
  IconButton,
  Card,
  Button,
  Tooltip,
  TextField,
} from "@material-ui/core";
import MailOutlineTwoToneIcon from "@material-ui/icons/MailOutlineTwoTone";
import hero3 from "../../assets/images/hero-bg/hero-3.jpg";
import { NavLink as RouterLink } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {BrowerRouter as Router, useHistory} from 'react-router-dom';

export default function ResetPassword() {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const formData = { password: "", confirmPassword: "" };

  const handleSubmit = (values, { resetForm }) => {
    const pageURL = window.location.href;
    const token = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    const payload = {
      ...values,
      token,
    };
    console.log(token);
    userService
      .passwordUpdate(payload, token)
      .then(onGetAllSuccess)
      .catch(onGetAllError);
    resetForm(formData);
  };

  const onGetAllSuccess = (response) => {
    console.log({ response: response.items });
    setOpen(true);
  };

  const closeOnUpdatePassword = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const history = useHistory();
  const routeToLoginPage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    
    history.push("/register")
    setOpen(false);
  };

  const closeOnUpdatePasswordError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const onGetAllError = (response) => {
    console.log({ error: response.items });
    setOpenError(true);
  };

  return (
    <Fragment>
      <div className="app-wrapper bg-white">
        <div className="app-main">
          <Button
            size="large"
            color="secondary"
            variant="contained"
            className="text-white btn-go-back"
            component={RouterLink}
            to="/"
          >
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={["fas", "arrow-left"]} />
            </span>
            <span className="btn-wrapper--label">Home</span>
          </Button>
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <div className="hero-wrapper bg-composed-wrapper bg-arielle-smile min-vh-100">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                      <div
                        className="bg-composed-wrapper--image"
                        style={{ backgroundImage: "url(" + hero3 + ")" }}
                      />
                      <div className="bg-composed-wrapper--bg bg-night-sky opacity-5" />
                      <div className="bg-composed-wrapper--content text-center py-5">
                        <Grid
                          item
                          xl={5}
                          lg={6}
                          md={10}
                          sm={12}
                          className="mx-auto text-center text-white"
                        >
                          <h1 className="display-2 mb-3 px-4 font-weight-bold">
                            Update Password
                          </h1>
                          <h3 className="font-size-lg line-height-sm font-weight-light d-block px-3 mb-5 text-white-50">
                            Enter your new password
                          </h3>
                          <Card className="p-5 mx-5 text-center">
                            <Formik
                              enableReinitialize={true}
                              onSubmit={handleSubmit}
                              initialValues={formData}
                              validationSchema={Yup.object().shape({
                                password: Yup.string()
                                  .min(2, "Please provide a password.")
                                  .max(20, "Please provide a password.")
                                  .required("Please provide a password."),
                                confirmPassword: Yup.string()
                                  .min(2, "Please provide a password.")
                                  .max(20, "Please provide a password.")
                                  .required("Please provide a password."),
                              })}
                            >
                              {(formikProps) => {
                                const {
                                  values,
                                  touched,
                                  errors,
                                  handleSubmit,
                                  handleChange,
                                } = formikProps;
                                return (
                                  <form
                                    validate
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                  >
                                    <TextField
                                      type="password"
                                      id="password"
                                      name="password"
                                      label="Password"
                                      placeholder="Enter New Password"
                                      fullWidth
                                      className="mt-0"
                                      margin="dense"
                                      variant="outlined"
                                      value={values.password}
                                      onChange={handleChange}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment>
                                            <LockTwoToneIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <TextField
                                      type="password"
                                      id="confirmPassword"
                                      name="confirmPassword"
                                      label="Confirm Password"
                                      placeholder="Confirm New Password"
                                      fullWidth
                                      className="mt-0"
                                      margin="dense"
                                      variant="outlined"
                                      value={values.confirmPassword}
                                      onChange={handleChange}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment>
                                            <LockTwoToneIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      className="mt-4"
                                      size="large"
                                      color="primary"
                                    >
                                      <span className="btn-wrapper--label">
                                        Update Password
                                      </span>
                                    </Button>
                                    <Snackbar
                                      anchorOrogin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                      open={open}
                                      autoHideDuration={3000}
                                      onClose={closeOnUpdatePassword}
                                      message="Confirmation Email has been sent to your email"
                                    >
                                      <MuiAlert
                                        onClose={closeOnUpdatePassword}
                                        severity="success"
                                      >
                                        Password has been changed.
                                        <Button
                                          size="small"
                                          color="primary"
                                          onClick={routeToLoginPage}
                                        >
                                          {""}
                                          Click here 
                                        </Button>
                                        to Login Page
                                      </MuiAlert>
                                    </Snackbar>

                                    <Snackbar
                                      anchorOrogin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                      open={openError}
                                      autoHideDuration={3000}
                                      onClose={closeOnUpdatePasswordError}
                                      message="Please check your email address."
                                    >
                                      <MuiAlert
                                        onClose={closeOnUpdatePasswordError}
                                        severity="error"
                                      >
                                        Please check your password.
                                      </MuiAlert>
                                    </Snackbar>
                                  </form>
                                );
                              }}
                            </Formik>
                          </Card>
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
    </Fragment>
  );
}
