(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{404:function(t,e,r){"use strict";r.r(e);r(31),r(24),r(30),r(42),r(23),r(43);var o=r(13),n=r(44);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var c={props:["show"],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(n.b)(["gateOutList"])),data:function(){return{formModel:{},formErrors:{}}},methods:{closeForm:function(){this.formModel={},this.formErrors={},this.$emit("close")},save:function(){var t=this;this.$confirm("Aksi ini akan dicatat oleh sistem. Anda yakin?","Peringatan",{type:"warning"}).then((function(){t.$axios.$post("/api/manualOpenLog",t.formModel).then((function(e){t.$message({message:e.message,type:"success"}),t.$emit("open-gate",t.formModel.gate_out_id),t.closeForm()})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors)}))})).catch((function(t){return console.log(t)}))}}},f=r(22),component=Object(f.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{title:"FORM BUKA MANUAL",center:"",visible:t.show,"before-close":t.closeForm},on:{"update:visible":function(e){t.show=e}}},[r("el-form",{attrs:{"label-position":"left","label-width":"200px"}},[r("el-form-item",{class:{"is-error":t.formErrors.alasan},attrs:{label:"Alasan buka manual"}},[r("el-input",{attrs:{autofocus:"",type:"textarea",rows:"3",placeholder:"Alasan buka manual"},model:{value:t.formModel.alasan,callback:function(e){t.$set(t.formModel,"alasan",e)},expression:"formModel.alasan"}}),t._v(" "),t.formErrors.alasan?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.alasan[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:{"is-error":t.formErrors.gate_out_id},attrs:{label:"Gate Keluar"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Keluar"},model:{value:t.formModel.gate_out_id,callback:function(e){t.$set(t.formModel,"gate_out_id",e)},expression:"formModel.gate_out_id"}},t._l(t.gateOutList,(function(t){return r("el-option",{key:t.id,attrs:{label:t.nama,value:t.id}})})),1),t._v(" "),t.formErrors.gate_out_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.gate_out_id[0])+"\n\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Masukkan password Admin"}},[r("el-input",{attrs:{type:"password",placeholder:"Password"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t")]):t._e()],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:t.save}},[t._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);