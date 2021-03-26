import React from "react";
import { Button, Grid, DialogContent } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import debug from "sabio-debug";
const _logger = debug.extend("Modal");

const AppointmentDetailsView = (props) => {
  function handleClose() {
    props.closeAppointment();
  }
  var date = new Date(props.appointment.startTime);
  date = date.toLocaleString().replace(/(.*)\D\d+/, "$1");

  return (
    <React.Fragment>
      <Dialog
        open={props.isViewOpen}
        onClose={handleClose}
        style={({ alignContent: "center" }, { overscrollBehavior: "none" })}
      >
        <DialogTitle
          id="alert-dialog-title"
          className=" card-box mb-4 bg-royal text-white border-0"
        >
          <div
            className=" text-white card-header--title py-0 font-size-lg "
            style={{ textAlignLast: "center" }}
          >
            {" "}
            Appointment Details
          </div>
        </DialogTitle>
        <DialogContent style={{ overflow: "hidden" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}></Grid>

            <div className="d-flex align-items-center px-4 mb-3">
              <div className="my-2 font-size-lg p-2 mx-4 bg-secondary rounded-sm">
                <div
                  className="d-flex p-2"
                  style={{ borderBottomStyle: "groove" }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "user"]}
                    style={{ marginRight: "20px" }}
                    title="Patient Full Name"
                  />

                  <span className="text-black">{`${props.appointment.userProfile.firstName} ${props.appointment.userProfile.mi} ${props.appointment.userProfile.lastName}`}</span>
                </div>
                <div className="d-flex p-2">
                  <FontAwesomeIcon
                    icon={["far", "calendar-alt"]}
                    style={{ marginRight: "20px" }}
                    title="Appointment Date"
                  />
                  <span className="text-black">{`${date}`}</span>
                </div>
                <div className="d-flex  p-2">
                  <FontAwesomeIcon
                    icon={["far", "hospital"]}
                    style={{ marginRight: "20px" }}
                    title="Service"
                  />
                  <span className="text-black">{`${props.appointment.medicalService.name}`}</span>
                </div>
                <div className="d-flex  p-2">
                  <FontAwesomeIcon
                    icon={["fa", "barcode"]}
                    style={{ marginRight: "20px" }}
                    title="CPT4Code"
                  />
                  <span className="text-black">{`${props.appointment.medicalService.cpt4Code}`}</span>
                </div>
                <div className="d-flex p-2">
                  <FontAwesomeIcon
                    icon={["fa", "calendar-check"]}
                    style={{ marginRight: "20px" }}
                    title="Appointment Confirmation: True/False"
                  />
                  <span className="text-black text-uppercase">{`${props.appointment.isConfirmed}`}</span>
                </div>
              </div>
            </div>
          </Grid>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              autoFocus
              className="p-0 mb-0"
            >
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

AppointmentDetailsView.propTypes = {
  appointment: PropTypes.shape({
    dateCreated: PropTypes.string,
    dateModified: PropTypes.string,
    id: PropTypes.number.isRequired,
    isConfirmed: PropTypes.bool.isRequired,
    providerId: PropTypes.number,
    startTime: PropTypes.string.isRequired,
    medicalService: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      cpt4Code: PropTypes.string,
    }),
    userProfile: PropTypes.shape({
      avatarUrl: PropTypes.string,
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string,
      firstName: PropTypes.string.isRequired,
      id: PropTypes.number,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      userId: PropTypes.number.isRequired,
    }),
  }),
  closeAppointment: PropTypes.func.isRequired,
  isViewOpen: PropTypes.bool.isRequired,
};
export default AppointmentDetailsView;
