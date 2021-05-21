import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, IconButton, Button, Tooltip } from "@material-ui/core";
import { NavLink as RouterLink } from "react-router-dom";

const errorImg =
  "https://sabio-training.s3-us-west-2.amazonaws.com/welrus/7ac06960-c002-49d6-b25a-37959b675a87-upload.PNG";

export default function LivePreviewExample() {
  return (
    <Fragment>
      <div className="app-wrapper bg-secondary">
        <div className="app-main">
          <div className="app-content p-0">
            <div className="app-inner-content-layout--main">
              <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                  <div className="hero-wrapper bg-composed-wrapper min-vh-100">
                    <div className="flex-grow-1 w-100 d-flex align-items-center">
                      <Grid
                        item
                        lg={6}
                        md={9}
                        className="px-4 mx-auto text-center text-black">
                        <img
                          src={errorImg}
                          className="w-50 mx-auto d-block my-5 img-fluid"
                          alt="..."
                        />

                        <h1 className="display-1 mb-3 px-4 font-weight-bold">
                          Account Confirmation Error
                        </h1>
                        <h3 className="font-size-xxl line-height-sm font-weight-light d-block px-3 mb-3 text-black-50">
                          The token for this page no longer exists.
                        </h3>
                        <p></p>
                        <Button
                          component={RouterLink}
                          to="/"
                          size="large"
                          color="primary"
                          variant="contained"
                          className="text-white mt-4">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={["fas", "arrow-left"]} />
                          </span>
                          <span className="btn-wrapper--label">Home</span>
                        </Button>
                      </Grid>
                    </div>
                    <div className="hero-footer py-4">
                      <Tooltip arrow title="Facebook">
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="outlined"
                          href="https:&#x2F;&#x2F;www.facebook.com&#x2F;Welrus"
                          className="text-facebook">
                          <FontAwesomeIcon
                            icon={["fab", "facebook"]}
                            className="font-size-md"
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title="Twitter">
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="outlined"
                          className="text-twitter">
                          <FontAwesomeIcon
                            icon={["fab", "twitter"]}
                            className="font-size-md"
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title="Instagram">
                        <IconButton
                          color="primary"
                          size="medium"
                          variant="outlined"
                          className="text-instagram">
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
