(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{451:function(t,r,o){"use strict";o(33),o(25),o(32),o(44),o(24),o(45);var n=o(17);o(13),o(51);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=c(c({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=c({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.keyword=t,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=c({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,o=r.from,n=r.to,l=r.total;t.tableData=c(c({},t.tableData),{},{from:o,to:n,total:l})}})).finally((function(){return t.loading=!1}))}},mounted:function(){this.requestData()}}},608:function(t,e,r){"use strict";r.r(e);var o={mixins:[r(451).a],data:function(){return{url:"/api/user"}}},n=r(37),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",[r("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[r("div",{staticStyle:{"font-size":"1.2em","line-height":"41px"}},[t._v("KELOLA USER")]),t._v(" "),r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(e){return t.openForm({role:0,password:""})}}},[t._v("TAMBAH USER")])],1),t._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:!0},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1)],1),t._v(" "),r("br"),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{stripe:"",height:"calc(100vh - 255px)",data:t.tableData.data},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),r("el-table-column",{attrs:{prop:"name",label:"Nama",sortable:"custom"}}),t._v(" "),r("el-table-column",{attrs:{prop:"role",label:"Level",sortable:"custom"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.role?"Admin":"Operator")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"status",label:"Status",sortable:"custom",align:"center","header-align":"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tag",{staticStyle:{width:"100%"},attrs:{type:e.row.status?"success":"info",size:"mini",effect:"dark"}},[t._v("\n\t\t\t\t\t"+t._s(e.row.status?"Aktif":"Nonaktif")+"\n\t\t\t\t")])]}}])}),t._v(" "),r("el-table-column",{attrs:{width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("Edit")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("Hapus")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{visible:t.showForm,title:t.formModel.id?"EDIT USER":"TAMBAH USER",width:"500px","close-on-click-modal":!1},on:{"update:visible":function(e){t.showForm=e}}},[r("el-form",{attrs:{"label-width":"160px","label-position":"left"}},[r("el-form-item",{class:t.formErrors.name?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.name,callback:function(e){t.$set(t.formModel,"name",e)},expression:"formModel.name"}}),t._v(" "),t.formErrors.name?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.name[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.role?"is-error":"",attrs:{label:"Level"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Level"},model:{value:t.formModel.role,callback:function(e){t.$set(t.formModel,"role",e)},expression:"formModel.role"}},t._l([{value:0,label:"Operator"},{value:1,label:"Admin"}],(function(t,i){return r("el-option",{key:i,attrs:{value:t.value,label:t.label}})})),1),t._v(" "),t.formErrors.type?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.role[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Konfirmasi Password"}},[r("el-input",{attrs:{type:"password",placeholder:"Konfirmasi Password"},model:{value:t.formModel.password_confirmation,callback:function(e){t.$set(t.formModel,"password_confirmation",e)},expression:"formModel.password_confirmation"}})],1),t._v(" "),r("el-form-item",{class:t.formErrors.status?"is-error":"",attrs:{label:"Status"}},[r("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-color":"#13ce66"},model:{value:t.formModel.status,callback:function(e){t.$set(t.formModel,"status",e)},expression:"formModel.status"}}),t._v(" "),r("el-tag",{staticStyle:{"margin-left":"10px"},attrs:{type:t.formModel.status?"success":"info",size:"small"}},[t._v(t._s(t.formModel.status?"Aktif":"Nonaktif"))]),t._v(" "),t.formErrors.status?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.status[0])+"\n\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(e){t.showForm=!1}}},[t._v("BATAL")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("\n\t\t\t\tSIMPAN\n\t\t\t")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);