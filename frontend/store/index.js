import { Message } from 'element-ui'

export const state = () => ({
  vehicleTypeList: [],
  groupMemberList: [],
  memberList: [],
  navigationList: [],
  setting: {},
  pos: {},
  siklus: [
    { value: 'days', label: 'hari' },
    { value: 'weeks', label: 'minggu' },
    { value: 'months', label: 'bulan' },
    { value: 'years', label: 'tahun' },
  ],
})

export const mutations = {
  setVehicleTypeList(state, data) {
    state.vehicleTypeList = data
  },

  setGroupMemberList(state, data) {
    state.groupMemberList = data
  },

  setMemberList(state, data) {
    state.memberList = data
  },

  setNavigationList(state, data) {
    state.navigationList = data
  },

  setSetting(state, data) {
    state.setting = data
  },

  setPos(state, data) {
    state.pos = data
  },
}

export const actions = {
  async getVehicleTypeList({ commit }) {
    const data = await this.$axios.$get('/api/vehicleType')
    commit('setVehicleTypeList', data)
  },

  async getGroupMemberList({ commit }) {
    const data = await this.$axios.$get('/api/groupMember')
    commit('setGroupMemberList', data)
  },

  async getMemberList({ commit }) {
    const data = await this.$axios.$get('/api/parkingMember')
    commit('setMemberList', data)
  },

  async getNavigationList({ commit }) {
    const data = await this.$axios.$get('/api/getNavigation')
    commit('setNavigationList', data)
  },

  async getSetting({ commit }) {
    try {
      const data = await this.$axios.$get('/api/setting')
      commit('setSetting', data)
    } catch (error) {
      Message({
        message: 'BELUM ADA SETTING',
        type: 'error',
        showClose: true,
        duration: 10000,
      })
    }
  },

  async getPos({ commit }) {
    try {
      const data = await this.$axios.$get('/api/getPosByIp')
      commit('setPos', data)
    } catch (error) {
      Message({
        message: 'POS TIDAK TERDAFTAR',
        type: 'error',
        showClose: true,
        duration: 10000,
      })
    }
  },
}
