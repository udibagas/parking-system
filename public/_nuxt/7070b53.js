(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{456:function(e,t,r){"use strict";r.r(t);r(51),r(248);var n={data:function(){return{diskSpace:[],memoryUsage:[]}},methods:{getDiskSpace:function(){var e=this;axios.get("/serverInformation",{params:{cmd:"df -h"}}).then((function(t){e.diskSpace=t.data.split("\n")}))},getMemoryUsage:function(){var e=this;axios.get("/serverInformation",{params:{cmd:"free -m"}}).then((function(t){e.memoryUsage=t.data.split("\n")}))}},mounted:function(){this.getDiskSpace(),this.getMemoryUsage()}},o=r(36),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-page-header",{attrs:{content:"SERVER INFORMATION"},on:{back:function(t){return e.$emit("back")}}}),e._v(" "),r("el-divider"),e._v(" "),r("el-row",{attrs:{gutter:15}},[r("el-col",{attrs:{span:12}},[r("el-card",{staticStyle:{height:"320px"}},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Disk Space")])]),e._v(" "),e.diskSpace?r("table",[r("tbody",e._l(e.diskSpace,(function(t,i){return r("tr",{key:i},[r("td",[e._v(e._s(t))])])})),0)]):e._e()])],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-card",{staticStyle:{height:"320px"}},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[e._v("Memory Usage")])]),e._v(" "),e.memoryUsage?r("table",[r("tbody",e._l(e.memoryUsage,(function(t,i){return r("tr",{key:i},[r("td",[e._v(e._s(t))])])})),0)]):e._e()])],1)],1)],1)}),[],!1,null,"4f6cc749",null);t.default=component.exports}}]);