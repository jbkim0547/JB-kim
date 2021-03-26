import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("scheduleService");

const endpoint = `${API_HOST_PREFIX}/api/schedule`;

const addScheduleAvailability = (payload) => {
  _logger("... add is executing ...", payload);

  const config = {
    method: "POST",
    url: `${endpoint}/ScheduleAvailability`,
    data: payload,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateStatusScheduleAvailability = (params) => {
  _logger("... UPDATE STATUS is executing ...", params);

  const config = {
    method: "PUT",
    url: `${endpoint}/${params.id}`,
    data: params.payload,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getScheduleAvailabilityById = (params) => {
  _logger(
    "-----------getScheduleAvailabilityById connecting with API-----------"
  );

  const config = {
    method: "GET",
    url: `${endpoint}/paginate/?pageIndex=${params.pageIndex}&pageSize=${params.pageSize}&scheduleId=${params.id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteScheduleAvailabilityById = (id) => {
  _logger(
    "-----------deleteScheduleAvailabilityById connecting with API-----------"
  );

  const config = {
    method: "DELETE",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(onGlobalSuccess)
    .catch(onGlobalError)
    .then(() => id);
};

const getScheduleByProviderId = (id) => {
  _logger("-----------getScheduleByProviderId connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addSchedule = (payload) => {
  _logger("... add is executing ...", payload);

  const config = {
    method: "POST",
    url: `${endpoint}/Schedule`,
    data: payload,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getPracticesWithScheduleIdByProviderId = (id) => {
  _logger("-----------getScheduleByProviderId connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/practice/${id}`,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default {
  addScheduleAvailability,
  updateStatusScheduleAvailability,
  getScheduleAvailabilityById,
  deleteScheduleAvailabilityById,
  getScheduleByProviderId,
  addSchedule,
  getPracticesWithScheduleIdByProviderId,
};
