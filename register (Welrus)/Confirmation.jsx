import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import hero6 from "@assets/images/hero-bg/hero-6.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink as RouterLink } from "react-router-dom";
import userService from "../../services/userService";
import { Grid, IconButton, Card, Button, Tooltip } from "@material-ui/core";

import debug, { color } from "sabio-debug";
const _logger = debug.extend("confirm page");

class Confirmation extends Component {
  componentDidMount() {
    let token = this.props.match.params.emailToken;
    _logger("componentDidMount is firing", token);

    userService
      .confirmUser(token)
      .then(this.onConfirmUserSuccess)
      .catch(this.onConfirmUserError);
  }

  onConfirmUserSuccess = (token) => {
    _logger("confirmUser Success is firing", token);
    this.props.history.push("/");
  };

  onConfirmUserError = () => {
    _logger("confirmUser Error is firing");
    this.props.history.push("/confirmation/error/404");
  };

  render() {
    _logger("render is firing");

    return (
      <Fragment>
        <div className="d-flex align-items-start justify-content-between">
          <div className="app-main">
            <Button
              size="large"
              color="secondary"
              variant="contained"
              className="text-white btn-go-back"
              component={RouterLink}
              to="/"
            >
              <span className="btn-wrapper--icon">
                <FontAwesomeIcon icon={["fas", "arrow-left"]} />
              </span>
              <span className="btn-wrapper--label">Home</span>
            </Button>
            <div className="app-content p-0">
              <div className="app-inner-content-layout--main">
                <div className="flex-grow-1 w-100 d-flex align-items-center">
                  <div className="bg-composed-wrapper--content">
                    <div className=" bg-composed-wrapper  min-vh-100">
                      <div className="flex-grow-1 w-100 d-flex align-items-center">
                        <div
                          className="bg-composed-wrapper--image bg-composed-filter-rm opacity-9"
                          style={{ backgroundImage: `url(${hero6})` }}
                        />
                        <div className="bg-composed-wrapper--content text-center py-5">
                          <Grid
                            item
                            xl={5}
                            lg={6}
                            md={10}
                            sm={12}
                            className="mx-auto text-center text-white"
                          >
                            <div>
                              <img
                                src="/plain_welruslogo.png"
                                className="img-fluid"
                              />
                            </div>
                            <h1 className="display-2 mb-3 font-weight-bold">
                              Welcome!
                            </h1>
                            <h2 className="font-weight-light d-block px-3 mb-5 text-white-85">
                              Thank you for registering with us.
                            </h2>

                            <Card className=" w-76 text-center ">
                              <h4 className="font-weight-normal d-block px-5 m-3">
                                Your new account has been confirmed. You may now
                                login to create your user profile.
                              </h4>
                              <Button
                                variant="contained"
                                className="m-3"
                                size="large"
                                color="secondary"
                                component={RouterLink}
                                to="/register"
                              >
                                <span className="btn-wrapper--label">
                                  Login &raquo;
                                </span>
                              </Button>
                            </Card>
                          </Grid>
                        </div>
                      </div>
                      <div className="hero-footer pb-4">
                        <Tooltip arrow title="Facebook">
                          <IconButton
                            color="inherit"
                            size="medium"
                            variant="outlined"
                            href="https:&#x2F;&#x2F;www.facebook.com&#x2F;Welrus"
                            className="text-white-50"
                          >
                            <FontAwesomeIcon
                              icon={["fab", "facebook"]}
                              className="font-size-md"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Twitter">
                          <IconButton
                            color="inherit"
                            size="medium"
                            variant="outlined"
                            className="text-white-50"
                          >
                            <FontAwesomeIcon
                              icon={["fab", "twitter"]}
                              className="font-size-md"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Instagram">
                          <IconButton
                            color="inherit"
                            size="medium"
                            variant="outlined"
                            className="text-white-50"
                          >
                            <FontAwesomeIcon
                              icon={["fab", "instagram"]}
                              className="font-size-md"
                            />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
Confirmation.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
      emailToken: PropTypes.string.isRequired,
    }),
  }),
};

export default Confirmation;
