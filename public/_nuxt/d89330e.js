(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{396:function(t,e,r){"use strict";r.r(e);r(10);var o={props:["show","model"],computed:{formModel:function(){return this.model}},data:function(){return{formErrors:{},loading:!1}},methods:{store:function(){var t=this;this.loading=!0,axios.post("/jenisKendaraan",this.formModel).then((function(e){t.$emit("close"),t.$emit("reload"),t.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors),t.$message({message:e.response.data.message,type:"error"})})).finally((function(){t.loading=!1}))},update:function(){var t=this;this.loading=!0,axios.put("/jenisKendaraan/".concat(this.formModel.id),this.formModel).then((function(e){t.$emit("close"),t.$emit("reload"),t.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors),t.$message({message:e.response.data.message,type:"error"})})).finally((function(){t.loading=!1}))},closeForm:function(){this.formErrors={},this.$emit("close")}}},l=r(36),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{width:"650px",visible:t.show,title:t.formModel.id?"EDIT JENIS KENDARAAN":"TAMBAH JENIS KENDARAAN","close-on-click-modal":!1,"before-close":function(e){t.closeForm(),e()}},on:{"update:visible":function(e){t.show=e}}},[r("el-form",{attrs:{"label-width":"180px","label-position":"left"}},[r("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.shortcut_key?"is-error":"",attrs:{label:"Shortcut Key"}},[r("el-input",{attrs:{maxlength:"1",placeholder:"Shortcut Key"},model:{value:t.formModel.shortcut_key,callback:function(e){t.$set(t.formModel,"shortcut_key",e)},expression:"formModel.shortcut_key"}}),t._v(" "),t.formErrors.shortcut_key?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.shortcut_key[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.mode_tarif?"is-error":"",attrs:{label:"Mode Tarif"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"FLAT/PROGRESIF"},model:{value:t.formModel.mode_tarif,callback:function(e){t.$set(t.formModel,"mode_tarif",e)},expression:"formModel.mode_tarif"}},[r("el-option",{attrs:{value:0,label:"FLAT"}}),t._v(" "),r("el-option",{attrs:{value:1,label:"PROGRESIF"}})],1),t._v(" "),t.formErrors.mode_tarif?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.mode_tarif[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.mode_menginap?"is-error":"",attrs:{label:"Mode Inap"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Inap"},model:{value:t.formModel.mode_menginap,callback:function(e){t.$set(t.formModel,"mode_menginap",e)},expression:"formModel.mode_menginap"}},[r("el-option",{attrs:{value:0,label:"24 JAM DARI CHECK IN"}}),t._v(" "),r("el-option",{attrs:{value:1,label:"LEWAT TENGAH MALAM"}})],1),t._v(" "),t.formErrors.mode_menginap?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.mode_menginap[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.tarif_flat?"is-error":"",attrs:{label:"Tarif Flat (Rp)"}},[r("el-input",{attrs:{type:"number",step:500,placeholder:"Tarif Flat (Rp)"},model:{value:t.formModel.tarif_flat,callback:function(e){t.$set(t.formModel,"tarif_flat",e)},expression:"formModel.tarif_flat"}}),t._v(" "),t.formErrors.tarif_flat?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.tarif_flat[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"Tarif Progresif"}},[r("div",[t._v("\n\t\t\t\tTarif\n\t\t\t\t"),r("el-input",{staticStyle:{width:"80px",margin:"0 5px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.menit_pertama,callback:function(e){t.$set(t.formModel,"menit_pertama",e)},expression:"formModel.menit_pertama"}}),t._v("\n\t\t\t\tmenit pertama = Rp.\n\t\t\t\t"),r("el-input",{staticStyle:{width:"111px","margin-left":"23px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_menit_pertama,callback:function(e){t.$set(t.formModel,"tarif_menit_pertama",e)},expression:"formModel.tarif_menit_pertama"}})],1),t._v(" "),r("div",[t._v("\n\t\t\t\tTarif\n\t\t\t\t"),r("el-input",{staticStyle:{width:"80px",margin:"0 5px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.menit_selanjutnya,callback:function(e){t.$set(t.formModel,"menit_selanjutnya",e)},expression:"formModel.menit_selanjutnya"}}),t._v("\n\t\t\t\tmenit selanjutnya = Rp.\n\t\t\t\t"),r("el-input",{staticStyle:{width:"111px","margin-left":"6px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_menit_selanjutnya,callback:function(e){t.$set(t.formModel,"tarif_menit_selanjutnya",e)},expression:"formModel.tarif_menit_selanjutnya"}})],1),t._v(" "),r("div",[t._v("\n\t\t\t\tTarif maksimal per hari = Rp\n\t\t\t\t"),r("el-input",{staticStyle:{width:"205px","margin-left":"10px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_maksimum,callback:function(e){t.$set(t.formModel,"tarif_maksimum",e)},expression:"formModel.tarif_maksimum"}})],1),t._v(" "),r("div",[t._v("\n\t\t\t\tTarif menginap per hari = Rp\n\t\t\t\t"),r("el-input",{staticStyle:{width:"205px","margin-left":"5px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_menginap,callback:function(e){t.$set(t.formModel,"tarif_menginap",e)},expression:"formModel.tarif_menginap"}})],1)]),t._v(" "),r("el-form-item",{class:t.formErrors.denda_tiket_hilang?"is-error":"",attrs:{label:"Denda Tiket Hilang (Rp)"}},[r("el-input",{attrs:{type:"number",step:500,placeholder:"Denda Tiket Hilang (Rp)"},model:{value:t.formModel.denda_tiket_hilang,callback:function(e){t.$set(t.formModel,"denda_tiket_hilang",e)},expression:"formModel.denda_tiket_hilang"}}),t._v(" "),t.formErrors.denda_tiket_hilang?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.denda_tiket_hilang[0])+"\n\t\t\t")]):t._e()],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error",type:"info"},on:{click:t.closeForm}},[t._v("BATAL")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:function(e){t.formModel.id?t.update():t.store()}}},[t._v("SIMPAN")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);