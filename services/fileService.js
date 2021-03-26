import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const uploader = function (files) {
  const config = {
    method: "POST",
    url: `${API_HOST_PREFIX}/api/files`,
    data: files,
    headers: { "Content-Type": "multipart/form-data" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { uploader };




