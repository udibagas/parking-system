(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{580:function(t,e,o){"use strict";o.r(e);o(33),o(25),o(32),o(44),o(24),o(45);var n=o(17),r=o(59);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var l={data:function(){return{show:!1,notification:{},echo:null}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(r.b)(["setting"])),mounted:function(){var t=this;this.echo=this.$echo({key:"pusher_app_key",host:this.setting.server_address,port:6001}),this.echo.private("notification").notification((function(e){t.notification=e,t.show=!0}))},destroyed:function(){this.echo.leave("log")}},f=o(37),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{attrs:{visible:t.show,center:"","close-on-click-modal":!1,"show-close":!1},on:{"update:visible":function(e){t.show=e}}},[o("div",{staticClass:"text-center",staticStyle:{"font-size":"50px",color:"orange"}},[o("i",{staticClass:"el-icon-warning-outline"})]),t._v(" "),o("div",{staticClass:"text-center",staticStyle:{"font-size":"24px","margin-top":"20px"}},[t._v("\n\t\t"+t._s(t.notification.message)+"\n\t")]),t._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary",icon:"el-icon-circle-close"},on:{click:function(e){t.show=!1}}},[t._v("TUTUP")])],1)])}),[],!1,null,null,null);e.default=component.exports}}]);