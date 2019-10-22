import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui';

Vue.use(Vuex)

let currentUser = JSON.parse(window.localStorage.getItem('user'))

export default new Vuex.Store({
    state: {
        base_url: BASE_URL,
        appName: APP_NAME,
        user: currentUser || {},
        token: window.localStorage.getItem('token'),
        is_logged_in: !!currentUser,
        vehicleTypeList: [],
        parkingGateList: [],
        groupMemberList: [],
        memberList: [],
        navigationList: [],
        setting: {},
        siklus: [
            {value: 'days', label: 'hari'},
            {value: 'weeks', label: 'minggu'},
            {value: 'months', label: 'bulan'},
            {value: 'years', label: 'tahun'},
        ]
    },
    mutations: {
        getVehicleTypeList(state) {
            axios.get('/vehicleType/getList').then(r => state.vehicleTypeList = r.data)
                .catch(e => console.log(e))
        },
        getGroupMemberList(state) {
            axios.get('/groupMember/getList').then(r => state.groupMemberList = r.data)
                .catch(e => console.log(e))
        },
        getMemberList(state) {
            axios.get('/parkingMember/getList').then(r => state.memberList = r.data)
                .catch(e => console.log(e))
        },
        getParkingGateList(state) {
            axios.get('/parkingGate/getList').then(r => state.parkingGateList = r.data)
                .catch(e => console.log(e))
        },
        getNavigationList(state) {
            axios.get('/getNavigation').then(r => state.navigationList = r.data)
                .catch(e => console.log(e))
        },
        getSetting(state) {
            axios.get('/setting').then(r => state.setting = r.data)
                .catch(e => {
                    Message({
                        message: 'BELUM ADA SETTING',
                        type: 'error',
                        showClose: true,
                        duration: 10000
                    })
                })
        }
    }
})
