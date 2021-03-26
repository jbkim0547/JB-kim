import axios from "axios";
import {onGlobalSuccess,onGlobalError,API_HOST_PREFIX} from "./serviceHelpers"

const endPoint = `${API_HOST_PREFIX}/api/FaqCategory`

const add = (payload) => {

    const config = {
        method: "POST",
        url: endPoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAll = (payload) => {

    const config = {
        method: "GET",
        url: endPoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};


export { add, getAll }