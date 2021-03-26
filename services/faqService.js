import axios from "axios";
import debug from 'sabio-debug';
import {onGlobalSuccess,onGlobalError,API_HOST_PREFIX} from "./serviceHelpers"

const _logger = debug.extend("faqService:");


const endpoint = `${API_HOST_PREFIX}/api/faqs`;


const getAll = () => {
  _logger("...getAll is executing...")
  const config = {
    method: "GET",
    url: endpoint,
    withCredentials:true,
    crossdomain:true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
};


  const add = (payload) => {
    _logger("...post is executing...")
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials:true,
      crossDomain:true,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config)
  };

export { add, getAll};
