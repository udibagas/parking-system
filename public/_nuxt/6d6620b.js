(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{389:function(e,t,o){"use strict";var n=o(4),r=o(86).find,l=o(176),c="find",f=!0;c in[]&&Array(1).find((function(){f=!1})),n({target:"Array",proto:!0,forced:f},{find:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),l(c)},400:function(e,t,o){var content=o(412);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(85).default)("1465119f",content,!0,{sourceMap:!1})},411:function(e,t,o){"use strict";o(400)},412:function(e,t,o){var n=o(84)(!1);n.push([e.i,".my-input[data-v-516fe5a2]{border:2px solid #160047;height:45px;line-height:45px;font-size:30px;display:block;width:100%;padding:0 15px;box-sizing:border-box}.my-input-time[data-v-516fe5a2]:focus,.my-input[data-v-516fe5a2]:focus{background:#fff67a}.label-big[data-v-516fe5a2]{box-sizing:border-box;background-color:#160047;color:#fff;padding-left:15px;font-size:20px;height:45px;line-height:45px}.tarif-input[data-v-516fe5a2]{background:#c71818;color:#fff}.my-big-btn[data-v-516fe5a2]{width:100%;border:none;font-size:20px;height:45px;line-height:45px;background-color:#254ec1;border-radius:4px;margin-top:10px}.label[data-v-516fe5a2],.my-big-btn[data-v-516fe5a2]{box-sizing:border-box;color:#fff}.label[data-v-516fe5a2]{background-color:#160047;padding:10px}.label[data-v-516fe5a2],.text-center[data-v-516fe5a2]{text-align:center}",""]),e.exports=n},422:function(e,t,o){"use strict";o.r(t);o(389),o(46),o(8),o(89),o(30);var n={data:function(){return{formModel:{},formErrors:{},location:{},parkingGateList:[],vehicleTypeList:[]}},methods:{generateBarcodeNumber:function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",i=0;i<5;i++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},setFare:function(){var e=this,t=this.vehicleTypeList.find((function(t){return t.name==e.formModel.vehicle_type}));t&&(this.formModel.fare=this.formModel.is_member?0:t.tarif_flat,this.$forceUpdate()),document.getElementById("plate-number").focus()},resetForm:function(){var e=this.vehicleTypeList.find((function(e){return 1==e.is_default}));this.formModel.plate_number=this.location.default_plate_number,e?(this.formModel.vehicle_type=e.name,this.formModel.fare=e.tarif_flat):(this.formModel.vehicle_type="",this.formModel.fare=""),this.$forceUpdate(),document.getElementById("plate-number").focus()},submit:function(){var e=this;if(this.formModel.gate_in_id&&this.formModel.plate_number&&this.formModel.vehicle_type){var t={plate_number:this.formModel.plate_number};axios.get("/parkingMember/search",{params:t}).then((function(t){e.formModel.fare=0,e.formModel.is_member=1,e.formModel.member_id=t.data.id})).catch((function(t){e.formModel.is_member=0,e.formModel.member_id=null})).finally((function(){e.formModel.barcode_number=e.generateBarcodeNumber(),e.formModel.time_in=e.$moment().format("YYYY-MM-DD HH:mm:ss"),e.formModel.time_out=e.$moment().format("YYYY-MM-DD HH:mm:ss"),axios.post("/parkingTransaction",e.formModel).then((function(t){e.printTicket(t.data.id)})).catch((function(t){e.$message({message:"DATA GAGAL DISIMPAN",type:"error",showClose:!0})}))}))}},printTicket:function(e){var t=this;axios.post("/parkingTransaction/printTicket/"+e,{trx:"IN"}).then((function(e){t.$message({message:e.data.message,type:"success",showClose:!0})})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0})})).finally((function(){setTimeout(t.openGate,3e3)}))},openGate:function(){var e=this;axios.post("/parkingGate/openGate/"+this.formModel.gate_in_id).then((function(t){e.$message({message:t.data.message,type:"success",showClose:!0})})).catch((function(t){e.$message({message:t.response.data.message,type:"error",showClose:!0})})).finally((function(){e.resetForm()}))},getLocationIdentity:function(){var e=this;axios.get("/locationIdentity/search",{params:{active:1}}).then((function(t){e.location=t.data,e.formModel.plate_number=t.data.default_plate_number})).catch((function(t){e.$message({message:"MOHON SET LOKASI",type:"error",showClose:!0})}))},getParkingGateList:function(){var e=this;axios.get("/parkingGate/getList").then((function(t){e.parkingGateList=t.data,0!=t.data.filter((function(g){return"IN"==g.type})).length?e.formModel.gate_in_id=t.data.find((function(g){return"IN"==g.type})).id:e.$message({message:"MOHON SET GATE IN",type:"error",showClose:!0})})).catch((function(t){e.$message({message:"MOHON SET GATE",type:"error",showClose:!0})}))},getVehicleTypeList:function(){var e=this;axios.get("/vehicleType/getList").then((function(t){if(0!=t.data.length){e.vehicleTypeList=t.data;var o=t.data.find((function(e){return 1==e.is_default}));o?(e.formModel.vehicle_type=o.name,e.formModel.fare=o.tarif_flat,e.$forceUpdate()):e.$message({message:"MOHON SET DEFAULT JENIS KENDARAAN",type:"error",showClose:!0})}else e.$message({message:"MOHON SET JENIS KENDARAAN",type:"error",showClose:!0})})).catch((function(t){e.$message({message:"MOHON SET JENIS KENDARAAN",type:"error",showClose:!0})}))}},mounted:function(){var e=this;this.getLocationIdentity(),this.getParkingGateList(),this.getVehicleTypeList(),document.getElementById("plate-number").focus(),document.getElementById("gate-in-app").onkeypress=function(t){"-"==t.key&&(t.preventDefault(),e.resetForm(),e.$forceUpdate(),document.getElementById("plate-number").focus()),"*"==t.key&&(t.preventDefault(),e.formModel.vehicle_type="",e.formModel.fare="",document.getElementById("vehicle-type").focus())}}},r=(o(411),o(22)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticStyle:{padding:"0px 200px"},attrs:{id:"gate-in-app"}},[o("h1",{staticStyle:{"text-align":"center","font-size":"26px"}},[e._v(e._s(e.location.name))]),e._v(" "),o("div",{staticStyle:{"text-align":"center"}},[e._v(e._s(e.location.address))]),e._v(" "),o("el-divider"),e._v(" "),o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[e._v("GATE IN")])]),e._v(" "),o("el-col",{attrs:{span:14}},[o("select",{directives:[{name:"model",rawName:"v-model",value:e.formModel.gate_in_id,expression:"formModel.gate_in_id"}],staticClass:"my-input",attrs:{id:"gate-in"},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.formModel,"gate_in_id",t.target.multiple?o:o[0])}}},e._l(e.parkingGateList.filter((function(g){return"IN"==g.type})),(function(g){return o("option",{key:g.id,domProps:{value:g.id}},[e._v("\n\t\t\t\t\t\t"+e._s(g.name)+"\n\t\t\t\t\t")])})),0)])],1),e._v(" "),o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[e._v("[*] JENIS KENDARAAN")])]),e._v(" "),o("el-col",{attrs:{span:14}},[o("select",{directives:[{name:"model",rawName:"v-model",value:e.formModel.vehicle_type,expression:"formModel.vehicle_type"}],staticClass:"my-input",attrs:{placeholder:"JENIS KENDARAAN",id:"vehicle-type"},on:{change:[function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.formModel,"vehicle_type",t.target.multiple?o:o[0])},e.setFare]}},e._l(e.vehicleTypeList,(function(g){return o("option",{key:g.id,domProps:{value:g.name}},[e._v("\n\t\t\t\t\t\t"+e._s(g.shortcut_key)+" - "+e._s(g.name)+"\n\t\t\t\t\t")])})),0)])],1),e._v(" "),o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[e._v("[-] NO. PLAT")])]),e._v(" "),o("el-col",{attrs:{span:14}},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.plate_number,expression:"formModel.plate_number"}],staticClass:"my-input",attrs:{id:"plate-number",autocomplete:"off",type:"text",placeholder:"NO. PLAT"},domProps:{value:e.formModel.plate_number},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.formModel,"plate_number",t.target.value)}}})])],1),e._v(" "),o("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[o("el-col",{attrs:{span:10}},[o("div",{staticClass:"label-big"},[e._v("TARIF")])]),e._v(" "),o("el-col",{attrs:{span:14}},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.fare,expression:"formModel.fare"}],staticClass:"my-input tarif-input",attrs:{disabled:""},domProps:{value:e.formModel.fare},on:{input:function(t){t.target.composing||e.$set(e.formModel,"fare",t.target.value)}}})])],1),e._v(" "),o("button",{staticClass:"my-big-btn",on:{click:e.submit}},[e._v("\n\t\t\t[ENTER] PRINT TIKET & BUKA GATE\n\t\t")])],1)}),[],!1,null,"516fe5a2",null);t.default=component.exports}}]);