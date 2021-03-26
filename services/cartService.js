import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const addItemToCart = function (payload) {
  const config = {
    method: "POST",
    url: `${API_HOST_PREFIX}/api/cart`,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getItemsFromCart = function () {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/cart`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteItem = function (itemId) {
  const config = {
    method: "DELETE",
    url: `${API_HOST_PREFIX}/api/cart/${itemId}`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(onGlobalSuccess)
    .then(() => itemId)
    .catch(onGlobalError);
};

const emptyCartByUserId = function () {
  const config = {
    method: "DELETE",
    url: `${API_HOST_PREFIX}/api/cart`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { addItemToCart, getItemsFromCart, deleteItem, emptyCartByUserId };
