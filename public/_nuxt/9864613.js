(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{395:function(e,r,t){"use strict";t.r(r);t(38),t(28),t(37),t(48),t(27),t(49);var o=t(14),l=(t(10),t(42));function n(object,e){var r=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),r.push.apply(r,t)}return r}var m={props:["show","model"],computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?n(Object(source),!0).forEach((function(r){Object(o.a)(e,r,source[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):n(Object(source)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(source,r))}))}return e}({formModel:function(){return this.model}},Object(l.b)(["kameraList","posList","jenisKendaraanList"])),data:function(){return{formErrors:{},loading:!1}},methods:{store:function(){var e=this;this.loading=!0,axios.post("/gateOut",this.formModel).then((function(r){e.$emit("close"),e.$emit("reload"),e.$message({message:r.data.message,type:"success"})})).catch((function(r){422==r.response.status&&(e.formErrors=r.response.data.errors),e.$message({message:r.response.data.message,type:"error"})})).finally((function(){e.loading=!1}))},update:function(){var e=this;this.loading=!0,axios.put("/gateOut/".concat(this.formModel.id),this.formModel).then((function(r){e.$emit("close"),e.$emit("reload"),e.$message({message:r.data.message,type:"success"})})).catch((function(r){422==r.response.status&&(e.formErrors=r.response.data.errors),e.$message({message:r.response.data.message,type:"error"})})).finally((function(){e.loading=!1}))},closeForm:function(){this.formErrors={},this.$emit("close")}}},c=t(36),component=Object(c.a)(m,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"GATE KELUAR","close-on-click-modal":!1,visible:e.show,"before-close":function(r){e.closeForm(),r()}},on:{"update:visible":function(r){e.show=r}}},[t("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[t("el-form-item",{class:e.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[t("el-input",{attrs:{placeholder:"Nama"},model:{value:e.formModel.nama,callback:function(r){e.$set(e.formModel,"nama",r)},expression:"formModel.nama"}}),e._v(" "),e.formErrors.nama?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.nama[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.shortcut_key?"is-error":"",attrs:{label:"Shortcut Key"}},[t("el-input",{attrs:{placeholder:"Shortcut Key"},model:{value:e.formModel.shortcut_key,callback:function(r){e.$set(e.formModel,"shortcut_key",r)},expression:"formModel.shortcut_key"}}),e._v(" "),e.formErrors.shortcut_key?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.shortcut_key[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.jenis_kendaraan?"is-error":"",attrs:{label:"Jenis Kendaraan"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Jenis Kendaraan",multiple:""},model:{value:e.formModel.jenis_kendaraan,callback:function(r){e.$set(e.formModel,"jenis_kendaraan",r)},expression:"formModel.jenis_kendaraan"}},e._l(e.jenisKendaraanList,(function(e){return t("el-option",{key:e.id,attrs:{value:e.nama,label:e.nama}})})),1),e._v(" "),e.formErrors.jenis_kendaraan?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.jenis_kendaraan[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.device?"is-error":"",attrs:{label:"Controller"}},[t("div",{staticClass:"flex"},[t("el-input",{staticClass:"mr-2",attrs:{placeholder:"Device"},model:{value:e.formModel.device,callback:function(r){e.$set(e.formModel,"device",r)},expression:"formModel.device"}}),e._v(" "),t("el-input",{attrs:{type:"number",placeholder:"Baudrate"},model:{value:e.formModel.baudrate,callback:function(r){e.$set(e.formModel,"baudrate",r)},expression:"formModel.baudrate"}})],1),e._v(" "),e.formErrors.device?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.device[0])+"\n\t\t\t")]):e._e(),e._v(" "),e.formErrors.baudrate?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.baudrate[0])+"\n\t\t\t")]):e._e()]),e._v(" "),t("el-form-item",{attrs:{label:"Running Text"}},[t("div",{staticClass:"flex"},[t("el-input",{staticClass:"mr-2",attrs:{placeholder:"Device"},model:{value:e.formModel.running_text_device,callback:function(r){e.$set(e.formModel,"running_text_device",r)},expression:"formModel.running_text_device"}}),e._v(" "),t("el-input",{attrs:{type:"number",placeholder:"Baudrate"},model:{value:e.formModel.running_text_baudrate,callback:function(r){e.$set(e.formModel,"running_text_baudrate",r)},expression:"formModel.running_text_baudrate"}})],1)]),e._v(" "),t("el-form-item",{class:e.formErrors.open_command?"is-error":"",attrs:{label:"Perintah Buka"}},[t("el-input",{attrs:{placeholder:"Perintah Buka"},model:{value:e.formModel.open_command,callback:function(r){e.$set(e.formModel,"open_command",r)},expression:"formModel.open_command"}}),e._v(" "),e.formErrors.open_command?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.open_command[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.close_command?"is-error":"",attrs:{label:"Perintah Tutup"}},[t("el-input",{attrs:{placeholder:"Perintah Tutup"},model:{value:e.formModel.close_command,callback:function(r){e.$set(e.formModel,"close_command",r)},expression:"formModel.close_command"}}),e._v(" "),e.formErrors.close_command?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.close_command[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.pos_id?"is-error":"",attrs:{label:"Pos"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Pos"},model:{value:e.formModel.pos_id,callback:function(r){e.$set(e.formModel,"pos_id",r)},expression:"formModel.pos_id"}},e._l(e.posList,(function(e){return t("el-option",{key:e.id,attrs:{value:e.id,label:e.nama}})})),1),e._v(" "),e.formErrors.pos_id?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.pos_id[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.kamera?"is-error":"",attrs:{label:"Kamera"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Kamera",multiple:""},model:{value:e.formModel.kamera,callback:function(r){e.$set(e.formModel,"kamera",r)},expression:"formModel.kamera"}},e._l(e.kameraList,(function(e){return t("el-option",{key:e.id,attrs:{value:e.id,label:e.nama}})})),1),e._v(" "),e.formErrors.kamera?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.kamera[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),t("el-form-item",{class:e.formErrors.status?"is-error":"",attrs:{label:"Status"}},[t("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Status"},model:{value:e.formModel.status,callback:function(r){e.$set(e.formModel,"status",r)},expression:"formModel.status"}},e._l(["Tidak Aktif","Aktif"],(function(e,i){return t("el-option",{key:i,attrs:{value:i,label:e}})})),1),e._v(" "),e.formErrors.status?t("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.status[0])+"\n\t\t\t")]):e._e()],1)],1),e._v(" "),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"info",icon:"el-icon-error"},on:{click:e.closeForm}},[e._v("BATAL")]),e._v(" "),t("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:function(r){e.formModel.id?e.update():e.store()}}},[e._v("SIMPAN")])],1)],1)}),[],!1,null,null,null);r.default=component.exports}}]);