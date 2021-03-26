import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Card, Grid } from "@material-ui/core";
import PracticeLanguageSelectCard from "./formsupport/PracticeLanguageSelectCard";

import debug from "sabio-debug";
const _logger = debug.extend("PracticeLanguageDetails");

const subHeadingText = "Enter languages available at a particular practice.";
const subTitleText = "Enter Practice Languages here";

class PracticeLanguageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languagesByPractice: [],
      triggerMerge: false,
      validList: [],
      isValid: false,
      isRequired: true,
    };

    _logger("rendering", props);
  }

  componentDidMount() {
    this.props.setTopText(subTitleText);
    this.props.setSubHeadingText(subHeadingText);

    if (this.props.practices && this.props.practices.length > 0) {
      _logger("componentDidMount", this.props.practices);
      this.cardMapper(this.props.practices);
    }
    this.initArrays();
  }

  initArrays = () => {
    if (this.props.practices.length > 0) {
      let languagesByPractice = [];
      let validList = [];
      for (let i = 0; i < this.props.practices.length; i++) {
        languagesByPractice.push([]);
        validList.push(false);
      }
      const isValid = this.checkValidity(validList);

      _logger("initArrays", languagesByPractice);
      this.setState((prevState) => {
        return {
          ...prevState,
          languagesByPractice,
          validList,
          isValid,
        };
      });
    }
  };

  // --------------------------------------------- Special Handlers
  mergeGroup = (incoming, index) => {
    _logger("merge by practice group", incoming, index);

    setTimeout(() => {
      this.setState((prevState) => {
        let validList = [...prevState.validList];
        validList[index] = incoming.isValid;

        let languagesByPractice = [...prevState.languagesByPractice];
        languagesByPractice[index] = incoming.languages;

        _logger("mergeGroup 2 result:", languagesByPractice, validList);
        return {
          ...prevState,
          languagesByPractice,
          validList,
          isValid: this.checkValidity(validList),
          triggerMerge: false,
        };
      });
    }, 0);
  };

  mergeLanguagesAndExit = (callback) => {
    let practiceLanguages = [];
    const languagesSet = this.state.languagesByPractice;
    const practiceCount = languagesSet.length;
    for (let i = 0; i < practiceCount; i++) {
      const currentPractice = languagesSet[i];

      if (currentPractice?.length > 0) {
        for (let j = 0; j < currentPractice.length; j++) {
          practiceLanguages.push(currentPractice[j]);
        }
      }
    }
    _logger("mergeAndExit result :", practiceLanguages);
    this.props.mergeNow({ practiceLanguages });
    callback();
  };

  handleBack = (event) => {
    _logger("handleBack");
    this.mergeLanguagesAndExit(this.props.onBack);
  };

  handleNext = (event) => {
    _logger("handleNext");
    this.mergeLanguagesAndExit(this.props.onNext);
  };

  setValidity = (isValid, index) => {
    let currentValid = [...this.state.validList];
    currentValid[index] = isValid;
    this.setState((prevState) => {
      return {
        ...prevState,
        validList: currentValid,
        isValid: this.checkValidity(currentValid),
      };
    });
  };

  checkValidity = (currentValidList) => {
    let result = true;
    if (this.state.isRequired) {
      for (let i = 0; i < currentValidList.length; i++) {
        if (currentValidList[i] === false) {
          result = false;
          break;
        }
      }
    }
    _logger("checkValidity", result, this.state.isRequired, currentValidList);
    return result;
  };

  // --------------------------------------------- Render
  cardMapper = (practices) => {
    _logger("cardMapper");
    this.setState((prevState) => {
      return {
        ...prevState,
        mappedCards: practices.map(this.mapPracticeLanguageCard),
      };
    });
  };

  mapPracticeLanguageCard = (aPractice, index) => {
    _logger("mapPracticeLanguageCard", aPractice);

    const tempId = aPractice.tempPracticeId;
    return (
      <div key={`pracLangCard_${tempId}`}>
        <PracticeLanguageSelectCard
          practice={aPractice}
          location={this.findIdInLocations(
            aPractice.tempLocationId,
            this.props.locations
          )}
          references={this.props.references}
          practiceLanguages={this.props.practiceLanguages}
          isRequired={this.state.isRequired}
          setValidity={(isValid) => this.setValidity(isValid, index)}
          mergeNow={(update) => this.mergeGroup(update, index, tempId)}
          triggerMerge={this.state.triggerMerge}
          autoMerge={true}
        />
      </div>
    );
  };

  findIdInLocations = (idToFind, locations) => {
    const result = locations.find((singleRecord) => {
      return singleRecord.tempLocationId === idToFind;
    });
    _logger("findIdInLocations", result);
    return result;
  };

  getBackNextButtons = () => {
    return (
      <Grid container justify="center" spacing={1}>
        <Grid
          item
          style={{
            paddingTop: "80px",
            marginLeft: "15px",
            paddingBottom: "25px",
          }}
        >
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            type="button"
            className="btn btn-secondary"
            variant="outlined"
            onClick={this.handleBack}
            disabled={!this.state.isValid}
          >
            {this.props.backLabel}
          </Button>
        </Grid>
        <Grid
          item
          style={{
            paddingTop: "80px",
            marginLeft: "15px",
            paddingBottom: "25px",
          }}
        >
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            type="button"
            variant="contained"
            color="secondary"
            onClick={this.handleNext}
            disabled={!this.state.isValid}
          >
            {this.props.nextLabel}
          </Button>
        </Grid>
      </Grid>
    );
  };

  render() {
    return (
      <form className="p-1">
        <Card>
          <Grid container>
            <Grid item xs={12}>
              {this.state.mappedCards}
              {this.getBackNextButtons()}
            </Grid>
          </Grid>
        </Card>
      </form>
    );
  }
}

export default PracticeLanguageDetails;

PracticeLanguageDetails.propTypes = {
  practiceLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      languageId: PropTypes.number,
      tempPracticeId: PropTypes.number,
    })
  ),

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
      tempPracticeId: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,

  locations: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,

  references: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  mergeNow: PropTypes.func.isRequired,

  // Set instructions and current subform title on Outer Component
  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,

  // withFormik props
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  setFieldValue: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleReset: PropTypes.func,
  handleSubmit: PropTypes.func,
  // Loki props
  backLabel: PropTypes.string,
  cantBack: PropTypes.bool,
  nextLabel: PropTypes.string,
  onBack: PropTypes.func,
  onNext: PropTypes.func,

  getTagProps: PropTypes.arrayOf(PropTypes.object),

  // withFormik mapPropsToValues
  values: PropTypes.shape({
    practiceLanguages: PropTypes.arrayOf(
      PropTypes.shape({
        languageId: PropTypes.number,
        tempPracticeId: PropTypes.number,
      })
    ),
  }),
  touched: PropTypes.shape({
    practiceLanguages: PropTypes.arrayOf(
      PropTypes.shape({
        languageId: PropTypes.bool,
        tempPracticeId: PropTypes.bool,
      })
    ),
  }),
  errors: PropTypes.shape({
    practiceLanguages: PropTypes.arrayOf(
      PropTypes.shape({
        languageId: PropTypes.string,
        tempPracticeId: PropTypes.string,
      })
    ),
  }),
};
