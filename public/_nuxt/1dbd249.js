(window.webpackJsonp=window.webpackJsonp||[]).push([[24,16],{396:function(t,e,r){"use strict";r.r(e);r(10);var n={props:["show","model"],computed:{formModel:function(){return this.model}},data:function(){return{formErrors:{},loading:!1}},methods:{store:function(){var t=this;this.loading=!0,axios.post("/jenisKendaraan",this.formModel).then((function(e){t.$emit("close"),t.$emit("reload"),t.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors),t.$message({message:e.response.data.message,type:"error"})})).finally((function(){t.loading=!1}))},update:function(){var t=this;this.loading=!0,axios.put("/jenisKendaraan/".concat(this.formModel.id),this.formModel).then((function(e){t.$emit("close"),t.$emit("reload"),t.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors),t.$message({message:e.response.data.message,type:"error"})})).finally((function(){t.loading=!1}))},closeForm:function(){this.formErrors={},this.$emit("close")}}},o=r(36),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{width:"650px",visible:t.show,title:t.formModel.id?"EDIT JENIS KENDARAAN":"TAMBAH JENIS KENDARAAN","close-on-click-modal":!1,"before-close":function(e){t.closeForm(),e()}},on:{"update:visible":function(e){t.show=e}}},[r("el-form",{attrs:{"label-width":"180px","label-position":"left"}},[r("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.shortcut_key?"is-error":"",attrs:{label:"Shortcut Key"}},[r("el-input",{attrs:{maxlength:"1",placeholder:"Shortcut Key"},model:{value:t.formModel.shortcut_key,callback:function(e){t.$set(t.formModel,"shortcut_key",e)},expression:"formModel.shortcut_key"}}),t._v(" "),t.formErrors.shortcut_key?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.shortcut_key[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.mode_tarif?"is-error":"",attrs:{label:"Mode Tarif"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"FLAT/PROGRESIF"},model:{value:t.formModel.mode_tarif,callback:function(e){t.$set(t.formModel,"mode_tarif",e)},expression:"formModel.mode_tarif"}},[r("el-option",{attrs:{value:0,label:"FLAT"}}),t._v(" "),r("el-option",{attrs:{value:1,label:"PROGRESIF"}})],1),t._v(" "),t.formErrors.mode_tarif?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.mode_tarif[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.mode_menginap?"is-error":"",attrs:{label:"Mode Inap"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Inap"},model:{value:t.formModel.mode_menginap,callback:function(e){t.$set(t.formModel,"mode_menginap",e)},expression:"formModel.mode_menginap"}},[r("el-option",{attrs:{value:0,label:"24 JAM DARI CHECK IN"}}),t._v(" "),r("el-option",{attrs:{value:1,label:"LEWAT TENGAH MALAM"}})],1),t._v(" "),t.formErrors.mode_menginap?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.mode_menginap[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.tarif_flat?"is-error":"",attrs:{label:"Tarif Flat (Rp)"}},[r("el-input",{attrs:{type:"number",step:500,placeholder:"Tarif Flat (Rp)"},model:{value:t.formModel.tarif_flat,callback:function(e){t.$set(t.formModel,"tarif_flat",e)},expression:"formModel.tarif_flat"}}),t._v(" "),t.formErrors.tarif_flat?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.tarif_flat[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"Tarif Progresif"}},[r("div",[t._v("\n\t\t\t\tTarif\n\t\t\t\t"),r("el-input",{staticStyle:{width:"80px",margin:"0 5px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.menit_pertama,callback:function(e){t.$set(t.formModel,"menit_pertama",e)},expression:"formModel.menit_pertama"}}),t._v("\n\t\t\t\tmenit pertama = Rp.\n\t\t\t\t"),r("el-input",{staticStyle:{width:"111px","margin-left":"23px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_menit_pertama,callback:function(e){t.$set(t.formModel,"tarif_menit_pertama",e)},expression:"formModel.tarif_menit_pertama"}})],1),t._v(" "),r("div",[t._v("\n\t\t\t\tTarif\n\t\t\t\t"),r("el-input",{staticStyle:{width:"80px",margin:"0 5px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.menit_selanjutnya,callback:function(e){t.$set(t.formModel,"menit_selanjutnya",e)},expression:"formModel.menit_selanjutnya"}}),t._v("\n\t\t\t\tmenit selanjutnya = Rp.\n\t\t\t\t"),r("el-input",{staticStyle:{width:"111px","margin-left":"6px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_menit_selanjutnya,callback:function(e){t.$set(t.formModel,"tarif_menit_selanjutnya",e)},expression:"formModel.tarif_menit_selanjutnya"}})],1),t._v(" "),r("div",[t._v("\n\t\t\t\tTarif maksimal per hari = Rp\n\t\t\t\t"),r("el-input",{staticStyle:{width:"205px","margin-left":"10px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_maksimum,callback:function(e){t.$set(t.formModel,"tarif_maksimum",e)},expression:"formModel.tarif_maksimum"}})],1),t._v(" "),r("div",[t._v("\n\t\t\t\tTarif menginap per hari = Rp\n\t\t\t\t"),r("el-input",{staticStyle:{width:"205px","margin-left":"5px"},attrs:{size:"small",type:"number"},model:{value:t.formModel.tarif_menginap,callback:function(e){t.$set(t.formModel,"tarif_menginap",e)},expression:"formModel.tarif_menginap"}})],1)]),t._v(" "),r("el-form-item",{class:t.formErrors.denda_tiket_hilang?"is-error":"",attrs:{label:"Denda Tiket Hilang (Rp)"}},[r("el-input",{attrs:{type:"number",step:500,placeholder:"Denda Tiket Hilang (Rp)"},model:{value:t.formModel.denda_tiket_hilang,callback:function(e){t.$set(t.formModel,"denda_tiket_hilang",e)},expression:"formModel.denda_tiket_hilang"}}),t._v(" "),t.formErrors.denda_tiket_hilang?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.denda_tiket_hilang[0])+"\n\t\t\t")]):t._e()],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error",type:"info"},on:{click:t.closeForm}},[t._v("BATAL")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:function(e){t.formModel.id?t.update():t.store()}}},[t._v("SIMPAN")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},425:function(t,r,n){"use strict";n.r(r);n(10);var o={components:{FormJenisKendaraan:n(396).default},data:function(){return{showForm:!1,tableData:[],loading:!1,selectedData:{}}},methods:{openForm:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.selectedData=data?JSON.parse(JSON.stringify(data)):{},this.showForm=!0},deleteData:function(t){var r=this;this.$confirm("Anda yakin?","Konfirmasi",{type:"warning"}).then((function(){axios.delete("/jenisKendaraan/"+t).then((function(t){r.requestData(),r.$message({message:t.data.message,type:"success"})})).catch((function(t){r.$message({message:t.response.data.message,type:"error"})}))})).catch((function(){return console.log(e)}))},requestData:function(){var t=this;this.loading=!0,axios.get("/jenisKendaraan").then((function(e){t.tableData=e.data})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0})})).finally((function(){return t.loading=!1})),this.$store.commit("getJenisKendaraanList")}},mounted:function(){this.requestData()}},l=n(36),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"text-right mb-3"},[r("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"primary"},on:{click:function(e){return t.openForm()}}},[t._v("TAMBAH JENIS KENDARAAN")])],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData,stripe:"",height:"calc(100vh - 205px)"}},[r("el-table-column",{attrs:{type:"index"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nama",label:"Nama","min-width":"100px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"shortcut_key",label:"Shortcut",align:"center","header-align":"center","min-width":"100px"}}),t._v(" "),r("el-table-column",{attrs:{label:"Mode Tarif",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.mode_tarif?"PROGRESIF":"FLAT")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Mode Inap",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.mode_menginap?"LEWAT TENGAH MALAM":"24 JAM DARI CHECK IN")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"tarif_flat",label:"Tarif Flat",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp "+t._s(t._f("formatNumber")(e.row.tarif_flat))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Tarif Non Flat","min-width":"250px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tTarif "+t._s(e.row.menit_pertama)+" menit pertama = Rp\n\t\t\t\t"+t._s(t._f("formatNumber")(e.row.tarif_menit_pertama))+" "),r("br"),t._v("\n\t\t\t\tTarif "+t._s(e.row.menit_selanjutnya)+" menit selanjutnya = Rp\n\t\t\t\t"+t._s(t._f("formatNumber")(e.row.tarif_menit_selanjutnya))+" "),r("br"),t._v("\n\t\t\t\tTarif maksimal per hari = Rp\n\t\t\t\t"+t._s(t._f("formatNumber")(e.row.tarif_maksimum))+" "),r("br"),t._v("\n\t\t\t\tTarif menginap per hari = Rp\n\t\t\t\t"+t._s(t._f("formatNumber")(e.row.tarif_menginap))+" "),r("br")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"denda_tiket_hilang",label:"Denda Tiket Hilang",align:"center","header-align":"center","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp "+t._s(t._f("formatNumber")(e.row.denda_tiket_hilang))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[r("i",{staticClass:"el-icon-edit-outline"}),t._v(" Edit")]),t._v(" "),r("el-dropdown-item",{nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[r("i",{staticClass:"el-icon-delete"}),t._v(" Hapus")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.requestData}})],1)],2)],1),t._v(" "),r("FormJenisKendaraan",{attrs:{model:t.selectedData,show:t.showForm},on:{close:function(e){t.showForm=!1},reload:t.requestData}})],1)}),[],!1,null,null,null);r.default=component.exports}}]);