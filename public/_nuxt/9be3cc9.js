(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{661:function(t,n,e){"use strict";e.r(n);var l={data:function(){return{summary:{}}},methods:{getData:function(){var t=this;this.$axios.$get("/api/summary").then((function(n){return t.summary=n}))}},created:function(){this.getData()}},r=e(46),component=Object(r.a)(l,(function(){var t=this,n=t._self._c;return n("el-row",{staticClass:"mb-3",attrs:{gutter:20}},[n("el-col",{attrs:{span:8}},[n("el-card",[t._v("\n\t\t\tHari Ini\n\t\t\t"),n("div",{staticClass:"text-5xl text-purple-700"},[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(t.summary.today))+"\n\t\t\t")])])],1),t._v(" "),n("el-col",{attrs:{span:8}},[n("el-card",[t._v("\n\t\t\tBulan Ini\n\t\t\t"),n("div",{staticClass:"text-5xl text-blue-700"},[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(t.summary.this_month))+"\n\t\t\t")])])],1),t._v(" "),n("el-col",{attrs:{span:8}},[n("el-card",[t._v("\n\t\t\tTotal\n\t\t\t"),n("div",{staticClass:"text-5xl text-orange-700"},[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(t.summary.total))+"\n\t\t\t")])])],1)],1)}),[],!1,null,null,null);n.default=component.exports}}]);