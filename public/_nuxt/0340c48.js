(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{384:function(t,r,o){"use strict";o(31),o(24),o(30),o(42),o(23),o(43);var n=o(13);o(8),o(69);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:"asc",filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=c(c({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=c({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.keyword=t,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=c({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,o=r.from,n=r.to,l=r.total;t.tableData=c(c({},t.tableData),{},{from:o,to:n,total:l})}})).finally((function(){return t.loading=!1}))}},mounted:function(){this.requestData()}}},435:function(t,e,r){"use strict";r.r(e);r(31),r(24),r(30),r(42),r(23),r(43);var o=r(13),n=r(384),l=r(44);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var d={mixins:[n.a],data:function(){return{url:"/api/pos"}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)(["printerList"])),methods:{afterSave:function(){this.$store.dispatch("getPosList"),this.$store.dispatch("getPos")},afterDelete:function(){this.$store.dispatch("getPosList"),this.$store.dispatch("getPos")}}},f=r(22),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"text-right"},[r("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(e){return t.openForm()}}},[t._v("TAMBAH POS")])],1),t._v(" "),r("br"),t._v(" "),r("el-table",{attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 300px)"}},[r("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"100",label:"Nama",prop:"nama"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"100",label:"IP Address",prop:"ip_address"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"100",label:"Printer",prop:"printer.nama"}}),t._v(" "),r("el-table-column",{attrs:{fixed:"right",width:"60px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-edit"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("\n\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("\n\t\t\t\t\t\t\tHapus\n\t\t\t\t\t\t")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.requestData}})],1)],2)],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{title:"POS","close-on-click-modal":!1,visible:t.showForm},on:{"update:visible":function(e){t.showForm=e}}},[r("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[r("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.ip_address?"is-error":"",attrs:{label:"Alamat IP"}},[r("el-input",{attrs:{placeholder:"Alamat IP"},model:{value:t.formModel.ip_address,callback:function(e){t.$set(t.formModel,"ip_address",e)},expression:"formModel.ip_address"}}),t._v(" "),t.formErrors.ip_address?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.ip_address[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.printer_id?"is-error":"",attrs:{label:"Printer"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Printer"},model:{value:t.formModel.printer_id,callback:function(e){t.$set(t.formModel,"printer_id",e)},expression:"formModel.printer_id"}},t._l(t.printerList,(function(t){return r("el-option",{key:t.id,attrs:{value:t.id,label:t.nama}})})),1),t._v(" "),t.formErrors.printer_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.printer_id[0])+"\n\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("\n\t\t\t\tSIMPAN\n\t\t\t")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);