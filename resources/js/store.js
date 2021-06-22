import Vue from 'vue/dist/vue'
import Vuex from 'vuex'
import { Message } from 'element-ui';

Vue.use(Vuex)

const currentUser = window.sessionStorage.getItem('user')

export default new Vuex.Store({
  state: {
    base_url: BASE_URL,
    appName: APP_NAME,
    user: currentUser ? JSON.parse(currentUser) : {},
    token: window.sessionStorage.getItem('token'),
    vehicleTypeList: [],
    groupMemberList: [],
    memberList: [],
    navigationList: [],
    setting: {},
    siklus: [
      { value: 'days', label: 'hari' },
      { value: 'weeks', label: 'minggu' },
      { value: 'months', label: 'bulan' },
      { value: 'years', label: 'tahun' },
    ]
  },
  mutations: {
    getVehicleTypeList(state) {
      axios.get('/vehicleType')
        .then(r => state.vehicleTypeList = r.data)
        .catch(e => console.log(e))
    },
    getGroupMemberList(state) {
      axios.get('/groupMember')
        .then(r => state.groupMemberList = r.data)
        .catch(e => console.log(e))
    },
    getMemberList(state) {
      axios.get('/parkingMember')
        .then(r => state.memberList = r.data)
        .catch(e => console.log(e))
    },
    getNavigationList(state) {
      axios.get('/getNavigation')
        .then(r => state.navigationList = r.data)
        .catch(e => console.log(e))
    },
    getSetting(state) {
      axios.get('/setting')
        .then(r => state.setting = r.data)
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
