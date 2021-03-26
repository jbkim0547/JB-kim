import React, { Component, Fragment } from "react"; 
import PropTypes from "prop-types";
import { PageTitle, WrapperSimple } from "@layout-components";
import { Grid } from "@material-ui/core";
import ProviderForm from "@components/providers/wizard/ProviderForm";

import debug from "sabio-debug";
const _logger = debug.extend("ProviderWizard");

class ProviderWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDescription: "Start by entering some basic details.",
      sectionHeadingText: "Provider Form",
    };
    _logger("rendering");
  }

  updateTopDescription = (instructions) => {
    if (instructions !== this.state.topDescription) {
      this.setState((prevState) => {
        return { ...prevState, topDescription: instructions };
      });
    }
  };

  upSectionHeadingText = (instructions) => {
    if (instructions !== this.state.sectionHeadingText) {
      this.setState((prevState) => {
        return { ...prevState, sectionHeadingText: instructions };
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <WrapperSimple sectionHeading={this.state.sectionHeadingText}>
              <ProviderForm
                currentUser={this.props.currentUser}
                references={this.props.references}
                setSubHeadingText={this.upSectionHeadingText}
                setTopText={this.updateTopDescription}
                history={this.props.history}
              ></ProviderForm>
            </WrapperSimple>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default ProviderWizard;

ProviderWizard.propTypes = {
  references: PropTypes.shape({}),
  currentUser: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
