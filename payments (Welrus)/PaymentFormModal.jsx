import React, { useState, useEffect, Fragment } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import MailOutlineTwoToneIcon from "@material-ui/icons/MailOutlineTwoTone";
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Bold } from "react-feather";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { red } from "@material-ui/core/colors";
import { paymentFormSchema } from "./PaymentSchema";
import { Select } from "formik-material-ui";
import { TextField } from "formik-material-ui";
import PropTypes from "prop-types";
import toastr from "toastr";
import * as paymentService from "../../services/paymentService";
import * as cartService from "../../services/cartService";
import appointmentService from "@services/appointmentService";
import { useParams } from "react-router-dom";
import logger from "sabio-debug";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
} from "@material-ui/core";

const card = {
  visa:
    "https://sabio-training.s3-us-west-2.amazonaws.com/welrus/6c642b96-255b-4fd8-bd92-b18ae7426a68-visa.svg",
  mastercard:
    "https://sabio-training.s3-us-west-2.amazonaws.com/welrus/cf40eae1-3c07-49dd-8109-60f9779a07c0-mastercard.svg",
  jcb:
    "https://sabio-training.s3-us-west-2.amazonaws.com/welrus/e79b1d72-f934-4b49-b510-ac13e8748119-jcb.svg",
  discover:
    "https://sabio-training.s3-us-west-2.amazonaws.com/welrus/9af3a87d-492a-4555-a3d7-2fe525f6d3c9-discover.svg",
  amex:
    "https://sabio-training.s3-us-west-2.amazonaws.com/welrus/0aaf322d-1ab3-419a-95ac-03bd448711bf-american-express.svg",
  default:
    "https://sabio-training.s3-us-west-2.amazonaws.com/welrus/17796fe3-c6c4-41c2-bac6-8daee575513f-download%20(1).png",
};

const _logger = logger.extend("PaymentForm");

