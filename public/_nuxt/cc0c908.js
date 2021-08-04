(window.webpackJsonp=window.webpackJsonp||[]).push([[25,17],{397:function(t,e,r){"use strict";r.r(e);r(10);var o={props:["show","model"],computed:{formModel:function(){return this.model}},data:function(){return{formErrors:{},loading:!1}},methods:{store:function(){var t=this;this.loading=!0,axios.post("/kamera",this.formModel).then((function(e){t.$emit("close"),t.$emit("reload"),t.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors),t.$message({message:e.response.data.message,type:"error"})})).finally((function(){t.loading=!1}))},update:function(){var t=this;this.loading=!0,axios.put("/kamera/".concat(this.formModel.id),this.formModel).then((function(e){t.$emit("close"),t.$emit("reload"),t.$message({message:e.data.message,type:"success"})})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors),t.$message({message:e.response.data.message,type:"error"})})).finally((function(){t.loading=!1}))},closeForm:function(){this.formErrors={},this.$emit("close")}}},l=r(36),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{title:"KAMERA","close-on-click-modal":!1,visible:t.show,"before-close":function(e){t.closeForm(),e()}},on:{"update:visible":function(e){t.show=e}}},[r("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[r("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.ip_address?"is-error":"",attrs:{label:"Alamat IP"}},[r("el-input",{attrs:{placeholder:"Alamat IP"},model:{value:t.formModel.ip_address,callback:function(e){t.$set(t.formModel,"ip_address",e)},expression:"formModel.ip_address"}}),t._v(" "),t.formErrors.ip_address?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.ip_address[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.snapshot_url?"is-error":"",attrs:{label:"URL Snapshot"}},[r("el-input",{attrs:{placeholder:"URL Snapshot"},model:{value:t.formModel.snapshot_url,callback:function(e){t.$set(t.formModel,"snapshot_url",e)},expression:"formModel.snapshot_url"}}),t._v(" "),t.formErrors.snapshot_url?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.snapshot_url[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.username?"is-error":"",attrs:{label:"Username"}},[r("el-input",{attrs:{placeholder:"Username"},model:{value:t.formModel.username,callback:function(e){t.$set(t.formModel,"username",e)},expression:"formModel.username"}}),t._v(" "),t.formErrors.username?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.username[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Password"}},[r("el-input",{attrs:{placeholder:"Password"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.auth_type?"is-error":"",attrs:{label:"Otentifikasi"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Otentifikasi"},model:{value:t.formModel.auth_type,callback:function(e){t.$set(t.formModel,"auth_type",e)},expression:"formModel.auth_type"}},t._l(["basic","digest"],(function(t,i){return r("el-option",{key:i,attrs:{value:t,label:t}})})),1),t._v(" "),t.formErrors.auth_type?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.auth_type[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.status?"is-error":"",attrs:{label:"Status"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Status"},model:{value:t.formModel.status,callback:function(e){t.$set(t.formModel,"status",e)},expression:"formModel.status"}},t._l(["Tidak Aktif","Aktif"],(function(t,i){return r("el-option",{key:i,attrs:{value:i,label:t}})})),1),t._v(" "),t.formErrors.status?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.status[0])+"\n\t\t\t")]):t._e()],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"info",icon:"el-icon-error"},on:{click:t.closeForm}},[t._v("BATAL")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:function(e){t.formModel.id?t.update():t.store()}}},[t._v("SIMPAN")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},426:function(t,e,r){"use strict";r.r(e);r(10);var o={components:{FormKamera:r(397).default},mounted:function(){this.requestData()},data:function(){return{tableData:[],selectedData:{},showForm:!1,loading:!1,showSnapshot:!1,snapshot:null}},methods:{requestData:function(){var t=this;this.loading=!0,axios.get("/kamera").then((function(e){t.tableData=e.data})).catch((function(e){t.$message({message:e.response.data.message,type:"error"})})).finally((function(){return t.loading=!1})),this.$store.commit("getKameraList")},openForm:function(){var data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.selectedData=data?JSON.parse(JSON.stringify(data)):{},this.showForm=!0},deleteData:function(t){var e=this;this.$confirm("Anda yakin?","Konfirmasi",{type:"warning"}).then((function(){e.loading=!0,axios.delete("/kamera/".concat(t)).then((function(t){e.$message({message:t.data.message,type:"success"}),e.requestData()})).catch((function(t){e.$message({message:t.response.data.message,type:"error"})})).finally((function(){return e.loading=!1}))})).catch((function(t){return console.log(t)}))},testKamera:function(t){var e=this;axios.get("/kamera/test/".concat(t)).then((function(t){e.snapshot="data:image/jpeg;base64,"+t.data.snapshot,e.showSnapshot=!0})).catch((function(t){e.$message({message:t.response.data.message,type:"error"})}))}}},l=r(36),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"text-right mb-4"},[r("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(e){return t.openForm()}}},[t._v("TAMBAH KAMERA")])],1),t._v(" "),r("el-table",{attrs:{data:t.tableData,stripe:"",height:"calc(100vh - 205px)"}},[r("el-table-column",{attrs:{type:"index"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"100",label:"Status",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tag",{attrs:{effect:"dark",type:e.row.status?"success":"info",size:"small"}},[t._v(t._s(e.row.status?"Aktif":"Tidak Aktif"))])]}}])}),t._v(" "),r("el-table-column",{attrs:{"min-width":"150",label:"Nama",prop:"nama"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"150",label:"IP Address",prop:"ip_address"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"150",label:"Snapshot URL",prop:"snapshot_url"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"150",label:"Username",prop:"username"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"150",label:"Password",prop:"password"}}),t._v(" "),r("el-table-column",{attrs:{"min-width":"150",label:"Auth Type",prop:"auth_type"}}),t._v(" "),r("el-table-column",{attrs:{fixed:"right",width:"60px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-camera"},nativeOn:{click:function(r){return r.preventDefault(),t.testKamera(e.row.id)}}},[t._v("Test Kamera")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-edit"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("Edit")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("Hapus")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.requestData}})],1)],2)],1),t._v(" "),r("FormKamera",{attrs:{model:t.selectedData,show:t.showForm},on:{close:function(e){t.showForm=!1},reload:t.requestData}}),t._v(" "),r("el-dialog",{attrs:{title:"SNAPSHOT KAMERA",center:"",visible:t.showSnapshot},on:{"update:visible":function(e){t.showSnapshot=e}}},[r("img",{staticStyle:{width:"100%"},attrs:{src:t.snapshot,alt:""}})])],1)}),[],!1,null,null,null);e.default=component.exports}}]);