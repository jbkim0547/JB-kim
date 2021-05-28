import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import userService from "../../services/userService";
import { withStyles } from "@material-ui/core/styles";
import { NavLink as RouterLink } from "react-router-dom";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PerfectScrollbar from "react-perfect-scrollbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Grid,
  Container,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  FormHelperText,
  FormControl,
  Tooltip,
  TextField,
} from "@material-ui/core";
import toastr from "toastr";
import debug from "sabio-debug";
import Login from "@pages/login/Login";
import ProviderDemoRequestForm from "components/providers/ProviderDemoRequestForm";
import registerFormSchema from "schema/registerFormSchema";
import providerRegisterFormSchema from "schema/providerRegisterFormSchema";
const _logger = debug.extend("regForm");

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "6px",
    "& > div": {
      maxWidth: 40,
      height: "4px",
      borderRadius: "25px",
      width: "100%",
      backgroundColor: "#000",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: theme.palette.primary[900],
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const formData = {
  email: "",
  password: "",
  confirmPassword: "",
  role: 1,
};

const providerFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  role: 2,
  practice: "",
  firstName: "",
  lastName: "",
  npi: 0,
  contact: "",
};

const RegisterForm = (props) => {
  const [useTabPanelValue, setUseTabPanelValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleCheckOpen = () => {
    setChecked(true);
  };

  const handleCheckClose = () => {
    setChecked(false);
  };

  const handleChange = (event, newValue) => {
    setUseTabPanelValue(newValue);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (values) => {
    _logger("if handle submit", values);
    if (values.confirmPassword !== values.password) {
      toastr.error("Passwords do not match.");
    } else if (!values.npi) {
      userService.addUser(values).then(addUserSuccess).catch(addUserError);
    } else if (values.npi) {
      values.npi = parseInt(values.npi);
      userService
        .addProvider(values)
        .then(addProviderSuccess)
        .catch(addUserError);
    }
  };

  const addUserSuccess = () => {
    _logger("addUserSuccess is firing");
    setOpen(true);
  };

  const addProviderSuccess = () => {
    _logger("addProviderSuccess is firing");
    setChecked(false);
    setOpen(true);
  };

  const addUserError = () => {
    toastr.error("There was an error creating your account.");
    _logger("addUserError is firing");
  };

  return (
    <Fragment>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="app-main min-vh-100">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <Grid container spacing={0} className="min-vh-100">
                    <Grid
                      item
                      xs={12}
                      md={4}
                      lg={5}
                      className="d-flex align-items-center"
                    >
                      <div className="hero-wrapper w-100 bg-composed-wrapper bg-serious-blue min-vh-100">
                        <div className="flex-grow-1 w-100 d-flex align-items-center">
                          <div className="bg-composed-wrapper--image" />
                          <div className="bg-composed-wrapper--bg bg-premium-dark opacity-5" />
                          <div className="bg-composed-wrapper--content p-5">
                            <div className="text-white mt-3">
                              <h1 className="display-4 my-3 font-weight-bold">
                                Why join Welrus?
                              </h1>
                              <p className="font-size-md mb-0 text-white-50">
                                At Welrus, we promote price transparency and
                                enable patients to obtain affordable healthcare
                                services so that they may lead happier and
                                healthier lives.
                              </p>
                              <div className="divider border-2 my-5 border-light opacity-2 rounded w-25" />
                              <div>
                                <Button
                                  size="large"
                                  className="text-white"
                                  variant="contained"
                                  color="primary"
                                  component={RouterLink}
                                  to="/"
                                >
                                  <span className="btn-wrapper--icon">
                                    <FontAwesomeIcon
                                      icon={["fas", "arrow-left"]}
                                    />
                                  </span>
                                  <span className="btn-wrapper--label">
                                    Home
                                  </span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hero-footer pb-4">
                          <Tooltip arrow title="Facebook">
                            <IconButton
                              color="inherit"
                              size="medium"
                              variant="outlined"
                              href="https:&#x2F;&#x2F;www.facebook.com&#x2F;Welrus"
                              className="text-white-50"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "facebook"]}
                                className="font-size-md"
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow title="Twitter">
                            <IconButton
                              color="inherit"
                              size="medium"
                              variant="outlined"
                              className="text-white-50"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "twitter"]}
                                className="font-size-md"
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow title="Instagram">
                            <IconButton
                              color="inherit"
                              size="medium"
                              variant="outlined"
                              className="text-white-50"
                            >
                              <FontAwesomeIcon
                                icon={["fab", "instagram"]}
                                className="font-size-md"
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </Grid>
                    {/* /////////////////////////////////// BEGINNING OF 2ND
                    COMPONENT - THE REGISTER FORM
                    /////////////////////////////////////////////// */}
                    <Grid
                      item
                      xs={12}
                      md={8}
                      lg={7}
                      className="d-flex align-items-center"
                    >
                      <Container maxWidth="sm">
                        <div className="pt-5 pb-4">
                          <StyledTabs
                            value={useTabPanelValue}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                          >
                            <StyledTab label="Create Account" />
                            <StyledTab label="Login" />
                            <StyledTab label="Request Demo" />
                          </StyledTabs>
                        </div>
                        <TabPanel value={useTabPanelValue} index={0}>
                          <h3
                            className="display-4 mb-2 font-weight-bold"
                            name="tabPanelTitle"
                          >
                            Create Account
                          </h3>
                          <p className="font-size-lg mb-4 text-black-50">
                            Fill in the fields below and you will be sent a
                            confirmation email.
                          </p>
                          <Formik
                            enableReinitialize={true}
                            onSubmit={handleSubmit}
                            initialValues={formData}
                            validationSchema={registerFormSchema}
                          >
                            {(formikProps) => {
                              const {
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                              } = formikProps;

                              return (
                                <Form onSubmit={handleSubmit}>
                                  <Snackbar
                                    open={open}
                                    autoHideDuration={3000}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: "top",
                                      horizontal: "center",
                                    }}
                                  >
                                    <Alert
                                      onClose={handleClose}
                                      severity="success"
                                    >
                                      Success! A confirmation email has been
                                      sent to you.
                                    </Alert>
                                  </Snackbar>
                                  <PerfectScrollbar>
                                    <div className="mb-3">
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
                                          <small
                                            id="Emailerror"
                                            className="text-muted"
                                          >
                                            {errors.email && touched.email && (
                                              <span className="input-feedback text-danger">
                                                {errors.email}
                                              </span>
                                            )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.password && touched.password
                                          }
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
                                          <small
                                            id="Passworderror"
                                            className="text-muted"
                                          >
                                            {errors.password &&
                                              touched.password && (
                                                <span className="input-feedback text-danger">
                                                  {errors.password}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                          }
                                        >
                                          <TextField
                                            variant="outlined"
                                            label="Confirm Password"
                                            fullWidth
                                            placeholder="Confirm your password"
                                            type="password"
                                            name="confirmPassword"
                                            autoComplete="off"
                                            values={values.confirmPassword}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  <LockTwoToneIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <small
                                            id="ConfPasserror"
                                            className="text-muted"
                                          >
                                            {errors.confirmPassword &&
                                              touched.confirmPassword && (
                                                <span className="input-feedback text-danger">
                                                  {errors.confirmPassword}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
                                      </div>
                                    </div>
                                  </PerfectScrollbar>
                                  <p className="text-black-50 text-center">
                                    <small>
                                      Password must contain at least 8
                                      characters, one uppercase, one number and
                                      one special case character.
                                    </small>
                                  </p>
                                  <div
                                    className="form-group"
                                    name="buttonDescription"
                                  >
                                    By clicking the <strong>Sign up</strong>{" "}
                                    button below you agree to our terms of
                                    service and privacy statement.
                                  </div>
                                  <br />
                                  <div>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      className="mb-3 float-left"
                                      size="large"
                                      onClick={handleCheckOpen}
                                    >
                                      Provider registration
                                    </Button>
                                  </div>
                                  <Button
                                    color="primary"
                                    size="large"
                                    variant="contained"
                                    className="mb-5 float-right"
                                    type="submit"
                                    //disabled={isSubmitting}
                                    onClick={handleSubmit}
                                  >
                                    Sign up &raquo;
                                  </Button>
                                </Form>
                              );
                            }}
                          </Formik>
                          <Formik
                            enableReinitialize={true}
                            onSubmit={handleSubmit}
                            initialValues={providerFormData}
                            validationSchema={providerRegisterFormSchema}
                          >
                            {(formikProps) => {
                              const {
                                values,
                                touched,
                                errors,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                              } = formikProps;

                              return (
                                <Form onSubmit={handleSubmit}>
                                  <Snackbar
                                    open={open}
                                    autoHideDuration={3000}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: "top",
                                      horizontal: "center",
                                    }}
                                  >
                                    <Alert
                                      onClose={handleClose}
                                      severity="success"
                                    >
                                      Success! A confirmation email has been
                                      sent to you.
                                    </Alert>
                                  </Snackbar>
                                  <Dialog
                                    open={checked}
                                    onClose={handleCheckClose}
                                    aria-labelledby="form-dialog-title"
                                  >
                                    <DialogTitle id="form-dialog-title">
                                      Provider Registration
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText>
                                        To register as a provider, please enter
                                        the required information below. We will
                                        contact you when your credentials have
                                        been verified.
                                      </DialogContentText>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.practice && touched.practice
                                          }
                                        >
                                          <TextField
                                            variant="outlined"
                                            label="Practice Name"
                                            fullWidth
                                            placeholder="Enter Practice Name"
                                            type="text"
                                            name="practice"
                                            autoComplete="off"
                                            values={values.practice}
                                            onChange={handleChange}
                                          />
                                          <small
                                            id="Practiceerror"
                                            className="text-muted"
                                          >
                                            {errors.practice &&
                                              touched.practice && (
                                                <span className="input-feedback text-danger">
                                                  {errors.practice}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.firstName &&
                                            touched.firstName
                                          }
                                        >
                                          <TextField
                                            variant="outlined"
                                            label="Providers First Name"
                                            fullWidth
                                            placeholder="Enter Providers First Name"
                                            type="text"
                                            name="firstName"
                                            autoComplete="off"
                                            values={values.firstName}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  <PeopleAltTwoToneIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <small
                                            id="Firstnameerror"
                                            className="text-muted"
                                          >
                                            {errors.firstName &&
                                              touched.firstName && (
                                                <span className="input-feedback text-danger">
                                                  {errors.firstName}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.lastName && touched.lastName
                                          }
                                        >
                                          <TextField
                                            variant="outlined"
                                            label="Providers Last Name"
                                            fullWidth
                                            placeholder="Enter Providers Last Name"
                                            type="text"
                                            name="lastName"
                                            autoComplete="off"
                                            values={values.lastName}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  <PeopleAltTwoToneIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <small
                                            id="Lastnameerror"
                                            className="text-muted"
                                          >
                                            {errors.lastName &&
                                              touched.lastName && (
                                                <span className="input-feedback text-danger">
                                                  {errors.lastName}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={errors.npi && touched.npi}
                                        >
                                          <TextField
                                            variant="outlined"
                                            label="NPI"
                                            fullWidth
                                            placeholder="Enter NPI"
                                            type="text"
                                            name="npi"
                                            autoComplete="off"
                                            values={values.npi}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  <LockTwoToneIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <small
                                            id="Npierror"
                                            className="text-muted"
                                          >
                                            {errors.npi && touched.npi && (
                                              <span className="input-feedback text-danger">
                                                {errors.npi}
                                              </span>
                                            )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.contact && touched.contact
                                          }
                                        >
                                          <TextField
                                            variant="outlined"
                                            label="Contact Number"
                                            fullWidth
                                            placeholder="Enter Contact Number"
                                            type="text"
                                            name="contact"
                                            autoComplete="off"
                                            values={values.contact}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  <PeopleAltTwoToneIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <small
                                            id="Contacterror"
                                            className="text-muted"
                                          >
                                            {errors.contact &&
                                              touched.contact && (
                                                <span className="input-feedback text-danger">
                                                  {errors.contact}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
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
                                          <small
                                            id="Emailerror"
                                            className="text-muted"
                                          >
                                            {errors.email && touched.email && (
                                              <span className="input-feedback text-danger">
                                                {errors.email}
                                              </span>
                                            )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.password && touched.password
                                          }
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
                                          <small
                                            id="Passworderror"
                                            className="text-muted"
                                          >
                                            {errors.password &&
                                              touched.password && (
                                                <span className="input-feedback text-danger">
                                                  {errors.password}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
                                      </div>
                                      <div className="mb-3">
                                        <FormControl
                                          className="w-100"
                                          error={
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                          }
                                        >
                                          <TextField
                                            variant="outlined"
                                            label="Confirm Password"
                                            fullWidth
                                            placeholder="Confirm your password"
                                            type="password"
                                            name="confirmPassword"
                                            autoComplete="off"
                                            values={values.confirmPassword}
                                            onChange={handleChange}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment>
                                                  <LockTwoToneIcon />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <small
                                            id="ConfPasserror"
                                            className="text-muted"
                                          >
                                            {errors.confirmPassword &&
                                              touched.confirmPassword && (
                                                <span className="input-feedback text-danger">
                                                  {errors.confirmPassword}
                                                </span>
                                              )}
                                          </small>
                                        </FormControl>
                                      </div>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        onClick={handleCheckClose}
                                        color="primary"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={handleSubmit}
                                        color="secondary"
                                        variant="contained"
                                        type="submit"
                                        //disabled={isSubmitting}
                                      >
                                        Register
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </Form>
                              );
                            }}
                          </Formik>
                        </TabPanel>
                        <TabPanel value={useTabPanelValue} index={1}>
                          <h3
                            className="display-4 mb-2 font-weight-bold"
                            name="tabPanelTitle"
                          >
                            Sign in
                          </h3>
                          <p className="font-size-lg text-black-50  text-center">
                            Welcome back! Please login to your account.
                          </p>

                          <Login {...props} />
                        </TabPanel>
                        <TabPanel value={useTabPanelValue} index={2}>
                          <h3
                            className="display-4 mb-2 font-weight-bold text-center"
                            name="tabPanelTitle"
                          >
                            Request a Welrus Demo
                          </h3>
                          <p className="font-size-lg mb-4 text-black-50 text-center">
                            Enter provider details for a Demo!
                          </p>
                          <ProviderDemoRequestForm props={props} />
                        </TabPanel>
                      </Container>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RegisterForm;
