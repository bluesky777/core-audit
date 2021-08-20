import axios from "axios";

const localServer = "http://localhost/api";
const globalServer = "https://audit.micolevirtual.com/audit7-laravel/api";
// eslint-disable-next-line no-restricted-globals
const serverUrl =
  window.location.hostname === "localhost" ? localServer : globalServer;

const request = axios.create({
  baseURL: serverUrl,
});

request.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default request;
