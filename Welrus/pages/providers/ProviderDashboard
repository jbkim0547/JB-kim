import React, { Fragment } from "react";
import ProviderAppointments from "@components/providers/dashboard/ProviderAppointments";
import ManagementRoutes from "@components/providers/dashboard/ManagementRoutes";
import AppointmentAnalytics from "@components/providers/dashboard/AppointmentAnalytics";
import { Grid } from "@material-ui/core";
import AppointmentView from "@components/providers/dashboard/AppointmentDetailsModal";
import appointmentService from "@services/appointmentService";
import providerDetailsService from "@services/providerDetailsService";
import { Snackbar } from "@material-ui/core";
import Alert from "../../assets/components/Alert";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import "../../assets/styles/providerDashboard.css";
const _logger = debug.extend("ProviderDashboard");

class ProviderDashboard extends React.Component {
  state = {
    isViewOpen: false,
    snackBarShow: false,
    severity: "error",
    barMessage: "",
    singleAppointment: {
      id: 0,
      dateCreated: "",
      dateModified: "",
      providerId: 0,
      startTime: "",
      userProfile: {
        id: 0,
        userId: 0,
        avatarUrl: "",
        dateCreated: "",
        dateModified: "",
        firstName: "",
        lastName: "",
        mi: "",
      },
      medicalService: {
        id: 0,
        cpt4Code: "",
        name: "",
      },
      medicalServiceType: {
        id: 0,
        name: "",
      },

      isConfirmed: false,
    },
    provider: {
      id: 0,
      phone: "",
      fax: "",
      networks: "",
      userProfile: {
        id: 0,
        userId: 0,
        avatarUrl: "",
        firstName: "",
        lastName: "",
        mi: "",
        dateCreated: "",
        dateModified: "",
      },
      professionalDetail: {
        id: 0,
        genderAccepted: 0,
        isAccepting: false,
        npi: 0,
      },
      titleType: {
        id: 0,
        name: "",
      },
      genderType: {
        id: 0,
        name: "",
      },
    },
  };

  componentDidMount() {
    this.getCurrentProvider();
    _logger("provider dashboard component finished mounting...........");
  }

  getCurrentProvider = () => {
    providerDetailsService
      .getCurrentProvider()
      .then(this.onGetCurrentProviderSuccess)
      .catch(this.onGetCurrentProviderError);
  };

  onGetCurrentProviderSuccess = (response) => {
    _logger({ success: response });
    const provider = response.item;
    let providerFirstName = provider.userProfile.firstName;
    let providerLastName = provider.userProfile.lastName;
    this.setState((prevState) => {
      return {
        ...prevState,
        provider: provider,
        snackBarShow: true,
        barMessage: `Welcome ${providerFirstName} ${providerLastName}!`,
        severity: "success",
      };
    });
  };

  onGetCurrentProviderError = (error) => {
    _logger({ error: error });
    this.props.history.push("/providers/new");
    // change to sweet alert with optional redirect to Provider Wizard, if current user role === "Provider"
  };

  openViewModal = (appointmentId) => {
    _logger(appointmentId);
    if (appointmentId) {
      appointmentService
        .getById(appointmentId)
        .then(this.onGetByIdSuccess)
        .catch(this.onGetByIdError);
    }
  };
  onGetByIdSuccess = (response) => {
    _logger({ success: response });
    this.setState(() => {
      return {
        singleAppointment: response.data.item,
      };
    }, this.closeViewModal());
  };
  onGetByIdError = (error) => {
    _logger({ error: error });
  };
  closeViewModal = () => {
    this.setState((prevState) => {
      return {
        isViewOpen: !prevState.isViewOpen,
      };
    });
  };
  closeNotification = () => {
    this.setState((prevState) => {
      return {
        snackBarShow: !prevState.snackBarShow,
      };
    });
  };

  render() {
    return (
      <Fragment>
        <Grid
          container={true}
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <Grid item xs={12} md={6} lg={6}>
            <AppointmentAnalytics providerId={this.state.provider.id} />
          </Grid>
          <Snackbar
            open={this.state.snackBarShow}
            autoHideDuration={4000}
            onClose={this.closeNotification}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity={this.state.severity}>
              {this.state.barMessage}
            </Alert>
          </Snackbar>
          <ProviderAppointments
            viewAppointment={this.openViewModal}
            providerId={this.state.provider.id}
          />

          <AppointmentView //modal dialog
            isViewOpen={this.state.isViewOpen}
            appointment={this.state.singleAppointment}
            closeAppointment={this.closeViewModal}
            openUpdate={this.openUpdateModal}
          />
          <Grid
            item
            xs={12}
            md={6}
            lg={12}
            className="align-for-laptop display-for-laptop-l"
          >
            <ManagementRoutes
              props={this.props}
              providerId={this.state.provider.id}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
ProviderDashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default ProviderDashboard;
