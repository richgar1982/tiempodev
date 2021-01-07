// axios
import axios from 'axios';
import Vue from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(NProgress);

const baseURL = ""

let headers = {
  'cache-control': 'no-cache'
};

let accessToken = localStorage.getItem('accessToken');

if (accessToken && accessToken !== '') {
  headers.Authorization = 'Bearer ' + accessToken;

};

const instance = axios.create({
  baseURL: baseURL,
  headers: headers
});

instance.interceptors.request.use(function (config) {
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  NProgress.done();
  return Promise.reject(error);
});

instance.interceptors.response.use(function(response){
  NProgress.done();
  return response;
}, function (error) {

  NProgress.done();
  if (error.response != undefined && error.response.status === 401){
      localStorage.removeItem("accessToken");
  }


  if (error.response && error.response.data) {
       return Promise.reject(error.response.data);
  }
  return Promise.reject(error.status);
});

export default instance;


