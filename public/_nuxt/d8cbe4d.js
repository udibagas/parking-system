(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{379:function(t,e,r){"use strict";var o=r(2),n=r(83),l=r(24),c=r(13),m=r(5),d=r(380),_=r(172),f=r(381),v=r(382),h=r(82),w=r(383),k=[],E=k.sort,M=m((function(){k.sort(void 0)})),x=m((function(){k.sort(null)})),y=_("sort"),D=!m((function(){if(h)return h<70;if(!(f&&f>3)){if(v)return!0;if(w)return w<603;var code,t,e,r,o="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)k.push({k:t+r,v:e})}for(k.sort((function(a,b){return b.v-a.v})),r=0;r<k.length;r++)t=k[r].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}}));o({target:"Array",proto:!0,forced:M||!x||!y||!D},{sort:function(t){void 0!==t&&n(t);var e=l(this);if(D)return void 0===t?E.call(e):E.call(e,t);var r,o,m=[],_=c(e.length);for(o=0;o<_;o++)o in e&&m.push(e[o]);for(r=(m=d(m,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:String(e)>String(r)?1:-1}}(t))).length,o=0;o<r;)e[o]=m[o++];for(;o<_;)delete e[o++];return e}})},380:function(t,e){var r=Math.floor,o=function(t,e){var c=t.length,m=r(c/2);return c<8?n(t,e):l(o(t.slice(0,m),e),o(t.slice(m),e),e)},n=function(t,e){for(var element,r,o=t.length,i=1;i<o;){for(r=i,element=t[i];r&&e(t[r-1],element)>0;)t[r]=t[--r];r!==i++&&(t[r]=element)}return t},l=function(t,e,r){for(var o=t.length,n=e.length,l=0,c=0,m=[];l<o||c<n;)l<o&&c<n?m.push(r(t[l],e[c])<=0?t[l++]:e[c++]):m.push(l<o?t[l++]:e[c++]);return m};t.exports=o},381:function(t,e,r){var o=r(81).match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},382:function(t,e,r){var o=r(81);t.exports=/MSIE|Trident/.test(o)},383:function(t,e,r){var o=r(81).match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},384:function(t,r,o){"use strict";o(379),o(8),o(84);r.a={data:function(){return{showForm:!1,formErrors:{},error:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort:"name",order:"ascending",filters:{},loading:!1}},methods:{sortChange:function(t){t.prop==this.sort&&t.order==this.order||(this.sort=t.prop,this.order=t.order,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(t){console.log(t)},openForm:function(data){this.error={},this.formErrors={},this.formModel=Object.assign({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData()})).catch((function(e){422==e.response.status&&(t.error={},t.formErrors=e.response.data.errors),500==e.response.status&&(t.formErrors={},t.error=e.response.data)})).finally((function(){t.loading=!1}))},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.$message({message:t.message,type:"success",showClose:!0})})).catch((function(t){r.$message({message:t.response.data.message,type:"error",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.keyword=t,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.requestData()},requestData:function(){var t=this,e={page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort:this.sort,order:this.order,paginated:!0};this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){t.loading=!1,t.tableData=e})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0})})).finally((function(){return t.loading=!1}))}},mounted:function(){this.requestData()}}},417:function(t,e,r){"use strict";r.r(e);r(173),r(38);var o={mixins:[r(384).a],data:function(){return{url:"/api/pos",showSnapshot:!1,snapshot:null}},methods:{testCamera:function(t){var e=this;this.$axios.$get("/api/testCamera/".concat(t)).then((function(t){e.snapshot="data:image/jpeg;base64,"+t.snapshot,e.showSnapshot=!0})).catch((function(t){e.$message({message:t.response.data.message,type:"error"})}))},test:function(t,e){var r=this,o=new WebSocket("ws://".concat(t.ip_address,":5678/"));o.onerror=function(t){r.$message({message:"KONEKSI KE POS GAGAL",type:"error"})},o.onopen=function(r){"printer"==e&&o.send(["test_printer",t.printer_device,"TEST PRINTER ".concat(t.name)].join(";")),"gate"==e&&o.send(["open",t.gate_device_name,t.gate_device_baudrate,t.gate_command_open,t.gate_command_close].join(";"))},o.onmessage=function(t){var data=JSON.parse(t.data);r.$message({message:data.message,type:data.status?"success":"error"}),o.close()}}}},n=r(23),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",[r("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"primary"},on:{click:function(e){return t.openForm({})}}},[t._v("TAMBAH POS")])],1),t._v(" "),r("el-form-item",[r("el-input",{attrs:{size:"small",placeholder:"Search","prefix-icon":"el-icon-search",clearable:!0},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{height:"calc(100vh - 350px)",data:t.tableData.data,stripe:"","default-sort":{prop:t.sort,order:t.order}},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",label:"#",index:t.tableData.from}}),t._v(" "),r("el-table-column",{attrs:{prop:"name",label:"Nama",sortable:"custom","min-width":"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"ip_address",label:"IP Address","min-width":"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"printer_device",label:"Device Printer","min-width":"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"camera_snapshot_url",label:"URL Kamera","min-width":"200px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"camera_snapshot_url",label:"User/Pass Kamera","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.camera_username)+"/"+t._s(e.row.camera_password)+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Gate Device:Baudrate","min-width":"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.gate_device_name)+":"+t._s(e.row.gate_device_baudrate)+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Perintah Buka/Tutup","min-width":"200px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.gate_command_open)+"/"+t._s(e.row.gate_command_close||"-")+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{width:"40px",align:"center","header-align":"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("\n\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("\n\t\t\t\t\t\t\tHapus\n\t\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-camera"},nativeOn:{click:function(r){return r.preventDefault(),t.testCamera(e.row.id)}}},[t._v("\n\t\t\t\t\t\t\tTest Kamera\n\t\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-printer"},nativeOn:{click:function(r){return r.preventDefault(),t.test(e.row,"printer")}}},[t._v("\n\t\t\t\t\t\t\tTest Printer\n\t\t\t\t\t\t")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-setting"},nativeOn:{click:function(r){return r.preventDefault(),t.test(e.row,"gate")}}},[t._v("\n\t\t\t\t\t\t\tTest Gate\n\t\t\t\t\t\t")])],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{visible:t.showForm,title:t.formModel.id?"EDIT POS":"TAMBAH POS",width:"600px","close-on-click-modal":!1},on:{"update:visible":function(e){t.showForm=e}}},[r("el-alert",{directives:[{name:"show",rawName:"v-show",value:t.error.message,expression:"error.message"}],staticStyle:{"margin-bottom":"15px"},attrs:{type:"error",title:"ERROR",description:t.error.message}}),t._v(" "),r("el-form",{attrs:{"label-width":"180px","label-position":"left"}},[r("el-form-item",{class:t.formErrors.name?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.name,callback:function(e){t.$set(t.formModel,"name",e)},expression:"formModel.name"}}),t._v(" "),t.formErrors.name?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.name[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.ip_address?"is-error":"",attrs:{label:"IP Address Komputer"}},[r("el-input",{attrs:{placeholder:"IP Address Komputer"},model:{value:t.formModel.ip_address,callback:function(e){t.$set(t.formModel,"ip_address",e)},expression:"formModel.ip_address"}}),t._v(" "),t.formErrors.ip_address?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.ip_address[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.printer_device?"is-error":"",attrs:{label:"Device Printer"}},[r("el-input",{attrs:{placeholder:"Device Printer"},model:{value:t.formModel.printer_device,callback:function(e){t.$set(t.formModel,"printer_device",e)},expression:"formModel.printer_device"}}),t._v(" "),t.formErrors.printer_device?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.printer_device[0])+"\n\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("el-tabs",{attrs:{type:"border-card"}},[r("el-tab-pane",{attrs:{label:"KAMERA"}},[r("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[r("el-form-item",{class:t.formErrors.camera_snapshot_url?"is-error":"",attrs:{label:"URL"}},[r("el-input",{attrs:{placeholder:"URL"},model:{value:t.formModel.camera_snapshot_url,callback:function(e){t.$set(t.formModel,"camera_snapshot_url",e)},expression:"formModel.camera_snapshot_url"}}),t._v(" "),t.formErrors.camera_snapshot_url?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formErrors.camera_snapshot_url[0])+"\n\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.camera_username?"is-error":"",attrs:{label:"Username"}},[r("el-input",{attrs:{placeholder:"Username"},model:{value:t.formModel.camera_username,callback:function(e){t.$set(t.formModel,"camera_username",e)},expression:"formModel.camera_username"}}),t._v(" "),t.formErrors.camera_username?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formErrors.camera_username[0])+"\n\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.camera_password?"is-error":"",attrs:{label:"Password"}},[r("el-input",{attrs:{placeholder:"Password"},model:{value:t.formModel.camera_password,callback:function(e){t.$set(t.formModel,"camera_password",e)},expression:"formModel.camera_password"}}),t._v(" "),t.formErrors.camera_password?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formErrors.camera_password[0])+"\n\t\t\t\t\t\t")]):t._e()],1)],1)],1),t._v(" "),r("el-tab-pane",{attrs:{label:"GATE"}},[r("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[r("el-form-item",{class:t.formErrors.gate_device_name?"is-error":"",attrs:{label:"Device"}},[r("el-input",{attrs:{placeholder:"Device"},model:{value:t.formModel.gate_device_name,callback:function(e){t.$set(t.formModel,"gate_device_name",e)},expression:"formModel.gate_device_name"}}),t._v(" "),t.formErrors.gate_device_name?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formErrors.gate_device_name[0])+"\n\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.gate_device_baudrate?"is-error":"",attrs:{label:"Baudrate"}},[r("el-input",{attrs:{placeholder:"Baudrate"},model:{value:t.formModel.gate_device_baudrate,callback:function(e){t.$set(t.formModel,"gate_device_baudrate",e)},expression:"formModel.gate_device_baudrate"}}),t._v(" "),t.formErrors.gate_device_baudrate?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formErrors.gate_device_baudrate[0])+"\n\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.gate_command_open?"is-error":"",attrs:{label:"Perintah Buka"}},[r("el-input",{attrs:{placeholder:"Perintah Buka"},model:{value:t.formModel.gate_command_open,callback:function(e){t.$set(t.formModel,"gate_command_open",e)},expression:"formModel.gate_command_open"}}),t._v(" "),t.formErrors.gate_command_open?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formErrors.gate_command_open[0])+"\n\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.gate_command_close?"is-error":"",attrs:{label:"Perintah Tutup"}},[r("el-input",{attrs:{placeholder:"Perintah Tutup"},model:{value:t.formModel.gate_command_close,callback:function(e){t.$set(t.formModel,"gate_command_close",e)},expression:"formModel.gate_command_close"}}),t._v(" "),t.formErrors.gate_command_close?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.formErrors.gate_command_close[0])+"\n\t\t\t\t\t\t")]):t._e()],1)],1)],1)],1),t._v(" "),r("span",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(e){t.showForm=!1}}},[t._v("\n\t\t\t\tBATAL\n\t\t\t")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:t.save}},[t._v("\n\t\t\t\tSIMPAN\n\t\t\t")])],1)],1),t._v(" "),r("el-dialog",{attrs:{title:"SNAPSHOT KAMERA",center:"",visible:t.showSnapshot},on:{"update:visible":function(e){t.showSnapshot=e}}},[r("img",{staticStyle:{width:"100%"},attrs:{src:t.snapshot,alt:""}})])],1)}),[],!1,null,null,null);e.default=component.exports}}]);