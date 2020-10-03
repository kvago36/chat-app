import axios from 'axios';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

const instance = axios.create({
  baseURL: '/api'
});

const unauthorizedCatch = (error: any) => {
  // fix later
  if (error.message === 'Request failed with status code 401') {
    history.push('/login', { error: 'unauthorized', from: window.location.pathname })
    history.go(0);
  }

  return Promise.reject(error)
}

instance.interceptors.response.use(response => response, unauthorizedCatch)

instance.defaults.headers.common['Auth-User-Token'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;