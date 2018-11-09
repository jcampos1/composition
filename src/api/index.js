import axios from 'axios';
import {getToken} from '../utils/localStorage/index';

const token = getToken();

const globalAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
  	'Content-Type': 'application/json',
  	'Authorization': `Token ${token}`}
});

export default globalAxios;