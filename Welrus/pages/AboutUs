import React, { Fragment } from "react";
import { Grid, Container, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink as RouterLink } from "react-router-dom";
import hero6 from "../assets/images/hero-bg/hero-6.jpg";
import Slider from "react-slick";
import WelrusLogo from "../assets/images/welrusLogo/plainWelrusLogo.png";
import debug from "sabio-debug";
const _logger = debug.extend("Sabio");

export default function MainPage() {
  return (
    <Fragment>
      <div
        className="bg-composed-wrapper--image bg-composed-filter-rm opacity-5"
        style={{
          backgroundImage: "url(" + hero6 + ")",
        }}
      />
      <div className="feature-box py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <div className="py-0 pb-5 py-xl-5">
                <div className="pr-0 pr-xl-5">
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
                    <span className="btn-wrapper--label">Return</span>
                  </Button>
                  <h1 className="display-3 mb-3 font-weight-bold font-Montserrat-Alternates">
                    Hello Welrus!
                  </h1>
                  <p className="font-size-lg text-black-50 font-Montserrat-Alternates">
                    Welrus is an online platform that enables patients to shop
                    for preventive and routine care services provided at local
                    clinics nearby.
                  </p>
                </div>
                <div className="d-block mt-4">
                  <Slider
                    slidesToShow={2}
                    slidesToScroll={2}
                    dots={true}
                    className="slick-slider slick-slider-left"
                  >
                    <div>
                      <div className="feature-box pr-4">
                        <h3 className="font-size-lg font-weight-bold my-3 font-Montserrat-Alternates">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="text-first"
                          >
                            Contact us
                          </a>
                        </h3>
                        <div className="text-black mb-3 font-Montserrat-Alternates">
                          <p>Phone:</p>
                          <p>Email:</p>
                          <p>Address:</p>
                          <p>Email:</p>
                          <p>We`d love to hear from you.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="feature-box pr-4">
                        <h3 className="font-size-lg font-weight-bold my-3 font-Montserrat-Alternates">
                          <a
                            href="#/"
                            onClick={(e) => e.preventDefault()}
                            className="text-first"
                          >
                            Reviews
                          </a>
                        </h3>
                        <p className="text-black-50 mb-3">
                          User`s reviews list
                        </p>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={6} className="d-flex align-items-center">
              <img alt="..." className="img-fluid" src={WelrusLogo} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
}
