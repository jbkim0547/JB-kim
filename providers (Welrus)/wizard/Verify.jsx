import React, { useEffect } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import HdrStrongIcon from "@material-ui/icons/HdrStrong";
import LanguageIcon from "@material-ui/icons/Language";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import StarsIcon from "@material-ui/icons/Stars";
import StarIcon from "@material-ui/icons/Star";
import BusinessIcon from "@material-ui/icons/Business";
// subcomponents
import Practices from "./cards/Practices";
import Locations from "./cards/Locations";
import AffiliationsDataCard from "./cards/AffiliationsDataCard";
import CertificationsDataCard from "./cards/CertificationsDataCard";
import ExpertiseDataCard from "./cards/ExpertiseDataCard";
import LanguagesByPractice from "./cards/LanguagesByPractice";
import LicensesDataCard from "./cards/LicensesDataCard";
import ProviderLanguagesDataCard from "./cards/ProviderLanguagesDataCard";
import SpecializationsDataCard from "./cards/SpecializationsDataCard";

import debug from "sabio-debug";
const _logger = debug.extend("Verify");

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const noDataToDisplay = `No data to display.  Return to the page to enter data.`;

const dataStillLoading = () => {
  return (
    <React.Fragment>
      <h1>One moment please while critical data loads</h1>
      <h1>Network connection is slow to respond</h1>
    </React.Fragment>
  );
};

const subHeadingText =
  "Please check your data carefully.  If you need to step back to a certain item, click on the appropriate icon.";
const subTitleText = "Data Entry Verification";

