import"./BcU_p3ET.js";import{E as i}from"./Cwhp1QW1.js";import{l as e,aA as n}from"./V6XCBzcI.js";const r=e(),t=$fetch.create({baseURL:r.public.apiBase,credentials:"include",headers:{"Content-Type":"application/json",Accept:"application/json"}}),g=n("website",{state:()=>({jenisKendaraanList:[],groupJenisKendaraanList:[],groupMemberList:[],memberList:[],navigationList:[],gateInList:[],gateOutList:[],kameraList:[],posList:[],printerList:[],shiftList:[],areaParkirList:[],setting:{},pos:null,siklus:[{value:"days",label:"hari"},{value:"weeks",label:"minggu"},{value:"months",label:"bulan"},{value:"years",label:"tahun"}]}),actions:{async getJenisKendaraanList(){const a=await t("/api/jenisKendaraan");this.jenisKendaraanList=a},async getGateInList(){const a=await t("/api/gateIn");this.gateInList=a},async getGateOutList(){const a=await t("/api/gateOut");this.gateOutList=a},async getKameraList(){const a=await t("/api/kamera");this.kameraList=a},async getPosList(){const a=await t("/api/pos");this.posList=a},async getAreaParkirList(){const a=await t("/api/areaParkir");this.areaParkirList=a},async getPrinterList(){const a=await t("/api/printer");this.printerList=a},async getShiftList(){const a=await t("/api/shift");this.shiftList=a},async getGroupMemberList(){const a=await t("/api/groupMember");this.groupMemberList=a},async getMemberList(){const s=await t("/api/member",{params:{columns:"id, nama, nomor_kartu, berbayar"}});this.memberList=s},async getNavigationList(){const a=await t("/api/getNavigation");this.navigationList=a},async getSetting(){try{const a=await t("/api/setting");this.setting=a}catch{i({message:"BELUM ADA SETTING",type:"error",showClose:!0,duration:1e4})}},async getPos(){try{const a=await t("/api/getPosByIp");this.pos=a}catch{this.pos=null}}}});export{g as u};
