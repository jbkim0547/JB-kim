import React, { Fragment, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  withStyles,
  Slider,
  Grid,
  Container,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import svgImage15 from "../../assets/images/stock-logos/1.svg";
import svgImage16 from "../../assets/images/stock-logos/2.svg";
import svgImage17 from "../../assets/images/stock-logos/3.svg";
import svgImage18 from "../../assets/images/stock-logos/4.svg";
import { Search } from "@material-ui/icons";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Formik } from "formik";
import homePageSchema from "../../schema/homePageSchema.js";
import styles from "../../assets/styles/map.module.css";
import WelrusLogo from "@assets/images/welrusLogo/plainWelrusLogo.png";
import { Rating } from "@material-ui/lab";
import ProviderLocationsRenderMap from "./ProviderLocationsRenderMap";
import LocationSearchInput from "../../components/locations/LocationSearchInput";
import medicalServiceService from "@services/medicalServiceService";
import logger from "sabio-debug";

const _logger = logger.extend("ListMap");

const providerListWithMap = (props) => {
  _logger(props.location.state);
  const PriceSlider = withStyles({
    root: {
      color: "#353e75",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const [providerLocations, setProviderLocations] = React.useState([]);
  const [longitude, setLongitude] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [lowestPriceService, setLowestPriceService] = React.useState({});

  useEffect(() => {
    let locations = props.location.state.type.providerLocations;
    setLocations(locations);
  }, [props.location.state.type.providerLocations]);

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
  const onGetServicesLocationError = (error) => {
    _logger({ error: error });
  };
  const onGetServicesLocationSuccess = (response) => {
    _logger({ success: response });
    let locationArray = response.item;
    let providerLocations = locationArray.map(mapThis);
    _logger(providerLocations);
    setLocations(providerLocations);
  };
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
      phone: item.userProfile.phoneNumber,
      services: item.services,
      providerId: item.providerId,
    };
    _logger("location..............", thisLocation);
    return thisLocation;
  };

  const setLocations = (locations) => {
    setProviderLocations(locations);
  };
  const handleFAQ = () => {
    props.history.push("/faqs");
  };
  const handleAboutUs = () => {
    props.history.push("/aboutus");
  };

  const setLowestPriced = (provider) => {
    //keeping for future uses for Cards below map
    //cloned from home page
    _logger("set lowest price...........", provider);
    if (provider !== null) {
      for (let i = 0; i < provider.services.length; i++) {
        const currentService = provider.services[i];
        if (i === 0) {
          setLowestPriceService(currentService);
        }
      }
    }
  };

  function listMap(item) {
    return (
      <div key={item.providerId} className={styles.listItem}>
        <div
          className={styles.title}
        >{`${item.name.firstName} ${item.name.lastName}`}</div>
        <div className={styles.rate}>
          <span className={styles.label}>{"Rate"}</span>
          {/* ------------------------render total rating here ----------------------*/}
          <Rating name="simple-controlled" value={4} />
        </div>
        <div>
          {item.services.map((service) => {
            return service.price;
          })}
        </div>
        <div>
          {item.services.map((service) => {
            return service.serviceName;
          })}
        </div>
        <div
          style={{
            marginLeft: "200px",
            position: "absolute",
            paddingTop: "25px",
            top: "0",
            width: "100%",
          }}
        >
          <div className="address">
            <div>{`${item.address.lineOne}`}</div>
            <div>{item.address.lineTwo && item.address.lineTwo}</div>
            <div>{`${item.address.city}, ${item.address.state} ${item.address.zipcode}`}</div>
          </div>
          <div>{item.phone && item.phone}</div>
        </div>
      </div>
    );
  }

  const handleHome = () => {
    props.history.push("/");
  };
  return (
    <Fragment>
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
            <div className={styles.top}>
              <Grid container justify="between" spacing={2}>
                <Grid item xs={1}>
                  <Button
                    size="large"
                    color="secondary"
                    variant="contained"
                    className="text-white btn-go-back"
                    to="/"
                  >
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={["fas", "arrow-left"]} />
                    </span>
                    <span className="btn-wrapper--label">Return</span>
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <img
                    className={styles.logo}
                    alt="..."
                    src={WelrusLogo}
                    onClick={handleHome}
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  className="px-0 d-none d-lg-flex align-items-center"
                >
                  <FormControl className="mt-4 w-100">
                    <TextField
                      name="serviceQuery"
                      variant="outlined"
                      label="Select Service"
                      values={values.serviceQuery}
                      onChange={handleChange}
                      placeholder="flu shot, exam, etc.."
                      error={errors.serviceQuery && touched.serviceQuery}
                    />
                  </FormControl>

                  <FormControl className="mt-4 w-100 ml-8 pb-4">
                    <LocationSearchInput
                      onSelectedLocation={onSelectedLocation}
                    />
                  </FormControl>
                  <FormControl className="mt-4 w-50 ml-3">
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

                  <Button
                    size="large"
                    className="mt-4 m-1"
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                  >
                    <Search />
                  </Button>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Formik>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.title}>
                <span className="font-weight-bold font-Montserrat-Alternates">
                  Filters
                </span>
              </div>
              <span>
                $$
                <span className="mr-5">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                $$$$
              </span>
              <PriceSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={30}
              />
              <div>
                <FormControl
                  component="fieldset"
                  className={styles.formControl}
                >
                  <div className="font-weight-bold ">
                    Appointment Availability
                  </div>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="ASAP" />
                    <FormControlLabel control={<Checkbox />} label="Tomorrow" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Next Week"
                    />
                  </FormGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div className={styles.list}>
            <PerfectScrollbar style={{ maxHeight: "95vh" }}>
              {providerLocations.map(listMap) && providerLocations.map(listMap)}
            </PerfectScrollbar>
          </div>
        </Grid>

        <Grid item xs={6}>
          <div
            style={{
              height: "400px",
              width: "100%",
            }}
          >
            <ProviderLocationsRenderMap
              locations={providerLocations}
              route={props.history.push}
            />
          </div>
        </Grid>
      </Grid>
      <div className="py-5">
        <Container fixed className="pt-5">
          <div className="text-white text-center">
            <h1
              className="display-2 mb-2 px-4 font-weight-bold opacity-8 font-Montserrat-Alternates"
              style={{ color: "#142952" }}
            >
              Partners
            </h1>
            <h3
              className="font-size-xl line-height-md font-weight-light d-block mb-0 opacity-8 font-Montserrat-Alternates"
              style={{ color: "#142952" }}
            >
              Our products are used by a lot of big companies
            </h3>
          </div>
          <div className="divider border-2 mt-4 mb-4 mx-auto border-white bg-white opacity-2 rounded-circle w-50" />
          <Grid container spacing={4}>
            <Grid
              item
              md={6}
              xs={12}
              lg={3}
              className="d-flex align-items-stretch"
            >
              <div className="p-4 card mb-4 w-100">
                <img src={svgImage15} className="w-75 m-auto" alt="..." />
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              lg={3}
              className="d-flex align-items-stretch"
            >
              <div className="p-4 card mb-4 w-100">
                <img src={svgImage16} className="w-75 m-auto" alt="..." />
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              lg={3}
              className="d-flex align-items-stretch"
            >
              <div className="p-4 card mb-4 w-100">
                <img src={svgImage17} className="w-75 m-auto" alt="..." />
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              lg={3}
              className="d-flex align-items-stretch"
            >
              <div className="p-4 card mb-4 w-100">
                <img src={svgImage18} className="w-75 m-auto" alt="..." />
              </div>
            </Grid>
          </Grid>
        </Container>
        <div
          className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5 mt-5"
          style={{ color: "#003366" }}
        >
          <span className="text-center d-block  font-Montserrat-Alternates">
            Copyright &copy; 2020 -{" "}
            <a
              className="text-black"
              // href="https://welrus.com"
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
          </span>
        </div>
      </div>
    </Fragment>
  );
};

providerListWithMap.propTypes = {
  references: PropTypes.shape({
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      type: PropTypes.shape({
        providerLocations: PropTypes.arrayOf(
          PropTypes.shape({
            address: PropTypes.shape({
              lineOne: PropTypes.string,
              lineTwo: PropTypes.string,
              city: PropTypes.string,
              state: PropTypes.string,
              zipcode: PropTypes.string,
            }),
            id: PropTypes.number,
            name: PropTypes.shape({
              firstName: PropTypes.string,
              lastName: PropTypes.string,
            }),
            position: PropTypes.shape({
              lat: PropTypes.number,
              lng: PropTypes.number,
            }),
            providerId: PropTypes.number,
            services: PropTypes.arrayOf(
              PropTypes.shape({
                cpt4Code: PropTypes.string,
                price: PropTypes.number,
                providerServiceId: PropTypes.number,
                serviceId: PropTypes.number,
                serviceName: PropTypes.string,
                serviceType: PropTypes.string,
              })
            ),
          })
        ),
      }),
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default providerListWithMap;
