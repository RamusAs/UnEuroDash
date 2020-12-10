import axios from 'axios';
import store from '@/store';
import router from '@/router';
import config from './';

const HTTP = axios.create(config);

HTTP.interceptors.request.use((request) => {
  const user = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : '';
  request.headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + user.token,
  };
  return request;
}, (error) => {
  return Promise.reject(error);
});

HTTP.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error !== undefined && error.response !== undefined
      && error.response.status === 401 && error.response.data.name === 'TokenExpiredError') {
    return store.dispatch('user/signOut').then(() => {
      router.go('/user/login');
    });
  }
  throw error;
});

export default HTTP;
