import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { NavLink as RouterLink, Link } from "react-router-dom";
import userService from "../../services/userService";
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import loginSchema from "../../schema/loginSchema";
import {
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  TextField,
  Snackbar,
} from "@material-ui/core";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import Alert from "../../assets/components/Alert";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import logger from "sabio-debug";
const _logger = logger.extend("Login");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarShow: false,
      severity: "success",
      barMessage: "",
      formData: {
        email: "",
        password: "",
        rememberMe: true,
      },
    };
  }

  // -------------------------------------------- (RE-)INTITIALIZATION
  componentDidMount() {
    FB.init({
      appId: process.env.REACT_APP_FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: process.env.REACT_APP_FACEBOOK_GRAPH_VERSION,
    });

    // FB.getLoginStatus(function (response) {
    //   console.log(response);
    // });

    this.checkCurrentUser();
  }

  checkCurrentUser = () => {
    if (this?.props?.currentUser?.id > 0) {
      _logger("still logged in");
      this.setState((prevState) => {
        return {
          ...prevState,
          snackbarShow: true,
          barMessage: "Still logged in! Logout before navigating here.",
          severity: "warning",
        };
      });
    }
  };

  getClearFormData = () => {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  };

  // -------------------------------------------- STANDARD LOGIN FLOW
  handleSubmit = (values) => {
    const params = {
      email: values.email,
      password: values.password,
    };
    userService.login(params).then(this.loginSuccess).catch(this.loginError);
  };

  loginSuccess = (response) => {
    userService
      .getCurrentUser()
      .then(this.onGetCurrentUserSuccess)
      .catch(this.onGetCurrentUserError);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Login Successful!",
        severity: "success",
      };
    });
  };

  loginError = (err) => {
    _logger("login err", err);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage:
          "The email or password that you`ve entered doesn`t match any account.",
        severity: "error",
        formData: this.getClearFormData(),
      };
    });
  };

  onGetCurrentUserSuccess = (response) => {
    _logger("get Current user success", response);
    let currentUser = response.item;
    let type = "LOGIN";
    let path = "/";
    _logger(currentUser);

    if (!currentUser?.roles) {
      currentUser.roles = ["Customer"];
      _logger(
        "authenticated user roles missing, assigning customer role",
        currentUser.roles
      );
      path = "/";
    } else if (currentUser.roles.includes("Customer")) {
      path = "/user/dashboard";
    } else if (currentUser.roles.includes("Provider")) {
      path = "/provider/dashboard";
    } else if (currentUser.roles.includes("Admin")) {
      path = "/dashboard/admin";
    }

    if (!currentUser.profileId || currentUser.profileId < 1) {
      _logger("user profile not created yet", currentUser.profileId);
      path = "/users/profiles/new";
    }

    if (currentUser?.id)
      _logger(
        "login, got currentUser, with next page",
        path,
        type,
        currentUser
      );
    if (this?.props?.history?.push) {
      _logger("history.push path", path);
      this.props.history.push("/", {
        type,
        payload: { currentUser, path },
      });
    }
  };

  onGetCurrentUserError = (error) => {
    _logger("get Current user err", error);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage:
          "There was an error accessing your account after logging in.",
        severity: "error",
        formData: this.getClearFormData(),
      };
    });
  };

  onForgotClick = (event) => {
    _logger("to recoverpassword", event);
    this.props.history.push("/forgot");
  };

  handleLogout = () => {
    userService.logout().then(this.onLogoutSuccess).catch(this.onLogoutError);
  };

  onLogoutSuccess = (response) => {
    props.history.push("/", {
      type: "LOGOUT",
    });
  };
  onLogoutError = (err) => {
    props.history.push("/", {
      type: "LOGOUT",
    });
  };

  // -------------------------------------------- FACEBOOK LOGIN FLOW
  facebookLoginSuccess = (response) => {
    if (response.isSuccessful) {
      this.loginSuccess(response);
    }
    this.props.history.push("/");
  };

  facebookLoginError = (errResponse) => {
    _logger("facebook auth error:", errResponse);
  };

  facebookLogin = () => {
    FB.login(
      (response) => {
        if (response.status === "connected") {
          // Logged into your website and Facebook.
          const { accessToken } = response.authResponse;
          const payload = {
            accessToken,
          };
          userService
            .facebookAuth(payload)
            .then(this.facebookLoginSuccess)
            .catch(this.facebookLoginError);
        } else {
          // The user is not logged into your website or we are unable to tell.
        }
      },
      { scope: "email" }
    );
  };

  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObject);
    this.loginSuccess(response);
  };

  // -------------------------------------------- RENDER
  render() {
    return (
      <Fragment>
        <Formik
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
          validationSchema={loginSchema}
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
            } = formikProps;
            return (
              <Form
                className="px-0"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="d-block mb-0 rounded border-0">
                  <div
                    className="text-center"
                    style={{ paddingBottom: "25px" }}
                  >
                    <Button
                      className="mr-2 text-facebook 
                     "
                      onClick={this.facebookLogin}
                      style={{
                        paddingTop: "12px",
                        paddingBottom: "6px",
                        boxShadow:
                          "rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px",
                        borderRadius: "2px",
                        alignItems: "center",
                      }}
                    >
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={["fab", "facebook"]} />
                      </span>
                      <span className="btn-wrapper--label">Facebook</span>
                    </Button>

                    <GoogleLogin
                      className="border-radius: 2.5rem"
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Google"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                  <div className="mb-3">
                    <FormControl
                      className="w-100"
                      error={errors.email && touched.email}
                    >
                      <TextField
                        variant="outlined"
                        label="Email"
                        fullWidth
                        placeholder="Enter your email address"
                        type="email"
                        name="email"
                        autoComplete="off"
                        values={values.email}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <EmailTwoToneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className="mb-3">
                    <FormControl
                      className="w-100"
                      error={errors.password && touched.password}
                    >
                      <TextField
                        variant="outlined"
                        label="Password"
                        fullWidth
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                        autoComplete="off"
                        values={values.password}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <LockTwoToneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  </div>
                  <div className="w-200">
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="rememberMe"
                          name="rememberMe"
                          checked={values.rememberMe}
                          value={values.rememberMe}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                  </div>
                  <div className="text-right">
                    {/* ------------------------------ LOGIN LOGOUT FORGOT actions */}
                    {this?.props?.currentUser?.id > 0 ? (
                      <Button
                        style={{ color: "white", backgroundColor: "red" }}
                        type="button"
                        // color="red"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        className="my-2"
                        onClick={this.handleLogout}
                      >
                        Log out
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        className="my-2"
                      >
                        Sign in &raquo;
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-right" style={{ paddingTop: "15px" }}>
                  <Link to="/forgot">*Forgot Password?</Link>
                </div>
              </Form>
            );
          }}
        </Formik>
        <Snackbar
          open={this.state.snackbarShow}
          autoHideDuration={3000}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={this.state.severity}>{this.state.barMessage}</Alert>
        </Snackbar>
      </Fragment>
    );
  }
}
Login.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    providerId: PropTypes.number,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default Login;
