(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{537:function(t,r,n){"use strict";n(39),n(31),n(38),n(51),n(30),n(52);var o=n(19);n(14),n(58);function l(data){return"[object Array]"===Object.prototype.toString.call(data)}function c(t,e){if(!t)throw new Error(e)}function d(data){return Object.keys(data)}function f(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function m(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function h(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var v,_=function(){return _=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},_.apply(this,arguments)},w=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)l.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return l};function y(data){return data.map(f).reduce((function(t,e,r){return e.reduce((function(map,t){var e=w(t,2),n=e[0],o=e[1],l=map[n]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=l,map}),t)}),Object.create(null))}function x(t,e){return void 0===e&&(e=function(i){return i}),e(f(t).map((function(t){var e=w(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function k(data,t){if(void 0===t&&(t=function(i){return i}),!data.length)return"";var content='<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){c(data.length>0);var e=x(y(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n";return content}function j(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+O(data,"base")+"\n"}function O(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var n,o=(n=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),n.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),c=function(t){return Array(t+1).join(" ")}(r);return null==data?c+"<"+o+" />":c+"<"+o+">\n"+(l(data)?data.map((function(t){return O(t,e,e,r+2)})).join("\n"):"object"==typeof data?f(data).map((function(t){var n=w(t,2),o=n[0];return O(n[1],o,e,r+2)})).join("\n"):c+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+c+"</"+o+">"}function E(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,n=t.extension,o=t.fileNameFormatter,v=void 0===o?function(t){return t.replace(/\s+/,"_")}:o,O=t.fields,E=t.exportType,D=void 0===E?"txt":E,M=t.replacer,S=void 0===M?null:M,C=t.space,P=void 0===C?4:C,U=t.processor,L=void 0===U?h:U,R=t.withBOM,A=void 0!==R&&R,$=t.delimiter,N=void 0===$?",":$,I=t.beforeTableEncode,K=void 0===I?function(i){return i}:I,z="Invalid export data. Please provide an array of object",F="Can't export unknown data type "+D+".",T="Can't export string data to "+D+".";if("string"==typeof data)switch(D){case"txt":case"css":case"html":return L(data,D,m(r,null!=n?n:D,v));default:throw new Error(T)}var B=function(t){if(!t||l(t)&&!t.length||!l(t)&&!d(t).length)return function(t){return t};var e=l(t)?t.reduce((function(map,t){var e;return _(_({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return l(t)?t.map((function(i){return f(i).reduce((function(map,t){var r=w(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return d(i).length})):f(t).reduce((function(map,t){var r=w(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(O),J=B(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),G=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(J,S,P);switch(D){case"txt":case"css":case"html":return L(G,D,m(r,null!=n?n:D,v));case"json":return L(G,D,m(r,null!=n?n:"json",v));case"csv":c(l(J),z);var H=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=x(y(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(J,N,K);return L(A?"\ufeff"+H:H,D,m(r,null!=n?n:"csv",v));case"xls":return c(l(J),z),L(k(J,K),D,m(r,null!=n?n:"xls",v));case"xml":return L(j(J),D,m(r,null!=n?n:"xml",v));default:throw new Error(F)}}(v=E||(E={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},v.processors={downloadFile:h};var D=E;function M(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function S(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?M(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=S(S({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=S({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=S({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData=S(S({},t.tableData),{},{from:n,to:o,total:l})}})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=S(S({sort_prop:this.sort_prop,sort_order:this.sort_order},this.filters),{},{action:"export"});this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return D({data:data,fileName:t,exportType:"xls"})})).catch((function(t){return console.log(t)})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},702:function(t,e,r){"use strict";r.r(e);r(123),r(53),r(39),r(31),r(38),r(14),r(51),r(30),r(52);var n=r(19),o=r(537),l=r(69);function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var d={mixins:[o.a],data:function(){return{url:"/api/gateIn"}},methods:{afterSave:function(){this.$store.dispatch("getGateInList")},afterDelete:function(){this.$store.dispatch("getGateInList")}},computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(l.b)(["jenisKendaraanList","printerList","kameraList"]))},f=d,m=r(46),component=Object(m.a)(f,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"text-right"},[e("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:function(e){return t.openForm()}}},[t._v("TAMBAH GATE MASUK")])],1),t._v(" "),e("br"),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,height:"calc(100vh - 300px)"}},[e("el-table-column",{attrs:{prop:"shortcut_key",label:"#","min-width":"30px",align:"center","header-align":"center"}}),t._v(" "),e("el-table-column",{attrs:{"min-width":"100",label:"Status",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(r){return[e("el-tag",{attrs:{effect:"dark",type:r.row.status?"success":"info",size:"small"}},[t._v(t._s(r.row.status?"Aktif":"Tidak Aktif"))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"nama",label:"Nama","min-width":"100px"}}),t._v(" "),e("el-table-column",{attrs:{prop:"jenis_kendaraan",label:"Jenis Kendaraan","min-width":"130px","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"controller_ip_address",label:"Controller","min-width":"150px","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(r){return[r.row.controller_ip_address?e("span",[t._v("\n\t\t\t\t\t"+t._s(r.row.controller_ip_address)+":"+t._s(r.row.controller_port)+"\n\t\t\t\t")]):t._e(),t._v(" "),r.row.controller_ip_address?e("br"):t._e(),t._v(" "),r.row.controller_device?e("span",[t._v("\n\t\t\t\t\t"+t._s(r.row.controller_device)+":"+t._s(r.row.controller_baudrate)+"\n\t\t\t\t")]):t._e()]}}])}),t._v(" "),e("el-table-column",{attrs:{"min-width":"150",label:"Printer",prop:"printer.nama"}}),t._v(" "),e("el-table-column",{attrs:{"min-width":"150",label:"Kamera"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.kameraList?e.row.kameraList.map((function(t){return t.nama})).join(","):"")+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(r){return[e("el-dropdown",[e("span",{staticClass:"el-dropdown-link"},[e("i",{staticClass:"el-icon-more"})]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(e){return e.preventDefault(),t.openForm(r.row)}}},[t._v("Edit")]),t._v(" "),e("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(e){return e.preventDefault(),t.deleteData(r.row.id)}}},[t._v("Hapus")])],1)],1)]}}])},[e("template",{slot:"header"},[e("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.requestData}})],1)],2)],1),t._v(" "),e("br"),t._v(" "),e("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),e("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{title:"GATE MASUK","close-on-click-modal":!1,visible:t.showForm},on:{"update:visible":function(e){t.showForm=e}}},[e("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[e("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[e("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.shortcut_key?"is-error":"",attrs:{label:"Shortcut Key"}},[e("el-input",{attrs:{maxlength:"1",placeholder:"Shortcut Key"},model:{value:t.formModel.shortcut_key,callback:function(e){t.$set(t.formModel,"shortcut_key",e)},expression:"formModel.shortcut_key"}}),t._v(" "),t.formErrors.shortcut_key?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.shortcut_key[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.jenis_kendaraan?"is-error":"",attrs:{label:"Jenis Kendaraan"}},[e("el-input",{attrs:{placeholder:"Jenis Kendaraan"},model:{value:t.formModel.jenis_kendaraan,callback:function(e){t.$set(t.formModel,"jenis_kendaraan",e)},expression:"formModel.jenis_kendaraan"}}),t._v(" "),t.formErrors.jenis_kendaraan?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.jenis_kendaraan[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.controller_ip_address?"is-error":"",attrs:{label:"Alamat IP Kontroler"}},[e("el-input",{attrs:{placeholder:"Alamat IP Kontroler"},model:{value:t.formModel.controller_ip_address,callback:function(e){t.$set(t.formModel,"controller_ip_address",e)},expression:"formModel.controller_ip_address"}}),t._v(" "),t.formErrors.controller_ip_address?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.controller_ip_address[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.controller_port?"is-error":"",attrs:{label:"Port Kontroler"}},[e("el-input",{attrs:{type:"number",placeholder:"Port Kontroler"},model:{value:t.formModel.controller_port,callback:function(e){t.$set(t.formModel,"controller_port",e)},expression:"formModel.controller_port"}}),t._v(" "),t.formErrors.controller_port?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.controller_port[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.printer_id?"is-error":"",attrs:{label:"Printer"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Printer"},model:{value:t.formModel.printer_id,callback:function(e){t.$set(t.formModel,"printer_id",e)},expression:"formModel.printer_id"}},t._l(t.printerList,(function(t){return e("el-option",{key:t.id,attrs:{value:t.id,label:t.nama}})})),1),t._v(" "),t.formErrors.printer_id?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.printer_id[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.kamera?"is-error":"",attrs:{label:"Kamera"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Kamera",multiple:""},model:{value:t.formModel.kamera,callback:function(e){t.$set(t.formModel,"kamera",e)},expression:"formModel.kamera"}},t._l(t.kameraList,(function(t){return e("el-option",{key:t.id,attrs:{value:t.id,label:t.nama}})})),1),t._v(" "),t.formErrors.kamera?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.kamera[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.status?"is-error":"",attrs:{label:"Status"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Status"},model:{value:t.formModel.status,callback:function(e){t.$set(t.formModel,"status",e)},expression:"formModel.status"}},t._l(["Tidak Aktif","Aktif"],(function(t,i){return e("el-option",{key:i,attrs:{value:i,label:t}})})),1),t._v(" "),t.formErrors.status?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.status[0])+"\n\t\t\t\t")]):t._e()],1)],1),t._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v("BATAL")]),t._v(" "),e("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("SIMPAN")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);