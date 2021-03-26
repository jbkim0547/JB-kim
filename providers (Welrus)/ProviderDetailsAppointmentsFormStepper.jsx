import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShoppingCartModal from "../payments/ShoppingCartModal";
import PaymentFormModal from "../payments/PaymentFormModal";
import PaymentReviewModal from "../payments/PaymentReviewModal";
import { useHistory } from "react-router-dom";
import {
  Card,
  List,
  Divider,
  ListItem,
  Grid,
  GridList,
  Box,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProviderDetailsRenderProviderServices from "@components/providers/ProviderDetailsRenderProviderServices";
import ProviderDetailsAppointmentsFormStepperFullDialog from "@components/providers/ProviderDetailsAppointmentsFormStepperFullDialog";
import scheduleService from "@services/scheduleService";
import appointmentService from "@services/appointmentService";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsAppointmentsFormStepper");

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Select an appointment date",
    "Select a service",
    "Checkout",
    "Payment",
    "Payment Confirmation",
  ];
}

export default function ProviderDetailsAppointmentsFormStepper(props) {
  const history = useHistory();
  const classes = useStyles();
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(false);

  const onCheckoutFinished = () => {
    _logger("ON CHECKOUT FINISHED", props);

    _logger(props.props.clickedAppointmentDetails.id);

    let params = {
      id: props.props.clickedAppointmentDetails.id,
      payload: {
        Status: 2,
      },
    };

    updateStatusScheduleAvailability(params);
  };

  const updateStatusScheduleAvailability = (params) => {
    scheduleService
      .updateStatusScheduleAvailability(params)
      .then(onUpdateStatusScheduleAvailabilitySuccess)
      .catch(onUpdateStatusScheduleAvailabilityError);
  };

  const onUpdateStatusScheduleAvailabilitySuccess = (res) => {
    _logger(res);
    _logger("NOTES FOR PAYLOAD", props);

    _logger(props.props.props.scheduleData);

    let newEvents = props.props.scheduleDataState;

    let oldEventIndex = newEvents.findIndex(
      (event) => event.id === props.props.clickedAppointmentDetails.id
    );

    let parameters = newEvents[oldEventIndex];

    newEvents[oldEventIndex] = {
      id: props.props.clickedAppointmentDetails.id,
      createdBy: parameters.createdBy,
      dateCreated: parameters.dateCreated,
      dateModified: parameters.dateModified,
      dayOfWeek: parameters.dayOfWeek,
      endTime: parameters.endTime,
      modifiedBy: parameters.modifiedBy,
      scheduleId: parameters.scheduleId,
      startTime: parameters.startTime,
      status: 2,
    };

    _logger("changing status and name of schedule", newEvents[oldEventIndex]);

    props.props.dayOfWeekSwitch(newEvents);
  };

  const onUpdateStatusScheduleAvailabilityError = (err) => {
    _logger(err);
  };

  const checkCart = (confirmCart) => {
    setCartItems(confirmCart);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return renderAppointmentConfirmation(props);
      case 1:
        return renderServices(props);
      case 2:
        return renderCheckout(props, checkCart);
      case 3:
        return renderPayment(props, handleNext);
      case 4:
        return renderPaymentReview(props);
      default:
        return "Unknown step";
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const cartHandleClick = () => {
    _logger("Cart Icon clicked");
    localStorage.setItem("providerProps", JSON.stringify({ ...props }));

    history.push("/cart/8"); // 8 is the test userId; hardcoded for now but will be a variable later
  };

  const sendEmail = () => {
    onCheckoutFinished();

    _logger(props);

    const mappingPurchasedServices = (purchasedService) => {
      let name = purchasedService.serviceName;

      return name;
    };

    let purchasedServices =
      JSON.parse(localStorage.getItem("cartItemsArr")) || [];
    let purchasedServiceNames = purchasedServices.map(mappingPurchasedServices);

    let scheduleData = JSON.parse(localStorage.getItem("scheduleData")) || [];

    let practiceData = scheduleData.practices.shift();

    let startTime = new Date(
      props.props.clickedAppointmentDetails.startTime
    ).toLocaleTimeString();
    let endTime = new Date(
      props.props.clickedAppointmentDetails.endTime
    ).toLocaleTimeString();
    let date = new Date(
      props.props.clickedAppointmentDetails.startTime
    ).toDateString();

    let payload = {
      startTime: startTime,
      endTime: endTime,
      date: date,
      service: purchasedServiceNames.join(`, `),
      practice: practiceData.name,
      location: `${practiceData.location.lineOne}${practiceData.location.lineTwo}, ${practiceData.location.city} ${practiceData.location.zip}`,
      provider: `${props.props.props.providerDetails.providerDetails.titleType.name} 
      ${props.props.props.providerDetails.providerDetails.userProfile.firstName} 
      ${props.props.props.providerDetails.providerDetails.userProfile.lastName}`,
      costOfService: `$${JSON.stringify(
        JSON.parse(localStorage.getItem("totalAmountDue")) || []
      )}`,
      to: props.props.props.props.currentUser.email,
      subject: "Appointment Details",
      from: "welrus@welrus.com", //replace with official email later
    };

    appointmentService
      .addEmail(payload)
      .then(onAddEmailSuccess)
      .catch(onAddEmailError);
  };

  const onAddEmailSuccess = (res) => {
    _logger(res);
  };

  const onAddEmailError = (err) => {
    _logger(err);
  };

  const onFinishClicked = () => {
    handleReset();
    props.setOpen(false);

    Swal.fire(
      "Your appointment has been created",
      "You will be receiving an email shortly",
      "success"
    );

    sendEmail();
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          onFinishClicked()
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0 || activeStep === 4}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {activeStep !== 3 && (
                <Button
                  disabled={cartItems === false && activeStep === 2}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const renderServices = (props) => {
  let mappedProviderServices = props.mappedProviderServices;

  return (
    <Grid container spacing={4} className="mt-3">
      <Grid item xs={12} lg={12}>
        <GridList cols={3} cellHeight={"auto"} spacing={8}>
          {mappedProviderServices}
        </GridList>
      </Grid>
    </Grid>
  );
};

const renderAppointmentConfirmation = (props) => {
  _logger(props);

  let startTime = new Date(
    props.props.clickedAppointmentDetails.startTime
  ).toLocaleString();
  let endTime = new Date(
    props.props.clickedAppointmentDetails.endTime
  ).toLocaleTimeString();

  // Andy added these
  localStorage.setItem("selectedScheduleStart", JSON.stringify(startTime));

  return (
    <Card className="bg-midnight-bloom border-0 mb-4 p-4 bg-white">
      <Grid container justify="center">
        <Grid item xs={12} lg={12} className="text-center">
          <div className="font-weight-bold font-size-lg text-white text-center">
            Here are your appointment details.
          </div>
          <div className="font-size-sm mb-1 text-white-50">
            {startTime} - {endTime}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

const renderCheckout = (props, checkCart) => {
  return (
    <ShoppingCartModal
      manageCartCount={props.props.props.props.manageCartCount}
      props={props.props.props.props.location.state.providers}
      setCartItems={checkCart}
    />
  );
};

const renderPayment = (props, handleNext) => {
  return (
    <PaymentFormModal
      successHandler={handleNext}
      userId={props.props.props.props.currentUser.id}
      isConfirmed={true}
      startTime={props.props.clickedAppointmentDetails.startTime}
      endTime={props.props.clickedAppointmentDetails.endTime}
      manageCartCount={props.props.props.props.manageCartCount}
    />
  );
};

const renderPaymentReview = (props) => {
  return (
    <PaymentReviewModal
      props={props.props.props.props.location.state.providers}
    />
  );
};

ProviderDetailsAppointmentsFormStepper.propTypes = {
  manageCartCount: PropTypes.func,
  handleClose: PropTypes.func,
  setOpen: PropTypes.func,
  toggleDialog: PropTypes.bool,
  setToggleDialogFunc: PropTypes.func,
  mappedProviderServices: PropTypes.arrayOf[PropTypes.shape({})],
  props: PropTypes.shape({
    clickedAppointmentDetails: PropTypes.shape({
      id: PropTypes.number,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    }),
    scheduleDataState: PropTypes.arrayOf[PropTypes.shape({})],
    setScheduleDataState: PropTypes.func,
    dayOfWeekSwitch: PropTypes.func,
    props: PropTypes.shape({
      props: PropTypes.shape({
        currentUser: PropTypes.shape({
          email: PropTypes.string,
          id: PropTypes.number,
        }),
        manageCartCount: PropTypes.func,
        location: PropTypes.shape({
          state: PropTypes.shape({ providers: PropTypes.shape({}) }),
        }),
      }),
      providerDetails: PropTypes.shape({
        providerDetails: PropTypes.shape({
          id: PropTypes.number,
          userProfile: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
          }),
          titleType: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      }),
      scheduleData: PropTypes.arrayOf[PropTypes.shape({})],
    }),
  }),
};
