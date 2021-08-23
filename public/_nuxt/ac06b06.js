(window.webpackJsonp=window.webpackJsonp||[]).push([[6,7],{384:function(t,r,o){"use strict";o(31),o(24),o(30),o(42),o(23),o(43);var n=o(13);o(8),o(69);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}r.a={data:function(){return{showForm:!1,formErrors:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort_prop:null,sort_order:null,filters:{},loading:!1}},methods:{sortChange:function(t){var e=t.prop,r=t.order;e==this.sort_prop&&r==this.sort_order||(this.sort_order="ascending"==r?"asc":"descending"==r?"desc":"asc",this.sort_prop=e,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(filter){this.filters=c(c({},this.filters),filter),this.page=1,this.requestData()},openForm:function(data){this.formErrors={},this.formModel=c({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status?t.formErrors=e.response.data.errors:t.formErrors={}})).finally((function(){t.loading=!1}))},afterSave:function(){},afterDelete:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.afterDelete(),r.$message({message:t.message,type:"success",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.keyword=t,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.filters={},this.requestData()},closeForm:function(){this.showForm=!1,this.formModel={},this.formErrors={}},requestData:function(){var t=this,e=c({page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort_prop:this.sort_prop,sort_order:this.sort_order,paginated:!0},this.filters);this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){if(t.loading=!1,t.tableData=e,e.meta){var r=e.meta,o=r.from,n=r.to,l=r.total;t.tableData=c(c({},t.tableData),{},{from:o,to:n,total:l})}})).finally((function(){return t.loading=!1}))}},mounted:function(){this.requestData()}}},385:function(t,e,r){"use strict";var o=r(4),n=r(84).find,l=r(176),c="find",m=!0;c in[]&&Array(1).find((function(){m=!1})),o({target:"Array",proto:!0,forced:m},{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),l(c)},405:function(t,e,r){"use strict";r.r(e);var o={props:["member"],filters:{getSiklus:function(t){return[{days:"hari"},{weeks:"minggu"},{months:"bulan"},{years:"tahun"}][t]}}},n=r(22),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:8}},[r("table",{staticClass:"table min-w-full"},[r("tbody",[r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3",staticStyle:{width:"180px"}},[t._v("\n\t\t\t\t\t\t\tGroup\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.group.nama)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Nama")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.nama)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Nomor HP")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.phone)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Nomor Kartu")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.nomor_kartu)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Jenis")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.berbayar?"Berbayar":"Gratis")+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTanggal Daftar\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.register_date)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTanggal Kedaluarsa\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.expiry_date)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tSiklus Pembayaran\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.siklus_pembayaran)+"\n\t\t\t\t\t\t\t"+t._s(t.$store.state.siklus.find((function(s){return s.value==t.member.siklus_pembayaran_unit})).label)+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Tarif")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tRp "+t._s(t.$decimal(t.member.tarif))+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTerakhir Masuk\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.last_in?t.$moment(t.member.last_in).format("DD-MMM-YYYY HH:mm:ss"):"")+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("\n\t\t\t\t\t\t\tTerakhir Keluar\n\t\t\t\t\t\t")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.last_out?t.$moment(t.member.last_out).format("DD-MMM-YYYY HH:mm:ss"):"")+"\n\t\t\t\t\t\t")])]),t._v(" "),r("tr",[r("td",{staticClass:"border bg-blue-600 text-white py-1 px-3"},[t._v("Status")]),t._v(" "),r("td",{staticClass:"border bg-blue-100 py-1 px-3"},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.member.status?"Aktif":"Nonaktif")+"\n\t\t\t\t\t\t")])])])])]),t._v(" "),r("el-col",{attrs:{span:16}},[r("el-tabs",[r("el-tab-pane",{attrs:{label:"KENDARAAN"}},[r("el-table",{attrs:{data:t.member.vehicles}},[r("el-table-column",{attrs:{prop:"jenis_kendaraan",label:"Jenis Kendaraan"}}),t._v(" "),r("el-table-column",{attrs:{prop:"plat_nomor",label:"Plat Nomor"}}),t._v(" "),r("el-table-column",{attrs:{prop:"merk",label:"Merk"}}),t._v(" "),r("el-table-column",{attrs:{prop:"tipe",label:"Tipe","show-overflow-tooltip":""}}),t._v(" "),r("el-table-column",{attrs:{prop:"tahun",label:"Tahun"}}),t._v(" "),r("el-table-column",{attrs:{prop:"warna",label:"Warna"}})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},414:function(t,e,r){"use strict";r.r(e);r(31),r(24),r(30),r(42),r(23),r(43);var o=r(13);r(8),r(53),r(32),r(40),r(252),r(69),r(52),r(177),r(385),r(254);function n(data){return"[object Array]"===Object.prototype.toString.call(data)}function l(t,e){if(!t)throw new Error(e)}function c(data){return Object.keys(data)}function m(data){return Object.keys(data).map((function(t){return[t,data[t]]}))}function d(t,e,r){var o="."+e,n=new RegExp("(\\"+e+")?$");return r(t).replace(n,o)}function f(content,t,e,r){void 0===e&&(e="download"),void 0===r&&(r=!0);var o=function(content,t,e){switch(t){case"txt":var r="text/plain;charset=utf-8";return e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"css":return r="text/css;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"html":return r="text/html;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"json":return r="text/json;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"csv":return r="text/csv;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xls":return r="text/application/vnd.ms-excel;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);case"xml":return r="text/application/xml;charset=utf-8",e?URL.createObjectURL(new Blob([content],{type:r})):"data:,"+r+encodeURIComponent(content);default:return""}}(content,t,r),n=document.createElement("a");n.href=o,n.download=e,n.setAttribute("style","visibility:hidden"),document.body.appendChild(n),n.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!1,view:window})),document.body.removeChild(n)}var _,h=function(){return(h=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},v=function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var o,n,i=r.call(t),l=[];try{for(;(void 0===e||e-- >0)&&!(o=i.next()).done;)l.push(o.value)}catch(t){n={error:t}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}return l};function y(data){return data.map(m).reduce((function(t,e,r){return e.reduce((function(map,t){var e=v(t,2),o=e[0],n=e[1],l=map[o]||Array.from({length:data.length}).map((function(t){return""}));return l[r]=("string"!=typeof n?JSON.stringify(n):n)||"",map[o]=l,map}),t)}),Object.create(null))}function w(t,e){return void 0===e&&(e=function(i){return i}),e(m(t).map((function(t){var e=v(t,2);return{fieldName:e[0],fieldValues:e[1]}})))}function k(data,t){return void 0===t&&(t=function(i){return i}),data.length?'<html>\n  <head>\n    <meta charset="UTF-8">\n  </head >\n  <body>\n    '+function(data,t){l(data.length>0);var e=w(y(data),t);return"\n    <table>\n      <thead>\n        <tr><th><b>"+e.map((function(t){return t.fieldName})).join("</b></th><th><b>")+"</b></th></tr>\n      </thead>\n      <tbody>\n        <tr>"+e.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return"<td>"+t+"</td>"}))})).reduce((function(t,e){return t.map((function(t,r){return""+t+e[r]}))})).join("</tr>\n        <tr>")+"</tr>\n      </tbody>\n    </table>\n  "}(data,t)+"\n  </body>\n</html >\n":""}function x(data){return'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE base>\n'+M(data,"base")+"\n"}function M(data,t,e,r){void 0===e&&(e="element"),void 0===r&&(r=0);var o,l=(o=t,"555xmlHello .  world!".trim().replace(/^([0-9,;]|(xml))+/,""),o.replace(/[^_a-zA-Z 0-9:\-\.]/g,"").replace(/^([ 0-9-:\-\.]|(xml))+/i,"").replace(/ +/g,"-")),c=function(t){return Array(t+1).join(" ")}(r);return null==data?c+"<"+l+" />":c+"<"+l+">\n"+(n(data)?data.map((function(t){return M(t,e,e,r+2)})).join("\n"):"object"==typeof data?m(data).map((function(t){var o=v(t,2),n=o[0];return M(o[1],n,e,r+2)})).join("\n"):c+"  "+String(data).replace(/([<>&])/g,(function(t,e){switch(e){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}})))+"\n"+c+"</"+l+">"}function D(t){var data=t.data,e=t.fileName,r=void 0===e?"download":e,o=t.extension,_=t.fileNameFormatter,M=void 0===_?function(t){return t.replace(/\s+/,"_")}:_,D=t.fields,O=t.exportType,j=void 0===O?"txt":O,E=t.replacer,S=void 0===E?null:E,C=t.space,$=void 0===C?4:C,R=t.processor,T=void 0===R?f:R,N=t.withBOM,A=void 0!==N&&N,P=t.delimiter,Y=void 0===P?",":P,z=t.beforeTableEncode,B=void 0===z?function(i){return i}:z,U="Invalid export data. Please provide an array of object",L="Can't export unknown data type "+j+".",I="Can't export string data to "+j+".";if("string"==typeof data)switch(j){case"txt":case"css":case"html":return T(data,j,d(r,null!=o?o:j,M));default:throw new Error(I)}var K=function(t){if(!t||n(t)&&!t.length||!n(t)&&!c(t).length)return function(t){return t};var e=n(t)?t.reduce((function(map,t){var e;return h(h({},map),((e={})[t]=t,e))}),Object.create(null)):t;return function(t){return n(t)?t.map((function(i){return m(i).reduce((function(map,t){var r=v(t,2),o=r[0],n=r[1];return o in e&&(map[e[o]]=n),map}),Object.create(null))})).filter((function(i){return c(i).length})):m(t).reduce((function(map,t){var r=v(t,2),o=r[0],n=r[1];return o in e&&(map[e[o]]=n),map}),Object.create(null))}}(D)(function(data){try{return"string"==typeof data?JSON.parse(data):data}catch(t){throw new Error("Invalid export data. Please provide a valid JSON")}}(data)),F=function(data,t,e){void 0===t&&(t=null);try{return JSON.stringify(data,t,e)}catch(t){throw new Error("Invalid export data. Please provide valid JSON object")}}(K,S,$);switch(j){case"txt":case"css":case"html":return T(F,j,d(r,null!=o?o:j,M));case"json":return T(F,j,d(r,null!=o?o:"json",M));case"csv":l(n(K),U);var J=function(data,t,e){if(void 0===t&&(t=","),void 0===e&&(e=function(i){return i}),!data.length)return"";var r=w(y(data),e);return r.map((function(t){return t.fieldName})).join(t)+"\r\n"+r.map((function(t){return t.fieldValues})).map((function(t){return t.map((function(t){return'"'+t.replace(/\"/g,'""')+'"'}))})).reduce((function(e,r){return e.map((function(e,o){return""+e+t+r[o]}))})).join("\r\n")}(K,Y,B);return T(A?"\ufeff"+J:J,j,d(r,null!=o?o:"csv",M));case"xls":return l(n(K),U),T(k(K,B),j,d(r,null!=o?o:"xls",M));case"xml":return T(x(K),j,d(r,null!=o?o:"xml",M));default:throw new Error(L)}}(_=D||(D={})).types={txt:"txt",css:"css",html:"html",json:"json",csv:"csv",xls:"xls",xml:"xml"},_.processors={downloadFile:f};var O=D,j=r(44);function E(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function S(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?E(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):E(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var C={mixins:[r(384).a],computed:S({expiry_date:function(){try{return this.$moment(this.formModel.register_date,"YYYY-MM-DD").add(this.formModel.siklus_pembayaran,this.formModel.siklus_pembayaran_unit).format("YYYY-MM-DD")}catch(t){return""}}},Object(j.b)(["groupMemberList","siklus","setting"])),watch:{"formModel.berbayar":function(t){t||(this.formModel.tarif=0)}},data:function(){return{url:"/api/member",formModel:{vehicles:[]},selectedData:{vehicles:[]},showDetail:!1,now:this.$moment().format("YYYY-MM-DD")}},methods:{closeForm:function(){this.showForm=!1,this.formModel={vehicles:[]},this.formErrors={}},submit:function(){this.formModel.expiry_date=this.expiry_date,this.save()},print:function(){var t=S({sort_prop:this.sort_prop||"nama",sort_order:this.sort_order||"asc",action:"print"},this.filters),e=new URLSearchParams(t).toString();window.open("".concat(this.$axios.defaults.baseURL,"/api/member?").concat(e),"_blank")},download:function(){var t=this,e=S({sort_prop:this.sort_prop,sort_order:this.sort_order},this.filters);this.$axios.$get(this.url,{params:e}).then((function(e){var data=e.map((function(e,i){return{No:i+1,Nama:e.nama,Jenis:e.berbayar?"BERBAYAR":"GRATIS",Group:e.group.nama,"Nomor Kartu":e.nomor_kartu,"Plat Nomor":e.vehicles.map((function(t){return t.plat_nomor})).join(", "),"Tanggal Daftar":e.register_date,"Tanggal Kedaluarsa":e.expiry_date,Tarif:e.tarif,"Siklus Bayar":e.siklus_pembayaran+" "+t.siklus.find((function(s){return s.value==e.siklus_pembayaran_unit})).label,"Nomor HP":e.phone_number,"Transaksi Terakhir":e.last_transaction||"","Status Kartu":e.expired?"KEDALUARSA":"BERLAKU","Status Anggota":e.status?"AKTIF":"NONAKTIF"}}));O({data:data,fileName:"member-parkir",exportType:"xls"})})).catch((function(t){return console.log(t)})).finally((function(){return t.loading=!1}))},addVehicle:function(){this.formModel.vehicles.length<this.setting.jml_kendaraan_per_kartu||0==this.setting.jml_kendaraan_per_kartu?this.formModel.vehicles.push({plat_nomor:"",jenis_kendaraan:"",tipe:"",merk:"",tahun:"",warna:""}):this.$message({message:"Jumlah maksimal kendaraan per kartu adalah ".concat(this.setting.jml_kendaraan_per_kartu),type:"error"})},deleteVehicle:function(t,e){var r=this;e?this.$axios.$delete("/api/memberVehicle/".concat(e)).then((function(e){r.formModel.vehicles.splice(t,1)})):this.formModel.vehicles.splice(t,1)},afterSave:function(){this.$store.dispatch("getMemberList")},afterDelete:function(){this.$store.dispatch("getMemberList")}}},$=r(22),component=Object($.a)(C,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[1==t.$auth.user.role?r("el-form-item",[r("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:function(e){return t.openForm({vehicles:[],register_date:t.now,tarif:0})}}},[t._v("TAMBAH MEMBER")])],1):t._e(),t._v(" "),r("el-form-item",[r("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:!0},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),r("el-form-item",[r("el-button-group",[r("el-button",{attrs:{icon:"el-icon-download",size:"small",type:"primary"},on:{click:t.download}}),t._v(" "),r("el-button",{attrs:{icon:"el-icon-printer",size:"small",type:"primary"},on:{click:t.print}})],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.tableData.data,stripe:"",height:"calc(100vh - 310px)"},on:{"row-dblclick":function(e,r,o){t.selectedData=e,t.showDetail=!0},"filter-change":t.filterChange,"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",index:t.tableData.from,label:"#"}}),t._v(" "),r("el-table-column",{attrs:{filters:[{value:1,text:"Aktif"},{value:0,text:"Nonaktif"}],"column-key":"status",prop:"status",label:"Status",sortable:"custom","min-width":"120px","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tag",{staticStyle:{width:"100%"},attrs:{size:"small",effect:"dark",type:e.row.status?"success":"info"}},[t._v(t._s(e.row.status?"Aktif":"Nonaktif"))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"nama",label:"Nama",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{filters:[{value:"y",text:"BERBAYAR"},{value:"n",text:"GRATIS"}],"filter-multiple":!1,"column-key":"berbayar",prop:"berbayar",label:"Jenis",sortable:"custom","min-width":"100px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(e.row.berbayar?"BERBAYAR":"GRATIS")+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{filters:this.groupMemberList.map((function(g){return{value:g.id,text:g.nama}})),"column-key":"group_member_id",prop:"group.nama",label:"Group",sortable:"custom","show-overflow-tooltip":"","min-width":"120px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"nomor_kartu",label:"Nomor Kartu",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{label:"Plat Nomor","show-overflow-tooltip":"","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(e.row.vehicles.map((function(t){return t.plat_nomor})).join(", "))+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"register_date",label:"Tgl Daftar",sortable:"custom","min-width":"120px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(t.$moment(e.row.register_date).format("DD-MMM-YYYY"))+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"expiry_date",label:"Tgl Kedaluarsa",sortable:"custom","min-width":"150px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(t.$moment(e.row.expiry_date).format("DD-MMM-YYYY"))+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"tarif",label:"Tarif",sortable:"custom","min-width":"100px","header-align":"right",align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\tRp. "+t._s(t.$decimal(e.row.tarif))+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"siklus_pembayaran",label:"Siklus Bayar",sortable:"custom","min-width":"130px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(e.row.siklus_pembayaran)+"\n\t\t\t\t\t"+t._s(t.siklus.find((function(s){return s.value==e.row.siklus_pembayaran_unit})).label)+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"phone",label:"Nomor HP",sortable:"custom","show-overflow-tooltip":"","min-width":"130px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"last_transaction",label:"Trx Terkakhir",sortable:"custom","min-width":"150px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s(e.row.last_transaction?t.$moment(e.row.last_transaction).format("DD-MMM-YYYY"):"")+"\n\t\t\t\t")]}}])}),t._v(" "),r("el-table-column",{attrs:{filters:[{value:"y",text:"Ya"},{value:"n",text:"Tidak"}],"filter-multiple":!1,"column-key":"expired",fixed:"right",prop:"expired",label:"Expired",sortable:"custom","min-width":"120px","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tag",{staticStyle:{width:"100%"},attrs:{size:"small",effect:"dark",type:e.row.expired?"danger":"success"}},[t._v(t._s(e.row.expired?"Ya":"Tidak"))])]}}])}),t._v(" "),1==t.$auth.user.role?r("el-table-column",{attrs:{fixed:"right",width:"40px",align:"center","header-align":"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-dropdown",[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-more"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-zoom-in"},nativeOn:{click:function(r){return r.preventDefault(),function(){t.selectedData=e.row,t.showDetail=!0}.apply(null,arguments)}}},[t._v("Lihat Detail")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-edit-outline"},nativeOn:{click:function(r){return r.preventDefault(),t.openForm(e.row)}}},[t._v("Edit")]),t._v(" "),r("el-dropdown-item",{attrs:{icon:"el-icon-delete"},nativeOn:{click:function(r){return r.preventDefault(),t.deleteData(e.row.id)}}},[t._v("Hapus")])],1)],1)]}}],null,!1,4210698391)},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"text",icon:"el-icon-refresh"},on:{click:t.refreshData}})],1)],2):t._e()],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),t.selectedData?r("el-dialog",{attrs:{center:"",fullscreen:"",title:"INFORMASI MEMBER",visible:t.showDetail},on:{"update:visible":function(e){t.showDetail=e}}},[r("MemberParkingMemberDetail",{attrs:{member:t.selectedData}})],1):t._e(),t._v(" "),r("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{fullscreen:"",center:"",visible:t.showForm,title:t.formModel.id?"EDIT MEMBER":"TAMBAH MEMBER","close-on-click-modal":!1},on:{"update:visible":function(e){t.showForm=e}}},[r("el-form",{attrs:{"label-width":"150px","label-position":"left"}},[r("el-row",{attrs:{gutter:30}},[r("el-col",{attrs:{span:8}},[r("el-form-item",{class:t.formErrors.group_member_id?"is-error":"",attrs:{label:"Group"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Group"},model:{value:t.formModel.group_member_id,callback:function(e){t.$set(t.formModel,"group_member_id",e)},expression:"formModel.group_member_id"}},t._l(t.groupMemberList,(function(t){return r("el-option",{key:t.id,attrs:{value:t.id,label:t.nama}})})),1),t._v(" "),t.formErrors.group_member_id?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.group_member_id[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.nama?"is-error":"",attrs:{label:"Nama"}},[r("el-input",{attrs:{placeholder:"Nama"},model:{value:t.formModel.nama,callback:function(e){t.$set(t.formModel,"nama",e)},expression:"formModel.nama"}}),t._v(" "),t.formErrors.nama?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.nama[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.phone?"is-error":"",attrs:{label:"Nomor HP"}},[r("el-input",{attrs:{placeholder:"Nomor HP"},model:{value:t.formModel.phone,callback:function(e){t.$set(t.formModel,"phone",e)},expression:"formModel.phone"}}),t._v(" "),t.formErrors.phone?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.phone[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.nomor_kartu?"is-error":"",attrs:{label:"Nomor Kartu"}},[r("el-input",{attrs:{placeholder:"Nomor Kartu"},model:{value:t.formModel.nomor_kartu,callback:function(e){t.$set(t.formModel,"nomor_kartu",e)},expression:"formModel.nomor_kartu"}}),t._v(" "),t.formErrors.nomor_kartu?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.nomor_kartu[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{class:t.formErrors.register_date?"is-error":"",attrs:{label:"Tanggal Daftar"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{format:"dd-MMM-yyyy","value-format":"yyyy-MM-dd",placeholder:"Tanggal Daftar"},model:{value:t.formModel.register_date,callback:function(e){t.$set(t.formModel,"register_date",e)},expression:"formModel.register_date"}}),t._v(" "),t.formErrors.register_date?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.register_date[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.berbayar?"is-error":"",attrs:{label:"Jenis"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Jenis"},model:{value:t.formModel.berbayar,callback:function(e){t.$set(t.formModel,"berbayar",e)},expression:"formModel.berbayar"}},t._l(["Gratis","Berbayar"],(function(t,i){return r("el-option",{key:i,attrs:{value:i,label:t}})})),1),t._v(" "),t.formErrors.berbayar?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.berbayar[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.tarif?"is-error":"",attrs:{label:"Tarif (Rp)"}},[r("el-input",{attrs:{disabled:!t.formModel.berbayar,type:"number",placeholder:"Tarif (Rp)"},model:{value:t.formModel.tarif,callback:function(e){t.$set(t.formModel,"tarif",e)},expression:"formModel.tarif"}}),t._v(" "),t.formErrors.tarif?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.tarif[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1)],1),t._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{class:t.formErrors.siklus_pembayaran?"is-error":"",attrs:{label:"Siklus Pembayaran"}},[r("el-input",{staticStyle:{width:"30%"},attrs:{type:"number"},model:{value:t.formModel.siklus_pembayaran,callback:function(e){t.$set(t.formModel,"siklus_pembayaran",e)},expression:"formModel.siklus_pembayaran"}}),t._v(" "),r("el-select",{staticStyle:{width:"66%",float:"right",clear:"right"},model:{value:t.formModel.siklus_pembayaran_unit,callback:function(e){t.$set(t.formModel,"siklus_pembayaran_unit",e)},expression:"formModel.siklus_pembayaran_unit"}},t._l(t.siklus,(function(s,i){return r("el-option",{key:i,attrs:{value:s.value,label:s.label}})})),1),t._v(" "),t.formErrors.siklus_pembayaran?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.siklus_pembayaran[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{class:t.formErrors.expiry_date?"is-error":"",attrs:{label:"Tanggal Kedaluarsa"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{disabled:"",format:"dd-MMM-yyyy","value-format":"yyyy-MM-dd",placeholder:"Tanggal Kedaluarsa"},model:{value:t.expiry_date,callback:function(e){t.expiry_date=e},expression:"expiry_date"}}),t._v(" "),t.formErrors.expiry_date?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.expiry_date[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1),t._v(" "),r("el-form-item",{attrs:{label:"Status"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"Status"},model:{value:t.formModel.status,callback:function(e){t.$set(t.formModel,"status",e)},expression:"formModel.status"}},t._l(["Nonaktif","Aktif"],(function(t,i){return r("el-option",{key:i,attrs:{value:i,label:t}})})),1),t._v(" "),t.formErrors.status?r("div",{staticClass:"el-form-item__error"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.formErrors.status[0])+"\n\t\t\t\t\t\t\t")]):t._e()],1)],1)],1)],1),t._v(" "),r("el-table",{attrs:{data:t.formModel.vehicles,height:"calc(100vh - 433px)"}},[r("el-table-column",{attrs:{label:"Jenis Kendaraan"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-select",{staticStyle:{width:"100%"},attrs:{size:"small",placeholder:"Jenis Kendaraan"},model:{value:e.row.jenis_kendaraan,callback:function(r){t.$set(e.row,"jenis_kendaraan",r)},expression:"scope.row.jenis_kendaraan"}},t._l(["MOBIL","MOTOR"],(function(t,i){return r("el-option",{key:i,attrs:{value:t,label:t}})})),1)]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Plat Nomor"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{placeholder:"Plat Nomor",size:"small"},model:{value:e.row.plat_nomor,callback:function(r){t.$set(e.row,"plat_nomor",r)},expression:"scope.row.plat_nomor"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Merk"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{placeholder:"Merk",size:"small"},model:{value:e.row.merk,callback:function(r){t.$set(e.row,"merk",r)},expression:"scope.row.merk"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Tipe"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{placeholder:"Tipe",size:"small"},model:{value:e.row.tipe,callback:function(r){t.$set(e.row,"tipe",r)},expression:"scope.row.tipe"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Tahun"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{type:"number",placeholder:"Tahun",size:"small"},model:{value:e.row.tahun,callback:function(r){t.$set(e.row,"tahun",r)},expression:"scope.row.tahun"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"Warna"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-input",{attrs:{placeholder:"Warna",size:"small"},model:{value:e.row.warna,callback:function(r){t.$set(e.row,"warna",r)},expression:"scope.row.warna"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{width:"70px",align:"right","header-align":"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{icon:"el-icon-delete",size:"small",type:"danger",plain:""},on:{click:function(r){return t.deleteVehicle(e.$index,e.row.id)}}})]}}])},[r("template",{slot:"header"},[r("el-button",{attrs:{disabled:t.setting.jml_kendaraan_per_kartu>0&&t.formModel.vehicles.length>=t.setting.jml_kendaraan_per_kartu,icon:"el-icon-plus",size:"small",type:"primary"},on:{click:t.addVehicle}})],1)],2)],1),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{icon:"el-icon-error"},on:{click:t.closeForm}},[t._v(" BATAL ")]),t._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-success"},on:{click:t.submit}},[t._v("\n\t\t\t\t\tSIMPAN\n\t\t\t\t")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{MemberParkingMemberDetail:r(405).default})}}]);