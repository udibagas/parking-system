(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{384:function(t,r,o){"use strict";o(31),o(24),o(30),o(42),o(23),o(43);var n=o(13);o(8),o(69);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=m(m({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=m({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.keyword=t,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=m({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,o=r.from,n=r.to,l=r.total;t.tableData=m(m({},t.tableData),{},{from:o,to:n,total:l})}})).finally((function(){return t.loading=!1}))}},mounted:function(){this.requestData()}}},429:function(t,e,r){"use strict";r.r(e);var o={mixins:[r(384).a],data:function(){return{url:"/api/jenisKendaraan"}},methods:{afterSave:function(){this.$store.dispatch("getJenisKendaraanList")},afterDelete:function(){this.$store.dispatch("getJenisKendaraanList")}}},n=r(22),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"text-right"},[r("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"primary"},on:{click:function(e){return t.openForm()}}},[t._v("TAMBAH JENIS KENDARAAN")])],1),t._v(" "),r("br"),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 300px)"}},[r("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nama",label:"Nama","min-width":"100px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"shortcut_key",label:"Shortcut",align:"center","header-align":"center","min-width":"100px"}}),t._v(" "),r("el-table-column",{attrs:{label:"Mode Tarif",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.mode_tarif?"PROGRESIF":"FLAT")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Mode Inap",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.mode_menginap?"LEWAT TENGAH MALAM":"24 JAM DARI CHECK IN")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"tarif_flat",label:"Tarif Flat",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp "+t._s(t.$decimal(e.row.tarif_flat))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Tarif Non Flat","min-width":"250px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tTarif "+t._s(e.row.menit_pertama)+" menit pertama = Rp\n\t\t\t\t"+t._s(t.$decimal(e.row.tarif_menit_pertama))+" "),r("br"),t._v("\n\t\t\t\tTarif "+t._s(e.row.menit_selanjutnya)+" menit selanjutnya = Rp\n\t\t\t\t"+t._s(t.$decimal(e.row.tarif_menit_selanjutnya))+" "),r("br"),t._v("\n\t\t\t\tTarif maksimal per hari = Rp\n\t\t\t\t"+t._s(t.$decimal(e.row.tarif_maksimum))+" "),r("br"),t._v("\n\t\t\t\tTarif menginap per hari = Rp\n\t\t\t\t"+t._s(t.$decimal(e.row.tarif_menginap))+" "),r("br")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"denda_tiket_hilang",label:"Denda Tiket Hilang",align:"center","header-align":"center","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp "+t._s(t.$decimal(e.row.denda_tiket_hilang))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("\n\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("\n\t\t\t\t\t\t\tHapus\n\t\t\t\t\t\t")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.requestData}})],1)],2)],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{visible:t.showForm,title:"JENIS KENDARAAN","close-on-click-modal":!1,width:"700px"},on:{"update:visible":function(e){t.showForm=e}}},[r("el-form",{attrs:{"label-width":"200px","label-position":"left"}},[r("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.shortcut_key?"is-error":"",attrs:{label:"Shortcut Key"}},[r("el-input",{attrs:{maxlength:"1",placeholder:"Shortcut Key"},model:{value:t.formModel.shortcut_key,callback:function(e){t.$set(t.formModel,"shortcut_key",e)},expression:"formModel.shortcut_key"}}),t._v(" "),t.formErrors.shortcut_key?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.shortcut_key[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.mode_menginap?"is-error":"",attrs:{label:"Mode Inap"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Inap"},model:{value:t.formModel.mode_menginap,callback:function(e){t.$set(t.formModel,"mode_menginap",e)},expression:"formModel.mode_menginap"}},[r("el-option",{attrs:{value:0,label:"24 JAM DARI CHECK IN"}}),t._v(" "),r("el-option",{attrs:{value:1,label:"LEWAT TENGAH MALAM"}})],1),t._v(" "),t.formErrors.mode_menginap?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.mode_menginap[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:{"is-error":t.formErrors.tarif_menginap},attrs:{label:"Tarif menginap per hari (Rp)"}},[r("el-input",{attrs:{type:"number",placeholder:"Tarif menginap per hari (Rp)"},model:{value:t.formModel.tarif_menginap,callback:function(e){t.$set(t.formModel,"tarif_menginap",e)},expression:"formModel.tarif_menginap"}}),t._v(" "),t.formErrors.tarif_menginap?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.tarif_menginap[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.denda_tiket_hilang?"is-error":"",attrs:{label:"Denda Tiket Hilang (Rp)"}},[r("el-input",{attrs:{type:"number",step:500,placeholder:"Denda Tiket Hilang (Rp)"},model:{value:t.formModel.denda_tiket_hilang,callback:function(e){t.$set(t.formModel,"denda_tiket_hilang",e)},expression:"formModel.denda_tiket_hilang"}}),t._v(" "),t.formErrors.denda_tiket_hilang?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.denda_tiket_hilang[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.mode_tarif?"is-error":"",attrs:{label:"Mode Tarif"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"FLAT/PROGRESIF"},model:{value:t.formModel.mode_tarif,callback:function(e){t.$set(t.formModel,"mode_tarif",e)},expression:"formModel.mode_tarif"}},[r("el-option",{attrs:{value:0,label:"FLAT"}}),t._v(" "),r("el-option",{attrs:{value:1,label:"PROGRESIF"}})],1),t._v(" "),t.formErrors.mode_tarif?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.mode_tarif[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:0===t.formModel.mode_tarif,expression:"formModel.mode_tarif === 0"}],class:t.formErrors.tarif_flat?"is-error":"",attrs:{label:"Tarif Flat (Rp)"}},[r("el-input",{attrs:{type:"number",step:500,placeholder:"Tarif Flat (Rp)"},model:{value:t.formModel.tarif_flat,callback:function(e){t.$set(t.formModel,"tarif_flat",e)},expression:"formModel.tarif_flat"}}),t._v(" "),t.formErrors.tarif_flat?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.tarif_flat[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1===t.formModel.mode_tarif,expression:"formModel.mode_tarif === 1"}],class:{"is-error":t.formErrors.tarif_maksimum},attrs:{label:"Tarif maksimal per hari (Rp)"}},[r("el-input",{attrs:{type:"number",placeholder:"Tarif maksimal per hari (Rp)"},model:{value:t.formModel.tarif_maksimum,callback:function(e){t.$set(t.formModel,"tarif_maksimum",e)},expression:"formModel.tarif_maksimum"}}),t._v(" "),t.formErrors.tarif_maksimum?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.tarif_maksimum[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1===t.formModel.mode_tarif,expression:"formModel.mode_tarif === 1"}],attrs:{label:"Tarif Progresif"}},[r("div",{staticClass:"mb-2 flex"},[r("el-input",{staticClass:"mr-2",staticStyle:{width:"250px"},attrs:{type:"number",placeholder:"Menit Pertama"},model:{value:t.formModel.menit_pertama,callback:function(e){t.$set(t.formModel,"menit_pertama",e)},expression:"formModel.menit_pertama"}}),t._v(" "),r("el-input",{attrs:{type:"number",placeholder:"Tarif "+t.formModel.menit_pertama+" menit pertama (Rp)"},model:{value:t.formModel.tarif_menit_pertama,callback:function(e){t.$set(t.formModel,"tarif_menit_pertama",e)},expression:"formModel.tarif_menit_pertama"}})],1),t._v(" "),r("div",{staticClass:"flex"},[r("el-input",{staticClass:"mr-2",staticStyle:{width:"250px"},attrs:{type:"number",placeholder:"Menit Selanjutnya"},model:{value:t.formModel.menit_selanjutnya,callback:function(e){t.$set(t.formModel,"menit_selanjutnya",e)},expression:"formModel.menit_selanjutnya"}}),t._v(" "),r("el-input",{attrs:{type:"number",placeholder:"Tarif "+t.formModel.menit_selanjutnya+" menit selanjutnya (Rp)"},model:{value:t.formModel.tarif_menit_selanjutnya,callback:function(e){t.$set(t.formModel,"tarif_menit_selanjutnya",e)},expression:"formModel.tarif_menit_selanjutnya"}})],1)])],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:t.save}},[t._v("\n\t\t\t\tSIMPAN\n\t\t\t")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);