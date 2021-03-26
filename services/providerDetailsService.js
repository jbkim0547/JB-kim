import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("providerDetailsService");

const endpoint = `${API_HOST_PREFIX}/api/providers`;

const add = (payload) => {
  _logger("... add is executing ...");

  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getCurrentProvider = () => {
  const config = {
    method: "GET",
    url: `${endpoint}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getById = (id) => {
  _logger("-----------getById connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/${id}/details`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAll = (params) => {
  _logger("-----------getAll connecting with API-----------");

  let compositeEndPt =
    endpoint +
    `/paginate/?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`;

  const config = {
    method: "GET",
    url: compositeEndPt,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const search = (params) => {
  _logger("-----------Search connecting with API-----------");

  let compositeEndPt =
    endpoint +
    `/search/?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&Query=${params.query}`;

  const config = {
    method: "GET",
    url: compositeEndPt,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default { add, getById, getAll, search, getCurrentProvider };
