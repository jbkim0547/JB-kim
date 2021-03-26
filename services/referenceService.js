import axios from "axios";
import {onGlobalSuccess, onGlobalError, API_HOST_PREFIX} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("providerDetailsService");

const endpoint = `${API_HOST_PREFIX}/api/lookup`;

  const get = () => {   
    _logger("... get is executing ...");
  
    const config = {
      method: "GET",
      url: endpoint,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };
  
  export { get };
