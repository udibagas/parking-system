(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{379:function(t,e,r){"use strict";var o=r(2),n=r(83),l=r(24),c=r(13),d=r(5),h=r(380),v=r(172),f=r(381),m=r(382),_=r(82),w=r(383),x=[],y=x.sort,k=d((function(){x.sort(void 0)})),C=d((function(){x.sort(null)})),D=v("sort"),S=!d((function(){if(_)return _<70;if(!(f&&f>3)){if(m)return!0;if(w)return w<603;var code,t,e,r,o="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)x.push({k:t+r,v:e})}for(x.sort((function(a,b){return b.v-a.v})),r=0;r<x.length;r++)t=x[r].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}}));o({target:"Array",proto:!0,forced:k||!C||!D||!S},{sort:function(t){void 0!==t&&n(t);var e=l(this);if(S)return void 0===t?y.call(e):y.call(e,t);var r,o,d=[],v=c(e.length);for(o=0;o<v;o++)o in e&&d.push(e[o]);for(r=(d=h(d,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:String(e)>String(r)?1:-1}}(t))).length,o=0;o<r;)e[o]=d[o++];for(;o<v;)delete e[o++];return e}})},380:function(t,e){var r=Math.floor,o=function(t,e){var c=t.length,d=r(c/2);return c<8?n(t,e):l(o(t.slice(0,d),e),o(t.slice(d),e),e)},n=function(t,e){for(var element,r,o=t.length,i=1;i<o;){for(r=i,element=t[i];r&&e(t[r-1],element)>0;)t[r]=t[--r];r!==i++&&(t[r]=element)}return t},l=function(t,e,r){for(var o=t.length,n=e.length,l=0,c=0,d=[];l<o||c<n;)l<o&&c<n?d.push(r(t[l],e[c])<=0?t[l++]:e[c++]):d.push(l<o?t[l++]:e[c++]);return d};t.exports=o},381:function(t,e,r){var o=r(81).match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},382:function(t,e,r){var o=r(81);t.exports=/MSIE|Trident/.test(o)},383:function(t,e,r){var o=r(81).match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},384:function(t,r,o){"use strict";o(379),o(8),o(84);r.a={data:function(){return{showForm:!1,formErrors:{},error:{},formModel:{},keyword:"",page:1,pageSize:10,tableData:{},sort:"name",order:"ascending",filters:{},loading:!1}},methods:{sortChange:function(t){t.prop==this.sort&&t.order==this.order||(this.sort=t.prop,this.order=t.order,this.requestData())},currentChange:function(t){this.page=t,this.requestData()},sizeChange:function(t){this.pageSize=t,this.requestData()},filterChange:function(t){console.log(t)},openForm:function(data){this.error={},this.formErrors={},this.formModel=Object.assign({},data),this.showForm=!0},save:function(){var t=this;this.loading=!0,this.$axios({url:this.formModel.id?"".concat(this.url,"/").concat(this.formModel.id):this.url,method:this.formModel.id?"PUT":"POST",data:this.formModel}).then((function(e){t.showForm=!1,t.$message({message:"Data berhasil disimpan.",type:"success",showClose:!0}),t.requestData(),t.afterSave()})).catch((function(e){422==e.response.status&&(t.error={},t.formErrors=e.response.data.errors),500==e.response.status&&(t.formErrors={},t.error=e.response.data)})).finally((function(){t.loading=!1}))},afterSave:function(){},deleteData:function(t){var r=this;this.$confirm("Anda yakin akan menghapus data ini?","Warning",{type:"warning"}).then((function(){r.$axios.$delete("".concat(r.url,"/").concat(t)).then((function(t){r.requestData(),r.$message({message:t.message,type:"success",showClose:!0})})).catch((function(t){r.$message({message:t.response.data.message,type:"error",showClose:!0})}))})).catch((function(){return console.log(e)}))},searchData:function(t){this.page=1,this.keyword=t,this.requestData()},refreshData:function(){this.page=1,this.keyword="",this.requestData()},requestData:function(){var t=this,e={page:this.page,keyword:this.keyword,pageSize:this.pageSize,sort:this.sort,order:this.order,paginated:!0};this.loading=!0,this.$axios.$get(this.url,{params:e}).then((function(e){t.loading=!1,t.tableData=e})).catch((function(e){t.$message({message:e.response.data.message,type:"error",showClose:!0})})).finally((function(){return t.loading=!1}))}},mounted:function(){this.requestData()}}},391:function(t,e,r){var content=r(401);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(86).default)("6be0065b",content,!0,{sourceMap:!1})},400:function(t,e,r){"use strict";r(391)},401:function(t,e,r){var o=r(85)(!1);o.push([t.i,".block[data-v-21879b8a]{background-color:#eee;height:calc(100vh - 120px)}.td-label[data-v-21879b8a]{width:200px;font-weight:700;background-color:#ddd;padding:5px 10px}.td-value[data-v-21879b8a]{background-color:#eee;padding:5px 10px}.col-label[data-v-21879b8a],.col-value[data-v-21879b8a]{font-size:16px;color:#fff}.summary-container[data-v-21879b8a]{height:150px}.summary-info[data-v-21879b8a]{font-size:30px}.text-center[data-v-21879b8a]{text-align:center}",""]),t.exports=o},409:function(t,e,r){"use strict";r.r(e);r(37),r(25),r(36),r(52),r(30),r(53);var o=r(16),n=r(43);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var c={mixins:[r(384).a],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(n.b)(["vehicleTypeList"])),data:function(){return{url:"/api/parkingTransaction",sort:"updated_at",order:"descending",trx:null,showTrxDetail:!1,dateRange:[this.$moment().format("YYYY-MM-DD 00:00:00"),this.$moment().format("YYYY-MM-DD HH:mm:ss")]}}},d=(r(400),r(23)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",{attrs:{"body-style":{padding:"0 0 15px 0"}}},[r("el-row",{attrs:{slot:"header"},slot:"header"},[r("el-col",{attrs:{span:6}},[r("el-page-header",{attrs:{content:"TRANSAKSI"},on:{back:function(e){return t.$emit("back")}}})],1),t._v(" "),r("el-col",{attrs:{span:18}},[r("el-form",{staticClass:"text-right",attrs:{inline:""},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-date-picker",{staticStyle:{"margin-top":"4px"},attrs:{size:"small",format:"dd-MMM-yyyy HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","range-separator":"-","start-placeholder":"Start date","end-placeholder":"End date"},on:{change:t.requestData},model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1),t._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-input",{attrs:{size:"small",placeholder:"Cari","prefix-icon":"el-icon-search",clearable:!0},on:{change:t.searchData},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),r("el-form-item",{staticStyle:{"margin-bottom":"0"}},[r("el-button",{attrs:{icon:"el-icon-refresh",type:"primary",size:"small"},on:{click:t.refreshData}})],1)],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{height:"calc(100vh - 245px)",data:t.tableData.data,stripe:"","default-sort":{prop:t.sort,order:t.order}},on:{"row-dblclick":function(e,r,o){t.trx=e,t.showTrxDetail=!0},"filter-change":t.filterChange,"sort-change":t.sortChange}},[r("el-table-column",{attrs:{type:"index",label:"#"}}),t._v(" "),r("el-table-column",{attrs:{label:"Pos",prop:"pos","min-width":"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"barcode_number",label:"No. Tiket",sortable:"custom","show-overflow-tooltip":"","min-width":"120px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"vehicle_type",label:"Jns Kendaraan",sortable:"custom","show-overflow-tooltip":"",filters:t.vehicleTypeList.map((function(t){return{value:t.name,text:t.name}})),"column-key":"vehicle_type","min-width":"170px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"plate_number",label:"Plat Nomor",sortable:"custom","show-overflow-tooltip":"","min-width":"120px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"drive_thru",label:"Drive Thru","min-width":"120px",align:"center","header-align":"center","column-key":"drive_thru",filters:[{text:"TIDAK",value:0},{text:"YA",value:1}]},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.drive_thru?"Ya":"Tidak"))]}}])}),t._v(" "),1==t.$auth.user.role?r("el-table-column",{attrs:{prop:"fare",label:"Tarif",sortable:"custom",align:"right","header-align":"right","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("Rp. "+t._s(t.$decimal(e.row.fare)))]}}],null,!1,1775783012)}):t._e(),t._v(" "),r("el-table-column",{attrs:{prop:"member",label:"Nama Member",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"card_number",label:"Nomor Kartu",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"time_in",label:"Waktu Masuk",sortable:"custom","show-overflow-tooltip":"","min-width":"170px"}}),t._v(" "),r("el-table-column",{attrs:{prop:"operator",label:"Operator",sortable:"custom","show-overflow-tooltip":"","min-width":"150px"}})],1),t._v(" "),r("br"),t._v(" "),r("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-size":t.pageSize,"page-sizes":[10,25,50,100],total:t.tableData.total},on:{"current-change":t.currentChange,"size-change":t.sizeChange}}),t._v(" "),t.trx?r("el-dialog",{attrs:{center:"",top:"60px",width:"70%",visible:t.showTrxDetail,title:"DETAIL TRANSAKSI "+t.trx.barcode_number},on:{"update:visible":function(e){t.showTrxDetail=e}}},[r("table",{staticStyle:{width:"100%"}},[r("tbody",[r("tr",[r("td",{staticClass:"td-label"},[t._v("Nomor Barcode")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.barcode_number))])]),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Pos")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.pos))])]),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Jenis Kendaraan")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.vehicle_type))])]),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Plat Nomor")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.plate_number))])]),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Member")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.is_member?"Ya":"Tidak"))])]),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Drive Thru")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.drive_thru?"Ya":"Tidak"))])]),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Nomor Kartu")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.card_number))])]),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Waktu Masuk")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.time_in))])]),t._v(" "),1==t.$auth.user.role?r("tr",[r("td",{staticClass:"td-label"},[t._v("Tarif")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v("Rp "+t._s(t.$decimal(t.trx.fare)))])]):t._e(),t._v(" "),r("tr",[r("td",{staticClass:"td-label"},[t._v("Operator")]),t._v(" "),r("td",{staticClass:"td-value"},[t._v(t._s(t.trx.operator))])])])]),t._v(" "),r("br"),t._v(" "),r("el-image",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.trx.snapshot_url,fit:"cover"}},[r("div",{staticClass:"el-image__error",attrs:{slot:"error"},slot:"error"},[r("i",{staticClass:"el-icon-picture-outline"})])])],1):t._e()],1)}),[],!1,null,"21879b8a",null);e.default=component.exports}}]);