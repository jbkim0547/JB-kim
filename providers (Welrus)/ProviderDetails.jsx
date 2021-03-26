import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Grid,
  GridList,
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";
import providerDetailsService from "@services/providerDetailsService";
import providerServiceService from "@services/providerServiceService";
import scheduleService from "@services/scheduleService";
import ProviderDetailsRenderProfile from "@components/providers/ProviderDetailsRenderProfile";
import ProviderDetailsRenderPractices from "@components/providers/ProviderDetailsRenderPractices";
import ProviderDetailsRenderAffiliations from "@components/providers/ProviderDetailsRenderAffiliations";
import ProviderDetailsRenderLanguages from "@components/providers/ProviderDetailsRenderLanguages";
import ProviderDetailsRenderLicenses from "@components/providers/ProviderDetailsRenderLicenses";
import ProviderDetailsRenderSpecializations from "@components/providers/ProviderDetailsRenderSpecializations";
import ProviderDetailsRenderProviderServices from "@components/providers/ProviderDetailsRenderProviderServices";
import ProviderLocationsRenderMap from "@components/locations/ProviderLocationsRenderMap";
import ProviderDetailsAppointments from "@components/providers/ProviderDetailsAppointments";
import debug from "sabio-debug";
import Comments from "../comments/Comments";

const _logger = debug.extend("ProviderDetails");
const _loggerErr = debug.extend("ERROR");

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

