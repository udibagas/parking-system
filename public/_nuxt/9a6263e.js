(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{543:function(t,e,o){"use strict";var r=o(2),n=o(100).find,l=o(223),f="find",c=!0;f in[]&&Array(1)[f]((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),l(f)},619:function(t,e,o){var content=o(668);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(125).default)("23c4b800",content,!0,{sourceMap:!1})},667:function(t,e,o){"use strict";o(619)},668:function(t,e,o){var r=o(124)((function(i){return i[1]}));r.push([t.i,".my-input[data-v-7bff81ca]{border:2px solid #160047;box-sizing:border-box;display:block;font-size:30px;height:45px;line-height:45px;padding:0 15px;width:100%}.my-input-time[data-v-7bff81ca]:focus,.my-input[data-v-7bff81ca]:focus{background:#fff67a}.label-big[data-v-7bff81ca]{background-color:#160047;box-sizing:border-box;color:#fff;font-size:20px;height:45px;line-height:45px;padding-left:15px}.tarif-input[data-v-7bff81ca]{background:#c71818;color:#fff}.my-big-btn[data-v-7bff81ca]{background-color:#254ec1;border:none;border-radius:4px;font-size:20px;height:45px;line-height:45px;margin-top:10px;width:100%}.label[data-v-7bff81ca],.my-big-btn[data-v-7bff81ca]{box-sizing:border-box;color:#fff}.label[data-v-7bff81ca]{background-color:#160047;padding:10px}.label[data-v-7bff81ca],.text-center[data-v-7bff81ca]{text-align:center}",""]),r.locals={},t.exports=r},686:function(t,e,o){"use strict";o.r(e);o(32),o(53),o(38),o(14),o(543);var r={data:function(){return{formModel:{},formErrors:{},location:{},parkingGateList:[],vehicleTypeList:[]}},methods:{setFare:function(){var t=this,e=this.vehicleTypeList.find((function(e){return e.name==t.formModel.vehicle_type}));e&&(this.formModel.fare=this.formModel.is_member?0:e.tarif_flat,this.$forceUpdate()),document.getElementById("plate-number").focus()},resetForm:function(){var t=this.vehicleTypeList.find((function(t){return 1==t.is_default}));this.formModel.plate_number=this.location.default_plate_number,t?(this.formModel.vehicle_type=t.name,this.formModel.fare=t.tarif_flat):(this.formModel.vehicle_type="",this.formModel.fare=""),this.$forceUpdate(),document.getElementById("plate-number").focus()},submit:function(){var t=this;if(this.formModel.gate_in_id&&this.formModel.plate_number&&this.formModel.vehicle_type){var e={plate_number:this.formModel.plate_number};this.$axios.$get("/parkingMember/search",{params:e}).then((function(e){t.formModel.fare=0,t.formModel.is_member=1,t.formModel.member_id=e.id})).catch((function(e){t.formModel.is_member=0,t.formModel.member_id=null})).finally((function(){t.formModel.time_in=t.$moment().format("YYYY-MM-DD HH:mm:ss"),t.$axios.$post("/parkingTransaction",t.formModel)}))}}},mounted:function(){var t=this;document.getElementById("plate-number").focus(),document.getElementById("gate-in-app").onkeypress=function(e){"-"==e.key&&(e.preventDefault(),t.resetForm(),t.$forceUpdate(),document.getElementById("plate-number").focus()),"*"==e.key&&(e.preventDefault(),t.formModel.vehicle_type="",t.formModel.fare="",document.getElementById("vehicle-type").focus())}}},n=(o(667),o(46)),component=Object(n.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticStyle:{padding:"0px 200px"},attrs:{id:"gate-in-app"}},[e("h1",{staticStyle:{"text-align":"center","font-size":"26px"}},[t._v(t._s(t.location.name))]),t._v(" "),e("div",{staticStyle:{"text-align":"center"}},[t._v(t._s(t.location.address))]),t._v(" "),e("el-divider"),t._v(" "),e("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[e("el-col",{attrs:{span:10}},[e("div",{staticClass:"label-big"},[t._v("GATE IN")])]),t._v(" "),e("el-col",{attrs:{span:14}},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.gate_in_id,expression:"formModel.gate_in_id"}],staticClass:"my-input",attrs:{id:"gate-in"},on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.formModel,"gate_in_id",e.target.multiple?o:o[0])}}},t._l(t.parkingGateList.filter((function(g){return"IN"==g.type})),(function(g){return e("option",{key:g.id,domProps:{value:g.id}},[t._v("\n\t\t\t\t\t\t"+t._s(g.name)+"\n\t\t\t\t\t")])})),0)])],1),t._v(" "),e("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[e("el-col",{attrs:{span:10}},[e("div",{staticClass:"label-big"},[t._v("[*] JENIS KENDARAAN")])]),t._v(" "),e("el-col",{attrs:{span:14}},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.formModel.vehicle_type,expression:"formModel.vehicle_type"}],staticClass:"my-input",attrs:{placeholder:"JENIS KENDARAAN",id:"vehicle-type"},on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.formModel,"vehicle_type",e.target.multiple?o:o[0])},t.setFare]}},t._l(t.vehicleTypeList,(function(g){return e("option",{key:g.id,domProps:{value:g.name}},[t._v("\n\t\t\t\t\t\t"+t._s(g.shortcut_key)+" - "+t._s(g.name)+"\n\t\t\t\t\t")])})),0)])],1),t._v(" "),e("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[e("el-col",{attrs:{span:10}},[e("div",{staticClass:"label-big"},[t._v("[-] NO. PLAT")])]),t._v(" "),e("el-col",{attrs:{span:14}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.plate_number,expression:"formModel.plate_number"}],staticClass:"my-input",attrs:{id:"plate-number",autocomplete:"off",type:"text",placeholder:"NO. PLAT"},domProps:{value:t.formModel.plate_number},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.formModel,"plate_number",e.target.value)}}})])],1),t._v(" "),e("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[e("el-col",{attrs:{span:10}},[e("div",{staticClass:"label-big"},[t._v("TARIF")])]),t._v(" "),e("el-col",{attrs:{span:14}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formModel.fare,expression:"formModel.fare"}],staticClass:"my-input tarif-input",attrs:{disabled:""},domProps:{value:t.formModel.fare},on:{input:function(e){e.target.composing||t.$set(t.formModel,"fare",e.target.value)}}})])],1),t._v(" "),e("button",{staticClass:"my-big-btn",on:{click:t.submit}},[t._v("\n\t\t\t[ENTER] PRINT TIKET & BUKA GATE\n\t\t")])],1)}),[],!1,null,"7bff81ca",null);e.default=component.exports}}]);