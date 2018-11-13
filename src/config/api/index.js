import axios from 'axios';
import {getToken} from 'utils/localStorage/index';

const token = getToken();

let headers = {
  	'Content-Type': 'application/json'
};

if (token)
	headers.Authorization = `Token ${token}`;

const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers
});

export default globalAxios;