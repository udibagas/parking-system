import { Message } from 'element-ui'

export const state = () => ({
  jenisKendaraanList: [],
  groupMemberList: [],
  memberList: [],
  navigationList: [],
  gateInLIst: [],
  gateOutList: [],
  kameraList: [],
  posList: [],
  printerList: [],
  shiftList: [],
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
  setJenisKendaraanList(state, data) {
    state.jenisKendaraanList = data
  },

  setGateInList(state, data) {
    state.gateInList = data
  },

  setGateOutList(state, data) {
    state.gateOutList = data
  },

  setKameraList(state, data) {
    state.kameraList = data
  },

  setPosList(state, data) {
    state.posList = data
  },

  setPrinterList(state, data) {
    state.printerList = data
  },

  setShiftList(state, data) {
    state.shiftList = data
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
  async getJenisKendaraanList({ commit }) {
    const data = await this.$axios.$get('/api/jenisKendaraan')
    commit('setJenisKendaraanList', data)
  },

  async getGateInList({ commit }) {
    const data = await this.$axios.$get('/api/gateIn')
    commit('setGateInList', data)
  },

  async getGateOutList({ commit }) {
    const data = await this.$axios.$get('/api/gateOut')
    commit('setGateOutList', data)
  },

  async getKameraList({ commit }) {
    const data = await this.$axios.$get('/api/kamera')
    commit('setKameraList', data)
  },

  async getPosList({ commit }) {
    const data = await this.$axios.$get('/api/pos')
    commit('setPosList', data)
  },

  async getPrinterList({ commit }) {
    const data = await this.$axios.$get('/api/printer')
    commit('setPrinterList', data)
  },

  async getShiftList({ commit }) {
    const data = await this.$axios.$get('/api/shift')
    commit('setShiftList', data)
  },

  async getGroupMemberList({ commit }) {
    const data = await this.$axios.$get('/api/groupMember')
    commit('setGroupMemberList', data)
  },

  async getMemberList({ commit }) {
    const data = await this.$axios.$get('/api/member')
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
