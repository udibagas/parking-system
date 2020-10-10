import Vue from 'vue'
import Vuex from 'vuex'
import {
    Message
} from 'element-ui';

Vue.use(Vuex)

const currentUser = window.sessionStorage.getItem('user')

export default new Vuex.Store({
    state: {
        base_url: BASE_URL,
        appName: APP_NAME,
        user: currentUser ? JSON.parse(currentUser) : {},
        token: window.sessionStorage.getItem('token'),
        jenisKendaraanList: [],
        gateInList: [],
        gateOutList: [],
        kameraList: [],
        posList: [],
        printerList: [],
        groupMemberList: [],
        memberList: [],
        navigationList: [],
        setting: {},
        siklus: [{
                value: 'days',
                label: 'hari'
            },
            {
                value: 'weeks',
                label: 'minggu'
            },
            {
                value: 'months',
                label: 'bulan'
            },
            {
                value: 'years',
                label: 'tahun'
            },
        ]
    },
    mutations: {
        getJenisKendaraanList(state) {
            axios.get('/jenisKendaraan').then(r => state.jenisKendaraanList = r.data)
                .catch(e => console.log(e))
        },
        getGroupMemberList(state) {
            axios.get('/groupMember').then(r => state.groupMemberList = r.data)
                .catch(e => console.log(e))
        },
        getMemberList(state) {
            axios.get('/member/getList').then(r => state.memberList = r.data)
                .catch(e => console.log(e))
        },
        getGateInList(state) {
            axios.get('/gateIn').then(r => state.gateInList = r.data)
                .catch(e => console.log(e))
        },
        getGateOutList(state) {
            axios.get('/gateOut').then(r => state.gateOutList = r.data)
                .catch(e => console.log(e))
        },
        getKameraList(state) {
            axios.get('/kamera').then(r => state.kameraList = r.data)
                .catch(e => console.log(e))
        },
        getPosList(state) {
            axios.get('/pos').then(r => state.posList = r.data)
                .catch(e => console.log(e))
        },
        getPrinterList(state) {
            axios.get('/printer').then(r => state.printerList = r.data)
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