const Verify = (props) => {
  _logger("rendering", props);
  const classes = useStyles();

  const {
    // Formik HOC props
    values,
    isSubmitting,
    handleChange,
    handleSubmit,

    // Loki props
    backLabel,
    nextLabel,
    onBack,
    cantBack,
  } = props;

  useEffect(() => {
    props.setTopText(subTitleText);
    props.setSubHeadingText(subHeadingText);
  });

  const finish = () => {
    _logger("finishing");
    props.handleFinish();
  };

  // --------------------------------------------------  lookup handlers
  const findIdInList = (idToFind, listToSearch) => {
    const result = listToSearch.find((singleRecord) => {
      return singleRecord.id === idToFind;
    });
    return result;
  };

  function getGender(id) {
    let result = "";
    if (props?.references?.genderTypes) {
      const genderObj = findIdInList(id, props.references.genderTypes);
      if (genderObj) {
        result = genderObj.name;
      }
    }
    return result;
  }

  function getTitle(id) {
    let result = "";
    if (props?.references?.titleTypes) {
      const titleObj = findIdInList(id, props.references.titleTypes);
      if (titleObj) {
        result = titleObj.name;
      }
    }
    return result;
  }

  function idMapper(list) {
    // adds id property to objects in lists that do not have a unique id field
    let resultList = [];
    if (list && Array.isArray(list)) {
      resultList = list.map((item, index) => {
        if (!item?.id) {
          item.id = index + 1;
        }
        return item;
      });
    } else {
      resultList = list;
    }
    _logger(resultList);
    return resultList;
  }

  // --------------------------------------------------  render
  return (
    <React.Fragment>
      {props?.references ? (
        <form onSubmit={handleSubmit} className="p-1">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <LocalPhoneIcon className="mr-3" />
              <h4>{`Provider's Basic Details`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <h6>{`Provider's Basic Details`}</h6> */}
              <Typography
                variant="h5"
                className="font-weight-bold ml-5 mr-3"
                style={{ lineHeight: 2 }}
              >
                <div>
                  {props?.provider?.titleTypeId
                    ? `${getTitle(props.provider.titleTypeId)}`
                    : ""}
                  {` ${props?.currentUser?.firstName ?? ""}`}
                  {` ${props?.currentUser?.lastName ?? ""}`}
                </div>
                <div>
                  {props?.provider?.genderTypeId
                    ? `Gender: ${getGender(props.provider.genderTypeId)}`
                    : ""}
                </div>
                <div>
                  {props?.provider?.phone
                    ? `Phone: ${props.provider.phone}`
                    : ""}
                </div>
                <div>
                  {props?.provider?.fax ? `Fax: ${props.provider.fax}` : ""}
                </div>
                <div>
                  {props?.provider?.networks
                    ? `Networks: ${props.provider.networks}`
                    : ""}
                </div>
                <div>
                  {props?.provider?.npi
                    ? `NPI Number: ${props.provider.npi}`
                    : ""}
                </div>
                <div>
                  {props?.provider?.genderAccepted
                    ? `Accepted Patient Gender: ${getGender(
                        props.provider.genderAccepted
                      )}`
                    : ""}
                </div>
                <div>
                  {props?.provider?.isAccepting
                    ? `Accepting new patients`
                    : `Is not accepting new patients`}
                </div>
              </Typography>
              <div className="m-3"></div>
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ PROVIDER LANGUAGES */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <LanguageIcon className="mr-3" />
              <h4>{`Provider's Languages (${
                props?.provider?.languages?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.languages?.length > 0 ? (
                <ProviderLanguagesDataCard
                  references={props.references}
                  languages={props.provider.languages}
                />
              ) : (
                <Typography className="m-3">{noDataToDisplay}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ PRACTICE LOCATIONS */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <AddLocationIcon className="mr-3" />
              <h4>{`Practice Locations (${
                props?.provider?.locations?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.locations?.length > 0 && (
                <Locations
                  locations={props.provider.locations}
                  references={props.references}
                  showButtons={false}
                />
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ PRACTICES */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions3-content"
              id="additional-actions3-header"
            >
              <BusinessIcon className="mr-3" />
              <h4>{`Practice Details (${
                props?.provider?.practices?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.practices?.length > 0 && (
                <Practices
                  practices={props.provider.practices}
                  locations={props.provider.locations}
                  references={props.references}
                  showButtons={false}
                />
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ PRACTICE LANGUAGES */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <LanguageIcon className="mr-3" />
              <h4>{`Languages by Practice (${
                props?.provider?.practiceLanguages?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.practiceLanguages?.length > 0 ? (
                <LanguagesByPractice
                  references={props.references}
                  practiceLanguages={props.provider.practiceLanguages}
                  practices={props.provider.practices}
                  locations={props.provider.locations}
                />
              ) : (
                <Typography className="m-3">{noDataToDisplay}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ LICENSES */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <StarsIcon className="mr-3" />
              <h4>{`Licenses (${props?.provider?.licenses?.length ?? 0})`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.licenses?.length > 0 ? (
                <LicensesDataCard
                  references={props.references}
                  licenses={idMapper(props?.provider?.licenses)}
                />
              ) : (
                <Typography className="m-3">{noDataToDisplay}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ CERTIFICATIONS */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <CollectionsBookmarkOutlinedIcon className="mr-3" />
              <h4>{`Certifications (${
                props?.provider?.certifications?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.certifications?.length > 0 ? (
                <CertificationsDataCard
                  references={props.references}
                  certifications={idMapper(props.provider.certifications)}
                />
              ) : (
                <Typography className="m-3">{noDataToDisplay}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ SPECIALIZATIONS */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <StarIcon className="mr-3" />
              <h4>{`Specializations (${
                props?.provider?.specializations?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.specializations?.length > 0 ? (
                <SpecializationsDataCard
                  references={props.references}
                  specializations={idMapper(props?.provider?.specializations)}
                />
              ) : (
                <Typography className="m-3">{noDataToDisplay}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ EXPERTISE */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <HdrStrongIcon className="mr-3" />
              <h4>{`Provider's Areas of Expertise (${
                props?.provider?.expertise?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.expertise?.length > 0 ? (
                <ExpertiseDataCard
                  expertise={idMapper(props?.provider?.expertise)}
                />
              ) : (
                <Typography className="m-3">{noDataToDisplay}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ AFFILIATIONS */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <SupervisedUserCircleIcon className="mr-3" />
              <h4>{`Affiliations (${
                props?.provider?.affiliations?.length ?? 0
              })`}</h4>
              <Typography className={classes.heading}></Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props?.provider?.affiliations?.length > 0 ? (
                <AffiliationsDataCard
                  references={props.references}
                  affiliations={idMapper(props?.provider?.affiliations)}
                />
              ) : (
                <Typography className="m-3">{noDataToDisplay}</Typography>
              )}
            </AccordionDetails>
          </Accordion>
          {/* ------------------------------------ VERIFY */}
          <Card className="card-box mb-4 mt-3">
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6}>
                {/* --------------------------------------------title */}
                <div className="m-3">
                  <h6>This is the provider verification page.</h6>
                  <h6>Please check the data closely.</h6>
                  <h6>Clicking Finish will submit your data.</h6>
                </div>
                <div className="m-3">
                  <FormControlLabel
                    control={
                      <Checkbox
                        required={true} // required for tooltip warning
                        name="hasVerified"
                        checked={values.hasVerified}
                        onChange={handleChange}
                      />
                    }
                    label="I have verified the above information is correct."
                  />
                </div>

                {/* --------------------------------------------buttons */}
                <div className="button-group m-3">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onBack}
                    disabled={isSubmitting || cantBack}
                  >
                    {backLabel}
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-primary ml-1"
                    onClick={finish}
                    disabled={!values.hasVerified}
                  >
                    {nextLabel}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        </form>
      ) : (
        <div>{dataStillLoading()}</div>
      )}
    </React.Fragment>
  );
};

export default withFormik({
  mapPropsToValues: (props) => ({
    hasVerified: props.hasVerified,
  }),

  validationSchema: Yup.object().shape({
    hasVerified: Yup.bool()
      .required("Must verify data to continue")
      .oneOf([true], "Must verify data to continue"),
  }),

  handleSubmit: (values, { props }) => {
    _logger("formik handlesubmit", values, props);
    props.onNext({
      values,
    });
  },
})(Verify);

Verify.propTypes = {
  provider: PropTypes.shape({
    titleTypeId: PropTypes.number,
    genderTypeId: PropTypes.number,
    phone: PropTypes.string,
    fax: PropTypes.string,
    networks: PropTypes.string,
    npi: PropTypes.string,
    genderAccepted: PropTypes.number,
    isAccepting: PropTypes.bool,

    affiliations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        affiliationTypeId: PropTypes.number,
      })
    ),
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        certificationId: PropTypes.number,
      })
    ),
    expertise: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        languageId: PropTypes.number,
      })
    ),
    licenses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        licenseStateId: PropTypes.number,
        licenseNumber: PropTypes.string,
        dateExpires: PropTypes.instanceOf(Date),
      })
    ),
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        tempLocationId: PropTypes.number,
        locationTypeId: PropTypes.number,
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        city: PropTypes.string,
        stateId: PropTypes.number,
        zip: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      })
    ).isRequired,
    practices: PropTypes.arrayOf(
      PropTypes.shape({
        tempLocationId: PropTypes.number.isRequired,
        scheduleId: PropTypes.number,
        name: PropTypes.string,
        facilityTypeId: PropTypes.number.isRequired,
        phone: PropTypes.string.isRequired,
        fax: PropTypes.string,
        email: PropTypes.string,
        siteUrl: PropTypes.string,
        adaAccessible: PropTypes.bool.isRequired,
        insuranceAccepted: PropTypes.bool.isRequired,
        genderAccepted: PropTypes.number,
        id: PropTypes.number,
        tempPracticeId: PropTypes.number,
      })
    ).isRequired,
    practiceLanguages: PropTypes.arrayOf(
      PropTypes.shape({
        languageId: PropTypes.number,
        tempPracticeId: PropTypes.number,
      })
    ),
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        specializationId: PropTypes.number,
        isPrimary: PropTypes.bool,
      })
    ),
  }),

  currentUser: PropTypes.shape({
    profileId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    avatarUrl: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    userStatusId: PropTypes.number,
  }),

  references: PropTypes.shape({
    affiliationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    genderTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    facilityTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
      })
    ),
    locationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    titleTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),

  handleFinish: PropTypes.func.isRequired,
  // Set instructions and current subform title on Outer Component
  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,
  // withFormik props
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  // Loki props
  backLabel: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  cantBack: PropTypes.bool,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
  isInFinalStep: PropTypes.bool,
  // withFormik mapPropsToValues
  values: PropTypes.shape({
    hasVerified: PropTypes.bool,
  }),
  errors: PropTypes.shape({
    hasVerified: PropTypes.string,
  }),
  touched: PropTypes.shape({
    hasVerified: PropTypes.bool,
  }),
};
