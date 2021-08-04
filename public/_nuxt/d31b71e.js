(window.webpackJsonp=window.webpackJsonp||[]).push([[26,18],{398:function(e,t,r){"use strict";r.r(t);r(38),r(28),r(37),r(48),r(27),r(49);var o=r(14),n=(r(10),r(42));function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var c={props:["show","model"],computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({formModel:function(){return this.model}},Object(n.b)(["printerList","gateOutList"])),data:function(){return{formErrors:{},loading:!1}},methods:{store:function(){var e=this;this.loading=!0,axios.post("/pos",this.formModel).then((function(t){e.$emit("close"),e.$emit("reload"),e.$message({message:t.data.message,type:"success"})})).catch((function(t){422==t.response.status&&(e.formErrors=t.response.data.errors),e.$message({message:t.response.data.message,type:"error"})})).finally((function(){e.loading=!1}))},update:function(){var e=this;this.loading=!0,axios.put("/pos/".concat(this.formModel.id),this.formModel).then((function(t){e.$emit("close"),e.$emit("reload"),e.$message({message:t.data.message,type:"success"})})).catch((function(t){422==t.response.status&&(e.formErrors=t.response.data.errors),e.$message({message:t.response.data.message,type:"error"})})).finally((function(){e.loading=!1}))},closeForm:function(){this.formErrors={},this.$emit("close")}}},d=r(36),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{title:"POS","close-on-click-modal":!1,visible:e.show,"before-close":function(t){e.closeForm(),t()}},on:{"update:visible":function(t){e.show=t}}},[r("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[r("el-form-item",{class:e.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:e.formModel.nama,callback:function(t){e.$set(e.formModel,"nama",t)},expression:"formModel.nama"}}),e._v(" "),e.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.nama[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),r("el-form-item",{class:e.formErrors.ip_address?"is-error":"",attrs:{label:"Alamat IP"}},[r("el-input",{attrs:{placeholder:"Alamat IP"},model:{value:e.formModel.ip_address,callback:function(t){e.$set(e.formModel,"ip_address",t)},expression:"formModel.ip_address"}}),e._v(" "),e.formErrors.ip_address?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.ip_address[0])+"\n\t\t\t")]):e._e()],1),e._v(" "),r("el-form-item",{class:e.formErrors.printer_id?"is-error":"",attrs:{label:"Printer"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Printer"},model:{value:e.formModel.printer_id,callback:function(t){e.$set(e.formModel,"printer_id",t)},expression:"formModel.printer_id"}},e._l(e.printerList,(function(e){return r("el-option",{key:e.id,attrs:{value:e.id,label:e.nama}})})),1),e._v(" "),e.formErrors.printer_id?r("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t"+e._s(e.formErrors.printer_id[0])+"\n\t\t\t")]):e._e()],1)],1),e._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"info",icon:"el-icon-error"},on:{click:e.closeForm}},[e._v("BATAL")]),e._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:function(t){e.formModel.id?e.update():e.store()}}},[e._v("SIMPAN")])],1)],1)}),[],!1,null,null,null);t.default=component.exports},427:function(e,t,r){"use strict";r.r(t);r(10);var o={components:{FormPos:r(398).default},mounted:function(){this.requestData()},data:function(){return{tableData:[],selectedData:{},showForm:!1,loading:!1}},methods:{requestData:function(){var e=this;this.loading=!0,axios.get("/pos").then((function(t){e.tableData=t.data})).catch((function(t){e.$message({message:t.response.data.message,type:"error"})})).finally((function(){return e.loading=!1})),this.$store.commit("getPosList")},openForm:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.selectedData=data?JSON.parse(JSON.stringify(data)):{},this.showForm=!0},deleteData:function(e){var t=this;this.$confirm("Anda yakin?","Konfirmasi",{type:"warning"}).then((function(){t.loading=!0,axios.delete("/pos/".concat(e)).then((function(e){t.$message({message:e.data.message,type:"success"}),t.requestData()})).catch((function(e){t.$message({message:e.response.data.message,type:"error"})})).finally((function(){return t.loading=!1}))})).catch((function(e){return console.log(e)}))}}},n=r(36),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"text-right mb-4"},[r("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(t){return e.openForm()}}},[e._v("TAMBAH POS")])],1),e._v(" "),r("el-table",{attrs:{data:e.tableData,stripe:"",height:"calc(100vh - 205px)"}},[r("el-table-column",{attrs:{type:"index"}}),e._v(" "),r("el-table-column",{attrs:{"min-width":"100",label:"Nama",prop:"nama"}}),e._v(" "),r("el-table-column",{attrs:{"min-width":"100",label:"IP Address",prop:"ip_address"}}),e._v(" "),r("el-table-column",{attrs:{"min-width":"100",label:"Printer",prop:"printer.nama"}}),e._v(" "),r("el-table-column",{attrs:{fixed:"right",width:"60px",align:"center","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),e._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-edit"},nativeOn:{click:function(r){return r.preventDefault(),e.openForm(t.row)}}},[e._v("Edit")]),e._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),e.deleteData(t.row.id)}}},[e._v("Hapus")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:e.requestData}})],1)],2)],1),e._v(" "),r("FormPos",{attrs:{model:e.selectedData,show:e.showForm},on:{close:function(t){e.showForm=!1},reload:e.requestData}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);