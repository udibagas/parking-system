(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{454:function(r,e,o){"use strict";o.r(e);o(10);var t={props:["show"],data:function(){return{formModel:this.$store.state.user,loading:!1,formErrors:{},error:{}}},methods:{save:function(){var r=this;this.loading=!0,axios.put("/user/"+this.formModel.id,this.formModel).then((function(e){r.$message({message:"Data berhasil diupdate",type:"success",showClose:!0}),r.$store.state.user=e.data})).catch((function(e){422==e.response.status&&(r.error={},r.formErrors=e.response.data.errors),500==e.response.status&&(r.formErrors={},r.error=e.response.data)})).finally((function(){r.loading=!1}))}}},l=o(36),component=Object(l.a)(t,(function(){var r=this,e=r.$createElement,o=r._self._c||e;return o("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:r.loading,expression:"loading"}],attrs:{title:"PROFIL SAYA",visible:r.show,"show-close":!1,width:"500px"}},[o("el-alert",{directives:[{name:"show",rawName:"v-show",value:r.error.message,expression:"error.message"}],staticStyle:{"margin-bottom":"15px"},attrs:{type:"error",title:"ERROR",description:r.error.message+"\n"+r.error.file+":"+r.error.line}}),r._v(" "),o("el-form",{attrs:{"label-width":"160px","label-position":"left"}},[o("el-form-item",{class:r.formErrors.name?"is-error":"",attrs:{label:"Nama"}},[o("el-input",{attrs:{placeholder:"Nama"},model:{value:r.formModel.name,callback:function(e){r.$set(r.formModel,"name",e)},expression:"formModel.name"}}),r._v(" "),r.formErrors.name?o("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t"+r._s(r.formErrors.name[0])+"\n\t\t\t\t")]):r._e()],1),r._v(" "),o("el-form-item",{attrs:{label:"Level"}},[o("el-input",{attrs:{disabled:"",value:r.formModel.role?"Admin":"Operator"}})],1),r._v(" "),o("el-form-item",{class:r.formErrors.password?"is-error":"",attrs:{label:"Password"}},[o("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:r.formModel.password,callback:function(e){r.$set(r.formModel,"password",e)},expression:"formModel.password"}}),r._v(" "),r.formErrors.password?o("div",{staticClass:"el-form-item__error"},[r._v("\n\t\t\t\t\t"+r._s(r.formErrors.password[0])+"\n\t\t\t\t")]):r._e()],1),r._v(" "),o("el-form-item",{class:r.formErrors.password?"is-error":"",attrs:{label:"Konfirmasi Password"}},[o("el-input",{attrs:{type:"password",placeholder:"Konfirmasi Password"},model:{value:r.formModel.password_confirmation,callback:function(e){r.$set(r.formModel,"password_confirmation",e)},expression:"formModel.password_confirmation"}})],1)],1),r._v(" "),o("span",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"info",icon:"el-icon-error"},on:{click:function(e){return r.$emit("close")}}},[r._v("TUTUP")]),r._v(" "),o("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:r.save}},[r._v("SIMPAN")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);