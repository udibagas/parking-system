/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI, { locale });

Vue.filter('readableDateTime', function(v) {
    return v ? moment(v).format('DD-MMM-YYYY HH:mm') : ''
})

Vue.filter('readableDate', function(v) {
    return v ? moment(v).format('DD-MMM-YYYY') : ''
})

Vue.component('App', require('./App').default)

const app = new Vue({
    el: '#app',
    store, router,
    render: function(createElement) {
        return createElement('App')
    }
});
