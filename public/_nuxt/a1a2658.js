(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{395:function(t,e,n){var content=n(399);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(85).default)("a54d949e",content,!0,{sourceMap:!1})},398:function(t,e,n){"use strict";n(395)},399:function(t,e,n){var o=n(84)(!1);o.push([t.i,".log-container[data-v-6d87cfbe]{height:calc(100vh - 230px);background:#000;color:#fff;padding:15px;font-family:monospace;font-size:.9em;overflow:auto}",""]),t.exports=o},405:function(t,e,n){"use strict";n.r(e);n(89);var o={data:function(){return{log:"",requestInterval:null}},methods:{getLog:function(){var t=this;this.$axios.$get("/api/controller-log").then((function(e){return t.log=e})).catch((function(t){return console.log(t)}))}},mounted:function(){this.requestInterval=setInterval(this.getLog,2e3)},destroyed:function(){clearInterval(this.requestInterval)}},r=(n(398),n(22)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"log-container",domProps:{innerHTML:t._s(t.log)}})}),[],!1,null,"6d87cfbe",null);e.default=component.exports}}]);