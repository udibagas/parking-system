window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = 'bearer ' + window.sessionStorage.getItem('token');
window.axios.defaults.baseURL = BASE_URL;
window.moment = require('moment');
