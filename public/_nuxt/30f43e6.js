(window.webpackJsonp=window.webpackJsonp||[]).push([[10,16],{451:function(t,r,n){"use strict";n(33),n(25),n(32),n(44),n(24),n(45);var o=n(17);n(13),n(51);function l(data){return"[object Array]"===Object.prototype.toString.call(data)}function c(t,e){if(!t)throw new Error(e)}function d(data){return Object.keys(data)}function f(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function m(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function h(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var v,y=function(){return(y=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},_=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)l.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return l};function w(data){return data.map(f).reduce((function(t,e,r){return e.reduce((function(map,t){var e=_(t,2),n=e[0],o=e[1],l=map[n]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=l,map}),t)}),Object.create(null))}function O(t,e){return void 0===e&&(e=function(i){return i}),e(f(t).map((function(t){var e=_(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function j(data,t){return void 0===t&&(t=function(i){return i}),data.length?'<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){c(data.length>0);var e=O(w(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n":""}function x(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+D(data,"base")+"\n"}function D(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var n,o=(n=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),n.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),c=function(t){return Array(t+1).join(" ")}(r);return null==data?c+"<"+o+" />":c+"<"+o+">\n"+(l(data)?data.map((function(t){return D(t,e,e,r+2)})).join("\n"):"object"==typeof data?f(data).map((function(t){var n=_(t,2),o=n[0];return D(n[1],o,e,r+2)})).join("\n"):c+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+c+"</"+o+">"}function k(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,n=t.extension,o=t.fileNameFormatter,v=void 0===o?function(t){return t.replace(/\s+/,"_")}:o,D=t.fields,k=t.exportType,M=void 0===k?"txt":k,P=t.replacer,E=void 0===P?null:P,S=t.space,C=void 0===S?4:S,$=t.processor,R=void 0===$?h:$,A=t.withBOM,N=void 0!==A&&A,T=t.delimiter,U=void 0===T?",":T,Y=t.beforeTableEncode,L=void 0===Y?function(i){return i}:Y,I="Invalid export data. Please provide an array of object",z="Can't export unknown data type "+M+".",F="Can't export string data to "+M+".";if("string"==typeof data)switch(M){case"txt":case"css":case"html":return R(data,M,m(r,null!=n?n:M,v));default:throw new Error(F)}var B=function(t){if(!t||l(t)&&!t.length||!l(t)&&!d(t).length)return function(t){return t};var e=l(t)?t.reduce((function(map,t){var e;return y(y({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return l(t)?t.map((function(i){return f(i).reduce((function(map,t){var r=_(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return d(i).length})):f(t).reduce((function(map,t){var r=_(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(D)(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),J=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(B,E,C);switch(M){case"txt":case"css":case"html":return R(J,M,m(r,null!=n?n:M,v));case"json":return R(J,M,m(r,null!=n?n:"json",v));case"csv":c(l(B),I);var G=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=O(w(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(B,U,L);return R(N?"\ufeff"+G:G,M,m(r,null!=n?n:"csv",v));case"xls":return c(l(B),I),R(j(B,L),M,m(r,null!=n?n:"xls",v));case"xml":return R(x(B),M,m(r,null!=n?n:"xml",v));default:throw new Error(z)}}(v=k||(k={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},v.processors={downloadFile:h};var M=k;function P(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function E(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?P(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):P(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=E(E({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=E({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=E({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData=E(E({},t.tableData),{},{from:n,to:o,total:l})}})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=E(E({sort_prop:this.sort_prop,sort_order:this.sort_order},this.filters),{},{action:"export"});this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return M({data:data,fileName:t,exportType:"xls"})})).catch((function(t){return console.log(t)})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},475:function(t,e,r){"use strict";r.r(e);r(33),r(25),r(32),r(44),r(24),r(45);var n=r(17),o=r(59);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var c={props:["show"],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)(["printerList"])),data:function(){return{printer_id:null}},mounted:function(){this.$store.dispatch("getPrinterList")}},d=r(37),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{center:"",title:"PILIH PRINTER",visible:t.show,width:"500px","before-close":function(e){t.$emit("close")}},on:{"update:visible":function(e){t.show=e}}},[r("el-form",[r("el-form-item",[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Pilih Printer"},model:{value:t.printer_id,callback:function(e){t.printer_id=e},expression:"printer_id"}},t._l(t.printerList,(function(p){return r("el-option",{key:p.id,attrs:{value:p.id,label:p.nama}})})),1)],1)],1),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:function(e){return t.$emit("close")}}},[t._v("\n\t\t\tBATAL\n\t\t")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-printer",type:"primary",disabled:!t.printer_id},on:{click:function(e){return t.$emit("print",t.printer_id)}}},[t._v("\n\t\t\tCETAK STRUK\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},614:function(t,e,r){"use strict";r.r(e);r(33),r(25),r(32),r(44),r(24),r(45);var n=r(17),o=(r(13),r(51),r(451)),l=r(59);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var d={mixins:[o.a],data:function(){return{url:"/api/memberRenewal",showPrintDialog:!1,selectedData:{}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({sampai_tanggal:function(){try{return this.$moment(this.formModel.dari_tanggal,"YYYY-MM-DD").add(this.formModel.siklus_pembayaran,this.formModel.siklus_pembayaran_unit).format("YYYY-MM-DD")}catch(t){return""}}},Object(l.b)(["memberList"])),methods:{submit:function(){this.formModel.sampai_tanggal=this.sampai_tanggal,this.save()},printSlip:function(t){var e=this;this.$axios.$post("".concat(this.url,"/printSlip/").concat(this.selectedData.id),{printer_id:t}).then((function(t){e.$message({message:t.message,type:"success"})})).finally((function(){e.showPrintDialog=!1}))}}},f=r(37),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",[r("el-button",{attrs:{icon:"el-icon-plus",size:"small",type:"primary"},on:{click:function(e){return t.openForm({})}}},[t._v("\n\t\t\t\tINPUT PEMBAYARAN KEANGGOTAAN\n\t\t\t")])],1),t._v(" "),r("el-form-item",[r("el-date-picker",{staticStyle:{"margin-top":"5px",width:"250px"},attrs:{size:"small",format:"dd/MMM/yyyy","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"Dari tgl","end-placeholder":"Sampai tgl"},on:{change:t.requestData},model:{value:t.filters.dateRange,callback:function(e){t.$set(t.filters,"dateRange",e)},expression:"filters.dateRange"}})],1),t._v(" "),r("el-form-item",[r("el-input",{staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:""},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),r("el-table-column",{attrs:{prop:"created_at",label:"Tanggal Trx",sortable:"custom","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.created_at).format("DD-MMM-YYYY HH:mm:ss"))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"nama_member",label:"Nama",sortable:"custom","show-overflow-tooltip":"","min-width":"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nomor_kartu",label:"Nomor Kartu",sortable:"custom","min-width":"130"}}),t._v(" "),r("el-table-column",{attrs:{prop:"dari_tanggal",label:"Dari Tanggal",width:"150px",sortable:"custom",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.dari_tanggal).format("DD-MMM-YYYY"))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"sampai_tanggal",label:"Sampai Tanggal",width:"160px",sortable:"custom",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.sampai_tanggal).format("DD-MMM-YYYY"))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"jumlah",label:"Jumlah",sortable:"custom",align:"right","header-align":"right","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(e.row.jumlah))+"\n\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"operator",label:"Operator",sortable:"custom","min-width":"120"}}),t._v(" "),r("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-printer"},nativeOn:{click:function(r){return r.preventDefault(),function(){t.selectedData=e.row,t.showPrintDialog=!0}.apply(null,arguments)}}},[t._v("Print Slip")]),t._v(" "),1==t.$auth.user.role?r("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("Edit")]):t._e(),t._v(" "),1==t.$auth.user.role?r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("Hapus")]):t._e()],1)],1)]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{visible:t.showForm,title:t.formModel.id?"EDIT PEMBAYARAN KEANGGOTAAN":"INPUT PEMBAYARAN KEANGGOTAAN","close-on-click-modal":!1},on:{"update:visible":function(e){t.showForm=e}}},[r("el-form",{attrs:{"label-width":"180px","label-position":"left"}},[r("el-form-item",{class:t.formErrors.member_id?"is-error":"",attrs:{label:"Member"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"","default-first-option":"",clearable:"",placeholder:"Member"},model:{value:t.formModel.member_id,callback:function(e){t.$set(t.formModel,"member_id",e)},expression:"formModel.member_id"}},t._l(t.memberList.filter((function(t){return t.berbayar})),(function(t,i){return r("el-option",{key:i,attrs:{value:t.id,label:t.nomor_kartu+" - "+t.nama}})})),1),t._v(" "),t.formErrors.member_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.member_id[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.siklus_pembayaran?"is-error":"",attrs:{label:"Siklus Pembayaran"}},[r("el-input",{staticStyle:{width:"30%"},attrs:{type:"number"},model:{value:t.formModel.siklus_pembayaran,callback:function(e){t.$set(t.formModel,"siklus_pembayaran",e)},expression:"formModel.siklus_pembayaran"}}),t._v(" "),r("el-select",{staticStyle:{width:"66%",float:"right",clear:"right"},attrs:{placeholder:"Pilih"},model:{value:t.formModel.siklus_pembayaran_unit,callback:function(e){t.$set(t.formModel,"siklus_pembayaran_unit",e)},expression:"formModel.siklus_pembayaran_unit"}},t._l(t.$store.state.siklus,(function(s,i){return r("el-option",{key:i,attrs:{value:s.value,label:s.label}})})),1),t._v(" "),t.formErrors.siklus_pembayaran?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.siklus_pembayaran[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.dari_tanggal?"is-error":"",attrs:{label:"Dari Tanggal"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{format:"dd-MMM-yyyy","value-format":"yyyy-MM-dd",placeholder:"Dari Tanggal"},model:{value:t.formModel.dari_tanggal,callback:function(e){t.$set(t.formModel,"dari_tanggal",e)},expression:"formModel.dari_tanggal"}}),t._v(" "),t.formErrors.dari_tanggal?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.dari_tanggal[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.sampai_tanggal?"is-error":"",attrs:{label:"Sampai Tanggal"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{disabled:"",format:"dd-MMM-yyyy","value-format":"yyyy-MM-dd",placeholder:"Sampai Tanggal"},model:{value:t.sampai_tanggal,callback:function(e){t.sampai_tanggal=e},expression:"sampai_tanggal"}}),t._v(" "),t.formErrors.sampai_tanggal?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.sampai_tanggal[0])+"\n\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.jumlah?"is-error":"",attrs:{label:"Jumlah"}},[r("el-input",{attrs:{type:"number",placeholder:"Jumlah"},model:{value:t.formModel.jumlah,callback:function(e){t.$set(t.formModel,"jumlah",e)},expression:"formModel.jumlah"}}),t._v(" "),t.formErrors.jumlah?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t"+t._s(t.formErrors.jumlah[0])+"\n\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),r("el-button",{attrs:{icon:"el-icon-success",type:"primary"},on:{click:t.submit}},[t._v("\n\t\t\t\tSIMPAN\n\t\t\t")])],1)],1),t._v(" "),r("PrintDialog",{attrs:{show:t.showPrintDialog},on:{print:function(e){return t.printSlip(e)},close:function(e){t.showPrintDialog=!1}}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{PrintDialog:r(475).default})}}]);