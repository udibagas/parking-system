(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{537:function(t,r,n){"use strict";n(39),n(31),n(38),n(51),n(30),n(52);var o=n(19);n(14),n(58);function l(data){return"[object Array]"===Object.prototype.toString.call(data)}function c(t,e){if(!t)throw new Error(e)}function f(data){return Object.keys(data)}function d(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function h(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function m(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var v,w=function(){return w=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},w.apply(this,arguments)},y=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)l.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return l};function x(data){return data.map(d).reduce((function(t,e,r){return e.reduce((function(map,t){var e=y(t,2),n=e[0],o=e[1],l=map[n]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=l,map}),t)}),Object.create(null))}function O(t,e){return void 0===e&&(e=function(i){return i}),e(d(t).map((function(t){var e=y(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function j(data,t){if(void 0===t&&(t=function(i){return i}),!data.length)return"";var content='<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){c(data.length>0);var e=O(x(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n";return content}function _(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+D(data,"base")+"\n"}function D(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var n,o=(n=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),n.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),c=function(t){return Array(t+1).join(" ")}(r);return null==data?c+"<"+o+" />":c+"<"+o+">\n"+(l(data)?data.map((function(t){return D(t,e,e,r+2)})).join("\n"):"object"==typeof data?d(data).map((function(t){var n=y(t,2),o=n[0];return D(n[1],o,e,r+2)})).join("\n"):c+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+c+"</"+o+">"}function S(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,n=t.extension,o=t.fileNameFormatter,v=void 0===o?function(t){return t.replace(/\s+/,"_")}:o,D=t.fields,S=t.exportType,C=void 0===S?"txt":S,k=t.replacer,R=void 0===k?null:k,U=t.space,E=void 0===U?4:U,M=t.processor,L=void 0===M?m:M,P=t.withBOM,z=void 0!==P&&P,N=t.delimiter,$=void 0===N?",":N,I=t.beforeTableEncode,F=void 0===I?function(i){return i}:I,T="Invalid export data. Please provide an array of object",A="Can't export unknown data type "+C+".",B="Can't export string data to "+C+".";if("string"==typeof data)switch(C){case"txt":case"css":case"html":return L(data,C,h(r,null!=n?n:C,v));default:throw new Error(B)}var H=function(t){if(!t||l(t)&&!t.length||!l(t)&&!f(t).length)return function(t){return t};var e=l(t)?t.reduce((function(map,t){var e;return w(w({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return l(t)?t.map((function(i){return d(i).reduce((function(map,t){var r=y(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return f(i).length})):d(t).reduce((function(map,t){var r=y(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(D),J=H(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),Y=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(J,R,E);switch(C){case"txt":case"css":case"html":return L(Y,C,h(r,null!=n?n:C,v));case"json":return L(Y,C,h(r,null!=n?n:"json",v));case"csv":c(l(J),T);var V=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=O(x(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(J,$,F);return L(z?"\ufeff"+V:V,C,h(r,null!=n?n:"csv",v));case"xls":return c(l(J),T),L(j(J,F),C,h(r,null!=n?n:"xls",v));case"xml":return L(_(J),C,h(r,null!=n?n:"xml",v));default:throw new Error(A)}}(v=S||(S={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},v.processors={downloadFile:m};var C=S;function k(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function R(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?k(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=R(R({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=R({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=R({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData=R(R({},t.tableData),{},{from:n,to:o,total:l})}})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=R(R({sort_prop:this.sort_prop,sort_order:this.sort_order},this.filters),{},{action:"export"});this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return C({data:data,fileName:t,exportType:"xls"})})).catch((function(t){return console.log(t)})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},665:function(t,e,r){"use strict";r.r(e);var n={mixins:[r(537).a],props:["range"],watch:{range:function(t){this.requestData()}},data:function(){return{url:"/api/manualOpenLog",showSnapshot:!1,snapshots:[]}}},o=r(46),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[e("el-form-item",[e("el-date-picker",{staticStyle:{"margin-top":"5px"},attrs:{size:"small",format:"dd-MMM-yyyy HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai"},on:{change:t.requestData},model:{value:t.filters.dateRange,callback:function(e){t.$set(t.filters,"dateRange",e)},expression:"filters.dateRange"}})],1),t._v(" "),e("el-form-item",[e("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:""},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"row-dblclick":function(e,r,n){t.snapshots=e.snapshots,t.showSnapshot=!0},"sort-change":t.sortChange}},[e("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),e("el-table-column",{attrs:{prop:"created_at",label:"Tanggal",sortable:"custom","show-overflow-tooltip":"",width:"180px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.created_at).format("DD-MMM-YYYY HH:mm:ss"))+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"gate_out.nama",label:"Gate Out","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),e("el-table-column",{attrs:{prop:"user.name",label:"Operator","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),e("el-table-column",{attrs:{prop:"alasan",label:"Alasan",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),e("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(r){return[e("el-dropdown",[e("span",{staticClass:"el-dropdown-link"},[e("i",{staticClass:"el-icon-more"})]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{icon:"el-icon-camera"},nativeOn:{click:function(e){return e.preventDefault(),function(){t.snapshots=r.row.snapshots,t.showSnapshot=!0}.apply(null,arguments)}}},[t._v("Lihat Snapshot")])],1)],1)]}}])},[e("template",{slot:"header"},[e("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),e("br"),t._v(" "),e("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),e("el-dialog",{attrs:{center:"",visible:t.showSnapshot,title:"SNAPSHOT"},on:{"update:visible":function(e){t.showSnapshot=e}}},t._l(t.snapshots,(function(t,i){return e("el-image",{key:i,staticStyle:{width:"100%",height:"100%"},attrs:{src:t.url,fit:"cover"}},[e("div",{staticClass:"el-image__error",attrs:{slot:"error"},slot:"error"},[e("i",{staticClass:"el-icon-picture-outline"})])])})),1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);