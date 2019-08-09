import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let currentUser = JSON.parse(window.localStorage.getItem('user'))

export default new Vuex.Store({
    state: {
        base_url: BASE_URL,
        user: currentUser || {},
        token: window.localStorage.getItem('token'),
        is_logged_in: !!currentUser,
        vehicleTypeList: []
    },
    mutations: {
        getVehicleTypeList(state) {
            axios.get('/vehicleType/getList').then(r => state.vehicleTypeList = r.data)
                .catch(e => console.log(e))
        }
    }
})
