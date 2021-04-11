import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { data, status, headers } = error.response;
      console.log({ data, status, headers });
      return Promise.reject(error.response);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return Promise.reject(error);
  },
);

export const http = axiosInstance;

export const httpServices = {
  // TODO:  httpServices
  async get() {

  },
};
