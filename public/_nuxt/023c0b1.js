(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{537:function(t,r,n){"use strict";n(39),n(31),n(38),n(51),n(30),n(52);var o=n(19);n(14),n(58);function l(data){return"[object Array]"===Object.prototype.toString.call(data)}function c(t,e){if(!t)throw new Error(e)}function m(data){return Object.keys(data)}function f(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function d(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function _(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var h,v=function(){return v=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},v.apply(this,arguments)},y=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)l.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return l};function w(data){return data.map(f).reduce((function(t,e,r){return e.reduce((function(map,t){var e=y(t,2),n=e[0],o=e[1],l=map[n]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=l,map}),t)}),Object.create(null))}function x(t,e){return void 0===e&&(e=function(i){return i}),e(f(t).map((function(t){var e=y(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function M(data,t){if(void 0===t&&(t=function(i){return i}),!data.length)return"";var content='<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){c(data.length>0);var e=x(w(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n";return content}function k(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+j(data,"base")+"\n"}function j(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var n,o=(n=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),n.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),c=function(t){return Array(t+1).join(" ")}(r);return null==data?c+"<"+o+" />":c+"<"+o+">\n"+(l(data)?data.map((function(t){return j(t,e,e,r+2)})).join("\n"):"object"==typeof data?f(data).map((function(t){var n=y(t,2),o=n[0];return j(n[1],o,e,r+2)})).join("\n"):c+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+c+"</"+o+">"}function E(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,n=t.extension,o=t.fileNameFormatter,h=void 0===o?function(t){return t.replace(/\s+/,"_")}:o,j=t.fields,E=t.exportType,O=void 0===E?"txt":E,R=t.replacer,C=void 0===R?null:R,D=t.space,S=void 0===D?4:D,T=t.processor,A=void 0===T?_:T,$=t.withBOM,N=void 0!==$&&$,F=t.delimiter,L=void 0===F?",":F,I=t.beforeTableEncode,U=void 0===I?function(i){return i}:I,P="Invalid export data. Please provide an array of object",z="Can't export unknown data type "+O+".",J="Can't export string data to "+O+".";if("string"==typeof data)switch(O){case"txt":case"css":case"html":return A(data,O,d(r,null!=n?n:O,h));default:throw new Error(J)}var B=function(t){if(!t||l(t)&&!t.length||!l(t)&&!m(t).length)return function(t){return t};var e=l(t)?t.reduce((function(map,t){var e;return v(v({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return l(t)?t.map((function(i){return f(i).reduce((function(map,t){var r=y(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return m(i).length})):f(t).reduce((function(map,t){var r=y(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(j),H=B(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),K=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(H,C,S);switch(O){case"txt":case"css":case"html":return A(K,O,d(r,null!=n?n:O,h));case"json":return A(K,O,d(r,null!=n?n:"json",h));case"csv":c(l(H),P);var G=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=x(w(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(H,L,U);return A(N?"\ufeff"+G:G,O,d(r,null!=n?n:"csv",h));case"xls":return c(l(H),P),A(M(H,U),O,d(r,null!=n?n:"xls",h));case"xml":return A(k(H),O,d(r,null!=n?n:"xml",h));default:throw new Error(z)}}(h=E||(E={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},h.processors={downloadFile:_};var O=E;function R(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function C(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?R(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=C(C({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=C({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=C({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData=C(C({},t.tableData),{},{from:n,to:o,total:l})}})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=C(C({sort_prop:this.sort_prop,sort_order:this.sort_order},this.filters),{},{action:"export"});this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return O({data:data,fileName:t,exportType:"xls"})})).catch((function(t){return console.log(t)})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},700:function(t,e,r){"use strict";r.r(e);var n={mixins:[r(537).a],data:function(){return{url:"/api/jenisKendaraan"}},methods:{afterSave:function(){this.$store.dispatch("getJenisKendaraanList")},afterDelete:function(){this.$store.dispatch("getJenisKendaraanList")}}},o=r(46),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"text-right"},[e("el-button",{attrs:{size:"small",icon:"el-icon-plus",type:"primary"},on:{click:function(e){return t.openForm()}}},[t._v("TAMBAH JENIS KENDARAAN")])],1),t._v(" "),e("br"),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 300px)"}},[e("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),e("el-table-column",{attrs:{prop:"nama",label:"Nama","min-width":"100px"}}),t._v(" "),e("el-table-column",{attrs:{prop:"group",label:"Group","min-width":"100px"}}),t._v(" "),e("el-table-column",{attrs:{prop:"shortcut_key",label:"Shortcut",align:"center","header-align":"center","min-width":"100px"}}),t._v(" "),e("el-table-column",{attrs:{label:"Mode Tarif",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.mode_tarif?"PROGRESIF":"FLAT")+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"Mode Inap",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.mode_menginap?"LEWAT TENGAH MALAM":"24 JAM DARI CHECK IN")+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"tarif_flat",label:"Tarif Flat",align:"center","header-align":"center","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp "+t._s(t.$decimal(e.row.tarif_flat))+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"Tarif Non Flat","min-width":"250px"},scopedSlots:t._u([{key:"default",fn:function(r){return[t._v("\n\t\t\t\tTarif "+t._s(r.row.menit_pertama)+" menit pertama = Rp\n\t\t\t\t"+t._s(t.$decimal(r.row.tarif_menit_pertama))+" "),e("br"),t._v("\n\t\t\t\tTarif "+t._s(r.row.menit_selanjutnya)+" menit selanjutnya = Rp\n\t\t\t\t"+t._s(t.$decimal(r.row.tarif_menit_selanjutnya))+" "),e("br"),t._v("\n\t\t\t\tTarif maksimal per hari = Rp\n\t\t\t\t"+t._s(t.$decimal(r.row.tarif_maksimum))+" "),e("br"),t._v("\n\t\t\t\tTarif menginap per hari = Rp\n\t\t\t\t"+t._s(t.$decimal(r.row.tarif_menginap))+" "),e("br")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"denda_tiket_hilang",label:"Denda Tiket Hilang",align:"center","header-align":"center","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp "+t._s(t.$decimal(e.row.denda_tiket_hilang))+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(r){return[e("el-dropdown",[e("span",{staticClass:"el-dropdown-link"},[e("i",{staticClass:"el-icon-more"})]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(e){return e.preventDefault(),t.openForm(r.row)}}},[t._v("\n\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t")]),t._v(" "),e("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(e){return e.preventDefault(),t.deleteData(r.row.id)}}},[t._v("\n\t\t\t\t\t\t\tHapus\n\t\t\t\t\t\t")])],1)],1)]}}])},[e("template",{slot:"header"},[e("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.requestData}})],1)],2)],1),t._v(" "),e("br"),t._v(" "),e("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),e("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{visible:t.showForm,title:"JENIS KENDARAAN","close-on-click-modal":!1,width:"700px"},on:{"update:visible":function(e){t.showForm=e}}},[e("el-form",{attrs:{"label-width":"200px","label-position":"left"}},[e("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[e("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.group?"is-error":"",attrs:{label:"Group"}},[e("el-input",{attrs:{placeholder:"Group"},model:{value:t.formModel.group,callback:function(e){t.$set(t.formModel,"group",e)},expression:"formModel.group"}}),t._v(" "),t.formErrors.group?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.group[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.shortcut_key?"is-error":"",attrs:{label:"Shortcut Key"}},[e("el-input",{attrs:{maxlength:"1",placeholder:"Shortcut Key"},model:{value:t.formModel.shortcut_key,callback:function(e){t.$set(t.formModel,"shortcut_key",e)},expression:"formModel.shortcut_key"}}),t._v(" "),t.formErrors.shortcut_key?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.shortcut_key[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.mode_menginap?"is-error":"",attrs:{label:"Mode Inap"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Mode Inap"},model:{value:t.formModel.mode_menginap,callback:function(e){t.$set(t.formModel,"mode_menginap",e)},expression:"formModel.mode_menginap"}},[e("el-option",{attrs:{value:0,label:"24 JAM DARI CHECK IN"}}),t._v(" "),e("el-option",{attrs:{value:1,label:"LEWAT TENGAH MALAM"}})],1),t._v(" "),t.formErrors.mode_menginap?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.mode_menginap[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:{"is-error":t.formErrors.tarif_menginap},attrs:{label:"Tarif menginap per hari (Rp)"}},[e("el-input",{attrs:{type:"number",placeholder:"Tarif menginap per hari (Rp)"},model:{value:t.formModel.tarif_menginap,callback:function(e){t.$set(t.formModel,"tarif_menginap",e)},expression:"formModel.tarif_menginap"}}),t._v(" "),t.formErrors.tarif_menginap?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.tarif_menginap[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.denda_tiket_hilang?"is-error":"",attrs:{label:"Denda Tiket Hilang (Rp)"}},[e("el-input",{attrs:{type:"number",step:500,placeholder:"Denda Tiket Hilang (Rp)"},model:{value:t.formModel.denda_tiket_hilang,callback:function(e){t.$set(t.formModel,"denda_tiket_hilang",e)},expression:"formModel.denda_tiket_hilang"}}),t._v(" "),t.formErrors.denda_tiket_hilang?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.denda_tiket_hilang[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.mode_tarif?"is-error":"",attrs:{label:"Mode Tarif"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"FLAT/PROGRESIF"},model:{value:t.formModel.mode_tarif,callback:function(e){t.$set(t.formModel,"mode_tarif",e)},expression:"formModel.mode_tarif"}},[e("el-option",{attrs:{value:0,label:"FLAT"}}),t._v(" "),e("el-option",{attrs:{value:1,label:"PROGRESIF"}})],1),t._v(" "),t.formErrors.mode_tarif?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.mode_tarif[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:0===t.formModel.mode_tarif,expression:"formModel.mode_tarif === 0"}],class:t.formErrors.tarif_flat?"is-error":"",attrs:{label:"Tarif Flat (Rp)"}},[e("el-input",{attrs:{type:"number",step:500,placeholder:"Tarif Flat (Rp)"},model:{value:t.formModel.tarif_flat,callback:function(e){t.$set(t.formModel,"tarif_flat",e)},expression:"formModel.tarif_flat"}}),t._v(" "),t.formErrors.tarif_flat?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.tarif_flat[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1===t.formModel.mode_tarif,expression:"formModel.mode_tarif === 1"}],class:{"is-error":t.formErrors.tarif_maksimum},attrs:{label:"Tarif maksimal per hari (Rp)"}},[e("el-input",{attrs:{type:"number",placeholder:"Tarif maksimal per hari (Rp)"},model:{value:t.formModel.tarif_maksimum,callback:function(e){t.$set(t.formModel,"tarif_maksimum",e)},expression:"formModel.tarif_maksimum"}}),t._v(" "),t.formErrors.tarif_maksimum?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.tarif_maksimum[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1===t.formModel.mode_tarif,expression:"formModel.mode_tarif === 1"}],attrs:{label:"Tarif Progresif"}},[e("div",{staticClass:"mb-2 flex"},[e("el-input",{staticClass:"mr-2",staticStyle:{width:"250px"},attrs:{type:"number",placeholder:"Menit Pertama"},model:{value:t.formModel.menit_pertama,callback:function(e){t.$set(t.formModel,"menit_pertama",e)},expression:"formModel.menit_pertama"}}),t._v(" "),e("el-input",{attrs:{type:"number",placeholder:"Tarif ".concat(t.formModel.menit_pertama," menit pertama (Rp)")},model:{value:t.formModel.tarif_menit_pertama,callback:function(e){t.$set(t.formModel,"tarif_menit_pertama",e)},expression:"formModel.tarif_menit_pertama"}})],1),t._v(" "),e("div",{staticClass:"flex"},[e("el-input",{staticClass:"mr-2",staticStyle:{width:"250px"},attrs:{type:"number",placeholder:"Menit Selanjutnya"},model:{value:t.formModel.menit_selanjutnya,callback:function(e){t.$set(t.formModel,"menit_selanjutnya",e)},expression:"formModel.menit_selanjutnya"}}),t._v(" "),e("el-input",{attrs:{type:"number",placeholder:"Tarif ".concat(t.formModel.menit_selanjutnya," menit selanjutnya (Rp)")},model:{value:t.formModel.tarif_menit_selanjutnya,callback:function(e){t.$set(t.formModel,"tarif_menit_selanjutnya",e)},expression:"formModel.tarif_menit_selanjutnya"}})],1)])],1),t._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),e("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:t.save}},[t._v("\n\t\t\t\tSIMPAN\n\t\t\t")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);