const PaymentFormModal = (props) => {
  _logger(props);
  const { id } = useParams();
  const providerId = parseInt(id);
  let currentCc = "";

  let formValues = "";

  const [fee, setFee] = useState(0);
  const [items, setItems] = useState("");
  // set submitting is a functionality of stripes
  // that doesn't allow user to edit fields in payment form.
  // import this functionality at a later time.
  // const [setSubmitting, setSetSubmitting] = useState("");
  const [progressBar, setProgressBar] = useState(false);

  toastr.options = {
    onclick: null,
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    positionClass: "toast-top-center",
  };

  useEffect(() => {
    _logger("useEffect firing");
    _logger("Props received:", props);

    const cartArr = JSON.parse(localStorage.getItem("cartItemsArr"));
    const fee = JSON.parse(localStorage.getItem("totalAmountDue"));

    if (cartArr && cartArr.length > 0) {
      setItems(cartArr);
    }

    if (fee && fee > 0) {
      setFee(fee);
      priceFormatter();
    }

    _logger(cartArr, fee);
  }, []);

  const priceFormatter = () => {
    let stringPrice = "";

    if (fee) {
      let strPrice = fee.toString().split("");
      // strPrice.splice(strPrice.length - 2, 0, ".");

      if (strPrice.includes(".")) {
        let finalPrice =
          "$" + strPrice.join("").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

        stringPrice = finalPrice;
      } else {
        let finalPrice = "$" + strPrice.join("") + ".00";

        stringPrice = finalPrice;
      }
    }
    return stringPrice;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    _logger("submit clicked");

    formValues = values;
    // setSetSubmitting(true);
    var pvSvIds = [];

    const cartArr = JSON.parse(localStorage.getItem("cartItemsArr"));
    cartArr.forEach((element) => {
      pvSvIds.push(element.providerServiceId);
    });

    _logger(pvSvIds);

    let payload1 = {
      userId: props.userId,
      isConfirmed: props.isConfirmed,
      appointmentStart: props.startTime,
      appointmentEnd: props.endTime,
      providerServiceIds: pvSvIds,
    };

    appointmentService
      .add(payload1)
      .then(onApptAddSuccess)
      .catch(onApptAddError);
  };

  const onApptAddSuccess = (response) => {
    var strFee = fee.toString().split("");
    strFee.splice(strFee.length - 3, 1);

    var intFee = parseInt(strFee.join(""));

    let payload2 = {
      // ...values,
      ...formValues,
      amount: intFee,
      appointmentId: response.item,
    };

    paymentService
      .paymentProcesser(payload2)
      .then(onSubmitSuccess)
      .then(function () {
        {
          // setSetSubmitting(false);
        }
      })
      .catch(onSubmitError)
      .then(function () {
        {
          // setSetSubmitting(false);
          setProgressBar(false);
        }
      });
    setProgressBar(true);
    // setSetSubmitting(true);
  };

  const onApptAddError = (err) => {
    _logger(err);
  };

  const onSubmitSuccess = (response) => {
    _logger(response);
    let resp = response.item;
    let amount = priceFormatter();

    cartService
      .emptyCartByUserId()
      .then(emptyCartByUserIdSuccess)
      .catch(emptyCartByUserIdError);

    localStorage.setItem("paymentResponse", JSON.stringify(resp));
    props.successHandler();
    toastr.success("Payment Success!");
  };

  const emptyCartByUserIdSuccess = () => {
    _logger("hit cart success");
    localStorage.removeItem("itemsArray");
    props.manageCartCount(0);
  };

  const emptyCartByUserIdError = () => {
    _logger("Cart was not emptied");
  };

  const onSubmitError = (err) => {
    _logger(err);
    toastr.error("Error...Transaction failed");
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    MyTextInput.propTypes = {
      name: PropTypes.string,
      id: PropTypes.number,
      label: PropTypes.string,
    };

    if (props.name === "cvc" && field.value.length > 1) {
      const inputVal = field.value.replace(/ /g, "");
      let inputNumbersOnly = inputVal.replace(/\D/g, "");

      if (inputNumbersOnly.length > 3) {
        inputNumbersOnly = inputNumbersOnly.substr(0, 3);
      }

      field.value = inputNumbersOnly;
    }

    if (props.name === "cardNumber") {
      const inputVal = field.value.replace(/ /g, "");
      let inputNumbersOnly = inputVal.replace(/\D/g, "");

      if (inputNumbersOnly.length > 16) {
        inputNumbersOnly = inputNumbersOnly.substr(0, 16);
      }

      const splits = inputNumbersOnly.match(/.{1,4}/g);
      let spacedNumber = "";

      if (splits) {
        spacedNumber = splits.join(" ");
      }

      if (spacedNumber.length <= 4) {
        cardBrand(spacedNumber);
      }
      field.value = spacedNumber;
    }

    return (
      <>
        {props.name === "name" && (
          <label htmlFor={props.name}>
            <PersonOutlineIcon /> {label}
          </label>
        )}
        {props.name === "email" && (
          <label htmlFor={props.name}>
            <MailOutlineTwoToneIcon /> {label}
          </label>
        )}
        {props.name === "cardNumber" && (
          <label htmlFor={props.name}>
            <img
              src={currentCc ? currentCc : card.default}
              style={{
                width: "25px",
                height: "25px",
              }}
            />{" "}
            {label}
          </label>
        )}
        {props.name === "cvc" && (
          <label htmlFor={props.name}>
            <LockTwoToneIcon /> {label}
          </label>
        )}
        <Field
          component={TextField}
          className="text-input"
          {...field}
          {...props}
        />
      </>
    );
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    formError: {
      color: red,
      fontWeight: Bold,
    },
  }));

  const classes = useStyles();

  const cardBrand = (cardNumber) => {
    let cardType = "";

    if (cardNumber.startsWith("4")) {
      cardType = card.visa;
    } else if (cardNumber.startsWith("51")) {
      cardType = card.mastercard;
    } else if (cardNumber.startsWith("35")) {
      cardType = card.jcb;
    } else if (cardNumber.startsWith("6011")) {
      cardType = card.discover;
    } else if (cardNumber.startsWith("34")) {
      cardType = card.amex;
    } else if (cardNumber) {
      cardType = card.default;
    }
    currentCc = cardType;
  };

  return (
    <Fragment>
      <Formik
        enableReinitialization={true}
        initialValues={{
          name: "",
          email: "",
          cardNumber: "",
          cvc: "",
          expMonth: "",
          expYear: "",
          currency: "usd",
        }}
        validationSchema={paymentFormSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <Card className="card-box">
              <div className="app-wrapper min-vh-100 bg-white">
                <div className="app-main min-vh-100">
                  <div className="app-content p-0">
                    <div className="app-inner-content-layout--main">
                      <div className="flex-grow-1 w-100 d-flex align-items-center">
                        <div className="bg-composed-wrapper--content">
                          <Grid container spacing={0} className="min-vh-100">
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={12}
                              className="d-flex align-items-center"
                            >
                              <div
                                className="hero-wrapper w-100 bg-composed-wrapper min-vh-100"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
                                }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  md={8}
                                  lg={10}
                                  className="d-flex align-items-center mt-2"
                                >
                                  <Container maxWidth="xl">
                                    <div className="pt-5 pb-4"></div>
                                    <h3
                                      className="display-4 font-weight-bold"
                                      style={{
                                        color: "white",
                                        width: "25vw",
                                        textAlign: "center",
                                      }}
                                    >
                                      Payment Information
                                    </h3>
                                    <Card className="mx-0 bg-secondary w-100 p-0 mb-4 border-0">
                                      <CardContent className="p-3">
                                        <div className="text-center mb-5"></div>

                                        <Form className="px-5">
                                          <div className="mb-3">
                                            <FormControl className="w-100">
                                              <MyTextInput
                                                label="Name"
                                                name="name"
                                                type="text"
                                                placeholder="Name on card"
                                              />
                                            </FormControl>
                                          </div>
                                          <div className="mb-3">
                                            <FormControl className="w-100">
                                              <MyTextInput
                                                label="E-mail"
                                                name="email"
                                                type="email"
                                                placeholder="Email address"
                                              />
                                            </FormControl>
                                          </div>
                                          <div className="mb-3">
                                            <FormControl className="w-100">
                                              <MyTextInput
                                                label="Card Number"
                                                name="cardNumber"
                                                type="text"
                                                placeholder="16 digit card number"
                                              />
                                            </FormControl>
                                          </div>
                                          <div className="mb-3">
                                            <FormControl className="w-100">
                                              <MyTextInput
                                                label="Cvc"
                                                name="cvc"
                                                type="text"
                                                placeholder="3 digit cvc number"
                                              />
                                            </FormControl>
                                          </div>
                                          <FormControl
                                            className={classes.formControl}
                                          >
                                            {" "}
                                            <InputLabel htmlFor="expMonth">
                                              Exp Month
                                            </InputLabel>
                                            <Field
                                              component={Select}
                                              name="expMonth"
                                              placeholder="Exp Month"
                                            >
                                              <MenuItem value={1}>
                                                January
                                              </MenuItem>
                                              <MenuItem value={2}>
                                                February
                                              </MenuItem>
                                              <MenuItem value={3}>
                                                March
                                              </MenuItem>
                                              <MenuItem value={4}>
                                                April
                                              </MenuItem>
                                              <MenuItem value={5}>May</MenuItem>
                                              <MenuItem value={6}>
                                                June
                                              </MenuItem>
                                              <MenuItem value={7}>
                                                July
                                              </MenuItem>
                                              <MenuItem value={8}>
                                                August
                                              </MenuItem>
                                              <MenuItem value={9}>
                                                September
                                              </MenuItem>
                                              <MenuItem value={10}>
                                                October
                                              </MenuItem>
                                              <MenuItem value={11}>
                                                November
                                              </MenuItem>
                                              <MenuItem value={12}>
                                                December
                                              </MenuItem>
                                            </Field>
                                            <ErrorMessage name="expMonth">
                                              {(msg) => (
                                                <span
                                                  style={{
                                                    color: "red",
                                                    fontSize: "9pt",
                                                  }}
                                                >
                                                  *Required Field
                                                </span>
                                              )}
                                            </ErrorMessage>
                                          </FormControl>
                                          <FormControl
                                            className={classes.formControl}
                                          >
                                            <InputLabel htmlFor="expYear">
                                              Exp Year
                                            </InputLabel>
                                            <Field
                                              component={Select}
                                              name="expYear"
                                              placeholder="Exp Year"
                                            >
                                              <MenuItem value={21}>
                                                2021
                                              </MenuItem>
                                              <MenuItem value={22}>
                                                2022
                                              </MenuItem>
                                              <MenuItem value={23}>
                                                2023
                                              </MenuItem>
                                              <MenuItem value={24}>
                                                2024
                                              </MenuItem>
                                              <MenuItem value={25}>
                                                2025
                                              </MenuItem>
                                              <MenuItem value={26}>
                                                2026
                                              </MenuItem>
                                              <MenuItem value={27}>
                                                2027
                                              </MenuItem>
                                              <MenuItem value={28}>
                                                2028
                                              </MenuItem>
                                              <MenuItem value={29}>
                                                2029
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                2030
                                              </MenuItem>
                                            </Field>
                                            <ErrorMessage name="expYear">
                                              {(msg) => (
                                                <span
                                                  style={{
                                                    color: "red",
                                                    fontSize: "9pt",
                                                  }}
                                                >
                                                  *Required Field
                                                </span>
                                              )}
                                            </ErrorMessage>
                                          </FormControl>
                                          <div className="text-center">
                                            {progressBar && (
                                              <LinearProgress value={20} />
                                            )}
                                            <div
                                              style={{
                                                color: "white",
                                                fontWeight: "bold",
                                                backgroundColor: "secondary",
                                                borderRadius: "6px",
                                                height: "40px",
                                                position: "relative",
                                              }}
                                              size="large"
                                              variant="contained"
                                              className=" mt-2"
                                              name="fee"
                                            >
                                              <span
                                                style={{
                                                  position: "absolute",
                                                  transform:
                                                    "translate(-50%,50%)",
                                                  color: "#282a46",
                                                }}
                                              >
                                                Amount Due: {priceFormatter()}
                                              </span>
                                            </div>

                                            <Button
                                              style={{
                                                width: "100%",
                                                color: "white",
                                                fontWeight: "bold",
                                                backgroundColor: "#282a46",
                                              }}
                                              size="large"
                                              type="submit"
                                              variant="contained"
                                              className="mb-2 mt-3"
                                            >
                                              Confirm Payment
                                            </Button>
                                          </div>
                                          <div style={{ textAlign: "center" }}>
                                            <img
                                              src={card.visa}
                                              style={{
                                                width: "40px",
                                                height: "29px",
                                              }}
                                            />
                                            {""}
                                            <img
                                              src={card.mastercard}
                                              style={{
                                                width: "40px",
                                                height: "40px",
                                              }}
                                            />
                                            {""}
                                            <img
                                              src={card.amex}
                                              style={{
                                                width: "40px",
                                                height: "29px",
                                              }}
                                            />
                                            {""}
                                            <img
                                              src={card.discover}
                                              style={{
                                                width: "40px",
                                                height: "31px",
                                              }}
                                            />
                                            {""}
                                            <img
                                              src={card.jcb}
                                              style={{
                                                width: "40px",
                                                height: "35px",
                                              }}
                                            />{" "}
                                          </div>
                                        </Form>
                                      </CardContent>
                                    </Card>
                                  </Container>
                                </Grid>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        }}
      </Formik>
    </Fragment>
  );
};

PaymentFormModal.propTypes = {
  userId: PropTypes.number,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  isConfirmed: PropTypes.bool,
  successHandler: PropTypes.func,
  manageCartCount: PropTypes.func,
  props: PropTypes.shape({
    state: PropTypes.shape({
      providerId: PropTypes.number.isRequired,
    }),
    amount: PropTypes.number.isRequired,
    batchInfo: PropTypes.arrayOf(
      PropTypes.shape({
        cpt4Code: PropTypes.string,
        price: PropTypes.number.isRequired,
        providerServiceId: PropTypes.number.isRequired,
        serviceId: PropTypes.number,
        serviceType: PropTypes.number.isRequired,
        servicename: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default PaymentFormModal;
