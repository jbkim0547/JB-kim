import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ScheduleFormV2 from "@components/schedules/ScheduleFormV2";
import ScheduleFormV3 from "@components/schedules/ScheduleFormV3";
import debug from "sabio-debug";
const _logger = debug.extend("ScheduleStepper");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ["Select Date", "Select Start Time", "Select End Time"];
}

export default function ScheduleStepper(props) {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ScheduleFormV3
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
          />
        );
      case 1:
        return (
          <ScheduleFormV2
            selectedDate={props.selectedDate2}
            setSelectedDate={props.setSelectedDate2}
          />
        );
      case 2:
        return (
          <ScheduleFormV2
            selectedDate={props.selectedDate3}
            setSelectedDate={props.setSelectedDate3}
          />
        );
      default:
        return "Unknown step";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography component={"span"} variant={"body2"}>
                {getStepContent(index)}
              </Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

ScheduleStepper.propTypes = {
  fullProps: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        providerId: PropTypes.number.isRequired,
      }),
    }),
  }),
  selectedDate: PropTypes.instanceOf(Date),
  selectedDate2: PropTypes.instanceOf(Date),
  selectedDate3: PropTypes.instanceOf(Date),
  setSelectedDate: PropTypes.func,
  setSelectedDate2: PropTypes.func,
  setSelectedDate3: PropTypes.func,
};
