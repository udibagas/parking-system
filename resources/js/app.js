require('./bootstrap');
window.Vue = require('vue');
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import router from './router'
import store from './store'
import VueMask from 'v-mask'

Vue.use(ElementUI, { locale });
Vue.use(VueMask);

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
