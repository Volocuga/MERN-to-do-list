import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.headers.post['Content-Type'] = 'application/json';

if (token) {
  axios.defaults.headers.common['x-auth-token'] = token;
}
export default axios;
