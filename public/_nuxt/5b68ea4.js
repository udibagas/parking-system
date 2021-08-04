(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{393:function(r,e,t){"use strict";t.r(e);t(38),t(28),t(37),t(48),t(27),t(49);var o=t(14),l=(t(10),t(42));function n(object,r){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(object,r).enumerable}))),e.push.apply(e,t)}return e}var c={props:["show","model"],computed:function(r){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(e){Object(o.a)(r,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(source,e))}))}return r}({formModel:function(){return this.model}},Object(l.b)(["kameraList","printerList"])),data:function(){return{formErrors:{},loading:!1}},methods:{store:function(){var r=this;this.loading=!0,axios.post("/gateIn",this.formModel).then((function(e){r.$emit("close"),r.$emit("reload"),r.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(r.formErrors=e.response.data.errors),r.$message({message:e.response.data.message,type:"error"})})).finally((function(){r.loading=!1}))},update:function(){var r=this;this.loading=!0,axios.put("/gateIn/".concat(this.formModel.id),this.formModel).then((function(e){r.$emit("close"),r.$emit("reload"),r.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(r.formErrors=e.response.data.errors),r.$message({message:e.response.data.message,type:"error"})})).finally((function(){r.loading=!1}))},closeForm:function(){this.formErrors={},this.$emit("close")}}},m=t(36),component=Object(m.a)(c,(function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],attrs:{title:"GATE MASUK","close-on-click-modal":!1,visible:r.show,"before-close":function(e){r.closeForm(),e()}},on:{"update:visible":function(e){r.show=e}}},[t("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[t("el-form-item",{class:r.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[t("el-input",{attrs:{placeholder:"Nama"},model:{value:r.formModel.nama,callback:function(e){r.$set(r.formModel,"nama",e)},expression:"formModel.nama"}}),r._v(" "),r.formErrors.nama?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.nama[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.shortcut_key?"is-error":"",attrs:{label:"Shortcut Key"}},[t("el-input",{attrs:{maxlength:"1",placeholder:"Shortcut Key"},model:{value:r.formModel.shortcut_key,callback:function(e){r.$set(r.formModel,"shortcut_key",e)},expression:"formModel.shortcut_key"}}),r._v(" "),r.formErrors.shortcut_key?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.shortcut_key[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.jenis_kendaraan?"is-error":"",attrs:{label:"Jenis Kendaraan"}},[t("el-input",{attrs:{placeholder:"Jenis Kendaraan"},model:{value:r.formModel.jenis_kendaraan,callback:function(e){r.$set(r.formModel,"jenis_kendaraan",e)},expression:"formModel.jenis_kendaraan"}}),r._v(" "),r.formErrors.jenis_kendaraan?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.jenis_kendaraan[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.controller_ip_address?"is-error":"",attrs:{label:"Alamat IP Kontroler"}},[t("el-input",{attrs:{placeholder:"Alamat IP Kontroler"},model:{value:r.formModel.controller_ip_address,callback:function(e){r.$set(r.formModel,"controller_ip_address",e)},expression:"formModel.controller_ip_address"}}),r._v(" "),r.formErrors.controller_ip_address?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.controller_ip_address[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.controller_port?"is-error":"",attrs:{label:"Port Kontroler"}},[t("el-input",{attrs:{type:"number",placeholder:"Port Kontroler"},model:{value:r.formModel.controller_port,callback:function(e){r.$set(r.formModel,"controller_port",e)},expression:"formModel.controller_port"}}),r._v(" "),r.formErrors.controller_port?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.controller_port[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.printer_id?"is-error":"",attrs:{label:"Printer"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Printer"},model:{value:r.formModel.printer_id,callback:function(e){r.$set(r.formModel,"printer_id",e)},expression:"formModel.printer_id"}},r._l(r.printerList,(function(r){return t("el-option",{key:r.id,attrs:{value:r.id,label:r.nama}})})),1),r._v(" "),r.formErrors.printer_id?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.printer_id[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.kamera?"is-error":"",attrs:{label:"Kamera"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Kamera",multiple:""},model:{value:r.formModel.kamera,callback:function(e){r.$set(r.formModel,"kamera",e)},expression:"formModel.kamera"}},r._l(r.kameraList,(function(r){return t("el-option",{key:r.id,attrs:{value:r.id,label:r.nama}})})),1),r._v(" "),r.formErrors.kamera?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.kamera[0])+"\n\t\t\t")]):r._e()],1),r._v(" "),t("el-form-item",{class:r.formErrors.status?"is-error":"",attrs:{label:"Status"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Status"},model:{value:r.formModel.status,callback:function(e){r.$set(r.formModel,"status",e)},expression:"formModel.status"}},r._l(["Tidak Aktif","Aktif"],(function(r,i){return t("el-option",{key:i,attrs:{value:i,label:r}})})),1),r._v(" "),r.formErrors.status?t("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t"+r._s(r.formErrors.status[0])+"\n\t\t\t")]):r._e()],1)],1),r._v(" "),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"info",icon:"el-icon-error"},on:{click:r.closeForm}},[r._v("BATAL")]),r._v(" "),t("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:function(e){r.formModel.id?r.update():r.store()}}},[r._v("SIMPAN")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);