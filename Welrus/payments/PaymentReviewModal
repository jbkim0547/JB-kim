import React, { Fragment, useState, useEffect } from "react";
import { Grid, Card, Divider } from "@material-ui/core";
import logger from "sabio-debug";
import PropTypes from "prop-types";

const _logger = logger.extend("PaymentReview");

const PaymentReview = (props) => {
  _logger(props);
  const [table, setTable] = useState([]);
  const [amount, setAmount] = useState("");
  const [providerInfo, setProviderInfo] = useState("");
  const [paymentResponse, setPaymentResponse] = useState("");

  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = todaysDate.getMonth() + 1;
  const day = todaysDate.getDate();
  const date = `${month}/${day}/${year}`;

  useEffect(() => {
    _logger("useEffect firing");

    const amount = JSON.parse(localStorage.getItem("totalAmountDue"));
    const providerInfo = JSON.parse(localStorage.getItem("providerInfo"));
    const paymentResponse = JSON.parse(localStorage.getItem("cartItemsArr"));

    setAmount(amount);
    setProviderInfo(providerInfo);
    setPaymentResponse(paymentResponse);

    const paidServices = paymentResponse.map(servicesMapper);

    setTable(paidServices);
  }, []);

  const servicesMapper = (arrObj) => {
    _logger(arrObj);

    return (
      <div className="p-3" key={arrObj.providerServiceId}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <div style={{ paddingLeft: "10px" }}>
              <b>{arrObj.serviceName}</b>
              <div className="text-black-50">{arrObj.serviceType}</div>
            </div>
          </div>
          <div
            className="font-weight-bold font-size-md"
            style={{ paddingRight: "10px", color: "black" }}
          >
            {arrObj.price}
          </div>
        </div>
      </div>
    );
  };

  const priceFormatter = (price) => {
    let stringPrice = "";

    if (price) {
      let strPrice = price.toString().split("");

      strPrice.splice(strPrice.length - 2, 0, ".");

      let finalPrice =
        "$" + strPrice.join("").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

      _logger(finalPrice);

      stringPrice = finalPrice;
    }
    return stringPrice;
  };

  return (
    <Fragment>
      <div
        className="hero-wrapper w-100 bg-composed-wrapper min-vh-100"
        style={{
          borderRadius: "10px",
          backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
        }}
      >
        <Grid container>
          <Grid item xs={0} lg={1}></Grid>
          <Grid item xs={12} lg={10}>
            <Card className="card-box mt-5 mb-5" style={{ width: "100%" }}>
              <div className="card-body p-4">
                <div className="flex-column">
                  <div className="text-center text-lg-left mb-3 mb-lg-0">
                    <h1 className="display-4 font-weight-bold">
                      Payment Success!{" "}
                    </h1>

                    <p className="mb-0 text-black-50">
                      Please take a moment to revise the information below.
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-between mb-4"></div>
                <Divider className="my-3" />

                <div className="d-flex flex-column flex-lg-row justify-content-between mb-3">
                  <div>
                    <div className="text-uppercase text-primary mb-2 font-size-xs">
                      Provider Details
                    </div>
                    <div className="avatar-icon-wrapper d-100 mb-2">
                      <div className="avatar-icon d-100">
                        <img alt="..." src={providerInfo.avatarUrl} />
                      </div>
                    </div>
                    <div className="">
                      <div>
                        <p className="mb-1 font-weight-bold">{`${providerInfo.titleType} ${providerInfo.firstName} ${providerInfo.middleName} ${providerInfo.lastName}`}</p>
                        <p>
                          <span className="d-block pb-1">
                            <b>Tel.:</b> {providerInfo.phoneNumber}
                          </span>
                          <span className="d-block">
                            <b>Fax:</b> {providerInfo.faxNumber}
                          </span>
                          <span className="d-block">
                            <b>Network:</b> {providerInfo.network}
                          </span>
                          <span className="d-block"></span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div className="text-uppercase text-primary mb-2 font-size-xs ">
                        Payment Details
                      </div>
                      <p className="mb-1 font-weight-bold">Stripe Charge Id</p>
                      <p>
                        <span className="d-block pb-1">
                          <span className="text-black-50">
                            {" "}
                            {paymentResponse?.chargeId}{" "}
                          </span>{" "}
                        </span>
                      </p>
                      <p>
                        <span className="mb-1 font-weight-bold">
                          Stripe Customer Id
                        </span>
                        <span className="d-block pb-1">
                          <span className="text-black-50">
                            {" "}
                            {paymentResponse?.customerId}
                          </span>{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-lg-row justify-content-between"></div>

                <Card>
                  <div className="mb-1">
                    <div>{table.length > 0 ? table : null}</div>
                  </div>
                </Card>

                <div className="mb-4" />
                <div className="list-unstyled mb-3">
                  <div
                    className="d-flex font-weight-bold pt-3 pb-2 mb-5 font-size-lg"
                    style={{ textAlign: "right", float: "right" }}
                  >
                    <p className="pr-4" style={{ float: "right" }}>
                      Total Paid
                    </p>
                    <p className="pr-4" style={{ float: "right" }}>
                      {amount ? amount : false}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Grid item xs={0} lg={1}></Grid>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

PaymentReview.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      type: PropTypes.string.isRequired,
      payload: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        chargeId: PropTypes.string.isRequired,
        receiptUrl: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        createdBy: PropTypes.number.isRequired,
        props: PropTypes.shape({
          state: PropTypes.shape({
            provider: PropTypes.string.isRequired,
            providerPhone: PropTypes.string.isRequired,
            providerAddress: PropTypes.string.isRequired,
            providerEmail: PropTypes.string.isRequired,
          }),
          batchInfo: PropTypes.arrayOf(
            PropTypes.shape({
              cpt4Code: PropTypes.string,
              price: PropTypes.number.isRequired,
              providerServiceId: PropTypes.number.isRequired,
              serviceId: PropTypes.number.isRequired,
              serviceType: PropTypes.number.isRequired,
              servicename: PropTypes.string.isRequired,
            })
          ),
        }),
      }),
    }),
  }),
};

export default PaymentReview;
