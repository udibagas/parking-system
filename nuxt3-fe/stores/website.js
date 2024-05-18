import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

const config = useRuntimeConfig();
const fetch = $fetch.create({
  baseURL: config.public.apiBase,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const useWebsiteStore = defineStore("website", {
  state: () => ({
    jenisKendaraanList: [],
    groupJenisKendaraanList: [],
    groupMemberList: [],
    memberList: [],
    navigationList: [],
    gateInList: [],
    gateOutList: [],
    kameraList: [],
    posList: [],
    printerList: [],
    shiftList: [],
    areaParkirList: [],
    setting: {},
    pos: null,
    siklus: [
      { value: "days", label: "hari" },
      { value: "weeks", label: "minggu" },
      { value: "months", label: "bulan" },
      { value: "years", label: "tahun" },
    ],
  }),

  actions: {
    async getJenisKendaraanList() {
      const data = await fetch("/api/jenisKendaraan");
      this.jenisKendaraanList = data;
    },

    async getGateInList() {
      const data = await fetch("/api/gateIn");
      this.gateInList = data;
    },

    async getGateOutList() {
      const data = await fetch("/api/gateOut");
      this.gateOutList = data;
    },

    async getKameraList() {
      const data = await fetch("/api/kamera");
      this.kameraList = data;
    },

    async getPosList() {
      const data = await fetch("/api/pos");
      this.posList = data;
    },

    async getAreaParkirList() {
      const data = await fetch("/api/areaParkir");
      this.areaParkirList = data;
    },

    async getPrinterList() {
      const data = await fetch("/api/printer");
      this.printerList = data;
    },

    async getShiftList() {
      const data = await fetch("/api/shift");
      this.shiftList = data;
    },

    async getGroupMemberList() {
      const data = await fetch("/api/groupMember");
      this.groupMemberList = data;
    },

    async getMemberList() {
      const params = { columns: "id, nama, nomor_kartu, berbayar" };
      const data = await fetch("/api/member", { params });
      this.memberList = data;
    },

    async getNavigationList() {
      const data = await fetch("/api/getNavigation");
      this.navigationList = data;
    },

    async getSetting() {
      try {
        const data = await fetch("/api/setting");
        this.setting = data;
      } catch (error) {
        ElMessage({
          message: "BELUM ADA SETTING",
          type: "error",
          showClose: true,
          duration: 10000,
        });
      }
    },

    async getPos() {
      try {
        const data = await fetch("/api/getPosByIp");
        this.pos = data;
      } catch (error) {
        this.pos = null;
      }
    },
  },
});
