(window.webpackJsonp=window.webpackJsonp||[]).push([[1,29,31],{537:function(t,r,n){"use strict";n(39),n(31),n(38),n(51),n(30),n(52);var o=n(19);n(14),n(58);function l(data){return"[object Array]"===Object.prototype.toString.call(data)}function c(t,e){if(!t)throw new Error(e)}function d(data){return Object.keys(data)}function m(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function f(t,e,r){var n="."+e,o=new RegExp("(\\"+e+")?$");return r(t).replace(o,n)}function _(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var n=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),o=document.createElement("a");o.href=n,o.download=e,o.setAttribute("style","visibility:hidden"),document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(o)}var h,v=function(){return v=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},v.apply(this,arguments)},y=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)l.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return l};function w(data){return data.map(m).reduce((function(t,e,r){return e.reduce((function(map,t){var e=y(t,2),n=e[0],o=e[1],l=map[n]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof o?JSON.stringify(o):o)||"",map[n]=l,map}),t)}),Object.create(null))}function x(t,e){return void 0===e&&(e=function(i){return i}),e(m(t).map((function(t){var e=y(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function O(data,t){if(void 0===t&&(t=function(i){return i}),!data.length)return"";var content='<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){c(data.length>0);var e=x(w(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n";return content}function k(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+j(data,"base")+"\n"}function j(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var n,o=(n=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),n.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),c=function(t){return Array(t+1).join(" ")}(r);return null==data?c+"<"+o+" />":c+"<"+o+">\n"+(l(data)?data.map((function(t){return j(t,e,e,r+2)})).join("\n"):"object"==typeof data?m(data).map((function(t){var n=y(t,2),o=n[0];return j(n[1],o,e,r+2)})).join("\n"):c+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+c+"</"+o+">"}function M(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,n=t.extension,o=t.fileNameFormatter,h=void 0===o?function(t){return t.replace(/\s+/,"_")}:o,j=t.fields,M=t.exportType,D=void 0===M?"txt":M,S=t.replacer,C=void 0===S?null:S,E=t.space,$=void 0===E?4:E,P=t.processor,T=void 0===P?_:P,A=t.withBOM,R=void 0!==A&&A,L=t.delimiter,K=void 0===L?",":L,I=t.beforeTableEncode,N=void 0===I?function(i){return i}:I,U="Invalid export data. Please provide an array of object",Y="Can't export unknown data type "+D+".",H="Can't export string data to "+D+".";if("string"==typeof data)switch(D){case"txt":case"css":case"html":return T(data,D,f(r,null!=n?n:D,h));default:throw new Error(H)}var F=function(t){if(!t||l(t)&&!t.length||!l(t)&&!d(t).length)return function(t){return t};var e=l(t)?t.reduce((function(map,t){var e;return v(v({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return l(t)?t.map((function(i){return m(i).reduce((function(map,t){var r=y(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))})).filter((function(i){return d(i).length})):m(t).reduce((function(map,t){var r=y(t,2),n=r[0],o=r[1];return n in e&&(map[e[n]]=o),map}),Object.create(null))}}(j),z=F(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),J=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(z,C,$);switch(D){case"txt":case"css":case"html":return T(J,D,f(r,null!=n?n:D,h));case"json":return T(J,D,f(r,null!=n?n:"json",h));case"csv":c(l(z),U);var B=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=x(w(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,n){return""+e+t+r[n]}))})).join("\r\n")}(z,K,N);return T(R?"\ufeff"+B:B,D,f(r,null!=n?n:"csv",h));case"xls":return c(l(z),U),T(O(z,N),D,f(r,null!=n?n:"xls",h));case"xml":return T(k(z),D,f(r,null!=n?n:"xml",h));default:throw new Error(Y)}}(h=M||(M={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},h.processors={downloadFile:_};var D=M;function S(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function C(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?S(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=C(C({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=C({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(){this.page=1,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=C({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,n=r.from,o=r.to,l=r.total;t.tableData=C(C({},t.tableData),{},{from:n,to:o,total:l})}})).finally((function(){return t.loading=!1}))},exportData:function(t){var e=this,r=C(C({sort_prop:this.sort_prop,sort_order:this.sort_order},this.filters),{},{action:"export"});this.loading=!0,this.$axios.$get(this.url,{params:r}).then((function(data){return D({data:data,fileName:t,exportType:"xls"})})).catch((function(t){return console.log(t)})).finally((function(){return e.loading=!1}))}},mounted:function(){this.requestData()}}},541:function(t,e,r){"use strict";var n=r(2),o=r(100).find,l=r(223),c="find",d=!0;c in[]&&Array(1)[c]((function(){d=!1})),n({target:"Array",proto:!0,forced:d},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),l(c)},663:function(t,e,r){"use strict";r.r(e);r(39),r(31),r(38),r(14),r(51),r(30),r(52);var n=r(19),o=r(69);function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var c={props:["trx","show"],computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(o.b)(["setting"]))},d=c,m=r(46),component=Object(m.a)(d,(function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{width:"80%",visible:t.show,center:"",title:"DETAIL TRANSAKSI","before-close":function(e){t.$emit("close")}},on:{"update:visible":function(e){t.show=e}}},[e("div",{staticClass:"flex flex-row"},[e("table",{staticClass:"table-auto",staticStyle:{"min-width":"360px"}},[e("tbody",[e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1",staticStyle:{width:"150px"}},[t._v("\n\t\t\t\t\t\tNomor Barcode\n\t\t\t\t\t")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.nomor_barcode)+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("\n\t\t\t\t\t\tJenis Kendaraan\n\t\t\t\t\t")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.jenis_kendaraan)+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Plat Nomor")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v(t._s(t.trx.plat_nomor))])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Member")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.is_member?t.trx.member.nama:"Tidak")+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Nomor Kartu")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.nomor_kartu)+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Gate Masuk")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.gate_in?t.trx.gate_in.nama:"")+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Gate Keluar")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.gate_out?t.trx.gate_out.nama:"")+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Waktu Masuk")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.$moment(t.trx.time_in).format("DD-MMM-YYYY HH:mm:ss"))+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("\n\t\t\t\t\t\tWaktu Keluar\n\t\t\t\t\t")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\t"+t._s(t.trx.time_out?t.$moment(t.trx.time_out).format("DD-MMM-YYYY HH:mm:ss"):"")+"\n\t\t\t\t\t")])]),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Durasi")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v(t._s(t.trx.durasi))])]),t._v(" "),1==t.$auth.user.role?e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Tarif")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\tRp "+t._s(t.$decimal(t.trx.tarif))+"\n\t\t\t\t\t")])]):t._e(),t._v(" "),1==t.$auth.user.role?e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Denda")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v("\n\t\t\t\t\t\tRp "+t._s(t.$decimal(t.trx.denda))+"\n\t\t\t\t\t")])]):t._e(),t._v(" "),e("tr",[e("td",{staticClass:"border bg-blue-700 text-white px-4 py-1"},[t._v("Operator")]),t._v(" "),e("td",{staticClass:"border bg-blue-100 px-4 py-1"},[t._v(t._s(t.trx.operator))])])])]),t._v(" "),t.trx.snapshots?e("div",{class:{"ml-3":!0,"flex-grow":!0,flex:"POTRAIT"==t.setting.orientasi_kamera},staticStyle:{width:"100%"}},t._l(t.trx.snapshots,(function(t){return e("div",{key:t.id,staticClass:"mb-1",staticStyle:{width:"100%"}},[e("img",{staticStyle:{width:"100%"},attrs:{src:t.url}})])})),0):t._e()])])}),[],!1,null,null,null);e.default=component.exports},664:function(t,e,r){"use strict";r.r(e);r(31),r(38),r(51),r(30),r(52);var n=r(19),o=(r(14),r(541),r(123),r(39),r(69));function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var c={props:["show","model"],computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({formModel:function(){return this.model},durasi:function(){var t=this.$moment(this.formModel.time_in),e=this.$moment(this.formModel.time_out),r=this.$moment.duration(e.diff(t));return this.$moment.utc(r.asMilliseconds()).format("HH:mm:ss")}},Object(o.b)(["posList","gateOutList","gateInList","jenisKendaraanList"])),data:function(){return{formErrors:{},loading:!1}},methods:{closeForm:function(){this.formErrors={},this.$emit("close")},save:function(){var t=this;this.loading=!0,this.formModel.manual=1,this.$axios.$post("/api/parkingTransaction",this.formModel).then((function(e){t.$message({message:"Data berhasil disimpan",type:"success",showClose:!0}),t.closeForm(),t.$emit("reload"),t.openGate(t.formModel.gate_out_id)})).catch((function(e){422==e.response.status&&(t.formErrors=e.response.data.errors)})).finally((function(){return t.loading=!1}))},openGate:function(t){var e=this,r=this.posList.find((function(p){return p.id==e.formModel.pos_id})),n=this.gateOutList.find((function(g){return g.id==t})),o=new WebSocket("ws://".concat(r.ip_address,":5678/"));o.onerror=function(t){e.$message({message:"KONEKSI KE POS GAGAL",type:"error"})},o.onopen=function(t){o.send(["open",n.device,n.baudrate,n.open_command,n.close_command].join(";"))},o.onmessage=function(t){var data=JSON.parse(t.data);e.$message({message:data.message,type:data.status?"success":"error"}),o.close()}}}},d=c,m=r(46),component=Object(m.a)(d,(function(){var t=this,e=t._self._c;return e("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.formModel.id?"EDIT TRANSAKSI "+t.formModel.nomor_barcode:"TRANSAKSI MANUAL",visible:t.show,width:"800px","before-close":function(e){return t.closeForm()}},on:{"update:visible":function(e){t.show=e}}},[e("el-form",{attrs:{"label-position":"left","label-width":"150px"}},[e("el-row",{attrs:{gutter:30}},[e("el-col",{attrs:{span:12}},[e("el-form-item",{class:t.formErrors.plat_nomor?"is-error":"",attrs:{label:"Plat Nomor"}},[e("el-input",{attrs:{placeholder:"Plat Nomor"},model:{value:t.formModel.plat_nomor,callback:function(e){t.$set(t.formModel,"plat_nomor",e)},expression:"formModel.plat_nomor"}}),t._v(" "),t.formErrors.plat_nomor?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.plat_nomor[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.gate_in_id?"is-error":"",attrs:{label:"Gate Masuk"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Masuk"},model:{value:t.formModel.gate_in_id,callback:function(e){t.$set(t.formModel,"gate_in_id",e)},expression:"formModel.gate_in_id"}},t._l(t.gateInList,(function(g,i){return e("el-option",{key:i,attrs:{value:g.id,label:g.nama}})})),1),t._v(" "),t.formErrors.gate_in_id?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.gate_in_id[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.time_in?"is-error":"",attrs:{label:"Waktu Masuk"}},[e("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",format:"dd-MMM-yyyy HH:mm","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"Waktu Masuk"},model:{value:t.formModel.time_in,callback:function(e){t.$set(t.formModel,"time_in",e)},expression:"formModel.time_in"}}),t._v(" "),t.formErrors.time_in?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.time_in[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.tarif?"is-error":"",attrs:{label:"Tarif (Rp)"}},[e("el-input",{attrs:{type:"number",placeholder:"Tarif"},model:{value:t.formModel.tarif,callback:function(e){t.$set(t.formModel,"tarif",e)},expression:"formModel.tarif"}}),t._v(" "),t.formErrors.tarif?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.tarif[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.username?"is-error":"",attrs:{label:"User Admin"}},[e("el-input",{attrs:{placeholder:"User Admin"},model:{value:t.formModel.username,callback:function(e){t.$set(t.formModel,"username",e)},expression:"formModel.username"}}),t._v(" "),t.formErrors.username?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.username[0])+"\n\t\t\t\t\t")]):t._e()],1)],1),t._v(" "),e("el-col",{attrs:{span:12}},[e("el-form-item",{class:t.formErrors.jenis_kendaraan?"is-error":"",attrs:{label:"Jenis Kendaraan"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Jenis Kendaraan"},model:{value:t.formModel.jenis_kendaraan,callback:function(e){t.$set(t.formModel,"jenis_kendaraan",e)},expression:"formModel.jenis_kendaraan"}},t._l(t.jenisKendaraanList,(function(t,i){return e("el-option",{key:i,attrs:{value:t.nama,label:t.nama}})})),1),t._v(" "),t.formErrors.jenis_kendaraan?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.jenis_kendaraan[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.gate_out_id?"is-error":"",attrs:{label:"Gate Keluar"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Gate Keluar"},model:{value:t.formModel.gate_out_id,callback:function(e){t.$set(t.formModel,"gate_out_id",e)},expression:"formModel.gate_out_id"}},t._l(t.gateOutList,(function(g,i){return e("el-option",{key:i,attrs:{value:g.id,label:g.nama}})})),1),t._v(" "),t.formErrors.gate_out_id?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.gate_out_id[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.time_out?"is-error":"",attrs:{label:"Waktu Keluar"}},[e("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",autocomplete:!1,format:"dd-MMM-yyyy HH:mm","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"Waktu Keluar"},model:{value:t.formModel.time_out,callback:function(e){t.$set(t.formModel,"time_out",e)},expression:"formModel.time_out"}}),t._v(" "),t.formErrors.time_out?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.time_out[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.denda?"is-error":"",attrs:{label:"Denda (Rp)"}},[e("el-input",{attrs:{type:"number",placeholder:"Denda"},model:{value:t.formModel.denda,callback:function(e){t.$set(t.formModel,"denda",e)},expression:"formModel.denda"}}),t._v(" "),t.formErrors.denda?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.denda[0])+"\n\t\t\t\t\t")]):t._e()],1),t._v(" "),e("el-form-item",{class:t.formErrors.password?"is-error":"",attrs:{label:"Password Admin"}},[e("el-input",{attrs:{type:"password",placeholder:"Password Admin"},model:{value:t.formModel.password,callback:function(e){t.$set(t.formModel,"password",e)},expression:"formModel.password"}}),t._v(" "),t.formErrors.password?e("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t"+t._s(t.formErrors.password[0])+"\n\t\t\t\t\t")]):t._e()],1)],1)],1)],1),t._v(" "),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),e("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.save}},[t._v("\n\t\t\tSIMPAN\n\t\t")])],1)],1)}),[],!1,null,null,null);e.default=component.exports},684:function(t,r,n){"use strict";n.r(r);n(39),n(31),n(38),n(14),n(51),n(30),n(52);var o=n(19);n(53);function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var c=n(69);function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var m={mixins:[n(537).a],computed:function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},Object(c.b)(["jenisKendaraanList","gateInList","gateOutList","user","shiftList"])),created:function(){this.$store.dispatch("getShiftList")},data:function(){return{url:"/api/parkingTransaction",trx:null,showTrxDetail:!1,date:this.$moment().format("YYYY-MM-DD"),formModel:{},formErrors:{},showForm:!1,filters:{dateRange:null}}},methods:{setSudahKeluar:function(t){var r=this;this.$confirm("Anda yakin?","Confirm",{type:"warning"}).then((function(){r.$axios.$put("/api/parkingTransaction/setSudahKeluar/".concat(t)).then((function(t){r.$message({message:t.message,type:"success"}),r.requestData()}))})).catch((function(){return console.log(e)}))},setSudahKeluarSemua:function(){var t=this;this.$confirm("Anda yakin?","Confirm",{type:"warning"}).then((function(){t.$axios.$put("/api/parkingTransaction/setSudahKeluarSemua",{dateRange:t.filters.dateRange}).then((function(e){t.$message({message:e.message,type:"success"}),t.requestData()}))})).catch((function(t){return console.log(t)}))},printTicket:function(t){var e=this;this.$axios.post("/api/parkingTransaction/printTicketOut/".concat(t)).then((function(t){e.$message({message:t.message,type:"success"})}))}}},f=m,_=n(46),component=Object(_.a)(f,(function(){var t=this,e=t._self._c;return e("div",[e("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[e("el-form-item",[e("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(){t.formModel={},t.formErrors={},t.showForm=!0}}},[t._v("TRANSAKSI MANUAL")])],1),t._v(" "),e("el-form-item",[e("el-date-picker",{staticStyle:{"margin-top":"5px"},attrs:{size:"small",format:"dd-MMM-yyyy HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Dari","end-placeholder":"Sampai"},on:{change:t.requestData},model:{value:t.filters.dateRange,callback:function(e){t.$set(t.filters,"dateRange",e)},expression:"filters.dateRange"}})],1),t._v(" "),1==t.$auth.user.role?e("el-form-item",[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"Set kendaraan sudah keluar untuk waktu terpilih",placement:"bottom"}},[e("el-button",{attrs:{size:"small",type:"danger",icon:"el-icon-finished"},on:{click:t.setSudahKeluarSemua}})],1)],1):t._e(),t._v(" "),e("el-form-item",[e("el-input",{staticStyle:{width:"150px"},attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:!0},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"row-dblclick":function(e,r,n){t.trx=e,t.showTrxDetail=!0},"filter-change":t.filterChange,"sort-change":t.sortChange}},[e("el-table-column",{attrs:{label:"No. Tiket",sortable:"custom",filters:t.jenisKendaraanList.map((function(t){return{value:t.nama,text:t.nama}})),"column-key":"jenis_kendaraan","min-width":"150","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.row;return[e("strong",[t._v(t._s(n.nomor_barcode))]),e("br"),t._v("\n\t\t\t\t"+t._s(n.jenis_kendaraan)+"\n\t\t\t\t"+t._s(n.plat_nomor?"- ".concat(n.plat_nomor):"")+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"time_in",label:"Masuk",sortable:"custom","show-overflow-tooltip":"","min-width":"140px","column-key":"gate_in_id",filters:t.gateInList.map((function(g){return{value:g.id,text:g.nama}}))},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.row;return[t._v("\n\t\t\t\t"+t._s(t.$moment(n.time_in).format("DD/MMM/YY HH:mm"))+" "),e("br"),t._v("\n\t\t\t\t"+t._s(n.gate_in.nama)+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"time_out",label:"Keluar",sortable:"custom","show-overflow-tooltip":"","min-width":"140px","column-key":"gate_out_id",filters:t.gateOutList.map((function(g){return{value:g.id,text:g.nama}}))},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.row;return[t._v("\n\t\t\t\t"+t._s(n.time_out?t.$moment(n.time_out).format("DD/MMM/YY HH:mm"):"")+"\n\t\t\t\t"),e("br"),t._v("\n\t\t\t\t"+t._s(n.gate_out?n.gate_out.nama:"-")+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"Durasi","show-overflow-tooltip":"",prop:"parking_transactions.tarif",sortable:"custom","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.row;return[t._v("\n\t\t\t\t"+t._s(n.durasi)+"\n\t\t\t\t"),1==t.$auth.user.role?e("div",{staticStyle:{"font-weight":"bold"}},[t._v("\n\t\t\t\t\tRp. "+t._s(t.$decimal(n.tarif))+"\n\t\t\t\t")]):t._e()]}}])}),t._v(" "),1==t.$auth.user.role?e("el-table-column",{attrs:{prop:"denda",label:"Denda",align:"right","column-key":"denda",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"header-align":"right","min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\tRp. "+t._s(t.$decimal(e.row.denda))+"\n\t\t\t")]}}],null,!1,3743035677)}):t._e(),t._v(" "),e("el-table-column",{attrs:{label:"Member",sortable:"custom","show-overflow-tooltip":"","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.row;return[e("strong",[t._v(" "+t._s(n.member?n.member.nama:"")+" ")]),t._v(" "),e("br"),t._v("\n\t\t\t\t"+t._s(n.nomor_kartu)+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"operator",label:"Operator","show-overflow-tooltip":"","min-width":"90"}}),t._v(" "),e("el-table-column",{attrs:{label:"Shift",prop:"shift.nama","column-key":"shift_id","min-width":"80",filters:t.shiftList.map((function(s){return{value:s.id,text:s.nama}}))}}),t._v(" "),e("el-table-column",{attrs:{label:"Edit",align:"center","header-align":"center","column-key":"edit",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(r){var n=r.row;return[t._v("\n\t\t\t\t"+t._s(n.edit?"YA":"TIDAK")+" "),e("br"),t._v("\n\t\t\t\t"+t._s(n.edit_by)+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"Manual",align:"center","header-align":"center","column-key":"manual",filters:[{value:"Y",text:"YA"},{value:"T",text:"TIDAK"}],"filter-multiple":!1,"min-width":"100px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.row.manual?"YA":"TIDAK")+"\n\t\t\t")]}}])}),t._v(" "),e("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(r){return[e("el-dropdown",[e("span",{staticClass:"el-dropdown-link"},[e("i",{staticClass:"el-icon-more"})]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{icon:"el-icon-zoom-in"},nativeOn:{click:function(e){return e.preventDefault(),function(){t.trx=r.row,t.showTrxDetail=!0}.apply(null,arguments)}}},[t._v("Lihat Detail")]),t._v(" "),r.row.time_out||1!=t.$auth.user.role?t._e():e("el-dropdown-item",{attrs:{icon:"el-icon-check"},nativeOn:{click:function(e){return e.preventDefault(),t.setSudahKeluar(r.row.id)}}},[t._v("Set Sudah Keluar")]),t._v(" "),r.row.is_member||r.row.edit||r.row.manual?t._e():e("el-dropdown-item",{attrs:{icon:"el-icon-edit"},nativeOn:{click:function(e){return e.preventDefault(),function(){t.formModel=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},r.row),t.formErrors={},t.showForm=!0}.apply(null,arguments)}}},[t._v("\n\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t")]),t._v(" "),!r.row.is_member&&r.row.time_out?e("el-dropdown-item",{attrs:{icon:"el-icon-printer"},nativeOn:{click:function(e){return e.preventDefault(),t.printTicket(r.row.id)}}},[t._v("Print Tiket Keluar")]):t._e()],1)],1)]}}])},[e("template",{slot:"header"},[e("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2)],1),t._v(" "),e("br"),t._v(" "),e("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),t.trx?e("TransactionDetailTransaksi",{attrs:{trx:t.trx,show:t.showTrxDetail},on:{close:function(e){t.showTrxDetail=!1}}}):t._e(),t._v(" "),t.showForm?e("TransactionFormTransaksiManual",{attrs:{show:t.showForm,model:t.formModel},on:{close:function(e){t.showForm=!1},reload:t.requestData}}):t._e()],1)}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{TransactionDetailTransaksi:n(663).default,TransactionFormTransaksiManual:n(664).default})}}]);