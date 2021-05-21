import React, { Fragment } from "react";
import {
  Grid,
  Container,
  InputAdornment,
  IconButton,
  Button,
  Tooltip,
  TextField,
  FormControl,
  Snackbar,
  Card,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import MailOutlineTwoToneIcon from "@material-ui/icons/MailOutlineTwoTone";

import Alert from "../assets/components/Alert";
import WelrusLogo from "../assets/images/welrusLogo/plainWelrusLogo.png";
import hero6 from "@assets/images/hero-bg/hero-6.jpg";

import homePageSchema from "../schema/homePageSchema.js";

import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Formik } from "formik";

import OnlyMap from "../components/locations/Map";
import LocationSearchInput from "../components/locations/LocationSearchInput";

import medicalServiceService from "@services/medicalServiceService";
import userService from "@services/userService";

import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("HomePage");

const HomePage = (props) => {
  const [longitude, setLongitude] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [snackBarShow, setSnackBarShow] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [barMessage, setBarMessage] = React.useState("");

  //Required for location search input to work properly
  const onSelectedLocation = (address, lat, lng) => {
    let latitude = lat;
    let longitude = lng;
    let stateList = props.references.states;
    let locationList = props.references.locationTypes;

    _logger(stateList, "stateList");
    _logger(locationList, "locationList");

    let returnedState = stateList.findIndex(
      (stateList) => stateList.name === address.administrative_area_level_1
    );
    let selectedState = stateList[returnedState];
    _logger(returnedState, "Returned State");
    _logger(selectedState, "selectedState");

    setLatitude(latitude);
    setLongitude(longitude);
  };

  //Search submission axios call
  const handleSubmit = (values) => {
    _logger("submit clicked");

    let payload = {
      radius: values.radius,
      serviceQuery: values.serviceQuery,
      latitude: latitude,
      longitude: longitude,
    };
    _logger(payload);
    medicalServiceService
      .getServicesLocation(payload)

      .then(onGetServicesLocationSuccess)
      .catch(onGetServicesLocationError);
  };
  const onGetServicesLocationSuccess = (response) => {
    _logger({ success: response });
    let locationArray = response.item;
    let providerLocations = locationArray.map(mapThis);
    _logger(providerLocations);
    props.history.push("/list", {
      type: { providerLocations },
    });
  };

  //Mapper for search results
  const mapThis = (item) => {
    let thisLocation = {
      id: item.id,
      position: {
        lat: item.location.latitude,
        lng: item.location.longitude,
      },
      name: {
        firstName: item.userProfile.firstName,
        lastName: item.userProfile.lastName,
      },
      address: {
        lineOne: item.location.lineOne,
        lineTwo: item.location.lineTwo,
        city: item.location.city,
        state: item.location.state.code,
        zipcode: item.location.zip,
      },
      services: item.services,
      providerId: item.providerId,
    };
    _logger("location..............", thisLocation);
    return thisLocation;
  };
  const onGetServicesLocationError = (error) => {
    setSnackBarShow(true);
    setSeverity("warning");
    setBarMessage("No providers were found in that area. Try a larger radius!");
    _logger({ error: error });
  };
  const onClose = () => {
    setSnackBarShow(false);
  };

  //Routes user to dashboard by role
  const handleDashboard = () => {
    if (props?.currentUser?.roles) {
      let path = "/";
      const roles = props.currentUser.roles;
      if (roles.includes("Customer")) {
        path = "/user/dashboard";
      } else if (roles.includes("Provider")) {
        path = "/provider/dashboard";
      } else if (roles.includes("Admin")) {
        path = "/dashboard/admin";
      }
      props.history.push(path);
    }
  };

  const handleLogout = () => {
    userService.logout().then(onLogoutSuccess).catch(onLogoutError);
  };

  const onLogoutSuccess = (response) => {
    _logger({ response: response });
    props.history.push("/", {
      type: "LOGOUT",
    });
  };
  const onLogoutError = (error) => {
    _logger({ error: error });
    props.history.push("/", {
      type: "LOGOUT",
    });
  };

  const handleFAQ = () => {
    props.history.push("/faqs");
  };
  const handleAboutUs = () => {
    props.history.push("/aboutus");
  };

  return (
    <Fragment>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        <div className="header-nav-wrapper header-nav-wrapper-lg w-100 navbar-dark">
          <Container className="d-flex" fixed>
            <div className="header-nav-menu d-lg-block">
              <div
                className="d-flex justify-content-end"
                style={{ color: "#003366" }}
              >
                {props.isLoggedIn ? (
                  <Button
                    color="inherit"
                    className="btn-inverse px-3 mx-1 py-2 text-capitalize font-weight-bold font-Montserrat-Alternates"
                    onClick={handleDashboard}
                  >
                    <span className="font-size-lg">Dashboard</span>
                  </Button>
                ) : (
                  ""
                )}
                <Button
                  color="inherit"
                  className="btn-inverse px-3 mx-1 py-2 text-capitalize font-weight-bold font-Montserrat-Alternates"
                  component={Link}
                  to="/contactform"
                >
                  <span className="font-size-lg">Contact us</span>
                </Button>
                {props.isLoggedIn ? (
                  <Button
                    color="inherit"
                    className="btn-inverse px-3 mx-1 py-2 text-capitalize font-weight-bold font-Montserrat-Alternates"
                    onClick={handleLogout}
                  >
                    <span className="font-size-lg">Logout</span>
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    className="btn-inverse px-3 mx-1 py-2 text-capitalize font-weight-bold font-Montserrat-Alternates"
                    component={Link}
                    to="/register"
                  >
                    <span className="font-size-lg">Sign Up/Login</span>
                  </Button>
                )}
              </div>
            </div>
          </Container>
        </div>

        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-9"
            style={{ backgroundImage: "url(" + hero6 + ")" }}
          />
        </div>
        <Snackbar
          open={snackBarShow}
          autoHideDuration={10000}
          onClose={onClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={severity}>{barMessage}</Alert>
        </Snackbar>
        <Formik
          enableReinitialize={true}
          initialValues={{ serviceQuery: "", radius: 0 }}
          onSubmit={handleSubmit}
          validationSchema={homePageSchema}
        >
          {(formikProps) => {
            const {
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
            } = formikProps;
            return (
              <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
                <Container fixed className="pb-5">
                  <Grid container justify="center" spacing={4}>
                    <Grid
                      item
                      xs={12}
                      lg={4}
                      xl={6}
                      className="px-0 d-none d-lg-flex align-items-center"
                    >
                      <img
                        alt="..."
                        className="w-100 mx-center img-center"
                        src={WelrusLogo}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justify="center" spacing={4}>
                    <Grid
                      item
                      xs={12}
                      md={10}
                      lg={7}
                      className="px-0 d-lg-flex align-items-center"
                    >
                      <FormControl className="mt-4 w-100">
                        <TextField
                          name="serviceQuery"
                          variant="outlined"
                          label="Search Service"
                          values={values.serviceQuery}
                          onChange={handleChange}
                          placeholder="flu shot, exam, etc.."
                          error={errors.serviceQuery && touched.serviceQuery}
                        />
                      </FormControl>

                      <FormControl className=" w-100 ml-3">
                        <LocationSearchInput
                          onSelectedLocation={onSelectedLocation}
                        />
                      </FormControl>
                      <FormControl className=" mt-4 w-100 ml-4">
                        <TextField
                          name="radius"
                          variant="outlined"
                          type="number"
                          label="Mile Radius"
                          placeholder="10, 50, 100.."
                          InputProps={{ inputProps: { min: 0, max: 24901 } }}
                          values={values.radius}
                          onChange={handleChange}
                          error={errors.radius && touched.radius}
                        />
                      </FormControl>
                      <Grid item className="d-flex mr-4">
                        <Button
                          size="large"
                          className="mt-4 ml-3"
                          variant="contained"
                          color="secondary"
                          onClick={handleSubmit}
                        >
                          {" "}
                          <Search />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </div>
            );
          }}
        </Formik>

        {/* ------------ */}
        <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
          <Grid container spacing={6} style={{ justifyContent: "center" }}>
            <Grid item xs={12} md={8} lg={3}>
              <Card
                className="p-4 mb-4 hoverContent"
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <div className="d-flex align-items-center">
                  <div className="bg-grow-early text-center text-white font-size-xl d-50 rounded">
                    <FontAwesomeIcon icon={["fas", "dollar-sign"]} />
                  </div>
                  <h3
                    className="font-size-lg font-weight-bold mb-0 ml-3 font-Montserrat-Alternates"
                    style={{ color: "#003366" }}
                  >
                    Compare healthcare services easily
                  </h3>
                </div>
                <PerfectScrollbar style={{ height: 305 }}>
                  <div className="text-black-50 mt-2 mb-0 font-size-md  font-Montserrat-Alternates">
                    <p>
                      Compare services in your area before you buy to easily
                      find the fastest, closest, and cheapest way to stay
                      healthy
                    </p>
                    <h6
                      className="font-size-lg  mb-4 font-weight-bold font-Montserrat-Alternates"
                      style={{ color: "#003366" }}
                    >
                      Simple
                    </h6>
                    <p className="font-size-lg text-black font-Montserrat-Alternates">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean varius commodo orci, scelerisque elementum neque
                      condimentum a. Pellentesque ornare fermentum.
                    </p>

                    <h6
                      className="font-size-lg  mb-4 font-weight-bold font-Montserrat-Alternates"
                      style={{ color: "#003366" }}
                    >
                      Effective
                    </h6>
                    <p className="font-size-lg text-black font-Montserrat-Alternates">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean varius commodo orci, scelerisque elementum neque
                      condimentum a. Pellentesque ornare fermentum.
                    </p>
                  </div>
                </PerfectScrollbar>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OnlyMap fullProps={{ ...props }} />
            </Grid>
          </Grid>
        </div>
        <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
          <Container maxWidth="md" className="text-center">
            <h1
              className="display-3 mb-4 font-weight-bold font-Montserrat-Alternates"
              style={{ color: "#003366" }}
            >
              Stay up to date
            </h1>
            <p className="font-size-lg text-black-50 font-Montserrat-Alternates">
              Follow us to find out when we release new products or updates.
            </p>
          </Container>
          <div className="divider border-2 d-sm-none d-md-block rounded-circle border-black bg-secondary opacity-1 mx-auto mb-4 mt-5 w-50" />
          <div className="d-flex justify-content-center">
            <Tooltip arrow title="Facebook">
              <IconButton
                className="nav-link text-black"
                href="https:&#x2F;&#x2F;www.facebook.com&#x2F;Welrus"
                rel="noopener nofollow"
                target="_blank"
                style={{ color: "#003366" }}
              >
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={["fab", "facebook"]}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Twitter">
              <IconButton
                className="nav-link"
                href="https:&#x2F;&#x2F;twitter.com&#x2F;Welrus"
                rel="noopener nofollow"
                target="_blank"
                style={{ color: "#66B2FF" }}
              >
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={["fab", "twitter"]}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Instagram">
              <IconButton
                className="nav-link text-black"
                href="https:&#x2F;&#x2F;www.instagram.com&#x2F;welrus"
                rel="noopener nofollow"
                target="_blank"
                style={{ color: "#CC00CC" }}
              >
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon
                    icon={["fab", "instagram"]}
                    className="font-size-xxl"
                  />
                </span>
              </IconButton>
            </Tooltip>
          </div>
          <div
            className="divider border-2 d-sm-none d-md-block rounded-circle border-black bg-secondary opacity-1 mx-auto mt-4 mb-5 w-50"
            style={{ backgroundColor: "#CCE5FF" }}
          />
          <Container maxWidth="md" className="text-center">
            <div className="text-black">
              <h1
                className="display-4 mb-3 font-weight-bold font-Montserrat-Alternates"
                style={{ color: "#003366" }}
              >
                Newsletter updates
              </h1>
              <p className="font-size-md mb-4 text-black-50 font-Montserrat-Alternates">
                Subscribe to be the first to find out when we offer promotions
                or discounts for our services.
              </p>
              <div id="mc_embed_signup">
                <form
                  action="https://gmail.us1.list-manage.com/subscribe/post?u=71d0075b8dae21d68e6d93891&amp;id=7d45bac3d9"
                  className="validate"
                  id="mc-embedded-subscribe-form"
                  method="post"
                  name="mc-embedded-subscribe-form"
                  noValidate
                  target="_blank"
                >
                  <Grid container spacing={4} justify="center">
                    <Grid xs={6} item>
                      <div className="align-items-center">
                        <TextField
                          fullWidth
                          className="mt-1"
                          margin="dense"
                          id="mce-EMAIL"
                          name="EMAIL"
                          type="email"
                          variant="outlined"
                          color="secondary"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailOutlineTwoToneIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item className="d-flex">
                      <Button
                        className="w-60"
                        color="secondary"
                        variant="contained"
                        id="mc-embedded-subscribe"
                        name="subscribe"
                        type="submit"
                      >
                        <span className="btn-wrapper--label font-Montserrat-Alternates">
                          Sign up
                        </span>
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <small className="text-black-50 d-block pt-3 font-Montserrat-Alternates">
                We promise not to spam your inbox. We also hate spam!
              </small>
            </div>
          </Container>
          <div
            className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5 mt-5"
            style={{ color: "#003366" }}
          >
            <div className="text-center d-block  font-Montserrat-Alternates">
              Copyright &copy; 2020 -{" "}
              <a
                className="text-black"
                href="https://welrus.azurewebsites.net/"
                title="Welrus"
                style={{ color: "#003366" }}
              >
                Welrus
              </a>{" "}
              |{" "}
              <Button
                className="text-black "
                onClick={handleFAQ}
                style={{ color: "#003366" }}
              >
                <span className="text-center d-block  font-Montserrat-Alternates">
                  {" "}
                  FAQ
                </span>
              </Button>{" "}
              |{" "}
              <Button
                className="text-black"
                onClick={handleAboutUs}
                style={{ color: "#003366" }}
              >
                <span className="text-center d-block  font-Montserrat-Alternates">
                  {" "}
                  About Us
                </span>
              </Button>{" "}
              |{" "}
              <a className="text-black" style={{ color: "#003366" }}>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
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
    ),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
export default HomePage;
