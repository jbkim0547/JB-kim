import { React, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Container } from "@material-ui/core";
import debug from "sabio-debug";
const _logger = debug.extend("WizardInfo");

const subHeadingText = "Provider`s Form";
const subTitleText =
  "Below is an overview of the steps you will be using to load your info.";

const WizardInfo = (props) => {
  _logger("rendering", props);

  useEffect(() => {
    props.setTopText(subTitleText);
    props.setSubHeadingText(subHeadingText);
  });

  function handleNext(event) {
    props.onNext();
  }

  return (
    <Grid container spacing={4}>
      <div style={{ marginLeft: "50px" }}>
        <span>&nbsp;&nbsp;</span>

        <p
          className="font-size-lg text-black-50 font-Montserrat-Alternates"
          style={{ paddingTop: "50px", marginLeft: "250px" }}
        >
          {" "}
          This is the provider wizard info page. Here is a brief overview of the
          steps ahead:
        </p>
      </div>

      <div className="text-center" style={{ paddingTop: "50px" }}>
        <Button
          type="submit"
          className="my-2"
          onClick={handleNext}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "650px" }}
        >
          {props.nextLabel}
        </Button>
      </div>
    </Grid>
  );
};

export default WizardInfo;

WizardInfo.propTypes = {
  // Set instructions and current subform title on Outer Component
  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,
  // Loki props
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
