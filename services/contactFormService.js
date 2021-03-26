import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("providerServiceService");

const endpoint = `${API_HOST_PREFIX}/api/contactforms`;

const add = (payload) => {
  _logger("... add is executing ...");

  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    withCredentials:true,
    crossDomain:true,
    headers: {
      "Content-Type": "application/json",
    },
  
  }
  return axios(config);

  
};
let getMessage = () => {
  _logger("... getMessage is executing")

  const config = {
      method: "GET",
      url: `${endpoint}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};
  let deleteMessage = (payload) => {
    const config = {
      method: "DELETE",
      url: `${endpoint}/${payload.id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() => payload.id);
  
};


export  { add,getMessage,deleteMessage };
