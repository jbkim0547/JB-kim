import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("medicalServiceTypeService");

const endpoint = `${API_HOST_PREFIX}/api/medicalservicetypes`;

const getAllByKeyword = (inputValue) => {
  _logger("-----------getById connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/?keyword=${inputValue}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default { getAllByKeyword };