const ProviderDetails = (props) => {
  const isFirstRender = React.useRef(true);
  const [value, setValue] = React.useState(0);
  const [mappedData, setMappedData] = React.useState("");
  const [scheduleIdState, setScheduleIdState] = React.useState(0);
  const [scheduleData, setScheduleData] = React.useState("");
  const [schedule, setSchedule] = React.useState("");
  const [
    changingScheduleAndServices,
    setChangingScheduleAndServices,
  ] = React.useState(null);

  React.useEffect(() => {
    if (!isFirstRender.current) {
      onGetByIdSuccess("res", "changingScheduleAndServices");
    }
  }, [changingScheduleAndServices]);

  React.useEffect(() => {
    if (!isFirstRender.current) {
      getScheduleAvailabilityById();
      getProviderServicesByIds();
    }
  }, [scheduleIdState]);

  const getScheduleAvailabilityById = () => {
    let params = { id: scheduleIdState, pageIndex: 0, pageSize: 2000 };
    scheduleService
      .getScheduleAvailabilityById(params)
      .then(onGetScheduleAvailabilityByIdSuccess)
      .catch(onGetScheduleAvailabilityByIdError);
  };

  const onGetScheduleAvailabilityByIdSuccess = (res) => {
    _logger(res);
    _logger(
      "onGetScheduleAvailabilitySuccess//////////////////////////////////",
      res.item.pagedItems
    );
    const newEventArray = res.item.pagedItems;

    setScheduleData(newEventArray);
  };

  const onGetScheduleAvailabilityByIdError = (err) => {
    _logger(err);
  };

  const getProviderServicesByIds = () => {
    let params = {
      providerId: mappedData.providerDetails.id,
      scheduleId: scheduleIdState,
    };
    providerServiceService
      .getAll(params)
      .then(onGetProviderServicesByIdsSuccess)
      .catch(onGetProviderServicesByIdsError);
  };

  const onGetProviderServicesByIdsSuccess = (res) => {
    _logger(res);
    let medicalServices = res.item || res.items;
    setChangingScheduleAndServices(medicalServices);
  };

  const onGetProviderServicesByIdsError = (err) => {
    _logger(err);
  };

  React.useEffect(() => {
    isFirstRender.current = false; //toggles flag after first render/mounting
  }, []);

  React.useEffect(() => {
    //Note with Schedules*
    //if we want to add in multiple schedules for a provider, might be nice to through
    //in pagination 1,1 so the provider can *change which schedule he wants* ie: normal sched, holiday sched, etc
    //in that case, I'm keeping DateCreated/DateModified in the middle tier in case we decide to be able to edit schedules in that manner

    getScheduleByProviderId();
  }, []);

  const getScheduleByProviderId = () => {
    if (props?.location?.state?.providers?.id) {
      scheduleService
        .getScheduleByProviderId(props.location.state.providers.id)
        .then(onGetScheduleByProviderIdSuccess)
        .catch(onGetScheduleByProviderIdError);
    }
  };

  const onGetScheduleByProviderIdSuccess = (res) => {
    _logger(res);

    let schedules = res.item;

    localStorage.setItem("schedules", JSON.stringify(schedules));
  };

  const onGetScheduleByProviderIdError = (err) => {
    _logger(err);
  };

  React.useEffect(
    () => {
      _logger("useEffect Firing getById");
      const getById = async () => {
        if (props?.location?.state?.providers?.id) {
          providerDetailsService
            .getById(props.location.state.providers.id)
            .then(onGetByIdSuccess)
            .catch(onGetByIdError);
        }
      };
      getById();
      //this rerenders the entire page, but that's too much
    },
    []
    //[scheduleData]
  );

  const onGetByIdSuccess = (res, serviceNullChecker) => {
    if (typeof res === "object") {
      let [providerDetails] = res
        ? mappedData.providerDetails || res.item
        : null;
      _logger(
        "-----------------------PROVIDER DETAILS FROM API",
        providerDetails
      );

      const providerPractices = providerDetails.practices;

      let renderingServices = providerDetails;

      if (changingScheduleAndServices) {
        renderingServices = changingScheduleAndServices;
      }
      let medicalServiceTypes = renderServices(
        renderingServices,
        serviceNullChecker
      );
      //////////////////////////////////////////////////////
      const mappedAffiliations = providerDetails?.affiliations?.map(
        mapAffiliations
      );
      const mappedLanguages = providerDetails?.languages?.map(mapLanguages);
      const mappedLicenses = providerDetails?.licenses?.map(mapLicenses);
      const mappedSpecializations = providerDetails?.providerSpecializations?.map(
        mapSpecializations
      );
      const mappedPractices = providerDetails?.practices?.map(mapPractices);
      const mappedProviderServices = medicalServiceTypes?.map(
        mapProviderServices
      );

      _logger(
        "-=======================================before and after FILTER",
        medicalServiceTypes
      );

      let providerDetailsResponse = {
        providerDetails,
        mappedAffiliations,
        mappedLanguages,
        mappedLicenses,
        mappedSpecializations,
        mappedPractices,
        mappedProviderServices,
        medicalServiceTypes,
        providerPractices,
        scheduleData,
      };

      _logger(
        "-----------------------MAPPED OBJECTS FROM API",
        providerDetailsResponse
      );

      setMappedData(providerDetailsResponse);
    } else {
      let providerDetails = mappedData.providerDetails;
      //create a useEffect to run this function when serviceReRenderIntoThis useHook is updated
      //use an extra argument which is either blank or is populated by that useEffect
      _logger(
        "-----------------------PROVIDER DETAILS FROM API",
        providerDetails
      );

      const providerPractices = providerDetails.practices;

      //const providerServicesToBeFiltered = renderServices(providerDetails);
      // const providerServicesToBeFiltered = providerDetails.providerServices;

      // const namesOfmedicalServiceTypesArray = [
      //   ...new Set(
      //     providerServicesToBeFiltered.map((arr) => arr.medicalServiceType.name)
      //   ),
      // ];

      // const medicalServiceTypes = namesOfmedicalServiceTypesArray.map((type) => {
      //   let obj = { list: [] };
      //   providerServicesToBeFiltered.forEach((item) => {
      //     if (type === item.medicalServiceType.name) {
      //       obj.name = type;
      //       obj.list.push(item);
      //     }
      //   });
      //   return obj;
      // });

      // _logger(medicalServiceTypes);
      let renderingServices = providerDetails;

      if (changingScheduleAndServices) {
        renderingServices = changingScheduleAndServices;
      }
      let medicalServiceTypes = renderServices(
        renderingServices,
        serviceNullChecker
      );
      //////////////////////////////////////////////////////
      const mappedAffiliations = providerDetails?.affiliations?.map(
        mapAffiliations
      );
      const mappedLanguages = providerDetails?.languages?.map(mapLanguages);
      const mappedLicenses = providerDetails?.licenses?.map(mapLicenses);
      const mappedSpecializations = providerDetails?.providerSpecializations?.map(
        mapSpecializations
      );
      const mappedPractices = providerDetails?.practices?.map(mapPractices);
      const mappedProviderServices = medicalServiceTypes?.map(
        mapProviderServices
      );

      _logger(
        "-=======================================before and after FILTER",
        medicalServiceTypes
      );

      let providerDetailsResponse = {
        providerDetails,
        mappedAffiliations,
        mappedLanguages,
        mappedLicenses,
        mappedSpecializations,
        mappedPractices,
        mappedProviderServices,
        medicalServiceTypes,
        providerPractices,
        scheduleData,
      };

      _logger(
        "-----------------------MAPPED OBJECTS FROM API",
        providerDetailsResponse
      );

      setMappedData(providerDetailsResponse);
    }
  };

  const onGetByIdError = (err) => {
    _loggerErr(err);
  };

  const renderServices = (item, id) => {
    let result;
    switch (typeof id) {
      case "undefined":
        result = renderServicesFunction(item.providerServices);
        return result;
        break;

      case "string":
        result = renderServicesFunction(item);
        return result;
        break;

      default:
        return null;
    }
  };

  const renderServicesFunction = (item) => {
    if (item) {
      const providerServicesToBeFiltered = item;

      const namesOfmedicalServiceTypesArray = [
        ...new Set(
          providerServicesToBeFiltered.map((arr) => arr.medicalServiceType.name)
        ),
      ];

      const medicalServiceTypes = namesOfmedicalServiceTypesArray.map(
        (type) => {
          let obj = { list: [] };
          providerServicesToBeFiltered.forEach((item) => {
            if (type === item.medicalServiceType.name) {
              obj.name = type;
              obj.list.push(item);
            }
          });
          return obj;
        }
      );

      _logger(medicalServiceTypes);

      return medicalServiceTypes;
    } else {
      return null;
    }
  };

  function mapAffiliations(mappedAffiliations) {
    return (
      <div key={`affiliations-${mappedAffiliations.id}`}>
        <ProviderDetailsRenderAffiliations affiliations={mappedAffiliations} />
      </div>
    );
  }

  function mapLanguages(mappedLanguages) {
    return (
      <div key={`languages-${mappedLanguages.id}`}>
        <ProviderDetailsRenderLanguages languages={mappedLanguages} />
      </div>
    );
  }

  function mapLicenses(mappedLicenses) {
    return (
      <div key={`licenses-${mappedLicenses.id}`}>
        <ProviderDetailsRenderLicenses licenses={mappedLicenses} />
      </div>
    );
  }

  function mapSpecializations(mappedSpecializations) {
    return (
      <div key={`specializations-${mappedSpecializations.id}`}>
        <ProviderDetailsRenderSpecializations
          providerSpecializations={mappedSpecializations}
        />
      </div>
    );
  }

  function mapPractices(mappedPractices) {
    return (
      <div key={`practices-${mappedPractices.id}`}>
        <ProviderDetailsRenderPractices practices={mappedPractices} />
      </div>
    );
  }

  function mapProviderServices(mappedProviderServices) {
    return (
      <div
        key={`providerServices-${incrementString(mappedProviderServices.name)}`}
      >
        <ProviderDetailsRenderProviderServices
          medicalServiceTypes={mappedProviderServices}
          manageCartCount={props.manageCartCount}
        />
      </div>
    );
  }

  function incrementString(str) {
    // Find the trailing number or it will match the empty string
    var count = str.match(/\d*$/);

    // Take the substring up until where the integer was matched
    // Concatenate it to the matched count incremented by 1
    return str.substr(0, count.index) + ++count[0];
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSchedule = (event, newValue) => {
    let scheduleId = newValue.props.value;
    //insert id into useState

    setSchedule(scheduleId);

    setScheduleIdState(scheduleId);
  };

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
          <div className="bg-midnight-bloom p-3 rounded text-white h-100">
            <ProviderDetailsRenderProfile
              providerDetails={mappedData.providerDetails}
              fullProps={props}
              handleChangeSchedule={handleChangeSchedule}
              schedule={schedule}
              scheduleIdState={scheduleIdState}
            />
            <div className="font-weight-bold font-size-lg d-flex align-items-center mb-3">
              <Box component="span" mr={2}>
                <FontAwesomeIcon
                  icon={["far", "building"]}
                  className="font-size-xxl"
                />
              </Box>
              <span>Affiliations</span>
            </div>
            {mappedData.mappedAffiliations}
            <div className="divider opacity-2 my-4" />
            <div className="font-weight-bold font-size-lg d-flex align-items-center mb-3">
              <FontAwesomeIcon
                icon={["far", "comment-dots"]}
                className="font-size-xxl mr-3"
              />
              <span>Languages</span>
            </div>
            {mappedData.mappedLanguages}
            <div className="divider opacity-2 my-4" />
            <div className="font-weight-bold font-size-lg d-flex align-items-center mb-3">
              <FontAwesomeIcon
                icon={["far", "object-group"]}
                className="font-size-xxl mr-3"
              />
              <span>Licenses</span>
            </div>
            {mappedData.mappedLicenses}
            <div className="divider opacity-3 my-4" />
            <div className="font-weight-bold font-size-lg d-flex align-items-center mb-3">
              <SchoolOutlinedIcon
                color="#FFFFFF"
                style={{ fontSize: 30 }}
                className="mr-3"
              />
              <span>Specializations</span>
            </div>
            {mappedData.mappedSpecializations}
          </div>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={handleChange}
          >
            <Tab label="Services" />
            <Tab label="Locations" />
            <Tab label="Reviews" />
            <Tab label="Appointments" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div className="text-left mt-3 mb-4">
              <h1 className="display-4 text-black mb-2 font-weight-bold">
                Services
              </h1>
              <p className="font-size-lg text-black-50 mb-3">
                This is what the Provider offers
              </p>
            </div>
            <Grid container spacing={4} className="mt-3">
              <Grid item xs={12} lg={12}>
                <GridList cols={3} cellHeight={"auto"} spacing={8}>
                  {mappedData.mappedProviderServices}
                </GridList>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="text-left mt-3 mb-4">
              <h1 className="display-4 text-black mb-2 font-weight-bold">
                Locations And Practices
              </h1>
              <p className="font-size-lg text-black-50 mb-3">
                Find what you need, where you need it.
              </p>
            </div>
            <Card className="card-box">
              <div className="bg-composed-wrapper bg-midnight-bloom mt-0">
                <div className="bg-composed-wrapper--image bg-composed-img-2" />
                <div className="bg-composed-wrapper--content text-light p-3">
                  <h6 className="mb-1 font-weight-bold">Practices</h6>
                  {/* <p className="mb-0 opacity-7">
                  </p> */}
                </div>
              </div>
              <List>
                <div className="scroll-area shadow-overflow">
                  <PerfectScrollbar>
                    <ListItem button className="align-box-row">
                      <CardContent className="p-0">
                        <List className="my-3">
                          <Card>{mappedData.mappedPractices}</Card>
                        </List>
                      </CardContent>
                    </ListItem>
                    <Divider />
                  </PerfectScrollbar>
                </div>
              </List>

              <div className="card-footer bg-light text-center">
                <Button size="small" color="primary" variant="contained">
                  View details
                </Button>
              </div>
            </Card>
            {/* <ProviderLocationsRenderMap
              practices={mappedData.providerPractices}
              providerId={props?.location?.state?.providers?.id}
            /> */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="text-left mt-3 mb-4">
              <h1 className="display-4 text-black mb-2 font-weight-bold">
                Reviews
              </h1>
              <p className="font-size-lg text-black-50 mb-3">
                Review highlights
              </p>
            </div>
            <div
              className="scroll-area shadow-overflow"
              style={{ height: "70vh" }}
            >
              <PerfectScrollbar>
                <Comments showTotalRating />
              </PerfectScrollbar>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="text-left mt-3 mb-4">
              <h1 className="display-4 text-black mb-2 font-weight-bold">
                Scheduling
              </h1>
              <p className="font-size-lg text-black-50 mb-3">
                Let us find your service and desired date
              </p>
            </div>
            <div className="mt-1">
              <ProviderDetailsAppointments
                scheduleData={scheduleData}
                mappedProviderServices={mappedData.mappedProviderServices}
                props={props}
                providerDetails={mappedData}
              />
            </div>
          </TabPanel>
        </Grid>
      </Grid>
      <div className="sidebar-inner-layout-overlay" />
    </Fragment>
  );
};

ProviderDetails.propTypes = {
  manageCartCount: PropTypes.func,
  location: PropTypes.shape({
    state: PropTypes.shape({
      providers: PropTypes.shape({
        id: PropTypes.number.isRequired,
        phone: PropTypes.number.isRequired,
        fax: PropTypes.string.isRequired,
        networks: PropTypes.string.isRequired,
        professionalDetail: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          npi: PropTypes.number.isRequired,
          genderAccepted: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }),
          isAccepting: PropTypes.bool.isRequired,
        }),
        titleType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
        userProfile: PropTypes.shape({
          id: PropTypes.number.isRequired,
          userId: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          mi: PropTypes.string.isRequired,
          avatarUrl: PropTypes.string.isRequired,
        }),
        genderType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
        affiliations: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          affiliationType: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }),
        }),
        languages: PropTypes.shape({
          id: PropTypes.number.isRequired,
          code: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        licenses: PropTypes.shape({
          id: PropTypes.number.isRequired,
          state: PropTypes.shape({
            id: PropTypes.number.isRequired,
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          }),
          licenseNumber: PropTypes.string.isRequired,
          dateExpires: PropTypes.string.isRequired,
        }),
        providerSpecializations: PropTypes.shape({
          isPrimary: PropTypes.string.isRequired,
          specialization: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  }),
};

export default ProviderDetails;
