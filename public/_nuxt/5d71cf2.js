(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{216:function(e,t,r){"use strict";var n=r(1),o=r(98),c=r.n(o),l=r(332),d=r.n(l);n.default.use(c.a,{locale:d.a})},217:function(e,t,r){"use strict";r(27),r(74),r(14),r(26);t.a=function(e,t){e.app;t("decimal",(function(e){return null==e?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}))}},218:function(e,t,r){"use strict";var n=r(1),o=r(333);n.default.use(o.a)},219:function(e,t,r){"use strict";var n=r(98);t.a=function(e){var t=e.$axios;e.redirect;t.onError((function(e){parseInt(e.response&&e.response.status)&&404!=e.response.status&&Object(n.Message)({message:e.response.data.message,type:"error",center:!0,showClose:!0,duration:5e3})}))}},220:function(e,t,r){"use strict";r(32);var n=r(334);window.Pusher=r(531),t.a=function(e,t){e.app;var r=e.$axios;t("echo",(function(e){return new n.a({broadcaster:"pusher",key:e.key,wsHost:e.host,wsPort:e.port,forceTLS:!1,disableStats:!0,authorizer:function(e,t){return{authorize:function(t,n){r.$post("/api/broadcasting/auth",{socket_id:t,channel_name:e.name}).then((function(e){return n(!1,e)})).catch((function(e){return n(!0,e)}))}}}})}))}},337:function(e,t,r){"use strict";r(32),r(39),r(31),r(38),r(14),r(51),r(30),r(52);var n=r(6),o=r(19),c=(r(59),r(69));function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var d={middleware:["auth"],computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(c.b)(["navigationList"])),data:function(){return{collapse:!0,showProfile:!1}},methods:{goBack:function(){window.history.back()},handleCommand:function(e){var t=this;"logout"===e&&this.$confirm("Anda yakin ingin keluar?","Konfirmasi",{type:"warning"}).then((function(){return t.$auth.logout().then(t.$router.push("/login"))})),"profile"===e&&(this.showProfile=!0)}},created:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("getNavigationList");case 2:return t.next=4,e.$store.dispatch("getSetting");case 4:return t.next=6,e.$store.dispatch("getGateInList");case 6:return t.next=8,e.$store.dispatch("getJenisKendaraanList");case 8:case"end":return t.stop()}}),t)})))()}},f=d,m=r(46),component=Object(m.a)(f,(function(){var e=this,t=e._self._c;return t("el-container",[t("el-aside",{attrs:{width:"auto"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:!e.collapse,expression:"!collapse"}],staticClass:"brand-box"},[t("img",{staticStyle:{height:"60px",width:"60px",margin:"25px 0 10px 0","border-radius":"5px"},attrs:{src:"/images/logo.jpeg",alt:""}}),e._v(" "),t("div",[t("strong",[e._v(e._s(e.$auth.user.name))]),e._v(" "),t("br"),e._v(" "),t("small",[e._v(e._s(e.$auth.user.role?"Admin":"Operator"))])])]),e._v(" "),t("el-menu",{staticClass:"sidebar",attrs:{router:"",collapse:e.collapse,"default-active":e.$route.path,"background-color":"#060446","text-color":"#fff","active-text-color":"#cc0000"}},e._l(e.navigationList,(function(r,i){return t("el-menu-item",{key:i,attrs:{index:r.path}},[t("i",{class:r.icon}),e._v(" "),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(r.label))])])})),1)],1),e._v(" "),t("el-container",[t("el-header",[t("el-row",[t("el-col",{attrs:{span:12}},[t("el-button",{staticClass:"btn-big text-white",attrs:{type:"text",icon:e.collapse?"el-icon-s-unfold":"el-icon-s-fold"},on:{click:function(t){t.preventDefault(),e.collapse=!e.collapse}}}),e._v(" "),t("span",{staticClass:"brand"},[e._v("MITRATEKNIK PARKING SYSTEM")])],1),e._v(" "),t("el-col",{staticClass:"text-right",attrs:{span:12}},[t("el-dropdown",{on:{command:e.handleCommand}},[t("span",{staticClass:"el-dropdown-link text-white",staticStyle:{cursor:"pointer"}},[e._v("Selamat Datang,\n                "+e._s(e.$auth.user.name)+"!")]),e._v(" "),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{icon:"el-icon-user",command:"profile"}},[e._v("\n                  Profil Saya\n                ")]),e._v(" "),t("el-dropdown-item",{attrs:{icon:"el-icon-arrow-right",command:"logout"}},[e._v("\n                  Keluar\n                ")])],1)],1)],1)],1)],1),e._v(" "),t("el-main",{staticStyle:{padding:"20px",height:"calc(100vh - 60px)",overflow:"auto"}},[t("router-view",{on:{back:e.goBack}}),e._v(" "),t("Profile",{attrs:{show:e.showProfile},on:{close:function(t){e.showProfile=!1}}})],1)],1)],1)}),[],!1,null,null,null);t.a=component.exports;installComponents(component,{Profile:r(533).default})},338:function(e,t,r){"use strict";var n={},o=r(46),component=Object(o.a)(n,(function(){return(0,this._self._c)("Nuxt")}),[],!1,null,null,null);t.a=component.exports},341:function(e,t,r){r(342),r(343),e.exports=r(346)},404:function(e,t,r){var content=r(405);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(125).default)("736177bc",content,!0,{sourceMap:!1})},405:function(e,t,r){var n=r(124)((function(i){return i[1]}));n.push([e.i,"body,html{font-family:Arial,Helvetica,sans-serif;margin:0;padding:0}.el-icon-more{transform:rotate(90deg);-webkit-transform:rotate(90deg);-moz-transform:rotate(90deg);-ms-transform:rotate(90deg);-o-transform:rotate(90deg)}.el-table{border-top:1px solid #eee;width:100%}.no-padding-dialog>.el-dialog__body{padding:0}.pointer{cursor:pointer}.text-right{text-align:right}.text-center{text-align:center}.text-white,.text-white:active,.text-white:focus,.text-white:hover{color:#fff!important}.bg-blue{background-color:blue!important}.bg-indigo{background-color:indigo!important}.bg-purple{background-color:purple!important}.bg-pink{background-color:pink!important}.bg-red{background-color:red!important}.bg-orange{background-color:orange!important}.bg-yellow{background-color:#ff0!important}.bg-green{background-color:green!important}.bg-teal{background-color:teal!important}.bg-cyan{background-color:cyan!important}.el-table th,.el-table thead.is-group th{padding:4px 0}.text-danger,.text-red{color:red}.text-green,.text-success{color:green}table{border-collapse:separate;border-spacing:0}.table{border-top:2px solid #ddd;width:100%}.table td,.table th{border-bottom:1px solid #ddd;padding:10px}.el-table .inactive-row{background:#ffeff0}.el-dialog__body,.el-table .cell{word-break:normal}.brand{font-size:22px;margin-left:20px}.brand-box{background-color:#060446;color:#fff;height:150px;text-align:center}.btn-big{font-size:22px}.el-header{background-color:#254ec1;color:#fff;line-height:60px}.sidebar{background-color:#060446;border-color:#060446;height:calc(100vh - 150px);overflow:auto}.sidebar:not(.el-menu--collapse){width:200px}.el-aside{background-color:#060446;height:100vh}.el-main{background-color:#efefef}.flex{display:flex}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.ml-3{margin-left:15px}.mr-2{margin-right:10px}.mt-0{margin-top:0}.mb-0{margin-bottom:0}.mb-1{margin-bottom:5px}.mb-2{margin-bottom:10px}.mb-3{margin-bottom:15px}.ml-5{margin-left:25px}.p-2{padding:10px}.p-3{padding:15px}.text-lg{font-size:large}.text-2xl,.text-xl{font-size:2em}.text-5xl{font-size:2.5em}.text-purple-700{color:purple}.text-blue-700{color:blue}.text-orange-700{color:orange}.border{border:1px solid #ddd}.bg-orange-600{background-color:orange}.bg-red-300,.bg-red-700{background-color:red}.bg-green-300{background-color:green}.bg-purple-600{background-color:purple}.bg-blue-600{background-color:blue}.bg-blue-700{background-color:#254ec1}.bg-green-600{background-color:green}.bg-gray-200{background-color:#ccc}.rounded-md{border-radius:4px}.min-w-full{min-width:100%}.border-b{border-bottom:1px solid #ddd}.px-3,.px-4{padding-left:15px;padding-right:15px}.py-1{padding-bottom:5px;padding-top:5px}.mx-auto{margin:0 auto}.justify-content-center{justify-content:center}.align-items-center{align-items:center}",""]),n.locals={},e.exports=n},406:function(e,t,r){"use strict";r.r(t),r.d(t,"state",(function(){return l})),r.d(t,"mutations",(function(){return d})),r.d(t,"actions",(function(){return f}));var n=r(6),o=r(121),c=(r(59),r(14),r(276),r(41),r(279),r(280),r(281),r(282),r(283),r(284),r(285),r(286),r(287),r(288),r(289),r(290),r(291),r(292),r(293),r(294),r(42),r(53),r(98)),l=function(){return{jenisKendaraanList:[],groupJenisKendaraanList:[],groupMemberList:[],memberList:[],navigationList:[],gateInList:[],gateOutList:[],kameraList:[],posList:[],printerList:[],shiftList:[],areaParkirList:[],setting:{},pos:null,siklus:[{value:"days",label:"hari"},{value:"weeks",label:"minggu"},{value:"months",label:"bulan"},{value:"years",label:"tahun"}]}},d={setJenisKendaraanList:function(e,data){e.jenisKendaraanList=data,e.groupJenisKendaraanList=Object(o.a)(new Set(data.map((function(e){return e.group}))))},setGateInList:function(e,data){e.gateInList=data},setGateOutList:function(e,data){e.gateOutList=data},setKameraList:function(e,data){e.kameraList=data},setPosList:function(e,data){e.posList=data},setAreaParkirList:function(e,data){e.areaParkirList=data},setPrinterList:function(e,data){e.printerList=data},setShiftList:function(e,data){e.shiftList=data},setGroupMemberList:function(e,data){e.groupMemberList=data},setMemberList:function(e,data){e.memberList=data},setNavigationList:function(e,data){e.navigationList=data},setSetting:function(e,data){e.setting=data},setPos:function(e,data){e.pos=data}},f={getJenisKendaraanList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/jenisKendaraan");case 3:data=r.sent,n("setJenisKendaraanList",data);case 5:case"end":return r.stop()}}),r)})))()},getGateInList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/gateIn");case 3:data=r.sent,n("setGateInList",data);case 5:case"end":return r.stop()}}),r)})))()},getGateOutList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/gateOut");case 3:data=r.sent,n("setGateOutList",data);case 5:case"end":return r.stop()}}),r)})))()},getKameraList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/kamera");case 3:data=r.sent,n("setKameraList",data);case 5:case"end":return r.stop()}}),r)})))()},getPosList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/pos");case 3:data=r.sent,n("setPosList",data);case 5:case"end":return r.stop()}}),r)})))()},getAreaParkirList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/areaParkir");case 3:data=r.sent,n("setAreaParkirList",data);case 5:case"end":return r.stop()}}),r)})))()},getPrinterList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/printer");case 3:data=r.sent,n("setPrinterList",data);case 5:case"end":return r.stop()}}),r)})))()},getShiftList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/shift");case 3:data=r.sent,n("setShiftList",data);case 5:case"end":return r.stop()}}),r)})))()},getGroupMemberList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/groupMember");case 3:data=r.sent,n("setGroupMemberList",data);case 5:case"end":return r.stop()}}),r)})))()},getMemberList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,o={columns:"id, nama, nomor_kartu, berbayar"},r.next=4,t.$axios.$get("/api/member",{params:o});case 4:data=r.sent,n("setMemberList",data);case 6:case"end":return r.stop()}}),r)})))()},getNavigationList:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.next=3,t.$axios.$get("/api/getNavigation");case 3:data=r.sent,n("setNavigationList",data);case 5:case"end":return r.stop()}}),r)})))()},getSetting:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.prev=1,r.next=4,t.$axios.$get("/api/setting");case 4:data=r.sent,n("setSetting",data),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),Object(c.Message)({message:"BELUM ADA SETTING",type:"error",showClose:!0,duration:1e4});case 11:case"end":return r.stop()}}),r,null,[[1,8]])})))()},getPos:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.commit,r.prev=1,r.next=4,t.$axios.$get("/api/getPosByIp");case 4:data=r.sent,n("setPos",data),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),n("setPos",null);case 11:case"end":return r.stop()}}),r,null,[[1,8]])})))()}}},530:function(e,t){function r(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}r.keys=function(){return[]},r.resolve=r,e.exports=r,r.id=530},533:function(e,t,r){"use strict";r.r(t);r(32),r(39),r(31),r(38),r(51),r(30),r(52);var n=r(19);r(14);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l={props:["show"],data:function(){return{formModel:c({},this.$auth.user),loading:!1,formErrors:{}}},methods:{save:function(){var e=this;this.loading=!0,this.$axios.$put("/api/user/".concat(this.formModel.id),this.formModel).then((function(t){e.$message({message:"Data berhasil diupdate",type:"success",showClose:!0}),e.$store.state.user=t})).catch((function(t){422==t.response.status?e.formErrors=t.response.data.errors:e.formErrors={}})).finally((function(){e.loading=!1}))}}},d=r(46),component=Object(d.a)(l,(function(){var e=this,t=e._self._c;return t("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"PROFIL SAYA",visible:e.show,"show-close":!1}},[t("el-form",{attrs:{"label-width":"180px","label-position":"left"}},[t("el-form-item",{class:e.formErrors.name?"is-error":"",attrs:{label:"Nama"}},[t("el-input",{attrs:{placeholder:"Nama"},model:{value:e.formModel.name,callback:function(t){e.$set(e.formModel,"name",t)},expression:"formModel.name"}}),e._v(" "),e.formErrors.name?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.name[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{attrs:{label:"Level"}},[t("el-input",{attrs:{disabled:"",value:e.formModel.role?"Admin":"Operator"}})],1),e._v(" "),t("el-form-item",{class:e.formErrors.password?"is-error":"",attrs:{label:"Password"}},[t("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:e.formModel.password,callback:function(t){e.$set(e.formModel,"password",t)},expression:"formModel.password"}}),e._v(" "),e.formErrors.password?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.password[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.password?"is-error":"",attrs:{label:"Konfirmasi Password"}},[t("el-input",{attrs:{type:"password",placeholder:"Konfirmasi Password"},model:{value:e.formModel.password_confirmation,callback:function(t){e.$set(e.formModel,"password_confirmation",t)},expression:"formModel.password_confirmation"}})],1)],1),e._v(" "),t("span",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(t){return e.$emit("close")}}},[e._v("TUTUP")]),e._v(" "),t("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:e.save}},[e._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);t.default=component.exports}},[[341,43,3,44]]]);