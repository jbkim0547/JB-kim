import React, { useState, useEffect, useReducer } from "react";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import { IconButton, Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import logger from "sabio-debug";
import PropTypes from "prop-types";

const _logger = logger.extend("CartIcon");
const StyledBadge = withStyles({
  badge: {
    backgroundColor: "var(--success)",
    color: "var(--success)",
    boxShadow: "0 0 0 2px #fff",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
})(Badge);

const CartIcon = (cartCount) => {
  const history = useHistory();
  const counter = cartCount.cartCount;
  const [countBadge, setCountBadge] = useState(0);
  const [iconShow, setIconShow] = useState(true); // only shows cart if user is logged in
  _logger(cartCount.currentUserId);

  useEffect(() => {
    if (!cartCount.currentUserId && cartCount.currentUserId < 1) {
      setIconShow(false);
    }
  }, []);

  useEffect(() => {
    _logger("new cart count:", counter);
    setCountBadge(counter);
  }, [counter]);

  //When we implement the cart page in the upper right,
  //this is the route that will take us there
  //*****disabled for now because we would need to implement an appointment functionality into that payment page */ 
/*const handleClick = () => {
    _logger("Cart Icon clicked");
    history.push(`/cart/${cartCount.currentUserId}`);
  };*/


  return (
    <>
      {iconShow && (
        <div>
          <IconButton
            color="inherit"
            className="btn-inverse mx-1 d-50"
            //Keeping here for future implementation of payment page
            //onClick={handleClick}
          >
            {countBadge > 0 ? (
              <>
                <ShoppingCartTwoToneIcon
                  fontSize="inherit"
                  htmlColor="white"
                  titleAccess="Go to Cart"
                />
                <div className="badge badge-pill badge-success badge-header">
                  {countBadge}
                </div>
              </>
            ) : (
              <>
                <ShoppingCartTwoToneIcon
                  fontSize="inherit"
                  htmlColor="white"
                  titleAccess="Go to Cart"
                />
              </>
            )}
          </IconButton>
        </div>
      )}
    </>
  );
};

CartIcon.propTypes = {
  cartCount: PropTypes.number,
  currentUserId: PropTypes.number,
};

export default CartIcon;
