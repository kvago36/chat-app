import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

instance.defaults.headers.common['Auth-User-Token'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;