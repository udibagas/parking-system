(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{701:function(e,t,n){"use strict";n.r(t);n(14),n(53);var l={data:function(){return{tableData:[],loading:!1,processing:!1,selectedFiles:[]}},mounted:function(){this.getData()},methods:{getData:function(){var e=this;this.loading=!0,this.$axios.$get("/api/backup").then((function(t){e.tableData=t})).finally((function(){return e.loading=!1}))},deleteData:function(e){var t=this;this.$confirm("Anda yakin akan menghapus file ini?","Konfirmasi",{type:"warning"}).then((function(){var n={file:e};t.$axios.$delete("/api/backup",{params:n}).then((function(e){t.$message({message:e.message,type:"success",showClose:!0}),t.getData()}))})).catch((function(e){return console.log(e)}))},backup:function(){var e=this;this.processing=!0,this.$axios.$post("/api/backup").then((function(t){e.$message({message:t.message,type:"success",showClose:!0}),e.getData()})).finally((function(){return e.processing=!1}))},restore:function(e){var t=this;this.$confirm("Anda yakin akan me-restore database?","Konfirmasi",{type:"warning"}).then((function(){t.loading=!0,t.$axios.$put("/api/backup",{file:e}).then((function(e){t.$message({message:e.message,type:"success",showClose:!0}),t.getData()})).finally((function(){return t.loading=!1}))})).catch((function(e){return console.log(e)}))},triggerOpenFile:function(){document.getElementById("input-file").click()},uploadFile:function(e){var t=this,n=new FormData;n.append("file",e.target.files[0]),this.$axios.$post("/api/backup",n,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.$message({message:e.message,type:"success",showClose:!0}),t.getData()})).finally((function(){t.loading=!1,document.getElementById("input-file").value=""}))},handleSelectionChange:function(e){this.selectedFiles=e.map((function(e){return e.file}))},deleteFiles:function(){this.deleteData(this.selectedFiles)},download:function(e){window.open(e,"_blank")}}},o=n(46),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return t("div",[t("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(e){e.preventDefault()}}},[t("el-form-item",[t("el-button",{attrs:{disabled:0==e.selectedFiles.length,type:"danger",icon:"el-icon-delete",size:"small",title:"Hapus File Backup"},on:{click:e.deleteFiles}},[e._v("HAPUS FILE BACKUP")])],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",icon:"el-icon-upload2",size:"small",title:"Upload File Backup"},on:{click:e.triggerOpenFile}},[e._v("UPLOAD FILE BACKUP")]),e._v(" "),t("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"input-file"},on:{change:e.uploadFile}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small",title:"Generate Backup",loading:e.processing},on:{click:e.backup}},[e._v("GENERATE BACKUP")])],1)],1),e._v(" "),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,stripe:"",height:"calc(100vh - 260px)"},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55",align:"center","header-align":"center"}}),e._v(" "),t("el-table-column",{attrs:{type:"index",label:"#"}}),e._v(" "),t("el-table-column",{attrs:{prop:"tanggal",label:"Tanggal",width:"200"}}),e._v(" "),t("el-table-column",{attrs:{prop:"file",label:"File"}}),e._v(" "),t("el-table-column",{attrs:{prop:"size",label:"Ukuran",width:"100",align:"right","header-align":"right"}}),e._v(" "),t("el-table-column",{attrs:{width:"60",align:"center","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-dropdown",[t("span",{staticClass:"el-dropdown-link"},[t("i",{staticClass:"el-icon-more"})]),e._v(" "),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{icon:"el-icon-download"},nativeOn:{click:function(t){return t.preventDefault(),e.download(n.row.url)}}},[e._v("Download")]),e._v(" "),t("el-dropdown-item",{attrs:{icon:"el-icon-refresh"},nativeOn:{click:function(t){return t.preventDefault(),e.restore(n.row.file)}}},[e._v("Restore")]),e._v(" "),t("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(t){return t.preventDefault(),e.deleteData(n.row.file)}}},[e._v("Hapus")])],1)],1)]}}])},[t("template",{slot:"header"},[t("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:e.getData}})],1)],2)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);