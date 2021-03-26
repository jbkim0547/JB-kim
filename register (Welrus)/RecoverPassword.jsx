import React, { Fragment, useState } from "react";
import userService from "@services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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

export default function ResetPassword() {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const formData = { email: "" };

  const onForgotButton = () => {
    userService.getAllUser().then(onGetAllSuccess).catch(onGetAllError);
  };
  const [email, setEmail] = useState("");

  const onGetAllSuccess = (response) => {
    console.log({ response: response.items });

    const indexOfUserEmail = response.items.findIndex(
      (userAccount) => userAccount.email === email
    );
    const passEmail = { email: email };
    if (indexOfUserEmail >= 0) {
      console.log("good");
      userService
        .forgotPassword(passEmail)
        .then(onForgotPasswordSuccess)
        .catch(onForgotPasswordError);
      setOpen(true);
    } else {
      console.log("Can't find email");
      setOpenError(true);
    }
  };

  const closeOnForgotPassword = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const closeOnForgotPasswordError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const onForgotPasswordSuccess = (response) => {};

  const onForgotPasswordError = (response) => {};

  const onGetAllError = (response) => {
    console.log({ error: response.items });
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
                            Recover Password
                          </h1>
                          <h3 className="font-size-lg line-height-sm font-weight-light d-block px-3 mb-5 text-white-50">
                            Enter your email address and we will send you a link
                            to reset your password.
                          </h3>
                          <Card className="p-5 mx-5 text-center">
                            <Formik
                              enableReinitialize={true}
                              // onSubmit={handleSubmit}
                              initialValues={formData}
                              validationSchema={Yup.object().shape({
                                email: Yup.string()
                                  .email()
                                  .min(4, "Minimum number of characters is 4.")
                                  .max(
                                    255,
                                    "You have exceeded the maximum number of characters allowed."
                                  )
                                  .required(
                                    "Required field. Please provide a question."
                                  ),
                              })}
                            >
                              {(formikProps) => {
                                const {
                                  values,
                                  handleChange,
                                  handleSubmit,
                                  isSubmitting,
                                } = formikProps;
                                return (
                                  <form onSubmit={handleSubmit}>
                                    <TextField
                                      variant="outlined"
                                      label="Email"
                                      fullWidth
                                      placeholder="Enter your email address"
                                      type="email"
                                      name="email"
                                      autoComplete="off"
                                      values={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <MailOutlineTwoToneIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <Button
                                      variant="contained"
                                      className="mt-4"
                                      size="large"
                                      color="primary"
                                      type="submit"
                                      onClick={onForgotButton}
                                    >
                                      <span className="btn-wrapper--label">
                                        Reset Password
                                      </span>
                                    </Button>

                                    <Snackbar
                                      anchorOrogin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                      open={open}
                                      autoHideDuration={3000}
                                      onClose={closeOnForgotPassword}
                                      message="Confirmation Email has been sent to your email"
                                    >
                                      <MuiAlert
                                        onClose={closeOnForgotPassword}
                                        severity="success"
                                      >
                                        Confirmation Email has been sent to your
                                        email.
                                      </MuiAlert>
                                    </Snackbar>

                                    <Snackbar
                                      anchorOrogin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                      open={openError}
                                      autoHideDuration={3000}
                                      onClose={closeOnForgotPasswordError}
                                      message="Please check your email address."
                                    >
                                      <MuiAlert
                                        onClose={closeOnForgotPasswordError}
                                        severity="error"
                                      >
                                        Please check your email address.
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
