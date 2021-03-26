import React, { Fragment } from "react";
import UserEditConsole from "../../components/AdminDash/UserEditConsole";
import AdminPanel from "../../components/AdminDash/AdminPanel";
import { Grid } from "@material-ui/core";
import debug from "sabio-debug";
import AdminDashModal from "../../components/AdminDash/AdminDashModal";
import PropTypes from "prop-types";

import AdminDashInbox from "../../components/AdminDash/AdminDashInbox";

import ProviderVerification from "components/AdminDash/ProviderVerification";
const _logger = debug.extend("ProviderDashboard");

class AdminDashboard extends React.Component {
  state = {
    isViewOpen: false,
    singleUser: {},
  };

  componentDidMount() {}

  toggleViewModal = (response) => {
    _logger(response);
    this.setState((prevState) => {
      return {
        ...prevState,
        singleUser: response.userToEdit,
        isViewOpen: !prevState.isViewOpen,
      };
    });
  };

  closeViewModal = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isViewOpen: false,
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
          spacing={6}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
        >
          <ProviderVerification />

          <Grid item xs={6}>
            <UserEditConsole viewUser={this.toggleViewModal} />
          </Grid>
        </Grid>

        <AdminDashModal //modal dialog
          isViewOpen={this.state.isViewOpen}
          user={this.state.singleUser}
          closeWindow={this.closeViewModal}
          refreshPage={this.componentDidMount}
          fireFailure={this.closeViewModal}
        />

        <Grid
          container={true}
          item
          xs={12}
          md={6}
          lg={12}
          spacing={6}
          className="align-for-laptop display-for-laptop-l"
        >
          <AdminDashInbox />
          <AdminPanel />
        </Grid>
      </Fragment>
    );
  }
}
AdminDashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default AdminDashboard;
