import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("providerServiceService");

const endpoint = `${API_HOST_PREFIX}/api/providers`;

const add = (payload) => {
  _logger("... add is executing ...");

  const config = {
    method: "POST",
    url: `${endpoint}/services`,
    data: payload,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
};

const getAll = (params) => {
  _logger("-----------getAllServices connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/${params.providerId}/${params.scheduleId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllPaginated = (providerId, scheduleId, pageIndex, pageSize) => {
  _logger("-----------getById connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/services?providerId=${providerId}&scheduleId=${scheduleId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchPaginated = (
  providerId,
  scheduleId,
  pageIndex,
  pageSize,
  keyword
) => {
  _logger("-----------getById connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/services/search?providerId=${providerId}&scheduleId=${scheduleId}&pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getTopServices = (providerId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${providerId}/top`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getTopServicesByDate = (providerId, startDate, endDate) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${providerId}/report?startDate=${startDate}&endDate=${endDate}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
const getProvidersLocation = (payload) => {

  _logger("payload.....", payload);
  const config = {
    method: "POST",
    url: `${endpoint}/location`,
    data: payload,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default {
  add,
  getAll,
  getAllPaginated,
  searchPaginated,
  getTopServices,
  getTopServicesByDate,
  getProvidersLocation
};
