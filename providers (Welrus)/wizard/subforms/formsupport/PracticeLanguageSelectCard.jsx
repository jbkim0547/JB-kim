import { React, useState } from "react";
import PropTypes from "prop-types";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AutocompleteMultiLanguages from "../formsupport/AutocompleteMultiLanguages";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import debug from "sabio-debug";
const _logger = debug.extend("PracticeLanguageSelectCard");

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const practicePropertyKey = "tempPracticeId";
const noData = "no data entered";

const PracticeLanguageSelectCard = (props) => {
  _logger("rendering", props);

  const { practice, practiceLanguages } = props;
  const classes = useStyles();
  const [languageCount, setLanguageCount] = useState(0);
  const [errorFlag, setErrorFlag] = useState(false);
  const [remountCount, setRemountCount] = useState(0);
  const refresh = () => setRemountCount(remountCount + 1);

  //------------------------------------------ Finders
  const matchLanguages = (aPracticeId, languages) => {
    let result = [];
    if (languages && Array.isArray(languages)) {
      for (let i = 0; i < languages.length; i++) {
        const current = languages[i];
        if (current.tempPracticeId === aPracticeId) {
          const currentLanguage = {
            tempPracticeId: current.tempPracticeId,
            languageId: current.languageId,
          };
          result.push(currentLanguage);
        }
      }
    }
    if (languageCount !== result.length) {
      setLanguageCount(result.length);
    }
    _logger("matchLanguages result", result);
    return result;
  };

  function getAddressLines() {
    let locationStr = null;
    if (props.location) {
      locationStr = `${props.location.lineOne} ${
        props.location.lineTwo ? props.location.lineTwo : ""
      } ${props.location.city}, ${getState(props.location.stateId)} ${
        props.location.zip
      }`;
    }
    return locationStr;
  }

  function getState(id) {
    let result = "";
    const found = props.references.states.find((singleRecord) => {
      return singleRecord.id === id;
    });
    if (found) {
      result = `${found.code}`;
    }
    return result;
  }

  function getFacilityType(id) {
    let result = "";
    if (props?.references?.facilityTypes && id) {
      const facilityTypeObj = props.references.facilityTypes.find(
        (facility) => {
          return facility.id === id;
        }
      );
      if (facilityTypeObj) {
        result = facilityTypeObj.name;
      }
    }
    return result;
  }

  //------------------------------------------ Handlers
  const mergeDataSniff = (updatedLanguages) => {
    _logger("mergeDataSniff", updatedLanguages);
    let list = updatedLanguages.languages;
    _logger(list);
    let shouldRender = false;
    if (list.length !== languageCount) {
      _logger("updating count", list.length);
      setLanguageCount(list.length);
      shouldRender = true;
    }
    if (updatedLanguages.isValid !== errorFlag) {
      setErrorFlag(updatedLanguages.isValid);
      shouldRender = true;
    }
    if (shouldRender) refresh();
    props.mergeNow(updatedLanguages);
  };

  //------------------------------------------ Render
  return (
    <Card className="m-3">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <h4>{`Languages assigned: ${languageCount}`}</h4>
          <h4 className="mx-3">{`- ${
            practice.name ? practice.name : "practice not named"
          } - 
           ${getFacilityType(practice.facilityTypeId)}`}</h4>
        </AccordionSummary>
        <AccordionDetails>
          <div className="m-3"></div>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* -------------------------------------------practice info */}
              <h6>Info for the current practice:</h6>
              <Typography className={classes.heading}>
                {getAddressLines()}
              </Typography>
              <Typography className={classes.heading}>
                {`Phone: ${practice.phone}`}
              </Typography>
              <Typography className={classes.heading}>
                {`Fax: ${practice.fax ? practice.fax : noData}`}
              </Typography>
              <Typography className={classes.heading}>
                {`Email: ${practice.email ? practice.email : noData}`}
              </Typography>
              <Typography className={classes.heading}>
                {`Website: ${practice.siteUrl ? practice.siteUrl : noData}`}
              </Typography>
            </Grid>
            {/* -------------------------------------------language select */}
            <Grid item xs={12}>
              <h6>{`Choose a language`}</h6>

              <AutocompleteMultiLanguages
                languages={matchLanguages(
                  practice.tempPracticeId,
                  practiceLanguages
                )}
                references={props.references}
                triggerMerge={props.triggerMerge}
                mergeNow={mergeDataSniff}
                isRequired={props.isRequired}
                setValidity={props.setValidity}
                entityName={practicePropertyKey}
                entityId={practice.tempPracticeId}
                autoMerge={props.autoMerge}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default PracticeLanguageSelectCard;

PracticeLanguageSelectCard.propTypes = {
  practiceLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      languageId: PropTypes.number,
      tempPracticeId: PropTypes.number,
    })
  ),

  practice: PropTypes.shape({
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
    tempPracticeId: PropTypes.number.isRequired,
  }).isRequired,

  location: PropTypes.shape({
    id: PropTypes.number,
    tempLocationId: PropTypes.number,
    locationTypeId: PropTypes.number,
    lineOne: PropTypes.string,
    lineTwo: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    stateId: PropTypes.number,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,

  references: PropTypes.shape({
    facilityTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
      })
    ).isRequired,
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  mergeNow: PropTypes.func.isRequired,
  autoMerge: PropTypes.bool,
  triggerMerge: PropTypes.bool,
  isRequired: PropTypes.bool,
  setValidity: PropTypes.func,
};
