import { AddRegion } from '@/types/region';
import axios, { AxiosResponse } from 'axios';

const responseBody = (response: AxiosResponse) => response.data;

const baseUrl = process.env.NEXT_PUBLIC_REGIONS_URL;

axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const regions = {
  getAllRegions: () => requests.get(`${baseUrl}Regions`),
  addRegion: (values: AddRegion) =>
    requests.post(`${baseUrl}Regions/AddRegion`, values),
  deleteRegion: (id: string) => requests.delete(`${baseUrl}Regions/${id}`),
};

const agent = {
  regions,
};

export default agent;
