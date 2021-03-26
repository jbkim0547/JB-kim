import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("practiceService");

const endpoint = `${API_HOST_PREFIX}/api/practice`;

const updateScheduleId = (params) => {
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
  return axios(config)
    .then(onGlobalSuccess)
    .catch(onGlobalError)
    .then(() => params);
};

const getPracticeByAppointmentId = (appointmentId) => {
  _logger("-----------getByUserId connecting with API-----------");

  const config = {
    method: "GET",
    url: `${endpoint}/?appointmentId=${appointmentId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default { updateScheduleId, getPracticeByAppointmentId };
