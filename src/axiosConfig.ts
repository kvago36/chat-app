import axios from 'axios';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const instance = axios.create({
  baseURL: '/api'
});

const unauthorizedCatch = (error: any) => {
  // fix later
  if (error.message === 'Request failed with status code 401') {
    const redirectTo = { error: 'sessionError', from: window.location.pathname }
    sessionStorage.setItem('error', JSON.stringify(redirectTo))
    history.push('/login', redirectTo)
    history.go(0)
  }

  return Promise.reject(error)
}

instance.interceptors.response.use(response => response, unauthorizedCatch)

instance.defaults.headers.common['Auth-User-Token'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;