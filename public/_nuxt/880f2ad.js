(window.webpackJsonp=window.webpackJsonp||[]).push([[37,4,11,13,14],{451:function(t,n,r){"use strict";r(33),r(25),r(32),r(44),r(24),r(45);var o=r(17);r(13),r(51);function l(data){return"[object Array]"===Object.prototype.toString.call(data)}function c(t,e){if(!t)throw new Error(e)}function f(data){return Object.keys(data)}function d(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function h(t,e,n){var r="."+e,o=new RegExp("(\\"+e+")?$");return n(t).replace(o,r)}function m(content,t,e,n){void 0===e&&(e="download"),void 0===n&&(n=!0);var r=function(content,t,e){switch(t){case"txt":var n="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"css":return n="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"html":return n="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"json":return n="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"csv":return n="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"xls":return n="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);case"xml":return n="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:n})):"data:,"+n+encodeURIComponent(content);default:return""}}(content,t,n),o=document.createElement("a");o.href=r,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var v,y=function(){return(y=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},w=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)l.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return l};function x(data){return data.map(d).reduce((function(t,e,n){return e.reduce((function(map,t){var e=w(t,2),r=e[0],o=e[1],l=map[r]||Array.from({length:data.length}).map((function(t){return""}));return l[n]=("string"!=typeof o?JSON.stringify(o):o)||"",map[r]=l,map}),t)}),Object.create(null))}function _(t,e){return void 0===e&&(e=function(i){return i}),e(d(t).map((function(t){var e=w(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function k(data,t){return void 0===t&&(t=function(i){return i}),data.length?'<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){c(data.length>0);var e=_(x(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,n){return""+t+e[n]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n":""}function O(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+D(data,"base")+"\n"}function D(data,t,e,n){void 0===e&&(e="element"),void 0===n&&(n=0);var r,o=(r=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),r.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),c=function(t){return Array(t+1).join(" ")}(n);return null==data?c+"<"+o+" />":c+"<"+o+">\n"+(l(data)?data.map((function(t){return D(t,e,e,n+2)})).join("\n"):"object"==typeof data?d(data).map((function(t){var r=w(t,2),o=r[0];return D(r[1],o,e,n+2)})).join("\n"):c+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+c+"</"+o+">"}function S(t){var data=t.data,e=t.fileName,n=void 0===e?"download":e,r=t.extension,o=t.fileNameFormatter,v=void 0===o?function(t){return t.replace(/\s+/,"_")}:o,D=t.fields,S=t.exportType,j=void 0===S?"txt":S,C=t.replacer,z=void 0===C?null:C,$=t.space,N=void 0===$?4:$,M=t.processor,L=void 0===M?m:M,U=t.withBOM,R=void 0!==U&&U,E=t.delimiter,A=void 0===E?",":E,P=t.beforeTableEncode,I=void 0===P?function(i){return i}:P,T="Invalid export data. Please provide an array of object",H="Can't export unknown data type "+j+".",Y="Can't export string data to "+j+".";if("string"==typeof data)switch(j){case"txt":case"css":case"html":return L(data,j,h(n,null!=r?r:j,v));default:throw new Error(Y)}var F=function(t){if(!t||l(t)&&!t.length||!l(t)&&!f(t).length)return function(t){return t};var e=l(t)?t.reduce((function(map,t){var e;return y(y({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return l(t)?t.map((function(i){return d(i).reduce((function(map,t){var n=w(t,2),r=n[0],o=n[1];return r in e&&(map[e[r]]=o),map}),Object.create(null))})).filter((function(i){return f(i).length})):d(t).reduce((function(map,t){var n=w(t,2),r=n[0],o=n[1];return r in e&&(map[e[r]]=o),map}),Object.create(null))}}(D)(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),B=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(F,z,N);switch(j){case"txt":case"css":case"html":return L(B,j,h(n,null!=r?r:j,v));case"json":return L(B,j,h(n,null!=r?r:"json",v));case"csv":c(l(F),T);var J=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var n=_(x(data),e);return n.map((function(t){return t.fieldName})).join(t)+"\r\n"+n.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,n){return e.map((function(e,r){return""+e+t+n[r]}))})).join("\r\n")}(F,A,I);return L(R?"\ufeff"+J:J,j,h(n,null!=r?r:"csv",v));case"xls":return c(l(F),T),L(k(F,I),j,h(n,null!=r?r:"xls",v));case"xml":return L(O(F),j,h(n,null!=r?r:"xml",v));default:throw new Error(H)}}(v=S||(S={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},v.processors={downloadFile:m};var j=S;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function z(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}n.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,n=t.order;e==this.sort_prop&&n==this.sort_order||(this.sort_order="ascending"==n?"asc":"descending"==n?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=z(z({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=z({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var n=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){n.$axios.$delete("".concat(n.url,"/").concat(t)).then((function(t){n.requestData(),n.afterDelete(),n.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=z({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var n=e.meta,r=n.from,o=n.to,l=n.total;t.tableData=z(z({},t.tableData),{},{from:r,to:o,total:l})}})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,n=z(z({sort_prop:this.sort_prop,sort_order:this.sort_order},this.filters),{},{action:"export"});this.loading=!0,this.$axios.$get(this.url,{params:n}).then((function(data){return j({data:data,fileName:t,exportType:"xls"})})).catch((function(t){return console.log(t)})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},488:function(t,e,n){var content=n(510);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(97).default)("0bb9850c",content,!0,{sourceMap:!1})},489:function(t,e,n){var content=n(512);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(97).default)("69886363",content,!0,{sourceMap:!1})},509:function(t,e,n){"use strict";n(488)},510:function(t,e,n){var r=n(96)(!1);r.push([t.i,".file-browser[data-v-1afcc26a]{padding:15px;border:1px solid #ddd;width:400px;height:calc(100vh - 270px);overflow:auto;flex-shrink:0}.img-container[data-v-1afcc26a]{flex-grow:1;padding:15px}",""]),t.exports=r},511:function(t,e,n){"use strict";n(489)},512:function(t,e,n){var r=n(96)(!1);r.push([t.i,".log-container[data-v-fb90873c]{height:calc(100vh - 290px);background:#000;color:#fff;padding:15px;font-family:monospace;font-size:.9em;overflow:auto}",""]),t.exports=r},570:function(t,e,n){"use strict";n.r(e);n(24);var r={data:function(){return{url:"",show:!0,checkedNodes:[],expandedNodes:[],props:{label:"label",isLeaf:"isFile"}}},methods:{loadNode:function(t,e){var n={directory:void 0===t.data?"snapshots":t.data.path};this.$axios.$get("/api/snapshot",{params:n}).then((function(t){return e(t)}))},deleteSnapshot:function(){var t=this;this.$confirm("Anda yakin?","Konfirmasi",{type:"warning"}).then((function(){t.$axios.$post("/api/snapshot/delete",{checkedNodes:t.checkedNodes}).then((function(e){t.url="",t.$message({message:e.message,type:"success"}),t.checkedNodes.forEach((function(e){return t.$refs.tree.remove(e)})),t.checkedNodes=[]}))})).catch((function(t){return console.log(t)}))},refresh:function(){var t=this;this.show=!1,this.$nextTick((function(){return t.show=!0}))}}},o=(n(509),n(37)),component=Object(o.a)(r,(function(){var t=this,e=this,n=e.$createElement,r=e._self._c||n;return r("div",[r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete",disabled:0==e.checkedNodes.length},on:{click:e.deleteSnapshot}},[e._v("HAPUS SNAPSHOT")])],1),e._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",plain:"",size:"small"},on:{click:e.refresh}})],1)],1),e._v(" "),r("div",{staticStyle:{display:"flex"}},[r("div",{staticClass:"file-browser"},[e.show?r("el-tree",{ref:"tree",attrs:{props:e.props,load:e.loadNode,lazy:"","show-checkbox":"","highlight-current":"","node-key":"path"},on:{"node-click":function(e){var n=e.isFile,r=e.url;return t.url=n?r:""},check:function(t,n){return e.checkedNodes=n.checkedNodes}}}):e._e()],1),e._v(" "),r("div",{staticClass:"img-container"},[r("img",{staticStyle:{width:"100%"},attrs:{src:e.url,alt:""}})])])],1)}),[],!1,null,"1afcc26a",null);e.default=component.exports},571:function(t,e,n){"use strict";n.r(e);var r={mixins:[n(451).a],props:["date"],watch:{range:function(t){this.requestData()}},data:function(){return{url:"/api/absensiOperator"}}},o=n(37),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[n("el-form-item",[n("el-date-picker",{staticStyle:{"margin-top":"5px"},attrs:{size:"small",format:"dd-MMM-yyyy","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai"},on:{change:t.searchData},model:{value:t.filters.date,callback:function(e){t.$set(t.filters,"date",e)},expression:"filters.date"}})],1),t._v(" "),n("el-form-item",[n("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:""},on:{change:t.searchData},model:{value:t.filters.keyword,callback:function(e){t.$set(t.filters,"keyword",e)},expression:"filters.keyword"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{icon:"el-icon-refresh",size:"small",type:"primary"},on:{click:t.refreshData}})],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"sort-change":t.sortChange}},[n("el-table-column",{attrs:{prop:"created_at",label:"Tanggal",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v("\n\t\t\t\t"+t._s(t.$moment(n.created_at).format("DD/MMM/YY"))+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"user.name",label:"User","show-overflow-tooltip":"","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v("\n\t\t\t\t"+t._s(n.user.name)+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"login",label:"Login",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v("\n\t\t\t\t"+t._s(t.$moment(n.login).format("DD/MMM/YY HH:mm:ss"))+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"logout",label:"Logout",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[t._v("\n\t\t\t\t"+t._s(n.logout?t.$moment(n.logout).format("DD/MMM/YY HH:mm:ss"):"")+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"durasi",label:"Durasi","show-overflow-tooltip":"","min-width":"150px"}})],1),t._v(" "),n("br"),t._v(" "),n("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}})],1)}),[],!1,null,null,null);e.default=component.exports},572:function(t,n,r){"use strict";r.r(n);var o={mixins:[r(451).a],props:["range"],watch:{range:function(t){this.requestData()}},data:function(){return{url:"/api/userLog"}},methods:{clearLog:function(){var t=this;this.$confirm("Anda yakin akan menghapus semua log?","Peringatan",{type:"warning"}).then((function(){t.$axios.$delete("/api/userLog").then((function(e){t.requestData(),t.$message({message:e.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))}}},l=r(37),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[n("el-form-item",[n("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete"},on:{click:t.clearLog}},[t._v("HAPUS LOG")])],1),t._v(" "),n("el-form-item",[n("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:""},on:{change:function(e){t.keyword=e,t.requestData()}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"sort-change":t.sortChange}},[n("el-table-column",{attrs:{prop:"created_at",label:"Tanggal",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t.$moment(e.row.created_at).format("DD-MM-YYYY HH:mm:ss"))+"\n\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"user",label:"User",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),n("el-table-column",{attrs:{prop:"action",label:"Aksi",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}})],1),t._v(" "),n("br"),t._v(" "),n("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}})],1)}),[],!1,null,null,null);n.default=component.exports},573:function(t,e,n){"use strict";n.r(e);n(82);var r={props:["url"],data:function(){return{log:"",requestInterval:null,keyword:null}},methods:{getLog:function(){var t=this,e={keyword:this.keyword};this.$axios.$get(this.url,{params:e}).then((function(e){return t.log=e})).catch((function(t){return console.log(t)}))}},mounted:function(){this.requestInterval=setInterval(this.getLog,2e3)},destroyed:function(){clearInterval(this.requestInterval)}},o=(n(511),n(37)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-form",{staticClass:"text-right",attrs:{inline:""}},[n("el-form-item",[n("el-input",{attrs:{size:"small",autofocus:"",placeholder:"Cari log","prefix-icon":"el-icon-search",clearable:""},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),n("div",{staticClass:"log-container",domProps:{innerHTML:t._s(t.log)}})],1)}),[],!1,null,"fb90873c",null);e.default=component.exports},604:function(t,n,r){"use strict";r.r(n);var o={mixins:[r(451).a],data:function(){return{url:"/api/notification"}},methods:{clearNotification:function(){var t=this;this.$confirm("Anda yakin akan menghapus semua notifikasi?","Warning",{type:"warning"}).then((function(){t.$axios.$delete("".concat(t.url,"/clearNotification")).then((function(e){t.requestData(),t.$message({message:e.message,type:"success"})}))})).catch((function(){return console.log(e)}))}}},l=r(37),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",[n("el-tabs",[n("el-tab-pane",{attrs:{label:"NOTIFIKASI"}},[n("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[n("el-form-item",[n("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-delete"},on:{click:t.clearNotification}},[t._v("HAPUS NOTIFIKASI")])],1),t._v(" "),n("el-form-item",[n("el-date-picker",{staticStyle:{"margin-top":"5px",width:"250px"},attrs:{size:"small",format:"dd/MMM/yyyy","value-format":"yyyy-MM-dd",type:"daterange","range-separator":"-","start-placeholder":"Dari tgl","end-placeholder":"Sampai tgl"},on:{change:t.requestData},model:{value:t.filters.dateRange,callback:function(e){t.$set(t.filters,"dateRange",e)},expression:"filters.dateRange"}})],1),t._v(" "),n("el-form-item",[n("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:""},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{stripe:"",data:t.tableData.data,height:"calc(100vh - 315px)"},on:{"sort-change":t.sortChange}},[n("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),n("el-table-column",{attrs:{prop:"created_at",label:"Time",sortable:"custom",width:"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(t.$moment(e.row.created_at).format("DD-MM-YYYY HH:mm:ss"))+"\n\t\t\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"Message","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(JSON.parse(e.row.data).message)+"\n\t\t\t\t\t")]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"70px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"small",type:"text",plain:"",icon:"el-icon-delete"},on:{click:function(n){return t.deleteData(e.row.id)}}})]}}])},[n("template",{slot:"header"},[n("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),n("br"),t._v(" "),n("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}})],1),t._v(" "),n("el-tab-pane",{attrs:{lazy:"",label:"SNAPSHOT"}},[n("NotificationSnapshot")],1),t._v(" "),n("el-tab-pane",{attrs:{lazy:"",label:"ABSENSI OPERATOR"}},[n("AbsensiOperator",{attrs:{date:t.filters.dateRange}})],1),t._v(" "),n("el-tab-pane",{attrs:{lazy:"",label:"LOG USER"}},[n("NotificationUserLog",{attrs:{range:t.filters.dateRange}})],1),t._v(" "),n("el-tab-pane",{attrs:{lazy:"",label:"LOG GATE MASUK"}},[n("NotificationControllerLog",{attrs:{url:"/api/controller-log"}})],1),t._v(" "),n("el-tab-pane",{attrs:{lazy:"",label:"LOG GATE KELUAR"}},[n("NotificationControllerLog",{attrs:{url:"/api/uhf-log"}})],1)],1)],1)}),[],!1,null,null,null);n.default=component.exports;installComponents(component,{NotificationSnapshot:r(570).default,AbsensiOperator:r(571).default,NotificationUserLog:r(572).default,NotificationControllerLog:r(573).default})}}]);