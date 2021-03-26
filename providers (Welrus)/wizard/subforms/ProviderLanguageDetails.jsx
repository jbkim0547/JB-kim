import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, Card, Grid } from "@material-ui/core";
import AutocompleteMultiLanguages from "./formsupport/AutocompleteMultiLanguages";

import debug from "sabio-debug";
const _logger = debug.extend("ProviderLanguageDetails");

const subHeadingText =
  "Enter the details for your personal languages which you speak.";
const subTitleText = "Enter your Languages here";

class ProviderLanguageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerMerge: false,
      isValid: false,
    };
    _logger("rendering", props);
  }

  componentDidMount() {
    this.props.setTopText(subTitleText);
    this.props.setSubHeadingText(subHeadingText);
    _logger("componentDidMount", this.props.languages);
  }

  setValidity = (isValid) => {
    if (isValid !== this.state.isValid) {
      this.setState((prevState) => {
        return { isValid };
      });
    }
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
            // type="submit"
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

  handleBack = (event) => {
    this.setState((prevState) => {
      return {
        triggerMerge: true,
      };
    }, this.props.onBack);
  };

  handleNext = (event) => {
    this.setState((prevState) => {
      return {
        triggerMerge: true,
      };
    }, this.props.onNext);
  };

  render() {
    return (
      <form className="p-1">
        <Card>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <AutocompleteMultiLanguages
                    languages={this.props.languages}
                    references={this.props.references}
                    triggerMerge={this.state.triggerMerge}
                    mergeNow={this.props.mergeNow}
                    isRequired={true}
                    setValidity={this.setValidity}
                  />
                </Grid>
              </Grid>

              {/* -------------------------------------------bottom buttons */}
              {this.getBackNextButtons()}

              {/* -------------------------------------------END */}
            </Grid>
          </Grid>
        </Card>
      </form>
    );
  }
}

export default ProviderLanguageDetails;

ProviderLanguageDetails.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      languageId: PropTypes.number,
    })
  ),

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

  // optional loki props
  backLabel: PropTypes.string,
  cantBack: PropTypes.bool,
  nextLabel: PropTypes.string,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
