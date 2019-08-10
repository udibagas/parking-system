window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = BASE_URL;
window.axios.defaults.headers.common['Authorization'] = 'bearer ' + window.localStorage.getItem('token');
window.moment = require('moment');
