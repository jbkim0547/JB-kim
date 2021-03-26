import axios from "axios";
import debug from 'sabio-debug';

import {onGlobalSuccess,onGlobalError,API_HOST_PREFIX} from "./serviceHelpers"

const _logger = debug.extend("Rating Service:");


const endpoint = `${API_HOST_PREFIX}/api/ratings`;


  const getById = (id) => {
    _logger("...getById is executing...")
    const config = {
      method: "GET",
      url: `${endpoint}/${id}`,
      withCredentials:true,
      crossdomain:true, 
      headers: { "Content-Type": "application/json" },
    };
    

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getAll = (payload) => {
    _logger("...getAll is executing...")
    const config = {
      method: "GET",
      url: `${endpoint}/paginate`,
      params:payload,
      withCredentials:true,
      crossdomain:true,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const postRating = (payload) => {
    _logger("...post is executing...")
    const config = {
      method: "POST",
      url: endpoint,
      data: payload,
      withCredentials:true,
      crossDomain:true,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const updateRating = (payload) => {
    _logger("...update is executing...")
    const config = {
      method: "PUT",
      url: `${endpoint}/${payload.id}`,
      data: payload,
      withCredentials:true,
      crossDomain:true,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };



  export  {getAll, getById,updateRating,postRating};