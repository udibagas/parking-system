(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{414:function(t,o,r){"use strict";r.r(o);r(10);var n={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",tableData:[],loading:!1}},methods:{openForm:function(data){this.formErrors={},this.formModel=JSON.parse(JSON.stringify(data)),this.showForm=!0},store:function(){var e=this;this.loading=!0,axios.post("/groupMember",this.formModel).then((function(t){e.showForm=!1,e.$message({message:t.data.message,type:"success"}),e.requestData(),e.$store.commit("getGroupMemberList")})).catch((function(t){422==t.response.status&&(e.formErrors=t.response.data.errors),500==t.response.status&&(e.formErrors={}),e.$message({message:t.response.data.message,type:"error"})})).finally((function(){e.loading=!1}))},update:function(){var e=this;this.loading=!0,axios.put("/groupMember/"+this.formModel.id,this.formModel).then((function(t){e.showForm=!1,e.$message({message:t.data.message,type:"success"}),e.requestData(),e.$store.commit("getGroupMemberList")})).catch((function(t){422==t.response.status&&(e.formErrors=t.response.data.errors),500==t.response.status&&(e.formErrors={}),e.$message({message:t.response.data.message,type:"error"})})).finally((function(){e.loading=!1}))},deleteData:function(t){var o=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){axios.delete("/groupMember/"+t).then((function(e){o.requestData(),o.$store.commit("getGroupMemberList"),o.$message({message:e.data.message,type:"success"})})).catch((function(e){o.$message({message:e.response.data.message,type:"error"})}))})).catch((function(){return console.log(e)}))},requestData:function(){var e=this,t={keyword:this.keyword};this.loading=!0,axios.get("/groupMember",{params:t}).then((function(t){e.tableData=t.data})).catch((function(t){e.$message({message:t.response.data.message,type:"error"})})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}},l=r(36),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(e){return e.preventDefault(),function(){}.apply(null,arguments)}}},[1==e.$store.state.user.role?o("el-form-item",[o("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(t){return e.openForm({})}}},[e._v("TAMBAH GROUP")])],1):e._e(),e._v(" "),o("el-form-item",[o("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:!0},on:{change:function(t){e.keyword=t,e.requestData()}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1)],1),e._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,stripe:"",height:"calc(100vh - 220px)"}},[o("el-table-column",{attrs:{prop:"nama",label:"Nama","show-overflow-tooltip":"","min-width":"150px"}}),e._v(" "),o("el-table-column",{attrs:{prop:"keterangan",label:"Keterangan","show-overflow-tooltip":"","min-width":"150px"}}),e._v(" "),1==e.$store.state.user.role?o("el-table-column",{attrs:{fixed:"right",width:"40px","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-dropdown",[o("span",{staticClass:"el-dropdown-link"},[o("i",{staticClass:"el-icon-more"})]),e._v(" "),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{nativeOn:{click:function(o){return o.preventDefault(),e.openForm(t.row)}}},[o("i",{staticClass:"el-icon-edit-outline"}),e._v(" Edit")]),e._v(" "),o("el-dropdown-item",{nativeOn:{click:function(o){return o.preventDefault(),e.deleteData(t.row.id)}}},[o("i",{staticClass:"el-icon-delete"}),e._v(" Hapus")])],1)],1)]}}],null,!1,1264067733)},[o("template",{slot:"header"},[o("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:function(){e.page=1,e.keyword="",e.requestData()}}})],1)],2):e._e()],1),e._v(" "),o("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{visible:e.showForm,title:e.formModel.id?"EDIT GROUP MEMBER":"TAMBAH GROUP MEMBER",width:"500px","close-on-click-modal":!1},on:{"update:visible":function(t){e.showForm=t}}},[o("el-form",{attrs:{"label-width":"150px","label-position":"left"}},[o("el-form-item",{class:e.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[o("el-input",{attrs:{placeholder:"Nama"},model:{value:e.formModel.nama,callback:function(t){e.$set(e.formModel,"nama",t)},expression:"formModel.nama"}}),e._v(" "),e.formErrors.nama?o("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t\t\t"+e._s(e.formErrors.nama[0])+"\n\t\t\t\t\t")]):e._e()],1),e._v(" "),o("el-form-item",{class:e.formErrors.keterangan?"is-error":"",attrs:{label:"Keterangan"}},[o("el-input",{attrs:{placeholder:"Keterangan"},model:{value:e.formModel.keterangan,callback:function(t){e.$set(e.formModel,"keterangan",t)},expression:"formModel.keterangan"}}),e._v(" "),e.formErrors.keterangan?o("div",{staticClass:"el-form-item__error"},[e._v("\n\t\t\t\t\t\t"+e._s(e.formErrors.keterangan[0])+"\n\t\t\t\t\t")]):e._e()],1)],1),e._v(" "),o("span",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(t){e.showForm=!1}}},[e._v("BATAL")]),e._v(" "),o("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:function(){return e.formModel.id?e.update():e.store()}}},[e._v("SIMPAN")])],1)],1)],1)}),[],!1,null,null,null);o.default=component.exports}}]);