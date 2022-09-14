import axios from "axios";
import { generatePath } from "react-router-dom";

import { ENDPOINTS } from "./apiConst";

const URL_BASE = process.env.REACT_APP_API;

const addQueryParams = (path, searchs) => {
  let queryParams = "";

  Object.keys(searchs).forEach((key, index) => {
    queryParams =
      index === 0
        ? queryParams.concat("?", key, "=", searchs[key])
        : queryParams.concat("&", key, "=", searchs[key]);
  });

  return path.concat(queryParams);
};

const generateEndpoint = (endpointKey = "", { params = {}, searchs = {} } = {}) => {
  const { [endpointKey]: url } = ENDPOINTS;

  let path = generatePath(url, params);
  path = addQueryParams(path, searchs);

  return URL_BASE.concat(path);
};

const httpAction = (endpoint, method, payload) => {
  const fetchOptions = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method: method ?? "GET",
    data: payload ?? null,
  };

  return axios(endpoint, fetchOptions);
};

export { generateEndpoint, httpAction };
