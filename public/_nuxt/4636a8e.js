(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{388:function(t,e,r){"use strict";var o=r(4),n=r(82).find,l=r(177),m="find",d=!0;m in[]&&Array(1).find((function(){d=!1})),o({target:"Array",proto:!0,forced:d},{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),l(m)},396:function(t,e,r){"use strict";r.r(e);r(31),r(24),r(30),r(43),r(23),r(44);var o=r(13),n=(r(8),r(388),r(178),r(45));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var m={props:["show","model"],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({formModel:function(){return this.model},durasi:function(){var t=this.$moment(this.formModel.time_in),e=this.$moment(this.formModel.time_out),r=this.$moment.duration(e.diff(t));return this.$moment.utc(r.asMilliseconds()).format("HH:mm:ss")}},Object(n.b)(["posList","gateOutList","gateInList","jenisKendaraanList"])),data:function(){return{formErrors:{},loading:!1}},methods:{closeForm:function(){this.formErrors={},this.$emit("close")},save:function(){var t=this;this.loading=!0,this.formModel.manual=1,this.$axios.$post("/api/parkingTransaction",this.formModel).then((function(e){t.$message({message:"Data berhasil disimpan",type:"success",showClose:!0}),t.closeForm(),t.$emit("reload"),t.openGate(t.formModel.gate_out_id)})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors)})).finally((function(){return t.loading=!1}))},openGate:function(t){var e=this,r=this.posList.find((function(p){return p.id==e.formModel.pos_id})),o=this.gateOutList.find((function(g){return g.id==t})),n=new WebSocket("ws://".concat(r.ip_address,":5678/"));n.onerror=function(t){e.$message({message:"KONEKSI KE POS GAGAL",type:"error"})},n.onopen=function(t){n.send(["open",o.device,o.baudrate,o.open_command,o.close_command].join(";"))},n.onmessage=function(t){var data=JSON.parse(t.data);e.$message({message:data.message,type:data.status?"success":"error"}),n.close()}}}},d=r(22),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.formModel.id?"EDIT TRANSAKSI "+t.formModel.nomor_barcode:"TRANSAKSI MANUAL",visible:t.show,width:"800px","before-close":function(e){return t.closeForm()}},on:{"update:visible":function(e){t.show=e}}},[r("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[r("el-row",{attrs:{gutter:30}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{class:t.formErrors.plat_nomor?"is-error":"",attrs:{label:"Plat Nomor"}},[r("el-input",{attrs:{placeholder:"Plat Nomor"},model:{value:t.formModel.plat_nomor,callback:function(e){t.$set(t.formModel,"plat_nomor",e)},expression:"formModel.plat_nomor"}}),t._v(" "),t.formErrors.plat_nomor?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.plat_nomor[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.gate_in_id?"is-error":"",attrs:{label:"Gate Masuk"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Masuk"},model:{value:t.formModel.gate_in_id,callback:function(e){t.$set(t.formModel,"gate_in_id",e)},expression:"formModel.gate_in_id"}},t._l(t.gateInList,(function(g,i){return r("el-option",{key:i,attrs:{value:g.id,label:g.nama}})})),1),t._v(" "),t.formErrors.gate_in_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.gate_in_id[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.time_in?"is-error":"",attrs:{label:"Waktu Masuk"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",format:"dd-MMM-yyyy HH:mm","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"Waktu Masuk"},model:{value:t.formModel.time_in,callback:function(e){t.$set(t.formModel,"time_in",e)},expression:"formModel.time_in"}}),t._v(" "),t.formErrors.time_in?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.time_in[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.tarif?"is-error":"",attrs:{label:"Tarif (Rp)"}},[r("el-input",{attrs:{type:"number",placeholder:"Tarif"},model:{value:t.formModel.tarif,callback:function(e){t.$set(t.formModel,"tarif",e)},expression:"formModel.tarif"}}),t._v(" "),t.formErrors.tarif?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.tarif[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.username?"is-error":"",attrs:{label:"User Admin"}},[r("el-input",{attrs:{placeholder:"User Admin"},model:{value:t.formModel.username,callback:function(e){t.$set(t.formModel,"username",e)},expression:"formModel.username"}}),t._v(" "),t.formErrors.username?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.username[0])+"\n\t\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("el-col",{attrs:{span:12}},[r("el-form-item",{class:t.formErrors.jenis_kendaraan?"is-error":"",attrs:{label:"Jenis Kendaraan"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Jenis Kendaraan"},model:{value:t.formModel.jenis_kendaraan,callback:function(e){t.$set(t.formModel,"jenis_kendaraan",e)},expression:"formModel.jenis_kendaraan"}},t._l(t.jenisKendaraanList,(function(t,i){return r("el-option",{key:i,attrs:{value:t.nama,label:t.nama}})})),1),t._v(" "),t.formErrors.jenis_kendaraan?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.jenis_kendaraan[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.gate_out_id?"is-error":"",attrs:{label:"Gate Keluar"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Keluar"},model:{value:t.formModel.gate_out_id,callback:function(e){t.$set(t.formModel,"gate_out_id",e)},expression:"formModel.gate_out_id"}},t._l(t.gateOutList,(function(g,i){return r("el-option",{key:i,attrs:{value:g.id,label:g.nama}})})),1),t._v(" "),t.formErrors.gate_out_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.gate_out_id[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.time_out?"is-error":"",attrs:{label:"Waktu Keluar"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",autocomplete:!1,format:"dd-MMM-yyyy HH:mm","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"Waktu Keluar"},model:{value:t.formModel.time_out,callback:function(e){t.$set(t.formModel,"time_out",e)},expression:"formModel.time_out"}}),t._v(" "),t.formErrors.time_out?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.time_out[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.denda?"is-error":"",attrs:{label:"Denda (Rp)"}},[r("el-input",{attrs:{type:"number",placeholder:"Denda"},model:{value:t.formModel.denda,callback:function(e){t.$set(t.formModel,"denda",e)},expression:"formModel.denda"}}),t._v(" "),t.formErrors.denda?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.denda[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Password Admin"}},[r("el-input",{attrs:{type:"password",placeholder:"Password Admin"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t\t\t")]):t._e()],1)],1)],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);