import axios from 'axios';

export const bff = axios.create({
  baseURL: '/',
});
