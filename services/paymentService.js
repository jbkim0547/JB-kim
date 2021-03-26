import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const paymentProcesser = function (payload) {
  const config = {
    method: "POST",
    url: `${API_HOST_PREFIX}/api/payments`,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { paymentProcesser };
