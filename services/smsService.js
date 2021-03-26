import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("userService");
const endpoint = API_HOST_PREFIX + "/api";

const sendSMS = (payload) => {
  _logger("sendSMS api endpoint is firing");
  const config = {
    method: "POST",
    url: `${endpoint}/sms/sendReminder`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default {
  sendSMS
};
