import React, { Fragment, useEffect, useState } from "react";
import { withRouter, useHistory, Route } from "react-router";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Card,
  Divider,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import * as cartService from "../../services/cartService";
import PropTypes from "prop-types";
import toastr from "toastr";
import logger from "sabio-debug";

const _logger = logger.extend("ShoppingCart");

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "#282a46",
    boxShadow: theme.shadows[5],
    fontSize: 14,
  },
}))(Tooltip);

const BootstrapTooltip = (props) => {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
};

const ShoppingCartPage = (props) => {
  _logger(props);
  const history = useHistory();
  const [items, setItems] = useState(""); // to store cart array
  const [total, setTotal] = useState([]); // to set total price
  const [table, setTable] = useState(""); // to store mapped out rows
  const [open, setOpen] = useState(false); // to use removal window
  const [itemId, setItemId] = useState(""); // for item removal by item id
  const [showPage, setShowPage] = useState(true); // show/hide empty cart page
  const [currentProvider, setCurrentProvider] = useState("");

  toastr.options = {
    onclick: null,
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 3000,
    extendedTimeOut: 1000,
    positionClass: "toast-top-center",
    preventDuplicates: true,
  };

  useEffect(() => {
  fetchCart();
  }, []);

  useEffect(() => {
    fetchCart();
  }, [total]);

  const fetchCart = () => {
    cartService.getItemsFromCart().then(onGetSuccess).catch(onGetError);
  };

  const onGetSuccess = (response) => {
    let itemsArr = response.item;
    setItems(itemsArr);

    localStorage.setItem("cartItemsArr", JSON.stringify(itemsArr));
    localStorage.setItem("totalAmountDue", total);

    if (itemsArr && itemsArr.length > 0) {
      const itemRows = itemsArr.map(itemMapper);

      sumAmount(itemsArr);
      setTable(itemRows);

    } else {
      setShowPage(false);
    }
  };

  const onGetError = (err) => {
    _logger(err.toString());
    console.info(err);
    setShowPage(false);
  };

  const sumAmount = (itemsArr) => {
    let priceAcc = [];

    if (itemsArr && itemsArr.length > 0) {
      itemsArr.forEach((item) => {
        priceAcc.push(item.price);
      });

      let initialValue = 0;

      const reducer = (accumulator, item) => {
        return accumulator + item;
      };
      const totalNow = priceAcc.reduce(reducer, initialValue);

      setTotal(totalNow);
    }
  };

  const priceFormatter = (price) => {
    let stringPrice = "";

    if (total) {
      let strPrice = price.toString().split("");

      strPrice.splice(strPrice.length - 2, 0, ".");

      let finalPrice =
        "$" + strPrice.join("").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

      stringPrice = finalPrice;
    }
    return stringPrice;
  };

  const confirmRemove = () => {
    setOpen(false);

    cartService
      .deleteItem(itemId)
      .then(onDeleteItemSuccess)
      .catch(onDeleteItemError);
  };

  const onDeleteItemSuccess = (response) => {

    let oldItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
    oldItems.splice(0, 1);
    localStorage.setItem("itemsArray", JSON.stringify(oldItems));
    oldItems = JSON.parse(localStorage.getItem("itemsArray"));

    props.manageCartCount(oldItems.length);

    let deletedItem = response;
    const indexOfItem = items.findIndex((item) => item.id === deletedItem);

    let updatedList = items;

    if (indexOfItem === 0 && items.length < 2) {
      setShowPage(false);
    }
    if (indexOfItem > 0) {
      updatedList.splice(indexOfItem, 1);
    }

    let newMappedItems = updatedList.map(itemMapper);
    sumAmount(newMappedItems);
    setTable(newMappedItems);

    toastr.success("Item removed from cart");
  };

  const onDeleteItemError = (err) => {
    console.log(err);
    toastr.error("Removal error, please try again");
  };

  const handleClickOpen = (idToBeDeleted) => {
    setItemId(idToBeDeleted);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickPay = () => {
    _logger(items);
    _logger(total);

    let payload = {
      providerId: currentProvider,
      cartItems: items,
      amount: total,
    };

    _logger("Values going into payment form:", payload);
    setTimeout(
      () =>
        history.push("/payments/form", {
          payload: payload,
          type: "PAYMENT_FORM",
        }),
      1000
    );
  };

  const onClickBack = () => {
    history.push("/provider");
  };

  const itemMapper = (arr) => {
    const onClickRemove = () => {
      handleClickOpen(arr.id);
    };

    setCurrentProvider(arr.providerId);

    return (
      <CardContent className="p-3" key={arr.id}>
        <div
          className="d-flex align-items-baseline justify-content-between"
          style={{ display: "inline-block" }}
        >
          <div className="d-flex">
            <LightTooltip disableFocusListener title="Remove" placement="top">
              <IconButton
                onClick={onClickRemove}
                style={{ paddingRight: "20px", paddingLeft: "20px" }}
              >
                <RemoveShoppingCartIcon htmlColor="#282a46" />
              </IconButton>
            </LightTooltip>

            <div style={{ paddingLeft: "10px" }}>
              <b>{arr.serviceName}</b>
              <div className="text-black-50">{arr.serviceType}</div>
            </div>
          </div>
          <div
            className="font-weight-bold font-size-md"
            style={{ paddingRight: "10px", color: "black" }}
          >
            {priceFormatter(arr.price)}
          </div>
        </div>
        <Divider className="my-3" />
      </CardContent>
    );
  };

  return (
    <Fragment>
      {!showPage ? (
        <Grid container alignItems="center">
          <Grid item xs={false} lg={2}>
            {" "}
          </Grid>
          <Grid item xs={12} lg={8}>
            <Card
              className="card-box mt-5"
              style={{ width: "%", padding: "30px", textAlign: "center" }}
            >
              <h4
                className="display-8 font-weight-bold"
                style={{ width: "100%" }}
              >
                Bucket is Empty!
              </h4>{" "}
              <img
                style={{ maxWidth: "150px" }}
                src="https://sabio-training.s3-us-west-2.amazonaws.com/welrus/4f4916d3-22a0-4c65-8f75-9e7e595a41e2-circle-cropped.png"
              />
            </Card>
            <IconButton
              onClick={onClickBack}
              className="mb-5"
              style={{
                float: "left",
                color: "#282a46",
                fontWeight: "bold",
                marginRight: "15px",
              }}
            >
              <KeyboardArrowLeftIcon fontSize="large" htmlColor="#282a46" />
              To Providers
            </IconButton>
          </Grid>
          <Grid item xs={false} lg={2}></Grid>
        </Grid>
      ) : (
        <>
          <div
            className="hero-wrapper w-100 bg-composed-wrapper min-vh-100"
            style={{
              height: "100%",
            }}
          >
            <Card className="card-box mt-5" style={{ width: "100%" }}>
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
                  <div className="text-center text-lg-left mb-3 mb-lg-0">
                    <h1 className="display-4 font-weight-bold">Your Bucket </h1>

                    <p className="mb-0 text-black-50">
                      Please take a moment to review the information below.
                    </p>
                  </div>
                </div>
                <Divider className="my-3" />
                <div className="d-flex flex-column flex-lg-row justify-content-between mb-4">
                  <div>
                    <div className="text-uppercase text-primary mb-2 font-size-xs">
                      Provider Details
                    </div>
                    <p className="mb-1 font-weight-bold">Welrus Provider</p>
                    <p className="text-black-50">
                      525 Provider Ave, Los Angeles, CA 90005
                    </p>
                    <p>
                      <span className="d-block pb-1">
                        <b>Tel.:</b> 323-454-3522
                      </span>
                      <span className="d-block">
                        <b>Email:</b> welrusprovider@email.com
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-body p-4">
                <Divider className="my-3" />

                <div className="table-responsive">
                  <div className="table table-hover table-striped table-bordered mb-1">
                    <div>{table.length > 0 ? table : null}</div>
                  </div>
                  <div
                    className="d-flex font-weight-bold font-size-lg mb-5"
                    style={{
                      float: "right",
                      verticalAlign: "baseline",
                      right: "0px",
                    }}
                  >
                    <div className="pr-4">Total Due</div>
                    <div className="pr-4">{priceFormatter(total)}</div>
                  </div>
                </div>

                <IconButton
                  onClick={onClickBack}
                  className="mb-5"
                  style={{
                    float: "left",
                    color: "#282a46",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  <KeyboardArrowLeftIcon fontSize="large" htmlColor="#282a46" />
                  Back To Providers
                </IconButton>

                <IconButton
                  onClick={onClickPay}
                  className="mb-5"
                  style={{
                    float: "right",
                    color: "#282a46",
                    fontWeight: "bold",
                    marginRight: "15px",
                  }}
                >
                  Pay
                  <KeyboardArrowRightIcon
                    fontSize="large"
                    htmlColor="#282a46"
                  />
                </IconButton>
              </div>
            </Card>
          </div>
        </>
      )}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to remove item?"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={confirmRemove} color="primary">
              Yes
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

ShoppingCartPage.propTypes = {
  manageCartCount: PropTypes.func,
  history: PropTypes.shape({ goBack: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.isRequired,
    }),
  }),
};

export default withRouter(ShoppingCartPage);
