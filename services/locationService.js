import axios from "axios";
import { onGlobalSuccess, onGlobalError, API_HOST_PREFIX } from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("locationService");

const endpoint = `${API_HOST_PREFIX}/api/locations`;
const createLocation = (payload) => {
  _logger("... create is executing ...");

  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};



export default { createLocation };