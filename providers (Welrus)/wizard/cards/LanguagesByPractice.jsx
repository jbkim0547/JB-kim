import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, Grid, Typography } from "@material-ui/core";
import PracticeLanguagesDataCard from "./PracticeLanguagesDataCard";

import debug from "sabio-debug";
const _logger = debug.extend("LanguagesByPractice");

const notOnFile = "data not entered";

const matchLanguages = (aPracticeId, languages) => {
  let result = [];
  if (languages && Array.isArray(languages)) {
    for (let i = 0; i < languages.length; i++) {
      const current = languages[i];
      if (current.tempPracticeId === aPracticeId) {
        const currentLanguage = {
          tempPracticeId: current.tempPracticeId,
          languageId: current.languageId,
          id: current.tempPracticeId.toString() + current.languageId.toString(),
        };
        result.push(currentLanguage);
      }
    }
  }
  _logger("matchLanguages result", result);
  return result;
};

function LanguagesByPractice({
  references,
  practices,
  locations,
  practiceLanguages,
  ...props
}) {
  _logger("rendering", props);

  const mapLanguageCard = (aPractice, index) => {
    const languages = matchLanguages(aPractice.id, practiceLanguages);

    return (
      <Card key={`${index}_vplcards`} className="p-3">
        <CardHeader
          title={
            <Typography variant="h4" className="font-weight-bold text-white">
              Practice: &nbsp;{" "}
              {aPractice.name
                ? ` Name: ${aPractice.name},`
                : ` Name: ${notOnFile},`}{" "}
              &nbsp;
              {getFacilityType(aPractice.facilityTypeId)}
            </Typography>
          }
          style={{ backgroundColor: "#3C447A", height: "50px" }}
        />
        <div>
          <h5 className="my-2 ml-5">
            {getAddressLines(getLocation(aPractice.tempLocationId))}
          </h5>
        </div>
        <PracticeLanguagesDataCard
          references={references}
          languages={languages}
        />
      </Card>
    );
  };

  function getLocation(id) {
    let result = null;
    if (id && locations) {
      result = locations.find((item) => {
        return item.tempLocationId === id;
      });
    }
    _logger("getLocation", result);
    return result;
  }

  function getAddressLines(aLocation) {
    let locationStr = "no location found";
    if (aLocation) {
      locationStr = `${aLocation.lineOne} ${
        aLocation.lineTwo ? aLocation.lineTwo : ""
      } ${aLocation.city}, ${getState(aLocation.stateId)} ${aLocation.zip}`;
    }
    _logger("getAddressLines", locationStr);
    return locationStr;
  }

  function getState(id) {
    let result = "";
    const found = references.states.find((singleRecord) => {
      return singleRecord.id === id;
    });
    if (found) {
      result = `${found.code}`;
    }
    return result;
  }

  function getFacilityType(id) {
    let result = "";
    if (references?.facilityTypes && id) {
      const facilityTypeObj = references.facilityTypes.find((facility) => {
        return facility.id === id;
      });
      if (facilityTypeObj) {
        result = facilityTypeObj.name;
      }
    }
    return result;
  }

  return <div style={{ width: "100%" }}>{practices.map(mapLanguageCard)}</div>;
}

LanguagesByPractice.propTypes = {
  practiceLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      languageId: PropTypes.number,
      tempPracticeId: PropTypes.number,
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

  references: PropTypes.shape({
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
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default LanguagesByPractice;
