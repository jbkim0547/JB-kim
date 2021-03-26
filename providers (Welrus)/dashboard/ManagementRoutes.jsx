import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Grid, CardContent, Button } from "@material-ui/core";
import debug from "sabio-debug";
import "../../../assets/styles/providerDashboard.css";
const _logger = debug.extend("ProviderButtons");

class ManagementRoutes extends React.Component {
  handleManageAppointmentsGo = () => {
    _logger(this.props.history);
    this.props.history.push("/schedule", {
      providerId: this.props.providerId,
    });
  };
  handleManageServicesGo = () => {
    this.props.history.push("/provider/services");
  };
  handleManagePatientsGo = () => {
    this.props.history.push("/providers");
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={4} className="width-for-mobile">
          <Grid item xs={12} md={6} lg={4}>
            <div className="card card-box-alt card-box-hover-rise card-box-hover mb-4">
              <Button
                className="mt-1 card-height-for-laptop-l"
                variant="contained"
                title="Click to Manage Services"
                onClick={this.handleManageServicesGo}
              >
                <CardContent className="p-3">
                  <div className="bg-deep-blue text-white display-4 card-icon-wrapper rounded-circle">
                    <FontAwesomeIcon icon={["far", "hospital"]} />
                  </div>
                  <h3 className="heading-6 mt-4 mb-4">Manage Services</h3>
                  <p className="card-text mb-4">
                    Review services offered and update pricing.
                  </p>
                </CardContent>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div className="card card-box-alt card-box-hover-rise card-box-hover mb-4">
              <Button
                className="mt-1"
                variant="contained"
                title="Click to Manage Patients"
                onClick={this.handleManageAppointmentsGo}
              >
                <CardContent className="p-3">
                  <div className="bg-sunny-morning text-white display-4 card-icon-wrapper rounded-circle">
                    <FontAwesomeIcon icon={["far", "address-card"]} />
                  </div>
                  <h3 className="heading-6 mt-4 mb-4">Manage Patients</h3>
                  <p className="card-text mb-4">
                    View patient appointments and intake forms.
                  </p>
                </CardContent>
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div className="card card-box-alt card-box-hover-rise card-box-hover mb-4">
              <Button
                className="mt-1"
                variant="contained"
                title="Click to Manage Appointments"
                onClick={this.handleManageAppointmentsGo}
              >
                <CardContent className="p-3">
                  <div className="bg-grow-early text-white display-4 card-icon-wrapper rounded-circle">
                    <FontAwesomeIcon icon={["far", "calendar-alt"]} />
                  </div>
                  <h3 className="heading-6 mt-4 mb-4">Manage Appointments</h3>
                  <p className="card-text mb-4">
                    Update availability of appointments offered.
                  </p>
                </CardContent>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
ManagementRoutes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  providerId: PropTypes.number.isRequired,
};
export default withRouter(ManagementRoutes);
