import axios from "axios";
import debug from "sabio-debug";
import {onGlobalSuccess,onGlobalError, API_HOST_PREFIX} from "./serviceHelpers"

const _logger = debug.extend("Provider Demo Request Service");

const endpoint = `${API_HOST_PREFIX}/api/demoRequests`; 
const demoRequest = (payload) => {
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: {"Content-Type": "application/json"},
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };
  
  export default{demoRequest};