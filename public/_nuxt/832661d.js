(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{691:function(e,t,n){"use strict";n.r(t);var o={data:function(){return{components:[{label:"Pengaturan Umum",component:"SettingGeneral"},{label:"Jenis Kendaraan & Tarif",component:"SettingJenisKendaraan"},{label:"Shift",component:"SettingShift"},{label:"Kamera",component:"SettingKamera"},{label:"Printer",component:"SettingPrinter"},{label:"Pos",component:"SettingPos"},{label:"Gate Keluar",component:"SettingGateOut"},{label:"Gate Masuk",component:"SettingGateIn"},{label:"Area Parkir",component:"SettingAreaParkir"},{label:"Backup & Restore",component:"SettingBackup"}]}},mounted:function(){this.$store.dispatch("getKameraList"),this.$store.dispatch("getPrinterList")}},l=n(46),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return t("el-card",[t("el-tabs",e._l(e.components,(function(e,i){return t("el-tab-pane",{key:i,attrs:{lazy:"",label:e.label.toUpperCase()}},[t(e.component,{tag:"component"})],1)})),1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);