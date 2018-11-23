import axios from 'axios';
import { getToken } from 'utils/localStorage/index';

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

export default globalAxios;