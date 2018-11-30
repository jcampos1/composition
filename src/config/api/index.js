import axios from 'axios';
import { getToken } from 'utils/localStorage/index';
import {REDIRECT_PARAMETER} from 'constants/index';
import {getNextPage} from 'utils/index';

let headers = {
    'Content-Type': 'application/json'
};

const globalAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers
});

// Add a request interceptor
globalAxios.interceptors.request.use(config => {
    // Do something before request is sent
    const token = getToken();
    if (token)
        config.headers["Authorization"] = `Token ${token}`;
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

globalAxios.interceptors.response.use( response => {
    // Do something with response data
    return response;
  }, error => {
    // Do something with response error
    if(error.response.status === 403 || error.response.status === 401)
        window.location.href = `/login?${REDIRECT_PARAMETER}=${getNextPage()}`;

    // Trow errr again (may be need for some other catch)
    return Promise.reject(error);
});

export default globalAxios;