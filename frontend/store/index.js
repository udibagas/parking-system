import { Message } from 'element-ui'

export const state = () => ({
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
  ],
})

export const mutation = {
  getVehicleTypeList(state) {
    this.$axios
      .get('/vehicleType')
      .then((r) => (state.vehicleTypeList = r.data))
      .catch((e) => console.log(e))
  },

  getGroupMemberList(state) {
    this.$axios
      .get('/groupMember')
      .then((r) => (state.groupMemberList = r.data))
      .catch((e) => console.log(e))
  },

  getMemberList(state) {
    this.$axios
      .get('/parkingMember')
      .then((r) => (state.memberList = r.data))
      .catch((e) => console.log(e))
  },

  getNavigationList(state) {
    this.$axios
      .get('/getNavigation')
      .then((r) => (state.navigationList = r.data))
      .catch((e) => console.log(e))
  },

  getSetting(state) {
    this.$axios
      .get('/setting')
      .then((r) => (state.setting = r.data))
      .catch((e) => {
        Message({
          message: 'BELUM ADA SETTING',
          type: 'error',
          showClose: true,
          duration: 10000,
        })
      })
  },
}
