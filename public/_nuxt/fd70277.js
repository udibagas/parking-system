(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{393:function(e,t,r){var content=r(405);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(86).default)("d1c0a818",content,!0,{sourceMap:!1})},404:function(e,t,r){"use strict";r(393)},405:function(e,t,r){var o=r(85)(!1);o.push([e.i,".my-input[data-v-0116302b]{border:2px solid #160047;height:45px;line-height:45px;font-size:30px;display:block;width:100%;padding:0 15px;box-sizing:border-box}.my-input-time[data-v-0116302b]:focus,.my-input[data-v-0116302b]:focus{background:#fff67a}.label-big[data-v-0116302b]{box-sizing:border-box;background-color:#160047;color:#fff;padding-left:15px;font-size:20px;height:45px;line-height:45px}.tarif-input[data-v-0116302b]{background:#c71818;color:#fff}.my-big-btn[data-v-0116302b]{box-sizing:border-box;width:100%;border:none;font-size:20px;height:45px;line-height:45px;background-color:#254ec1;color:#fff;border-radius:4px;margin-top:10px}.my-big-btn[data-v-0116302b]:focus{background:#c71818}.label[data-v-0116302b]{box-sizing:border-box;background-color:#160047;color:#fff;padding:10px}.label[data-v-0116302b],.text-center[data-v-0116302b]{text-align:center}",""]),e.exports=o},414:function(e,t,r){"use strict";r.r(t);r(39),r(25),r(37),r(53),r(30),r(54);var o=r(3),n=r(16),l=(r(40),r(247),r(36),r(8),r(173),r(91),r(50));function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var m={data:function(){return{formModel:{},formErrors:{},location:{},snapshot_url:null,ws:null}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(l.b)(["setting","pos","vehicleTypeList"])),methods:{toDriveThruField:function(){document.getElementById("drive-thru").focus()},setFare:function(){var e=this;if(this.formModel.is_member||this.formModel.drive_thru)this.formModel.fare=0;else{var t=this.vehicleTypeList.find((function(t){return t.name==e.formModel.vehicle_type}));t&&(this.formModel.fare=t.tarif_flat)}this.$forceUpdate(),document.getElementById("submit-button").focus()},checkCard:function(){var e=this;if(10!=this.formModel.card_number.length)return this.formModel.plate_number=this.formModel.card_number,void document.getElementById("vehicle-type").focus();var t={card_number:this.formModel.card_number};this.$axios.$get("/api/parkingMember/search",{params:t}).then((function(t){if(e.formModel.is_member=!0,t.expired)return e.$alert("Kartu telah habis masa berlaku","Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),void(e.formModel.is_member=0);!t.expired&&t.expired_in<=5&&e.$alert("Kartu akan habis masa berlaku dalam "+t.expired_in+" hari","Perhatian",{type:"warning",center:!0,roundButton:!0,confirmButtonText:"OK",confirmButtonClass:"bg-red"}),e.formModel.plate_number=t.vehicles[0].plate_number,e.formModel.vehicle_type=t.vehicles[0].vehicle_type,e.setting.member_auto_open&&(e.formModel.drive_thru=0,e.submit())})).catch((function(t){e.$message({message:t.response.data.message,type:"error",showClose:!0})})).finally((function(){document.getElementById("vehicle-type").focus()}))},resetForm:function(){this.formModel.plate_number=this.setting.default_plate_number,this.formModel.card_number="",this.formModel.vehicle_type="",this.formModel.fare="",this.formModel.drive_thru="",this.snapshot_url=null,this.$forceUpdate(),document.getElementById("card-number").focus()},submit:function(){var e=this;if(this.formModel.plate_number&&this.formModel.vehicle_type){var t={plate_number:this.formModel.plate_number};this.$axios.$get("/api/parkingMember/search",{params:t}).then((function(t){e.formModel.fare=0,e.formModel.is_member=1,e.formModel.parking_member_id=t.id})).catch((function(t){e.formModel.is_member=0,e.formModel.parking_member_id=null})).finally((function(){e.$axios.$post("/api/parkingTransaction",e.formModel).then((function(t){e.formModel.drive_thru&&e.formModel.is_member||(e.formModel.time_in=e.$moment(t.time_in).format("DD-MMM-YYYY HH:mm"),e.printTicket(t.id)),e.takeSnapshot(t.id),e.openGate()})).catch((function(t){e.$message({message:"DATA GAGAL DISIMPAN",type:"error",showClose:!0})}))}))}},takeSnapshot:function(e){var t=this;this.$axios.$post("/api/takeSnapshot/".concat(e)).then((function(e){return t.snapshot_url=e.snapshot_url})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0})}))},connectPos:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("getSetting");case 2:return t.next=4,e.$store.dispatch("getPos");case 4:e.ws=new WebSocket("ws://".concat(e.pos.ip_address,":5678/")),e.ws.onerror=function(t){e.$message({message:"KONEKSI KE POS GAGAL",type:"error"})},e.ws.onopen=function(e){console.log("POS TEKNONEKSI")},e.ws.onmessage=function(t){var data=JSON.parse(t.data);e.$message({message:data.message,type:data.status?"success":"error"})};case 8:case"end":return t.stop()}}),t)})))()},openGate:function(){var p=this.pos;this.ws.send(["open",p.gate_device_name,p.gate_device_baudrate,p.gate_command_open,p.gate_command_close].join(";")),setTimeout(this.resetForm,3e3)},printTicket:function(){var p=this.pos,s=this.setting,e=this.formModel;this.ws.send(["print_ticket",p.printer_device,s.location_name,s.location_address,e.fare,e.plate_number,e.vehicle_type,p.name,e.time_in,this.$auth.user.name,s.additional_info_ticket].join(";"))},printReport:function(){var e=this,t={date:this.$moment().format("YYYY-MM-DD")};this.$axios.$post("/api/printReport",t).then((function(t){e.$message({message:"SILAKAN AMBIL STRUK",type:"success",showClose:!0})})).catch((function(t){e.$message({message:t.response.data.message,type:"error",showClose:!0})}))}},mounted:function(){var e=this;this.connectPos(),this.formModel.plate_number=this.setting.default_plate_number,this.$forceUpdate(),document.getElementById("card-number").focus(),document.getElementById("gate-in-app").onkeypress=function(t){"/"==t.key&&(t.preventDefault(),e.formModel.card_number="",e.$forceUpdate(),document.getElementById("card-number").focus()),"-"==t.key&&(t.preventDefault(),e.resetForm(),e.$forceUpdate(),document.getElementById("plate-number").focus()),"*"==t.key&&(t.preventDefault(),e.formModel.vehicle_type="",e.formModel.fare="",document.getElementById("vehicle-type").focus()),"+"==t.key&&(t.preventDefault(),e.formModel.drive_thru="",document.getElementById("drive-thru").focus()),"F10"==t.key&&(t.preventDefault(),e.printReport())}},destroyed:function(){this.ws.close()}},d=(r(404),r(23)),component=Object(d.a)(m,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-card",{attrs:{id:"gate-in-app"}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[r("el-col",{attrs:{span:10}},[r("div",{staticClass:"label-big"},[e._v("[/] NO. KARTU/PLAT")])]),e._v(" "),r("el-col",{attrs:{span:14}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.card_number,expression:"formModel.card_number"}],staticClass:"my-input",attrs:{id:"card-number",autocomplete:"off",type:"text",placeholder:"NO. KARTU/PLAT"},domProps:{value:e.formModel.card_number},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.checkCard.apply(null,arguments)},input:function(t){t.target.composing||e.$set(e.formModel,"card_number",t.target.value)}}})])],1),e._v(" "),r("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[r("el-col",{attrs:{span:10}},[r("div",{staticClass:"label-big"},[e._v("[*] JENIS KENDARAAN")])]),e._v(" "),r("el-col",{attrs:{span:14}},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.formModel.vehicle_type,expression:"formModel.vehicle_type"}],staticClass:"my-input",attrs:{placeholder:"JENIS KENDARAAN",id:"vehicle-type"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.formModel,"vehicle_type",t.target.multiple?r:r[0])},e.toDriveThruField]}},e._l(e.vehicleTypeList,(function(g){return r("option",{key:g.id,domProps:{value:g.name}},[e._v("\n\t\t\t\t\t\t\t\t"+e._s(g.shortcut_key)+" - "+e._s(g.name)+"\n\t\t\t\t\t\t\t")])})),0)])],1),e._v(" "),r("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[r("el-col",{attrs:{span:10}},[r("div",{staticClass:"label-big"},[e._v("[+] DRIVE THRU")])]),e._v(" "),r("el-col",{attrs:{span:14}},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.formModel.drive_thru,expression:"formModel.drive_thru"}],staticClass:"my-input",attrs:{placeholder:"DRIVE THRU",id:"drive-thru"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.formModel,"drive_thru",t.target.multiple?r:r[0])},e.setFare]}},[r("option",{domProps:{value:0}},[e._v("0 - TIDAK")]),e._v(" "),r("option",{domProps:{value:1}},[e._v("1 - YA")])])])],1),e._v(" "),r("el-row",{staticStyle:{"margin-bottom":"10px"},attrs:{gutter:10}},[r("el-col",{attrs:{span:10}},[r("div",{staticClass:"label-big"},[e._v("TARIF")])]),e._v(" "),r("el-col",{attrs:{span:14}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.formModel.fare,expression:"formModel.fare"}],staticClass:"my-input tarif-input",attrs:{disabled:""},domProps:{value:e.formModel.fare},on:{input:function(t){t.target.composing||e.$set(e.formModel,"fare",t.target.value)}}})])],1),e._v(" "),r("button",{staticClass:"my-big-btn",attrs:{id:"submit-button"},on:{click:e.submit}},[e._v("\n\t\t\t\t\t[ENTER] PRINT TIKET & BUKA GATE\n\t\t\t\t")]),e._v(" "),r("br"),e._v(" "),r("button",{staticClass:"my-big-btn",on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.printReport.apply(null,arguments)},click:e.printReport}},[e._v("\n\t\t\t\t\t[F10] PRINT LAPORAN\n\t\t\t\t")])],1),e._v(" "),r("el-col",{attrs:{span:12}},[r("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.snapshot_url,fit:"cover"}},[r("div",{staticClass:"el-image__error",attrs:{slot:"error"},slot:"error"},[r("h1",[e._v("SNAPSHOT")])])])],1)],1)],1)}),[],!1,null,"0116302b",null);t.default=component.exports}}]);