(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{603:function(e,t,n){"use strict";n.r(t);var l={data:function(){return{tabs:[{component:"ParkingMember",label:"MEMBER",visible:!0},{component:"GroupMember",label:"GROUP MEMBER",visible:1==this.$auth.user.role},{component:"Renewal",label:"PEMBAYARAN",visible:!0},{component:"MembershipReportDaily",label:"LAPORAN PENDAPATAN HARIAN",visible:1==this.$auth.user.role},{component:"MembershipReport",label:"SUMMARY LAPORAN PENDAPATAN",visible:1==this.$auth.user.role}]}},mounted:function(){this.$store.dispatch("getGroupMemberList")}},r=n(37),component=Object(r.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-card",[n("el-tabs",e._l(e.tabs.filter((function(e){return e.visible})),(function(e,i){return n("el-tab-pane",{key:i,attrs:{lazy:"",label:e.label}},[n("Member"+e.component,{tag:"component"})],1)})),1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);